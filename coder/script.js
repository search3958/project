/**
 * NextGen Editor Core Engine
 * Canvas Rendering & Meta Programming Support
 */

class EditorEngine {
    constructor() {
        this.canvas = document.getElementById('editorCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.inputTrap = document.getElementById('inputTrap');
        this.minimap = document.getElementById('minimapCanvas');
        this.statusBarCursor = document.getElementById('cursorPos');
        
        // エディタ設定
        this.config = {
            fontSize: 14,
            lineHeight: 22,
            fontFamily: "'Fira Code', monospace",
            paddingLeft: 50, // 行番号用スペース
            textColor: '#d4d4d4',
            lineNumColor: '#858585',
            cursorColor: '#007acc',
            selectionColor: 'rgba(58, 61, 65, 0.5)'
        };

        // エディタの状態（巨大ファイルも扱えるよう配列管理を想定）
        this.state = {
            lines: [
                "// NextGen Editor Initialized",
                "function helloWorld() {",
                "    console.log('Hello from Canvas Renderer!');",
                "    return true;",
                "}",
                "",
                "// Try the REPL on the left sidebar!",
                "// You can modify this text using JavaScript."
            ],
            cursor: { line: 0, col: 0 },
            selection: { start: null, end: null }, // {line, col}
            scrollOffset: 0
        };

        this.init();
    }

    init() {
        // 初期化
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // 入力イベントのバインド
        this.inputTrap.addEventListener('input', (e) => this.handleInput(e));
        this.inputTrap.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.inputTrap.addEventListener('click', (e) => this.handleClick(e));
        
        // 初期値をInputTrapにセット（キャレット制御のため）
        this.syncInputTrap();

        // 描画ループ開始 (120fpsを目指す)
        this.renderLoop();
    }

    resizeCanvas() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
        
        // HiDPI対応
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = parent.clientWidth * dpr;
        this.canvas.height = parent.clientHeight * dpr;
        this.ctx.scale(dpr, dpr);
        
        // CSS上のサイズ
        this.canvas.style.width = parent.clientWidth + 'px';
        this.canvas.style.height = parent.clientHeight + 'px';
        
        this.draw();
    }

    // --- Core Logic ---

    handleInput(e) {
        // 簡易実装: 全テキストを書き換える（本来は差分更新すべき）
        const text = this.inputTrap.value;
        this.state.lines = text.split('\n');
        this.updateCursorFromInput();
        this.draw();
    }

    handleKeyDown(e) {
        // Tabキーなどの特殊処理
        if (e.key === 'Tab') {
            e.preventDefault();
            this.insertText('    ');
        }
    }

    handleClick(e) {
        // クリック位置からカーソル位置を計算するロジックが必要
        // 今回はInputTrapのネイティブ動作に任せて、位置のみ同期
        setTimeout(() => this.updateCursorFromInput(), 0);
    }

    syncInputTrap() {
        this.inputTrap.value = this.state.lines.join('\n');
    }

    updateCursorFromInput() {
        // input要素のselectionStartから行・列を逆算
        const val = this.inputTrap.value;
        const selStart = this.inputTrap.selectionStart;
        const selEnd = this.inputTrap.selectionEnd;

        // カーソル位置計算
        const beforeCursor = val.substring(0, selStart);
        const linesBefore = beforeCursor.split('\n');
        this.state.cursor.line = linesBefore.length - 1;
        this.state.cursor.col = linesBefore[linesBefore.length - 1].length;

        // 選択範囲計算
        if (selStart !== selEnd) {
            const beforeEnd = val.substring(0, selEnd);
            const linesEnd = beforeEnd.split('\n');
            this.state.selection = {
                start: { ...this.state.cursor },
                end: {
                    line: linesEnd.length - 1,
                    col: linesEnd[linesEnd.length - 1].length
                }
            };
        } else {
            this.state.selection = { start: null, end: null };
        }

        // UI更新
        this.statusBarCursor.textContent = `Ln ${this.state.cursor.line + 1}, Col ${this.state.cursor.col + 1}`;
    }

    // --- Meta Programming API Support ---

    // 現在のテキスト全体を取得
    getText() {
        return this.state.lines.join('\n');
    }

    // テキスト挿入
    insertText(text) {
        const start = this.inputTrap.selectionStart;
        const end = this.inputTrap.selectionEnd;
        const val = this.inputTrap.value;
        
        const newVal = val.substring(0, start) + text + val.substring(end);
        this.inputTrap.value = newVal;
        
        // カーソル移動
        this.inputTrap.selectionStart = this.inputTrap.selectionEnd = start + text.length;
        
        // 状態更新
        this.handleInput();
    }

    // 選択範囲のテキストを取得
    getSelectionText() {
        const start = this.inputTrap.selectionStart;
        const end = this.inputTrap.selectionEnd;
        return this.inputTrap.value.substring(start, end);
    }

    // 選択範囲を置換 (REPL用重要機能)
    replaceSelection(callbackOrString) {
        const currentSelection = this.getSelectionText();
        let newText = "";

        if (typeof callbackOrString === 'function') {
            newText = callbackOrString(currentSelection);
        } else {
            newText = callbackOrString;
        }

        this.insertText(newText);
    }

    // --- Rendering Engine (Canvas) ---

    renderLoop() {
        this.draw();
        requestAnimationFrame(() => this.renderLoop());
    }

    draw() {
        const { ctx, config, state } = this;
        
        // キャンバスクリア
        ctx.fillStyle = '#1e1e1e';
        ctx.fillRect(0, 0, this.canvas.width / window.devicePixelRatio, this.canvas.height / window.devicePixelRatio);

        ctx.font = `${config.fontSize}px ${config.fontFamily}`;
        ctx.textBaseline = 'middle';

        // 行ごとの描画
        state.lines.forEach((lineText, index) => {
            const y = index * config.lineHeight + (config.lineHeight / 2);
            
            // 1. 行番号描画
            ctx.fillStyle = config.lineNumColor;
            ctx.textAlign = 'right';
            ctx.fillText(index + 1, config.paddingLeft - 10, y);

            // 2. コード描画
            ctx.fillStyle = config.textColor;
            ctx.textAlign = 'left';
            
            // 簡単なシンタックスハイライト（キーワードのみ）
            // 本格実装にはここでTree-sitterの結果を参照する
            if (lineText.trim().startsWith('//')) {
                ctx.fillStyle = '#6a9955'; // Comment color
            } else if (lineText.includes('function') || lineText.includes('return')) {
                ctx.fillStyle = '#c586c0'; // Keyword color
            }
            
            ctx.fillText(lineText, config.paddingLeft, y);
        });

        // 3. カーソル描画 (単純化のため、固定幅フォント前提で座標計算)
        if (document.activeElement === this.inputTrap) {
            const charWidth = ctx.measureText('M').width; // 等幅フォントの幅概算
            const cursorX = config.paddingLeft + (state.cursor.col * charWidth);
            const cursorY = state.cursor.line * config.lineHeight;
            
            ctx.fillStyle = config.cursorColor;
            ctx.fillRect(cursorX, cursorY, 2, config.lineHeight);
            
            // 現在行のハイライト
            ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.fillRect(0, cursorY, this.canvas.width, config.lineHeight);
        }
    }
}

// --- Application Bootstrapping ---

const editor = new EditorEngine();

// --- Sidebar Meta REPL Implementation ---

const replInput = document.getElementById('replInput');
const runBtn = document.getElementById('runReplBtn');
const replOutput = document.getElementById('replOutput');

// エディタを操作するための公開APIオブジェクト
const editorAPI = {
    current: {
        // 全テキスト取得
        get text() { return editor.getText(); },
        
        // テキスト挿入
        insert: (text) => {
            editor.insertText(text);
            editor.inputTrap.focus();
        },
        
        // 選択範囲操作
        selection: {
            get text() { return editor.getSelectionText(); },
            replace: (fn) => {
                editor.replaceSelection(fn);
                editor.inputTrap.focus();
            }
        }
    }
};

function executeRepl() {
    const code = replInput.value;
    try {
        // 安全なサンドボックスではないが、プロトタイプとして機能させる
        // Functionコンストラクタで editorAPI を 'editor' として渡す
        const func = new Function('editor', code);
        const result = func(editorAPI);
        
        replOutput.innerText = `> Executed successfully.\nResult: ${result !== undefined ? result : 'void'}`;
        replOutput.style.color = '#a6e22e';
    } catch (e) {
        replOutput.innerText = `> Error: ${e.message}`;
        replOutput.style.color = '#f14c4c';
    }
}

runBtn.addEventListener('click', executeRepl);

// Ctrl+Enterで実行
replInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
        executeRepl();
    }
});