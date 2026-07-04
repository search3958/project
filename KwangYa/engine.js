import {
  initWasm, isWasmReady,
  wasmBlendHex, wasmEaseCubic, wasmStepAnimation,
  wasmParseShadow, wasmComputeBezierRect
} from './wasm-wrapper.js';

const FONT_FAMILY = 'LINE Seed JP';
const PRIMARY_HEX = '#0066ff';
const PRIMARY = PRIMARY_HEX;
const HOVER_MS = 150;
const DIALOG_MS = 150;

let _pathCache = new Map();

function getSmoothPath(w, h, cornerRadius) {
  if (!cornerRadius || cornerRadius <= 0) return null;
  const r = Math.min(cornerRadius, w / 2, h / 2);
  const cacheKey = `${r.toFixed(2)}_${w.toFixed(2)}_${h.toFixed(2)}`;
  let path = _pathCache.get(cacheKey);
  if (!path) {
    const pts = wasmComputeBezierRect(0, 0, w, h, r);
    path = new Path2D();
    path.moveTo(pts[0], pts[1]);
    path.lineTo(pts[2], pts[3]);
    path.bezierCurveTo(pts[4], pts[5], pts[6], pts[7], pts[8], pts[9]);
    path.bezierCurveTo(pts[10], pts[11], pts[12], pts[13], pts[14], pts[15]);
    path.lineTo(pts[16], pts[17]);
    path.bezierCurveTo(pts[18], pts[19], pts[20], pts[21], pts[22], pts[23]);
    path.bezierCurveTo(pts[24], pts[25], pts[26], pts[27], pts[28], pts[29]);
    path.lineTo(pts[30], pts[31]);
    path.bezierCurveTo(pts[32], pts[33], pts[34], pts[35], pts[36], pts[37]);
    path.bezierCurveTo(pts[38], pts[39], pts[40], pts[41], pts[42], pts[43]);
    path.lineTo(pts[44], pts[45]);
    path.bezierCurveTo(pts[46], pts[47], pts[48], pts[49], pts[50], pts[51]);
    path.bezierCurveTo(pts[52], pts[53], pts[54], pts[55], pts[56], pts[57]);
    path.closePath();
    if (_pathCache.size > 100) _pathCache.clear();
    _pathCache.set(cacheKey, path);
  }
  return path;
}

function fillSmoothRect(ctx, x, y, w, h, cornerRadius) {
  if (!cornerRadius || cornerRadius <= 0) { ctx.fillRect(x, y, w, h); return; }
  const path = getSmoothPath(w, h, cornerRadius);
  ctx.save();
  ctx.translate(x, y);
  ctx.fill(path);
  ctx.restore();
}

function strokeSmoothRect(ctx, x, y, w, h, cornerRadius) {
  if (!cornerRadius || cornerRadius <= 0) { ctx.strokeRect(x, y, w, h); return; }
  const path = getSmoothPath(w, h, cornerRadius);
  ctx.save();
  ctx.translate(x, y);
  ctx.stroke(path);
  ctx.restore();
}

function mixHex(a, b, t) {
  return wasmBlendHex(a, b, t);
}

function easeOutCubic(t) {
  return wasmEaseCubic(t);
}

function parseCustomSyntax(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const root = { type: 'root', children: [], style: { display: 'block' } };
  const stack = [{ node: root, lastChild: null }];

  function currentFrame() {
    return stack[stack.length - 1];
  }

  function currentStyleTarget() {
    const frame = currentFrame();
    return frame.lastChild || frame.node;
  }

  lines.forEach(line => {
    if (line === '}') {
      if (stack.length > 1) {
        const finished = stack.pop().node;
        currentFrame().lastChild = finished;
      }
      return;
    }

    if (line.startsWith('.click:alert')) {
      const match = line.match(/\.click:alert\(\"([^\"]+)\"\s*,\s*\"([^\"]+)\"\)/);
      if (match) {
        const target = currentStyleTarget();
        target.clickAction = { type: 'alert', title: match[1], message: match[2] };
      }
      return;
    }

    if (line.startsWith('.')) {
      const clean = line.substring(1);
      const target = currentStyleTarget();
      if (clean === 'flex') { target.style.display = 'flex'; }
      else if (clean === 'block') { target.style.display = 'block'; }
      else if (clean.includes(':')) {
        const colonIndex = clean.indexOf(':');
        const prop = clean.substring(0, colonIndex);
        const val = clean.substring(colonIndex + 1);
        const numVal = parseInt(val);
        if (prop === 'gap') target.style.gap = numVal;
        if (prop === 'radius') target.style.radius = numVal;
        if (prop === 'padding') target.style.padding = numVal;
        if (prop === 'margin') target.style.margin = numVal;
        if (prop === 'marginTop') target.style.marginTop = numVal;
        if (prop === 'marginBottom') target.style.marginBottom = numVal;
        if (prop === 'width') target.style.width = val;
        if (prop === 'bgColor') target.style.bgColor = val;
        if (prop === 'fgColor') target.style.fgColor = val;
        if (prop === 'align') target.style.align = val;
        if (prop === 'size') target.style.size = numVal;
        if (prop === 'bgFilter') target.style.bgFilter = val;
        if (prop === 'fgFilter') target.style.fgFilter = val;
        if (prop === 'shadow') target.style.shadow = val;
        if (prop === 'position') target.style.position = val;
        if (prop === 'top') target.style.top = numVal;
        if (prop === 'left') target.style.left = numVal;
        if (prop === 'right') target.style.right = numVal;
        if (prop === 'bottom') target.style.bottom = numVal;
      }
      return;
    }

    const blockMatch = line.match(/^([a-zA-Z0-9]+)\s*\{$/);
    const inlineMatch = line.match(/^([a-zA-Z0-9]+)\s*\{\s*\"(.*)\"\s*\}/);

    if (inlineMatch) {
      const [_, tag, content] = inlineMatch;
      const node = {
        type: tag,
        text: content,
        children: [],
        style: {},
        hovered: false,
        hoverAmount: 0,
        hoverTarget: 0,
        hoverAnim: { value: 0, from: 0, to: 0, elapsed: 0 }
      };
      currentFrame().node.children.push(node);
      currentFrame().lastChild = node;
    } else if (blockMatch) {
      const tag = blockMatch[1];
      const node = {
        type: tag,
        children: [],
        style: { display: tag === 'header' ? 'flex' : 'block' },
        hovered: false,
        hoverAmount: 0,
        hoverTarget: 0,
        hoverAnim: { value: 0, from: 0, to: 0, elapsed: 0 }
      };
      currentFrame().node.children.push(node);
      currentFrame().lastChild = node;
      stack.push({ node, lastChild: null });
    }
  });

  return root.children[0];
}

function initCanvasEngine(ast) {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let scrollY = 0;
  let maxScroll = 0;
  let activeDialog = null;
  let dirty = true;
  const dialogAnim = { value: 0, from: 0, to: 0, elapsed: 0 };
  const offscreen = document.createElement('canvas');
  const offCtx = offscreen.getContext('2d');

  const THEME = {
    body: { bg: '#F5F5F7' },
    h1: { fontSize: 32, bold: true, marginBottom: 16 },
    h3: { fontSize: 20, bold: true, marginTop: 28, marginBottom: 12 },
    p: { fontSize: 15, marginTop: 8, marginBottom: 8, color: '#555555' },
    br: { height: 20 },
    button: { fontSize: 15, padding: 12, radius: 9999, bg: PRIMARY, fg: '#FFFFFF', marginTop: 6, marginBottom: 6 },
    option: { fontSize: 15, padding: 12, radius: 9999, bg: '#E5E5E5', marginTop: 4, marginBottom: 4 },
    a: { fontSize: 15, marginTop: 8, marginBottom: 8, color: '#007DFF' },
    input: { fontSize: 15, padding: 12, radius: 12, bg: '#FFFFFF', border: '#D2D2D7', fg: '#1D1D1F', marginTop: 8, marginBottom: 8 },
    radio: { fontSize: 15, padding: 12, radius: 16, bg: '#FFFFFF', border: '#D2D2D7', marginTop: 6, marginBottom: 6 },
    ul: { marginTop: 8, marginBottom: 8 },
    li: { fontSize: 15, marginTop: 4, marginBottom: 4, padding: 6 },
    img: { radius: 16, bg: '#E2E2E7', marginTop: 12, marginBottom: 12, height: 160 },
    header: { height: 56, padding: 16, gap: 12, blur: 20, gradTop: 'rgba(245,245,247,0.95)', gradBottom: 'rgba(245,245,247,0.0)' }
  };

  function getPadding(node) {
    const t = THEME[node.type] || {};
    return node.style.padding !== undefined ? node.style.padding : (t.padding || 0);
  }

  function getMarginTop(node) {
    const t = THEME[node.type] || {};
    if (node.style.marginTop !== undefined) return node.style.marginTop;
    if (node.style.margin !== undefined) return node.style.margin;
    if (t.marginTop !== undefined) return t.marginTop;
    if (t.margin !== undefined) return t.margin;
    return 0;
  }

  function getMarginBottom(node) {
    const t = THEME[node.type] || {};
    if (node.style.marginBottom !== undefined) return node.style.marginBottom;
    if (node.style.margin !== undefined) return node.style.margin;
    if (t.marginBottom !== undefined) return t.marginBottom;
    if (t.margin !== undefined) return t.margin;
    return 0;
  }

  function getGap(node) {
    const t = THEME[node.type] || {};
    return node.style.gap !== undefined ? node.style.gap : (t.gap || 0);
  }

  function getRadius(node) {
    const t = THEME[node.type] || {};
    return node.style.radius !== undefined ? node.style.radius : (t.radius || 0);
  }

  function setFont(node) {
    const t = THEME[node.type] || {};
    const fs = node.style.size !== undefined ? node.style.size : (t.fontSize || 15);
    ctx.font = `${t.bold ? 'bold ' : ''}${fs}px ${FONT_FAMILY}`;
  }

  function applyShadow(node) {
    const s = node.style.shadow;
    if (!s) return;
    const p = wasmParseShadow(s);
    ctx.shadowOffsetX = p.offsetX;
    ctx.shadowOffsetY = p.offsetY;
    ctx.shadowBlur = p.blur;
    const r = Math.round(p.colorR * 255);
    const g = Math.round(p.colorG * 255);
    const b = Math.round(p.colorB * 255);
    ctx.shadowColor = `rgba(${r}, ${g}, ${b}, ${p.colorA})`;
  }

  function clearShadow() {
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  function shadowFor(node, focused = false) {
    if ((node.hoverAmount || 0) > 0.01 || focused) {
      return 'rgba(0, 0, 0, 0.18)';
    }
    return 'rgba(0, 0, 0, 0.10)';
  }

  function stepTimedAnimation(state, target, dtMs, durationMs) {
    const r = wasmStepAnimation(state.value, state.from, state.to, state.elapsed, dtMs, durationMs, target);
    const changed = Math.abs(r.value - state.value) > 0.0001 || state.to !== target;
    state.value = r.value;
    state.from = r.from;
    state.to = r.to;
    state.elapsed = r.elapsed;
    return changed;
  }

  function isInteractive(node) {
    return ['button', 'option', 'a', 'input', 'radio'].includes(node.type);
  }

  function ensureInputState(node) {
    if (!node.editable) {
      node.editable = true;
      node.caret = (node.text || '').length;
      node.focused = false;
      node.blinkOn = true;
    }
  }

  function measureNode(node, availWidth) {
    const pad = getPadding(node);
    const mt = getMarginTop(node);
    const mb = getMarginBottom(node);

    if (node.type === 'br') {
      node.width = 0;
      node.height = THEME.br.height || 20;
    } else if (node.type === 'header') {
      node.width = availWidth;
      const pad = getPadding(node);
      let cw = 0;
      let ch = 0;
      const gap = getGap(node);
      node.children.forEach((child, i) => {
        measureNode(child, availWidth - pad * 2);
        cw += child.totalWidth + (i > 0 ? gap : 0);
        ch = Math.max(ch, child.totalHeight);
      });
      node.height = Math.max(THEME.header.height || 56, ch + pad * 2);
    } else if (node.type === 'img') {
      node.width = availWidth;
      node.height = THEME.img.height || 160;
    } else if (node.type === 'button' || node.type === 'input') {
      setFont(node);
      const fs = node.style.size !== undefined ? node.style.size : ((THEME[node.type] || {}).fontSize || 15);
      node.height = fs + pad * 2;
      if (node.style.width === 'full') {
        node.width = availWidth;
      } else {
        const textWidth = ctx.measureText(node.text || '').width + pad * 2;
        node.width = Math.max(textWidth, pad * 2);
      }
    } else if (node.type === 'radio') {
      setFont(node);
      const marker = 20;
      const metrics = ctx.measureText(node.text || '');
      node.width = metrics.width + pad * 2 + marker + 12;
      const fs = node.style.size !== undefined ? node.style.size : ((THEME[node.type] || {}).fontSize || 15);
      node.height = Math.max(22, fs + pad * 2);
    } else if (node.text !== undefined) {
      setFont(node);
      const metrics = ctx.measureText(node.text);
      const extraW = (node.type === 'li') ? 24 : 0;
      const fs = node.style.size !== undefined ? node.style.size : ((THEME[node.type] || {}).fontSize || 15);
      node.width = metrics.width + pad * 2 + extraW;
      node.height = fs + pad * 2;
    } else {
      let cw = 0;
      let ch = 0;
      const gap = getGap(node);
      const display = node.style.display || 'block';

      node.children.forEach((child, i) => {
        measureNode(child, availWidth - pad * 2);
        if (display === 'flex') {
          cw += child.totalWidth + (i > 0 ? gap : 0);
          ch = Math.max(ch, child.totalHeight);
        } else {
          cw = Math.max(cw, child.totalWidth);
          ch += child.totalHeight + (i > 0 ? gap : 0);
        }
      });

      if (node.style.width === 'fit') {
        node.width = cw + pad * 2;
      } else if (node.style.width === 'full') {
        node.width = availWidth;
      } else {
        node.width = display === 'flex' ? cw + pad * 2 : availWidth;
      }
      node.height = ch + pad * 2;
    }

    node.pad = pad;
    node.marginTopVal = mt;
    node.marginBottomVal = mb;
    node.totalWidth = node.width;
    node.totalHeight = node.height + mt + mb;
  }

  function layoutNode(node, x, y, viewW, viewH) {
    if (node.style.position === 'fixed') {
      const pad = node.pad || 0;
      node.x = node.style.left !== undefined ? node.style.left : (node.style.right !== undefined ? viewW - (node.style.right || 0) - node.width : x);
      node.y = node.style.top !== undefined ? node.style.top : (node.style.bottom !== undefined ? viewH - (node.style.bottom || 0) - node.height : y);
      const gap = getGap(node);
      const display = node.style.display || 'block';
      let childX = node.x + pad;
      let childY = node.y + pad;
      node.children.forEach((child) => {
        layoutNode(child, childX, childY, viewW, viewH);
        if (display === 'flex') { childX += child.totalWidth + gap; }
        else { childY += child.totalHeight + gap; }
      });
      return;
    }

    node.x = x;
    node.y = y + (node.marginTopVal || 0);

    const pad = node.pad || 0;
    const gap = getGap(node);
    const display = node.style.display || 'block';
    let childX = node.x + pad;
    let childY = node.y + pad;

    if (node.style.align === 'center' && display === 'flex' && node.children.length > 0) {
      let totalChildrenWidth = 0;
      node.children.forEach((child, i) => {
        totalChildrenWidth += child.totalWidth + (i > 0 ? gap : 0);
      });
      childX = node.x + (node.width - totalChildrenWidth) / 2;
    }

    node.children.forEach((child) => {
      let cx = childX;
      if (node.style.align === 'center' && display === 'block') {
        cx = node.x + (node.width - child.totalWidth) / 2;
      }
      layoutNode(child, cx, childY, viewW, viewH);
      if (display === 'flex') {
        childX += child.totalWidth + gap;
      } else {
        childY += child.totalHeight + gap;
      }
    });
  }

  function drawNode(node) {
    const theme = THEME[node.type] || {};
    const pad = node.pad || 0;
    const radius = getRadius(node);

    ctx.save();

    if (node.style.fgFilter) { ctx.filter = node.style.fgFilter; }

    if (node.type === 'div' && (pad || radius)) {
      if (node.style.bgFilter) {
        const capX = Math.max(0, Math.floor(node.x));
        const capY = Math.max(0, Math.floor(node.y));
        const capW = Math.ceil(node.width);
        const capH = Math.ceil(node.height);
        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = capW;
        tmpCanvas.height = capH;
        const tmpCtx = tmpCanvas.getContext('2d');
        tmpCtx.drawImage(canvas, capX, capY, capW, capH, 0, 0, capW, capH);
        ctx.save();
        ctx.filter = node.style.bgFilter;
        ctx.drawImage(tmpCanvas, 0, 0, capW, capH, capX, capY, capW, capH);
        ctx.restore();
      }
      ctx.fillStyle = node.style.bgColor || 'rgba(255,255,255,0.9)';
      fillSmoothRect(ctx, node.x, node.y, node.width, node.height, radius || 16);
      if (node.style.shadow) { applyShadow(node); }
      else { ctx.shadowColor = shadowFor(node); ctx.shadowBlur = node.hovered ? 18 : 8; ctx.shadowOffsetY = node.hovered ? 8 : 4; }
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1;
      strokeSmoothRect(ctx, node.x, node.y, node.width, node.height, radius || 16);
      clearShadow();
    }

    if (node.type === 'button') {
      const hover = node.hoverAmount || 0;
      const baseColor = node.style.bgColor || PRIMARY;
      const hoverColor = node.style.bgColor ? wasmBlendHex(node.style.bgColor, '#000000', 0.15) : '#0050D8';
      if (node.style.shadow) { applyShadow(node); }
      else { ctx.shadowColor = 'rgba(0, 0, 0, 0.16)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 4; }
      ctx.fillStyle = mixHex(baseColor, hoverColor, hover);
      fillSmoothRect(ctx, node.x, node.y, node.width, node.height, radius);
      clearShadow();
    }

    if (node.type === 'option') {
      const hover = node.hoverAmount || 0;
      const baseColor = node.style.bgColor || (theme.bg || '#E5E5E5');
      if (node.style.shadow) { applyShadow(node); }
      else { ctx.shadowColor = shadowFor(node); ctx.shadowBlur = 6 + hover * 10; ctx.shadowOffsetY = 3 + hover * 5; }
      ctx.fillStyle = node.selected ? (node.style.bgColor || PRIMARY) : mixHex(baseColor, '#D9D9DE', hover);
      fillSmoothRect(ctx, node.x, node.y, node.width, node.height, radius);
      if (!node.selected) {
        ctx.strokeStyle = 'rgba(0,0,0,0.05)';
        ctx.lineWidth = 1;
        strokeSmoothRect(ctx, node.x, node.y, node.width, node.height, radius);
      }
      clearShadow();
    }

    if (node.type === 'input') {
      ctx.fillStyle = node.style.bgColor || theme.bg || '#FFFFFF';
      if (node.style.shadow) { applyShadow(node); }
      else { ctx.shadowColor = shadowFor(node, node.focused); }
      const hover = node.hoverAmount || 0;
      if (!node.style.shadow) { ctx.shadowBlur = node.focused ? 20 : (8 + hover * 10); ctx.shadowOffsetY = node.focused ? 10 : (4 + hover * 4); }
      fillSmoothRect(ctx, node.x, node.y, node.width, node.height, radius);
      ctx.strokeStyle = node.focused ? PRIMARY : mixHex((theme.border || '#D2D2D7'), '#8DB2FF', hover);
      ctx.lineWidth = 1.5;
      strokeSmoothRect(ctx, node.x, node.y, node.width, node.height, radius);
      clearShadow();
    }

    if (node.type === 'radio') {
      const boxSize = 20;
      const cx = node.x + pad;
      const cy = node.y + node.height / 2;
      if (node.style.shadow) { applyShadow(node); }
      else { ctx.shadowColor = shadowFor(node); }
      const hover = node.hoverAmount || 0;
      if (!node.style.shadow) { ctx.shadowBlur = 5 + hover * 8; ctx.shadowOffsetY = 2 + hover * 4; }
      ctx.fillStyle = node.style.bgColor || '#FFFFFF';
      fillSmoothRect(ctx, cx, cy - boxSize / 2, boxSize, boxSize, 9999);
      ctx.strokeStyle = node.selected ? PRIMARY : mixHex((theme.border || '#D2D2D7'), '#8DB2FF', hover);
      ctx.lineWidth = 1.5;
      strokeSmoothRect(ctx, cx, cy - boxSize / 2, boxSize, boxSize, 9999);
      if (node.selected) {
        ctx.fillStyle = PRIMARY;
        ctx.beginPath();
        ctx.arc(cx + boxSize / 2, cy, 5.5, 0, Math.PI * 2);
        ctx.fill();
      }
      clearShadow();
    }

    if (node.type === 'img') {
      ctx.save();
      ctx.translate(node.x, node.y);
      const imgPath = getSmoothPath(node.width, node.height, radius);
      ctx.fillStyle = theme.bg || '#E2E2E7';
      ctx.fill(imgPath);
      ctx.clip(imgPath);
      ctx.restore();

      ctx.strokeStyle = '#C7C7CC';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(node.x, node.y); ctx.lineTo(node.x + node.width, node.y + node.height);
      ctx.moveTo(node.x + node.width, node.y); ctx.lineTo(node.x, node.y + node.height);
      ctx.stroke();

      ctx.fillStyle = '#8E8E93';
      ctx.font = `bold 15px ${FONT_FAMILY}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.text || 'Image', node.x + node.width / 2, node.y + node.height / 2);
    }

    if (node.text !== undefined && node.type !== 'img') {
      setFont(node);
      const fs = node.style.size !== undefined ? node.style.size : (theme.fontSize || 15);
      const hover = node.hoverAmount || 0;
      const textLift = hover * 1.5;
      const textAlpha = 0.90 + hover * 0.10;

      if (node.type === 'button') {
        ctx.fillStyle = node.style.fgColor || '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = textAlpha;
        ctx.fillText(node.text, node.x + node.width / 2, node.y + node.height / 2 - textLift);
        ctx.globalAlpha = 1;
      } else if (node.type === 'option' && node.selected) {
        ctx.fillStyle = node.style.fgColor || '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = textAlpha;
        ctx.fillText(node.text, node.x + node.width / 2, node.y + node.height / 2 - textLift);
        ctx.globalAlpha = 1;
      } else if (node.type === 'option') {
        ctx.fillStyle = node.style.fgColor || '#1D1D1F';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = textAlpha;
        ctx.fillText(node.text, node.x + node.width / 2, node.y + node.height / 2 - textLift);
        ctx.globalAlpha = 1;
      } else if (node.type === 'input') {
        ctx.fillStyle = node.style.fgColor || theme.fg || '#1D1D1F';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        const text = node.text || '';
        const cursorText = node.focused ? text.slice(0, node.caret) : text;
        ctx.globalAlpha = textAlpha;
        ctx.fillText(text, node.x + pad, node.y + node.height / 2 - textLift);
        ctx.globalAlpha = 1;
        if (node.focused) {
          const before = cursorText;
          const caretX = node.x + pad + ctx.measureText(before).width;
          ctx.strokeStyle = PRIMARY;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(caretX, node.y + pad + 2);
          ctx.lineTo(caretX, node.y + node.height - pad - 2);
          ctx.stroke();
        }
      } else if (node.type === 'a') {
        ctx.fillStyle = mixHex((node.style.fgColor || theme.color || '#007DFF'), PRIMARY, hover);
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.globalAlpha = textAlpha;
        ctx.fillText(node.text, node.x + pad, node.y + pad - textLift);
        ctx.globalAlpha = 1;

        const metrics = ctx.measureText(node.text);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(node.x + pad, node.y + pad + fs + 2);
        ctx.lineTo(node.x + pad + metrics.width, node.y + pad + fs + 2);
        ctx.stroke();
      } else if (node.type === 'li') {
        ctx.fillStyle = node.style.fgColor || theme.color || '#1D1D1F';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        ctx.beginPath();
        ctx.arc(node.x + pad - 14, node.y + pad + fs / 2, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillText(node.text, node.x + pad, node.y + pad);
      } else if (node.type === 'radio') {
        ctx.fillStyle = node.style.fgColor || theme.color || '#1D1D1F';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        ctx.globalAlpha = textAlpha;
        ctx.fillText(node.text, node.x + pad + 32, node.y + node.height / 2 - textLift);
        ctx.globalAlpha = 1;
      } else {
        ctx.fillStyle = node.style.fgColor || theme.color || '#000000';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.globalAlpha = textAlpha;
        ctx.fillText(node.text, node.x + pad, node.y + pad - textLift);
        ctx.globalAlpha = 1;
      }

    }

    node.children.forEach(drawNode);
    ctx.restore();
  }

  function drawDialog() {
    if (!activeDialog) return;

    const p = dialogAnim.value;
    ctx.fillStyle = `rgba(0, 0, 0, ${0.42 * p})`;
    ctx.fillRect(0, 0, canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight);

    const viewW = canvas.clientWidth || window.innerWidth;
    const viewH = canvas.clientHeight || window.innerHeight;
    const dw = Math.min(340, viewW - 40);
    const dh = 180;
    const dx = (viewW - dw) / 2;
    const dy = (viewH - dh) / 2;
    const scale = 0.92 + 0.08 * p;
    const ox = dx + dw / 2;
    const oy = dy + dh / 2;

    ctx.save();
    ctx.translate(ox, oy);
    ctx.scale(scale, scale);
    ctx.translate(-ox, -oy + (1 - p) * 16);
    ctx.globalAlpha = p;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.24)';
    ctx.shadowBlur = 24;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = '#FFFFFF';
    fillSmoothRect(ctx, dx, dy, dw, dh, 28);
    ctx.restore();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = '#000000';
    ctx.font = `bold 20px ${FONT_FAMILY}`;
    ctx.textAlign = 'center';
    ctx.globalAlpha = p;
    ctx.fillText(activeDialog.title, dx + dw / 2, dy + 30 - (1 - p) * 4);

    ctx.fillStyle = '#666666';
    ctx.font = `15px ${FONT_FAMILY}`;
    ctx.fillText(activeDialog.message, dx + dw / 2, dy + 70 - (1 - p) * 4);

    const bw = dw - 40;
    const bh = 44;
    const bx = dx + 20;
    const by = dy + dh - 64;

    activeDialog.buttonLayout = { x: bx, y: by, w: bw, h: bh };
    const buttonHover = activeDialog.buttonHoverAmount || 0;

    ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = mixHex(PRIMARY, '#0050D8', buttonHover);
    fillSmoothRect(ctx, bx, by, bw, bh, 9999);
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold 16px ${FONT_FAMILY}`;
    ctx.textBaseline = 'middle';
    ctx.fillText('OK', bx + bw / 2, by + bh / 2);
    ctx.textBaseline = 'top';
    ctx.globalAlpha = 1;
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const viewW = canvas.clientWidth || window.innerWidth;
    const viewH = canvas.clientHeight || window.innerHeight;
    const pr = Math.max(1, window.devicePixelRatio || 1);

    ctx.fillStyle = THEME.body.bg;
    ctx.fillRect(0, 0, viewW, viewH);

    const headerNode = ast.children.find(c => c.type === 'header');
    const contentChildren = ast.children.filter(c => c.type !== 'header');
    const fixedChildren = contentChildren.filter(c => c.style.position === 'fixed');
    const normalChildren = contentChildren.filter(c => c.style.position !== 'fixed');
    const headerHeight = headerNode ? (THEME.header.height || 56) : 0;

    if (headerNode) {
      measureNode(headerNode, viewW);
      headerNode.x = 0;
      headerNode.y = 0;
      layoutNode(headerNode, 0, 0, viewW, viewH);
    }

    const contentRoot = { type: 'root', children: normalChildren, style: { ...ast.style } };
    measureNode(contentRoot, viewW);
    layoutNode(contentRoot, 0, headerHeight, viewW, viewH);

    maxScroll = Math.max(0, contentRoot.totalHeight - viewH + 40);

    ctx.save();
    ctx.translate(0, -scrollY);
    normalChildren.forEach(drawNode);
    ctx.restore();

    fixedChildren.forEach((child) => {
      measureNode(child, viewW);
      layoutNode(child, 0, 0, viewW, viewH);
    });
    fixedChildren.forEach(drawNode);

    if (headerNode && headerHeight > 0) {
      const capW = Math.ceil(viewW * pr);
      const capH = Math.ceil(headerHeight * pr);

      offscreen.width = capW;
      offscreen.height = capH;
      offCtx.clearRect(0, 0, capW, capH);
      offCtx.drawImage(canvas, 0, 0, capW, capH, 0, 0, capW, capH);

      const maxBlur = THEME.header.blur || 20;
      const steps = 16;
      const blend = 2;

      const slices = [];
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const blurAmount = maxBlur * (1 - t);
        const tmp = document.createElement('canvas');
        tmp.width = capW;
        tmp.height = capH;
        const tmpCtx = tmp.getContext('2d');
        tmpCtx.filter = `blur(${blurAmount}px)`;
        tmpCtx.drawImage(offscreen, 0, 0);
        slices.push(tmp);
      }

      for (let i = 0; i < steps; i++) {
        const y0 = Math.floor(headerHeight * i / steps);
        const y1 = Math.floor(headerHeight * (i + 1) / steps);

        ctx.save();
        ctx.beginPath();
        ctx.rect(0, y0, viewW, y1 - y0);
        ctx.clip();
        ctx.drawImage(slices[i], 0, 0, capW, capH, 0, 0, viewW, headerHeight);
        ctx.restore();

        if (i < steps - 1) {
          for (let p = 0; p < blend; p++) {
            const alpha = (p + 1) / (blend + 1);
            ctx.save();
            ctx.globalAlpha = 1 - alpha;
            ctx.beginPath();
            ctx.rect(0, y1 - blend + p, viewW, 1);
            ctx.clip();
            ctx.drawImage(slices[i], 0, 0, capW, capH, 0, 0, viewW, headerHeight);
            ctx.restore();
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.rect(0, y1 - blend + p, viewW, 1);
            ctx.clip();
            ctx.drawImage(slices[i + 1], 0, 0, capW, capH, 0, 0, viewW, headerHeight);
            ctx.restore();
          }
        }
      }

      const grad = ctx.createLinearGradient(0, 0, 0, headerHeight);
      grad.addColorStop(0, THEME.header.gradTop);
      grad.addColorStop(1, THEME.header.gradBottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, viewW, headerHeight);


      drawNode(headerNode);
    }

    if (activeDialog) {
      drawDialog();
    }
  }

  function updateAnimation(node, dtMs) {
    let dirty = false;
    const target = node.hoverTarget !== undefined ? node.hoverTarget : (node.hovered ? 1 : 0);
    if (!node.hoverAnim) {
      node.hoverAnim = { value: node.hoverAmount || 0, from: node.hoverAmount || 0, to: target, elapsed: 0 };
    }
    if (stepTimedAnimation(node.hoverAnim, target, dtMs, HOVER_MS)) dirty = true;
    node.hoverAmount = node.hoverAnim.value;
    node.children.forEach((child) => {
      if (updateAnimation(child, dtMs)) dirty = true;
    });
    return dirty;
  }

  function scheduleRender() {
    dirty = true;
  }

  function findNodeAt(node, mx, my) {
    if (mx >= node.x && mx <= node.x + node.width && my >= node.y && my <= node.y + node.height) {
      for (let i = node.children.length - 1; i >= 0; i--) {
        const hit = findNodeAt(node.children[i], mx, my);
        if (hit) return hit;
      }
      return node;
    }
    return null;
  }

  canvas.addEventListener('mousemove', (e) => {
    const mx = e.clientX;
    const my = e.clientY;

    if (activeDialog && activeDialog.buttonLayout) {
      const b = activeDialog.buttonLayout;
      const isOver = (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h);
      if ((activeDialog.buttonHoverTarget || 0) !== (isOver ? 1 : 0)) {
        activeDialog.buttonHoverTarget = isOver ? 1 : 0;
      }
      canvas.style.cursor = isOver ? 'pointer' : 'default';
      return;
    }

    const worldX = mx;
    const worldY = my + scrollY;

    let needUpdate = false;
    function resetHover(n) {
      if (n.hovered || (n.hoverTarget || 0) !== 0) { n.hovered = false; n.hoverTarget = 0; needUpdate = true; }
      n.children.forEach(resetHover);
    }
    resetHover(ast);

    const headerNode = ast.children.find(c => c.type === 'header');
    let hit = null;
    if (headerNode) {
      hit = findNodeAt(headerNode, mx, my);
    }
    if (!hit) {
      const contentChildren = ast.children.filter(c => c.type !== 'header');
      const fixedChildren = contentChildren.filter(c => c.style.position === 'fixed');
      for (let i = fixedChildren.length - 1; i >= 0; i--) {
        hit = findNodeAt(fixedChildren[i], mx, my);
        if (hit) break;
      }
    }
    if (!hit) {
      const scrollChildren = ast.children.filter(c => c.type !== 'header' && c.style.position !== 'fixed');
      for (let i = scrollChildren.length - 1; i >= 0; i--) {
        hit = findNodeAt(scrollChildren[i], worldX, worldY);
        if (hit) break;
      }
    }
    if (hit && ['button', 'option', 'a', 'input'].includes(hit.type)) {
      hit.hovered = true;
      hit.hoverTarget = 1;
      canvas.style.cursor = (hit.type === 'input') ? 'text' : 'pointer';
      needUpdate = true;
    } else {
      canvas.style.cursor = 'default';
    }

    if (needUpdate) scheduleRender();
  });

  canvas.addEventListener('mouseleave', () => {
    function resetAllHover(n) {
      n.hovered = false;
      n.hoverTarget = 0;
      n.children.forEach(resetAllHover);
    }
    resetAllHover(ast);
    canvas.style.cursor = 'default';
    scheduleRender();
  });

  canvas.addEventListener('click', (e) => {
    const mx = e.clientX;
    const my = e.clientY;

    if (activeDialog && activeDialog.buttonLayout) {
      const b = activeDialog.buttonLayout;
      if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) {
        closeDialog();
        scheduleRender();
      }
      return;
    }

    const worldX = mx;
    const worldY = my + scrollY;

    const headerNode = ast.children.find(c => c.type === 'header');
    let hit = null;
    if (headerNode) {
      hit = findNodeAt(headerNode, mx, my);
    }
    if (!hit) {
      const contentChildren = ast.children.filter(c => c.type !== 'header');
      const fixedChildren = contentChildren.filter(c => c.style.position === 'fixed');
      for (let i = fixedChildren.length - 1; i >= 0; i--) {
        hit = findNodeAt(fixedChildren[i], mx, my);
        if (hit) break;
      }
    }
    if (!hit) {
      const scrollChildren = ast.children.filter(c => c.type !== 'header' && c.style.position !== 'fixed');
      for (let i = scrollChildren.length - 1; i >= 0; i--) {
        hit = findNodeAt(scrollChildren[i], worldX, worldY);
        if (hit) break;
      }
    }

    if (hit) {
      if (hit.type !== 'input') {
        ast.children.forEach(clearFocus);
      }
      if (hit.type === 'option') {
        hit.selected = !hit.selected;
      }
      if (hit.type === 'input') {
        ensureInputState(hit);
        hit.focused = true;
        hit.caret = Math.min(hit.caret ?? (hit.text || '').length, (hit.text || '').length);
        canvas.focus();
        scheduleRender();
      }
      if (hit.type === 'radio') {
        const group = hit.radioGroup || 'default';
        const siblings = [];
        (function collect(node) {
          if (node.type === 'radio' && (node.radioGroup || 'default') === group) siblings.push(node);
          node.children.forEach(collect);
        })(ast);
        siblings.forEach((n) => { n.selected = false; });
        hit.selected = true;
      }
      if (hit.clickAction && hit.clickAction.type === 'alert') {
        activeDialog = {
          title: hit.clickAction.title,
          message: hit.clickAction.message,
          buttonHoverAmount: 0,
          buttonHoverTarget: 0,
          closing: false
        };
        dialogAnim.value = 0;
        dialogAnim.from = 0;
        dialogAnim.to = 1;
        dialogAnim.elapsed = 0;
      }
    }
    if (!hit) {
      ast.children.forEach(clearFocus);
    }
    scheduleRender();
  });

  function clearFocus(node) {
    if (node.focused) node.focused = false;
    node.children.forEach(clearFocus);
  }

  canvas.tabIndex = 0;
  canvas.addEventListener('keydown', (e) => {
    let focused = null;
    (function findFocused(node) {
      if (node.focused) focused = node;
      node.children.forEach(findFocused);
    })(ast);

    if (!focused) return;
    if (e.key === 'Backspace') {
      e.preventDefault();
      focused.text = (focused.text || '').slice(0, Math.max(0, (focused.caret || 0) - 1)) + (focused.text || '').slice(focused.caret || 0);
      focused.caret = Math.max(0, (focused.caret || 0) - 1);
      scheduleRender();
      return;
    }
    if (e.key === 'Delete') {
      e.preventDefault();
      focused.text = (focused.text || '').slice(0, focused.caret || 0) + (focused.text || '').slice((focused.caret || 0) + 1);
      scheduleRender();
      return;
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focused.caret = Math.max(0, (focused.caret || 0) - 1);
      scheduleRender();
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      focused.caret = Math.min((focused.text || '').length, (focused.caret || 0) + 1);
      scheduleRender();
      return;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      focused.caret = 0;
      scheduleRender();
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      focused.caret = (focused.text || '').length;
      scheduleRender();
      return;
    }
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      const caret = focused.caret || 0;
      focused.text = (focused.text || '').slice(0, caret) + e.key + (focused.text || '').slice(caret);
      focused.caret = caret + 1;
      scheduleRender();
    }
  });

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (activeDialog) return;

    scrollY += e.deltaY * 0.7;
    scrollY = Math.max(0, Math.min(scrollY, maxScroll));
    render();
  }, { passive: false });

  function resize() {
    const pixelRatio = Math.max(1, window.devicePixelRatio || 1);
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.width = Math.round(viewW * pixelRatio);
    canvas.height = Math.round(viewH * pixelRatio);
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    render();
  }
  window.addEventListener('resize', resize);

  let rafRunning = true;
  let lastFrameTs = performance.now();
  function closeDialog() {
    if (!activeDialog) return;
    activeDialog.closing = true;
    dialogAnim.from = dialogAnim.value;
    dialogAnim.to = 0;
    dialogAnim.elapsed = 0;
  }

  function frame(ts) {
    const dtMs = Math.max(0, ts - lastFrameTs);
    lastFrameTs = ts;
    const animDirty = updateAnimation(ast, dtMs);

    const desiredDialogTarget = activeDialog && !activeDialog.closing ? 1 : 0;
    let dialogDirty = false;
    if (activeDialog) {
      const current = activeDialog.buttonHoverAmount || 0;
      const target = activeDialog.buttonHoverTarget || 0;
      if (!activeDialog.buttonHoverAnim) {
        activeDialog.buttonHoverAnim = { value: current, from: current, to: target, elapsed: 0 };
      }
      if (stepTimedAnimation(activeDialog.buttonHoverAnim, target, dtMs, HOVER_MS)) {
        activeDialog.buttonHoverAmount = activeDialog.buttonHoverAnim.value;
        dialogDirty = true;
      } else {
        activeDialog.buttonHoverAmount = activeDialog.buttonHoverAnim.value;
      }
      if (stepTimedAnimation(dialogAnim, desiredDialogTarget, dtMs, DIALOG_MS)) dialogDirty = true;
    }

    if (activeDialog && activeDialog.closing && dialogAnim.value <= 0.001) {
      activeDialog = null;
      dialogAnim.value = 0;
      dialogDirty = true;
    }

    if (dirty || animDirty || dialogDirty) {
      dirty = false;
      render();
    }
    if (rafRunning) requestAnimationFrame(frame);
  }

  resize();
  requestAnimationFrame(frame);
}

class SourceCodeElement extends HTMLElement {
  async connectedCallback() {
    const ast = parseCustomSyntax(this.textContent);
    await initWasm();
    const fontCheck = document.fonts.load('16px "' + FONT_FAMILY + '"');
    const fallback = new Promise(r => setTimeout(r, 2000));
    Promise.race([fontCheck, fallback]).then(() => {
      initCanvasEngine(ast);
    });
  }
}
customElements.define('source-code', SourceCodeElement);
