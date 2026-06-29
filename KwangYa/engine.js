const FONT_FAMILY = '"Meiryo UI","Yu Gothic","Hiragino Sans","Hiragino Kaku Gothic ProN","Meiryo","Noto Sans JP",sans-serif';

function drawSmoothRect(ctx, x, y, w, h, cornerRadius) {
  if (!cornerRadius || cornerRadius <= 0) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    return;
  }

  const r = Math.min(cornerRadius, w / 2, h / 2);
  const lx = Math.min(w / 2, 1.528665 * r);
  const ly = Math.min(h / 2, 1.528665 * r);

  const cx3 = 0.63148 * r;
  const cx4 = 0.37282 * r;
  const cx5 = 0.16905 * r;
  const cx6 = 0.07491 * r;
  const cy3 = cx3;
  const cy4 = cx4;
  const cy5 = cx5;
  const cy6 = cx6;

  const d1x = 0.04 * r + 0.75697 * (lx - r);
  const d2x = 0.18 * r + 0.90847 * (lx - r);
  const d1y = 0.04 * r + 0.75697 * (ly - r);
  const d2y = 0.18 * r + 0.90847 * (ly - r);

  ctx.beginPath();
  ctx.moveTo(x + w, y + h / 2);
  ctx.lineTo(x + w, y + h - ly);
  ctx.bezierCurveTo(x + w, y + h - ly + d1y, x + w, y + h - ly + d2y, x + w - cx6, y + h - cy3);
  ctx.bezierCurveTo(x + w - cx5, y + h - cy4, x + w - cx4, y + h - cy5, x + w - cx3, y + h - cy6);
  ctx.bezierCurveTo(x + w - lx + d2x, y + h, x + w - lx + d1x, y + h, x + w - lx, y + h);

  ctx.lineTo(x + lx, y + h);
  ctx.bezierCurveTo(x + lx - d1x, y + h, x + lx - d2x, y + h, x + cx3, y + h - cy6);
  ctx.bezierCurveTo(x + cx4, y + h - cy5, x + cx5, y + h - cy4, x + cx6, y + h - cy3);
  ctx.bezierCurveTo(x, y + h - ly + d2y, x, y + h - ly + d1y, x, y + h - ly);

  ctx.lineTo(x, y + ly);
  ctx.bezierCurveTo(x, y + ly - d1y, x, y + ly - d2y, x + cx6, y + cy3);
  ctx.bezierCurveTo(x + cx5, y + cy4, x + cx4, y + cy5, x + cx3, y + cy6);
  ctx.bezierCurveTo(x + lx - d2x, y, x + lx - d1x, y, x + lx, y);

  ctx.lineTo(x + w - lx, y);
  ctx.bezierCurveTo(x + w - lx + d1x, y, x + w - lx + d2x, y, x + w - cx3, y + cy6);
  ctx.bezierCurveTo(x + w - cx4, y + cy5, x + w - cx5, y + cy4, x + w - cx6, y + cy3);
  ctx.bezierCurveTo(x + w, y + ly - d2y, x + w, y + ly - d1y, x + w, y + ly);

  ctx.closePath();
}

function parseCustomSyntax(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  const root = { type: 'root', children: [], style: { display: 'block' } };
  const stack = [root];
  let currentStyles = {};
  let nextClickAction = null;

  lines.forEach(line => {
    if (line === '}') {
      if (stack.length > 1) stack.pop();
      return;
    }

    if (line.startsWith('.click:alert')) {
      const match = line.match(/\.click:alert\(\"([^\"]+)\"\s*,\s*\"([^\"]+)\"\)/);
      if (match) {
        nextClickAction = { type: 'alert', title: match[1], message: match[2] };
      }
      return;
    }

    if (line.startsWith('.')) {
      const clean = line.substring(1);
      if (clean === 'flex') { currentStyles.display = 'flex'; }
      else if (clean === 'block') { currentStyles.display = 'block'; }
      else if (clean.includes(':')) {
        const [prop, val] = clean.split(':');
        const numVal = parseInt(val);
        if (prop === 'gap') currentStyles.gap = numVal;
        if (prop === 'radius') currentStyles.radius = numVal;
        if (prop === 'padding') currentStyles.padding = numVal;
        if (prop === 'margin') currentStyles.margin = numVal;
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
        style: { ...currentStyles },
        hovered: false,
        clickAction: nextClickAction
      };
      stack[stack.length - 1].children.push(node);
      currentStyles = {};
      nextClickAction = null;
    } else if (blockMatch) {
      const tag = blockMatch[1];
      const node = {
        type: tag,
        children: [],
        style: { display: 'block', ...currentStyles },
        hovered: false,
        clickAction: nextClickAction
      };
      stack[stack.length - 1].children.push(node);
      stack.push(node);
      currentStyles = {};
      nextClickAction = null;
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

  const THEME = {
    html: { bg: '#F5F5F7' },
    h1: { fontSize: 32, bold: true, marginBottom: 16 },
    h3: { fontSize: 20, bold: true, marginTop: 28, marginBottom: 12 },
    p: { fontSize: 15, marginTop: 8, marginBottom: 8, color: '#555555' },
    br: { height: 20 },
    button: { fontSize: 15, padding: 12, radius: 9999, bg: '#007DFF', fg: '#FFFFFF', marginTop: 6, marginBottom: 6 },
    option: { fontSize: 15, padding: 12, radius: 9999, bg: '#E5E5E5', marginTop: 4, marginBottom: 4 },
    a: { fontSize: 15, marginTop: 8, marginBottom: 8, color: '#007DFF' },
    input: { fontSize: 15, padding: 12, radius: 12, bg: '#FFFFFF', border: '#D2D2D7', fg: '#1D1D1F', marginTop: 8, marginBottom: 8 },
    ul: { marginTop: 8, marginBottom: 8 },
    li: { fontSize: 15, marginTop: 4, marginBottom: 4, padding: 6 },
    img: { radius: 16, bg: '#E2E2E7', marginTop: 12, marginBottom: 12, height: 160 }
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
    const fs = t.fontSize || 15;
    ctx.font = `${t.bold ? 'bold ' : ''}${fs}px ${FONT_FAMILY}`;
  }

  function measureNode(node, availWidth) {
    const pad = getPadding(node);
    const mt = getMarginTop(node);
    const mb = getMarginBottom(node);

    if (node.type === 'br') {
      node.width = 0;
      node.height = THEME.br.height || 20;
    } else if (node.type === 'img') {
      node.width = availWidth;
      node.height = THEME.img.height || 160;
    } else if (node.type === 'button' || node.type === 'input') {
      setFont(node);
      node.width = availWidth;
      const fs = (THEME[node.type] || {}).fontSize || 15;
      node.height = fs + pad * 2;
    } else if (node.text !== undefined) {
      setFont(node);
      const metrics = ctx.measureText(node.text);
      const extraW = (node.type === 'li') ? 24 : 0;
      const fs = (THEME[node.type] || {}).fontSize || 15;
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

      node.width = display === 'flex' ? cw + pad * 2 : availWidth;
      node.height = ch + pad * 2;
    }

    node.pad = pad;
    node.marginTopVal = mt;
    node.marginBottomVal = mb;
    node.totalWidth = node.width;
    node.totalHeight = node.height + mt + mb;
  }

  function layoutNode(node, x, y) {
    node.x = x;
    node.y = y + (node.marginTopVal || 0);

    const pad = node.pad || 0;
    const gap = getGap(node);
    const display = node.style.display || 'block';
    let childX = node.x + pad;
    let childY = node.y + pad;

    node.children.forEach((child) => {
      layoutNode(child, childX, childY);
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

    if (node.type === 'div' && (pad || radius)) {
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      drawSmoothRect(ctx, node.x, node.y, node.width, node.height, radius || 16);
      ctx.fill();
    }

    if (node.type === 'button') {
      ctx.fillStyle = node.hovered ? '#0066CC' : (theme.bg || '#007DFF');
      drawSmoothRect(ctx, node.x, node.y, node.width, node.height, radius);
      ctx.fill();
    }

    if (node.type === 'option') {
      ctx.fillStyle = node.selected ? '#007DFF' : (node.hovered ? '#D0D0D0' : (theme.bg || '#E5E5E5'));
      drawSmoothRect(ctx, node.x, node.y, node.width, node.height, radius);
      ctx.fill();
    }

    if (node.type === 'input') {
      ctx.fillStyle = theme.bg || '#FFFFFF';
      drawSmoothRect(ctx, node.x, node.y, node.width, node.height, radius);
      ctx.fill();
      ctx.strokeStyle = node.hovered ? '#007DFF' : (theme.border || '#D2D2D7');
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    if (node.type === 'img') {
      ctx.save();
      drawSmoothRect(ctx, node.x, node.y, node.width, node.height, radius);
      ctx.fillStyle = theme.bg || '#E2E2E7';
      ctx.fill();
      ctx.clip();

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
      ctx.restore();
    }

    if (node.text !== undefined && node.type !== 'img') {
      setFont(node);
      const fs = theme.fontSize || 15;

      if (node.type === 'button') {
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.text, node.x + node.width / 2, node.y + node.height / 2);
      } else if (node.type === 'option' && node.selected) {
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.text, node.x + node.width / 2, node.y + node.height / 2);
      } else if (node.type === 'input') {
        ctx.fillStyle = theme.fg || '#1D1D1F';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'left';
        ctx.fillText(node.text, node.x + pad, node.y + node.height / 2);
      } else if (node.type === 'a') {
        ctx.fillStyle = node.hovered ? '#0056B3' : (theme.color || '#007DFF');
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText(node.text, node.x + pad, node.y + pad);

        const metrics = ctx.measureText(node.text);
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(node.x + pad, node.y + pad + fs + 2);
        ctx.lineTo(node.x + pad + metrics.width, node.y + pad + fs + 2);
        ctx.stroke();
      } else if (node.type === 'li') {
        ctx.fillStyle = theme.color || '#1D1D1F';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        ctx.beginPath();
        ctx.arc(node.x + pad - 14, node.y + pad + fs / 2, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillText(node.text, node.x + pad, node.y + pad);
      } else {
        ctx.fillStyle = theme.color || '#000000';
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText(node.text, node.x + pad, node.y + pad);
      }
    }

    node.children.forEach(drawNode);
    ctx.restore();
  }

  function drawDialog() {
    if (!activeDialog) return;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const dw = Math.min(340, canvas.width - 40);
    const dh = 180;
    const dx = (canvas.width - dw) / 2;
    const dy = (canvas.height - dh) / 2;

    ctx.fillStyle = '#FFFFFF';
    drawSmoothRect(ctx, dx, dy, dw, dh, 28);
    ctx.fill();

    ctx.fillStyle = '#000000';
    ctx.font = `bold 20px ${FONT_FAMILY}`;
    ctx.textAlign = 'center';
    ctx.fillText(activeDialog.title, dx + dw / 2, dy + 30);

    ctx.fillStyle = '#666666';
    ctx.font = `15px ${FONT_FAMILY}`;
    ctx.fillText(activeDialog.message, dx + dw / 2, dy + 70);

    const bw = dw - 40;
    const bh = 44;
    const bx = dx + 20;
    const by = dy + dh - 64;

    activeDialog.buttonLayout = { x: bx, y: by, w: bw, h: bh };

    ctx.fillStyle = activeDialog.buttonHovered ? '#0066CC' : '#007DFF';
    drawSmoothRect(ctx, bx, by, bw, bh, 9999);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold 16px ${FONT_FAMILY}`;
    ctx.textBaseline = 'middle';
    ctx.fillText('OK', bx + bw / 2, by + bh / 2);
    ctx.textBaseline = 'top';
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = THEME.html.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    measureNode(ast, canvas.width);
    layoutNode(ast, 0, 0);

    maxScroll = Math.max(0, ast.totalHeight - canvas.height + 40);

    ctx.save();
    ctx.translate(0, -scrollY);
    drawNode(ast);
    ctx.restore();

    if (activeDialog) {
      drawDialog();
    }
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
      if (activeDialog.buttonHovered !== isOver) {
        activeDialog.buttonHovered = isOver;
        render();
      }
      canvas.style.cursor = isOver ? 'pointer' : 'default';
      return;
    }

    const worldX = mx;
    const worldY = my + scrollY;

    let needUpdate = false;
    function resetHover(n) {
      if (n.hovered) { n.hovered = false; needUpdate = true; }
      n.children.forEach(resetHover);
    }
    resetHover(ast);

    const hit = findNodeAt(ast, worldX, worldY);
    if (hit && ['button', 'option', 'a', 'input'].includes(hit.type)) {
      hit.hovered = true;
      canvas.style.cursor = (hit.type === 'input') ? 'text' : 'pointer';
      needUpdate = true;
    } else {
      canvas.style.cursor = 'default';
    }

    if (needUpdate) render();
  });

  canvas.addEventListener('click', (e) => {
    const mx = e.clientX;
    const my = e.clientY;

    if (activeDialog && activeDialog.buttonLayout) {
      const b = activeDialog.buttonLayout;
      if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) {
        activeDialog = null;
        render();
      }
      return;
    }

    const worldX = mx;
    const worldY = my + scrollY;
    const hit = findNodeAt(ast, worldX, worldY);

    if (hit) {
      if (hit.type === 'option') {
        hit.selected = !hit.selected;
      }
      if (hit.type === 'input') {
        const inputVal = prompt("テキストを入力してください：", hit.text);
        if (inputVal !== null) hit.text = inputVal;
      }
      if (hit.clickAction && hit.clickAction.type === 'alert') {
        activeDialog = {
          title: hit.clickAction.title,
          message: hit.clickAction.message,
          buttonHovered: false
        };
      }
    }
    render();
  });

  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (activeDialog) return;

    scrollY += e.deltaY * 0.7;
    scrollY = Math.max(0, Math.min(scrollY, maxScroll));
    render();
  }, { passive: false });

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  }
  window.addEventListener('resize', resize);
  resize();
}

class SourceCodeElement extends HTMLElement {
  connectedCallback() {
    const ast = parseCustomSyntax(this.textContent);
    initCanvasEngine(ast);
  }
}
customElements.define('source-code', SourceCodeElement);
