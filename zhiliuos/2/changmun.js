
class WindowManager {
    constructor() {
        this.windows = new Map();
        this.zIndex = 100;
        this.RESIZE_THRESHOLD = 60;
        this.currentResizeHover = null;
        this.dialogCounter = 0;
        this.webcontainerInstance = null;
        this.xmlWindows = new Map();
        this.terminalWriters = new Map(); // ターミナルごとの入力ライター
        
        document.addEventListener('mousemove', this.handleGlobalMouseMove.bind(this));
    }

    setWebContainer(instance) {
        this.webcontainerInstance = instance;
    }

    createWindowElement(id, title) {
        const win = document.createElement('div');
        win.className = 'window';
        win.id = id;
        win.style.top = '150px';
        win.style.left = '200px';
        win.innerHTML = `
            <div class="control-bar">
                <span class="bar-title">${title}</span>
                <div class="close-btn-area">
                    <div class="close-icon"></div>
                </div>
            </div>
            <div class="window-content"></div>
        `;
        document.body.appendChild(win);
        this.setupWindow(win);
        return win;
    }

    async createTerminalWindow(title) {
        if (!this.webcontainerInstance) return;

        this.dialogCounter++;
        const id = `term-win-${this.dialogCounter}`;
        const termId = `term-${this.dialogCounter}`;
        const win = this.createWindowElement(id, title);
        win.style.width = '640px';
        win.style.height = '450px';
        
        const content = win.querySelector('.window-content');
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        content.style.backgroundColor = '#1e1e1e';
        content.style.padding = '0';

        const termContainer = document.createElement('div');
        termContainer.style.flex = '1';
        termContainer.style.width = '100%';
        termContainer.setAttribute('data-term-id', termId);
        content.appendChild(termContainer);

        const inputArea = document.createElement('div');
        inputArea.style.display = 'flex';
        inputArea.style.padding = '10px';
        inputArea.style.backgroundColor = '#2d2d2d';
        inputArea.style.borderTop = '1px solid #444';
        
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'コマンドを入力...';
        inputField.style.flex = '1';
        inputField.style.backgroundColor = '#3c3c3c';
        inputField.style.color = '#fff';
        inputField.style.border = 'none';
        inputField.style.padding = '8px';
        inputField.style.outline = 'none';
        
        const sendBtn = document.createElement('button');
        sendBtn.innerText = '送信';
        sendBtn.style.padding = '8px 15px';
        sendBtn.style.marginLeft = '10px';
        sendBtn.style.cursor = 'pointer';

        inputArea.appendChild(inputField);
        inputArea.appendChild(sendBtn);
        content.appendChild(inputArea);

        const term = new Terminal({
            cursorBlink: true,
            theme: { background: '#1e1e1e' },
            convertEol: true,
            fontSize: 14,
            fontFamily: '"Fira Code", monospace'
        });
        term.open(termContainer);

        this.openWindow(id);
        inputField.focus();

        const shellProcess = await this.webcontainerInstance.spawn('jsh', {
            terminal: { cols: term.cols, rows: term.rows }
        });
        
        const inputWriter = shellProcess.input.getWriter();
        this.terminalWriters.set(termId, inputWriter);
        await new Promise(resolve => setTimeout(resolve, 500));

               shellProcess.output.pipeTo(new WritableStream({
            write(data) {
                if (data.includes('[[GUI:')) {
                    const match = data.match(/\[\[GUI:(.*?)\]\]/);
                    if (match) {
                        try {
                            const guiData = JSON.parse(match[1]);
                            guiData.termId = termId; // どのターミナルから来たかを記録
                            windowManager.handleGuiCommand(guiData);
                            term.write(data.replace(/\[\[GUI:.*\]\]/, ''));
                            return;
                        } catch (e) { }
                    }
                }
                term.write(data);
            },
            close() {
                // CUIプロセスが終了したらウィンドウも閉じる
                const win = document.getElementById(`term-win-${termId.split('-')[1]}`);
                if (win) windowManager.closeWindow(win);
            }
        }));
        await inputWriter.write("source boot.sh\n");

        const sendInput = async () => {
            const val = inputField.value;
            await inputWriter.write(val + "\n");
            inputField.value = '';
        };

        sendBtn.onclick = sendInput;
        inputField.onkeydown = (e) => {
            if (e.key === 'Enter') {
                sendInput();
                e.preventDefault();
            }
        };
    }

    createDialog(id, title, html) {
        const win = this.createWindowElement(id, title);
        const content = win.querySelector('.window-content');
        content.innerHTML = `<div style="padding:20px;">${html}</div><button class="close-dialog-btn" style="margin:0 20px 20px 20px; cursor:pointer;">閉じる</button>`;
        content.querySelector('.close-dialog-btn').onclick = () => this.closeWindow(win);
        setTimeout(() => this.openWindow(id), 10);
        return win;
    }

    handleGuiCommand(config) {
        if (config.action === 'create') {
            const winId = config.id || `win-${++this.dialogCounter}`;
            if (config.type === 'terminal') {
                this.createTerminalWindow(config.title);
            } else {
                this.createDialog(winId, config.title, config.content || 'Application running...');
            }
        } else if (config.action === 'close') {
            const win = document.getElementById(config.id);
            if (win) this.closeWindow(win);
        } else if (config.action === 'create-xml') {
            this.createXmlWindow(config.file, config.xml, config.appId, config.termId);
        } else if (config.action === 'update-xml') {
            this.updateXmlWindow(config.file, config.id, config.value);
        } else if (config.action === 'update-xml-element') {
            this.updateXmlElement(config.file, config.id, config.value);
        }
    }

    setupWindow(win) {
        this.windows.set(win.id, win);
        this.setupResizeAndMove(win);
        this.setupCloseButton(win);
    }

    openWindow(id) {
        const win = document.getElementById(id);
        if (win) {
            const winRect = win.getBoundingClientRect();
            const offset = (this.windows.size % 10) * 20;
            win.style.left = `${(window.innerWidth - winRect.width) / 2 + offset}px`;
            win.style.top = `${(window.innerHeight - winRect.height) / 2 + offset}px`;
            win.classList.add('active');
            this.bringToFront(win);
        }
    }

    closeWindow(win) {
        win.classList.remove('active');
        setTimeout(() => {
            win.remove();
            this.windows.delete(win.id);
        }, 400);
    }

    bringToFront(win) {
        this.zIndex++;
        win.style.zIndex = this.zIndex;
    }

    setupCloseButton(win) {
        const closeBtn = win.querySelector('.close-btn-area');
        if (closeBtn) {
            closeBtn.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                this.closeWindow(win);
            });
        }
    }

    isNearResizeCorner(win, clientX, clientY) {
        if (win.classList.contains('no-resize')) return false;
        const rect = win.getBoundingClientRect();
        const threshold = this.RESIZE_THRESHOLD;
        return (clientX - (rect.left + rect.width) >= -threshold && clientX - (rect.left + rect.width) <= 5) &&
               (clientY - (rect.top + rect.height) >= -threshold && clientY - (rect.top + rect.height) <= threshold);
    }

    handleGlobalMouseMove(e) {
        if (document.querySelector('.window.is-resizing') || document.querySelector('.control-bar.dragging')) return;
        let foundHover = false;
        const activeWindows = Array.from(this.windows.values()).filter(win => win.classList.contains('active'));
        activeWindows.sort((a, b) => (parseInt(b.style.zIndex) || 0) - (parseInt(a.style.zIndex) || 0));
        for (const win of activeWindows) {
            if (this.isNearResizeCorner(win, e.clientX, e.clientY)) {
                if (this.currentResizeHover !== win) {
                    if (this.currentResizeHover) this.currentResizeHover.classList.remove('is-resize-hover');
                    win.classList.add('is-resize-hover');
                    this.currentResizeHover = win;
                }
                document.body.classList.add('global-resize-cursor');
                foundHover = true;
                break;
            }
        }
        if (!foundHover && this.currentResizeHover) {
            this.currentResizeHover.classList.remove('is-resize-hover');
            this.currentResizeHover = null;
            document.body.classList.remove('global-resize-cursor');
        }
    }

    setupResizeAndMove(win) {
        const controlBar = win.querySelector('.control-bar');
        if (!controlBar) return;

        win.addEventListener('mousedown', (e) => {
            this.bringToFront(win);
            win.classList.add('no-transition');
            const startX = e.clientX;
            const startY = e.clientY;
            const rect = win.getBoundingClientRect();
            const isResizing = this.isNearResizeCorner(win, startX, startY);
            const isMoving = e.target.closest('.control-bar') && !isResizing && !e.target.closest('.close-btn-area');

            if (isResizing) {
                win.classList.add('is-resizing');
                const onMouseMove = (me) => {
                    win.style.width = `${Math.max(400, rect.width + (me.clientX - startX))}px`;
                    win.style.height = `${Math.max(300, rect.height + (me.clientY - startY))}px`;
                };
                const onMouseUp = () => {
                    win.classList.remove('is-resizing', 'no-transition');
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            } else if (isMoving) {
                controlBar.classList.add('dragging');
                const onMouseMove = (me) => {
                    win.style.left = `${rect.left + (me.clientX - startX)}px`;
                    win.style.top = `${rect.top + (me.clientY - startY)}px`;
                };
                const onMouseUp = () => {
                    controlBar.classList.remove('dragging');
                    win.classList.remove('no-transition');
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                };
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            } else {
                win.classList.remove('no-transition');
            }
        });
    }

    parseXml(xmlString) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        return xmlDoc.documentElement;
    }

    async executeAction(action, xmlFile) {
        if (!this.webcontainerInstance || !action) return;

        // 入力値の埋め込み
        let cmd = action;
        const inputMatches = action.matchAll(/\{input#(\w+)\}/g);
        for (const match of inputMatches) {
            const inputId = match[1];
            const inputEl = document.querySelector(`[data-xml-id="${inputId}"]`);
            if (inputEl) {
                const actualInput = inputEl.tagName === 'INPUT' ? inputEl : inputEl.querySelector('input');
                if (actualInput) {
                    const value = actualInput.value || '';
                    cmd = cmd.replace(match[0], value);
                }
            }
        }

        // CUIアプリ（jshシェル）にコマンドとして送信
        // どのターミナルに送るかはtermIdを使う（なければ'main'）
        const winData = this.xmlWindows.get(xmlFile);
        const termId = winData?.termId || 'main';
        const inputWriter = this.terminalWriters.get(termId);
        if (inputWriter) {
            await inputWriter.write(cmd + "\n");
        }
    }

    createXmlWindow(xmlFile, xmlString, appId, termId) {
        const xmlRoot = this.parseXml(xmlString);
        if (xmlRoot.nodeName !== 'window') {
            console.error('Root element must be <window>');
            return;
        }

        const width = xmlRoot.getAttribute('width') || '500px';
        const height = xmlRoot.getAttribute('height') || '400px';
        const radius = xmlRoot.getAttribute('radius') || '8px';
        const showBar = xmlRoot.getAttribute('bar') !== 'false';
        const allowResize = xmlRoot.getAttribute('size-change') !== 'false';
        const position = xmlRoot.getAttribute('position');

        const titleEl = xmlRoot.querySelector('title');
        const title = titleEl ? titleEl.textContent : 'XML Window';

        const winId = appId ? `xml-${appId}` : `xml-win-${++this.dialogCounter}`;
        const win = document.createElement('div');
        win.className = 'window';
        win.id = winId;
        win.style.width = width;
        win.style.height = height;
        win.style.borderRadius = radius;
        
        if (position) {
            const match = position.match(/\(([^,]+),([^)]+)\)/);
            if (match) {
                win.style.left = match[1].trim();
                win.style.top = match[2].trim();
                win.classList.add('no-resize');
            }
        }

        if (!allowResize) {
            win.classList.add('no-resize');
        }

        win.innerHTML = `
            ${showBar ? `<div class="control-bar">
                <span class="bar-title">${title}</span>
                <div class="close-btn-area">
                    <div class="close-icon"></div>
                </div>
            </div>` : ''}
            <div class="window-content"></div>
        `;

        document.body.appendChild(win);
        this.setupWindow(win);

        this.xmlWindows.set(xmlFile, { winId, xmlString, xmlRoot, termId });

        const content = win.querySelector('.window-content');
        content.style.padding = '15px';
        content.style.overflow = 'auto';

        for (const child of xmlRoot.childNodes) {
            if (child.nodeType === 1 && child.nodeName !== 'title') {
                const el = this.createXmlElement(child, xmlFile);
                if (el) content.appendChild(el);
            }
        }

        this.openWindow(winId);
    }

    createXmlElement(xmlNode, xmlFile) {
        const nodeName = xmlNode.nodeName.toLowerCase();
        let el = null;

        switch (nodeName) {
            case 'vstack':
                el = document.createElement('div');
                el.style.display = 'flex';
                el.style.flexDirection = 'column';
                el.style.gap = xmlNode.getAttribute('gap') || '0';
                for (const child of xmlNode.childNodes) {
                    if (child.nodeType === 1) {
                        const childEl = this.createXmlElement(child, xmlFile);
                        if (childEl) el.appendChild(childEl);
                    }
                }
                break;

            case 'hstack':
                el = document.createElement('div');
                el.style.display = 'flex';
                el.style.gap = xmlNode.getAttribute('gap') || '0';
                for (const child of xmlNode.childNodes) {
                    if (child.nodeType === 1) {
                        const childEl = this.createXmlElement(child, xmlFile);
                        if (childEl) el.appendChild(childEl);
                    }
                }
                break;

            case 'button':
                el = document.createElement('button');
                el.textContent = xmlNode.textContent;
                el.style.padding = '8px 16px';
                el.style.cursor = 'pointer';
                el.style.border = '1px solid #555';
                el.style.backgroundColor = '#2a2a2a';
                el.style.color = '#fff';
                el.style.borderRadius = '4px';
                const action = xmlNode.getAttribute('action');
                if (action) {
                    el.onclick = () => this.executeAction(action, xmlFile);
                }
                break;

            case 'text-input':
                el = document.createElement('input');
                el.type = 'text';
                el.placeholder = xmlNode.textContent;
                el.style.padding = '8px';
                el.style.border = '1px solid #555';
                el.style.backgroundColor = '#1e1e1e';
                el.style.color = '#fff';
                el.style.borderRadius = '4px';
                el.style.outline = 'none';
                const inputAction = xmlNode.getAttribute('action');
                if (inputAction) {
                    el.oninput = () => {
                        this.executeAction(inputAction, xmlFile);
                    };
                    el.onkeydown = (e) => {
                        if (e.key === 'Enter') {
                            this.executeAction(inputAction, xmlFile);
                        }
                    };
                }
                break;

            case 'text':
                el = document.createElement('p');
                el.textContent = xmlNode.textContent;
                el.style.margin = '0';
                el.style.color = '#ddd';
                break;

            case 'text-view':
                el = document.createElement('div');
                el.textContent = xmlNode.textContent;
                el.style.backgroundColor = '#1e1e1e';
                el.style.padding = '10px';
                el.style.borderRadius = '4px';
                el.style.overflow = 'auto';
                el.style.color = '#ddd';
                el.style.whiteSpace = 'pre-wrap';
                const tvHeight = xmlNode.getAttribute('height');
                if (tvHeight) el.style.height = tvHeight;
                break;

            case 'image':
                el = document.createElement('img');
                el.src = xmlNode.textContent;
                el.style.display = 'block';
                break;

            case 'checkbox':
                el = document.createElement('label');
                el.style.display = 'flex';
                el.style.alignItems = 'center';
                el.style.gap = '8px';
                el.style.cursor = 'pointer';
                el.style.color = '#ddd';
                
                const cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.checked = xmlNode.getAttribute('status') === 'true';
                
                const span = document.createElement('span');
                span.textContent = xmlNode.textContent;
                
                el.appendChild(cb);
                el.appendChild(span);
                break;
        }

        if (el) {
            const id = xmlNode.getAttribute('id');
            if (id) el.setAttribute('data-xml-id', id);

            const disabled = xmlNode.hasAttribute('disabled');
            if (disabled) {
                el.style.filter = 'saturate(0) opacity(0.5)';
                el.style.pointerEvents = 'none';
            }

            const width = xmlNode.getAttribute('width');
            if (width) el.style.width = width;

            const height = xmlNode.getAttribute('height');
            if (height && nodeName !== 'text-view') el.style.height = height;

            const radius = xmlNode.getAttribute('radius');
            if (radius) el.style.borderRadius = radius;
        }

        return el;
    }

    updateXmlWindow(xmlFile, elementId, newValue) {
        const winData = this.xmlWindows.get(xmlFile);
        if (!winData) {
            console.error(`XML window for ${xmlFile} not found`);
            return;
        }

        const xmlRoot = winData.xmlRoot;
        const findAndUpdate = (node) => {
            if (node.nodeType === 1) {
                if (node.getAttribute('id') === elementId) {
                    node.textContent = newValue;
                    return true;
                }
                for (const child of node.childNodes) {
                    if (findAndUpdate(child)) return true;
                }
            }
            return false;
        };

        findAndUpdate(xmlRoot);

        const win = document.getElementById(winData.winId);
        if (win) {
            this.closeWindow(win);
        }

        const serializer = new XMLSerializer();
        const newXmlString = serializer.serializeToString(xmlRoot);
        
        setTimeout(() => {
            this.createXmlWindow(xmlFile, newXmlString);
        }, 450);
    }

    updateXmlElement(xmlFile, elementId, newValue) {
        const winData = this.xmlWindows.get(xmlFile);
        if (!winData) {
            console.error(`XML window for ${xmlFile} not found`);
            return;
        }

        // DOM要素を直接更新
        const win = document.getElementById(winData.winId);
        if (!win) return;

        const targetEl = win.querySelector(`[data-xml-id="${elementId}"]`);
        if (targetEl) {
            // テキストコンテンツを更新
            if (targetEl.tagName === 'P' || targetEl.tagName === 'DIV') {
                targetEl.textContent = newValue;
            } else if (targetEl.tagName === 'INPUT') {
                targetEl.value = newValue;
            }

            // XMLも更新しておく
            const xmlRoot = winData.xmlRoot;
            const findAndUpdate = (node) => {
                if (node.nodeType === 1) {
                    if (node.getAttribute('id') === elementId) {
                        node.textContent = newValue;
                        return true;
                    }
                    for (const child of node.childNodes) {
                        if (findAndUpdate(child)) return true;
                    }
                }
                return false;
            };
            findAndUpdate(xmlRoot);
        }
    }
}