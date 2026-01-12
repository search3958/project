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
    }
};


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