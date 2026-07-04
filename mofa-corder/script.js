var defaultPlaygroundHTML = [
    '<style>',
    'body { font-family: sans-serif; margin: 0; padding: 20px; }',
    '.box {',
    '    width: 100px; height: 100px;',
    '    background-color: #3b82f6; color: white;',
    '    display: flex; align-items: center; justify-content: center;',
    '    border-radius: 8px; cursor: pointer; margin-bottom: 10px; user-select: none;',
    '}',
    '.box:active { transform: scale(0.95); }',
    '.circle { background-color: #ef4444; border-radius: 50%; }',
    '</style>',
    '<p>下の図形をクリックしてみてね</p>',
    '<div class="box target-box">target-box<br>クラス</div>',
    '<div class="box circle target-circle">target-circle<br>クラス</div>'
].join('\n');

function initPlayground() {
    var iframe = document.getElementById('playground');
    var doc = iframe.contentDocument || iframe.contentWindow.document;
    doc.open();
    doc.write(defaultPlaygroundHTML);
    doc.close();
}

function getPlaygroundDoc() {
    var iframe = document.getElementById('playground');
    return iframe.contentDocument || iframe.contentWindow.document;
}

function syncHTMLtoEditor() {
    var doc = getPlaygroundDoc();
    document.getElementById('htmlEditor').value = doc.body.innerHTML;
}

Blockly.Blocks['event_class_clicked'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("「")
            .appendField(new Blockly.FieldTextInput("target-box"), "CLASS_NAME")
            .appendField("」が押されたとき");
        this.appendStatementInput("DO").setCheck(null);
        this.setColour('#FFBF00');
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    }
};

Blockly.Blocks['action_alert'] = {
    init: function() {
        this.appendValueInput("MESSAGE")
            .setCheck("String")
            .appendField("ポップアップで");
        this.appendDummyInput()
            .appendField("と表示する");
        this.setColour('#4C97FF');
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
    }
};

javascript.javascriptGenerator.forBlock['event_class_clicked'] = function(block, generator) {
    var className = block.getFieldValue('CLASS_NAME');
    var statements_do = generator.statementToCode(block, 'DO');
    
    var code = `
        document.querySelectorAll('.${className}').forEach(function(el) {
            el.addEventListener('click', function() {
                ${statements_do}
            });
        });\n`;
    return code;
};

javascript.javascriptGenerator.forBlock['action_alert'] = function(block, generator) {
    var value_message = generator.valueToCode(block, 'MESSAGE', javascript.Order.ATOMIC) || "''";
    return 'alert(' + value_message + ');\n';
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
    document.getElementById('htmlDiv').style.display = 'none';
    
    if (tabName === 'blocks') {
        document.getElementById('blocklyDiv').style.display = 'block';
    } else if (tabName === 'code') {
        document.getElementById('codeDiv').style.display = 'block';
    } else if (tabName === 'html') {
        syncHTMLtoEditor();
        document.getElementById('htmlDiv').style.display = 'flex';
        document.getElementById('htmlDiv').style.flexDirection = 'column';
    }
}

document.getElementById('htmlEditor').addEventListener('input', function() {
    var doc = getPlaygroundDoc();
    doc.body.innerHTML = this.value;
});

document.getElementById('htmlEditor').addEventListener('keydown', function(e) {
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

function runCode() {
    var code = document.getElementById('codeOutput').value;
    var doc = getPlaygroundDoc();
    
    try {
        var fn = new Function(code);
        fn.call(doc.defaultView);
        console.log("プログラムを反映しました。");
    } catch (e) {
        alert('エラー: ' + e);
    }
    
    if (document.getElementById('htmlDiv').style.display !== 'none') {
        syncHTMLtoEditor();
    }
}

initPlayground();
