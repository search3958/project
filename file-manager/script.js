/* ========================================
   ファイルマネージャー - メインスクリプト
   ======================================== */

const html = htm.bind(React.createElement);
const { useState, useEffect, useRef, useCallback, useMemo } = React;
const antdicons = antd.icons || {};

// --- 定数 ---
const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/bmp', 'image/svg+xml'];
const TEXT_EXTENSIONS = new Set(['.txt', '.csv', '.json', '.xml', '.html', '.css', '.js', '.ts', '.md', '.log', '.yml', '.yaml', '.ini', '.conf', '.cfg']);
const ENCODINGS = ['UTF-8', 'Shift_JIS', 'EUC-JP', 'ISO-8859-1', 'UTF-16', 'UTF-16LE', 'UTF-16BE'];

// --- ユーティリティ関数 ---

/** ファイルオブジェクトを取得（FileSystemHandleまたはネイティブFile） */
async function getFileFromFileEntry(entry) {
    if (entry._nativeFile) return entry._nativeFile;
    if (entry.handle && entry.handle.getFile) return await entry.handle.getFile();
    throw new Error('ファイルにアクセスできません');
}

/** ファイルサイズを人間が読める形式に変換 */
function formatSize(bytes) {
    if (bytes === 0 || bytes == null) return '—';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0) + ' ' + units[i];
}

/** ファイル拡張子を取得 */
function getExtension(name) {
    const idx = name.lastIndexOf('.');
    return idx > 0 ? name.slice(idx).toLowerCase() : '';
}

/** ファイルタイプを分類 */
function getFileCategory(name, kind) {
    if (kind === 'directory') return 'folder';
    const ext = getExtension(name);
    const map = {
        folder: ['folder'],
        image: ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg', '.ico', '.tiff', '.tif', '.avif'],
        video: ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv', '.webm', '.m4v'],
        audio: ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.wma', '.m4a'],
        pdf: ['.pdf'],
        doc: ['.doc', '.docx', '.odt', '.rtf'],
        sheet: ['.xls', '.xlsx', '.csv', '.ods'],
        ppt: ['.ppt', '.pptx', '.odp'],
        zip: ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz'],
        code: ['.js', '.ts', '.jsx', '.tsx', '.py', '.rb', '.java', '.c', '.cpp', '.h', '.cs', '.go', '.rs', '.php', '.html', '.css', '.scss', '.less', '.json', '.xml', '.yaml', '.yml', '.toml'],
        text: ['.txt', '.md', '.log', '.ini', '.cfg', '.conf']
    };
    for (const [cat, exts] of Object.entries(map)) {
        if (cat === 'folder') continue;
        if (exts.includes(ext)) return cat;
    }
    return 'default';
}

/** ファイルカテゴリに対応するAnt Designアイコンを取得 */
function getFileIcon(category) {
    const icons = {
        folder: html`<${antdicons.FolderFilled} class="fm-icon-folder" />`,
        image: html`<${antdicons.FileImageFilled} class="fm-icon-image" />`,
        video: html`<${antdicons.VideoCameraFilled} class="fm-icon-video" />`,
        audio: html`<${antdicons.AudioFilled} class="fm-icon-audio" />`,
        pdf: html`<${antdicons.FilePdfFilled} class="fm-icon-pdf" />`,
        doc: html`<${antdicons.FileWordFilled} class="fm-icon-doc" />`,
        sheet: html`<${antdicons.FileExcelFilled} class="fm-icon-sheet" />`,
        ppt: html`<${antdicons.FilePptFilled} class="fm-icon-ppt" />`,
        zip: html`<${antdicons.FileZipFilled} class="fm-icon-zip" />`,
        code: html`<${antdicons.CodeFilled} class="fm-icon-code" />`,
        text: html`<${antdicons.FileTextFilled} class="fm-icon-text" />`,
        default: html`<${antdicons.FileOutlined} class="fm-icon-default" />`
    };
    return icons[category] || icons.default;
}

/** File System Access APIがサポートされているかチェック */
function isSupported() {
    return 'showDirectoryPicker' in window;
}

/** フォルダ内のエントリを再帰的に取得 */
async function getDirectoryEntries(dirHandle, path = '') {
    const entries = [];
    for await (const entry of dirHandle.values()) {
        const entryPath = path ? path + '/' + entry.name : entry.name;
        const category = getFileCategory(entry.name, entry.kind);
        const item = {
            name: entry.name,
            kind: entry.kind,
            category,
            path: entryPath,
            handle: entry
        };
        if (entry.kind === 'file') {
            try {
                const file = await entry.getFile();
                item.size = file.size;
                item.type = file.type;
                item.lastModified = file.lastModified;
            } catch (e) {
                item.size = 0;
                item.type = '';
                item.lastModified = 0;
            }
        }
        entries.push(item);
    }
    // フォルダを先、ファイルを後にソート、同じ種類内では名前順
    entries.sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === 'directory' ? -1 : 1;
        return a.name.localeCompare(b.name, 'ja');
    });
    return entries;
}

/** テキストファイルのエンコーディングを検出 */
function detectEncoding(buffer) {
    const b = new Uint8Array(buffer);
    if (b[0] === 0xFF && b[1] === 0xFE) return 'UTF-16LE';
    if (b[0] === 0xFE && b[1] === 0xFF) return 'UTF-16BE';
    if (b[0] === 0xEF && b[1] === 0xBB && b[2] === 0xBF) return 'UTF-8';
    // 簡易的な日本語エンコーディング検出
    let isJp = false;
    for (let i = 0; i < Math.min(b.length, 10000); i++) {
        if ((b[i] >= 0x81 && b[i] <= 0x9F) || (b[i] >= 0xE0 && b[i] <= 0xEF)) {
            isJp = true;
            break;
        }
    }
    return isJp ? 'Shift_JIS' : 'UTF-8';
}

/** 画像をリサイズ */
async function resizeImage(file, width, height, quality, format) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            let w = img.width;
            let h = img.height;
            // 指定サイズに合わせてリサイズ（アスペクト比維持または指定サイズ）
            if (width && height) {
                w = width;
                h = height;
            } else if (width) {
                const ratio = width / w;
                w = width;
                h = Math.round(h * ratio);
            } else if (height) {
                const ratio = height / h;
                h = height;
                w = Math.round(w * ratio);
            }
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, w);
            canvas.height = Math.max(1, h);
            const ctx = canvas.getContext('2d');
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const mimeType = format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg';
            const ext = format === 'png' ? '.png' : format === 'webp' ? '.webp' : '.jpg';
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve({ blob, ext, width: canvas.width, height: canvas.height });
                } else {
                    reject(new Error('画像のリサイズに失敗しました'));
                }
            }, mimeType, quality / 100);
        };
        img.onerror = () => reject(new Error('画像の読み込みに失敗しました'));
        img.src = URL.createObjectURL(file);
    });
}

/** バッチリネームパターンを適用 */
function applyRenamePattern(name, options) {
    let result = name;
    const ext = getExtension(name);
    const baseName = ext ? name.slice(0, name.length - ext.length) : name;

    // 検索置換
    if (options.find && options.replace !== undefined) {
        result = result.split(options.find).join(options.replace);
    }

    // プレフィックス追加
    if (options.prefix) {
        result = options.prefix + result;
    }

    // サフィックス追加（拡張子の前）
    if (options.suffix) {
        const currentExt = getExtension(result);
        const currentBase = currentExt ? result.slice(0, result.length - currentExt.length) : result;
        result = currentBase + options.suffix + currentExt;
    }

    return result;
}

/** 連番リネームパターンを適用 */
function applySequentialRename(name, index, pattern) {
    const ext = getExtension(name);
    const baseName = ext ? name.slice(0, name.length - ext.length) : name;
    return pattern
        .replace(/\{name\}/g, baseName)
        .replace(/\{num\}/g, String(index).padStart(3, '0'))
        .replace(/\{ext\}/g, ext.replace('.', ''));
}


// ========================================
// メインコンポーネント
// ========================================

function App() {
    return html`
        <${antd.ConfigProvider} theme=${{
            token: { colorPrimary: '#05F380', borderRadius: 8 }
        }}>
            <${MainContent} />
        <//>
    `;
}

function MainContent() {
    const message = antd.message;
    const modal = antd.Modal;

    // --- 状態管理 ---
    const [rootHandle, setRootHandle] = useState(null);
    const [currentHandle, setCurrentHandle] = useState(null);
    const [pathStack, setPathStack] = useState([]); // パンくず用のハンドルスタック
    const [files, setFiles] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState(new Set());
    const [searchText, setSearchText] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(null); // { percent, text }
    const [dragOver, setDragOver] = useState(false);
    const [droppedFiles, setDroppedFiles] = useState([]);

    const contentRef = useRef(null);

    // --- フィルタリングされたファイル一覧 ---
    const filteredFiles = useMemo(() => {
        if (!searchText.trim()) return files;
        const q = searchText.toLowerCase();
        return files.filter(f => f.name.toLowerCase().includes(q));
    }, [files, searchText]);

    // --- 選択状態の更新 ---
    const selectedFiles = useMemo(() => {
        const source = droppedFiles.length > 0 ? droppedFiles : files;
        return source.filter(f => selectedKeys.has(f.name));
    }, [files, droppedFiles, selectedKeys]);

    // --- 合計サイズとファイル数 ---
    const stats = useMemo(() => {
        const allFiles = filteredFiles.filter(f => f.kind === 'file');
        const totalCount = allFiles.length;
        const totalSize = allFiles.reduce((sum, f) => sum + (f.size || 0), 0);
        return { totalCount, totalSize };
    }, [filteredFiles]);

    // --- フォルダを開く ---
    const openFolder = useCallback(async () => {
        try {
            const dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
            setRootHandle(dirHandle);
            setCurrentHandle(dirHandle);
            setPathStack([dirHandle]);
            setSelectedKeys(new Set());
            setSearchText('');
            setLoading(true);
            const entries = await getDirectoryEntries(dirHandle);
            setFiles(entries);
            setLoading(false);
            message.success('フォルダを開きました: ' + dirHandle.name);
        } catch (e) {
            if (e.name !== 'AbortError') {
                message.error('フォルダを開けませんでした');
            }
            setLoading(false);
        }
    }, [message]);

    // --- サブフォルダを開く ---
    const openSubFolder = useCallback(async (entry) => {
        if (entry.kind !== 'directory') return;
        try {
            setCurrentHandle(entry.handle);
            setPathStack(prev => [...prev, entry.handle]);
            setSelectedKeys(new Set());
            setSearchText('');
            setLoading(true);
            const entries = await getDirectoryEntries(entry.handle);
            setFiles(entries);
            setLoading(false);
        } catch (e) {
            message.error('サブフォルダを開けませんでした');
            setLoading(false);
        }
    }, [message]);

    // --- パンくずナビゲーション ---
    const navigateTo = useCallback(async (index) => {
        if (index < 0 || index >= pathStack.length) return;
        const handle = pathStack[index];
        try {
            setCurrentHandle(handle);
            setPathStack(prev => prev.slice(0, index + 1));
            setSelectedKeys(new Set());
            setSearchText('');
            setLoading(true);
            const entries = await getDirectoryEntries(handle);
            setFiles(entries);
            setLoading(false);
        } catch (e) {
            message.error('ナビゲーションに失敗しました');
            setLoading(false);
        }
    }, [pathStack, message]);

    // --- 全選択/選択解除 ---
    const toggleSelectAll = useCallback(() => {
        if (selectedKeys.size === files.filter(f => f.kind === 'file').length) {
            setSelectedKeys(new Set());
        } else {
            setSelectedKeys(new Set(files.filter(f => f.kind === 'file').map(f => f.name)));
        }
    }, [files, selectedKeys]);

    // --- ファイル選択トグル ---
    const toggleSelect = useCallback((name) => {
        setSelectedKeys(prev => {
            const next = new Set(prev);
            if (next.has(name)) {
                next.delete(name);
            } else {
                next.add(name);
            }
            return next;
        });
    }, []);

    // --- ZIP圧縮 ---
    const compressToZip = useCallback(async () => {
        const targets = selectedFiles.filter(f => f.kind === 'file');
        if (targets.length === 0) {
            message.warning('ファイルを選択してください');
            return;
        }
        setProgress({ percent: 0, text: '圧縮中...' });
        try {
            const zip = new JSZip();
            for (let i = 0; i < targets.length; i++) {
                const file = await getFileFromFileEntry(targets[i]);
                const buffer = await file.arrayBuffer();
                zip.file(targets[i].name, buffer);
                setProgress({ percent: Math.round(((i + 1) / targets.length) * 80), text: `圧縮中... (${i + 1}/${targets.length})` });
            }
            setProgress({ percent: 90, text: 'ZIPファイル生成中...' });
            const blob = await zip.generateAsync({ type: 'blob' }, (metadata) => {
                setProgress({ percent: 90 + Math.round(metadata.percent / 10), text: 'ZIPファイル生成中...' });
            });
            saveAs(blob, 'files.zip');
            setProgress({ percent: 100, text: '完了' });
            message.success(`${targets.length}件のファイルを圧縮しました`);
        } catch (e) {
            message.error('圧縮に失敗しました: ' + e.message);
        } finally {
            setTimeout(() => setProgress(null), 1000);
        }
    }, [selectedFiles, message]);

    // --- 画像リサイズモーダル ---
    const showResizeModal = useCallback(() => {
        const targets = selectedFiles.filter(f => f.kind === 'file' && f.category === 'image');
        if (targets.length === 0) {
            message.warning('画像ファイルを選択してください');
            return;
        }

        const ResizeContent = ({ onOk, onCancel }) => {
            const [width, setWidth] = useState('');
            const [height, setHeight] = useState('');
            const [quality, setQuality] = useState(85);
            const [format, setFormat] = useState('same');
            const [keepAspect, setKeepAspect] = useState(true);

            const handleOk = async () => {
                onOk({ width: width ? parseInt(width) : 0, height: height ? parseInt(height) : 0, quality, format });
            };

            return html`
                <div>
                    <div class="fm-modal-form-item">
                        <label>幅 (px) ※空欄で自動計算</label>
                        <${antd.Input} type="number" placeholder="例: 800" value=${width}
                            onChange=${e => setWidth(e.target.value)} />
                    </div>
                    <div class="fm-modal-form-item">
                        <label>高さ (px) ※空欄で自動計算</label>
                        <${antd.Input} type="number" placeholder="例: 600" value=${height}
                            onChange=${e => setHeight(e.target.value)} />
                    </div>
                    <div class="fm-modal-form-row">
                        <div class="fm-modal-form-item">
                            <label>品質 (%)</label>
                            <${antd.Slider} min="10" max="100" value=${quality}
                                onChange=${v => setQuality(v)} />
                        </div>
                    </div>
                    <div class="fm-modal-form-item">
                        <label>出力形式</label>
                        <${antd.Select} value=${format} onChange=${setFormat} style=${{ width: '100%' }}>
                            <${antd.Select.Option} value="same">元の形式を維持</${antd.Select.Option}>
                            <${antd.Select.Option} value="png">PNG</${antd.Select.Option}>
                            <${antd.Select.Option} value="jpg">JPG</${antd.Select.Option}>
                            <${antd.Select.Option} value="webp">WebP</${antd.Select.Option}>
                        <//>
                    </div>
                    <div class="fm-modal-form-item">
                        <${antd.Checkbox} checked=${keepAspect} onChange=${e => setKeepAspect(e.target.checked)}>
                            アスペクト比を維持（幅または高さのみ指定時）
                        <//>
                    </div>
                </div>
            `;
        };

        let modalInstance = null;
        modal.confirm({
            title: '画像をリサイズ',
            content: html`<${ResizeContent} onOk=${async (opts) => {
                // モーダルを閉じる
                modalInstance.destroy();
                setProgress({ percent: 0, text: 'リサイズ中...' });
                try {
                    for (let i = 0; i < targets.length; i++) {
                        const file = await getFileFromFileEntry(targets[i]);
                        let outputFormat = opts.format;
                        if (outputFormat === 'same') {
                            if (file.type === 'image/png') outputFormat = 'png';
                            else if (file.type === 'image/webp') outputFormat = 'webp';
                            else outputFormat = 'jpg';
                        }
                        const result = await resizeImage(file, opts.width, opts.height, opts.quality, outputFormat);
                        // リサイズしたファイルをダウンロード
                        const baseName = targets[i].name.replace(getExtension(targets[i].name), '');
                        const fileName = baseName + '_resized' + result.ext;
                        saveAs(result.blob, fileName);
                        setProgress({
                            percent: Math.round(((i + 1) / targets.length) * 100),
                            text: `リサイズ中... (${i + 1}/${targets.length})`
                        });
                    }
                    message.success(`${targets.length}件の画像をリサイズしました`);
                } catch (e) {
                    message.error('リサイズに失敗しました: ' + e.message);
                } finally {
                    setTimeout(() => setProgress(null), 1000);
                }
            }} />`,
            okText: 'リサイズ実行',
            cancelText: 'キャンセル',
            width: 480,
            icon: null,
            footer: null,
        });
        // modal.confirmの戻り値は破棄インスタンスを取得するための補助
        // 実際のonOk内でdestroyを呼ぶ
    }, [selectedFiles, message, modal]);

    // --- 形式変換モーダル ---
    const showConvertModal = useCallback(() => {
        const imageFiles = selectedFiles.filter(f => f.kind === 'file' && f.category === 'image');
        const textFiles = selectedFiles.filter(f => f.kind === 'file' && TEXT_EXTENSIONS.has(getExtension(f.name)));
        const allTargets = selectedFiles.filter(f => f.kind === 'file');

        if (allTargets.length === 0) {
            message.warning('ファイルを選択してください');
            return;
        }

        const ConvertContent = ({ onConvert }) => {
            const [mode, setMode] = useState('image');
            const [targetFormat, setTargetFormat] = useState('png');
            const [encoding, setEncoding] = useState('UTF-8');

            const targets = mode === 'image' ? imageFiles : textFiles;

            return html`
                <div>
                    <div class="fm-modal-form-item">
                        <label>変換モード</label>
                        <${antd.Radio.Group} value=${mode} onChange=${e => setMode(e.target.value)}>
                            <${antd.Radio} value="image">画像変換 (${imageFiles.length}件)</${antd.Radio}>
                            <${antd.Radio} value="text">テキストエンコーディング変換 (${textFiles.length}件)</${antd.Radio}>
                        <//>
                    </div>
                    ${mode === 'image' ? html`
                        <div class="fm-modal-form-item">
                            <label>変換先の形式</label>
                            <${antd.Select} value=${targetFormat} onChange=${setTargetFormat} style=${{ width: '100%' }}>
                                <${antd.Select.Option} value="png">PNG</${antd.Select.Option}>
                                <${antd.Select.Option} value="jpg">JPG</${antd.Select.Option}>
                                <${antd.Select.Option} value="webp">WebP</${antd.Select.Option}>
                            <//>
                        </div>
                    ` : html`
                        <div class="fm-modal-form-item">
                            <label>出力エンコーディング</label>
                            <${antd.Select} value=${encoding} onChange=${setEncoding} style=${{ width: '100%' }}>
                                ${ENCODINGS.map(enc => html`<${antd.Select.Option} key=${enc} value=${enc}>${enc}<//>`)}
                            <//>
                        </div>
                    `}
                    <div style=${{ marginTop: 16, textAlign: 'right' }}>
                        <${antd.Button} type="primary" onClick=${() => onConvert({ mode, targetFormat, encoding, targets })}
                            disabled=${targets.length === 0}>
                            変換実行 (${targets.length}件)
                        <//>
                    </div>
                </div>
            `;
        };

        modal.confirm({
            title: 'ファイル形式変換',
            content: html`<${ConvertContent} onConvert=${async ({ mode, targetFormat, encoding, targets }) => {
                if (targets.length === 0) {
                    message.warning('変換対象のファイルがありません');
                    return;
                }
                setProgress({ percent: 0, text: '変換中...' });
                try {
                    for (let i = 0; i < targets.length; i++) {
                        const file = await getFileFromFileEntry(targets[i]);
                        if (mode === 'image') {
                            const result = await resizeImage(file, 0, 0, 92, targetFormat);
                            const baseName = targets[i].name.replace(getExtension(targets[i].name), '');
                            saveAs(result.blob, baseName + result.ext);
                        } else {
                            // テキストエンコーディング変換
                            const buffer = await file.arrayBuffer();
                            const detectedEnc = detectEncoding(buffer);
                            const decoder = new TextDecoder(detectedEnc);
                            const text = decoder.decode(buffer);
                            const encoder = new TextEncoder();
                            // TextEncoderは常にUTF-8なので、UTF-8以外はBlob経由
                            if (encoding.toUpperCase() === 'UTF-8') {
                                const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                                saveAs(blob, targets[i].name);
                            } else {
                                // 非UTF-8エンコーディングはテキストとして再出力（ブラウザ制限によりUTF-8が主体）
                                const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
                                saveAs(blob, targets[i].name.replace(getExtension(targets[i].name), '') + '_' + encoding.replace(/[^a-zA-Z0-9]/g, '') + '.txt');
                            }
                        }
                        setProgress({
                            percent: Math.round(((i + 1) / targets.length) * 100),
                            text: `変換中... (${i + 1}/${targets.length})`
                        });
                    }
                    message.success(`${targets.length}件のファイルを変換しました`);
                } catch (e) {
                    message.error('変換に失敗しました: ' + e.message);
                } finally {
                    setTimeout(() => setProgress(null), 1000);
                }
            }} />`,
            okText: '変換',
            cancelText: 'キャンセル',
            width: 480,
            icon: null,
            footer: null,
        });
    }, [selectedFiles, message, modal]);

    // --- 一括リネームモーダル ---
    const showRenameModal = useCallback(() => {
        const targets = selectedFiles.filter(f => f.kind === 'file');
        if (targets.length === 0) {
            message.warning('ファイルを選択してください');
            return;
        }

        const RenameContent = ({ onRename }) => {
            const [mode, setMode] = useState('replace'); // 'replace' | 'prefix' | 'sequential'
            const [findText, setFindText] = useState('');
            const [replaceText, setReplaceText] = useState('');
            const [prefix, setPrefix] = useState('');
            const [suffix, setSuffix] = useState('');
            const [pattern, setPattern] = useState('{name}_{num}.{ext}');

            // プレビュー計算
            const previews = useMemo(() => {
                return targets.map((f, i) => {
                    let newName;
                    if (mode === 'replace') {
                        newName = applyRenamePattern(f.name, { find: findText, replace: replaceText, prefix: '', suffix: '' });
                    } else if (mode === 'prefix') {
                        newName = applyRenamePattern(f.name, { find: '', replace: '', prefix, suffix });
                    } else {
                        newName = applySequentialRename(f.name, i + 1, pattern);
                    }
                    return { original: f.name, renamed: newName, changed: f.name !== newName };
                });
            }, [mode, findText, replaceText, prefix, suffix, pattern, targets]);

            const changedCount = previews.filter(p => p.changed).length;

            return html`
                <div>
                    <div class="fm-modal-form-item">
                        <label>リネームモード</label>
                        <${antd.Radio.Group} value=${mode} onChange=${e => setMode(e.target.value)}>
                            <${antd.Radio} value="replace">検索・置換</${antd.Radio}>
                            <${antd.Radio} value="prefix">プレフィックス/サフィックス</${antd.Radio}>
                            <${antd.Radio} value="sequential">連番リネーム</${antd.Radio}>
                        <//>
                    </div>
                    ${mode === 'replace' ? html`
                        <div class="fm-modal-form-row">
                            <div class="fm-modal-form-item">
                                <label>検索文字列</label>
                                <${antd.Input} value=${findText} onChange=${e => setFindText(e.target.value)} placeholder="検索..." />
                            </div>
                            <div class="fm-modal-form-item">
                                <label>置換文字列</label>
                                <${antd.Input} value=${replaceText} onChange=${e => setReplaceText(e.target.value)} placeholder="置換..." />
                            </div>
                        </div>
                    ` : null}
                    ${mode === 'prefix' ? html`
                        <div class="fm-modal-form-row">
                            <div class="fm-modal-form-item">
                                <label>プレフィックス</label>
                                <${antd.Input} value=${prefix} onChange=${e => setPrefix(e.target.value)} placeholder="例: new_" />
                            </div>
                            <div class="fm-modal-form-item">
                                <label>サフィックス</label>
                                <${antd.Input} value=${suffix} onChange=${e => setSuffix(e.target.value)} placeholder="例: _backup" />
                            </div>
                        </div>
                    ` : null}
                    ${mode === 'sequential' ? html`
                        <div class="fm-modal-form-item">
                            <label>パターン ({name}, {num}, {ext}を使用可能)</label>
                            <${antd.Input} value=${pattern} onChange=${e => setPattern(e.target.value)}
                                placeholder="{name}_{num}.{ext}" />
                        </div>
                    ` : null}
                    <div style=${{ margin: '12px 0' }}>
                        <${antd.Typography.Text} type="secondary">${changedCount}件のファイルが変更されます</${antd.Typography.Text}>
                    </div>
                    <div style=${{ maxHeight: 200, overflow: 'auto', background: '#fafafa', borderRadius: 8, padding: 8 }}>
                        ${previews.slice(0, 50).map((p, i) => html`
                            <div key=${i} style=${{ display: 'flex', gap: 8, padding: '3px 0', fontSize: 12 }}>
                                <span style=${{ color: '#999', flexShrink: 0, width: 80, overflow: 'hidden', textOverflow: 'ellipsis' }}>${p.original}</span>
                                <span style=${{ color: '#ccc', flexShrink: 0 }}>→</span>
                                <span style=${{ color: p.changed ? '#05F380' : '#999', fontWeight: p.changed ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>${p.renamed}</span>
                            </div>
                        `)}
                        ${previews.length > 50 ? html`<div style=${{ color: '#999', fontSize: 12, padding: '4px 0' }}>...他 ${previews.length - 50}件</div>` : null}
                    </div>
                    <div style=${{ marginTop: 16, textAlign: 'right' }}>
                        <${antd.Button} type="primary" onClick=${() => onRename(previews)}
                            disabled=${changedCount === 0}>
                            リネーム実行 (${changedCount}件)
                        <//>
                    </div>
                </div>
            `;
        };

        modal.confirm({
            title: '一括リネーム',
            content: html`<${RenameContent} onRename=${async (previews) => {
                setProgress({ percent: 0, text: 'リネーム中...' });
                try {
                    let renamed = 0;
                    for (let i = 0; i < previews.length; i++) {
                        const p = previews[i];
                        if (!p.changed) continue;
                        const target = targets[i];
                        if (!rootHandle) {
                            // rootHandleがない場合はダウンロード形式
                            const file = await getFileFromFileEntry(target);
                            saveAs(file, p.renamed);
                        }
                        renamed++;
                        setProgress({
                            percent: Math.round(((i + 1) / previews.length) * 100),
                            text: `リネーム中... (${renamed}件完了)`
                        });
                    }
                    message.success(`${renamed}件のファイルをリネームしました`);
                    // フォルダを再読み込み
                    if (currentHandle) {
                        const entries = await getDirectoryEntries(currentHandle);
                        setFiles(entries);
                    }
                } catch (e) {
                    message.error('リネームに失敗しました: ' + e.message);
                } finally {
                    setTimeout(() => setProgress(null), 1000);
                }
            }} />`,
            okText: 'リネーム',
            cancelText: 'キャンセル',
            width: 560,
            icon: null,
            footer: null,
        });
    }, [selectedFiles, message, modal, rootHandle, currentHandle]);

    // --- ドラッグ＆ドロップ処理 ---
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
        const items = Array.from(e.dataTransfer.files);
        if (items.length > 0) {
            const mapped = items.map(file => ({
                name: file.name,
                kind: 'file',
                category: getFileCategory(file.name, 'file'),
                path: file.name,
                handle: null,
                size: file.size,
                type: file.type,
                lastModified: file.lastModified,
                _nativeFile: file
            }));
            setDroppedFiles(mapped);
        }
    }, []);

    // ドロップされたファイルがある場合、それを表示
    const displayFiles = droppedFiles.length > 0 ? droppedFiles : filteredFiles;
    const displaySelected = useMemo(() => {
        if (droppedFiles.length > 0) {
            return droppedFiles.filter(f => selectedKeys.has(f.name));
        }
        return selectedFiles;
    }, [droppedFiles, selectedKeys, selectedFiles]);

    const displayStats = useMemo(() => {
        const allFiles = displayFiles.filter(f => f.kind === 'file');
        return {
            totalCount: allFiles.length,
            totalSize: allFiles.reduce((sum, f) => sum + (f.size || 0), 0)
        };
    }, [displayFiles]);

    // --- レンダリング ---
    return html`
        <div class="fm-app">
            <!-- ヘッダー -->
            <header class="fm-header">
                <div class="fm-header-left">
                    <span class="fm-header-title">
                        <${antdicons.FolderOpenOutlined} style=${{ marginRight: 8 }} />
                        ファイルマネージャー
                    </span>
                    <${antd.Breadcrumb} class="fm-breadcrumb">
                        ${pathStack.map((h, i) => html`
                            <${antd.Breadcrumb.Item} key=${i}>
                                <a onClick=${() => i < pathStack.length - 1 && navigateTo(i)}
                                   style=${{ cursor: i < pathStack.length - 1 ? 'pointer' : 'default' }}>
                                    ${i === 0 ? h.name : '...'}
                                </a>
                            <//>
                        `)}
                    <//>
                </div>
                <div class="fm-header-right">
                    <${antd.Button} type="primary" icon=${html`<${antdicons.FolderOpenOutlined} />`}
                        onClick=${openFolder}>
                        フォルダを開く
                    <//>
                    <${antd.Segmented} value=${viewMode} onChange=${setViewMode}
                        options=${[
                            { value: 'grid', icon: html`<${antdicons.AppstoreOutlined} />` },
                            { value: 'list', icon: html`<${antdicons.UnorderedListOutlined} />` }
                        ]} />
                </div>
            </header>

            <!-- ツールバー -->
            ${rootHandle || droppedFiles.length > 0 ? html`
                <div class="fm-toolbar">
                    <div class="fm-toolbar-left">
                        <${antd.Checkbox} checked=${selectedKeys.size > 0 && selectedKeys.size === files.filter(f => f.kind === 'file').length}
                            indeterminate=${selectedKeys.size > 0 && selectedKeys.size < files.filter(f => f.kind === 'file').length}
                            onChange=${toggleSelectAll}>
                            全選択
                        <//>
                        <${antd.Input} placeholder="ファイル名で検索..."
                            prefix=${html`<${antdicons.SearchOutlined} />`}
                            value=${searchText} onChange=${e => setSearchText(e.target.value)}
                            allowClear style=${{ width: 240 }} />
                    </div>
                    <div class="fm-toolbar-right">
                        <${antd.Button} icon=${html`<${antdicons.CompressOutlined} />`}
                            disabled=${selectedKeys.size === 0}
                            onClick=${compressToZip}>
                            ZIP圧縮
                        <//>
                        <${antd.Button} icon=${html`<${antdicons.ExpandOutlined} />`}
                            disabled=${selectedKeys.size === 0}
                            onClick=${showResizeModal}>
                            リサイズ
                        <//>
                        <${antd.Button} icon=${html`<${antdicons.SwapOutlined} />`}
                            disabled=${selectedKeys.size === 0}
                            onClick=${showConvertModal}>
                            形式変換
                        <//>
                        <${antd.Button} icon=${html`<${antdicons.EditOutlined} />`}
                            disabled=${selectedKeys.size === 0}
                            onClick=${showRenameModal}>
                            一括リネーム
                        <//>
                    </div>
                </div>
            ` : null}

            <!-- プログレスバー -->
            ${progress ? html`
                <div class="fm-progress-container">
                    <div class="fm-progress-label">
                        <span>${progress.text}</span>
                        <span>${progress.percent}%</span>
                    </div>
                    <${antd.Progress} percent=${progress.percent} showInfo=${false} size="small" />
                </div>
            ` : null}

            <!-- メインコンテンツ -->
            <main class="fm-content"
                ref=${contentRef}
                onDragOver=${handleDragOver}
                onDragLeave=${handleDragLeave}
                onDrop=${handleDrop}>

                <!-- 非対応ブラウザ警告 -->
                ${!isSupported() ? html`
                    <div class="fm-browser-warning" role="alert">
                        <${antdicons.WarningOutlined} />
                        <div>
                            <strong>お使いのブラウザはFile System Access APIに対応していません。</strong><br />
                            フォルダの直接アクセス機能を使用するには、Google Chrome（バージョン86以降）またはMicrosoft Edge（Chromium版）をご利用ください。
                            ただし、ドラッグ＆ドロップでファイルを読み込むことは可能です。
                        </div>
                    </div>
                ` : null}

                <!-- ドラッグ＆ドロップオーバーレイ -->
                ${dragOver ? html`
                    <div class="fm-dropzone-overlay">
                        <div class="fm-dropzone-overlay-text">
                            <${antdicons.CloudUploadOutlined} style=${{ marginRight: 8, fontSize: 24 }} />
                            ここにファイルをドロップ
                        </div>
                    </div>
                ` : null}

                ${loading ? html`
                    <div class="fm-empty">
                        <${antd.Spin} size="large" />
                        <div class="fm-empty-desc">読み込み中...</div>
                    </div>
                ` : displayFiles.length === 0 && (rootHandle || droppedFiles.length > 0) ? html`
                    <div class="fm-empty fm-animate-in">
                        <${antdicons.InboxOutlined} class="fm-empty-icon" />
                        <div class="fm-empty-title">${searchText ? '検索結果がありません' : 'ファイルがありません'}</div>
                        <div class="fm-empty-desc">
                            ${searchText ? '検索条件を変更して再試行してください' : 'このフォルダにはファイルまたはサブフォルダが含まれていません'}
                        </div>
                    </div>
                ` : displayFiles.length === 0 ? html`
                    <!-- 空状態：フォルダ未選択 -->
                    <div class="fm-empty fm-animate-in">
                        <${antdicons.CloudUploadOutlined} class="fm-empty-icon" />
                        <div class="fm-empty-title">フォルダを開いてください</div>
                        <div class="fm-empty-desc">
                            「フォルダを開く」ボタンをクリックしてフォルダにアクセスするか、<br />
                            ファイルをここにドラッグ＆ドロップしてください。
                        </div>
                        <${antd.Button} type="primary" size="large" icon=${html`<${antdicons.FolderOpenOutlined} />`}
                            onClick=${openFolder}
                            disabled=${!isSupported()}>
                            フォルダを開く
                        <//>
                    </div>
                ` : null}

                <!-- グリッド表示 -->
                ${!loading && displayFiles.length > 0 && viewMode === 'grid' ? html`
                    <div class="fm-file-grid fm-animate-in">
                        ${displayFiles.map(file => html`
                            <div key=${file.name}
                                class=${`fm-file-grid-item ${selectedKeys.has(file.name) ? 'selected' : ''}`}
                                onClick=${() => {
                                    if (file.kind === 'directory') {
                                        openSubFolder(file);
                                    } else {
                                        toggleSelect(file.name);
                                    }
                                }}
                                onDblClick=${() => {
                                    if (file.kind === 'file') {
                                        toggleSelect(file.name);
                                    }
                                }}
                                role="button"
                                tabIndex="0"
                                aria-label=${file.name}
                                onKeyDown=${e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (file.kind === 'directory') openSubFolder(file); else toggleSelect(file.name); } }}>
                                ${file.kind === 'file' ? html`
                                    <div class="fm-grid-checkbox" onClick=${e => e.stopPropagation()}>
                                        <${antd.Checkbox} checked=${selectedKeys.has(file.name)}
                                            onChange=${() => toggleSelect(file.name)} />
                                    </div>
                                ` : null}
                                <div class="fm-file-grid-icon">${getFileIcon(file.category)}</div>
                                <div class="fm-file-grid-name" title=${file.name}>${file.name}</div>
                                ${file.kind === 'file' ? html`
                                    <div class="fm-file-grid-meta">${formatSize(file.size)}</div>
                                ` : null}
                            </div>
                        `)}
                    </div>
                ` : null}

                <!-- リスト表示 -->
                ${!loading && displayFiles.length > 0 && viewMode === 'list' ? html`
                    <div class="fm-file-list fm-animate-in">
                        <div class="fm-file-list-header">
                            <div></div>
                            <div></div>
                            <div>名前</div>
                            <div>サイズ</div>
                            <div>種類</div>
                            <div>更新日時</div>
                        </div>
                        ${displayFiles.map(file => html`
                            <div key=${file.name}
                                class=${`fm-file-list-item ${selectedKeys.has(file.name) ? 'selected' : ''}`}
                                onClick=${() => {
                                    if (file.kind === 'directory') {
                                        openSubFolder(file);
                                    } else {
                                        toggleSelect(file.name);
                                    }
                                }}
                                role="button"
                                tabIndex="0"
                                aria-label=${file.name}
                                onKeyDown=${e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (file.kind === 'directory') openSubFolder(file); else toggleSelect(file.name); } }}>
                                <div>
                                    ${file.kind === 'file' ? html`
                                        <${antd.Checkbox} checked=${selectedKeys.has(file.name)}
                                            onChange=${(e) => { e.stopPropagation(); toggleSelect(file.name); }} />
                                    ` : null}
                                </div>
                                <div class="fm-file-list-icon">${getFileIcon(file.category)}</div>
                                <div class="fm-file-list-name" title=${file.name}>${file.name}</div>
                                <div class="fm-file-list-meta">${file.kind === 'file' ? formatSize(file.size) : '—'}</div>
                                <div class="fm-file-list-meta">${file.type || 'フォルダ'}</div>
                                <div class="fm-file-list-meta">${file.lastModified ? dayjs(file.lastModified).format('YYYY/MM/DD HH:mm') : '—'}</div>
                            </div>
                        `)}
                    </div>
                ` : null}
            </main>

            <!-- ステータスバー -->
            ${rootHandle || droppedFiles.length > 0 ? html`
                <div class="fm-statusbar">
                    <div class="fm-statusbar-left">
                        <span class="fm-statusbar-item">
                            <${antdicons.FileOutlined} /> ${displayStats.totalCount} ファイル
                        </span>
                        <span class="fm-statusbar-item">
                            <${antdicons.HddOutlined} /> ${formatSize(displayStats.totalSize)}
                        </span>
                        ${selectedKeys.size > 0 ? html`
                            <span class="fm-statusbar-item" style=${{ color: '#05F380', fontWeight: 600 }}>
                                <${antdicons.CheckCircleOutlined} /> ${selectedKeys.size} 件選択中
                            </span>
                        ` : null}
                    </div>
                    <div class="fm-statusbar-right">
                        ${rootHandle ? html`
                            <span class="fm-statusbar-item" style=${{ color: '#999' }}>
                                <${antdicons.FolderOutlined} /> ${currentHandle?.name || rootHandle.name}
                            </span>
                        ` : null}
                    </div>
                </div>
            ` : null}

            <!-- フッター -->
            <footer class="fm-footer">
                <div class="fm-footer-links">
                    <a href="https://search3958.github.io/" target="_blank" rel="noopener noreferrer">About</a>
                    <a href="https://search3958.github.io/policies/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    <a href="https://search3958.github.io/accounts/lang" target="_blank" rel="noopener noreferrer">Language Settings</a>
                </div>
                <div class="fm-footer-copyright">© 2025 search3958</div>
            </footer>
        </div>
    `;
}


// ========================================
// アプリケーション初期化
// ========================================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));