import {
    WebContainer
} from 'https://esm.sh/@webcontainer/api';

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
node gui_demo.js --term run "node wallpaper.js"
alias help='node help.js'
alias hello='node hello.js'
alias hellogui='node hellogui.js'
alias gui-demo='node gui_demo.js'
alias terminal='node gui_demo.js --term'
alias han-gui='node han_gui.js'
alias xml-gui='node xml_gui.js'
alias sleep='node sleep.js'

# ロゴ表示
echo " \x1b[37m███████╗ ██╗  ██╗ ██╗ ██╗      ██╗ ██╗   ██╗\x1b[0m"
echo " \x1b[37m╚══███╔╝ ██║  ██║ ██║ ██║      ██║ ██║   ██║\x1b[0m"
echo " \x1b[37m  ███╔╝  ███████║ ██║ ██║      ██║ ██║   ██║\x1b[0m"
echo " \x1b[37m ███╔╝   ██║  ██║ ██║ ██║      ██║ ██║   ██║\x1b[0m"
echo " \x1b[37m███████╗ ██║  ██║ ██║ ███████╗ ██║ ╚██████╔╝\x1b[0m"
echo " \x1b[37m╚══════╝ ╚═╝  ╚═╝ ╚═╝ ╚══════╝ ╚═╝  ╚═════╝ \x1b[0m"
echo "\n"
echo " \x1b[96m✔ 起動完了 (v0 Beta)\x1b[0m"
echo " \x1b[96m  helpコマンドにより、ヒントを得ることが可能です。\x1b[0m"

# 5秒間待機
node sleep.js 0.2

node gui_demo.js --term run "node dock.js"

node sleep.js 1

echo "test" >&2
node sleep.js 1

echo "test" >&2
node sleep.js 1

echo "test" >&2
node sleep.js 1

echo "test" >&2

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
  const runIdx = args.indexOf('run');
  if (runIdx !== -1 && args[runIdx + 1]) {
    const cmd = args.slice(runIdx + 1).join(' ').replace(/["']/g, '');
    console.log(\`[[GUI:{"action":"create","type":"terminal","title":"Terminal - \${cmd}","autorun":\${JSON.stringify(cmd)}}\]]\`);
  } else {
    console.log('[[GUI:{"action":"create","type":"terminal","title":"Terminal"}]]');
  }
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
        file: {
            contents: '{"name":"zhiliu-os","type":"commonjs"}'
        }
    },



    'dock.js': {
  file: {
    contents: `
const appId = 'dock-' + Date.now();
const xmlContent = \`
<window position="(calc(50vw - 207.425px),calc(100vh - 86px))" width="415.26px" height="fit-content" size-change="false" radius="31px" bar="false" terminal="hide">
  <title id="dock-title">Dock</title>
  <hstack gap="12px">
    <button radius="16px" action='node gui_demo.js --term run "hellogui"'>
      <image width="32px" height="32px">./appicons/hello.svg</image>
      Hello
    </button>
    <button radius="16px" action='node gui_demo.js --term run "xml-gui example_gui.xml"'>
      <image width="32px" height="32px">./appicons/xmlgui.svg</image>
      XML GUI
    </button>
    <button radius="16px" action='node gui_demo.js --term run "gui-demo"'>
      <image width="32px" height="32px">./appicons/terminal.svg</image>
      Win Demo
    </button>
  </hstack>
</window>\`;

// GUI作成コマンドを出力して終了する
console.log(\`[[GUI:{"action":"create-xml","file":"dock-\${appId}.xml","xml":\${JSON.stringify(xmlContent)},"appId":"\${appId}"}]]\`);
`.trim()
  }
},

'wallpaper.js': { // 実行時に node wallpaper.js で動くように名前を合わせます
    file: {
      contents: `
const appId = 'wallpaper-' + Date.now();
const xmlContent = \`
<window position="(0px,0px)" width="100vw" height="100vh" radius="0px" bar="true" padding="0px" size-change="false" style="z-index:-1!important;pointer-events:none!important;background:#0000;
    background-image: url(https://search3958.github.io/newtab/bgimg/zip/chips/chips4_dark.webp);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    background-attachment: fixed;
    " 
    terminal="hide">
    <title>Wallpaper</title>
</window>\`.trim();

console.log(\`[[GUI:{"action":"create-xml","file":"wallpaper-\${appId}.xml","xml":\${JSON.stringify(xmlContent)},"appId":"\${appId}"}]]\`);

setInterval(() => {
}, 1000 * 60);
      `.trim()
    }
  },
  // files オブジェクトに追加
'sleep.js': {
  file: {
    contents: `
      const seconds = parseFloat(process.argv[2]) || 0;
      setTimeout(() => {
        process.exit(0);
      }, seconds * 1000);
    `.trim()
  }
}




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
    
    // ウィンドウの初期サイズとスタイルの設定
    win.style.width = '640px';
    win.style.height = '450px';
    const content = win.querySelector('.window-content');
    content.style.display = 'flex';
    content.style.flexDirection = 'column';
    content.style.backgroundColor = '#1e1e1e';
    content.style.padding = '0';

    const termContainer = document.createElement('div');
    termContainer.style.flex = '1';
    termContainer.setAttribute('data-term-id', termId);
    content.appendChild(termContainer);

    const inputArea = document.createElement('div');
    inputArea.style.display = 'flex';
    inputArea.style.padding = '10px';
    inputArea.style.backgroundColor = '#2d2d2d';

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'コマンドを入力...';
    inputField.style.flex = '1';
    inputField.style.backgroundColor = '#3c3c3c';
    inputField.style.color = '#fff';
    inputField.style.border = 'none';
    inputField.style.padding = '8px';

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
        fontFamily: '"Fira Code",monospace'
    });
    term.open(termContainer);
    this.openWindow(id);
    inputField.focus();

    const shellProcess = await this.webcontainerInstance.spawn('jsh', {
        terminal: { cols: term.cols, rows: term.rows }
    });

    const inputWriter = shellProcess.input.getWriter();
    this.terminalWriters.set(termId, inputWriter);

    // --- エラー検知およびフォーカス用関数 ---
    const focusOnError = (data) => {
  // 検知するキーワード
  const errorKeywords = ['Error:', 'RuntimeError', 'command not found', 'fatal', 'exception', 'test'];

  if (errorKeywords.some(kw => data.includes(kw))) {
    // 1. ページ内の全要素から最大の z-index を取得して、それを確実に超える
    const maxZ = Math.max(
      ...Array.from(document.querySelectorAll('body *'))
        .map(el => parseFloat(window.getComputedStyle(el).zIndex))
        .filter(z => !isNaN(z)), 
      1000 // 既存のウィンドウ管理より高いベースラインからスタート
    );

    const targetZ = maxZ + 10; // 余裕を持って+10

    // 2. ウィンドウを最前面に設定
    win.style.zIndex = targetZ;
    this.zIndex = targetZ; // WindowManagerの状態も更新
    win.classList.add('active');

    // 3. コントロールバーをクリックしたことにする
    const controlBar = win.querySelector('.control-bar');
    if (controlBar) {
      // 既存の mousedown イベントリスナー（bringToFront等）を確実に叩く
      const opts = { bubbles: true, cancelable: true, view: window };
      controlBar.dispatchEvent(new MouseEvent('mousedown', opts));
      controlBar.dispatchEvent(new MouseEvent('mouseup', opts));
      controlBar.click();
    }

    // 4. ターミナルの入力欄に強制フォーカス
    setTimeout(() => {
      inputField.focus();
    }, 10);

    console.log(`[Alert] Stderr/Error detected. Window focus updated to z-index: ${targetZ}`);
  }
};

    let retryCount = 0;
    const retryDelays = [200, 300, 400, 500];
    let isCommandConfirmed = false;

    shellProcess.output.pipeTo(new WritableStream({
        write: (data) => {
            // エラーを検知したらフォーカス
            focusOnError(data);

            if (data.includes('[[GUI:')) {
                isCommandConfirmed = true;
                const match = data.match(/\[\[GUI:(.*?)\]\]/);
                if (match) {
                    try {
                        const guiData = JSON.parse(match[1]);
                        guiData.termId = termId;
                        windowManager.handleGuiCommand(guiData);
                        term.write(data.replace(/\[\[GUI:.*\]\]/, ''));
                        return;
                    } catch (e) {
                        console.error("GUI JSON Parse Error:", e);
                    }
                }
            }

            if (autorun && !isCommandConfirmed && (data.includes('command not found') || data.includes("reading 'exitCode'"))) {
                const delay = retryDelays[retryCount] || 500;
                retryCount++;
                term.write(`\r\n\x1b[33m[System] 起動エラーを検知しました。${delay}ms後にリトライします(${retryCount})...\x1b[0m\r\n`);
                setTimeout(async () => {
                    if (!isCommandConfirmed) {
                        await inputWriter.write(autorun + "\n");
                    }
                }, delay);
            }
            term.write(data);
        },
        close() {
            const winEl = document.getElementById(id);
            if (winEl) windowManager.closeWindow(winEl);
        }
    }));

    const sendInput = async () => {
        const val = inputField.value;
        if (val.trim()) {
            isCommandConfirmed = true;
            await inputWriter.write(val + "\n");
            inputField.value = '';
        }
    };

    sendBtn.onclick = sendInput;
    inputField.onkeydown = (e) => {
        if (e.key === 'Enter') {
            sendInput();
            e.preventDefault();
        }
    };

    (async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        try {
            const bootContent = await this.webcontainerInstance.fs.readFile('boot.sh', 'utf-8');
            const aliasLines = bootContent.split('\n').map(line => line.trim()).filter(line => line.startsWith('alias '));
            if (aliasLines.length > 0) {
                term.write('\r\n\x1b[32m[System] エイリアスを適用中...\x1b[0m\r\n');
                await inputWriter.write(aliasLines.join(';') + "\n");
            }
            if (autorun) {
                await new Promise(resolve => setTimeout(resolve, 200));
                await inputWriter.write(autorun + "\n");
            }
        } catch (err) {
            term.write('\r\n\x1b[31m[Error] boot.shの読み込みに失敗しました。\x1b[0m\r\n');
        }
    })();
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
            let finalAutorun = config.autorun;
            
            // titleからrunコマンドを抽出する既存ロジック
            if (!finalAutorun && config.title) {
                const runIndex = config.title.indexOf('run ');
                if (runIndex !== -1) {
                    finalAutorun = config.title.substring(runIndex + 4).replace(/["']/g, '').trim();
                }
            }

            // 新しいターミナルウィンドウを作成
            // ここで terminal="hide" のようなフラグは渡さないため、通常表示される
            this.createTerminalWindow(config.title || 'Terminal', finalAutorun);
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
        // すでに left や top がインラインスタイルで設定されているかチェック
        // (XMLの処理で win.style.left = ... とした場合はここが真になる)
        const hasPosition = win.style.left !== '' && win.style.top !== '';

        if (!hasPosition) {
            const winRect = win.getBoundingClientRect();
            const offset = (this.windows.size % 10) * 20;
            win.style.left = `${(window.innerWidth - winRect.width) / 2 + offset}px`;
            win.style.top = `${(window.innerHeight - winRect.height) / 2 + offset}px`;
        }

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
    // 画面上の全ウィンドウから最大のz-indexを探して、それより1高くする
    const allWindows = Array.from(document.querySelectorAll('.window'));
    const maxZ = allWindows.reduce((max, el) => {
        const z = parseInt(el.style.zIndex) || 0;
        return Math.max(max, z);
    }, this.zIndex);

    this.zIndex = maxZ + 1;
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
    const radius = xmlRoot.getAttribute('radius') || '24px';
    const showBar = xmlRoot.getAttribute('bar') !== 'false';
    const allowResize = xmlRoot.getAttribute('size-change') !== 'false';
    const position = xmlRoot.getAttribute('position');
    const terminalVisibility = xmlRoot.getAttribute('terminal');
    const windowPadding = xmlRoot.getAttribute('padding') || '12px';
    const titleEl = xmlRoot.querySelector('title');
    const title = titleEl ? titleEl.textContent : 'XML Window';

    const winId = appId ? `xml-${appId}` : `xml-win-${++this.dialogCounter}`;
    const win = document.createElement('div');
    win.className = 'window';
    win.id = winId;

    // --- 【修正ポイント】Window本体へのstyle属性適用 ---
    const customWinStyle = xmlRoot.getAttribute('style');
    if (customWinStyle) {
        win.style.cssText += customWinStyle;
    }
    // ----------------------------------------------

    win.style.width = width;
    win.style.height = height;
    win.style.borderRadius = radius;

    if (position) {
        const match = position.match(/\(([^,]+),([^)]+)\)/);
        if (match) {
            win.style.left = match[1].trim();
            win.style.top = match[2].trim();
            win.setAttribute('data-positioned', 'true');
            win.classList.add('no-resize');
        }
    }

    if (!allowResize) {
        win.classList.add('no-resize');
    }

    win.innerHTML = `
        ${showBar ? `<div class="control-bar"><span class="bar-title">${title}</span><div class="close-btn-area"><div class="close-icon"></div></div></div>` : ''}
        <div class="window-content"></div>
    `;

    document.body.appendChild(win);
    this.setupWindow(win);
    this.xmlWindows.set(xmlFile, { winId, xmlString, xmlRoot, termId });

    // ターミナルの表示/非表示制御
    if (terminalVisibility === 'hide' && termId) {
        const termContainer = document.querySelector(`[data-term-id="${termId}"]`);
        if (termContainer) {
            const termWin = termContainer.closest('.window');
            if (termWin) termWin.style.display = 'none';
        } else if (termId === 'main') {
            const mainWin = document.getElementById('main-window');
            if (mainWin) mainWin.style.display = 'none';
        }
    }

    const content = win.querySelector('.window-content');
    content.style.padding = windowPadding;
    content.style.overflow = 'auto';

    for (const child of xmlRoot.childNodes) {
        if (child.nodeType === 1 && child.nodeName !== 'title') {
            const el = this.createXmlElement(child, xmlFile);
            if (el) content.appendChild(el);
        }
    }

    this.openWindow(winId);
}


closeXmlWindow(xmlFile) {
    const winData = this.xmlWindows.get(xmlFile);
    if (!winData) return;

    const win = document.getElementById(winData.winId);
    if (win) {
        // ターミナルを再表示する（隠されていた場合）
        if (winData.termId) {
            const termContainer = document.querySelector(`[data-term-id="${winData.termId}"]`);
            if (termContainer) {
                const termWin = termContainer.closest('.window');
                if (termWin) termWin.style.display = 'block';
            } else if (winData.termId === 'main') {
                const mainWin = document.getElementById('main-window');
                if (mainWin) mainWin.style.display = 'block';
            }
        }
        // ウィンドウを閉じる（アニメーション後に削除）
        this.closeWindow(win);
    }
    this.xmlWindows.delete(xmlFile);
}


createXmlElement(xmlNode, xmlFile) {
    const nodeName = xmlNode.nodeName.toLowerCase();
    let el = null;

    // 1. 基本となるHTML要素の生成
    switch (nodeName) {
        case 'vstack':
            el = document.createElement('div');
            el.style.display = 'flex';
            el.style.flexDirection = 'column';
            break;
        case 'hstack':
            el = document.createElement('div');
            el.style.display = 'flex';
            break;
        case 'button':
            el = document.createElement('button');
            const action = xmlNode.getAttribute('action');
            if (action) el.onclick = () => this.executeAction(action, xmlFile);
            break;
        case 'text-input':
            el = document.createElement('input');
            el.type = 'text';
            el.placeholder = xmlNode.textContent;
            const inputAction = xmlNode.getAttribute('action');
            if (inputAction) {
                el.oninput = () => this.executeAction(inputAction, xmlFile);
                el.onkeydown = (e) => { if (e.key === 'Enter') this.executeAction(inputAction, xmlFile); };
            }
            break;
        case 'text':
            el = document.createElement('p');
            el.textContent = xmlNode.textContent;
            el.style.margin = '0';
            break;
        case 'text-view':
            el = document.createElement('div');
            el.textContent = xmlNode.textContent;
            el.style.overflow = 'auto';
            el.style.whiteSpace = 'pre-wrap';
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
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.checked = xmlNode.getAttribute('status') === 'true';
            el.appendChild(cb);
            const span = document.createElement('span');
            span.textContent = xmlNode.textContent;
            el.appendChild(span);
            break;
    }

    if (el) {
        // 2. 子要素（入れ子構造）の処理
        if (['vstack', 'hstack', 'button'].includes(nodeName)) {
            for (const child of xmlNode.childNodes) {
                if (child.nodeType === 3 && nodeName === 'button') {
                    const text = child.textContent.trim();
                    if (text) el.appendChild(document.createTextNode(text));
                } else if (child.nodeType === 1) {
                    const childEl = this.createXmlElement(child, xmlFile);
                    if (childEl) el.appendChild(childEl);
                }
            }
        }

        // 3. IDの付与
        const id = xmlNode.getAttribute('id');
        if (id) el.setAttribute('data-xml-id', id);

        // 4. 個別属性（gap, width等）の適用
        const gap = xmlNode.getAttribute('gap');
        if (gap) el.style.gap = gap;
        const padding = xmlNode.getAttribute('padding');
        if (padding) el.style.padding = padding;
        const width = xmlNode.getAttribute('width');
        if (width) el.style.width = width;
        const height = xmlNode.getAttribute('height');
        if (height) el.style.height = height;
        const radius = xmlNode.getAttribute('radius');
        if (radius) el.style.borderRadius = radius;

        // 5. 【重要】style属性による全上書き（最優先）
        const customStyle = xmlNode.getAttribute('style');
        if (customStyle) {
            el.style.cssText += customStyle;
        }

        // 6. 特殊状態（無効化など）
        if (xmlNode.hasAttribute('disabled')) {
            el.style.filter = 'saturate(0) opacity(0.5)';
            el.style.pointerEvents = 'none';
        }
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
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: 'data.json'
    });

    const bgTerm = new Terminal({
        theme: {
            background: '#0c0c0c'
        },
        disableStdin: true
    });
    bgTerm.open(document.getElementById('bg-terminal'));

    const mainTerm = new Terminal({
        cursorBlink: true,
        fontFamily: '"Fira Code",monospace',
        theme: {
            background: '#1e1e1e'
        },
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
        terminal: {
            cols: mainTerm.cols,
            rows: mainTerm.rows
        }
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
                    } catch (e) {}
                }
            }
            mainTerm.write(data);
            bgTerm.write(data);
        },
        close() {
        // このターミナルのプロセスが終了したとき
        const winEl = document.getElementById(id);
        
        // このターミナル(termId)を親として持つXMLウィンドウだけを探して閉じる
        windowManager.xmlWindows.forEach((winData, xmlFile) => {
            if (winData.termId === termId) {
                // closeXmlWindowは内部でtermIdの再表示(display:block)を試みるが、
                // ターミナル自体が消滅する場合は単にGUIが閉じるだけになる
                windowManager.closeXmlWindow(xmlFile);
            }
        });

        if (winEl) windowManager.closeWindow(winEl);
    }
    }));

    await inputWriter.write("source boot.sh\n");
});