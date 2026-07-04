import { parseCustomSyntax, initCanvasEngine } from './uiscript-engine.js';
import { initWasm } from './wasm-wrapper.js';
import { MofaLang } from './mofa-lang.js';

const DEFAULT_UISCRIPT = `body {
  header {
    p {"Hello"}
  }
  p {"UI Script と Blockly の往復を確認するためのサンプルです。"}
  div {
    button {"スタート"}
    .id:counter
    button {"キャンセル"}
    .id:reset
  }
  .flex
  .gap:12px
  .radius:14px
  .padding:16px
  .bgColor:#ffffff
}`;

const DEFAULT_CODE = `event.clicked:#count{
  control.role:#count{
    var.counter:([(counter) + 1])
    effect.bgColor:#ff4d4f
    control.wait:0.2
    effect.bgColor:#0066ff
  }
}

event.clicked:#reset{
  var.counter:0
}

`;

let currentEngine = null;
let currentLang = new MofaLang();

document.getElementById('uiscriptEditor').value = DEFAULT_UISCRIPT;
document.getElementById('codeOutput').value = DEFAULT_CODE;

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

Blockly.Blocks['layout_set'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("layout.")
            .appendField(new Blockly.FieldDropdown([
                ["width", "width"], ["height", "height"], ["gap", "gap"],
                ["position", "position"], ["top", "top"], ["left", "left"],
                ["right", "right"], ["bottom", "bottom"]
            ]), "PROP")
            .appendField(":")
            .appendField(new Blockly.FieldTextInput("100px"), "VALUE");
        this.setColour('#3498db');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['layout_mode'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("layout.")
            .appendField(new Blockly.FieldDropdown([["flex", "flex"], ["block", "block"]]), "MODE");
        this.setColour('#3498db');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['effect_set'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("effect.")
            .appendField(new Blockly.FieldDropdown([
                ["bgColor", "bgColor"], ["fgColor", "fgColor"], ["size", "size"],
                ["radius", "radius"], ["shadow", "shadow"], ["font", "font"]
            ]), "PROP")
            .appendField(":")
            .appendField(new Blockly.FieldTextInput("#0066ff"), "VALUE");
        this.setColour('#9b59b6');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['effect_filter'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("effect.")
            .appendField(new Blockly.FieldDropdown([["bgFilter", "bgFilter"], ["fgFilter", "fgFilter"]]), "TYPE")
            .appendField(":")
            .appendField(new Blockly.FieldTextInput("blur(1px)"), "VALUE");
        this.setColour('#9b59b6');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['event_loaded'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("event.loaded{");
        this.appendStatementInput("DO").setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setColour('#FFBF00');
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    }
};

Blockly.Blocks['event_clicked'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("event.clicked:")
            .appendField(new Blockly.FieldTextInput("#btn-a"), "SELECTOR")
            .appendField("{");
        this.appendStatementInput("DO").setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setColour('#FFBF00');
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    }
};

Blockly.Blocks['event_click'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("event.click:")
            .appendField(new Blockly.FieldTextInput("#btn-a"), "SELECTOR");
        this.setColour('#FFBF00');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['event_key'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("event.key:")
            .appendField(new Blockly.FieldTextInput("A"), "KEY")
            .appendField("{");
        this.appendStatementInput("DO").setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setColour('#FFBF00');
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    }
};

Blockly.Blocks['event_getMessage'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("event.getMessage:")
            .appendField(new Blockly.FieldTextInput("name"), "NAME")
            .appendField("{");
        this.appendStatementInput("DO").setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setColour('#FFBF00');
        this.setPreviousStatement(false);
        this.setNextStatement(false);
    }
};

Blockly.Blocks['event_sendMessage'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("event.sendMessage:")
            .appendField(new Blockly.FieldTextInput("name"), "NAME");
        this.setColour('#FFBF00');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['control_wait'] = {
    init: function() {
        this.appendValueInput("TIME")
            .setCheck("Number")
            .appendField("control.wait:");
        this.setColour('#FF6B6B');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['control_for'] = {
    init: function() {
        this.appendValueInput("COUNT")
            .setCheck("Number")
            .appendField("control.for:");
        this.appendDummyInput()
            .appendField("{");
        this.appendStatementInput("DO").setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setColour('#FF6B6B');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['control_forever'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("control.for{");
        this.appendStatementInput("DO").setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setColour('#FF6B6B');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['control_if'] = {
    init: function() {
        this.appendValueInput("COND")
            .setCheck(null)
            .appendField("control.if:(");
        this.appendDummyInput()
            .appendField("){");
        this.appendStatementInput("DO").setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setColour('#FF6B6B');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['control_waitFor'] = {
    init: function() {
        this.appendValueInput("COND")
            .setCheck(null)
            .appendField("control.waitFor:(");
        this.appendDummyInput()
            .appendField(")");
        this.setColour('#FF6B6B');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['control_role'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("control.role:")
            .appendField(new Blockly.FieldTextInput(".name"), "SELECTOR")
            .appendField("{");
        this.appendStatementInput("DO").setCheck(null);
        this.appendDummyInput()
            .appendField("}");
        this.setColour('#FF6B6B');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['var_set'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("var.")
            .appendField(new Blockly.FieldTextInput("varName"), "NAME")
            .appendField(":");
        this.appendValueInput("VALUE")
            .setCheck(null);
        this.setColour('#9b59b6');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.Blocks['var_get'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldTextInput("varName"), "NAME");
        this.setOutput(true, null);
        this.setColour('#9b59b6');
    }
};

Blockly.Blocks['var_number'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldNumber(0), "NUM");
        this.setOutput(true, "Number");
        this.setColour('#9b59b6');
    }
};

Blockly.Blocks['var_string'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('"')
            .appendField(new Blockly.FieldTextInput("Hello"), "TEXT")
            .appendField('"');
        this.setOutput(true, "String");
        this.setColour('#9b59b6');
    }
};

Blockly.Blocks['var_builtin'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("(")
            .appendField(new Blockly.FieldDropdown([
                ["key", "key"], ["mouseX", "mouseX"], ["mouseY", "mouseY"],
                ["YYYY", "YYYY"], ["MM", "MM"], ["DD", "DD"]
            ]), "NAME")
            .appendField(")");
        this.setOutput(true, null);
        this.setColour('#3498db');
    }
};

Blockly.Blocks['logic_compare'] = {
    init: function() {
        this.appendValueInput("A");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["=", "="], ["≠", "!="], ["<", "<"], [">", ">"], ["≤", "<="], ["≥", ">="]]), "OP");
        this.appendValueInput("B");
        this.setColour('#FF6B6B');
        this.setOutput(true, "Boolean");
    }
};

Blockly.Blocks['logic_operation'] = {
    init: function() {
        this.appendValueInput("A");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["and", "and"], ["or", "or"]]), "OP");
        this.appendValueInput("B");
        this.setColour('#FF6B6B');
        this.setOutput(true, "Boolean");
    }
};

Blockly.Blocks['logic_not'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("not (");
        this.appendValueInput("BOOL")
            .setCheck("Boolean");
        this.appendDummyInput()
            .appendField(")");
        this.setColour('#FF6B6B');
        this.setOutput(true, "Boolean");
    }
};

Blockly.Blocks['math_binop'] = {
    init: function() {
        this.appendValueInput("A");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["+", "+"], ["-", "-"], ["*", "*"], ["/", "/"]]), "OP");
        this.appendValueInput("B");
        this.setColour('#9b59b6');
        this.setOutput(true, "Number");
    }
};

Blockly.Blocks['math_long'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .setCheck("String")
            .appendField("(");
        this.appendDummyInput()
            .appendField(") long");
        this.setColour('#9b59b6');
        this.setOutput(true, "Number");
    }
};

Blockly.Blocks['math_include'] = {
    init: function() {
        this.appendValueInput("VALUE")
            .setCheck("String")
            .appendField("(");
        this.appendDummyInput()
            .appendField(") include")
            .appendField(new Blockly.FieldTextInput("a"), "STR");
        this.setColour('#9b59b6');
        this.setOutput(true, "Boolean");
    }
};

javascript.javascriptGenerator.forBlock['layout_set'] = function(block) {
    var prop = block.getFieldValue('PROP');
    var value = block.getFieldValue('VALUE');
    return `layout.${prop}:${value}\n`;
};

javascript.javascriptGenerator.forBlock['layout_mode'] = function(block) {
    var mode = block.getFieldValue('MODE');
    return `layout.${mode}\n`;
};

javascript.javascriptGenerator.forBlock['effect_set'] = function(block) {
    var prop = block.getFieldValue('PROP');
    var value = block.getFieldValue('VALUE');
    return `effect.${prop}:${value}\n`;
};

javascript.javascriptGenerator.forBlock['effect_filter'] = function(block) {
    var type = block.getFieldValue('TYPE');
    var value = block.getFieldValue('VALUE');
    return `effect.${type}:${value}\n`;
};

javascript.javascriptGenerator.forBlock['event_loaded'] = function(block) {
    var statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `event.loaded{\n${statements}}\n`;
};

javascript.javascriptGenerator.forBlock['event_clicked'] = function(block) {
    var selector = block.getFieldValue('SELECTOR');
    var statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `event.clicked:${selector}{\n${statements}}\n`;
};

javascript.javascriptGenerator.forBlock['event_click'] = function(block) {
    var selector = block.getFieldValue('SELECTOR');
    return `event.click:${selector}\n`;
};

javascript.javascriptGenerator.forBlock['event_key'] = function(block) {
    var key = block.getFieldValue('KEY');
    var statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `event.key:${key}{\n${statements}}\n`;
};

javascript.javascriptGenerator.forBlock['event_getMessage'] = function(block) {
    var name = block.getFieldValue('NAME');
    var statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `event.getMessage:${name}{\n${statements}}\n`;
};

javascript.javascriptGenerator.forBlock['event_sendMessage'] = function(block) {
    var name = block.getFieldValue('NAME');
    return `event.sendMessage:${name}\n`;
};

javascript.javascriptGenerator.forBlock['control_wait'] = function(block) {
    var time = javascript.javascriptGenerator.valueToCode(block, 'TIME', javascript.Order.ATOMIC) || '1';
    return `control.wait:${time}\n`;
};

javascript.javascriptGenerator.forBlock['control_for'] = function(block) {
    var count = javascript.javascriptGenerator.valueToCode(block, 'COUNT', javascript.Order.ATOMIC) || '10';
    var statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `control.for:${count}{\n${statements}}\n`;
};

javascript.javascriptGenerator.forBlock['control_forever'] = function(block) {
    var statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `control.for{\n${statements}}\n`;
};

javascript.javascriptGenerator.forBlock['control_if'] = function(block) {
    var cond = javascript.javascriptGenerator.valueToCode(block, 'COND', javascript.Order.ATOMIC) || 'true';
    var statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `control.if:(${cond}){\n${statements}}\n`;
};

javascript.javascriptGenerator.forBlock['control_waitFor'] = function(block) {
    var cond = javascript.javascriptGenerator.valueToCode(block, 'COND', javascript.Order.ATOMIC) || 'true';
    return `control.waitFor:(${cond})\n`;
};

javascript.javascriptGenerator.forBlock['control_role'] = function(block) {
    var selector = block.getFieldValue('SELECTOR');
    var statements = javascript.javascriptGenerator.statementToCode(block, 'DO');
    return `control.role:${selector}{\n${statements}}\n`;
};

javascript.javascriptGenerator.forBlock['var_set'] = function(block) {
    var name = block.getFieldValue('NAME');
    var value = javascript.javascriptGenerator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC) || '0';
    return `var.${name}:${value}\n`;
};

javascript.javascriptGenerator.forBlock['var_get'] = function(block) {
    var name = block.getFieldValue('NAME');
    return [name, javascript.Order.MEMBER];
};

javascript.javascriptGenerator.forBlock['var_number'] = function(block) {
    var num = block.getFieldValue('NUM');
    return [num, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['var_string'] = function(block) {
    var text = block.getFieldValue('TEXT');
    return [`"${text}"`, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['var_builtin'] = function(block) {
    var name = block.getFieldValue('NAME');
    return [`(${name})`, javascript.Order.MEMBER];
};

javascript.javascriptGenerator.forBlock['logic_compare'] = function(block) {
    var op = block.getFieldValue('OP');
    var a = javascript.javascriptGenerator.valueToCode(block, 'A', javascript.Order.ATOMIC) || '0';
    var b = javascript.javascriptGenerator.valueToCode(block, 'B', javascript.Order.ATOMIC) || '0';
    return [`(${a} ${op} ${b})`, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['logic_operation'] = function(block) {
    var op = block.getFieldValue('OP');
    var a = javascript.javascriptGenerator.valueToCode(block, 'A', javascript.Order.ATOMIC) || 'true';
    var b = javascript.javascriptGenerator.valueToCode(block, 'B', javascript.Order.ATOMIC) || 'true';
    return [`(${a} ${op} ${b})`, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['logic_not'] = function(block) {
    var bool = javascript.javascriptGenerator.valueToCode(block, 'BOOL', javascript.Order.ATOMIC) || 'true';
    return [`not (${bool})`, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['math_binop'] = function(block) {
    var op = block.getFieldValue('OP');
    var a = javascript.javascriptGenerator.valueToCode(block, 'A', javascript.Order.ATOMIC) || '0';
    var b = javascript.javascriptGenerator.valueToCode(block, 'B', javascript.Order.ATOMIC) || '0';
    return [`[${a} ${op} ${b}]`, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['math_long'] = function(block) {
    var value = javascript.javascriptGenerator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC) || '""';
    return [`[${value} long]`, javascript.Order.ATOMIC];
};

javascript.javascriptGenerator.forBlock['math_include'] = function(block) {
    var value = javascript.javascriptGenerator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC) || '""';
    var str = block.getFieldValue('STR');
    return [`[${value} include "${str}"]`, javascript.Order.ATOMIC];
};

var workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    renderer: 'zelos',
    theme: Blockly.Themes.Zelos,
    grid: {spacing: 20, length: 3, colour: '#e2e8f0', snap: true},
    trashcan: true
});

var syncing = false;

workspace.addChangeListener(function() {
    if (syncing) return;
    syncing = true;
    var code = javascript.javascriptGenerator.workspaceToCode(workspace);
    document.getElementById('codeOutput').value = code;
    syncing = false;
});

function codeToBlocks(code) {
    if (syncing) return;
    syncing = true;
    try {
        var topBlocks = workspace.getTopBlocks(true);
        topBlocks.forEach(function(b) { b.dispose(); });

        var root = { children: [] };
        var stack = [root];
        var lines = code.split('\n');

        function currentFrame() {
            return stack[stack.length - 1];
        }

        function addNode(node) {
            currentFrame().children.push(node);
            return node;
        }

        function parseLine(trimmed) {
            var m;

            if ((m = trimmed.match(/^event\.loaded\{\s*\}$/))) {
                return { type: 'event_loaded', children: [] };
            }
            if ((m = trimmed.match(/^event\.clicked:(.+)\{\s*\}$/))) {
                return { type: 'event_clicked', selector: m[1], children: [] };
            }
            if ((m = trimmed.match(/^event\.key:(.+)\{\s*\}$/))) {
                return { type: 'event_key', key: m[1], children: [] };
            }
            if ((m = trimmed.match(/^event\.getMessage:(.+)\{\s*\}$/))) {
                return { type: 'event_getMessage', name: m[1], children: [] };
            }
            if ((m = trimmed.match(/^control\.for:(.+)\{\s*\}$/))) {
                return { type: 'control_for', count: m[1], children: [] };
            }
            if ((m = trimmed.match(/^control\.for\{\s*\}$/))) {
                return { type: 'control_forever', children: [] };
            }
            if ((m = trimmed.match(/^control\.if:\((.+)\)\{\s*\}$/))) {
                return { type: 'control_if', cond: m[1], children: [] };
            }
            if ((m = trimmed.match(/^control\.role:(.+)\{\s*\}$/))) {
                return { type: 'control_role', selector: m[1], children: [] };
            }
            if ((m = trimmed.match(/^event\.loaded\{$/))) {
                return { type: 'event_loaded', children: [], open: true };
            }
            if ((m = trimmed.match(/^event\.clicked:(.+)\{$/))) {
                return { type: 'event_clicked', selector: m[1], children: [], open: true };
            }
            if ((m = trimmed.match(/^event\.key:(.+)\{$/))) {
                return { type: 'event_key', key: m[1], children: [], open: true };
            }
            if ((m = trimmed.match(/^event\.getMessage:(.+)\{$/))) {
                return { type: 'event_getMessage', name: m[1], children: [], open: true };
            }
            if ((m = trimmed.match(/^control\.for:(.+)\{$/))) {
                return { type: 'control_for', count: m[1], children: [], open: true };
            }
            if ((m = trimmed.match(/^control\.for\{$/))) {
                return { type: 'control_forever', children: [], open: true };
            }
            if ((m = trimmed.match(/^control\.if:\((.+)\)\{$/))) {
                return { type: 'control_if', cond: m[1], children: [], open: true };
            }
            if ((m = trimmed.match(/^control\.role:(.+)\{$/))) {
                return { type: 'control_role', selector: m[1], children: [], open: true };
            }

            if ((m = trimmed.match(/^layout\.(flex|block)$/))) {
                return { type: 'layout_mode', mode: m[1] };
            }
            if ((m = trimmed.match(/^layout\.(\w+):?(.*)$/))) {
                return { type: 'layout_set', prop: m[1], value: m[2] || '' };
            }
            if ((m = trimmed.match(/^effect\.(\w+):(.+)$/))) {
                return { type: 'effect_set', prop: m[1], value: m[2] };
            }
            if ((m = trimmed.match(/^event\.click:(.+)$/))) {
                return { type: 'event_click', selector: m[1] };
            }
            if ((m = trimmed.match(/^event\.sendMessage:(.+)$/))) {
                return { type: 'event_sendMessage', name: m[1] };
            }
            if ((m = trimmed.match(/^control\.wait:(.+)$/))) {
                return { type: 'control_wait', time: m[1] };
            }
            if ((m = trimmed.match(/^control\.waitFor:\((.+)\)$/))) {
                return { type: 'control_waitFor', cond: m[1] };
            }
            if ((m = trimmed.match(/^var\.(\w+):(.+)$/))) {
                return { type: 'var_set', name: m[1], value: m[2] };
            }

            return null;
        }

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var trimmed = line.trim();

            if (!trimmed) continue;

            if (trimmed === '}') {
                if (stack.length > 1) stack.pop();
                continue;
            }

            var node = parseLine(trimmed);
            if (!node) continue;

            addNode(node);
            if (node.open) {
                stack.push(node);
            }
        }

        function instantiateNode(node) {
            var block = null;
            var childBlocks = [];
            var i;

            if (node.type === 'layout_set') {
                block = workspace.newBlock('layout_set');
                block.getField('PROP').setValue(node.prop);
                block.getField('VALUE').setValue(node.value || '');
            } else if (node.type === 'layout_mode') {
                block = workspace.newBlock('layout_mode');
                block.getField('MODE').setValue(node.mode);
            } else if (node.type === 'effect_set') {
                if (node.prop === 'bgFilter' || node.prop === 'fgFilter') {
                    block = workspace.newBlock('effect_filter');
                    block.getField('TYPE').setValue(node.prop);
                    block.getField('VALUE').setValue(node.value || '');
                } else {
                    block = workspace.newBlock('effect_set');
                    block.getField('PROP').setValue(node.prop);
                    block.getField('VALUE').setValue(node.value || '');
                }
            } else if (node.type === 'event_loaded') {
                block = workspace.newBlock('event_loaded');
            } else if (node.type === 'event_clicked') {
                block = workspace.newBlock('event_clicked');
                block.getField('SELECTOR').setValue(node.selector);
            } else if (node.type === 'event_click') {
                block = workspace.newBlock('event_click');
                block.getField('SELECTOR').setValue(node.selector);
            } else if (node.type === 'event_key') {
                block = workspace.newBlock('event_key');
                block.getField('KEY').setValue(node.key);
            } else if (node.type === 'event_getMessage') {
                block = workspace.newBlock('event_getMessage');
                block.getField('NAME').setValue(node.name);
            } else if (node.type === 'event_sendMessage') {
                block = workspace.newBlock('event_sendMessage');
                block.getField('NAME').setValue(node.name);
            } else if (node.type === 'control_wait') {
                block = workspace.newBlock('control_wait');
                var timeBlock = workspace.newBlock('var_number');
                timeBlock.getField('NUM').setValue(parseFloat(node.time) || 1);
                timeBlock.initSvg();
                timeBlock.render();
                block.getInput('TIME').connection.connect(timeBlock.outputConnection);
            } else if (node.type === 'control_for') {
                block = workspace.newBlock('control_for');
                var countBlock = workspace.newBlock('var_number');
                countBlock.getField('NUM').setValue(parseFloat(node.count) || 10);
                countBlock.initSvg();
                countBlock.render();
                block.getInput('COUNT').connection.connect(countBlock.outputConnection);
            } else if (node.type === 'control_forever') {
                block = workspace.newBlock('control_forever');
            } else if (node.type === 'control_if') {
                block = workspace.newBlock('control_if');
                var condBlock = parseConditionToBlock(node.cond);
                if (condBlock) {
                    condBlock.initSvg();
                    condBlock.render();
                    block.getInput('COND').connection.connect(condBlock.outputConnection);
                }
            } else if (node.type === 'control_waitFor') {
                block = workspace.newBlock('control_waitFor');
                var condBlock2 = parseConditionToBlock(node.cond);
                if (condBlock2) {
                    condBlock2.initSvg();
                    condBlock2.render();
                    block.getInput('COND').connection.connect(condBlock2.outputConnection);
                }
            } else if (node.type === 'control_role') {
                block = workspace.newBlock('control_role');
                block.getField('SELECTOR').setValue(node.selector);
            } else if (node.type === 'var_set') {
                block = workspace.newBlock('var_set');
                block.getField('NAME').setValue(node.name);
                var valBlock = parseValueToBlock(node.value);
                if (valBlock) {
                    valBlock.initSvg();
                    valBlock.render();
                    block.getInput('VALUE').connection.connect(valBlock.outputConnection);
                }
            }

            if (!block) return null;

            block.initSvg();
            block.render();

            if (node.children && node.children.length > 0) {
                var previousChild = null;
                for (i = 0; i < node.children.length; i++) {
                    var child = instantiateNode(node.children[i]);
                    if (!child) continue;
                    childBlocks.push(child);

                    if (previousChild && previousChild.nextConnection && child.previousConnection) {
                        child.previousConnection.connect(previousChild.nextConnection);
                    } else if (block.getInput('DO') && block.getInput('DO').connection && child.previousConnection) {
                        child.previousConnection.connect(block.getInput('DO').connection);
                    }
                    previousChild = child;
                }
            }

            return block;
        }

        var topPrev = null;
        for (i = 0; i < root.children.length; i++) {
            var topNode = root.children[i];
            var topBlock = instantiateNode(topNode);
            if (!topBlock) continue;

            if (topPrev && topPrev.nextConnection && topBlock.previousConnection) {
                topBlock.previousConnection.connect(topPrev.nextConnection);
            } else {
                topPrev = null;
            }

            if (topBlock.previousConnection) {
                topPrev = topBlock;
            }
        }

        workspace.cleanUp();
    } finally {
        syncing = false;
    }
}

function parseValueToBlock(str) {
    str = str.trim();

    if (str.match(/^-?\d+(\.\d+)?$/)) {
        var block = workspace.newBlock('var_number');
        block.getField('NUM').setValue(parseFloat(str));
        return block;
    }

    if (str.startsWith('"') && str.endsWith('"')) {
        var block = workspace.newBlock('var_string');
        block.getField('TEXT').setValue(str.slice(1, -1));
        return block;
    }

    if (str === 'mouseX') {
        return workspace.newBlock('builtin_mouseX');
    }
    if (str === 'mouseY') {
        return workspace.newBlock('builtin_mouseY');
    }

    var block = workspace.newBlock('var_get');
    block.getField('NAME').setValue(str);
    return block;
}

function parseConditionToBlock(str) {
    str = str.trim();

    if (str.startsWith('not ')) {
        var block = workspace.newBlock('logic_not');
        var inner = parseConditionToBlock(str.slice(4));
        if (inner) {
            inner.initSvg();
            inner.render();
            block.getInput('BOOL').connection.connect(inner.outputConnection);
        }
        return block;
    }

    var compOps = ['=', '!=', '<', '>', '<=', '>='];
    for (var i = 0; i < compOps.length; i++) {
        var op = compOps[i];
        var idx = str.indexOf(op);
        if (idx > 0) {
            var left = str.substring(0, idx).trim();
            var right = str.substring(idx + op.length).trim();
            var block = workspace.newBlock('logic_compare');
            block.getField('OP').setValue(op);
            var leftBlock = parseValueToBlock(left);
            var rightBlock = parseValueToBlock(right);
            if (leftBlock) {
                leftBlock.initSvg();
                leftBlock.render();
                block.getInput('A').connection.connect(leftBlock.outputConnection);
            }
            if (rightBlock) {
                rightBlock.initSvg();
                rightBlock.render();
                block.getInput('B').connection.connect(rightBlock.outputConnection);
            }
            return block;
        }
    }

    var block = workspace.newBlock('var_get');
    block.getField('NAME').setValue(str);
    return block;
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('blocklyDiv').style.display = 'none';
    document.getElementById('codeDiv').style.display = 'none';
    document.getElementById('uiscriptDiv').style.display = 'none';
    
    if (tabName === 'blocks') {
        document.getElementById('blocklyDiv').style.display = 'block';
        codeToBlocks(document.getElementById('codeOutput').value);
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

    currentLang.reset();

    if (currentEngine) {
        currentEngine.destroy();
        currentEngine = null;
    }
    container.innerHTML = '';

    await initWasm();

    try {
        const ast = parseCustomSyntax(uscript);
        currentEngine = initCanvasEngine(ast, container);
        currentLang.setUI(currentEngine);

        const blocks = currentLang.parse(code);
        currentLang.execute(blocks);

        console.log('Mofa Lang: 実行開始');
    } catch (e) {
        container.innerHTML = '<div style="padding:20px;color:red;font-family:monospace;">' + e.message + '</div>';
        console.error(e);
    }
}
window.runUIScript = runUIScript;

codeToBlocks(DEFAULT_CODE);
runUIScript();
