/**
 * ============================================
 * QRコード一括生成ツール - メインスクリプト
 * ============================================
 * React 18 + Ant Design 5 + htm による実装
 * QRCode.js でQRコード生成、JSZip + FileSaver で一括ダウンロード
 */

(function () {
    'use strict';

    // htm を React.createElement にバインド
    const html = htm.bind(React.createElement);
    const { useState, useEffect, useRef, useCallback, useMemo } = React;

    // Ant Design コンポーネントの展開
    const {
        Button, Input, Select, Radio, Space, Tooltip, Typography, Tag,
        ConfigProvider, App: AntApp, Card, Progress, Divider, Tabs,
        Form, Row, Col, message, Empty, Spin
    } = antd;
    const { Title, Text, Paragraph } = Typography;
    const { TextArea } = Input;
    const { Option } = Select;
    const { Meta } = Card;

    // ========================================
    // 定数・プリセット定義
    // ========================================

    /** カラープリセットテーマ一覧 */
    const COLOR_PRESETS = [
        { key: 'classic', name: 'クラシック', fg: '#000000', bg: '#ffffff' },
        { key: 'dark',    name: 'ダーク',     fg: '#ffffff', bg: '#1a1a2e' },
        { key: 'blue',    name: 'ブルー',     fg: '#1a56db', bg: '#eff6ff' },
        { key: 'green',   name: 'グリーン',   fg: '#065f46', bg: '#ecfdf5' },
        { key: 'red',     name: 'レッド',     fg: '#b91c1c', bg: '#fef2f2' },
        { key: 'custom',  name: 'カスタム',   fg: '#000000', bg: '#ffffff' },
    ];

    /** サイズプリセット */
    const SIZE_OPTIONS = [
        { value: 128,  label: '小 (128px)' },
        { value: 256,  label: '中 (256px)' },
        { value: 512,  label: '大 (512px)' },
        { value: 0,    label: 'カスタム' },
    ];

    /** エラー訂正レベル */
    const EC_LEVELS = [
        { value: 'L', label: 'L (7%)' },
        { value: 'M', label: 'M (15%)' },
        { value: 'Q', label: 'Q (25%)' },
        { value: 'H', label: 'H (30%)' },
    ];

    /** コンテンツタイプ */
    const CONTENT_TYPES = [
        { key: 'text',  label: 'テキスト',   icon: '📝' },
        { key: 'url',   label: 'URL',         icon: '🌐' },
        { key: 'wifi',  label: 'WiFi',        icon: '📶' },
        { key: 'vcard', label: 'vCard',       icon: '👤' },
        { key: 'email', label: 'メール',      icon: '📧' },
    ];

    // ========================================
    // ヘルパー関数
    // ========================================

    /**
     * コンテンツタイプに応じてQRコード用テキストを生成
     * @param {string} raw - ユーザー入力テキスト
     * @param {string} type - コンテンツタイプ
     * @returns {string} QRコード用エンコード済みテキスト
     */
    function encodeContent(raw, type) {
        const text = raw.trim();
        if (!text) return '';

        switch (type) {
            case 'wifi':
                // WiFi形式: WIFI:T:WPA;S:ssid;P:password;;
                return 'WIFI:T:WPA;S:' + text + ';P:password;;';
            case 'vcard':
                // vCard基本形式
                return 'BEGIN:VCARD\nVERSION:3.0\nFN:' + text + '\nEND:VCARD';
            case 'email':
                // メール形式
                if (text.startsWith('mailto:')) return text;
                return 'mailto:' + text;
            case 'url':
                // URL形式（http://がなければ付与）
                if (/^https?:\/\//i.test(text)) return text;
                return 'https://' + text;
            default:
                return text;
        }
    }

    /**
     * ファイル名に使用できない文字を置換
     */
    function sanitizeFilename(name, maxLen) {
        maxLen = maxLen || 50;
        return name
            .replace(/[<>:"/\\|?*\x00-\x1f]/g, '_')
            .replace(/\s+/g, '_')
            .substring(0, maxLen);
    }

    /**
     * DataURL を Blob に変換
     */
    function dataURLtoBlob(dataURL) {
        const parts = dataURL.split(',');
        const mime = parts[0].match(/:(.*?);/)[1];
        const bstr = atob(parts[1]);
        var arr = new Uint8Array(bstr.length);
        for (var i = 0; i < bstr.length; i++) {
            arr[i] = bstr.charCodeAt(i);
        }
        return new Blob([arr], { type: mime });
    }

    // ========================================
    // メインコンポーネント
    // ========================================

    function MainContent() {
        // --- 状態管理 ---
        const [inputText, setInputText] = useState('');
        const [fgColor, setFgColor] = useState('#000000');
        const [bgColor, setBgColor] = useState('#ffffff');
        const [activePreset, setActivePreset] = useState('classic');
        const [sizeOption, setSizeOption] = useState(256);
        const [customSize, setCustomSize] = useState(256);
        const [ecLevel, setEcLevel] = useState('M');
        const [contentType, setContentType] = useState('text');

        const [qrCodes, setQrCodes] = useState([]);    // 生成済みQRコード配列
        const [isGenerating, setIsGenerating] = useState(false);
        const [progress, setProgress] = useState(0);    // 生成進捗 (0-100)
        const abortRef = useRef(false);                 // 生成中止フラグ

        // --- 入力行の取得（フィルタ済み） ---
        const lines = useMemo(function () {
            return inputText
                .split('\n')
                .map(function (l) { return l.trim(); })
                .filter(function (l) { return l.length > 0; });
        }, [inputText]);

        // --- 実際のQRコードサイズ ---
        const actualSize = sizeOption === 0 ? Math.min(Math.max(customSize, 64), 1024) : sizeOption;

        // --- プリセット変更ハンドラ ---
        function handlePresetChange(preset) {
            setActivePreset(preset.key);
            if (preset.key !== 'custom') {
                setFgColor(preset.fg);
                setBgColor(preset.bg);
            }
        }

        // --- 色のカスタム変更時にプリセットを「カスタム」に ---
        function handleColorChange(type, value) {
            if (type === 'fg') setFgColor(value);
            else setBgColor(value);
            // プリセットと一致しなければ「カスタム」に
            var matched = COLOR_PRESETS.find(function (p) {
                return p.fg === (type === 'fg' ? value : fgColor) &&
                       p.bg === (type === 'bg' ? value : bgColor);
            });
            if (!matched) setActivePreset('custom');
        }

        // ========================================
        // QRコード一括生成（非同期・進捗表示付き）
        // ========================================
        async function handleGenerate() {
            if (lines.length === 0) {
                antd.message.warning('テキストを入力してください。');
                return;
            }
            if (lines.length > 500) {
                antd.message.warning('一度に生成できるのは500件までです。');
                return;
            }

            setIsGenerating(true);
            setProgress(0);
            setQrCodes([]);
            abortRef.current = false;

            var results = [];
            var total = lines.length;
            var opts = {
                width: actualSize,
                margin: 2,
                color: {
                    dark: fgColor,
                    light: bgColor,
                },
                errorCorrectionLevel: ecLevel,
            };

            for (var i = 0; i < total; i++) {
                if (abortRef.current) break;

                var encodedText = encodeContent(lines[i], contentType);
                try {
                    var dataURL = await QRCode.toDataURL(encodedText, opts);
                    results.push({
                        id: i,
                        text: lines[i],
                        encoded: encodedText,
                        dataURL: dataURL,
                    });
                } catch (err) {
                    // エラーがあっても処理を続行（エラー内容を記録）
                    results.push({
                        id: i,
                        text: lines[i],
                        encoded: encodedText,
                        dataURL: null,
                        error: err.message || '生成エラー',
                    });
                }
                // 進捗更新（1件以上の場合）
                setProgress(Math.round(((i + 1) / total) * 100));
                // 大量の場合はUIの更新を少し待つ
                if (total > 50 && i % 10 === 0) {
                    await new Promise(function (r) { return setTimeout(r, 1); });
                }
            }

            setQrCodes(results);
            setIsGenerating(false);
            if (!abortRef.current) {
                antd.message.success(results.length + '個のQRコードを生成しました。');
            }
        }

        // --- 個別ダウンロード ---
        function handleDownloadOne(qr, index) {
            if (!qr.dataURL) {
                antd.message.error('このQRコードは生成に失敗しています。');
                return;
            }
            var blob = dataURLtoBlob(qr.dataURL);
            var filename = 'qr_' + sanitizeFilename(qr.text) + '_' + (index + 1) + '.png';
            saveAs(blob, filename);
        }

        // --- クリップボードにコピー ---
        async function handleCopyOne(qr) {
            if (!qr.dataURL) {
                antd.message.error('このQRコードは生成に失敗しています。');
                return;
            }
            try {
                var blob = dataURLtoBlob(qr.dataURL);
                // ClipboardItem に対応している場合
                if (typeof ClipboardItem !== 'undefined' && navigator.clipboard.write) {
                    var item = new ClipboardItem({ 'image/png': blob });
                    await navigator.clipboard.write([item]);
                    antd.message.success('クリップボードにコピーしました。');
                } else {
                    // フォールバック: DataURL をテキストとしてコピー
                    await navigator.clipboard.writeText(qr.dataURL);
                    antd.message.success('画像データをコピーしました。');
                }
            } catch (err) {
                antd.message.error('コピーに失敗しました: ' + err.message);
            }
        }

        // --- 一括ダウンロード (ZIP) ---
        async function handleDownloadAll() {
            var validCodes = qrCodes.filter(function (q) { return q.dataURL; });
            if (validCodes.length === 0) {
                antd.message.warning('ダウンロード可能なQRコードがありません。');
                return;
            }

            antd.message.loading({ content: 'ZIPファイルを作成中...', key: 'zip-download', duration: 0 });

            try {
                var zip = new JSZip();
                var folder = zip.folder('qr-codes');

                for (var i = 0; i < validCodes.length; i++) {
                    var blob = dataURLtoBlob(validCodes[i].dataURL);
                    var filename = 'qr_' + String(i + 1).padStart(3, '0') + '_' +
                                   sanitizeFilename(validCodes[i].text) + '.png';
                    folder.file(filename, blob);
                }

                var content = await zip.generateAsync({
                    type: 'blob',
                    compression: 'DEFLATE',
                    compressionOptions: { level: 6 },
                }, function (metadata) {
                    // ZIP生成進捗（オプション）
                });

                saveAs(content, 'qr-codes_' + validCodes.length + 'items.zip');
                antd.message.success({ content: validCodes.length + '個のQRコードをZIPでダウンロードしました。', key: 'zip-download' });
            } catch (err) {
                antd.message.error({ content: 'ZIP作成に失敗しました: ' + err.message, key: 'zip-download' });
            }
        }

        // --- クリア ---
        function handleClear() {
            abortRef.current = true;
            setQrCodes([]);
            setProgress(0);
            setIsGenerating(false);
            antd.message.info('クリアしました。');
        }

        // ========================================
        // UI描画
        // ========================================

        return html`
            <div className="app-container">
                <!-- ヘッダー -->
                <header className="app-header">
                    <h1>
                        <span className="header-icon">📱</span>
                        QRコード一括生成
                    </h1>
                    <p>リストを入力してQRコードを一括生成。カラー・サイズ・エラー訂正レベルをカスタマイズできます。</p>
                </header>

                <!-- メインコンテンツ -->
                <main className="main-content">

                    <!-- 入力・設定パネル -->
                    <div className="config-panel">
                        <!-- コンテンツタイプタブ -->
                        <div className="config-row">
                            <span className="config-row-label">コンテンツタイプ</span>
                            <div className="preset-themes">
                                ${CONTENT_TYPES.map(function (ct) {
                                    return html`
                                        <button
                                            key=${ct.key}
                                            className=${'preset-theme-btn' + (contentType === ct.key ? ' active' : '')}
                                            onClick=${function () { setContentType(ct.key); }}
                                        >
                                            <span>${ct.icon}</span>
                                            <span>${ct.label}</span>
                                        </button>
                                    `;
                                })}
                            </div>
                            ${contentType !== 'text' && html`
                                <div className="content-type-form mt-4">
                                    <${Text} type="secondary">
                                        ${contentType === 'url' && 'URL形式のテキストとしてQRコードを生成します。（https:// がない場合は自動付与）'}
                                        ${contentType === 'wifi' && '各行のテキストをWiFi SSIDとしてQRコードを生成します。'}
                                        ${contentType === 'vcard' && '各行のテキストを名前としてvCard形式のQRコードを生成します。'}
                                        ${contentType === 'email' && 'メールアドレスとしてQRコードを生成します。'}
                                    </${Text}>
                                </div>
                            `}
                        </div>

                        <${Divider} style=${{ margin: '16px 0' }} />

                        <!-- テキスト入力 -->
                        <div className="config-row">
                            <span className="config-row-label">データ入力（1行につき1つのQRコード）</span>
                            <${TextArea}
                                className="input-textarea"
                                value=${inputText}
                                onChange=${function (e) { setInputText(e.target.value); }}
                                placeholder=${'例:\nhttps://example.com\nhttps://google.com\nHello World\nsample@email.com\n...'}
                                rows=${8}
                                autoSize=${{ minRows: 6, maxRows: 20 }}
                            />
                            ${lines.length > 0 && html`
                                <div className="preview-count">
                                    <strong>${lines.length}個</strong>のQRコードを生成します
                                </div>
                            `}
                        </div>

                        <${Divider} style=${{ margin: '16px 0' }} />

                        <!-- カスタマイズ設定 -->
                        <div className="config-row">
                            <span className="config-row-label">カラーテーマ</span>
                            <div className="preset-themes" style=${{ marginBottom: 16 }}>
                                ${COLOR_PRESETS.map(function (preset) {
                                    return html`
                                        <button
                                            key=${preset.key}
                                            className=${'preset-theme-btn' + (activePreset === preset.key ? ' active' : '')}
                                            onClick=${function () { handlePresetChange(preset); }}
                                        >
                                            <span className="theme-color-dots">
                                                <span className="theme-color-dot" style=${{ background: preset.fg }}></span>
                                                <span className="theme-color-dot" style=${{ background: preset.bg, border: '1px solid #ddd' }}></span>
                                            </span>
                                            <span>${preset.name}</span>
                                        </button>
                                    `;
                                })}
                            </div>

                            <div className="color-picker-group">
                                <div className="color-picker-item">
                                    <label>前景色（QR本体）</label>
                                    <div className="color-input-wrapper">
                                        <input
                                            type="color"
                                            value=${fgColor}
                                            onChange=${function (e) { handleColorChange('fg', e.target.value); }}
                                        />
                                        <input
                                            type="text"
                                            className="color-hex-input"
                                            value=${fgColor.toUpperCase()}
                                            onChange=${function (e) {
                                                var v = e.target.value;
                                                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
                                                    handleColorChange('fg', v);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="color-picker-item">
                                    <label>背景色</label>
                                    <div className="color-input-wrapper">
                                        <input
                                            type="color"
                                            value=${bgColor}
                                            onChange=${function (e) { handleColorChange('bg', e.target.value); }}
                                        />
                                        <input
                                            type="text"
                                            className="color-hex-input"
                                            value=${bgColor.toUpperCase()}
                                            onChange=${function (e) {
                                                var v = e.target.value;
                                                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) {
                                                    handleColorChange('bg', v);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <${Divider} style=${{ margin: '16px 0' }} />

                        <!-- サイズ・エラー訂正レベル -->
                        <div className="config-row">
                            <span className="config-row-label">サイズとエラー訂正</span>
                            <div className="options-group">
                                <div className="option-item">
                                    <label>サイズ</label>
                                    <${Select}
                                        value=${sizeOption === 0 ? 0 : sizeOption}
                                        onChange=${function (v) { setSizeOption(v); }}
                                        style=${{ width: '100%' }}
                                    >
                                        ${SIZE_OPTIONS.map(function (opt) {
                                            return html`<${Option} key=${opt.value} value=${opt.value}>${opt.label}<//>`;
                                        })}
                                    </${Select}>
                                    ${sizeOption === 0 && html`
                                        <${Input}
                                            type="number"
                                            min=${64}
                                            max=${1024}
                                            value=${customSize}
                                            onChange=${function (e) { setCustomSize(parseInt(e.target.value) || 256); }}
                                            placeholder="64-1024px"
                                            style=${{ marginTop: 8 }}
                                            addonAfter="px"
                                        />
                                    `}
                                </div>
                                <div className="option-item">
                                    <label>エラー訂正レベル</label>
                                    <${Radio.Group}
                                        value=${ecLevel}
                                        onChange=${function (e) { setEcLevel(e.target.value); }}
                                        optionType="button"
                                        buttonStyle="solid"
                                        size="middle"
                                    >
                                        ${EC_LEVELS.map(function (lv) {
                                            return html`
                                                <${Radio.Button} key=${lv.value} value=${lv.value}>${lv.label}<//>
                                            `;
                                        })}
                                    </${Radio.Group}>
                                </div>
                            </div>
                        </div>

                        <${Divider} style=${{ margin: '16px 0' }} />

                        <!-- アクションボタン -->
                        <div className="action-bar">
                            <${Button}
                                type="primary"
                                size="large"
                                className="generate-btn"
                                loading=${isGenerating}
                                disabled=${lines.length === 0}
                                onClick=${handleGenerate}
                                icon=${html`<span>⚡</span>`}
                            >
                                ${isGenerating ? '生成中...' : 'QRコードを生成'}
                            </${Button}>

                            ${qrCodes.length > 0 && html`
                                <${Tooltip} title="すべてのQRコードをZIPでダウンロード">
                                    <${Button}
                                        className="download-all-btn"
                                        size="large"
                                        onClick=${handleDownloadAll}
                                        icon=${html`<span>📦</span>`}
                                    >
                                        すべてダウンロード (ZIP)
                                    </${Button}>
                                </${Tooltip}>
                                <${Button}
                                    danger
                                    size="large"
                                    onClick=${handleClear}
                                    icon=${html`<span>🗑️</span>`}
                                >
                                    クリア
                                </${Button}>
                            `}
                        </div>
                    </div>

                    <!-- 進捗バー -->
                    ${isGenerating && html`
                        <div className="progress-section">
                            <${Progress}
                                percent=${progress}
                                strokeColor=${{ '0%': '#05F380', '100%': '#04d06d' }}
                                status="active"
                            />
                        </div>
                    `}

                    <!-- QRコードグリッド / 空状態 -->
                    ${qrCodes.length > 0 ? html`
                        <div className="qr-grid">
                            ${qrCodes.map(function (qr, idx) {
                                return html`
                                    <div
                                        key=${qr.id}
                                        className="qr-card"
                                        style=${{ animationDelay: Math.min(idx * 30, 1500) + 'ms' }}
                                    >
                                        <div className="qr-card-index">${idx + 1}</div>
                                        <div className="qr-image-container" style=${{ background: qr.encoded ? bgColor : '#f5f5f5' }}>
                                            ${qr.dataURL
                                                ? html`<img src=${qr.dataURL} alt=${'QR Code ' + (idx + 1)} />`
                                                : html`
                                                    <div style=${{ color: '#ff4d4f', fontSize: '0.8rem', padding: 16, textAlign: 'center' }}>
                                                        ⚠️ 生成失敗<br />
                                                        <span style=${{ fontSize: '0.72rem', color: '#999' }}>${qr.error || ''}</span>
                                                    </div>
                                                `
                                            }
                                        </div>
                                        <div className="qr-card-text" title=${qr.text}>
                                            ${qr.text}
                                        </div>
                                        <div className="qr-card-actions">
                                            <${Tooltip} title="PNGでダウンロード">
                                                <button
                                                    className="download-btn"
                                                    disabled=${!qr.dataURL}
                                                    onClick=${function () { handleDownloadOne(qr, idx); }}
                                                >
                                                    💾 DL
                                                </button>
                                            </${Tooltip}>
                                            <${Tooltip} title="クリップボードにコピー">
                                                <button
                                                    className="copy-btn"
                                                    disabled=${!qr.dataURL}
                                                    onClick=${function () { handleCopyOne(qr); }}
                                                >
                                                    📋 コピー
                                                </button>
                                            </${Tooltip}>
                                        </div>
                                    </div>
                                `;
                            })}
                        </div>
                    ` : html`
                        <div className="empty-state">
                            <div className="empty-state-icon">📱</div>
                            <div className="empty-state-title">QRコードがまだ生成されていません</div>
                            <div className="empty-state-desc">
                                上のテキストエリアにURLやテキストを1行ずつ入力し、<br />
                                「QRコードを生成」ボタンを押してください。
                            </div>
                        </div>
                    `}
                </main>

                <!-- フッター -->
                <footer className="app-footer">
                    <div className="app-footer-links">
                        <a href="https://search3958.github.io/" target="_blank" rel="noopener noreferrer">About</a>
                        <a href="https://search3958.github.io/policies/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        <a href="https://search3958.github.io/accounts/lang" target="_blank" rel="noopener noreferrer">Language Settings</a>
                    </div>
                    <div className="app-footer-copyright">© 2025 search3958</div>
                </footer>
            </div>
        `;
    }

    // ========================================
    // Appルートコンポーネント
    // ========================================

    function App() {
        return html`
            <${ConfigProvider} theme=${{
                token: {
                    colorPrimary: '#05F380',
                    colorLink: '#05F380',
                    borderRadius: 8,
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                },
                components: {
                    Button: {
                        primaryShadow: '0 2px 8px rgba(5, 243, 128, 0.3)',
                    },
                    Progress: {
                        defaultColor: '#05F380',
                    },
                },
            }}>
                <${MainContent} />
            <//>
        `;
    }

    // ========================================
    // マウント
    // ========================================

    var rootEl = document.getElementById('root');
    if (rootEl) {
        var root = ReactDOM.createRoot(rootEl);
        root.render(React.createElement(App));
    }

})();
