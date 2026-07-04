class MofaLang {
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
  }

  setUI(ui) {
    this.ui = ui;
  }

  parse(code) {
    const lines = code.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const blocks = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line === '}') {
        i++;
        continue;
      }

      const block = this.parseLine(line, lines, i);
      if (block) {
        blocks.push(block.block);
        i = block.nextIndex;
      } else {
        i++;
      }
    }

    return blocks;
  }

  parseLine(line, lines, index) {
    let m;

    m = line.match(/^layout\.(\w+):?(.*)$/);
    if (m) {
      return { block: { type: 'layout', prop: m[1], value: m[2] || '' }, nextIndex: index + 1 };
    }

    m = line.match(/^effect\.(\w+):?(.*)$/);
    if (m) {
      return { block: { type: 'effect', prop: m[1], value: m[2] || '' }, nextIndex: index + 1 };
    }

    m = line.match(/^event\.loaded\{$/);
    if (m) {
      const body = this.parseBlockBody(lines, index + 1);
      return { block: { type: 'event', event: 'loaded', body: body.blocks }, nextIndex: body.nextIndex };
    }

    m = line.match(/^event\.clicked:(.+)\{$/);
    if (m) {
      const body = this.parseBlockBody(lines, index + 1);
      return { block: { type: 'event', event: 'clicked', selector: m[1], body: body.blocks }, nextIndex: body.nextIndex };
    }

    m = line.match(/^event\.click:(.+)$/);
    if (m) {
      return { block: { type: 'action', action: 'click', selector: m[1] }, nextIndex: index + 1 };
    }

    m = line.match(/^event\.key:(.+)\{$/);
    if (m) {
      const body = this.parseBlockBody(lines, index + 1);
      return { block: { type: 'event', event: 'key', key: m[1], body: body.blocks }, nextIndex: body.nextIndex };
    }

    m = line.match(/^event\.getMessage:(.+)\{$/);
    if (m) {
      const body = this.parseBlockBody(lines, index + 1);
      return { block: { type: 'event', event: 'getMessage', name: m[1], body: body.blocks }, nextIndex: body.nextIndex };
    }

    m = line.match(/^event\.sendMessage:(.+)$/);
    if (m) {
      return { block: { type: 'action', action: 'sendMessage', name: m[1] }, nextIndex: index + 1 };
    }

    m = line.match(/^control\.wait:(.+)$/);
    if (m) {
      return { block: { type: 'control', action: 'wait', value: this.parseValue(m[1]) }, nextIndex: index + 1 };
    }

    m = line.match(/^control\.for:(.+)\{$/);
    if (m) {
      const body = this.parseBlockBody(lines, index + 1);
      return { block: { type: 'control', action: 'for', count: this.parseValue(m[1]), body: body.blocks }, nextIndex: body.nextIndex };
    }

    m = line.match(/^control\.for\{$/);
    if (m) {
      const body = this.parseBlockBody(lines, index + 1);
      return { block: { type: 'control', action: 'forever', body: body.blocks }, nextIndex: body.nextIndex };
    }

    m = line.match(/^control\.if:\((.+)\)\{$/);
    if (m) {
      const body = this.parseBlockBody(lines, index + 1);
      const condition = this.parseCondition(m[1]);
      return { block: { type: 'control', action: 'if', condition: condition, body: body.blocks }, nextIndex: body.nextIndex };
    }

    m = line.match(/^control\.waitFor:\((.+)\)$/);
    if (m) {
      const condition = this.parseCondition(m[1]);
      return { block: { type: 'control', action: 'waitFor', condition: condition }, nextIndex: index + 1 };
    }

    m = line.match(/^control\.role:(.+)\{$/);
    if (m) {
      const body = this.parseBlockBody(lines, index + 1);
      return { block: { type: 'control', action: 'role', selector: m[1], body: body.blocks }, nextIndex: body.nextIndex };
    }

    m = line.match(/^var\.(\w+):(.+)$/);
    if (m) {
      const value = this.parseExpression(m[2]);
      return { block: { type: 'var', name: m[1], value: value }, nextIndex: index + 1 };
    }

    return null;
  }

  parseBlockBody(lines, startIndex) {
    const blocks = [];
    let i = startIndex;
    let depth = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line === '}') {
        if (depth === 0) {
          return { blocks, nextIndex: i + 1 };
        }
        depth--;
        i++;
        continue;
      }

      if (line.endsWith('{') && !line.endsWith('{}')) {
        depth++;
      }

      const block = this.parseLine(line, lines, i);
      if (block) {
        blocks.push(block.block);
        i = block.nextIndex;
      } else {
        i++;
      }
    }

    return { blocks, nextIndex: i };
  }

  parseValue(str) {
    str = str.trim();
    if (str.match(/^-?\d+(\.\d+)?$/)) {
      return { type: 'number', value: parseFloat(str) };
    }
    if (str.startsWith('"') && str.endsWith('"')) {
      return { type: 'string', value: str.slice(1, -1) };
    }
    if (str.startsWith('+') || str.startsWith('-')) {
      const num = parseFloat(str);
      if (!isNaN(num)) {
        return { type: 'number', value: num };
      }
    }
    return { type: 'variable', name: str };
  }

  parseExpression(str) {
    str = str.trim();

    if (str.startsWith('[') && str.endsWith(']')) {
      return this.parseArithmetic(str.slice(1, -1));
    }

    if (str.startsWith('(') && str.endsWith(')')) {
      return this.parseValue(str.slice(1, -1));
    }

    return this.parseValue(str);
  }

  parseArithmetic(str) {
    str = str.trim();

    const orParts = this.splitTopLevel(str, ' or ');
    if (orParts.length > 1) {
      return {
        type: 'logic',
        op: 'or',
        left: this.parseArithmetic(orParts[0]),
        right: this.parseArithmetic(orParts.slice(1).join(' or '))
      };
    }

    const andParts = this.splitTopLevel(str, ' and ');
    if (andParts.length > 1) {
      return {
        type: 'logic',
        op: 'and',
        left: this.parseArithmetic(andParts[0]),
        right: this.parseArithmetic(andParts.slice(1).join(' and '))
      };
    }

    if (str.startsWith('not ')) {
      return {
        type: 'logic',
        op: 'not',
        left: this.parseArithmetic(str.slice(4)),
        right: null
      };
    }

    const compOps = ['<', '>', '=', '<=', '>=', '!='];
    for (const op of compOps) {
      const parts = this.splitTopLevel(str, op);
      if (parts.length === 2) {
        return {
          type: 'compare',
          op: op,
          left: this.parseArithmetic(parts[0]),
          right: this.parseArithmetic(parts[1])
        };
      }
    }

    const mulParts = this.splitTopLevel(str, ' * ');
    if (mulParts.length > 1) {
      let result = this.parseArithmetic(mulParts[0]);
      for (let i = 1; i < mulParts.length; i++) {
        result = { type: 'math', op: '*', left: result, right: this.parseArithmetic(mulParts[i]) };
      }
      return result;
    }

    const divParts = this.splitTopLevel(str, ' / ');
    if (divParts.length > 1) {
      let result = this.parseArithmetic(divParts[0]);
      for (let i = 1; i < divParts.length; i++) {
        result = { type: 'math', op: '/', left: result, right: this.parseArithmetic(divParts[i]) };
      }
      return result;
    }

    const addParts = this.splitTopLevel(str, ' + ');
    if (addParts.length > 1) {
      let result = this.parseArithmetic(addParts[0]);
      for (let i = 1; i < addParts.length; i++) {
        result = { type: 'math', op: '+', left: result, right: this.parseArithmetic(addParts[i]) };
      }
      return result;
    }

    const subParts = this.splitTopLevel(str, ' - ');
    if (subParts.length > 1) {
      let result = this.parseArithmetic(subParts[0]);
      for (let i = 1; i < subParts.length; i++) {
        result = { type: 'math', op: '-', left: result, right: this.parseArithmetic(subParts[i]) };
      }
      return result;
    }

    if (str.endsWith(' long')) {
      return { type: 'stringOp', op: 'long', value: this.parseArithmetic(str.slice(0, -5)) };
    }

    if (str.endsWith(' include "')) {
      return { type: 'stringOp', op: 'include', value: this.parseArithmetic(str.slice(0, -1)), arg: '' };
    }

    const incMatch = str.match(/(.+)\s+include\s+"(.+)"/);
    if (incMatch) {
      return { type: 'stringOp', op: 'include', value: this.parseArithmetic(incMatch[1]), arg: incMatch[2] };
    }

    str = str.trim();
    if (str.match(/^-?\d+(\.\d+)?$/)) {
      return { type: 'number', value: parseFloat(str) };
    }
    if (str.startsWith('"') && str.endsWith('"')) {
      return { type: 'string', value: str.slice(1, -1) };
    }

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
      else if (depth === 0 && str.substring(i, i + sep.length) === sep) {
        parts.push(current);
        current = '';
        i += sep.length - 1;
        continue;
      }
      current += ch;
    }
    parts.push(current);
    return parts;
  }

  parseCondition(str) {
    str = str.trim();

    if (str.startsWith('not ')) {
      return { type: 'not', condition: this.parseCondition(str.slice(4)) };
    }

    const orParts = this.splitTopLevel(str, ' or ');
    if (orParts.length > 1) {
      return { type: 'or', conditions: orParts.map(p => this.parseCondition(p)) };
    }

    const andParts = this.splitTopLevel(str, ' and ');
    if (andParts.length > 1) {
      return { type: 'and', conditions: andParts.map(p => this.parseCondition(p)) };
    }

    const compOps = ['=', '<', '>', '<=', '>=', '!='];
    for (const op of compOps) {
      const parts = this.splitTopLevel(str, op);
      if (parts.length === 2) {
        return {
          type: 'compare',
          op: op,
          left: this.parseArithmetic(parts[0]),
          right: this.parseArithmetic(parts[1])
        };
      }
    }

    return { type: 'truthy', value: this.parseArithmetic(str) };
  }

  evaluate(expr) {
    if (!expr) return null;

    switch (expr.type) {
      case 'number':
        return expr.value;
      case 'string':
        return expr.value;
      case 'variable':
        return this.variables[expr.name] ?? null;
      case 'builtin':
        return this.getBuiltin(expr.name);
      case 'math': {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);
        switch (expr.op) {
          case '+': return Number(left) + Number(right);
          case '-': return Number(left) - Number(right);
          case '*': return Number(left) * Number(right);
          case '/': return Number(left) / Number(right);
        }
        return null;
      }
      case 'compare': {
        const left = this.evaluate(expr.left);
        const right = this.evaluate(expr.right);
        switch (expr.op) {
          case '=': return left == right;
          case '!=': return left != right;
          case '<': return Number(left) < Number(right);
          case '>': return Number(left) > Number(right);
          case '<=': return Number(left) <= Number(right);
          case '>=': return Number(left) >= Number(right);
        }
        return null;
      }
      case 'logic': {
        switch (expr.op) {
          case 'not': return !this.evaluate(expr.left);
          case 'and': return this.evaluate(expr.left) && this.evaluate(expr.right);
          case 'or': return this.evaluate(expr.left) || this.evaluate(expr.right);
        }
        return null;
      }
      case 'stringOp': {
        const val = String(this.evaluate(expr.value));
        switch (expr.op) {
          case 'long': return val.length;
          case 'include': return val.includes(expr.arg);
        }
        return null;
      }
      default:
        return null;
    }
  }

  evaluateCondition(cond) {
    if (!cond) return false;

    switch (cond.type) {
      case 'compare': {
        const left = this.evaluate(cond.left);
        const right = this.evaluate(cond.right);
        switch (cond.op) {
          case '=': return left == right;
          case '!=': return left != right;
          case '<': return Number(left) < Number(right);
          case '>': return Number(left) > Number(right);
          case '<=': return Number(left) <= Number(right);
          case '>=': return Number(left) >= Number(right);
        }
        return false;
      }
      case 'not':
        return !this.evaluateCondition(cond.condition);
      case 'and':
        return cond.conditions.every(c => this.evaluateCondition(c));
      case 'or':
        return cond.conditions.some(c => this.evaluateCondition(c));
      case 'truthy':
        return !!this.evaluate(cond.value);
      default:
        return false;
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
        if (sel.startsWith('#')) {
          const id = sel.slice(1);
          if (id && node.id === id) result.push(node);
        }
        if (node.children) {
          result.push(...find(node.children));
        }
      }
      return result;
    }

    return find(all);
  }

  async execute(blocks) {
    this.running = true;
    for (const block of blocks) {
      if (!this.running) break;
      await this.executeBlock(block);
    }
  }

  async executeBlock(block) {
    if (!this.running) return;

    switch (block.type) {
      case 'layout':
        this.applyLayout(block);
        break;
      case 'effect':
        this.applyEffect(block);
        break;
      case 'event':
        this.registerEvent(block);
        break;
      case 'action':
        this.executeAction(block);
        break;
      case 'control':
        await this.executeControl(block);
        break;
      case 'var':
        this.setVariable(block);
        break;
    }
  }

  applyLayout(block) {
    if (!this.ui) return;

    if (!this.currentSelector) return;

    const targets = this.resolveSelector(this.currentSelector);
    if (targets.length === 0) return;

    for (const node of targets) {
      switch (block.prop) {
        case 'width':
          node.style.width = block.value;
          break;
        case 'height':
          node.style.height = parseInt(block.value) || 0;
          break;
        case 'flex':
          node.style.display = 'flex';
          break;
        case 'block':
          node.style.display = 'block';
          break;
        case 'gap':
          node.style.gap = parseInt(block.value) || 0;
          break;
        case 'position':
          node.style.position = block.value;
          break;
        case 'top':
          node.style.top = parseInt(block.value) || 0;
          break;
        case 'left':
          node.style.left = parseInt(block.value) || 0;
          break;
        case 'right':
          node.style.right = parseInt(block.value) || 0;
          break;
        case 'bottom':
          node.style.bottom = parseInt(block.value) || 0;
          break;
        case 'padding':
          node.style.padding = parseInt(block.value) || 0;
          break;
        case 'margin':
          node.style.margin = parseInt(block.value) || 0;
          break;
      }
    }
    this.ui.scheduleRender();
  }

  applyEffect(block) {
    if (!this.ui) return;

    if (!this.currentSelector) return;

    const targets = this.resolveSelector(this.currentSelector);
    if (targets.length === 0) return;

    for (const node of targets) {
      switch (block.prop) {
        case 'bgColor':
          node.style.bgColor = block.value;
          break;
        case 'fgColor':
          node.style.fgColor = block.value;
          break;
        case 'size': {
          const current = node.style.size || 15;
          if (block.value.startsWith('+')) {
            node.style.size = current + parseFloat(block.value.slice(1));
          } else if (block.value.startsWith('-')) {
            node.style.size = current - parseFloat(block.value.slice(1));
          } else {
            node.style.size = parseInt(block.value) || current;
          }
          break;
        }
        case 'fgFilter':
          node.style.fgFilter = block.value;
          break;
        case 'bgFilter':
          node.style.bgFilter = block.value;
          break;
        case 'radius':
          node.style.radius = parseInt(block.value) || 0;
          break;
        case 'shadow':
          node.style.shadow = block.value;
          break;
        case 'font':
          node.style.font = block.value.replace(/"/g, '');
          break;
      }
    }
    this.ui.scheduleRender();
  }

  registerEvent(block) {
    switch (block.event) {
      case 'loaded':
        this.currentSelector = null;
        this.execute(block.body);
        break;
      case 'clicked':
        this.ui.on('click', (e) => {
          const selector = block.selector;
          if (selector.startsWith('#') && e.id === selector.slice(1)) {
            this.currentSelector = selector;
            this.execute(block.body);
            this.currentSelector = null;
          }
        });
        break;
      case 'key':
        document.addEventListener('keydown', (e) => {
          if (e.key.toUpperCase() === block.key.toUpperCase()) {
            this.pressedKeys.add(e.key);
            this.currentSelector = null;
            this.execute(block.body);
          }
        });
        document.addEventListener('keyup', (e) => {
          if (e.key.toUpperCase() === block.key.toUpperCase()) {
            this.pressedKeys.delete(e.key);
          }
        });
        break;
      case 'getMessage':
        this.messages[block.name] = block.body;
        break;
    }
  }

  executeAction(block) {
    switch (block.action) {
      case 'click':
        if (this.ui) {
          const selector = block.selector;
          let node = null;
          if (selector.startsWith('#')) {
            node = this.ui.getNodeById(selector.slice(1));
          }
          if (node) {
            const canvas = this.ui.getCanvas();
            const event = new MouseEvent('click', {
              clientX: node.x + node.width / 2,
              clientY: node.y + node.height / 2
            });
            canvas.dispatchEvent(event);
          }
        }
        break;
      case 'sendMessage':
        if (this.messages[block.name]) {
          this.execute(this.messages[block.name]);
        }
        break;
    }
  }

  async executeControl(block) {
    switch (block.action) {
      case 'wait': {
        const ms = this.evaluate(block.value) * 1000;
        await new Promise(r => setTimeout(r, ms));
        break;
      }
      case 'for': {
        const count = this.evaluate(block.count);
        for (let i = 0; i < count && this.running; i++) {
          this.variables['i'] = i;
          await this.execute(block.body);
        }
        break;
      }
      case 'forever': {
        while (this.running) {
          await this.execute(block.body);
          await new Promise(r => setTimeout(r, 16));
        }
        break;
      }
      case 'if': {
        if (this.evaluateCondition(block.condition)) {
          await this.execute(block.body);
        }
        break;
      }
      case 'waitFor': {
        while (!this.evaluateCondition(block.condition) && this.running) {
          await new Promise(r => setTimeout(r, 50));
        }
        break;
      }
      case 'role': {
        const selector = block.selector;
        const nodes = this.resolveSelector(selector);
        const prevSelector = this.currentSelector;
        for (const node of nodes) {
          if (node.id) {
            this.currentSelector = '#' + node.id;
            await this.execute(block.body);
          }
        }
        this.currentSelector = prevSelector;
        break;
      }
    }
  }

  setVariable(block) {
    const value = this.evaluate(block.value);
    this.variables[block.name] = value;

    if (this.ui && block.name.startsWith('ui_')) {
      const targetId = block.name.replace('ui_', '');
      this.ui.setText(targetId, String(value));
    }
  }

  stop() {
    this.running = false;
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
  }

  reset() {
    this.stop();
    this.variables = {};
    this.messages = {};
  }
}

export { MofaLang };
