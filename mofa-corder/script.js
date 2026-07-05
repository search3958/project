import { parseCustomSyntax, initCanvasEngine } from 'https://search3958.github.io/project/uiscript/v2/engine.js';
import { initWasm } from 'https://search3958.github.io/project/uiscript/v2/wasm-wrapper.js';
import { MofaLang } from './mofa-lang.js';

const DEFAULT_UISCRIPT = `body {
  header {
    p {"Hello Mofa"}
  }
  div {
    button {"+1"}
    .id:counter
    button {"リセット"}
    .id:reset
  }
  .flex
  .gap:12px
  .radius:14px
  .padding:16px
  .bgColor:#ffffff
}
.padding:16px`;

const DEFAULT_CODE = `event.clicked:#counter{
  control.role:#counter{
    var.counter:[counter + 1]
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
let variableViewer = null;
let variableWindow = null;
let variableWindowHeader = null;
let variableWindowState = { x: 0, y: 0, visible: false };
let variableDragState = null;

function renderVariableViewer(vars = currentLang.variables) {
    if (!variableViewer) return;

    const entries = Object.entries(vars || {});
    if (entries.length === 0) {
        variableViewer.innerHTML = '<div class="variable-monitor__empty">まだ変数はありません。</div>';
        return;
    }

    variableViewer.innerHTML = entries
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([name, value]) => `
            <div class="variable-item">
                <div class="variable-item__name">${escapeHtml(name)}</div>
                <div class="variable-item__value">${escapeHtml(formatVariableValue(value))}</div>
            </div>
        `)
        .join('');
}

function formatVariableValue(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return value;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    try {
        return JSON.stringify(value);
    } catch (e) {
        return String(value);
    }
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function openVariableViewer() {
    if (!variableWindow) return;
    variableWindowState.visible = true;
    variableWindow.classList.remove('is-hidden');
    renderVariableViewer(currentLang.variables);
    persistVariableWindowState();
}

function closeVariableViewer() {
    if (!variableWindow) return;
    variableWindowState.visible = false;
    variableWindow.classList.add('is-hidden');
    persistVariableWindowState();
}

function toggleVariableViewer() {
    if (variableWindowState.visible) closeVariableViewer();
    else openVariableViewer();
}

function applyVariableWindowPosition() {
    if (!variableWindow) return;
    variableWindow.style.left = `${variableWindowState.x}px`;
    variableWindow.style.top = `${variableWindowState.y}px`;
    variableWindow.style.right = 'auto';
}

function restoreVariableWindowPosition() {
    if (!variableWindow) return;
    const saved = localStorage.getItem('mofa.variableWindow');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            if (typeof parsed.x === 'number') variableWindowState.x = parsed.x;
            if (typeof parsed.y === 'number') variableWindowState.y = parsed.y;
            if (typeof parsed.visible === 'boolean') variableWindowState.visible = parsed.visible;
        } catch (e) {
            // ignore malformed persisted state
        }
    }
    applyVariableWindowPosition();
    variableWindow.classList.toggle('is-hidden', !variableWindowState.visible);
}

function persistVariableWindowState() {
    try {
        localStorage.setItem('mofa.variableWindow', JSON.stringify(variableWindowState));
    } catch (e) {
        // ignore storage issues
    }
}

function bindVariableWindowDragging() {
    if (!variableWindowHeader || !variableWindow) return;

    variableWindowHeader.addEventListener('pointerdown', function(e) {
        if (!variableWindowState.visible) return;
        variableDragState = {
            startX: e.clientX,
            startY: e.clientY,
            originX: variableWindowState.x,
            originY: variableWindowState.y
        };
        variableWindowHeader.setPointerCapture(e.pointerId);
        variableWindowHeader.style.cursor = 'grabbing';
    });

    variableWindowHeader.addEventListener('pointermove', function(e) {
        if (!variableDragState) return;
        variableWindowState.x = variableDragState.originX + (e.clientX - variableDragState.startX);
        variableWindowState.y = variableDragState.originY + (e.clientY - variableDragState.startY);
        applyVariableWindowPosition();
        persistVariableWindowState();
    });

    function stopDrag() {
        if (!variableDragState) return;
        variableDragState = null;
        variableWindowHeader.style.cursor = 'grab';
        persistVariableWindowState();
    }

    variableWindowHeader.addEventListener('pointerup', stopDrag);
    variableWindowHeader.addEventListener('pointercancel', stopDrag);
    variableWindowHeader.addEventListener('lostpointercapture', stopDrag);
}

document.getElementById('uiscriptEditor').value = DEFAULT_UISCRIPT;
document.getElementById('codeOutput').value = DEFAULT_CODE;
variableViewer = document.getElementById('variableViewer');
variableWindow = document.getElementById('variableWindow');
variableWindowHeader = document.getElementById('variableWindowHeader');
currentLang.onVariablesChanged = renderVariableViewer;
renderVariableViewer({});
restoreVariableWindowPosition();
bindVariableWindowDragging();

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
    var inputBlock = block.getInputTargetBlock('VALUE');
    var value = '0';

    if (inputBlock) {
        if (inputBlock.type === 'math_binop' || inputBlock.type === 'logic_compare' || inputBlock.type === 'logic_operation' || inputBlock.type === 'logic_not' || inputBlock.type === 'math_long' || inputBlock.type === 'math_include') {
            value = javascript.javascriptGenerator.blockToCode(inputBlock);
            if (Array.isArray(value)) value = value[0];
        } else {
            value = javascript.javascriptGenerator.valueToCode(block, 'VALUE', javascript.Order.ATOMIC) || '0';
        }
    }

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
    str = stripOuterPairs(str);

    if (str.startsWith('[') && str.endsWith(']')) {
        return parseExpressionToBlock(str.slice(1, -1));
    }

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

function parseExpressionToBlock(str) {
    str = stripOuterPairs(str.trim());

    var compOps = ['<=', '>=', '!=', '=', '<', '>'];
    for (var i = 0; i < compOps.length; i++) {
        var op = compOps[i];
        var parts = splitTopLevelExpr(str, op);
        if (parts.length === 2) {
            var compareBlock = workspace.newBlock('logic_compare');
            compareBlock.getField('OP').setValue(op);
            var leftBlock = parseExpressionToBlock(parts[0]);
            var rightBlock = parseExpressionToBlock(parts[1]);
            if (leftBlock) {
                leftBlock.initSvg();
                leftBlock.render();
                compareBlock.getInput('A').connection.connect(leftBlock.outputConnection);
            }
            if (rightBlock) {
                rightBlock.initSvg();
                rightBlock.render();
                compareBlock.getInput('B').connection.connect(rightBlock.outputConnection);
            }
            return compareBlock;
        }
    }

    var addParts = splitTopLevelExpr(str, ' + ');
    if (addParts.length > 1) {
        return buildMathChain('math_binop', '+', addParts);
    }

    var subParts = splitTopLevelExpr(str, ' - ');
    if (subParts.length > 1) {
        return buildMathChain('math_binop', '-', subParts);
    }

    var mulParts = splitTopLevelExpr(str, ' * ');
    if (mulParts.length > 1) {
        return buildMathChain('math_binop', '*', mulParts);
    }

    var divParts = splitTopLevelExpr(str, ' / ');
    if (divParts.length > 1) {
        return buildMathChain('math_binop', '/', divParts);
    }

    if (str.startsWith('(') && str.endsWith(')')) {
        return parseValueToBlock(str.slice(1, -1));
    }

    return parseValueToBlock(str);
}

function buildMathChain(blockType, op, parts) {
    var block = null;
    for (var i = 0; i < parts.length - 1; i++) {
        var target = workspace.newBlock(blockType);
        target.getField('OP').setValue(op);

        var left = i === 0 ? parseValueToBlock(parts[i]) : block;
        var right = parseValueToBlock(parts[i + 1]);

        if (left) {
            left.initSvg();
            left.render();
            target.getInput('A').connection.connect(left.outputConnection);
        }
        if (right) {
            right.initSvg();
            right.render();
            target.getInput('B').connection.connect(right.outputConnection);
        }

        block = target;
    }
    return block;
}

function splitTopLevelExpr(str, sep) {
    var parts = [];
    var depth = 0;
    var current = '';

    for (var i = 0; i < str.length; i++) {
        var ch = str[i];
        if (ch === '(' || ch === '[') depth++;
        else if (ch === ')' || ch === ']') depth--;
        if (depth === 0 && str.substring(i, i + sep.length) === sep) {
            parts.push(current.trim());
            current = '';
            i += sep.length - 1;
            continue;
        }
        current += ch;
    }

    parts.push(current.trim());
    return parts;
}

function stripOuterPairs(str) {
    var changed = true;
    while (changed && str.length >= 2) {
        changed = false;
        if ((str.startsWith('(') && str.endsWith(')')) || (str.startsWith('[') && str.endsWith(']'))) {
            var depth = 0;
            var wrapped = true;
            for (var i = 0; i < str.length; i++) {
                var ch = str[i];
                if (ch === '(' || ch === '[') depth++;
                else if (ch === ')' || ch === ']') depth--;
                if (depth === 0 && i < str.length - 1) {
                    wrapped = false;
                    break;
                }
            }
            if (wrapped) {
                str = str.slice(1, -1).trim();
                changed = true;
            }
        }
    }
    return str;
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
window.toggleVariableViewer = toggleVariableViewer;
window.closeVariableViewer = closeVariableViewer;

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
        renderVariableViewer(currentLang.variables);
        openVariableViewer();

        console.log('Mofa Lang: 実行開始');
    } catch (e) {
        container.innerHTML = '<div style="padding:20px;color:red;font-family:monospace;">' + e.message + '</div>';
        console.error(e);
    }
}
window.runUIScript = runUIScript;

const PROJECT_FILES = [
    'index.html',
    'style.css',
    'script.js',
    'mofa-lang.js'
];

const EXTERNAL_BASE = 'https://search3958.github.io/project/';

let isModified = false;

function toggleFileMenu() {
    const dropdown = document.getElementById('fileMenuDropdown');
    dropdown.classList.toggle('show');
}

function closeFileMenu() {
    const dropdown = document.getElementById('fileMenuDropdown');
    dropdown.classList.remove('show');
}

document.addEventListener('click', function(e) {
    const menu = document.querySelector('.file-menu');
    if (!menu.contains(e.target)) {
        closeFileMenu();
    }
});

async function downloadProject() {
    closeFileMenu();
    
    const zip = new JSZip();
    
    for (const file of PROJECT_FILES) {
        try {
            if (file.endsWith('.wasm')) {
                const response = await fetch(file);
                const buffer = await response.arrayBuffer();
                zip.file(file, buffer);
            } else {
                const response = await fetch(file);
                const text = await response.text();
                zip.file(file, text);
            }
        } catch (err) {
            console.warn(`Failed to fetch ${file}:`, err);
        }
    }
    
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.mf1';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    isModified = false;
}

function loadProject() {
    closeFileMenu();
    
    if (isModified) {
        showModal(
            '読み込みの確認',
            '保存されていない内容が削除されます。よろしいですか？',
            function() {
                triggerFileInput();
            }
        );
    } else {
        triggerFileInput();
    }
}

function triggerFileInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.mf1';
    input.onchange = handleFileLoad;
    input.click();
}

async function handleFileLoad(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    try {
        const arrayBuffer = await file.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        
        for (const fileName of PROJECT_FILES) {
            const zipEntry = zip.file(fileName);
            if (!zipEntry) continue;
            
            if (fileName === 'index.html') {
                const content = await zipEntry.async('string');
                const parser = new DOMParser();
                const doc = parser.parseFromString(content, 'text/html');
                
                const codeOutput = doc.getElementById('codeOutput');
                const uiscriptEditor = doc.getElementById('uiscriptEditor');
                
                if (codeOutput) {
                    document.getElementById('codeOutput').value = codeOutput.textContent || codeOutput.value || '';
                }
                if (uiscriptEditor) {
                    document.getElementById('uiscriptEditor').value = uiscriptEditor.textContent || uiscriptEditor.value || '';
                }
            }
        }
        
        const codeContent = await zip.file('script.js')?.async('string');
        if (codeContent) {
            const match = codeContent.match(/DEFAULT_CODE\s*=\s*`([\s\S]*?)`/);
            if (match) {
                document.getElementById('codeOutput').value = match[1];
            }
        }
        
        const uiscriptContent = await zip.file('uiscript-engine.js')?.async('string');
        if (uiscriptContent) {
            const match = uiscriptContent.match(/DEFAULT_UISCRIPT\s*=\s*`([\s\S]*?)`/);
            if (match) {
                document.getElementById('uiscriptEditor').value = match[1];
            }
        }
        
        codeToBlocks(document.getElementById('codeOutput').value);
        isModified = false;
        
    } catch (err) {
        console.error('Failed to load project:', err);
        alert('ファイルの読み込みに失敗しました。');
    }
}

function showModal(title, content, onConfirm) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal">
            <div class="modal-title">${title}</div>
            <div class="modal-content">${content}</div>
            <div class="modal-actions">
                <button class="modal-btn modal-btn--text" onclick="this.closest('.modal-overlay').remove()">キャンセル</button>
                <button class="modal-btn modal-btn--primary" id="modalConfirmBtn">OK</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    requestAnimationFrame(() => {
        overlay.classList.add('show');
    });
    
    overlay.querySelector('#modalConfirmBtn').addEventListener('click', function() {
        overlay.remove();
        if (onConfirm) onConfirm();
    });
    
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            overlay.remove();
        }
    });
}

function exportHTML() {
    closeFileMenu();
    
    const code = document.getElementById('codeOutput').value;
    const uiscript = document.getElementById('uiscriptEditor').value;
    
    const htmlContent = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mofa App</title>
    <script src="${EXTERNAL_BASE}uiscript/v2/wasm-wrapper.js"><\/script>
</head>
<body>
    <canvas id="canvas"></canvas>
    <script type="module">
import { parseCustomSyntax, initCanvasEngine } from '${EXTERNAL_BASE}uiscript/v2/engine.js';
import { initWasm } from '${EXTERNAL_BASE}uiscript/v2/wasm-wrapper.js';

${getMofaLangSource()}

const DEFAULT_UISCRIPT = \`${escapeTemplateString(uiscript)}\`;

const DEFAULT_CODE = \`${escapeTemplateString(code)}\`;

async function init() {
    await initWasm();
    
    const container = document.getElementById('canvas');
    const ast = parseCustomSyntax(DEFAULT_UISCRIPT);
    const engine = initCanvasEngine(ast, container);
    
    const lang = new MofaLang();
    lang.setUI(engine);
    
    const blocks = lang.parse(DEFAULT_CODE);
    await lang.execute(blocks);
    
    lang.onVariablesChanged = (vars) => {
        console.log('Variables:', vars);
    };
}

init().catch(console.error);
<\/script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            min-height: 100vh;
            background: #f5f5f5;
            font-family: 'LINE Seed JP', sans-serif;
        }
        #canvas { 
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.1);
        }
    </style>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mofa-app.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function escapeTemplateString(str) {
    return str.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$/g, '\\$');
}

function getMofaLangSource() {
    return `class MofaLang {
  constructor() {
    this.variables = {};
    this.messages = {};
    this.timers = [];
    this.running = false;
    this.ui = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.pressedKeys = new Set();
    this.hoveredElements = new Set();
    this.clickedElement = null;
    this.date = new Date();
    this.onVariablesChanged = null;
  }

  setUI(ui) { this.ui = ui; }

  parse(code) {
    const lines = code.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
    const blocks = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line === '}') { i++; continue; }
      const block = this.parseLine(line, lines, i);
      if (block) {
        blocks.push(block.block);
        i = block.nextIndex;
      } else { i++; }
    }
    return blocks;
  }

  parseLine(line, lines, index) {
    let m;
    m = line.match(/^layout\\.(\\w+):?(.*)$/);
    if (m) return { block: { type: 'layout', prop: m[1], value: m[2] || '' }, nextIndex: index + 1 };
    m = line.match(/^effect\\.(\\w+):?(.*)$/);
    if (m) return { block: { type: 'effect', prop: m[1], value: m[2] || '' }, nextIndex: index + 1 };
    m = line.match(/^event\\.loaded\\{$/);
    if (m) { const body = this.parseBlockBody(lines, index + 1); return { block: { type: 'event', event: 'loaded', body: body.blocks }, nextIndex: body.nextIndex }; }
    m = line.match(/^event\\.clicked:(.+)\\{$/);
    if (m) { const body = this.parseBlockBody(lines, index + 1); return { block: { type: 'event', event: 'clicked', selector: m[1], body: body.blocks }, nextIndex: body.nextIndex }; }
    m = line.match(/^event\\.click:(.+)$/);
    if (m) return { block: { type: 'action', action: 'click', selector: m[1] }, nextIndex: index + 1 };
    m = line.match(/^event\\.key:(.+)\\{$/);
    if (m) { const body = this.parseBlockBody(lines, index + 1); return { block: { type: 'event', event: 'key', key: m[1], body: body.blocks }, nextIndex: body.nextIndex }; }
    m = line.match(/^event\\.getMessage:(.+)\\{$/);
    if (m) { const body = this.parseBlockBody(lines, index + 1); return { block: { type: 'event', event: 'getMessage', name: m[1], body: body.blocks }, nextIndex: body.nextIndex }; }
    m = line.match(/^event\\.sendMessage:(.+)$/);
    if (m) return { block: { type: 'action', action: 'sendMessage', name: m[1] }, nextIndex: index + 1 };
    m = line.match(/^control\\.wait:(.+)$/);
    if (m) return { block: { type: 'control', action: 'wait', value: this.parseValue(m[1]) }, nextIndex: index + 1 };
    m = line.match(/^control\\.for:(.+)\\{$/);
    if (m) { const body = this.parseBlockBody(lines, index + 1); return { block: { type: 'control', action: 'for', count: this.parseValue(m[1]), body: body.blocks }, nextIndex: body.nextIndex }; }
    m = line.match(/^control\\.for\\{$/);
    if (m) { const body = this.parseBlockBody(lines, index + 1); return { block: { type: 'control', action: 'forever', body: body.blocks }, nextIndex: body.nextIndex }; }
    m = line.match(/^control\\.if:\\((.+)\\)\\{$/);
    if (m) { const body = this.parseBlockBody(lines, index + 1); const condition = this.parseCondition(m[1]); return { block: { type: 'control', action: 'if', condition: condition, body: body.blocks }, nextIndex: body.nextIndex }; }
    m = line.match(/^control\\.waitFor:\\((.+)\\)$/);
    if (m) { const condition = this.parseCondition(m[1]); return { block: { type: 'control', action: 'waitFor', condition: condition }, nextIndex: index + 1 }; }
    m = line.match(/^control\\.role:(.+)\\{$/);
    if (m) { const body = this.parseBlockBody(lines, index + 1); return { block: { type: 'control', action: 'role', selector: m[1], body: body.blocks }, nextIndex: body.nextIndex }; }
    m = line.match(/^var\\.(\\w+):(.+)$/);
    if (m) { const value = this.parseExpression(m[2]); return { block: { type: 'var', name: m[1], value: value }, nextIndex: index + 1 }; }
    return null;
  }

  parseBlockBody(lines, startIndex) {
    const blocks = [];
    let i = startIndex;
    let depth = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line === '}') { if (depth === 0) return { blocks, nextIndex: i + 1 }; depth--; i++; continue; }
      if (line.endsWith('{') && !line.endsWith('{}')) depth++;
      const block = this.parseLine(line, lines, i);
      if (block) { blocks.push(block.block); i = block.nextIndex; } else { i++; }
    }
    return { blocks, nextIndex: i };
  }

  parseValue(str) {
    str = str.trim();
    if (str.match(/^-?\\d+(\\.\\d+)?$/)) return { type: 'number', value: parseFloat(str) };
    if (str.startsWith('"') && str.endsWith('"')) return { type: 'string', value: str.slice(1, -1) };
    if (str.startsWith('+') || str.startsWith('-')) { const num = parseFloat(str); if (!isNaN(num)) return { type: 'number', value: num }; }
    return { type: 'variable', name: str };
  }

  parseExpression(str) {
    str = str.trim();
    if (str.startsWith('[') && str.endsWith(']')) return this.parseArithmetic(str.slice(1, -1));
    if (str.startsWith('(') && str.endsWith(')')) return this.parseValue(str.slice(1, -1));
    return this.parseValue(str);
  }

  parseArithmetic(str) {
    str = str.trim();
    const orParts = this.splitTopLevel(str, ' or ');
    if (orParts.length > 1) return { type: 'logic', op: 'or', left: this.parseArithmetic(orParts[0]), right: this.parseArithmetic(orParts.slice(1).join(' or ')) };
    const andParts = this.splitTopLevel(str, ' and ');
    if (andParts.length > 1) return { type: 'logic', op: 'and', left: this.parseArithmetic(andParts[0]), right: this.parseArithmetic(andParts.slice(1).join(' and ')) };
    if (str.startsWith('not ')) return { type: 'logic', op: 'not', left: this.parseArithmetic(str.slice(4)), right: null };
    const compOps = ['<', '>', '=', '<=', '>=', '!='];
    for (const op of compOps) { const parts = this.splitTopLevel(str, op); if (parts.length === 2) return { type: 'compare', op: op, left: this.parseArithmetic(parts[0]), right: this.parseArithmetic(parts[1]) }; }
    const mulParts = this.splitTopLevel(str, ' * ');
    if (mulParts.length > 1) { let result = this.parseArithmetic(mulParts[0]); for (let i = 1; i < mulParts.length; i++) result = { type: 'math', op: '*', left: result, right: this.parseArithmetic(mulParts[i]) }; return result; }
    const divParts = this.splitTopLevel(str, ' / ');
    if (divParts.length > 1) { let result = this.parseArithmetic(divParts[0]); for (let i = 1; i < divParts.length; i++) result = { type: 'math', op: '/', left: result, right: this.parseArithmetic(divParts[i]) }; return result; }
    const addParts = this.splitTopLevel(str, ' + ');
    if (addParts.length > 1) { let result = this.parseArithmetic(addParts[0]); for (let i = 1; i < addParts.length; i++) result = { type: 'math', op: '+', left: result, right: this.parseArithmetic(addParts[i]) }; return result; }
    const subParts = this.splitTopLevel(str, ' - ');
    if (subParts.length > 1) { let result = this.parseArithmetic(subParts[0]); for (let i = 1; i < subParts.length; i++) result = { type: 'math', op: '-', left: result, right: this.parseArithmetic(subParts[i]) }; return result; }
    if (str.endsWith(' long')) return { type: 'stringOp', op: 'long', value: this.parseArithmetic(str.slice(0, -5)) };
    if (str.endsWith(' include "')) return { type: 'stringOp', op: 'include', value: this.parseArithmetic(str.slice(0, -1)), arg: '' };
    const incMatch = str.match(/(.+)\\s+include\\s+"(.+)"/);
    if (incMatch) return { type: 'stringOp', op: 'include', value: this.parseArithmetic(incMatch[1]), arg: incMatch[2] };
    str = str.trim();
    if (str.match(/^-?\\d+(\\.\\d+)?$/)) return { type: 'number', value: parseFloat(str) };
    if (str.startsWith('"') && str.endsWith('"')) return { type: 'string', value: str.slice(1, -1) };
    if (str === 'key') return { type: 'builtin', name: 'key' };
    if (str === 'mouseX') return { type: 'builtin', name: 'mouseX' };
    if (str === 'mouseY') return { type: 'builtin', name: 'mouseY' };
    if (str === 'YYYY') return { type: 'builtin', name: 'YYYY' };
    if (str === 'MM') return { type: 'builtin', name: 'MM' };
    if (str === 'DD') return { type: 'builtin', name: 'DD' };
    return { type: 'variable', name: str };
  }

  splitTopLevel(str, sep) {
    const parts = [];
    let depth = 0;
    let current = '';
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (ch === '(' || ch === '[') depth++;
      else if (ch === ')' || ch === ']') depth--;
      else if (depth === 0 && str.substring(i, i + sep.length) === sep) { parts.push(current); current = ''; i += sep.length - 1; continue; }
      current += ch;
    }
    parts.push(current);
    return parts;
  }

  parseCondition(str) {
    str = str.trim();
    if (str.startsWith('not ')) return { type: 'not', condition: this.parseCondition(str.slice(4)) };
    const orParts = this.splitTopLevel(str, ' or ');
    if (orParts.length > 1) return { type: 'or', conditions: orParts.map(p => this.parseCondition(p)) };
    const andParts = this.splitTopLevel(str, ' and ');
    if (andParts.length > 1) return { type: 'and', conditions: andParts.map(p => this.parseCondition(p)) };
    const compOps = ['=', '<', '>', '<=', '>=', '!='];
    for (const op of compOps) { const parts = this.splitTopLevel(str, op); if (parts.length === 2) return { type: 'compare', op: op, left: this.parseArithmetic(parts[0]), right: this.parseArithmetic(parts[1]) }; }
    return { type: 'truthy', value: this.parseArithmetic(str) };
  }

  evaluate(expr) {
    if (!expr) return null;
    switch (expr.type) {
      case 'number': return expr.value;
      case 'string': return expr.value;
      case 'variable': return this.variables[expr.name] ?? null;
      case 'builtin': return this.getBuiltin(expr.name);
      case 'math': { const left = this.evaluate(expr.left); const right = this.evaluate(expr.right); switch (expr.op) { case '+': return Number(left) + Number(right); case '-': return Number(left) - Number(right); case '*': return Number(left) * Number(right); case '/': return Number(left) / Number(right); } return null; }
      case 'compare': { const left = this.evaluate(expr.left); const right = this.evaluate(expr.right); switch (expr.op) { case '=': return left == right; case '!=': return left != right; case '<': return Number(left) < Number(right); case '>': return Number(left) > Number(right); case '<=': return Number(left) <= Number(right); case '>=': return Number(left) >= Number(right); } return null; }
      case 'logic': { switch (expr.op) { case 'not': return !this.evaluate(expr.left); case 'and': return this.evaluate(expr.left) && this.evaluate(expr.right); case 'or': return this.evaluate(expr.left) || this.evaluate(expr.right); } return null; }
      case 'stringOp': { const val = String(this.evaluate(expr.value)); switch (expr.op) { case 'long': return val.length; case 'include': return val.includes(expr.arg); } return null; }
      default: return null;
    }
  }

  evaluateCondition(cond) {
    if (!cond) return false;
    switch (cond.type) {
      case 'compare': { const left = this.evaluate(cond.left); const right = this.evaluate(cond.right); switch (cond.op) { case '=': return left == right; case '!=': return left != right; case '<': return Number(left) < Number(right); case '>': return Number(left) > Number(right); case '<=': return Number(left) <= Number(right); case '>=': return Number(left) >= Number(right); } return false; }
      case 'not': return !this.evaluateCondition(cond.condition);
      case 'and': return cond.conditions.every(c => this.evaluateCondition(c));
      case 'or': return cond.conditions.some(c => this.evaluateCondition(c));
      case 'truthy': return !!this.evaluate(cond.value);
      default: return false;
    }
  }

  getBuiltin(name) {
    switch (name) {
      case 'key': return this.pressedKeys.size > 0 ? Array.from(this.pressedKeys)[0] : '';
      case 'mouseX': return this.mouseX;
      case 'mouseY': return this.mouseY;
      case 'YYYY': return this.date.getFullYear();
      case 'MM': return this.date.getMonth() + 1;
      case 'DD': return this.date.getDate();
      default: return null;
    }
  }

  resolveSelector(selector) {
    if (!this.ui || !selector) return [];
    const all = this.ui.getAST().children;
    const sel = selector.trim();
    function find(nodes) {
      const result = [];
      for (const node of nodes) {
        if (sel.startsWith('#')) { const id = sel.slice(1); if (id && node.id === id) result.push(node); }
        if (node.children) result.push(...find(node.children));
      }
      return result;
    }
    return find(all);
  }

  async execute(blocks) {
    this.running = true;
    for (const block of blocks) { if (!this.running) break; await this.executeBlock(block); }
  }

  async executeBlock(block) {
    if (!this.running) return;
    switch (block.type) {
      case 'layout': this.applyLayout(block); break;
      case 'effect': this.applyEffect(block); break;
      case 'event': this.registerEvent(block); break;
      case 'action': this.executeAction(block); break;
      case 'control': await this.executeControl(block); break;
      case 'var': this.setVariable(block); break;
    }
  }

  applyLayout(block) {
    if (!this.ui || !this.currentSelector) return;
    const targets = this.resolveSelector(this.currentSelector);
    if (targets.length === 0) return;
    for (const node of targets) {
      switch (block.prop) {
        case 'width': node.style.width = block.value; break;
        case 'height': node.style.height = parseInt(block.value) || 0; break;
        case 'flex': node.style.display = 'flex'; break;
        case 'block': node.style.display = 'block'; break;
        case 'gap': node.style.gap = parseInt(block.value) || 0; break;
        case 'position': node.style.position = block.value; break;
        case 'top': node.style.top = parseInt(block.value) || 0; break;
        case 'left': node.style.left = parseInt(block.value) || 0; break;
        case 'right': node.style.right = parseInt(block.value) || 0; break;
        case 'bottom': node.style.bottom = parseInt(block.value) || 0; break;
        case 'padding': node.style.padding = parseInt(block.value) || 0; break;
        case 'margin': node.style.margin = parseInt(block.value) || 0; break;
      }
    }
    this.ui.scheduleRender();
  }

  applyEffect(block) {
    if (!this.ui || !this.currentSelector) return;
    const targets = this.resolveSelector(this.currentSelector);
    if (targets.length === 0) return;
    for (const node of targets) {
      switch (block.prop) {
        case 'bgColor': node.style.bgColor = block.value; break;
        case 'fgColor': node.style.fgColor = block.value; break;
        case 'size': { const current = node.style.size || 15; if (block.value.startsWith('+')) node.style.size = current + parseFloat(block.value.slice(1)); else if (block.value.startsWith('-')) node.style.size = current - parseFloat(block.value.slice(1)); else node.style.size = parseInt(block.value) || current; break; }
        case 'fgFilter': node.style.fgFilter = block.value; break;
        case 'bgFilter': node.style.bgFilter = block.value; break;
        case 'radius': node.style.radius = parseInt(block.value) || 0; break;
        case 'shadow': node.style.shadow = block.value; break;
        case 'font': node.style.font = block.value.replace(/"/g, ''); break;
      }
    }
    this.ui.scheduleRender();
  }

  registerEvent(block) {
    switch (block.event) {
      case 'loaded': this.currentSelector = null; this.execute(block.body); break;
      case 'clicked': this.ui.on('click', (e) => { const selector = block.selector; if (selector.startsWith('#') && e.id === selector.slice(1)) { this.currentSelector = selector; this.execute(block.body); this.currentSelector = null; } }); break;
      case 'key': document.addEventListener('keydown', (e) => { if (e.key.toUpperCase() === block.key.toUpperCase()) { this.pressedKeys.add(e.key); this.currentSelector = null; this.execute(block.body); } }); document.addEventListener('keyup', (e) => { if (e.key.toUpperCase() === block.key.toUpperCase()) this.pressedKeys.delete(e.key); }); break;
      case 'getMessage': this.messages[block.name] = block.body; break;
    }
  }

  executeAction(block) {
    switch (block.action) {
      case 'click': if (this.ui) { const selector = block.selector; let node = null; if (selector.startsWith('#')) node = this.ui.getNodeById(selector.slice(1)); if (node) { const canvas = this.ui.getCanvas(); const event = new MouseEvent('click', { clientX: node.x + node.width / 2, clientY: node.y + node.height / 2 }); canvas.dispatchEvent(event); } } break;
      case 'sendMessage': if (this.messages[block.name]) this.execute(this.messages[block.name]); break;
    }
  }

  async executeControl(block) {
    switch (block.action) {
      case 'wait': { const ms = this.evaluate(block.value) * 1000; await new Promise(r => setTimeout(r, ms)); break; }
      case 'for': { const count = this.evaluate(block.count); for (let i = 0; i < count && this.running; i++) { this.variables['i'] = i; this.notifyVariablesChanged(); await this.execute(block.body); } break; }
      case 'forever': { while (this.running) { await this.execute(block.body); await new Promise(r => setTimeout(r, 16)); } break; }
      case 'if': { if (this.evaluateCondition(block.condition)) await this.execute(block.body); break; }
      case 'waitFor': { while (!this.evaluateCondition(block.condition) && this.running) await new Promise(r => setTimeout(r, 50)); break; }
      case 'role': { const selector = block.selector; const nodes = this.resolveSelector(selector); const prevSelector = this.currentSelector; for (const node of nodes) { if (node.id) { this.currentSelector = '#' + node.id; await this.execute(block.body); } } this.currentSelector = prevSelector; break; }
    }
  }

  setVariable(block) {
    const value = this.evaluate(block.value);
    this.variables[block.name] = value;
    this.notifyVariablesChanged();
    if (this.ui && block.name.startsWith('ui_')) { const targetId = block.name.replace('ui_', ''); this.ui.setText(targetId, String(value)); }
  }

  notifyVariablesChanged() {
    if (typeof this.onVariablesChanged === 'function') this.onVariablesChanged({ ...this.variables });
  }

  stop() { this.running = false; this.timers.forEach(t => clearTimeout(t)); this.timers = []; }
  reset() { this.stop(); this.variables = {}; this.messages = {}; this.notifyVariablesChanged(); }
}`;
}

window.toggleFileMenu = toggleFileMenu;
window.downloadProject = downloadProject;
window.loadProject = loadProject;
window.exportHTML = exportHTML;

workspace.addChangeListener(function() {
    isModified = true;
});

codeToBlocks(DEFAULT_CODE);
runUIScript();
