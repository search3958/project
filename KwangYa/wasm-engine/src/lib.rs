use wasm_bindgen::prelude::*;

const TYPE_BR: u32 = 0;
const TYPE_HEADER: u32 = 1;
const TYPE_IMG: u32 = 2;
const TYPE_BUTTON: u32 = 3;
const TYPE_INPUT: u32 = 4;
const TYPE_RADIO: u32 = 5;
const TYPE_P: u32 = 6;
const TYPE_H1: u32 = 7;
const TYPE_H3: u32 = 8;
const TYPE_A: u32 = 9;
const TYPE_LI: u32 = 10;
const TYPE_UL: u32 = 11;
const TYPE_DIV: u32 = 12;
const TYPE_ROOT: u32 = 13;
const TYPE_OTHER: u32 = 14;

const FLEX: u32 = 1;
const BLOCK: u32 = 0;

const NODE_STRIDE: usize = 16;
const LAYOUT_STRIDE: usize = 7;
const RESULT_STRIDE: usize = 8;

static mut NODE_BUF: Option<Vec<f64>> = None;
static mut OFFSET_BUF: Option<Vec<usize>> = None;
static mut PARENT_BUF: Option<Vec<i32>> = None;
static mut LAYOUT_BUF: Option<Vec<f64>> = None;
static mut RESULT_BUF: Option<Vec<f64>> = None;
static mut NODE_COUNT: usize = 0;
static mut RESULT_COUNT: usize = 0;
static mut VIEWPORT_W: f64 = 0.0;
static mut VIEWPORT_H: f64 = 0.0;
static mut SCROLL_Y: f64 = 0.0;

fn hex_to_rgb(hex: &str) -> (u8, u8, u8) {
    let h = hex.trim_start_matches('#');
    if h.len() < 6 {
        return (0, 0, 0);
    }
    let r = u8::from_str_radix(&h[0..2], 16).unwrap_or(0);
    let g = u8::from_str_radix(&h[2..4], 16).unwrap_or(0);
    let b = u8::from_str_radix(&h[4..6], 16).unwrap_or(0);
    (r, g, b)
}

fn blend_hex_str(a: &str, b: &str, t: f64) -> String {
    let (a_r, a_g, a_b) = hex_to_rgb(a);
    let (b_r, b_g, b_b) = hex_to_rgb(b);
    let ct = t.clamp(0.0, 1.0);
    let r = (a_r as f64 + (b_r as f64 - a_r as f64) * ct).round() as u8;
    let g = (a_g as f64 + (b_g as f64 - a_g as f64) * ct).round() as u8;
    let bv = (a_b as f64 + (b_b as f64 - a_b as f64) * ct).round() as u8;
    format!("rgb({}, {}, {})", r, g, bv)
}

fn ease_out_cubic(t: f64) -> f64 {
    let x = t.clamp(0.0, 1.0);
    1.0 - (1.0 - x).powi(3)
}

#[wasm_bindgen]
pub fn alloc_buffer(count: usize) {
    unsafe {
        NODE_BUF = Some(vec![0.0f64; count * NODE_STRIDE]);
        OFFSET_BUF = Some(vec![0usize; count]);
        PARENT_BUF = Some(vec![-1i32; count]);
        NODE_COUNT = count;
    }
}

#[wasm_bindgen]
pub fn set_viewport(w: f64, h: f64, sy: f64) {
    unsafe {
        VIEWPORT_W = w;
        VIEWPORT_H = h;
        SCROLL_Y = sy;
    }
}

#[wasm_bindgen]
pub fn node_ptr() -> *mut f64 {
    unsafe {
        NODE_BUF.as_mut().unwrap().as_mut_ptr()
    }
}

#[wasm_bindgen]
pub fn node_count() -> usize {
    unsafe { NODE_COUNT }
}

#[wasm_bindgen]
pub fn set_offsets(offsets: &[usize]) {
    unsafe {
        if let Some(ref mut buf) = OFFSET_BUF {
            for (i, &v) in offsets.iter().enumerate() {
                if i < buf.len() { buf[i] = v; }
            }
        }
    }
}

#[wasm_bindgen]
pub fn set_parents(parents: &[i32]) {
    unsafe {
        if let Some(ref mut buf) = PARENT_BUF {
            for (i, &v) in parents.iter().enumerate() {
                if i < buf.len() { buf[i] = v; }
            }
        }
    }
}

#[wasm_bindgen]
pub fn compute_text_widths(text_widths: &[f64]) {
    unsafe {
        let buf = NODE_BUF.as_ref().unwrap();
        let mut results = Vec::with_capacity(NODE_COUNT * RESULT_STRIDE);
        for i in 0..NODE_COUNT {
            let base = i * NODE_STRIDE;
            let node_type = buf[base] as u32;
            let text_w = text_widths.get(i).copied().unwrap_or(0.0);
            let pad = buf[base + 3];
            let mt = buf[base + 4];
            let mb = buf[base + 5];
            let display = buf[base + 13] as u32;
            let style_w = buf[base + 14];
            let avail_w = text_widths.get(NODE_COUNT + i).copied().unwrap_or(0.0);

            let mut w: f64 = 0.0;
            let mut h: f64 = 0.0;

            match node_type {
                TYPE_BR => {
                    w = 0.0;
                    h = 20.0;
                }
                TYPE_HEADER => {
                    w = avail_w;
                    h = 56.0 + pad * 2.0;
                }
                TYPE_IMG => {
                    w = avail_w;
                    h = 160.0;
                }
                TYPE_BUTTON | TYPE_INPUT => {
                    let fs = buf[base + 15];
                    h = fs + pad * 2.0;
                    if style_w == 1.0 {
                        w = avail_w;
                    } else {
                        w = (text_w + pad * 2.0).max(pad * 2.0);
                    }
                }
                TYPE_RADIO => {
                    let fs = buf[base + 15];
                    w = text_w + pad * 2.0 + 32.0;
                    h = 22.0_f64.max(fs + pad * 2.0);
                }
                _ if buf[base + 1] > 0.0 => {
                    let fs = buf[base + 15];
                    let extra_w = if node_type == TYPE_LI { 24.0 } else { 0.0 };
                    w = text_w + pad * 2.0 + extra_w;
                    h = fs + pad * 2.0;
                }
                _ => {
                    w = avail_w;
                    h = 0.0;
                }
            }

            let total_h = h + mt + mb;
            results.push(w);
            results.push(h);
            results.push(total_h);
            results.push(mt);
            results.push(mb);
            results.push(0.0);
            results.push(0.0);
            results.push(0.0);
        }
        RESULT_BUF = Some(results);
        RESULT_COUNT = NODE_COUNT;
    }
}

fn get_type_id(type_name: u32) -> u32 {
    type_name
}

fn has_children(node_type: u32) -> bool {
    matches!(node_type,
        TYPE_HEADER | TYPE_DIV | TYPE_UL | TYPE_ROOT | TYPE_OTHER | TYPE_IMG
    )
}

#[wasm_bindgen]
pub fn compute_layout() {
    unsafe {
        let buf = NODE_BUF.as_ref().unwrap();
        let offsets = OFFSET_BUF.as_ref().unwrap();
        let parents = PARENT_BUF.as_ref().unwrap();
        let vw = VIEWPORT_W;
        let vh = VIEWPORT_H;

        let mut result = RESULT_BUF.as_mut().unwrap();

        for i in 0..NODE_COUNT {
            let base = i * NODE_STRIDE;
            let node_type = buf[base] as u32;
            let pad = buf[base + 3];
            let gap = buf[base + 6];
            let radius = buf[base + 7];
            let display = buf[base + 13] as u32;
            let position = buf[base + 12] as u32;
            let style_top = buf[base + 8];
            let style_left = buf[base + 9];
            let style_right = buf[base + 10];
            let style_bottom = buf[base + 11];

            let rb = i * LAYOUT_STRIDE;

            if position == 1 {
                let mut x = style_left;
                if x == -1.0 {
                    x = if style_right != -1.0 { vw - style_right - result[i * RESULT_STRIDE] } else { 0.0 };
                }
                let mut y = style_top;
                if y == -1.0 {
                    y = if style_bottom != -1.0 { vh - style_bottom - result[i * RESULT_STRIDE + 1] } else { 0.0 };
                }
                result[i * RESULT_STRIDE + 5] = x;
                result[i * RESULT_STRIDE + 6] = y;
                continue;
            }

            let parent_idx = parents[i];
            if parent_idx < 0 {
                result[i * RESULT_STRIDE + 5] = 0.0;
                result[i * RESULT_STRIDE + 6] = 0.0;
                continue;
            }
            let pi = parent_idx as usize;
            let pb = pi * NODE_STRIDE;
            let parent_display = buf[pb + 13] as u32;
            let parent_gap = buf[pb + 6];
            let parent_pad = buf[pb + 3];

            let rbi = i * RESULT_STRIDE;
            let rbp = pi * RESULT_STRIDE;

            if parent_display == FLEX {
                let mut total_w: f64 = 0.0;
                let mut first = true;
                let mut j = pi + 1;
                while j < NODE_COUNT && parents[j] == pi as i32 {
                    if !first { total_w += parent_gap; }
                    total_w += result[j * RESULT_STRIDE];
                    first = false;
                    j += 1;
                }
                let parent_w = result[rbp];
                let mut offset_x: f64 = 0.0;
                let mut found = false;
                let mut j2 = pi + 1;
                while j2 < NODE_COUNT && parents[j2] == pi as i32 {
                    if j2 == i {
                        found = true;
                        break;
                    }
                    offset_x += result[j2 * RESULT_STRIDE] + parent_gap;
                    j2 += 1;
                }
                if found {
                    let align = buf[pb + 14 + 1] as u32;
                    let mut x = result[rbp + 5] + parent_pad + offset_x;
                    if align == 1 && total_w < parent_w {
                        x = result[rbp + 5] + (parent_w - total_w) / 2.0 + offset_x;
                    }
                    result[rbi + 5] = x;
                    result[rbi + 6] = result[rbp + 6] + parent_pad;
                }
            } else {
                let mut max_cw: f64 = 0.0;
                let mut total_ch: f64 = 0.0;
                let mut first = true;
                let mut j = pi + 1;
                while j < NODE_COUNT && parents[j] == pi as i32 {
                    if first {
                        max_cw = result[j * RESULT_STRIDE];
                        total_ch = result[j * RESULT_STRIDE + 2];
                        first = false;
                    } else {
                        max_cw = max_cw.max(result[j * RESULT_STRIDE]);
                        total_ch += result[j * RESULT_STRIDE + 2] + parent_gap;
                    }
                    j += 1;
                }

                let mut offset_y: f64 = 0.0;
                let mut found = false;
                let mut j2 = pi + 1;
                while j2 < NODE_COUNT && parents[j2] == pi as i32 {
                    if j2 == i {
                        found = true;
                        break;
                    }
                    offset_y += result[j2 * RESULT_STRIDE + 2] + parent_gap;
                    j2 += 1;
                }
                if found {
                    let align = buf[pb + 14 + 1] as u32;
                    let mut x = result[rbp + 5] + parent_pad;
                    if align == 1 {
                        x = result[rbp + 5] + (result[rbp] - result[rbi]) / 2.0;
                    }
                    result[rbi + 5] = x;
                    result[rbi + 6] = result[rbp + 6] + parent_pad + offset_y;
                }
            }
        }
    }
}

#[wasm_bindgen]
pub fn get_result_ptr() -> *const f64 {
    unsafe {
        RESULT_BUF.as_ref().unwrap().as_ptr()
    }
}

#[wasm_bindgen]
pub fn get_result_count() -> usize {
    unsafe { RESULT_COUNT }
}

#[wasm_bindgen]
pub fn blend_hex(a_hex: &str, b_hex: &str, t: f64) -> String {
    blend_hex_str(a_hex, b_hex, t)
}

#[wasm_bindgen]
pub fn blend_hex_rgb(a_hex: &str, b_hex: &str, t: f64) -> Vec<u8> {
    let (a_r, a_g, a_b) = hex_to_rgb(a_hex);
    let (b_r, b_g, b_b) = hex_to_rgb(b_hex);
    let ct = t.clamp(0.0, 1.0);
    let r = (a_r as f64 + (b_r as f64 - a_r as f64) * ct).round() as u8;
    let g = (a_g as f64 + (b_g as f64 - a_g as f64) * ct).round() as u8;
    let bv = (a_b as f64 + (b_b as f64 - a_b as f64) * ct).round() as u8;
    vec![r, g, bv]
}

#[wasm_bindgen]
pub fn ease_cubic(t: f64) -> f64 {
    ease_out_cubic(t)
}

#[wasm_bindgen]
pub fn step_animation(
    value: f64, from: f64, to: f64, elapsed: f64,
    dt_ms: f64, duration_ms: f64, target: f64
) -> Vec<f64> {
    let mut new_from = from;
    let mut new_to = to;
    let mut new_elapsed = elapsed;
    let mut new_value = value;

    if (to - target).abs() > 0.0001 {
        new_from = value;
        new_to = target;
        new_elapsed = 0.0;
    }

    if (new_value - new_to).abs() > 0.0001 || (new_from - new_to).abs() > 0.0001 {
        new_elapsed = duration_ms.min(new_elapsed + dt_ms);
        let eased = if duration_ms <= 0.0 { 1.0 } else { new_elapsed / duration_ms };
        let e = ease_out_cubic(eased);
        new_value = new_from + (new_to - new_from) * e;
        if new_elapsed >= duration_ms {
            new_value = new_to;
        }
    }

    vec![new_value, new_from, new_to, new_elapsed]
}

#[wasm_bindgen]
pub fn parse_shadow(shadow_str: &str) -> Vec<f64> {
    let parts: Vec<&str> = shadow_str.split_whitespace().collect();
    let mut offset_x = 0.0_f64;
    let mut offset_y = 0.0_f64;
    let mut blur = 0.0_f64;
    let mut spread = 0.0_f64;
    let mut color_r = 0.0_f64;
    let mut color_g = 0.0_f64;
    let mut color_b = 0.0_f64;
    let mut color_a = 0.2_f64;
    let mut px_idx = 0;

    for part in &parts {
        if part.ends_with("px") {
            let v: f64 = part.trim_end_matches("px").parse().unwrap_or(0.0);
            match px_idx {
                0 => offset_x = v,
                1 => offset_y = v,
                2 => blur = v,
                3 => spread = v,
                _ => {}
            }
            px_idx += 1;
        } else if part.starts_with("rgba") {
            let inner = part.trim_start_matches("rgba(").trim_end_matches(")");
            let nums: Vec<f64> = inner.split(',').map(|s| s.trim().parse().unwrap_or(0.0)).collect();
            if nums.len() >= 4 {
                color_r = nums[0] / 255.0;
                color_g = nums[1] / 255.0;
                color_b = nums[2] / 255.0;
                color_a = nums[3];
            }
        } else if part.starts_with("rgb") {
            let inner = part.trim_start_matches("rgb(").trim_end_matches(")");
            let nums: Vec<f64> = inner.split(',').map(|s| s.trim().parse().unwrap_or(0.0)).collect();
            if nums.len() >= 3 {
                color_r = nums[0] / 255.0;
                color_g = nums[1] / 255.0;
                color_b = nums[2] / 255.0;
                color_a = 1.0;
            }
        } else if part.starts_with('#') {
            let (r, g, b) = hex_to_rgb(part);
            color_r = r as f64 / 255.0;
            color_g = g as f64 / 255.0;
            color_b = b as f64 / 255.0;
            color_a = 1.0;
        }
    }

    vec![offset_x, offset_y, blur, spread, color_r, color_g, color_b, color_a]
}

#[wasm_bindgen]
pub fn compute_bezier_rect(x: f64, y: f64, w: f64, h: f64, cr: f64) -> Vec<f64> {
    let r = cr.min(w / 2.0).min(h / 2.0);
    let lx = (w / 2.0).min(1.528665 * r);
    let ly = (h / 2.0).min(1.528665 * r);

    let cx3 = 0.63148 * r;
    let cx4 = 0.37282 * r;
    let cx5 = 0.16905 * r;
    let cx6 = 0.07491 * r;
    let cy3 = cx3;
    let cy4 = cx4;
    let cy5 = cx5;
    let cy6 = cx6;

    let d1x = 0.04 * r + 0.75697 * (lx - r);
    let d2x = 0.18 * r + 0.90847 * (lx - r);
    let d1y = 0.04 * r + 0.75697 * (ly - r);
    let d2y = 0.18 * r + 0.90847 * (ly - r);

    vec![
        x + w, y + h / 2.0,

        x + w, y + h - ly,

        x + w, y + h - ly + d1y,
        x + w, y + h - ly + d2y,
        x + w - cx6, y + h - cy3,

        x + w - cx5, y + h - cy4,
        x + w - lx + d1x, y + h,
        x + w - lx, y + h,

        x + lx, y + h,

        x + lx - d1x, y + h,
        x + cx4, y + h - cy5,
        x + cx6, y + h - cy3,

        x, y + h - ly + d2y,
        x, y + h - ly + d1y,
        x, y + h - ly,

        x, y + ly,

        x, y + ly - d1y,
        x + cx4, y + cy5,
        x + cx6, y + cy3,

        x + lx - d2x, y,
        x + lx - d1x, y,
        x + lx, y,

        x + w - lx, y,

        x + w - lx + d1x, y,
        x + w - cx4, y + cy5,
        x + w - cx6, y + cy3,

        x + w, y + ly - d2y,
        x + w, y + ly - d1y,
        x + w, y + ly,
    ]
}
