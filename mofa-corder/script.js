import { parseCustomSyntax, initCanvasEngine } from './uiscript-engine.js';
import { initWasm } from './wasm-wrapper.js';

const DEFAULT_UISCRIPT = `body {
  header {
    p {"Mofa Coder"}
  }
  h1 {" UIScript デモ "}
  p { "UIScriptで作られたUIです。" }
  br { "" }
  button { "ボタン A" }
  .id:btn-a
  br { "" }
  div {
    option { "選択肢 1" }
    option { "選択肢 2" }
    option { "選択肢 3" }
  }
  .flex
  .gap:10px
  .radius:8px
  br { "" }
  p { "テキスト入力：" }
  input { "ここに入力..." }
  .id:my-input
  .width:full
}`;

let currentEngine = null;

document.getElementById('uiscriptEditor').value = DEFAULT_UISCRIPT;

document.getElementById('uiscriptEditor').addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 2;
    }
});

document.getElementById('codeOutput').addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
        this.selectionStart = this.selectionEnd = start + 2;
    }
});

Blockly.Blocks['uiscript_button'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("ボタン")
            .appendField(new Blockly.FieldTextInput("テキスト"), "TEXT")
            .appendField(" ID:")
            .appendField(new Blockly.FieldTextInput("my-btn"), "ID");
        this.setColour('#4C97FF');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['uiscript_text'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("テキスト")
            .appendField(new Blockly.FieldTextInput("メッセージ"), "TEXT")
            .appendField(" ID:")
            .appendField(new Blockly.FieldTextInput("my-text"), "ID");
        this.setColour('#4C97FF');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['uiscript_heading'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("見出し")
            .appendField(new Blockly.FieldDropdown([["H1","h1"],["H3","h3"]]), "LEVEL")
            .appendField(new Blockly.FieldTextInput("タイトル"), "TEXT")
            .appendField(" ID:")
            .appendField(new Blockly.FieldTextInput("my-heading"), "ID");
        this.setColour('#4C97FF');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['uiscript_input'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("入力欄")
            .appendField(new Blockly.FieldTextInput("プレースホルダ"), "TEXT")
            .appendField(" ID:")
            .appendField(new Blockly.FieldTextInput("my-input"), "ID");
        this.setColour('#4C97FF');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['uiscript_on_click'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("要素「")
            .appendField(new Blockly.FieldTextInput("my-btn"), "ID")
            .appendField("」がクリックされたとき");
        this.appendStatementInput("DO").setCheck(null);
        this.setColour('#FF6B6B');
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    }
};

Blockly.Blocks['uiscript_set_text'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .setCheck("String")
            .appendField("要素「")
            .appendField(new Blockly.FieldTextInput("my-text"), "ID")
            .appendField("」のテキストを");
        this.appendDummyInput()
            .appendField("に変更する");
        this.setColour('#FF6B6B');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['uiscript_get_text'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("要素「")
            .appendField(new Blockly.FieldTextInput("my-input"), "ID")
            .appendField("」のテキスト");
        this.setOutput(true, "String");
        this.setColour('#FF6B6B');
    }
};

Blockly.Blocks['uiscript_alert'] = {
    init: function() {
        this.appendValueInput("MESSAGE")
            .setCheck("String")
            .appendField("アラートで");
        this.appendDummyInput()
            .appendField("と表示する");
        this.setColour('#FF6B6B');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

javascript.javascriptGenerator.forBlock['uiscript_button'] = function(block) {
    var text = block.getFieldValue('TEXT');
    var id = block.getFieldValue('ID');
    return `ui.setText("${id}", "${text}");\n`;
};

javascript.javascriptGenerator.forBlock['uiscript_text'] = function(block) {
    var text = block.getFieldValue('TEXT');
    var id = block.getFieldValue('ID');
    return `ui.setText("${id}", "${text}");\n`;
};

javascript.javascriptGenerator.forBlock['uiscript_heading'] = function(block) {
    var level = block.getFieldValue('LEVEL');
    var text = block.getFieldValue('TEXT');
    var id = block.getFieldValue('ID');
    return `ui.setText("${id}", "${text}");\n`;
};

javascript.javascriptGenerator.forBlock['uiscript_input'] = function(block) {
    return '';
};

javascript.javascriptGenerator.forBlock['uiscript_on_click'] = function(block) {
    var id = block.getFieldValue('ID');
    var statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `ui.on("click", function(e) {\n  if (e.id === "${id}") {\n${statements}  }\n});\n`;
};

javascript.javascriptGenerator.forBlock['uiscript_set_text'] = function(block) {
    var id = block.getFieldValue('ID');
    var value = javascript.javascriptGenerator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC) || "''";
    return `ui.setText("${id}", ${value});\n`;
};

javascript.javascriptGenerator.forBlock['uiscript_get_text'] = function(block) {
    var id = block.getFieldValue('ID');
    var code = `ui.getText("${id}")`;
    return [code, javascript.Order.MEMBER];
};

javascript.javascriptGenerator.forBlock['uiscript_alert'] = function(block) {
    var value = javascript.javascriptGenerator.valueToCode(block, 'MESSAGE', javascript.Order.ATOMIC) || "''";
    return `alert(${value});\n`;
};

var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    renderer: 'zelos',
    theme: Blockly.Themes.Zelos,
    grid: {spacing: 20, length: 3, colour: '#e2e8f0', snap: true},
    trashcan: true
});

workspace.addChangeListener(function() {
    var code = javascript.javascriptGenerator.workspaceToCode(workspace);
    document.getElementById('codeOutput').value = code;
});

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('blocklyDiv').style.display = 'none';
    document.getElementById('codeDiv').style.display = 'none';
    document.getElementById('uiscriptDiv').style.display = 'none';
    
    if (tabName === 'blocks') {
        document.getElementById('blocklyDiv').style.display = 'block';
    } else if (tabName === 'code') {
        document.getElementById('codeDiv').style.display = 'block';
    } else if (tabName === 'uiscript') {
        document.getElementById('uiscriptDiv').style.display = 'block';
    }
}
window.switchTab = switchTab;

async function runUIScript() {
    const code = document.getElementById('codeOutput').value;
    const uscript = document.getElementById('uiscriptEditor').value;
    const container = document.getElementById('playground');

    if (currentEngine) {
        currentEngine.destroy();
        currentEngine = null;
    }
    container.innerHTML = '';

    await initWasm();

    try {
        const ast = parseCustomSyntax(uscript);
        currentEngine = initCanvasEngine(ast, container);

        if (code.trim()) {
            const sandbox = { ui: currentEngine, alert: alert };
            const fn = new Function('ui', 'alert', code);
            fn(currentEngine, alert);
        }
    } catch (e) {
        container.innerHTML = '<div style="padding:20px;color:red;font-family:monospace;">' + e.message + '</div>';
        console.error(e);
    }
}
window.runUIScript = runUIScript;

runUIScript();
