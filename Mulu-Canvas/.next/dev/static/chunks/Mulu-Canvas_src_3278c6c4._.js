(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Mulu-Canvas/src/lib/types.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Types for the Physics Drawing App
__turbopack_context__.s([
    "DEFAULT_BRUSH_SETTINGS",
    ()=>DEFAULT_BRUSH_SETTINGS,
    "DEFAULT_PHYSICS",
    ()=>DEFAULT_PHYSICS,
    "DEFAULT_PROJECT_SETTINGS",
    ()=>DEFAULT_PROJECT_SETTINGS,
    "WALL_THICKNESS",
    ()=>WALL_THICKNESS
]);
const DEFAULT_BRUSH_SETTINGS = {
    type: 'pen',
    color: '#000000',
    size: 10,
    opacity: 1,
    furLength: 20,
    blurLevel: 5,
    elasticity: 0.8,
    lightIntensity: 0.5
};
const DEFAULT_PROJECT_SETTINGS = {
    id: '',
    name: '',
    width: 800,
    height: 600,
    ambientColor: '#ffffff',
    ambientIntensity: 0.3
};
const DEFAULT_PHYSICS = {
    gravity: {
        x: 0,
        y: 1
    },
    isPlaying: false
};
const WALL_THICKNESS = 50;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/lib/i18n.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Internationalization system for the Physics Drawing App
__turbopack_context__.s([
    "detectLanguage",
    ()=>detectLanguage,
    "getTranslation",
    ()=>getTranslation,
    "translations",
    ()=>translations
]);
const translations = {
    ja: {
        // Gallery
        gallery: 'ギャラリー',
        newArtwork: '新規作成',
        delete: '削除',
        export: 'エクスポート',
        import: 'インポート',
        noArtworks: '作品がありません',
        createFirst: '最初の作品を作成しましょう！',
        // New Artwork Dialog
        newArtworkTitle: '新規作品',
        artworkName: '作品名',
        width: '幅',
        height: '高さ',
        ambientColor: '環境光の色',
        ambientIntensity: '環境光の強さ',
        create: '作成',
        cancel: 'キャンセル',
        // Editor
        backToGallery: 'ギャラリーに戻る',
        save: '保存',
        play: '再生',
        pause: '停止',
        // Layer Modes
        background: '背景',
        wall: '壁',
        object: '物体',
        // Brushes
        pen: 'ペン',
        fur: '毛',
        glass: 'ガラス',
        slime: 'スライム',
        light: '光源',
        // Brush Settings
        color: '色',
        size: 'サイズ',
        opacity: '透明度',
        furLength: '毛の長さ',
        blurLevel: 'ブラーレベル',
        elasticity: '弾力',
        lightIntensity: '光の強さ',
        // 3D Effect
        effect3D: '3D回転',
        // Settings
        settings: '設定',
        language: '言語',
        // Messages
        saved: '保存しました',
        imported: 'インポートしました',
        exportSuccess: 'エクスポートしました',
        deleteConfirm: 'この作品を削除しますか？',
        confirm: '確認',
        // Tooltips
        penTooltip: '通常のペンで描画',
        furTooltip: 'ふわふわの毛を描画（デバイスの傾きで動く）',
        glassTooltip: 'ガラス効果で描画（背景ブラー）',
        slimeTooltip: 'スライム効果で描画（弾む）',
        lightTooltip: '光源を描画（周囲を照らす）',
        // Layer tooltips
        backgroundTooltip: '通常のお絵描きモード',
        wallTooltip: '当たり判定あり、位置固定',
        objectTooltip: '当たり判定あり、重力で落下'
    },
    zh: {
        // Gallery
        gallery: '画廊',
        newArtwork: '新建',
        delete: '删除',
        export: '导出',
        import: '导入',
        noArtworks: '没有作品',
        createFirst: '创建您的第一个作品吧！',
        // New Artwork Dialog
        newArtworkTitle: '新作品',
        artworkName: '作品名称',
        width: '宽度',
        height: '高度',
        ambientColor: '环境光颜色',
        ambientIntensity: '环境光强度',
        create: '创建',
        cancel: '取消',
        // Editor
        backToGallery: '返回画廊',
        save: '保存',
        play: '播放',
        pause: '暂停',
        // Layer Modes
        background: '背景',
        wall: '墙壁',
        object: '物体',
        // Brushes
        pen: '画笔',
        fur: '毛发',
        glass: '玻璃',
        slime: '粘液',
        light: '光源',
        // Brush Settings
        color: '颜色',
        size: '大小',
        opacity: '透明度',
        furLength: '毛发长度',
        blurLevel: '模糊级别',
        elasticity: '弹性',
        lightIntensity: '光强度',
        // 3D Effect
        effect3D: '3D旋转',
        // Settings
        settings: '设置',
        language: '语言',
        // Messages
        saved: '已保存',
        imported: '已导入',
        exportSuccess: '已导出',
        deleteConfirm: '确定删除这个作品吗？',
        confirm: '确认',
        // Tooltips
        penTooltip: '普通画笔绘制',
        furTooltip: '绘制毛绒效果（随设备倾斜移动）',
        glassTooltip: '绘制玻璃效果（背景模糊）',
        slimeTooltip: '绘制粘液效果（弹跳）',
        lightTooltip: '绘制光源（照亮周围）',
        // Layer tooltips
        backgroundTooltip: '普通绘画模式',
        wallTooltip: '有碰撞检测，位置固定',
        objectTooltip: '有碰撞检测，受重力影响'
    },
    ko: {
        // Gallery
        gallery: '갤러리',
        newArtwork: '새로 만들기',
        delete: '삭제',
        export: '내보내기',
        import: '가져오기',
        noArtworks: '작품이 없습니다',
        createFirst: '첫 번째 작품을 만들어 보세요!',
        // New Artwork Dialog
        newArtworkTitle: '새 작품',
        artworkName: '작품 이름',
        width: '너비',
        height: '높이',
        ambientColor: '환경광 색상',
        ambientIntensity: '환경광 강도',
        create: '만들기',
        cancel: '취소',
        // Editor
        backToGallery: '갤러리로 돌아가기',
        save: '저장',
        play: '재생',
        pause: '정지',
        // Layer Modes
        background: '배경',
        wall: '벽',
        object: '물체',
        // Brushes
        pen: '펜',
        fur: '털',
        glass: '유리',
        slime: '슬라임',
        light: '광원',
        // Brush Settings
        color: '색상',
        size: '크기',
        opacity: '불투명도',
        furLength: '털 길이',
        blurLevel: '흐림 수준',
        elasticity: '탄성',
        lightIntensity: '빛 강도',
        // 3D Effect
        effect3D: '3D 회전',
        // Settings
        settings: '설정',
        language: '언어',
        // Messages
        saved: '저장됨',
        imported: '가져옴',
        exportSuccess: '내보내기 완료',
        deleteConfirm: '이 작품을 삭제하시겠습니까?',
        confirm: '확인',
        // Tooltips
        penTooltip: '일반 펜으로 그리기',
        furTooltip: '복슬복슬한 털 그리기 (기기 기울기에 따라 움직임)',
        glassTooltip: '유리 효과 그리기 (배경 블러)',
        slimeTooltip: '슬라임 효과 그리기 (튕김)',
        lightTooltip: '광원 그리기 (주변 비춤)',
        // Layer tooltips
        backgroundTooltip: '일반 그림 그리기 모드',
        wallTooltip: '충돌 감지 있음, 위치 고정',
        objectTooltip: '충돌 감지 있음, 중력으로 떨어짐'
    },
    en: {
        // Gallery
        gallery: 'Gallery',
        newArtwork: 'New',
        delete: 'Delete',
        export: 'Export',
        import: 'Import',
        noArtworks: 'No artworks',
        createFirst: 'Create your first artwork!',
        // New Artwork Dialog
        newArtworkTitle: 'New Artwork',
        artworkName: 'Artwork Name',
        width: 'Width',
        height: 'Height',
        ambientColor: 'Ambient Color',
        ambientIntensity: 'Ambient Intensity',
        create: 'Create',
        cancel: 'Cancel',
        // Editor
        backToGallery: 'Back to Gallery',
        save: 'Save',
        play: 'Play',
        pause: 'Pause',
        // Layer Modes
        background: 'Background',
        wall: 'Wall',
        object: 'Object',
        // Brushes
        pen: 'Pen',
        fur: 'Fur',
        glass: 'Glass',
        slime: 'Slime',
        light: 'Light',
        // Brush Settings
        color: 'Color',
        size: 'Size',
        opacity: 'Opacity',
        furLength: 'Fur Length',
        blurLevel: 'Blur Level',
        elasticity: 'Elasticity',
        lightIntensity: 'Light Intensity',
        // 3D Effect
        effect3D: '3D Rotation',
        // Settings
        settings: 'Settings',
        language: 'Language',
        // Messages
        saved: 'Saved',
        imported: 'Imported',
        exportSuccess: 'Exported',
        deleteConfirm: 'Delete this artwork?',
        confirm: 'Confirm',
        // Tooltips
        penTooltip: 'Draw with a normal pen',
        furTooltip: 'Draw fluffy fur (moves with device tilt)',
        glassTooltip: 'Draw glass effect (background blur)',
        slimeTooltip: 'Draw slime effect (bounces)',
        lightTooltip: 'Draw light source (illuminates surroundings)',
        // Layer tooltips
        backgroundTooltip: 'Normal drawing mode',
        wallTooltip: 'Has collision, position fixed',
        objectTooltip: 'Has collision, falls with gravity'
    }
};
function getTranslation(lang, key) {
    return translations[lang][key] || translations.en[key] || key;
}
function detectLanguage() {
    if (typeof navigator === 'undefined') return 'en';
    const lang = navigator.language.toLowerCase();
    if (lang.startsWith('ja')) return 'ja';
    if (lang.startsWith('zh')) return 'zh';
    if (lang.startsWith('ko')) return 'ko';
    return 'en';
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/hooks/useIndexedDB.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIndexedDB",
    ()=>useIndexedDB
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
const DB_NAME = 'PhysicsDrawingDB';
const DB_VERSION = 1;
const STORE_NAME = 'artworks';
function useIndexedDB() {
    _s();
    const dbRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const init = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useIndexedDB.useCallback[init]": ()=>{
            return new Promise({
                "useIndexedDB.useCallback[init]": (resolve, reject)=>{
                    if (dbRef.current) {
                        resolve();
                        return;
                    }
                    const request = indexedDB.open(DB_NAME, DB_VERSION);
                    request.onerror = ({
                        "useIndexedDB.useCallback[init]": ()=>{
                            reject(request.error);
                        }
                    })["useIndexedDB.useCallback[init]"];
                    request.onsuccess = ({
                        "useIndexedDB.useCallback[init]": ()=>{
                            dbRef.current = request.result;
                            resolve();
                        }
                    })["useIndexedDB.useCallback[init]"];
                    request.onupgradeneeded = ({
                        "useIndexedDB.useCallback[init]": (event)=>{
                            const db = event.target.result;
                            if (!db.objectStoreNames.contains(STORE_NAME)) {
                                db.createObjectStore(STORE_NAME, {
                                    keyPath: 'id'
                                });
                            }
                        }
                    })["useIndexedDB.useCallback[init]"];
                }
            }["useIndexedDB.useCallback[init]"]);
        }
    }["useIndexedDB.useCallback[init]"], []);
    const getAll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useIndexedDB.useCallback[getAll]": ()=>{
            return new Promise({
                "useIndexedDB.useCallback[getAll]": (resolve, reject)=>{
                    if (!dbRef.current) {
                        resolve([]);
                        return;
                    }
                    const transaction = dbRef.current.transaction(STORE_NAME, 'readonly');
                    const store = transaction.objectStore(STORE_NAME);
                    const request = store.getAll();
                    request.onsuccess = ({
                        "useIndexedDB.useCallback[getAll]": ()=>{
                            resolve(request.result || []);
                        }
                    })["useIndexedDB.useCallback[getAll]"];
                    request.onerror = ({
                        "useIndexedDB.useCallback[getAll]": ()=>{
                            reject(request.error);
                        }
                    })["useIndexedDB.useCallback[getAll]"];
                }
            }["useIndexedDB.useCallback[getAll]"]);
        }
    }["useIndexedDB.useCallback[getAll]"], []);
    const save = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useIndexedDB.useCallback[save]": (artwork)=>{
            return new Promise({
                "useIndexedDB.useCallback[save]": (resolve, reject)=>{
                    if (!dbRef.current) {
                        reject(new Error('Database not initialized'));
                        return;
                    }
                    const transaction = dbRef.current.transaction(STORE_NAME, 'readwrite');
                    const store = transaction.objectStore(STORE_NAME);
                    const request = store.put(artwork);
                    request.onsuccess = ({
                        "useIndexedDB.useCallback[save]": ()=>{
                            resolve();
                        }
                    })["useIndexedDB.useCallback[save]"];
                    request.onerror = ({
                        "useIndexedDB.useCallback[save]": ()=>{
                            reject(request.error);
                        }
                    })["useIndexedDB.useCallback[save]"];
                }
            }["useIndexedDB.useCallback[save]"]);
        }
    }["useIndexedDB.useCallback[save]"], []);
    const remove = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useIndexedDB.useCallback[remove]": (id)=>{
            return new Promise({
                "useIndexedDB.useCallback[remove]": (resolve, reject)=>{
                    if (!dbRef.current) {
                        reject(new Error('Database not initialized'));
                        return;
                    }
                    const transaction = dbRef.current.transaction(STORE_NAME, 'readwrite');
                    const store = transaction.objectStore(STORE_NAME);
                    const request = store.delete(id);
                    request.onsuccess = ({
                        "useIndexedDB.useCallback[remove]": ()=>{
                            resolve();
                        }
                    })["useIndexedDB.useCallback[remove]"];
                    request.onerror = ({
                        "useIndexedDB.useCallback[remove]": ()=>{
                            reject(request.error);
                        }
                    })["useIndexedDB.useCallback[remove]"];
                }
            }["useIndexedDB.useCallback[remove]"]);
        }
    }["useIndexedDB.useCallback[remove]"], []);
    const get = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useIndexedDB.useCallback[get]": (id)=>{
            return new Promise({
                "useIndexedDB.useCallback[get]": (resolve, reject)=>{
                    if (!dbRef.current) {
                        resolve(null);
                        return;
                    }
                    const transaction = dbRef.current.transaction(STORE_NAME, 'readonly');
                    const store = transaction.objectStore(STORE_NAME);
                    const request = store.get(id);
                    request.onsuccess = ({
                        "useIndexedDB.useCallback[get]": ()=>{
                            resolve(request.result || null);
                        }
                    })["useIndexedDB.useCallback[get]"];
                    request.onerror = ({
                        "useIndexedDB.useCallback[get]": ()=>{
                            reject(request.error);
                        }
                    })["useIndexedDB.useCallback[get]"];
                }
            }["useIndexedDB.useCallback[get]"]);
        }
    }["useIndexedDB.useCallback[get]"], []);
    return {
        init,
        getAll,
        save,
        remove,
        get
    };
}
_s(useIndexedDB, "Q0OT64rxPZHZqB2zcWOwC7RfzuY=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/store/AppContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProvider",
    ()=>AppProvider,
    "useApp",
    ()=>useApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$hooks$2f$useIndexedDB$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/hooks/useIndexedDB.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// Initial state
const initialEditorState = {
    currentArtwork: null,
    currentLayerMode: 'background',
    brushSettings: __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_BRUSH_SETTINGS"],
    physics: __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PHYSICS"],
    is3DEffectEnabled: false,
    rotation3D: {
        x: 0,
        y: 0
    }
};
const initialState = {
    language: 'en',
    artworks: [],
    editor: initialEditorState,
    currentView: 'gallery'
};
// Reducer
function appReducer(state, action) {
    switch(action.type){
        case 'SET_LANGUAGE':
            return {
                ...state,
                language: action.payload
            };
        case 'SET_ARTWORKS':
            return {
                ...state,
                artworks: action.payload
            };
        case 'ADD_ARTWORK':
            return {
                ...state,
                artworks: [
                    ...state.artworks,
                    action.payload
                ]
            };
        case 'UPDATE_ARTWORK':
            return {
                ...state,
                artworks: state.artworks.map((a)=>a.id === action.payload.id ? action.payload : a),
                editor: state.editor.currentArtwork?.id === action.payload.id ? {
                    ...state.editor,
                    currentArtwork: action.payload
                } : state.editor
            };
        case 'DELETE_ARTWORK':
            return {
                ...state,
                artworks: state.artworks.filter((a)=>a.id !== action.payload)
            };
        case 'SET_CURRENT_VIEW':
            return {
                ...state,
                currentView: action.payload
            };
        case 'SET_CURRENT_ARTWORK':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    currentArtwork: action.payload
                }
            };
        case 'SET_LAYER_MODE':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    currentLayerMode: action.payload
                }
            };
        case 'SET_BRUSH_SETTINGS':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    brushSettings: {
                        ...state.editor.brushSettings,
                        ...action.payload
                    }
                }
            };
        case 'ADD_STROKE':
            if (!state.editor.currentArtwork) return state;
            const updatedArtwork = {
                ...state.editor.currentArtwork,
                strokes: [
                    ...state.editor.currentArtwork.strokes,
                    action.payload
                ],
                updatedAt: Date.now()
            };
            return {
                ...state,
                editor: {
                    ...state.editor,
                    currentArtwork: updatedArtwork
                },
                artworks: state.artworks.map((a)=>a.id === updatedArtwork.id ? updatedArtwork : a)
            };
        case 'UPDATE_STROKE':
            if (!state.editor.currentArtwork) return state;
            const updatedStrokes = state.editor.currentArtwork.strokes.map((s)=>s.id === action.payload.id ? {
                    ...s,
                    ...action.payload.updates
                } : s);
            const artworkWithUpdatedStroke = {
                ...state.editor.currentArtwork,
                strokes: updatedStrokes,
                updatedAt: Date.now()
            };
            return {
                ...state,
                editor: {
                    ...state.editor,
                    currentArtwork: artworkWithUpdatedStroke
                },
                artworks: state.artworks.map((a)=>a.id === artworkWithUpdatedStroke.id ? artworkWithUpdatedStroke : a)
            };
        case 'UPDATE_ARTWORK_STROKES':
            if (!state.editor.currentArtwork) return state;
            const artworkWithNewStrokes = {
                ...state.editor.currentArtwork,
                strokes: action.payload,
                updatedAt: Date.now()
            };
            return {
                ...state,
                editor: {
                    ...state.editor,
                    currentArtwork: artworkWithNewStrokes
                },
                artworks: state.artworks.map((a)=>a.id === artworkWithNewStrokes.id ? artworkWithNewStrokes : a)
            };
        case 'SET_PHYSICS_PLAYING':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    physics: {
                        ...state.editor.physics,
                        isPlaying: action.payload
                    }
                }
            };
        case 'SET_GRAVITY':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    physics: {
                        ...state.editor.physics,
                        gravity: action.payload
                    }
                }
            };
        case 'TOGGLE_3D_EFFECT':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    is3DEffectEnabled: !state.editor.is3DEffectEnabled
                }
            };
        case 'SET_3D_ROTATION':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    rotation3D: action.payload
                }
            };
        default:
            return state;
    }
}
const AppContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function AppProvider({ children }) {
    _s();
    const [state, dispatch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReducer"])(appReducer, initialState);
    const { getAll, save, remove, init } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$hooks$2f$useIndexedDB$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIndexedDB"])();
    // Initialize on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppProvider.useEffect": ()=>{
            const initApp = {
                "AppProvider.useEffect.initApp": async ()=>{
                    await init();
                    const artworks = await getAll();
                    dispatch({
                        type: 'SET_ARTWORKS',
                        payload: artworks
                    });
                    // Detect language
                    const detectedLang = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["detectLanguage"])();
                    dispatch({
                        type: 'SET_LANGUAGE',
                        payload: detectedLang
                    });
                }
            }["AppProvider.useEffect.initApp"];
            initApp();
        }
    }["AppProvider.useEffect"], []);
    const createArtwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[createArtwork]": async (name, width, height, ambientColor, ambientIntensity)=>{
            const artwork = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                name: name || `Artwork ${state.artworks.length + 1}`,
                width,
                height,
                ambientColor,
                ambientIntensity,
                strokes: [],
                previewImage: '',
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            await save(artwork);
            dispatch({
                type: 'ADD_ARTWORK',
                payload: artwork
            });
            return artwork;
        }
    }["AppProvider.useCallback[createArtwork]"], [
        state.artworks.length,
        save
    ]);
    const deleteArtwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[deleteArtwork]": async (id)=>{
            await remove(id);
            dispatch({
                type: 'DELETE_ARTWORK',
                payload: id
            });
        }
    }["AppProvider.useCallback[deleteArtwork]"], [
        remove
    ]);
    const saveCurrentArtwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[saveCurrentArtwork]": async ()=>{
            if (state.editor.currentArtwork) {
                await save(state.editor.currentArtwork);
            }
        }
    }["AppProvider.useCallback[saveCurrentArtwork]"], [
        state.editor.currentArtwork,
        save
    ]);
    const openArtwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[openArtwork]": (id)=>{
            const artwork = state.artworks.find({
                "AppProvider.useCallback[openArtwork].artwork": (a)=>a.id === id
            }["AppProvider.useCallback[openArtwork].artwork"]);
            if (artwork) {
                dispatch({
                    type: 'SET_CURRENT_ARTWORK',
                    payload: artwork
                });
                dispatch({
                    type: 'SET_CURRENT_VIEW',
                    payload: 'editor'
                });
            }
        }
    }["AppProvider.useCallback[openArtwork]"], [
        state.artworks
    ]);
    const goToGallery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[goToGallery]": ()=>{
            dispatch({
                type: 'SET_CURRENT_VIEW',
                payload: 'gallery'
            });
            dispatch({
                type: 'SET_CURRENT_ARTWORK',
                payload: null
            });
        }
    }["AppProvider.useCallback[goToGallery]"], []);
    const exportArtwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[exportArtwork]": (id)=>{
            const artwork = state.artworks.find({
                "AppProvider.useCallback[exportArtwork].artwork": (a)=>a.id === id
            }["AppProvider.useCallback[exportArtwork].artwork"]);
            if (artwork) {
                const json = JSON.stringify(artwork, null, 2);
                const blob = new Blob([
                    json
                ], {
                    type: 'application/json'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${artwork.name}.json`;
                a.click();
                URL.revokeObjectURL(url);
            }
        }
    }["AppProvider.useCallback[exportArtwork]"], [
        state.artworks
    ]);
    const importArtwork = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AppProvider.useCallback[importArtwork]": async (file)=>{
            const text = await file.text();
            try {
                const artwork = JSON.parse(text);
                artwork.id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(); // Generate new ID
                artwork.createdAt = Date.now();
                artwork.updatedAt = Date.now();
                await save(artwork);
                dispatch({
                    type: 'ADD_ARTWORK',
                    payload: artwork
                });
            } catch (e) {
                console.error('Failed to import artwork:', e);
            }
        }
    }["AppProvider.useCallback[importArtwork]"], [
        save
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContext.Provider, {
        value: {
            state,
            dispatch,
            createArtwork,
            deleteArtwork,
            saveCurrentArtwork,
            openArtwork,
            goToGallery,
            exportArtwork,
            importArtwork
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/store/AppContext.tsx",
        lineNumber: 302,
        columnNumber: 5
    }, this);
}
_s(AppProvider, "44Ky09MX0DZN08QuvINbQEechaI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$hooks$2f$useIndexedDB$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIndexedDB"]
    ];
});
_c = AppProvider;
function useApp() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}
_s1(useApp, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AppProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
            destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
            secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2 has-[>svg]:px-3",
            sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
            lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
            icon: "size-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/button.tsx",
        lineNumber: 51,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Card;
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_c1 = CardHeader;
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_c2 = CardTitle;
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_c3 = CardDescription;
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_c4 = CardAction;
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c5 = CardContent;
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_c6 = CardFooter;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "Card");
__turbopack_context__.k.register(_c1, "CardHeader");
__turbopack_context__.k.register(_c2, "CardTitle");
__turbopack_context__.k.register(_c3, "CardDescription");
__turbopack_context__.k.register(_c4, "CardAction");
__turbopack_context__.k.register(_c5, "CardContent");
__turbopack_context__.k.register(_c6, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Label({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/label.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/ui/slider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Slider",
    ()=>Slider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/@radix-ui/react-slider/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }) {
    _s();
    const _values = __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "Slider.useMemo[_values]": ()=>Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [
                min,
                max
            ]
    }["Slider.useMemo[_values]"], [
        value,
        defaultValue,
        min,
        max
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "slider",
        defaultValue: defaultValue,
        value: value,
        min: min,
        max: max,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Track"], {
                "data-slot": "slider-track",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Range"], {
                    "data-slot": "slider-range",
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full")
                }, void 0, false, {
                    fileName: "[project]/Mulu-Canvas/src/components/ui/slider.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/ui/slider.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            Array.from({
                length: _values.length
            }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slider$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Thumb"], {
                    "data-slot": "slider-thumb",
                    className: "border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
                }, index, false, {
                    fileName: "[project]/Mulu-Canvas/src/components/ui/slider.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/slider.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_s(Slider, "g0y/PG/feYg861SE8jxuAUMRVc0=");
_c = Slider;
;
var _c;
__turbopack_context__.k.register(_c, "Slider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as XIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Dialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Dialog;
function DialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = DialogTrigger;
function DialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = DialogPortal;
function DialogClose({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
        "data-slot": "dialog-close",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
        lineNumber: 30,
        columnNumber: 10
    }, this);
}
_c3 = DialogClose;
function DialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
_c4 = DialogOverlay;
function DialogContent({ className, children, showCloseButton = true, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        "data-slot": "dialog-portal",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
                lineNumber: 59,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props,
                children: [
                    children,
                    showCloseButton && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        "data-slot": "dialog-close",
                        className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XIcon$3e$__["XIcon"], {}, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
        lineNumber: 58,
        columnNumber: 5
    }, this);
}
_c5 = DialogContent;
function DialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, this);
}
_c6 = DialogHeader;
function DialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c7 = DialogFooter;
function DialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c8 = DialogTitle;
function DialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/dialog.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c9 = DialogDescription;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Dialog");
__turbopack_context__.k.register(_c1, "DialogTrigger");
__turbopack_context__.k.register(_c2, "DialogPortal");
__turbopack_context__.k.register(_c3, "DialogClose");
__turbopack_context__.k.register(_c4, "DialogOverlay");
__turbopack_context__.k.register(_c5, "DialogContent");
__turbopack_context__.k.register(_c6, "DialogHeader");
__turbopack_context__.k.register(_c7, "DialogFooter");
__turbopack_context__.k.register(_c8, "DialogTitle");
__turbopack_context__.k.register(_c9, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AlertDialog",
    ()=>AlertDialog,
    "AlertDialogAction",
    ()=>AlertDialogAction,
    "AlertDialogCancel",
    ()=>AlertDialogCancel,
    "AlertDialogContent",
    ()=>AlertDialogContent,
    "AlertDialogDescription",
    ()=>AlertDialogDescription,
    "AlertDialogFooter",
    ()=>AlertDialogFooter,
    "AlertDialogHeader",
    ()=>AlertDialogHeader,
    "AlertDialogOverlay",
    ()=>AlertDialogOverlay,
    "AlertDialogPortal",
    ()=>AlertDialogPortal,
    "AlertDialogTitle",
    ()=>AlertDialogTitle,
    "AlertDialogTrigger",
    ()=>AlertDialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/@radix-ui/react-alert-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/button.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
function AlertDialog({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "alert-dialog",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = AlertDialog;
function AlertDialogTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "alert-dialog-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c1 = AlertDialogTrigger;
function AlertDialogPortal({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        "data-slot": "alert-dialog-portal",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c2 = AlertDialogPortal;
function AlertDialogOverlay({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        "data-slot": "alert-dialog-overlay",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = AlertDialogOverlay;
function AlertDialogContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AlertDialogOverlay, {}, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "alert-dialog-content",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c4 = AlertDialogContent;
function AlertDialogHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-dialog-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-2 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
        lineNumber: 71,
        columnNumber: 5
    }, this);
}
_c5 = AlertDialogHeader;
function AlertDialogFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-dialog-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_c6 = AlertDialogFooter;
function AlertDialogTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        "data-slot": "alert-dialog-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_c7 = AlertDialogTitle;
function AlertDialogDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        "data-slot": "alert-dialog-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
        lineNumber: 113,
        columnNumber: 5
    }, this);
}
_c8 = AlertDialogDescription;
function AlertDialogAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Action"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])(), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_c9 = AlertDialogAction;
function AlertDialogCancel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$alert$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cancel"], {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])({
            variant: "outline"
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
_c10 = AlertDialogCancel;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "AlertDialog");
__turbopack_context__.k.register(_c1, "AlertDialogTrigger");
__turbopack_context__.k.register(_c2, "AlertDialogPortal");
__turbopack_context__.k.register(_c3, "AlertDialogOverlay");
__turbopack_context__.k.register(_c4, "AlertDialogContent");
__turbopack_context__.k.register(_c5, "AlertDialogHeader");
__turbopack_context__.k.register(_c6, "AlertDialogFooter");
__turbopack_context__.k.register(_c7, "AlertDialogTitle");
__turbopack_context__.k.register(_c8, "AlertDialogDescription");
__turbopack_context__.k.register(_c9, "AlertDialogAction");
__turbopack_context__.k.register(_c10, "AlertDialogCancel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
_c = Select;
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c1 = SelectGroup;
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
_c2 = SelectValue;
function SelectTrigger({ className, size = "default", children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_c3 = SelectTrigger;
function SelectContent({ className, children, position = "popper", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
_c4 = SelectContent;
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground px-2 py-1.5 text-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
_c5 = SelectLabel;
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_c6 = SelectItem;
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border pointer-events-none -mx-1 my-1 h-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_c7 = SelectSeparator;
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
_c8 = SelectScrollUpButton;
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/select.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
_c9 = SelectScrollDownButton;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "SelectGroup");
__turbopack_context__.k.register(_c2, "SelectValue");
__turbopack_context__.k.register(_c3, "SelectTrigger");
__turbopack_context__.k.register(_c4, "SelectContent");
__turbopack_context__.k.register(_c5, "SelectLabel");
__turbopack_context__.k.register(_c6, "SelectItem");
__turbopack_context__.k.register(_c7, "SelectSeparator");
__turbopack_context__.k.register(_c8, "SelectScrollUpButton");
__turbopack_context__.k.register(_c9, "SelectScrollDownButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/Gallery.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Gallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/store/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/alert-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
function t(language, key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTranslation"])(language, key);
}
function NewArtworkDialog({ open, onOpenChange, onCreate }) {
    _s();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [width, setWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(800);
    const [height, setHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(600);
    const [ambientColor, setAmbientColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('#ffffff');
    const [ambientIntensity, setAmbientIntensity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0.3);
    const handleCreate = ()=>{
        onCreate(name, width, height, ambientColor, ambientIntensity);
        setName('');
        setWidth(800);
        setHeight(600);
        setAmbientColor('#ffffff');
        setAmbientIntensity(0.3);
        onOpenChange(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        children: t(state.language, 'newArtworkTitle')
                    }, void 0, false, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 71,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-4 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "name",
                                    children: t(state.language, 'artworkName')
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 76,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "name",
                                    value: name,
                                    onChange: (e)=>setName(e.target.value),
                                    placeholder: `Artwork ${new Date().toLocaleDateString()}`
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "width",
                                            children: t(state.language, 'width')
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 86,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "width",
                                            type: "number",
                                            value: width,
                                            onChange: (e)=>setWidth(parseInt(e.target.value) || 800),
                                            min: 100,
                                            max: 2000
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 87,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "height",
                                            children: t(state.language, 'height')
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "height",
                                            type: "number",
                                            value: height,
                                            onChange: (e)=>setHeight(parseInt(e.target.value) || 600),
                                            min: 100,
                                            max: 2000
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "ambientColor",
                                    children: t(state.language, 'ambientColor')
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 109,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "ambientColor",
                                            type: "color",
                                            value: ambientColor,
                                            onChange: (e)=>setAmbientColor(e.target.value),
                                            className: "w-12 h-10 p-1"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 111,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: ambientColor,
                                            onChange: (e)=>setAmbientColor(e.target.value),
                                            className: "flex-1"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 110,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 108,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    children: [
                                        t(state.language, 'ambientIntensity'),
                                        ": ",
                                        ambientIntensity.toFixed(2)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                    value: [
                                        ambientIntensity
                                    ],
                                    onValueChange: (v)=>setAmbientIntensity(v[0]),
                                    min: 0,
                                    max: 1,
                                    step: 0.01
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 127,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 125,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: ()=>onOpenChange(false),
                            children: t(state.language, 'cancel')
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 137,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleCreate,
                            children: t(state.language, 'create')
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 140,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 136,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
            lineNumber: 70,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, this);
}
_s(NewArtworkDialog, "VV5TCpMIZUCfQBXi0VTi1tJ3+yc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = NewArtworkDialog;
function ArtworkCard({ artwork, onOpen, onDelete, onExport }) {
    _s1();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [showDeleteConfirm, setShowDeleteConfirm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const formatDate = (timestamp)=>{
        return new Date(timestamp).toLocaleDateString(state.language === 'ja' ? 'ja-JP' : state.language === 'zh' ? 'zh-CN' : state.language === 'ko' ? 'ko-KR' : 'en-US');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "group cursor-pointer hover:shadow-lg transition-shadow",
                onClick: onOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-base truncate",
                            children: artwork.name
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "p-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "aspect-video bg-gray-100 relative overflow-hidden",
                            style: {
                                backgroundColor: artwork.ambientColor,
                                backgroundBlendMode: 'multiply'
                            },
                            children: artwork.previewImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: artwork.previewImage,
                                alt: artwork.name,
                                className: "w-full h-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 179,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-full flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                                    className: "w-12 h-12 text-gray-300"
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 186,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 185,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 171,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardFooter"], {
                        className: "p-3 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-500",
                                children: formatDate(artwork.updatedAt)
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "h-8 w-8",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            onExport();
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 203,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                        lineNumber: 194,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "icon",
                                        className: "h-8 w-8 text-red-500 hover:text-red-600",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            setShowDeleteConfirm(true);
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 214,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                        lineNumber: 205,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialog"], {
                open: showDeleteConfirm,
                onOpenChange: setShowDeleteConfirm,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                    children: t(state.language, 'confirm')
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 223,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                                    children: t(state.language, 'deleteConfirm')
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 224,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 222,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                    children: t(state.language, 'cancel')
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                                    className: "bg-red-500 hover:bg-red-600",
                                    onClick: ()=>{
                                        onDelete();
                                        setShowDeleteConfirm(false);
                                    },
                                    children: t(state.language, 'delete')
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 230,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                lineNumber: 220,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s1(ArtworkCard, "Le0WRpC9hp4j4AZ6AqkjDGpJNjM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c1 = ArtworkCard;
function Gallery() {
    _s2();
    const { state, dispatch, createArtwork, deleteArtwork, openArtwork, exportArtwork, importArtwork } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const [showNewDialog, setShowNewDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleCreate = async (name, width, height, ambientColor, ambientIntensity)=>{
        const artwork = await createArtwork(name, width, height, ambientColor, ambientIntensity);
        openArtwork(artwork.id);
    };
    const handleImport = async (e)=>{
        const file = e.target.files?.[0];
        if (file) {
            await importArtwork(file);
        }
        e.target.value = '';
    };
    const handleLanguageChange = (lang)=>{
        dispatch({
            type: 'SET_LANGUAGE',
            payload: lang
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-slate-50 to-slate-100",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white shadow-sm sticky top-0 z-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 py-4 flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-bold text-gray-800",
                            children: t(state.language, 'gallery')
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 279,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: state.language,
                                onValueChange: (v)=>handleLanguageChange(v),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        className: "w-[140px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                className: "w-4 h-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                                lineNumber: 285,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                                lineNumber: 286,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                        lineNumber: 284,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "ja",
                                                children: "日本語"
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                                lineNumber: 289,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "zh",
                                                children: "中文"
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "ko",
                                                children: "한국어"
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                                lineNumber: 291,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "en",
                                                children: "English"
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                                lineNumber: 292,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 283,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 282,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 278,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                lineNumber: 277,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 py-4 flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>setShowNewDialog(true),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this),
                            t(state.language, 'newArtwork')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        ref: fileInputRef,
                        type: "file",
                        accept: ".json",
                        onChange: handleImport,
                        className: "hidden"
                    }, void 0, false, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 305,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        onClick: ()=>fileInputRef.current?.click(),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 316,
                                columnNumber: 11
                            }, this),
                            t(state.language, 'import')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 312,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                lineNumber: 300,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "max-w-7xl mx-auto px-4 pb-8",
                children: state.artworks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-16",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                            className: "w-16 h-16 mx-auto text-gray-300 mb-4"
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 325,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 text-lg",
                            children: t(state.language, 'noArtworks')
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 326,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-400 mt-2",
                            children: t(state.language, 'createFirst')
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 327,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            className: "mt-4",
                            onClick: ()=>setShowNewDialog(true),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-4 h-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 329,
                                    columnNumber: 15
                                }, this),
                                t(state.language, 'newArtwork')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 328,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 324,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
                    children: state.artworks.sort((a, b)=>b.updatedAt - a.updatedAt).map((artwork)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArtworkCard, {
                            artwork: artwork,
                            onOpen: ()=>openArtwork(artwork.id),
                            onDelete: ()=>deleteArtwork(artwork.id),
                            onExport: ()=>exportArtwork(artwork.id)
                        }, artwork.id, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 338,
                            columnNumber: 17
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 334,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NewArtworkDialog, {
                open: showNewDialog,
                onOpenChange: setShowNewDialog,
                onCreate: handleCreate
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                lineNumber: 350,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
        lineNumber: 275,
        columnNumber: 5
    }, this);
}
_s2(Gallery, "x+XQaKBPkvowaf+FzQ76nV+ulNk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c2 = Gallery;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "NewArtworkDialog");
__turbopack_context__.k.register(_c1, "ArtworkCard");
__turbopack_context__.k.register(_c2, "Gallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/ui/toggle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toggle",
    ()=>Toggle,
    "toggleVariants",
    ()=>toggleVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toggle$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/@radix-ui/react-toggle/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const toggleVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap", {
    variants: {
        variant: {
            default: "bg-transparent",
            outline: "border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground"
        },
        size: {
            default: "h-9 px-2 min-w-9",
            sm: "h-8 px-1.5 min-w-8",
            lg: "h-10 px-2.5 min-w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
function Toggle({ className, variant, size, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toggle$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "toggle",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(toggleVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/toggle.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c = Toggle;
;
var _c;
__turbopack_context__.k.register(_c, "Toggle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/ui/toggle-group.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToggleGroup",
    ()=>ToggleGroup,
    "ToggleGroupItem",
    ()=>ToggleGroupItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toggle$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/@radix-ui/react-toggle-group/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/toggle.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const ToggleGroupContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({
    size: "default",
    variant: "default"
});
function ToggleGroup({ className, variant, size, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toggle$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "toggle-group",
        "data-variant": variant,
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToggleGroupContext.Provider, {
            value: {
                variant,
                size
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/ui/toggle-group.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/toggle-group.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = ToggleGroup;
function ToggleGroupItem({ className, children, variant, size, ...props }) {
    _s();
    const context = __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](ToggleGroupContext);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$toggle$2d$group$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "toggle-group-item",
        "data-variant": context.variant || variant,
        "data-size": context.size || size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$toggle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleVariants"])({
            variant: context.variant || variant,
            size: context.size || size
        }), "min-w-0 flex-1 shrink-0 rounded-none shadow-none first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l", className),
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/toggle-group.tsx",
        lineNumber: 54,
        columnNumber: 5
    }, this);
}
_s(ToggleGroupItem, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
_c1 = ToggleGroupItem;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "ToggleGroup");
__turbopack_context__.k.register(_c1, "ToggleGroupItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/ui/tooltip.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Tooltip",
    ()=>Tooltip,
    "TooltipContent",
    ()=>TooltipContent,
    "TooltipProvider",
    ()=>TooltipProvider,
    "TooltipTrigger",
    ()=>TooltipTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/@radix-ui/react-tooltip/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function TooltipProvider({ delayDuration = 0, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        "data-slot": "tooltip-provider",
        delayDuration: delayDuration,
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/tooltip.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
_c = TooltipProvider;
function Tooltip({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TooltipProvider, {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
            "data-slot": "tooltip",
            ...props
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/ui/tooltip.tsx",
            lineNumber: 26,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/tooltip.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c1 = Tooltip;
function TooltipTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "tooltip-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/tooltip.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, this);
}
_c2 = TooltipTrigger;
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "tooltip-content",
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance", className),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$tooltip$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Arrow"], {
                    className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]"
                }, void 0, false, {
                    fileName: "[project]/Mulu-Canvas/src/components/ui/tooltip.tsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Mulu-Canvas/src/components/ui/tooltip.tsx",
            lineNumber: 45,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/tooltip.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c3 = TooltipContent;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "TooltipProvider");
__turbopack_context__.k.register(_c1, "Tooltip");
__turbopack_context__.k.register(_c2, "TooltipTrigger");
__turbopack_context__.k.register(_c3, "TooltipContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/ui/popover.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Popover",
    ()=>Popover,
    "PopoverAnchor",
    ()=>PopoverAnchor,
    "PopoverContent",
    ()=>PopoverContent,
    "PopoverTrigger",
    ()=>PopoverTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/@radix-ui/react-popover/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Popover({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "popover",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/popover.tsx",
        lineNumber: 11,
        columnNumber: 10
    }, this);
}
_c = Popover;
function PopoverTrigger({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "popover-trigger",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/popover.tsx",
        lineNumber: 17,
        columnNumber: 10
    }, this);
}
_c1 = PopoverTrigger;
function PopoverContent({ className, align = "center", sideOffset = 4, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "popover-content",
            align: align,
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/ui/popover.tsx",
            lineNumber: 28,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/popover.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
_c2 = PopoverContent;
function PopoverAnchor({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Anchor"], {
        "data-slot": "popover-anchor",
        ...props
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/ui/popover.tsx",
        lineNumber: 45,
        columnNumber: 10
    }, this);
}
_c3 = PopoverAnchor;
;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Popover");
__turbopack_context__.k.register(_c1, "PopoverTrigger");
__turbopack_context__.k.register(_c2, "PopoverContent");
__turbopack_context__.k.register(_c3, "PopoverAnchor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/hooks/useDeviceOrientation.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDeviceOrientation",
    ()=>useDeviceOrientation,
    "useMouseGravity",
    ()=>useMouseGravity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
function useDeviceOrientation(options = {}) {
    _s();
    const { onOrientationChange, onGravityChange } = options;
    const [orientation, setOrientation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        alpha: null,
        beta: null,
        gamma: null
    });
    const handleOrientation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDeviceOrientation.useCallback[handleOrientation]": (event)=>{
            const newOrientation = {
                alpha: event.alpha,
                beta: event.beta,
                gamma: event.gamma
            };
            setOrientation(newOrientation);
            onOrientationChange?.(newOrientation);
            // Calculate gravity direction from device tilt
            // beta: front/back tilt (-180 to 180), 0 = flat, 90 = vertical
            // gamma: left/right tilt (-90 to 90), 0 = flat
            if (event.beta !== null && event.gamma !== null) {
                // Normalize to -1 to 1 range
                const gravityX = Math.max(-1, Math.min(1, event.gamma / 45));
                const gravityY = Math.max(-1, Math.min(1, (event.beta - 45) / 45));
                onGravityChange?.({
                    x: gravityX,
                    y: gravityY
                });
            }
        }
    }["useDeviceOrientation.useCallback[handleOrientation]"], [
        onOrientationChange,
        onGravityChange
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDeviceOrientation.useEffect": ()=>{
            // Check if DeviceOrientationEvent is available
            if (("TURBOPACK compile-time value", "object") === 'undefined' || !('DeviceOrientationEvent' in window)) {
                return;
            }
            // iOS 13+ requires permission
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                // Permission will be requested on user interaction
                return;
            }
            window.addEventListener('deviceorientation', handleOrientation);
            return ({
                "useDeviceOrientation.useEffect": ()=>{
                    window.removeEventListener('deviceorientation', handleOrientation);
                }
            })["useDeviceOrientation.useEffect"];
        }
    }["useDeviceOrientation.useEffect"], [
        handleOrientation
    ]);
    const requestPermission = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useDeviceOrientation.useCallback[requestPermission]": async ()=>{
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    const permission = await DeviceOrientationEvent.requestPermission();
                    if (permission === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                        return true;
                    }
                } catch (error) {
                    console.error('Failed to request device orientation permission:', error);
                    return false;
                }
            }
            return true;
        }
    }["useDeviceOrientation.useCallback[requestPermission]"], [
        handleOrientation
    ]);
    return {
        orientation,
        requestPermission
    };
}
_s(useDeviceOrientation, "TjRot6cmIG8WspPQh10/w2VZIqU=");
function useMouseGravity(containerRef, onGravityChange) {
    _s1();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useMouseGravity.useEffect": ()=>{
            const container = containerRef.current;
            if (!container) return;
            const handleMouseMove = {
                "useMouseGravity.useEffect.handleMouseMove": (event)=>{
                    const rect = container.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    // Calculate direction from center to mouse
                    const dx = event.clientX - centerX;
                    const dy = event.clientY - centerY;
                    // Normalize to -1 to 1 range
                    const maxDist = Math.max(rect.width, rect.height) / 2;
                    const gravityX = Math.max(-1, Math.min(1, dx / maxDist));
                    const gravityY = Math.max(-1, Math.min(1, dy / maxDist));
                    onGravityChange({
                        x: gravityX,
                        y: gravityY
                    });
                }
            }["useMouseGravity.useEffect.handleMouseMove"];
            container.addEventListener('mousemove', handleMouseMove);
            return ({
                "useMouseGravity.useEffect": ()=>{
                    container.removeEventListener('mousemove', handleMouseMove);
                }
            })["useMouseGravity.useEffect"];
        }
    }["useMouseGravity.useEffect"], [
        containerRef,
        onGravityChange
    ]);
}
_s1(useMouseGravity, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/lib/physics.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateBounds",
    ()=>calculateBounds,
    "createPhysicsBody",
    ()=>createPhysicsBody,
    "getCenter",
    ()=>getCenter,
    "moveStroke",
    ()=>moveStroke,
    "updatePhysics",
    ()=>updatePhysics
]);
// Simple 2D Physics Engine
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/types.ts [app-client] (ecmascript)");
;
const GRAVITY_STRENGTH = 500; // pixels per second squared
const DAMPING = 0.99;
const DEFAULT_WALL_RESTITUTION = 0.7;
function createPhysicsBody(stroke) {
    if (stroke.layerMode === 'background' || stroke.points.length < 2) {
        return null;
    }
    const bounds = calculateBounds(stroke.points);
    // Use stroke's elasticity if it's a slime, otherwise use default
    let elasticity = stroke.elasticity || 0.8;
    // Slime brush has custom elasticity
    if (stroke.brushType === 'slime') {
        elasticity = stroke.elasticity || 0.9; // High bounce for slime
    }
    return {
        id: stroke.id,
        strokeId: stroke.id,
        points: stroke.points,
        velocity: stroke.velocity || {
            x: 0,
            y: 0
        },
        bounds,
        layerMode: stroke.layerMode,
        elasticity,
        brushType: stroke.brushType
    };
}
function calculateBounds(points) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const point of points){
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
    }
    return {
        minX,
        maxX,
        minY,
        maxY
    };
}
function getCenter(bounds) {
    return {
        x: (bounds.minX + bounds.maxX) / 2,
        y: (bounds.minY + bounds.maxY) / 2
    };
}
function updatePhysics(bodies, gravity, canvasWidth, canvasHeight, deltaTime) {
    const dt = deltaTime / 1000; // Convert to seconds
    // Update velocities and positions for objects
    const updatedBodies = bodies.map((body)=>{
        if (body.layerMode === 'wall') {
            return body; // Walls don't move
        }
        // Apply gravity
        const newVelocity = {
            x: body.velocity.x + gravity.x * GRAVITY_STRENGTH * dt,
            y: body.velocity.y + gravity.y * GRAVITY_STRENGTH * dt
        };
        // Apply damping (less damping for slime = more bouncy)
        let dampingFactor = DAMPING;
        if (body.brushType === 'slime') {
            dampingFactor = 0.995; // Slime loses less energy
        }
        newVelocity.x *= dampingFactor;
        newVelocity.y *= dampingFactor;
        // Calculate position offset
        const offset = {
            x: newVelocity.x * dt,
            y: newVelocity.y * dt
        };
        // Update points
        const newPoints = body.points.map((p)=>({
                x: p.x + offset.x,
                y: p.y + offset.y
            }));
        // Update bounds
        const newBounds = calculateBounds(newPoints);
        return {
            ...body,
            points: newPoints,
            velocity: newVelocity,
            bounds: newBounds
        };
    });
    // Check collisions with walls (border)
    const collisionHandled = updatedBodies.map((body)=>{
        if (body.layerMode === 'wall') return body;
        let { points, velocity, bounds, elasticity, brushType } = body;
        // Use custom wall restitution for slime
        let wallRestitution = DEFAULT_WALL_RESTITUTION;
        if (brushType === 'slime') {
            wallRestitution = elasticity; // Slime uses its own elasticity
        }
        // Left wall
        if (bounds.minX < __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_THICKNESS"]) {
            const overlap = __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_THICKNESS"] - bounds.minX;
            points = points.map((p)=>({
                    ...p,
                    x: p.x + overlap
                }));
            velocity.x = Math.abs(velocity.x) * wallRestitution;
            bounds = calculateBounds(points);
        }
        // Right wall
        if (bounds.maxX > canvasWidth - __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_THICKNESS"]) {
            const overlap = bounds.maxX - (canvasWidth - __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_THICKNESS"]);
            points = points.map((p)=>({
                    ...p,
                    x: p.x - overlap
                }));
            velocity.x = -Math.abs(velocity.x) * wallRestitution;
            bounds = calculateBounds(points);
        }
        // Top wall
        if (bounds.minY < __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_THICKNESS"]) {
            const overlap = __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_THICKNESS"] - bounds.minY;
            points = points.map((p)=>({
                    ...p,
                    y: p.y + overlap
                }));
            velocity.y = Math.abs(velocity.y) * wallRestitution;
            bounds = calculateBounds(points);
        }
        // Bottom wall
        if (bounds.maxY > canvasHeight - __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_THICKNESS"]) {
            const overlap = bounds.maxY - (canvasHeight - __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_THICKNESS"]);
            points = points.map((p)=>({
                    ...p,
                    y: p.y - overlap
                }));
            velocity.y = -Math.abs(velocity.y) * wallRestitution;
            bounds = calculateBounds(points);
        }
        return {
            ...body,
            points,
            velocity,
            bounds
        };
    });
    // Check collisions between bodies
    return handleBodyCollisions(collisionHandled);
}
function handleBodyCollisions(bodies) {
    const result = [
        ...bodies
    ];
    for(let i = 0; i < result.length; i++){
        for(let j = i + 1; j < result.length; j++){
            const body1 = result[i];
            const body2 = result[j];
            // Skip if both are walls
            if (body1.layerMode === 'wall' && body2.layerMode === 'wall') continue;
            // Check AABB collision
            if (checkAABBCollision(body1.bounds, body2.bounds)) {
                const collision = resolveCollision(body1, body2);
                if (collision) {
                    // Update bodies based on collision
                    if (body1.layerMode === 'object') {
                        result[i] = applyCollisionResponse(result[i], body2, collision);
                    }
                    if (body2.layerMode === 'object') {
                        result[j] = applyCollisionResponse(result[j], body1, {
                            ...collision,
                            normal: {
                                x: -collision.normal.x,
                                y: -collision.normal.y
                            }
                        });
                    }
                }
            }
        }
    }
    return result;
}
function checkAABBCollision(bounds1, bounds2) {
    return bounds1.minX < bounds2.maxX && bounds1.maxX > bounds2.minX && bounds1.minY < bounds2.maxY && bounds1.maxY > bounds2.minY;
}
function resolveCollision(body1, body2) {
    const center1 = getCenter(body1.bounds);
    const center2 = getCenter(body2.bounds);
    const dx = center2.x - center1.x;
    const dy = center2.y - center1.y;
    const overlapX = (body1.bounds.maxX - body1.bounds.minX) / 2 + (body2.bounds.maxX - body2.bounds.minX) / 2 - Math.abs(dx);
    const overlapY = (body1.bounds.maxY - body1.bounds.minY) / 2 + (body2.bounds.maxY - body2.bounds.minY) / 2 - Math.abs(dy);
    if (overlapX <= 0 || overlapY <= 0) return null;
    let normal;
    let overlap;
    if (overlapX < overlapY) {
        normal = {
            x: dx > 0 ? 1 : -1,
            y: 0
        };
        overlap = overlapX;
    } else {
        normal = {
            x: 0,
            y: dy > 0 ? 1 : -1
        };
        overlap = overlapY;
    }
    return {
        body1,
        body2,
        normal,
        overlap
    };
}
function applyCollisionResponse(body, other, collision) {
    // Use the minimum elasticity of the two bodies
    let elasticity = Math.min(body.elasticity, other.elasticity);
    // Slime collisions are more bouncy
    if (body.brushType === 'slime' || other.brushType === 'slime') {
        elasticity = Math.max(elasticity, 0.7);
    }
    // Move body out of collision
    const separation = collision.overlap + 1;
    const newPoints = body.points.map((p)=>({
            x: p.x - collision.normal.x * separation,
            y: p.y - collision.normal.y * separation
        }));
    // Reflect velocity
    const dotProduct = body.velocity.x * collision.normal.x + body.velocity.y * collision.normal.y;
    const newVelocity = {
        x: (body.velocity.x - 2 * dotProduct * collision.normal.x) * elasticity,
        y: (body.velocity.y - 2 * dotProduct * collision.normal.y) * elasticity
    };
    return {
        ...body,
        points: newPoints,
        velocity: newVelocity,
        bounds: calculateBounds(newPoints)
    };
}
function moveStroke(stroke, dx, dy) {
    const newPoints = stroke.points.map((p)=>({
            ...p,
            x: p.x + dx,
            y: p.y + dy
        }));
    return {
        ...stroke,
        points: newPoints,
        bounds: calculateBounds(newPoints)
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/components/Editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Editor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/store/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/i18n.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/types.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$toggle$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/toggle-group.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pen$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/pen.js [app-client] (ecmascript) <export default as Pen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$glass$2d$water$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GlassWater$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/glass-water.js [app-client] (ecmascript) <export default as GlassWater>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/droplets.js [app-client] (ecmascript) <export default as Droplets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/lightbulb.js [app-client] (ecmascript) <export default as Lightbulb>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rotate3D$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/rotate-3d.js [app-client] (ecmascript) <export default as Rotate3D>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/uuid/dist/esm-browser/v4.js [app-client] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$hooks$2f$useDeviceOrientation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/hooks/useDeviceOrientation.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/lib/physics.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function t(language, key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTranslation"])(language, key);
}
const BRUSH_ICONS = {
    pen: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pen$3e$__["Pen"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
        lineNumber: 57,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0)),
    fur: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
        lineNumber: 58,
        columnNumber: 8
    }, ("TURBOPACK compile-time value", void 0)),
    glass: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$glass$2d$water$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GlassWater$3e$__["GlassWater"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
        lineNumber: 59,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0)),
    slime: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
        lineNumber: 60,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0)),
    light: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
        lineNumber: 61,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0))
};
const LAYER_ICONS = {
    background: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
        lineNumber: 65,
        columnNumber: 15
    }, ("TURBOPACK compile-time value", void 0)),
    wall: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
        lineNumber: 66,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0)),
    object: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
        className: "w-4 h-4"
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
        lineNumber: 67,
        columnNumber: 11
    }, ("TURBOPACK compile-time value", void 0))
};
function Editor() {
    _s();
    const { state, dispatch, goToGallery, saveCurrentArtwork } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [isDrawing, setIsDrawing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentStroke, setCurrentStroke] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const animationFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const gravityRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: 0,
        y: 1
    });
    const { currentArtwork, brushSettings, physics, currentLayerMode, is3DEffectEnabled, rotation3D } = state.editor;
    const language = state.language;
    // Device orientation for gravity (mobile)
    const handleGravityChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Editor.useCallback[handleGravityChange]": (gravity)=>{
            gravityRef.current = gravity;
            if (physics.isPlaying) {
                dispatch({
                    type: 'SET_GRAVITY',
                    payload: gravity
                });
            }
            // Also update 3D rotation if enabled
            if (is3DEffectEnabled) {
                dispatch({
                    type: 'SET_3D_ROTATION',
                    payload: {
                        x: gravity.y * 15,
                        y: -gravity.x * 15
                    }
                });
            }
        }
    }["Editor.useCallback[handleGravityChange]"], [
        dispatch,
        physics.isPlaying,
        is3DEffectEnabled
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$hooks$2f$useDeviceOrientation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeviceOrientation"])({
        onGravityChange: handleGravityChange
    });
    // Mouse gravity for PC
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$hooks$2f$useDeviceOrientation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMouseGravity"])(containerRef, handleGravityChange);
    // Physics simulation loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Editor.useEffect": ()=>{
            if (!physics.isPlaying || !currentArtwork) return;
            const simulate = {
                "Editor.useEffect.simulate": (timestamp)=>{
                    const deltaTime = timestamp - lastTimeRef.current;
                    lastTimeRef.current = timestamp;
                    if (deltaTime > 0 && deltaTime < 100) {
                        // Create physics bodies from strokes
                        const bodies = [];
                        for (const stroke of currentArtwork.strokes){
                            const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPhysicsBody"])(stroke);
                            if (body) bodies.push(body);
                        }
                        // Update physics
                        const updatedBodies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePhysics"])(bodies, physics.gravity, currentArtwork.width, currentArtwork.height, deltaTime);
                        // Update strokes from physics bodies
                        const updatedStrokes = currentArtwork.strokes.map({
                            "Editor.useEffect.simulate.updatedStrokes": (stroke)=>{
                                const body = updatedBodies.find({
                                    "Editor.useEffect.simulate.updatedStrokes.body": (b)=>b.strokeId === stroke.id
                                }["Editor.useEffect.simulate.updatedStrokes.body"]);
                                if (body && stroke.layerMode === 'object') {
                                    return {
                                        ...stroke,
                                        points: body.points,
                                        bounds: body.bounds,
                                        velocity: body.velocity
                                    };
                                }
                                return stroke;
                            }
                        }["Editor.useEffect.simulate.updatedStrokes"]);
                        dispatch({
                            type: 'UPDATE_ARTWORK_STROKES',
                            payload: updatedStrokes
                        });
                    }
                    animationFrameRef.current = requestAnimationFrame(simulate);
                }
            }["Editor.useEffect.simulate"];
            lastTimeRef.current = performance.now();
            animationFrameRef.current = requestAnimationFrame(simulate);
            return ({
                "Editor.useEffect": ()=>{
                    if (animationFrameRef.current) {
                        cancelAnimationFrame(animationFrameRef.current);
                    }
                }
            })["Editor.useEffect"];
        }
    }["Editor.useEffect"], [
        physics.isPlaying,
        physics.gravity,
        currentArtwork,
        dispatch
    ]);
    // Render canvas
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Editor.useEffect": ()=>{
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx || !currentArtwork) return;
            renderCanvas(ctx, canvas, currentArtwork, currentStroke, brushSettings, currentLayerMode, gravityRef.current);
        }
    }["Editor.useEffect"], [
        currentArtwork,
        currentStroke,
        brushSettings,
        currentLayerMode,
        physics.isPlaying
    ]);
    // Mouse/Touch event handlers
    const getPointerPosition = (e)=>{
        const canvas = canvasRef.current;
        if (!canvas) return {
            x: 0,
            y: 0
        };
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
            pressure: e.pressure || 0.5
        };
    };
    const handlePointerDown = (e)=>{
        if (physics.isPlaying && currentLayerMode !== 'background') return;
        setIsDrawing(true);
        const point = getPointerPosition(e);
        setCurrentStroke([
            point
        ]);
    };
    const handlePointerMove = (e)=>{
        if (!isDrawing) return;
        const point = getPointerPosition(e);
        setCurrentStroke((prev)=>[
                ...prev,
                point
            ]);
    };
    const handlePointerUp = async ()=>{
        if (!isDrawing || currentStroke.length < 2) {
            setIsDrawing(false);
            setCurrentStroke([]);
            return;
        }
        setIsDrawing(false);
        // Create stroke
        const stroke = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            layerMode: currentLayerMode,
            brushType: brushSettings.type,
            points: currentStroke,
            color: brushSettings.color,
            size: brushSettings.size,
            opacity: brushSettings.opacity,
            furLength: brushSettings.furLength,
            blurLevel: brushSettings.blurLevel,
            elasticity: brushSettings.elasticity,
            lightIntensity: brushSettings.lightIntensity,
            velocity: {
                x: 0,
                y: 0
            }
        };
        dispatch({
            type: 'ADD_STROKE',
            payload: stroke
        });
        setCurrentStroke([]);
        // Auto-save with preview
        await saveWithPreview();
    };
    // Save with preview image generation
    const saveWithPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Editor.useCallback[saveWithPreview]": async ()=>{
            const canvas = canvasRef.current;
            if (!canvas || !currentArtwork) return;
            // Generate preview image
            const previewCanvas = document.createElement('canvas');
            const previewCtx = previewCanvas.getContext('2d');
            if (previewCtx) {
                previewCanvas.width = 320;
                previewCanvas.height = 240;
                previewCtx.drawImage(canvas, 0, 0, 320, 240);
                const previewImage = previewCanvas.toDataURL('image/png');
                // Update artwork with preview
                const updatedArtwork = {
                    ...currentArtwork,
                    previewImage,
                    updatedAt: Date.now()
                };
                dispatch({
                    type: 'UPDATE_ARTWORK',
                    payload: updatedArtwork
                });
            }
            await saveCurrentArtwork();
        }
    }["Editor.useCallback[saveWithPreview]"], [
        currentArtwork,
        dispatch,
        saveCurrentArtwork
    ]);
    const togglePhysics = ()=>{
        dispatch({
            type: 'SET_PHYSICS_PLAYING',
            payload: !physics.isPlaying
        });
    };
    const toggle3DEffect = ()=>{
        dispatch({
            type: 'TOGGLE_3D_EFFECT'
        });
    };
    // Update ambient settings
    const updateAmbientSettings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Editor.useCallback[updateAmbientSettings]": (color, intensity)=>{
            if (!currentArtwork) return;
            const updatedArtwork = {
                ...currentArtwork,
                ambientColor: color,
                ambientIntensity: intensity,
                updatedAt: Date.now()
            };
            dispatch({
                type: 'UPDATE_ARTWORK',
                payload: updatedArtwork
            });
        }
    }["Editor.useCallback[updateAmbientSettings]"], [
        currentArtwork,
        dispatch
    ]);
    // Go back to gallery with save
    const handleGoToGallery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Editor.useCallback[handleGoToGallery]": async ()=>{
            // Save preview image before leaving
            await saveWithPreview();
            goToGallery();
        }
    }["Editor.useCallback[handleGoToGallery]"], [
        saveWithPreview,
        goToGallery
    ]);
    const handleLanguageChange = (lang)=>{
        dispatch({
            type: 'SET_LANGUAGE',
            payload: lang
        });
    };
    if (!currentArtwork) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                lineNumber: 298,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
            lineNumber: 297,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-900 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-gray-800 border-b border-gray-700 px-4 py-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    variant: "ghost",
                                    size: "sm",
                                    onClick: handleGoToGallery,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                            className: "w-4 h-4 mr-2"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 310,
                                            columnNumber: 15
                                        }, this),
                                        t(language, 'backToGallery')
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                    lineNumber: 309,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white font-medium truncate max-w-[200px]",
                                    children: currentArtwork.name
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                    lineNumber: 313,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                            lineNumber: 308,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: physics.isPlaying ? "default" : "outline",
                                                    size: "sm",
                                                    onClick: togglePhysics,
                                                    className: physics.isPlaying ? "bg-green-600 hover:bg-green-700" : "",
                                                    children: [
                                                        physics.isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                            lineNumber: 330,
                                                            columnNumber: 23
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                            lineNumber: 332,
                                                            columnNumber: 23
                                                        }, this),
                                                        physics.isPlaying ? t(language, 'pause') : t(language, 'play')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 323,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 322,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                children: physics.isPlaying ? t(language, 'pause') : t(language, 'play')
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 337,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 321,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                    lineNumber: 320,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: is3DEffectEnabled ? "default" : "outline",
                                                    size: "sm",
                                                    onClick: toggle3DEffect,
                                                    className: is3DEffectEnabled ? "bg-purple-600 hover:bg-purple-700" : "",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rotate3D$3e$__["Rotate3D"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                        lineNumber: 353,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 346,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                children: t(language, 'effect3D')
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 356,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 345,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                    lineNumber: 344,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                            asChild: true,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                variant: "outline",
                                                size: "sm",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 366,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 365,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 364,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                            className: "w-64",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-medium text-sm",
                                                        children: t(language, 'ambientColor')
                                                    }, void 0, false, {
                                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                        lineNumber: 371,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                type: "color",
                                                                value: currentArtwork.ambientColor,
                                                                onChange: (e)=>updateAmbientSettings(e.target.value, currentArtwork.ambientIntensity),
                                                                className: "w-10 h-8 p-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                                lineNumber: 373,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                value: currentArtwork.ambientColor,
                                                                onChange: (e)=>updateAmbientSettings(e.target.value, currentArtwork.ambientIntensity),
                                                                className: "flex-1 h-8"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                                lineNumber: 379,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                                children: [
                                                                    t(language, 'ambientIntensity'),
                                                                    ": ",
                                                                    currentArtwork.ambientIntensity.toFixed(2)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                                lineNumber: 386,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                                value: [
                                                                    currentArtwork.ambientIntensity
                                                                ],
                                                                onValueChange: (v)=>updateAmbientSettings(currentArtwork.ambientColor, v[0]),
                                                                min: 0,
                                                                max: 1,
                                                                step: 0.01
                                                            }, void 0, false, {
                                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                                lineNumber: 387,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 370,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 369,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                    lineNumber: 363,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                    value: language,
                                    onValueChange: (v)=>handleLanguageChange(v),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                            className: "w-[100px] bg-gray-700 border-gray-600",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                    className: "w-4 h-4 mr-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 402,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 403,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 401,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "ja",
                                                    children: "日本語"
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 406,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "zh",
                                                    children: "中文"
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 407,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "ko",
                                                    children: "한국어"
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "en",
                                                    children: "English"
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 405,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                    lineNumber: 400,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                            lineNumber: 318,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                    lineNumber: 307,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                lineNumber: 306,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "w-16 md:w-64 bg-gray-800 border-r border-gray-700 p-2 md:p-4 flex flex-col gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-gray-300 hidden md:block",
                                        children: t(language, 'background')
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 422,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$toggle$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToggleGroup"], {
                                        type: "single",
                                        value: currentLayerMode,
                                        onValueChange: (value)=>{
                                            if (value) dispatch({
                                                type: 'SET_LAYER_MODE',
                                                payload: value
                                            });
                                        },
                                        className: "flex flex-col md:flex-row gap-1",
                                        children: [
                                            'background',
                                            'wall',
                                            'object'
                                        ].map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                            asChild: true,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$toggle$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToggleGroupItem"], {
                                                                value: mode,
                                                                "aria-label": mode,
                                                                className: "w-full md:w-auto data-[state=on]:bg-blue-600",
                                                                children: [
                                                                    LAYER_ICONS[mode],
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "hidden md:inline ml-2",
                                                                        children: t(language, mode)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                                        lineNumber: 441,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                                lineNumber: 435,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                            lineNumber: 434,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                            side: "right",
                                                            children: t(language, `${mode}Tooltip`)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                            lineNumber: 444,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 433,
                                                    columnNumber: 19
                                                }, this)
                                            }, mode, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 432,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 423,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 421,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-gray-300 hidden md:block",
                                        children: t(language, 'pen')
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 455,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$toggle$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToggleGroup"], {
                                        type: "single",
                                        value: brushSettings.type,
                                        onValueChange: (value)=>{
                                            if (value) dispatch({
                                                type: 'SET_BRUSH_SETTINGS',
                                                payload: {
                                                    type: value
                                                }
                                            });
                                        },
                                        className: "flex flex-col md:flex-row gap-1",
                                        children: [
                                            'pen',
                                            'fur',
                                            'glass',
                                            'slime',
                                            'light'
                                        ].map((brush)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                            asChild: true,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$toggle$2d$group$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToggleGroupItem"], {
                                                                value: brush,
                                                                "aria-label": brush,
                                                                className: "w-full md:w-auto data-[state=on]:bg-orange-600",
                                                                children: [
                                                                    BRUSH_ICONS[brush],
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "hidden md:inline ml-2",
                                                                        children: t(language, brush)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                                        lineNumber: 474,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                                lineNumber: 468,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                            lineNumber: 467,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                            side: "right",
                                                            children: t(language, `${brush}Tooltip`)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                            lineNumber: 477,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 466,
                                                    columnNumber: 19
                                                }, this)
                                            }, brush, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 465,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 456,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 454,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 flex-1 overflow-y-auto",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-gray-300 text-xs md:text-sm",
                                                children: t(language, 'color')
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 490,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "color",
                                                        value: brushSettings.color,
                                                        onChange: (e)=>dispatch({
                                                                type: 'SET_BRUSH_SETTINGS',
                                                                payload: {
                                                                    color: e.target.value
                                                                }
                                                            }),
                                                        className: "w-10 h-8 p-1 bg-gray-700 border-gray-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                        lineNumber: 492,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: brushSettings.color,
                                                        onChange: (e)=>dispatch({
                                                                type: 'SET_BRUSH_SETTINGS',
                                                                payload: {
                                                                    color: e.target.value
                                                                }
                                                            }),
                                                        className: "flex-1 h-8 bg-gray-700 border-gray-600 text-white text-xs"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                        lineNumber: 498,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 491,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 489,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-gray-300 text-xs md:text-sm",
                                                children: [
                                                    t(language, 'size'),
                                                    ": ",
                                                    brushSettings.size
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 508,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                value: [
                                                    brushSettings.size
                                                ],
                                                onValueChange: (v)=>dispatch({
                                                        type: 'SET_BRUSH_SETTINGS',
                                                        payload: {
                                                            size: v[0]
                                                        }
                                                    }),
                                                min: 1,
                                                max: 50,
                                                step: 1
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 511,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 507,
                                        columnNumber: 13
                                    }, this),
                                    brushSettings.type === 'pen' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-gray-300 text-xs md:text-sm",
                                                children: [
                                                    t(language, 'opacity'),
                                                    ": ",
                                                    brushSettings.opacity.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 523,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                value: [
                                                    brushSettings.opacity
                                                ],
                                                onValueChange: (v)=>dispatch({
                                                        type: 'SET_BRUSH_SETTINGS',
                                                        payload: {
                                                            opacity: v[0]
                                                        }
                                                    }),
                                                min: 0,
                                                max: 1,
                                                step: 0.01
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 526,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 522,
                                        columnNumber: 15
                                    }, this),
                                    brushSettings.type === 'fur' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-gray-300 text-xs md:text-sm",
                                                children: [
                                                    t(language, 'furLength'),
                                                    ": ",
                                                    brushSettings.furLength
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 539,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                value: [
                                                    brushSettings.furLength
                                                ],
                                                onValueChange: (v)=>dispatch({
                                                        type: 'SET_BRUSH_SETTINGS',
                                                        payload: {
                                                            furLength: v[0]
                                                        }
                                                    }),
                                                min: 5,
                                                max: 50,
                                                step: 1
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 542,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 538,
                                        columnNumber: 15
                                    }, this),
                                    brushSettings.type === 'glass' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-gray-300 text-xs md:text-sm",
                                                children: [
                                                    t(language, 'blurLevel'),
                                                    ": ",
                                                    brushSettings.blurLevel
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 555,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                value: [
                                                    brushSettings.blurLevel
                                                ],
                                                onValueChange: (v)=>dispatch({
                                                        type: 'SET_BRUSH_SETTINGS',
                                                        payload: {
                                                            blurLevel: v[0]
                                                        }
                                                    }),
                                                min: 1,
                                                max: 20,
                                                step: 1
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 558,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 554,
                                        columnNumber: 15
                                    }, this),
                                    brushSettings.type === 'slime' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-gray-300 text-xs md:text-sm",
                                                children: [
                                                    t(language, 'elasticity'),
                                                    ": ",
                                                    brushSettings.elasticity.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 571,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                value: [
                                                    brushSettings.elasticity
                                                ],
                                                onValueChange: (v)=>dispatch({
                                                        type: 'SET_BRUSH_SETTINGS',
                                                        payload: {
                                                            elasticity: v[0]
                                                        }
                                                    }),
                                                min: 0,
                                                max: 1,
                                                step: 0.01
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 574,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 570,
                                        columnNumber: 15
                                    }, this),
                                    brushSettings.type === 'light' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-gray-300 text-xs md:text-sm",
                                                children: [
                                                    t(language, 'lightIntensity'),
                                                    ": ",
                                                    brushSettings.lightIntensity.toFixed(2)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 587,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                                value: [
                                                    brushSettings.lightIntensity
                                                ],
                                                onValueChange: (v)=>dispatch({
                                                        type: 'SET_BRUSH_SETTINGS',
                                                        payload: {
                                                            lightIntensity: v[0]
                                                        }
                                                    }),
                                                min: 0.1,
                                                max: 1,
                                                step: 0.01
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 590,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 586,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 487,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        ref: containerRef,
                        className: "flex-1 flex items-center justify-center p-4 overflow-hidden",
                        style: {
                            perspective: is3DEffectEnabled ? '1000px' : 'none'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                transform: is3DEffectEnabled ? `rotateX(${rotation3D.x}deg) rotateY(${rotation3D.y}deg)` : 'none',
                                transformStyle: 'preserve-3d',
                                transition: 'transform 0.1s ease-out'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                                ref: canvasRef,
                                width: currentArtwork.width,
                                height: currentArtwork.height,
                                className: "bg-white shadow-2xl rounded-lg touch-none cursor-crosshair",
                                style: {
                                    maxWidth: '100%',
                                    maxHeight: 'calc(100vh - 200px)',
                                    width: 'auto',
                                    height: 'auto',
                                    objectFit: 'contain'
                                },
                                onPointerDown: handlePointerDown,
                                onPointerMove: handlePointerMove,
                                onPointerUp: handlePointerUp,
                                onPointerLeave: handlePointerUp
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 619,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                            lineNumber: 610,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                        lineNumber: 603,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                lineNumber: 417,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
        lineNumber: 304,
        columnNumber: 5
    }, this);
}
_s(Editor, "nGhyRZvoodoGnswENxkJVcgFjlw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$hooks$2f$useDeviceOrientation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeviceOrientation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$hooks$2f$useDeviceOrientation$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMouseGravity"]
    ];
});
_c = Editor;
// Render canvas function
function renderCanvas(ctx, canvas, artwork, currentStroke, brushSettings, currentLayerMode, gravity) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw background color
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw ambient light overlay
    const ambientR = parseInt(artwork.ambientColor.slice(1, 3), 16);
    const ambientG = parseInt(artwork.ambientColor.slice(3, 5), 16);
    const ambientB = parseInt(artwork.ambientColor.slice(5, 7), 16);
    ctx.fillStyle = `rgba(${ambientR}, ${ambientG}, ${ambientB}, ${artwork.ambientIntensity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw wall borders (transparent, just for visual reference)
    ctx.strokeStyle = 'rgba(200, 200, 200, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([
        5,
        5
    ]);
    ctx.strokeRect(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_THICKNESS"], __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_THICKNESS"], canvas.width - __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_THICKNESS"] * 2, canvas.height - __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WALL_THICKNESS"] * 2);
    ctx.setLineDash([]);
    // Draw strokes by layer mode order
    const layers = [
        'background',
        'wall',
        'object'
    ];
    for (const layer of layers){
        const layerStrokes = artwork.strokes.filter((s)=>s.layerMode === layer);
        for (const stroke of layerStrokes){
            drawStroke(ctx, stroke, gravity);
        }
    }
    // Draw current stroke
    if (currentStroke.length > 0) {
        drawCurrentStroke(ctx, currentStroke, brushSettings, currentLayerMode);
    }
    // Draw light effects (after all other strokes)
    const lightStrokes = artwork.strokes.filter((s)=>s.brushType === 'light');
    for (const stroke of lightStrokes){
        applyLightEffect(ctx, stroke, artwork.strokes);
    }
}
// Drawing functions
function drawStroke(ctx, stroke, gravity) {
    if (stroke.points.length < 2) return;
    ctx.save();
    ctx.globalAlpha = stroke.opacity;
    switch(stroke.brushType){
        case 'pen':
            drawPenStroke(ctx, stroke);
            break;
        case 'fur':
            drawFurStroke(ctx, stroke, gravity);
            break;
        case 'glass':
            drawGlassStroke(ctx, stroke);
            break;
        case 'slime':
            drawSlimeStroke(ctx, stroke);
            break;
        case 'light':
            drawLightStroke(ctx, stroke);
            break;
    }
    ctx.restore();
}
function drawCurrentStroke(ctx, points, settings, _layerMode) {
    if (points.length < 2) return;
    ctx.save();
    ctx.globalAlpha = settings.opacity;
    // Simple preview stroke
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for(let i = 1; i < points.length; i++){
        const midX = (points[i - 1].x + points[i].x) / 2;
        const midY = (points[i - 1].y + points[i].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, midX, midY);
    }
    ctx.strokeStyle = settings.color;
    ctx.lineWidth = settings.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.restore();
}
function drawPenStroke(ctx, stroke) {
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for(let i = 1; i < stroke.points.length; i++){
        const midX = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
        const midY = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
        ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, midX, midY);
    }
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
}
function drawFurStroke(ctx, stroke, gravity) {
    const furLength = stroke.furLength || 20;
    // Draw main stroke
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for(let i = 1; i < stroke.points.length; i++){
        const midX = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
        const midY = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
        ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, midX, midY);
    }
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    // Draw fur strands - affected by gravity
    for(let i = 0; i < stroke.points.length; i += 3){
        const point = stroke.points[i];
        const prevPoint = stroke.points[Math.max(0, i - 1)];
        const nextPoint = stroke.points[Math.min(stroke.points.length - 1, i + 1)];
        // Calculate tangent direction
        const dx = nextPoint.x - prevPoint.x;
        const dy = nextPoint.y - prevPoint.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        // Normal direction (perpendicular)
        const nx = -dy / len;
        const ny = dx / len;
        // Draw strands on both sides, influenced by gravity
        for(let side = -1; side <= 1; side += 2){
            const strandLen = furLength * (0.5 + Math.random() * 0.5);
            // Base position at perpendicular direction
            let endX = point.x + nx * strandLen * side;
            let endY = point.y + ny * strandLen * side;
            // Apply gravity influence (fur hangs down based on gravity)
            endX += gravity.x * furLength * 0.5;
            endY += gravity.y * furLength * 0.8;
            // Control point for curve
            const ctrlX = point.x + nx * strandLen * 0.5 * side + gravity.x * furLength * 0.3;
            const ctrlY = point.y + ny * strandLen * 0.5 * side + gravity.y * furLength * 0.5;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = Math.max(1, stroke.size * 0.3);
            ctx.globalAlpha = stroke.opacity * 0.7;
            ctx.lineCap = 'round';
            ctx.stroke();
        }
    }
}
function drawGlassStroke(ctx, stroke) {
    const blurLevel = stroke.blurLevel || 5;
    // Draw blurred stroke (refraction effect)
    ctx.save();
    ctx.filter = `blur(${blurLevel}px)`;
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for(let i = 1; i < stroke.points.length; i++){
        const midX = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
        const midY = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
        ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, midX, midY);
    }
    ctx.strokeStyle = stroke.color;
    ctx.lineWidth = stroke.size;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 0.6;
    ctx.stroke();
    ctx.restore();
    // Add bright highlight on edges (glass reflection)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for(let i = 1; i < stroke.points.length; i++){
        const midX = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
        const midY = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
        ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, midX, midY);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = stroke.size * 0.4;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
    // Add outer glow
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
    for(let i = 1; i < stroke.points.length; i++){
        const midX = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
        const midY = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
        ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, midX, midY);
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = stroke.size * 1.5;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.restore();
}
function drawSlimeStroke(ctx, stroke) {
    // Calculate bounds for gradient
    const bounds = stroke.bounds || calculateStrokeBounds(stroke.points);
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    const radius = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY) / 2 || stroke.size * 2;
    // Draw main blob with gradient for slimy effect
    ctx.beginPath();
    if (stroke.points.length === 2) {
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.size, 0, Math.PI * 2);
    } else {
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for(let i = 1; i < stroke.points.length; i++){
            const midX = (stroke.points[i - 1].x + stroke.points[i].x) / 2;
            const midY = (stroke.points[i - 1].y + stroke.points[i].y) / 2;
            ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, midX, midY);
        }
    }
    // Fill with gradient
    const gradient = ctx.createRadialGradient(centerX - radius * 0.3, centerY - radius * 0.3, 0, centerX, centerY, radius);
    gradient.addColorStop(0, lightenColor(stroke.color, 60));
    gradient.addColorStop(0.3, lightenColor(stroke.color, 30));
    gradient.addColorStop(0.6, stroke.color);
    gradient.addColorStop(1, darkenColor(stroke.color, 40));
    ctx.fillStyle = gradient;
    ctx.fill();
    // Add glossy highlight
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.25, centerY - radius * 0.25, radius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fill();
    // Add border
    ctx.strokeStyle = darkenColor(stroke.color, 30);
    ctx.lineWidth = 2;
    ctx.stroke();
}
function drawLightStroke(ctx, stroke) {
    const intensity = stroke.lightIntensity || 0.5;
    // Draw glow for each point
    for (const point of stroke.points){
        const radius = stroke.size * 4;
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, radius);
        gradient.addColorStop(0, lightenColor(stroke.color, 100));
        gradient.addColorStop(0.2, stroke.color);
        gradient.addColorStop(0.5, `${stroke.color}80`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = intensity;
        ctx.beginPath();
        ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        ctx.fill();
        // Core bright center
        ctx.beginPath();
        ctx.arc(point.x, point.y, stroke.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = intensity;
        ctx.fill();
    }
}
function applyLightEffect(ctx, lightStroke, allStrokes) {
    const intensity = lightStroke.lightIntensity || 0.5;
    // For each light source, illuminate nearby objects
    for (const lightPoint of lightStroke.points){
        const lightRadius = lightStroke.size * 8;
        // Find strokes near this light
        for (const stroke of allStrokes){
            if (stroke.id === lightStroke.id) continue;
            if (stroke.brushType === 'light') continue;
            for (const point of stroke.points){
                const dx = point.x - lightPoint.x;
                const dy = point.y - lightPoint.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < lightRadius) {
                    // Add subtle illumination
                    const illumination = (1 - dist / lightRadius) * intensity * 0.3;
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, stroke.size * 1.5, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 200, ${illumination})`;
                    ctx.fill();
                }
            }
        }
    }
}
// Utility functions
function calculateStrokeBounds(points) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const point of points){
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
    }
    return {
        minX,
        maxX,
        minY,
        maxY
    };
}
function lightenColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.min(255, parseInt(hex.slice(0, 2), 16) + amount);
    const g = Math.min(255, parseInt(hex.slice(2, 4), 16) + amount);
    const b = Math.min(255, parseInt(hex.slice(4, 6), 16) + amount);
    return `rgb(${r}, ${g}, ${b})`;
}
function darkenColor(color, amount) {
    const hex = color.replace('#', '');
    const r = Math.max(0, parseInt(hex.slice(0, 2), 16) - amount);
    const g = Math.max(0, parseInt(hex.slice(2, 4), 16) - amount);
    const b = Math.max(0, parseInt(hex.slice(4, 6), 16) - amount);
    return `rgb(${r}, ${g}, ${b})`;
}
var _c;
__turbopack_context__.k.register(_c, "Editor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Mulu-Canvas/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/store/AppContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$Gallery$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/Gallery.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$Editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/Editor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Mulu-Canvas/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function AppContent() {
    _s();
    const { state } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            state.currentView === 'gallery' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$Gallery$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/app/page.tsx",
                lineNumber: 13,
                columnNumber: 43
            }, this),
            state.currentView === 'editor' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$Editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/app/page.tsx",
                lineNumber: 14,
                columnNumber: 42
            }, this)
        ]
    }, void 0, true);
}
_s(AppContent, "4T9imRGE2C10qdYg9OIaug00+PA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useApp"]
    ];
});
_c = AppContent;
function Home() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$store$2f$AppContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AppContent, {}, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/app/page.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/app/page.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/app/page.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c1 = Home;
var _c, _c1;
__turbopack_context__.k.register(_c, "AppContent");
__turbopack_context__.k.register(_c1, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Mulu-Canvas_src_3278c6c4._.js.map