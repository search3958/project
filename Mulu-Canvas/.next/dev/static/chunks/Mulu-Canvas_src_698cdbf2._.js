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
    backgroundColor: '#ffffff',
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
        backgroundColor: '背景色',
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
        backgroundColor: '背景颜色',
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
        backgroundColor: '배경색',
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
        backgroundColor: 'Background Color',
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
        "AppProvider.useCallback[createArtwork]": async (name, width, height, backgroundColor, ambientColor, ambientIntensity)=>{
            const artwork = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$uuid$2f$dist$2f$esm$2d$browser$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                name: name || `Artwork ${state.artworks.length + 1}`,
                width,
                height,
                backgroundColor,
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
        lineNumber: 304,
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
    const [backgroundColor, setBackgroundColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('#ffffff');
    const [ambientColor, setAmbientColor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('#ffffff');
    const [ambientIntensity, setAmbientIntensity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0.3);
    const handleCreate = ()=>{
        onCreate(name, width, height, backgroundColor, ambientColor, ambientIntensity);
        setName('');
        setWidth(800);
        setHeight(600);
        setBackgroundColor('#ffffff');
        setAmbientColor('#ffffff');
        setAmbientIntensity(0.3);
        onOpenChange(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "sm:max-w-md bg-white",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                        children: t(state.language, 'newArtworkTitle')
                    }, void 0, false, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 72,
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
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "name",
                                    value: name,
                                    onChange: (e)=>setName(e.target.value),
                                    placeholder: `Artwork ${new Date().toLocaleDateString()}`,
                                    className: "bg-white"
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 76,
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
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "width",
                                            type: "number",
                                            value: width,
                                            onChange: (e)=>setWidth(parseInt(e.target.value) || 800),
                                            min: 100,
                                            max: 2000,
                                            className: "bg-white"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 87,
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
                                            lineNumber: 100,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "height",
                                            type: "number",
                                            value: height,
                                            onChange: (e)=>setHeight(parseInt(e.target.value) || 600),
                                            min: 100,
                                            max: 2000,
                                            className: "bg-white"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "backgroundColor",
                                    children: t(state.language, 'backgroundColor')
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 113,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "backgroundColor",
                                            type: "color",
                                            value: backgroundColor,
                                            onChange: (e)=>setBackgroundColor(e.target.value),
                                            className: "w-12 h-10 p-1 bg-white"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 115,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: backgroundColor,
                                            onChange: (e)=>setBackgroundColor(e.target.value),
                                            className: "flex-1 bg-white"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 122,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 112,
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
                                    lineNumber: 130,
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
                                            className: "w-12 h-10 p-1 bg-white"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            value: ambientColor,
                                            onChange: (e)=>setAmbientColor(e.target.value),
                                            className: "flex-1 bg-white"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                            lineNumber: 139,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 129,
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
                                    lineNumber: 147,
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
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 75,
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
                            lineNumber: 158,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleCreate,
                            children: t(state.language, 'create')
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 161,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 157,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
            lineNumber: 71,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(NewArtworkDialog, "XJNsqZxREV4VfSdkV3z8UhQukCc=", false, function() {
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
                className: "group cursor-pointer hover:shadow-lg transition-shadow bg-white",
                onClick: onOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                        className: "p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "text-base truncate",
                            children: artwork.name
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                        className: "p-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "aspect-video relative overflow-hidden",
                            style: {
                                backgroundColor: artwork.backgroundColor || '#ffffff'
                            },
                            children: artwork.previewImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: artwork.previewImage,
                                alt: artwork.name,
                                className: "w-full h-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 199,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full h-full flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                                    className: "w-12 h-12 text-gray-300"
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 206,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 205,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 191,
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
                                lineNumber: 212,
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
                                            lineNumber: 223,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                        lineNumber: 214,
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
                                            lineNumber: 234,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialog"], {
                open: showDeleteConfirm,
                onOpenChange: setShowDeleteConfirm,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                    className: "bg-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                    children: t(state.language, 'confirm')
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 243,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                                    children: t(state.language, 'deleteConfirm')
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 244,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 242,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                    children: t(state.language, 'cancel')
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 249,
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
                                    lineNumber: 250,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 248,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 241,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                lineNumber: 240,
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
    const handleCreate = async (name, width, height, backgroundColor, ambientColor, ambientIntensity)=>{
        const artwork = await createArtwork(name, width, height, backgroundColor, ambientColor, ambientIntensity);
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
        className: "min-h-screen bg-gradient-to-br from-gray-50 to-gray-100",
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
                            lineNumber: 300,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                value: state.language,
                                onValueChange: (v)=>handleLanguageChange(v),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                        className: "w-[140px] bg-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                                className: "w-4 h-4 mr-2"
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                                lineNumber: 306,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                                lineNumber: 307,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                        lineNumber: 305,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                        className: "bg-white",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "ja",
                                                children: "日本語"
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                                lineNumber: 310,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "zh",
                                                children: "中文"
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                                lineNumber: 311,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "ko",
                                                children: "한국어"
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                                lineNumber: 312,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                value: "en",
                                                children: "English"
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                                lineNumber: 313,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                        lineNumber: 309,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 303,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 299,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                lineNumber: 298,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 py-4 flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: ()=>setShowNewDialog(true),
                        className: "bg-black hover:bg-gray-800",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, this),
                            t(state.language, 'newArtwork')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 322,
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
                        lineNumber: 326,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        onClick: ()=>fileInputRef.current?.click(),
                        className: "bg-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                className: "w-4 h-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                lineNumber: 338,
                                columnNumber: 11
                            }, this),
                            t(state.language, 'import')
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                lineNumber: 321,
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
                            lineNumber: 347,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-500 text-lg",
                            children: t(state.language, 'noArtworks')
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 348,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-400 mt-2",
                            children: t(state.language, 'createFirst')
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 349,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            className: "mt-4 bg-black hover:bg-gray-800",
                            onClick: ()=>setShowNewDialog(true),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-4 h-4 mr-2"
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                                    lineNumber: 351,
                                    columnNumber: 15
                                }, this),
                                t(state.language, 'newArtwork')
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                            lineNumber: 350,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 346,
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
                            lineNumber: 360,
                            columnNumber: 17
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                    lineNumber: 356,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                lineNumber: 344,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NewArtworkDialog, {
                open: showNewDialog,
                onOpenChange: setShowNewDialog,
                onCreate: handleCreate
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
                lineNumber: 372,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Mulu-Canvas/src/components/Gallery.tsx",
        lineNumber: 296,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/Mulu-Canvas/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
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
function t(language, key) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$i18n$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getTranslation"])(language, key);
}
const BRUSH_CONFIG = {
    pen: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pen$3e$__["Pen"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
            lineNumber: 55,
            columnNumber: 16
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'pen'
    },
    fur: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
            lineNumber: 56,
            columnNumber: 16
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'fur'
    },
    glass: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$glass$2d$water$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GlassWater$3e$__["GlassWater"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
            lineNumber: 57,
            columnNumber: 18
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'glass'
    },
    slime: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
            lineNumber: 58,
            columnNumber: 18
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'slime'
    },
    light: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lightbulb$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lightbulb$3e$__["Lightbulb"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
            lineNumber: 59,
            columnNumber: 18
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'light'
    }
};
const LAYER_CONFIG = {
    background: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
            lineNumber: 63,
            columnNumber: 23
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'background'
    },
    wall: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
            lineNumber: 64,
            columnNumber: 17
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'wall'
    },
    object: {
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
            className: "w-5 h-5"
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
            lineNumber: 65,
            columnNumber: 19
        }, ("TURBOPACK compile-time value", void 0)),
        label: 'object'
    }
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
    // Track if we need to save
    const needsSaveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
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
                        const bodies = [];
                        for (const stroke of currentArtwork.strokes){
                            const body = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPhysicsBody"])(stroke);
                            if (body) bodies.push(body);
                        }
                        const updatedBodies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$lib$2f$physics$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updatePhysics"])(bodies, physics.gravity, currentArtwork.width, currentArtwork.height, deltaTime);
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
                        needsSaveRef.current = true;
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
    // Render canvas - use a ref to track artwork for rendering
    const artworkRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const currentStrokeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Editor.useEffect": ()=>{
            artworkRef.current = currentArtwork;
        }
    }["Editor.useEffect"], [
        currentArtwork
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Editor.useEffect": ()=>{
            currentStrokeRef.current = currentStroke;
        }
    }["Editor.useEffect"], [
        currentStroke
    ]);
    // Main render loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Editor.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            const render = {
                "Editor.useEffect.render": ()=>{
                    if (!artworkRef.current) return;
                    renderCanvas(ctx, canvas, artworkRef.current, currentStrokeRef.current, brushSettings, currentLayerMode, gravityRef.current);
                }
            }["Editor.useEffect.render"];
            render();
            // Animation loop for continuous rendering when physics is playing
            let frameId;
            const animate = {
                "Editor.useEffect.animate": ()=>{
                    render();
                    frameId = requestAnimationFrame(animate);
                }
            }["Editor.useEffect.animate"];
            if (physics.isPlaying) {
                frameId = requestAnimationFrame(animate);
            } else {
                render();
            }
            return ({
                "Editor.useEffect": ()=>{
                    if (frameId) {
                        cancelAnimationFrame(frameId);
                    }
                }
            })["Editor.useEffect"];
        }
    }["Editor.useEffect"], [
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
        // Generate preview and save
        setTimeout(()=>{
            saveWithPreview();
        }, 50);
    };
    const saveWithPreview = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Editor.useCallback[saveWithPreview]": async ()=>{
            const canvas = canvasRef.current;
            if (!canvas || !currentArtwork) return;
            const previewCanvas = document.createElement('canvas');
            const previewCtx = previewCanvas.getContext('2d');
            if (previewCtx) {
                previewCanvas.width = 320;
                previewCanvas.height = 240;
                previewCtx.drawImage(canvas, 0, 0, 320, 240);
                const previewImage = previewCanvas.toDataURL('image/png');
                const updatedArtwork = {
                    ...currentArtwork,
                    previewImage,
                    updatedAt: Date.now()
                };
                dispatch({
                    type: 'UPDATE_ARTWORK',
                    payload: updatedArtwork
                });
                await saveCurrentArtwork();
            }
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
    const updateBackgroundColor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Editor.useCallback[updateBackgroundColor]": (color)=>{
            if (!currentArtwork) return;
            const updatedArtwork = {
                ...currentArtwork,
                backgroundColor: color,
                updatedAt: Date.now()
            };
            dispatch({
                type: 'UPDATE_ARTWORK',
                payload: updatedArtwork
            });
        }
    }["Editor.useCallback[updateBackgroundColor]"], [
        currentArtwork,
        dispatch
    ]);
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
    const handleGoToGallery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Editor.useCallback[handleGoToGallery]": async ()=>{
            await saveWithPreview();
            goToGallery();
        }
    }["Editor.useCallback[handleGoToGallery]"], [
        saveWithPreview,
        goToGallery
    ]);
    if (!currentArtwork) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-white",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-gray-500",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                lineNumber: 343,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
            lineNumber: 342,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "ghost",
                                size: "sm",
                                onClick: handleGoToGallery,
                                className: "text-gray-600 hover:text-gray-900",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 354,
                                        columnNumber: 13
                                    }, this),
                                    t(language, 'backToGallery')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-gray-800 font-medium truncate max-w-[200px]",
                                children: currentArtwork.name
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 357,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: physics.isPlaying ? "default" : "outline",
                                size: "sm",
                                onClick: togglePhysics,
                                className: physics.isPlaying ? "bg-green-500 hover:bg-green-600 text-white" : "border-gray-300 text-gray-700 hover:bg-gray-100",
                                children: physics.isPlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {
                                            className: "w-4 h-4 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 375,
                                            columnNumber: 17
                                        }, this),
                                        t(language, 'pause')
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                            className: "w-4 h-4 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 380,
                                            columnNumber: 17
                                        }, this),
                                        t(language, 'play')
                                    ]
                                }, void 0, true)
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 364,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: is3DEffectEnabled ? "default" : "outline",
                                size: "sm",
                                onClick: toggle3DEffect,
                                className: is3DEffectEnabled ? "bg-purple-500 hover:bg-purple-600 text-white" : "border-gray-300 text-gray-700 hover:bg-gray-100",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$3d$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rotate3D$3e$__["Rotate3D"], {
                                    className: "w-4 h-4"
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                    lineNumber: 396,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 387,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            className: "border-gray-300 text-gray-700 hover:bg-gray-100",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 403,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 402,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 401,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                        className: "w-48 bg-white",
                                        align: "end",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-gray-700",
                                                    children: t(language, 'backgroundColor')
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 408,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "color",
                                                            value: currentArtwork.backgroundColor || '#ffffff',
                                                            onChange: (e)=>updateBackgroundColor(e.target.value),
                                                            className: "w-10 h-8 p-1 bg-white border-gray-300"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                            lineNumber: 410,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            value: currentArtwork.backgroundColor || '#ffffff',
                                                            onChange: (e)=>updateBackgroundColor(e.target.value),
                                                            className: "flex-1 h-8 text-xs bg-white border-gray-300"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                            lineNumber: 416,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 409,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 407,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 406,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 400,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            className: "border-gray-300 text-gray-700 hover:bg-gray-100",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                lineNumber: 430,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 429,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 428,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                        className: "w-56 bg-white",
                                        align: "end",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-sm font-medium text-gray-700",
                                                    children: t(language, 'ambientColor')
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 435,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            type: "color",
                                                            value: currentArtwork.ambientColor,
                                                            onChange: (e)=>updateAmbientSettings(e.target.value, currentArtwork.ambientIntensity),
                                                            className: "w-10 h-8 p-1 bg-white border-gray-300"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                            lineNumber: 437,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                            value: currentArtwork.ambientColor,
                                                            onChange: (e)=>updateAmbientSettings(e.target.value, currentArtwork.ambientIntensity),
                                                            className: "flex-1 h-8 text-xs bg-white border-gray-300"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                            lineNumber: 443,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 436,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                            className: "text-xs text-gray-500",
                                                            children: [
                                                                t(language, 'ambientIntensity'),
                                                                ": ",
                                                                currentArtwork.ambientIntensity.toFixed(2)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                            lineNumber: 450,
                                                            columnNumber: 19
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
                                                            lineNumber: 453,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 449,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 434,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 433,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 427,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                        lineNumber: 362,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                lineNumber: 351,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "w-16 bg-gray-50 border-r border-gray-200 p-2 flex flex-col items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-[10px] text-gray-500 uppercase tracking-wide",
                                children: t(language, 'size')
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 471,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 flex flex-col items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center",
                                    style: {
                                        width: `${Math.min(32, Math.max(8, brushSettings.size))}px`,
                                        height: `${Math.min(32, Math.max(8, brushSettings.size))}px`,
                                        backgroundColor: brushSettings.color
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                    lineNumber: 473,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 472,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                orientation: "vertical",
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
                                step: 1,
                                className: "h-32"
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 482,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-gray-600 font-medium",
                                children: brushSettings.size
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 491,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                        lineNumber: 470,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        ref: containerRef,
                        className: "flex-1 flex items-center justify-center p-4 bg-gray-100 overflow-hidden",
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
                                className: "shadow-xl rounded-lg touch-none cursor-crosshair",
                                style: {
                                    maxWidth: '100%',
                                    maxHeight: 'calc(100vh - 220px)',
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
                                lineNumber: 511,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                            lineNumber: 502,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                        lineNumber: 495,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "w-20 bg-gray-50 border-l border-gray-200 p-2 flex flex-col items-center gap-1 overflow-y-auto",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                className: "text-[10px] text-gray-500 uppercase tracking-wide mb-1",
                                children: [
                                    brushSettings.type === 'pen' && t(language, 'opacity'),
                                    brushSettings.type === 'fur' && t(language, 'furLength'),
                                    brushSettings.type === 'glass' && t(language, 'blurLevel'),
                                    brushSettings.type === 'slime' && t(language, 'elasticity'),
                                    brushSettings.type === 'light' && t(language, 'lightIntensity')
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 533,
                                columnNumber: 11
                            }, this),
                            brushSettings.type === 'pen' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                        orientation: "vertical",
                                        value: [
                                            brushSettings.opacity
                                        ],
                                        onValueChange: (v)=>dispatch({
                                                type: 'SET_BRUSH_SETTINGS',
                                                payload: {
                                                    opacity: v[0]
                                                }
                                            }),
                                        min: 0.1,
                                        max: 1,
                                        step: 0.05,
                                        className: "h-24"
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 544,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-600",
                                        children: [
                                            Math.round(brushSettings.opacity * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 553,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            brushSettings.type === 'fur' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                        orientation: "vertical",
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
                                        step: 1,
                                        className: "h-24"
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 560,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-600",
                                        children: [
                                            brushSettings.furLength,
                                            "px"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 569,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            brushSettings.type === 'glass' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                        orientation: "vertical",
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
                                        step: 1,
                                        className: "h-24"
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 576,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-600",
                                        children: brushSettings.blurLevel
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 585,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            brushSettings.type === 'slime' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                        orientation: "vertical",
                                        value: [
                                            brushSettings.elasticity
                                        ],
                                        onValueChange: (v)=>dispatch({
                                                type: 'SET_BRUSH_SETTINGS',
                                                payload: {
                                                    elasticity: v[0]
                                                }
                                            }),
                                        min: 0.1,
                                        max: 1,
                                        step: 0.05,
                                        className: "h-24"
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 592,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-600",
                                        children: [
                                            Math.round(brushSettings.elasticity * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 601,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            brushSettings.type === 'light' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                        orientation: "vertical",
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
                                        step: 0.05,
                                        className: "h-24"
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 608,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-gray-600",
                                        children: [
                                            Math.round(brushSettings.lightIntensity * 100),
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 617,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-auto pt-2 border-t border-gray-200 w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-[10px] text-gray-500 uppercase tracking-wide",
                                        children: t(language, 'color')
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 622,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                        type: "color",
                                        value: brushSettings.color,
                                        onChange: (e)=>dispatch({
                                                type: 'SET_BRUSH_SETTINGS',
                                                payload: {
                                                    color: e.target.value
                                                }
                                            }),
                                        className: "w-full h-8 p-1 mt-1 bg-white border-gray-300"
                                    }, void 0, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 623,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 621,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                        lineNumber: 532,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-xl shadow-lg border border-gray-200 p-1 flex gap-1",
                                children: [
                                    'background',
                                    'wall',
                                    'object'
                                ].map((mode)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>dispatch({
                                                                type: 'SET_LAYER_MODE',
                                                                payload: mode
                                                            }),
                                                        className: `
                        flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                        ${currentLayerMode === mode ? 'bg-black text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}
                      `,
                                                        children: [
                                                            LAYER_CONFIG[mode].icon,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium",
                                                                children: t(language, LAYER_CONFIG[mode].label)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                                lineNumber: 651,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                        lineNumber: 640,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 639,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    children: t(language, `${mode}Tooltip`)
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 654,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 638,
                                            columnNumber: 17
                                        }, this)
                                    }, mode, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 637,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 635,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-xl shadow-lg border border-gray-200 p-1 flex gap-1",
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
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>dispatch({
                                                                type: 'SET_BRUSH_SETTINGS',
                                                                payload: {
                                                                    type: brush
                                                                }
                                                            }),
                                                        className: `
                        flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                        ${brushSettings.type === brush ? 'bg-orange-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}
                      `,
                                                        children: [
                                                            BRUSH_CONFIG[brush].icon,
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium",
                                                                children: t(language, BRUSH_CONFIG[brush].label)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                                lineNumber: 679,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                        lineNumber: 668,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 667,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Mulu$2d$Canvas$2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    children: t(language, `${brush}Tooltip`)
                                                }, void 0, false, {
                                                    fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                                    lineNumber: 682,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                            lineNumber: 666,
                                            columnNumber: 17
                                        }, this)
                                    }, brush, false, {
                                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                        lineNumber: 665,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                                lineNumber: 663,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                        lineNumber: 633,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
                lineNumber: 468,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Mulu-Canvas/src/components/Editor.tsx",
        lineNumber: 349,
        columnNumber: 5
    }, this);
}
_s(Editor, "+38uqXFAUnIkCh3n/KV+oKclmSI=", false, function() {
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
    ctx.fillStyle = artwork.backgroundColor || '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw ambient light overlay
    const ambientR = parseInt(artwork.ambientColor.slice(1, 3), 16);
    const ambientG = parseInt(artwork.ambientColor.slice(3, 5), 16);
    const ambientB = parseInt(artwork.ambientColor.slice(5, 7), 16);
    ctx.fillStyle = `rgba(${ambientR}, ${ambientG}, ${ambientB}, ${artwork.ambientIntensity})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw wall borders (dashed line)
    ctx.strokeStyle = 'rgba(180, 180, 180, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([
        8,
        4
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
    if (currentStroke.length > 1) {
        drawCurrentStroke(ctx, currentStroke, brushSettings, currentLayerMode);
    }
    // Draw light effects
    const lightStrokes = artwork.strokes.filter((s)=>s.brushType === 'light');
    for (const stroke of lightStrokes){
        applyLightEffect(ctx, stroke, artwork.strokes);
    }
}
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
    // Draw fur strands
    for(let i = 0; i < stroke.points.length; i += 3){
        const point = stroke.points[i];
        const prevPoint = stroke.points[Math.max(0, i - 1)];
        const nextPoint = stroke.points[Math.min(stroke.points.length - 1, i + 1)];
        const dx = nextPoint.x - prevPoint.x;
        const dy = nextPoint.y - prevPoint.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        for(let side = -1; side <= 1; side += 2){
            const strandLen = furLength * (0.5 + Math.random() * 0.5);
            let endX = point.x + nx * strandLen * side;
            let endY = point.y + ny * strandLen * side;
            endX += gravity.x * furLength * 0.5;
            endY += gravity.y * furLength * 0.8;
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
    // Highlight
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
    // Outer glow
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
    const bounds = stroke.bounds || calculateStrokeBounds(stroke.points);
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    const radius = Math.max(bounds.maxX - bounds.minX, bounds.maxY - bounds.minY) / 2 || stroke.size * 2;
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
    const gradient = ctx.createRadialGradient(centerX - radius * 0.3, centerY - radius * 0.3, 0, centerX, centerY, radius);
    gradient.addColorStop(0, lightenColor(stroke.color, 60));
    gradient.addColorStop(0.3, lightenColor(stroke.color, 30));
    gradient.addColorStop(0.6, stroke.color);
    gradient.addColorStop(1, darkenColor(stroke.color, 40));
    ctx.fillStyle = gradient;
    ctx.fill();
    // Glossy highlight
    ctx.beginPath();
    ctx.arc(centerX - radius * 0.25, centerY - radius * 0.25, radius * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.fill();
    ctx.strokeStyle = darkenColor(stroke.color, 30);
    ctx.lineWidth = 2;
    ctx.stroke();
}
function drawLightStroke(ctx, stroke) {
    const intensity = stroke.lightIntensity || 0.5;
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
        ctx.beginPath();
        ctx.arc(point.x, point.y, stroke.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = intensity;
        ctx.fill();
    }
}
function applyLightEffect(ctx, lightStroke, allStrokes) {
    const intensity = lightStroke.lightIntensity || 0.5;
    for (const lightPoint of lightStroke.points){
        const lightRadius = lightStroke.size * 8;
        for (const stroke of allStrokes){
            if (stroke.id === lightStroke.id) continue;
            if (stroke.brushType === 'light') continue;
            for (const point of stroke.points){
                const dx = point.x - lightPoint.x;
                const dy = point.y - lightPoint.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < lightRadius) {
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

//# sourceMappingURL=Mulu-Canvas_src_698cdbf2._.js.map