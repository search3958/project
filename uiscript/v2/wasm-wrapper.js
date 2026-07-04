import init, {
  alloc_buffer, set_viewport, set_offsets, set_parents,
  compute_text_widths, compute_layout, get_result_ptr, get_result_count,
  blend_hex, blend_hex_rgb, ease_cubic, step_animation,
  parse_shadow, compute_bezier_rect, node_ptr, node_count
} from './kwangya_engine.js';

let wasmReady = false;
let wasmModule = null;
let memory = null;

const TYPE_MAP = {
  'br': 0, 'header': 1, 'img': 2, 'button': 3, 'input': 4, 'radio': 5,
  'p': 6, 'h1': 7, 'h3': 8, 'a': 9, 'li': 10, 'ul': 11, 'div': 12,
  'root': 13
};

const NODE_STRIDE = 16;
const RESULT_STRIDE = 8;

export async function initWasm() {
  if (wasmReady) return;
  const { memory: mem, ...exports } = await init();
  memory = mem;
  wasmModule = exports;
  wasmReady = true;
}

export function isWasmReady() {
  return wasmReady;
}

function flattenAST(node, nodes, offsets, parents, parentIdx, textWidths, ctx, theme) {
  const idx = nodes.length;
  const typeNum = TYPE_MAP[node.type] ?? 14;
  const t = theme[node.type] || {};

  const pad = node.style.padding !== undefined ? node.style.padding : (t.padding || 0);
  const mt = node.style.marginTop !== undefined ? node.style.marginTop :
    (node.style.margin !== undefined ? node.style.margin : (t.marginTop !== undefined ? t.marginTop : (t.margin || 0)));
  const mb = node.style.marginBottom !== undefined ? node.style.marginBottom :
    (node.style.margin !== undefined ? node.style.margin : (t.marginBottom !== undefined ? t.marginBottom : (t.margin || 0)));
  const gap = node.style.gap !== undefined ? node.style.gap : (t.gap || 0);
  const radius = node.style.radius !== undefined ? node.style.radius : (t.radius || 0);
  const display = (node.style.display || 'block') === 'flex' ? 1 : 0;
  const position = (node.style.position || 'static') === 'fixed' ? 1 : 0;

  const fontSize = node.style.size !== undefined ? node.style.size : (t.fontSize || 15);

  let textWidth = 0;
  if (node.text !== undefined && node.type !== 'img') {
    const prevFont = ctx.font;
    ctx.font = `${t.bold ? 'bold ' : ''}${fontSize}px ${ctx._fontFamily || 'sans-serif'}`;
    textWidth = ctx.measureText(node.text).width;
    ctx.font = prevFont;
  }

  offsets.push(idx);
  parents.push(parentIdx);

  nodes.push(
    typeNum,
    node.text !== undefined ? 1 : 0,
    textWidth,
    pad, mt, mb, gap, radius,
    node.style.top !== undefined ? node.style.top : -1,
    node.style.left !== undefined ? node.style.left : -1,
    node.style.right !== undefined ? node.style.right : -1,
    node.style.bottom !== undefined ? node.style.bottom : -1,
    position,
    display,
    node.style.width === 'full' ? 1 : 0,
    fontSize
  );

  textWidths.push(textWidth);

  const myIdx = idx;
  if (node.children) {
    for (const child of node.children) {
      flattenAST(child, nodes, offsets, parents, myIdx, textWidths, ctx, theme);
    }
  }
}

export function wasmComputeLayout(ast, ctx, theme, viewportW, viewportH, scrollY) {
  if (!wasmReady) return false;

  const nodes = [];
  const offsets = [];
  const parents = [];
  const textWidths = [];

  flattenAST(ast, nodes, offsets, parents, -1, textWidths, ctx, theme);

  const count = nodes.length / NODE_STRIDE;
  if (count === 0) return true;

  alloc_buffer(count);
  set_viewport(viewportW, viewportH, scrollY);

  const nodeF64 = new Float64Array(memory.buffer, node_ptr(), count * NODE_STRIDE);
  nodeF64.set(nodes);

  set_offsets(offsets);
  set_parents(parents);

  const availWidths = new Float64Array(count * 2);
  for (let i = 0; i < count; i++) {
    availWidths[i] = viewportW;
    availWidths[count + i] = viewportW;
  }
  for (let i = 0; i < textWidths.length; i++) {
    availWidths[i] = textWidths[i];
  }

  compute_text_widths(availWidths);
  compute_layout();

  const resultCount = get_result_count();
  const resultPtr = get_result_ptr();
  const resultF64 = new Float64Array(memory.buffer, resultPtr, resultCount * RESULT_STRIDE);

  applyLayoutResults(ast, resultF64, offsets, parents, count);

  return true;
}

function applyLayoutResults(node, results, offsets, parents, count) {
  const queue = [{ node, wasmIdx: 0 }];
  const visited = new Set();

  function findWasmIdx(jsNode) {
    for (let i = 0; i < count; i++) {
      if (offsets[i] === i) continue;
    }
    return -1;
  }

  function buildMapping(node, idx) {
    const result = [];
    result.push({ node, wasmIdx: idx });
    if (node.children) {
      let childIdx = idx + 1;
      for (const child of node.children) {
            const childResult = buildMapping(child, childIdx);
            result.push(...childResult);
            childIdx += childResult.length;
          }
    }
    return result;
  }

  const mapping = buildMapping(node, 0);

  for (const { node: n, wasmIdx } of mapping) {
    if (wasmIdx >= count) continue;
    const rb = wasmIdx * RESULT_STRIDE;
    n.width = results[rb];
    n.height = results[rb + 1];
    n.totalHeight = results[rb + 2];
    n.marginTopVal = results[rb + 3];
    n.marginBottomVal = results[rb + 4];
    n.x = results[rb + 5];
    n.y = results[rb + 6];
    n.pad = n.style.padding !== undefined ? n.style.padding : 0;
  }
}

export function wasmBlendHex(a, b, t) {
  if (!wasmReady) return blendHexJS(a, b, t);
  return blend_hex(a, b, t);
}

export function wasmBlendHexRGB(a, b, t) {
  if (!wasmReady) return blendHexRGBJS(a, b, t);
  return blend_hex_rgb(a, b, t);
}

export function wasmEaseCubic(t) {
  if (!wasmReady) return easeCubicJS(t);
  return ease_cubic(t);
}

export function wasmStepAnimation(value, from, to, elapsed, dtMs, durationMs, target) {
  if (!wasmReady) return stepAnimationJS(value, from, to, elapsed, dtMs, durationMs, target);
  const r = step_animation(value, from, to, elapsed, dtMs, durationMs, target);
  return { value: r[0], from: r[1], to: r[2], elapsed: r[3] };
}

export function wasmParseShadow(str) {
  if (!wasmReady) return parseShadowJS(str);
  const r = parse_shadow(str);
  return {
    offsetX: r[0], offsetY: r[1], blur: r[2], spread: r[3],
    colorR: r[4], colorG: r[5], colorB: r[6], colorA: r[7]
  };
}

export function wasmComputeBezierRect(x, y, w, h, cr) {
  if (!wasmReady) return computeBezierRectJS(x, y, w, h, cr);
  return compute_bezier_rect(x, y, w, h, cr);
}

function blendHexJS(a, b, t) {
  const ar = parseInt(a.slice(1, 3), 16), ag = parseInt(a.slice(3, 5), 16), ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16), bg = parseInt(b.slice(3, 5), 16), bb = parseInt(b.slice(5, 7), 16);
  const ct = Math.max(0, Math.min(1, t));
  const r = Math.round(ar + (br - ar) * ct);
  const g = Math.round(ag + (bg - ag) * ct);
  const bv = Math.round(ab + (bb - ab) * ct);
  return `rgb(${r}, ${g}, ${bv})`;
}

function blendHexRGBJS(a, b, t) {
  const ar = parseInt(a.slice(1, 3), 16), ag = parseInt(a.slice(3, 5), 16), ab = parseInt(a.slice(5, 7), 16);
  const br = parseInt(b.slice(1, 3), 16), bg = parseInt(b.slice(3, 5), 16), bb = parseInt(b.slice(5, 7), 16);
  const ct = Math.max(0, Math.min(1, t));
  return [
    Math.round(ar + (br - ar) * ct),
    Math.round(ag + (bg - ag) * ct),
    Math.round(ab + (bb - ab) * ct)
  ];
}

function easeCubicJS(t) {
  const x = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - x, 3);
}

function stepAnimationJS(value, from, to, elapsed, dtMs, durationMs, target) {
  let newFrom = from, newTo = to, newElapsed = elapsed;
  if (Math.abs(to - target) > 0.0001) {
    newFrom = value; newTo = target; newElapsed = 0;
  }
  let newValue = value;
  if (Math.abs(newValue - newTo) > 0.0001 || Math.abs(newFrom - newTo) > 0.0001) {
    newElapsed = Math.min(durationMs, newElapsed + dtMs);
    const eased = durationMs <= 0 ? 1 : newElapsed / durationMs;
    newValue = newFrom + (newTo - newFrom) * easeCubicJS(eased);
    if (newElapsed >= durationMs) newValue = newTo;
  }
  return { value: newValue, from: newFrom, to: newTo, elapsed: newElapsed };
}

function parseShadowJS(str) {
  const parts = str.split(/\s+/);
  let offsetX = 0, offsetY = 0, blur = 0, spread = 0;
  let colorR = 0, colorG = 0, colorB = 0, colorA = 0.2;
  let pxIdx = 0;
  for (const p of parts) {
    if (p.endsWith('px')) {
      const v = parseFloat(p);
      if (pxIdx === 0) offsetX = v;
      else if (pxIdx === 1) offsetY = v;
      else if (pxIdx === 2) blur = v;
      else if (pxIdx === 3) spread = v;
      pxIdx++;
    } else if (p.startsWith('#')) {
      const n = p.slice(1);
      colorR = parseInt(n.slice(0, 2), 16) / 255;
      colorG = parseInt(n.slice(2, 4), 16) / 255;
      colorB = parseInt(n.slice(4, 6), 16) / 255;
      colorA = 1;
    }
  }
  return { offsetX, offsetY, blur, spread, colorR, colorG, colorB, colorA };
}

function computeBezierRectJS(x, y, w, h, cr) {
  const r = Math.min(cr, w / 2, h / 2);
  const lx = Math.min(w / 2, 1.528665 * r);
  const ly = Math.min(h / 2, 1.528665 * r);
  const cx3 = 0.63148 * r, cx4 = 0.37282 * r, cx5 = 0.16905 * r, cx6 = 0.07491 * r;
  const d1x = 0.04 * r + 0.75697 * (lx - r), d2x = 0.18 * r + 0.90847 * (lx - r);
  const d1y = 0.04 * r + 0.75697 * (ly - r), d2y = 0.18 * r + 0.90847 * (ly - r);
  return [
    x + w, y + h / 2,
    x + w, y + h - ly + d1y, x + w, y + h - ly + d2y, x + w - cx6, y + h - cx3,
    x + w - cx5, y + h - cx4, x + w - cx4, y + h - cx5, x + w - cx3, y + h - cx6,
    x + w - lx + d2x, y + h, x + w - lx + d1x, y + h, x + w - lx, y + h,
    x + lx, y + h, x + lx - d1x, y + h, x + lx - d2x, y + h, x + cx3, y + h - cx6,
    x + cx4, y + h - cx5, x + cx5, y + h - cx4, x + cx6, y + h - cx3,
    x, y + h - ly + d2y, x, y + h - ly + d1y, x, y + h - ly,
    x, y + ly, x, y + ly - d1y, x, y + ly - d2y, x + cx6, y + cx3,
    x + cx5, y + cx4, x + cx4, y + cx5, x + cx3, y + cx6,
    x + lx - d2x, y, x + lx - d1x, y, x + lx, y,
    x + w - lx, y, x + w - lx + d1x, y, x + w - lx + d2x, y, x + w - cx3, y + cx6,
    x + w - cx4, y + cx5, x + w - cx5, y + cx4, x + w - cx6, y + cx3,
    x + w, y + ly - d2y, x + w, y + ly - d1y
  ];
}
