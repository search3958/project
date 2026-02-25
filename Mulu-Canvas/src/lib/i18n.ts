// Internationalization system for the Physics Drawing App
import { Language } from './types';

export const translations = {
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
    objectTooltip: '当たり判定あり、重力で落下',
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
    objectTooltip: '有碰撞检测，受重力影响',
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
    objectTooltip: '충돌 감지 있음, 중력으로 떨어짐',
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
    objectTooltip: 'Has collision, falls with gravity',
  },
};

export type TranslationKey = keyof typeof translations.ja;

export function getTranslation(lang: Language, key: TranslationKey): string {
  return translations[lang][key] || translations.en[key] || key;
}

export function detectLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en';
  
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('ja')) return 'ja';
  if (lang.startsWith('zh')) return 'zh';
  if (lang.startsWith('ko')) return 'ko';
  return 'en';
}
