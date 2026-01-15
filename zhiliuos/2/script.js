import { WebContainer } from 'https://esm.sh/@webcontainer/api';

const files = {
    'hello.js': {
        file: {
            contents: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const appId = 'app-' + Date.now();

async function run() {
    const name = await new Promise(resolve => {
        rl.question('名前を入力してください: ', resolve);
    });

    console.log(\`[[GUI:{"action":"create","id":"\${appId}","title":"Hello, \${name.trim()}!","content":"<div style='padding:10px;text-align:center;'><h3>Welcome!</h3><p>\${name.trim()} さんのウィンドウです。</p></div>"}\]]\`);

    console.log(\`\\n\${name.trim()} さん、こんにちは！\`);
    console.log('3秒後にウィンドウを閉じます...');

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log(\`[[GUI:{"action":"close","id":"\${appId}"}]]\`);
    process.exit(0);
}
run();
`.trim()
        }
    },

    'hellogui.js': {
        file: {
            contents: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const appId = 'hellogui-' + Date.now();

const xmlContent = \`<window width="400px">
    <title id="hello-window-main">こんにちは</title>
    <vstack gap="8px">
        <text-view id="output">こんにちは！さん。</text-view>
        <text id="message">名前を変更したいならば、以下のテキストボックスを使用してください。</text>
        <text-input id="name" action="{input#name}">ここに入力</text-input>
    </vstack>
    <hstack gap="10px">
        <button action="!close-hellogui">完了</button>
        <button disabled>無効化</button>
    </hstack>
</window>\`;

console.log(\`[[GUI:{"action":"create-xml","file":"hellogui-\${appId}.xml","xml":\${JSON.stringify(xmlContent)},"appId":"\${appId}"}]]\`);

async function run() {
    while (true) {
        const input = await new Promise(resolve => {
            rl.question('', resolve);
        });

        const trimmed = input.trim();
        
        if (trimmed === '!close-hellogui') {
            console.log(\`[[GUI:{"action":"close","id":"xml-hellogui-\${appId}"}]]\`);
            console.log('HelloGUIを終了しました。');
            process.exit(0);
        } else if (trimmed) {
            console.log(\`[[GUI:{"action":"update-xml-element","file":"hellogui-\${appId}.xml","id":"output","value":"名前: \${trimmed}"}]]\`);
        }
    }
}

run();
`.trim()
        }
    },

    'boot.sh': {
        file: {
            contents: `
alias help='node help.js'
alias hello='node hello.js'
alias hellogui='node hellogui.js'
alias gui-demo='node gui_demo.js'
alias terminal='node gui_demo.js --term'
alias han-gui='node han_gui.js'
alias xml-gui='node xml_gui.js'

echo " \x1b[36m███████╗██╗  ██╗██╗██╗     ██╗██╗   ██╗\x1b[0m"
echo " \x1b[36m╚══███╔╝██║  ██║██║██║     ██║██║   ██║\x1b[0m"
echo " \x1b[36m  ███╔╝ ███████║██║██║     ██║██║   ██║\x1b[0m"
echo " \x1b[36m ███╔╝  ██║  ██║██║██║     ██║██║   ██║\x1b[0m"
echo " \x1b[36m███████╗██║  ██║██║███████╗██║╚██████╔╝\x1b[0m"
echo " \x1b[36m╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚═╝ ╚═════╝ \x1b[0m"
echo ""
echo "✔ 智流OS-準備は完了しました(v0 Beta)"
echo "'help'とタイプして，コマンドのヒントを探りましょう！"
terminal run "node dock.js"
`.trim()
        }
    },

    'help.js': {
        file: {
            contents: `
console.log('\\n\x1b[1m=== ZhiliuOS Commands ===\x1b[0m');
console.log('\x1b[33mhelp\x1b[0m     - Show this help');
console.log('\x1b[33mhello\x1b[0m    - Run interactive greeting with auto-window');
console.log('\x1b[33mhellogui\x1b[0m - Run XML-based interactive GUI');
console.log('\x1b[33mgui-demo\x1b[0m - Launch a blank GUI window');
console.log('\x1b[33mterminal\x1b[0m - Launch a new terminal (Shared FS)');
console.log('\x1b[33mhan-gui\x1b[0m  - Open/close windows by ID');
console.log('\x1b[33mxml-gui\x1b[0m  - Open XML-defined GUI windows');
console.log('');
`.trim()
        }
    },

    'han_gui.js': {
        file: {
            contents: `
const args = process.argv.slice(2);
const action = args[0];
const id = args[1] || 'han-window';

if (action === 'open') {
    const title = args[2] || 'Han Window';
    console.log(\`[[GUI:{"action":"create","id":"\${id}","title":"\${title}","content":"<p>Han-GUIで開かれたウィンドウです (ID: \${id})</p>"}]]\`);
} else if (action === 'close') {
    console.log(\`[[GUI:{"action":"close","id":"\${id}"}]]\`);
} else {
    console.log('Usage: han-gui open [id] [title] / han-gui close [id]');
}
`.trim()
        }
    },

    'gui_demo.js': {
        file: {
            contents: `
const args = process.argv.slice(2);
if (args.includes('--term')) {
    console.log('[[GUI:{"action":"create","type":"terminal","title":"Terminal"}]]');
} else if (args[0] === 'run' && args[1]) {
    // terminal run "node ???.js" の場合
    const cmd = args.slice(1).join(' ');
    console.log(\`[[GUI:{"action":"create","type":"terminal","title":"Terminal","autorun":\${JSON.stringify(cmd)}}]]\`);
} else {
    console.log('[[GUI:{"action":"create","title":"Zhiliu Message","content":"<p>Multitasking GUI Window.</p>"}]]');
}
`.trim()
        }
    },

    'xml_gui.js': {
        file: {
            contents: `
const fs = require('fs').promises;
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Usage: xml-gui <xmlfile> [update id value]');
    console.log('  xml-gui example_gui.xml           - XMLファイルでGUIを開く');
    console.log('  xml-gui example_gui.xml update output "新しいテキスト"  - 要素を更新');
    process.exit(0);
}

async function main() {
    const xmlFile = args[0];
    const action = args[1];

    if (action === 'update' && args.length >= 4) {
        const id = args[2];
        const value = args.slice(3).join(' ');
        console.log(\`[[GUI:{"action":"update-xml","file":"\${xmlFile}","id":"\${id}","value":"\${value}"}]]\`);
    } else {
        const content = await fs.readFile(xmlFile, 'utf-8');
        console.log(\`[[GUI:{"action":"create-xml","file":"\${xmlFile}","xml":\${JSON.stringify(content)}}]]\`);
    }
}

main().catch(err => console.error('Error:', err.message));
`.trim()
        }
    },

    'example_gui.xml': {
        file: {
            contents: `
<window width="450px" height="550px">
    <title id="hello-window-title">サンプルGUI</title>
    <vstack gap="12px">
        <text-view id="output" height="150px">こんにちは！さん。
このテキストビューはスクロール可能です。</text-view>
        <text id="message">名前を変更したい場合は、以下のテキストボックスを使用してください。</text>
        <text-input id="name" action="xml-gui example_gui.xml update output 名前: {input#name}">ここに入力</text-input>
        <checkbox id="agree" status="false">利用規約に同意する</checkbox>
        <image id="icon" width="100px" height="100px">https://search3958.github.io/newtab/bgimg/3958Glass1.webp</image>
    </vstack>
    <hstack gap="10px">
        <button action="xml-gui example_gui.xml update message 完了ボタンが押されました！">完了</button>
        <button disabled>無効化</button>
    </hstack>
</window>
`.trim()
        }
    },

    'package.json': {
        file: { contents: '{"name":"zhiliu-os","type":"commonjs"}' }
    },



    'dock.js': {
        file: {
            contents: `
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const appId = 'hellogui-' + Date.now();

const xmlContent = \`<window width="417px" height="79px" size-change="false">
    <title id="hello-window-main">Dock</title>
    <hstack gap="10px">
        <button action="hellogui">
            <image action="terminal" id="icon" width="32px" height="32px">./appicons/hello.svg</image>
        Hello</button>

        <button action="xml-gui example_gui.xml">
            <image action="terminal" id="icon" width="32px" height="32px">./appicons/xmlgui.svg</image>
        XML GUI</button>

        <button radius="16px" action="gui-demo">
            <image action="terminal" id="icon" width="32px" height="32px">./appicons/terminal.svg</image>
        Win Demo</button>
    </hstack>
</window>\`;

console.log(\`[[GUI:{"action":"create-xml","file":"hellogui-\${appId}.xml","xml":\${JSON.stringify(xmlContent)},"appId":"\${appId}"}]]\`);

async function run() {
    while (true) {
        const input = await new Promise(resolve => {
            rl.question('', resolve);
        });

        const trimmed = input.trim();
        
        if (trimmed === '!close-hellogui') {
            console.log(\`[[GUI:{"action":"close","id":"xml-hellogui-\${appId}"}]]\`);
            console.log('HelloGUIを終了しました。');
            process.exit(0);
        } else if (trimmed) {
            console.log(\`[[GUI:{"action":"update-xml-element","file":"hellogui-\${appId}.xml","id":"output","value":"名前: \${trimmed}"}]]\`);
        }
    }
}

run();
`.trim()
        }
    },



};


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

async createTerminalWindow(title, autorun) {
    if (!this.webcontainerInstance) return;

    this.dialogCounter++;
    const id = `term-win-${this.dialogCounter}`;
    const termId = `term-${this.dialogCounter}`;
    const win = this.createWindowElement(id, title);
    
    // --- (UI構築部分は変更なし) ---
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

    shellProcess.output.pipeTo(new WritableStream({
        write(data) {
            if (data.includes('[[GUI:')) {
                const match = data.match(/\[\[GUI:(.*?)\]\]/);
                if (match) {
                    try {
                        const guiData = JSON.parse(match[1]);
                        guiData.termId = termId;
                        windowManager.handleGuiCommand(guiData);
                        term.write(data.replace(/\[\[GUI:.*\]\]/, ''));
                        return;
                    } catch (e) { }
                }
            }
            term.write(data);
        },
        close() {
            const win = document.getElementById(id);
            if (win) windowManager.closeWindow(win);
        }
    }));

    // 【修正ポイント】ここから
    // 1. シェル(jsh)自体の起動をしっかり待つ
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    // 2. boot.sh を読み込む
    await inputWriter.write("source boot.sh\n");

    // 3. boot.sh 内の echo や処理が終わるのを少し待つ
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    // 4. autorunがあれば実行
    if (autorun) {
        await inputWriter.write(autorun + "\n");
    }
    // 【修正ポイント】ここまで

    const sendInput = async () => {
        const val = inputField.value;
        await inputWriter.write(val + "\n");
        inputField.value = '';
    };
    sendBtn.onclick = sendInput;
    inputField.onkeydown = (e) => { if (e.key === 'Enter') { sendInput(); e.preventDefault(); } };
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
            // 第2引数に autorun (node dock.js 等) を渡すように修正
            this.createTerminalWindow(config.title || 'Terminal', config.autorun);
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
                el.style.padding = '8px 16px';
                el.style.cursor = 'pointer';
                el.style.border = '1px solid #555';
                el.style.backgroundColor = '#2a2a2a';
                el.style.color = '#fff';
                el.style.borderRadius = '4px';
                el.style.display = 'inline-flex'; // 画像とテキストを並べやすくする
                el.style.alignItems = 'center';
                el.style.justifyContent = 'center';
                el.style.gap = '8px';

                // 子要素（テキストや画像）をループして追加
                for (const child of xmlNode.childNodes) {
                    if (child.nodeType === 3) { // テキストノードの場合
                        const text = child.textContent.trim();
                        if (text) {
                            el.appendChild(document.createTextNode(text));
                        }
                    } else if (child.nodeType === 1) { // 要素ノード（imageなど）の場合
                        const childEl = this.createXmlElement(child, xmlFile);
                        if (childEl) el.appendChild(childEl);
                    }
                }

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
let windowManager;

window.addEventListener('load', async () => {
    const animation = lottie.loadAnimation({
        container: document.getElementById('lottie-container'),
        renderer: 'svg', loop: false, autoplay: true, path: 'data.json'
    });

    const bgTerm = new Terminal({ theme: { background: '#0c0c0c' }, disableStdin: true });
    bgTerm.open(document.getElementById('bg-terminal'));

    const mainTerm = new Terminal({
        cursorBlink: true,
        fontFamily: '"Fira Code",monospace',
        theme: { background: '#1e1e1e' },
        convertEol: true
    });
    mainTerm.open(document.getElementById('terminal-container'));

    windowManager = new WindowManager();
    const mainWindow = document.getElementById('main-window');
    windowManager.setupWindow(mainWindow);

    const [webcontainerInstance] = await Promise.all([
        WebContainer.boot(), 
        new Promise(resolve => animation.onComplete = resolve)
    ]);

    windowManager.setWebContainer(webcontainerInstance);
    document.getElementById('lottie-overlay').classList.add('fade-out');
    await webcontainerInstance.mount(files);

    const shellProcess = await webcontainerInstance.spawn('jsh', {
        terminal: { cols: mainTerm.cols, rows: mainTerm.rows }
    });
    const inputWriter = shellProcess.input.getWriter();
    windowManager.terminalWriters.set('main', inputWriter);
    
    mainTerm.onData(data => inputWriter.write(data));

    shellProcess.output.pipeTo(new WritableStream({
        write(data) {
            if (data.includes('[[GUI:')) {
                const match = data.match(/\[\[GUI:(.*?)\]\]/);
                if (match) {
                    try {
                        const guiData = JSON.parse(match[1]);
                        guiData.termId = 'main'; // メインターミナルのID
                        windowManager.handleGuiCommand(guiData);
                        mainTerm.write(data.replace(/\[\[GUI:.*\]\]/, ''));
                        return;
                    } catch (e) { }
                }
            }
            mainTerm.write(data);
            bgTerm.write(data);
        }
    }));

    await inputWriter.write("source boot.sh\n");
});