/* ========================================
   PiPメモ帳 - Google Keep風シンプルメモアプリ
   Picture-in-Picture + フルスクリーン編集対応
   ======================================== */

const html = htm.bind(React.createElement);
const { useState, useEffect, useRef, useCallback, useMemo } = React;

const { ConfigProvider, Button, Input, Popconfirm, Tooltip, Empty, Space } = antd;
const { TextArea } = Input;

// ========================================
// 定数
// ========================================

const STORAGE_KEY = 'pip-memo-data';

/** 一意のID生成 */
function uid() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/** メモの読み込み */
function loadMemos() {
    try {
        const d = localStorage.getItem(STORAGE_KEY);
        return d ? JSON.parse(d) : [];
    } catch (e) {
        return [];
    }
}

/** メモの保存 */
function saveMemos(memos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
}

/** 日付フォーマット */
function fmtDate(ts) {
    if (!ts) return '';
    const d = new Date(ts);
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return 'たった今';
    if (diff < 3600000) return Math.floor(diff / 60000) + '分前';
    if (diff < 86400000) return Math.floor(diff / 3600000) + '時間前';
    if (diff < 172800000) return '昨日';
    return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
}

// ========================================
// メモカードコンポーネント
// ========================================

function MemoCard({ memo, onClick, onDelete }) {
    const preview = memo.content.split('\n').slice(0, 4).join('\n');
    const hasMore = memo.content.split('\n').length > 4;

    return html`
        <div className="memo-card" onClick=${() => onClick(memo.id)}>
            <div className="memo-card-body">
                ${memo.title ? html`<div className="memo-card-title">${memo.title}</div>` : null}
                <div className="memo-card-preview">
                    ${preview}
                    ${hasMore ? html`<span className="memo-card-more">...</span>` : null}
                </div>
            </div>
            <div className="memo-card-footer">
                <span className="memo-card-date">${fmtDate(memo.updatedAt || memo.createdAt)}</span>
                <${Popconfirm}
                    title="このメモを削除しますか？"
                    onConfirm=${(e) => { e.stopPropagation(); onDelete(memo.id); }}
                    onCancel=${(e) => e.stopPropagation()}
                    okText="削除"
                    cancelText="キャンセル"
                    okButtonProps=${{ danger: true }}
                >
                    <${Button}
                        type="text"
                        size="small"
                        className="memo-card-delete"
                        onClick=${(e) => e.stopPropagation()}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    <//>
                <//>
            </div>
        <//>
    `;
}

// ========================================
// フルスクリーンエディタコンポーネント
// ========================================

function FullScreenEditor({ memo, onSave, onDelete, onBack }) {
    const [title, setTitle] = useState(memo.title);
    const [content, setContent] = useState(memo.content);
    const titleRef = useRef(null);
    const saveTimer = useRef(null);

    // 自動保存（デバウンス1秒）
    const autoSave = useCallback((t, c) => {
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
            onSave(memo.id, t, c);
        }, 1000);
    }, [memo.id, onSave]);

    useEffect(() => {
        if (titleRef.current) titleRef.current.focus();
    }, []);

    return html`
        <div className="fullscreen-editor">
            <div className="fs-header">
                <${Button} type="text" onClick=${onBack} className="fs-back-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                    戻る
                <//>
                <div className="fs-header-actions">
                    <${Button}
                        type="text"
                        danger
                        onClick=${() => { onDelete(memo.id); onBack(); }}
                    >削除<//>
                </div>
            </div>
            <div className="fs-body">
                <input
                    ref=${titleRef}
                    className="fs-title"
                    placeholder="タイトル"
                    value=${title}
                    onInput=${(e) => { setTitle(e.target.value); autoSave(e.target.value, content); }}
                />
                <textarea
                    className="fs-content"
                    placeholder="メモを入力..."
                    value=${content}
                    onInput=${(e) => { setContent(e.target.value); autoSave(title, e.target.value); }}
                />
            </div>
            <div className="fs-status">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                自動保存
            </div>
        <//>
    `;
}

// ========================================
// PiPウィンドウ構築
// ========================================

function buildPipWindow(pipDoc, memos, onUpdate, onCreate, onDelete, onSelect) {
    // スタイルの注入
    const style = pipDoc.createElement('style');
    style.textContent = `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #fff; color: #1a1a1a; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        .pip-header { display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid #f0f0f0; flex-shrink: 0; }
        .pip-header-title { font-size: 14px; font-weight: 600; }
        .pip-btn { background: #05F380; color: #000; border: none; border-radius: 6px; padding: 4px 12px; font-size: 12px; font-weight: 600; cursor: pointer; }
        .pip-btn:hover { background: #04d06e; }
        .pip-list { flex: 1; overflow-y: auto; padding: 8px; }
        .pip-item { padding: 10px 12px; border: 1px solid #f0f0f0; border-radius: 8px; margin-bottom: 6px; cursor: pointer; transition: all 0.15s; }
        .pip-item:hover { border-color: #05F380; background: #f0fff7; }
        .pip-item-title { font-size: 13px; font-weight: 600; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .pip-item-preview { font-size: 12px; color: #888; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .pip-item-date { font-size: 10px; color: #bbb; margin-top: 4px; }
        .pip-editor { display: none; flex-direction: column; height: 100%; padding: 12px; }
        .pip-editor.active { display: flex; }
        .pip-list.hidden { display: none; }
        .pip-editor-title { font-size: 14px; font-weight: 600; border: none; outline: none; padding: 4px 0; margin-bottom: 8px; border-bottom: 2px solid #05F380; }
        .pip-editor-content { flex: 1; border: none; outline: none; resize: none; font-size: 13px; line-height: 1.6; font-family: inherit; }
        .pip-editor-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 8px; border-top: 1px solid #f0f0f0; margin-top: 8px; }
        .pip-editor-footer span { font-size: 10px; color: #bbb; }
        .pip-back { background: none; border: 1px solid #d9d9d9; border-radius: 6px; padding: 4px 12px; font-size: 12px; cursor: pointer; }
        .pip-back:hover { border-color: #05F380; color: #05F380; }
        .pip-empty { text-align: center; padding: 40px 16px; color: #bbb; font-size: 13px; }
    `;
    pipDoc.head.appendChild(style);

    // ヘッダー
    const header = pipDoc.createElement('div');
    header.className = 'pip-header';

    const titleEl = pipDoc.createElement('span');
    titleEl.className = 'pip-header-title';
    titleEl.textContent = 'メモ帳';

    const newBtn = pipDoc.createElement('button');
    newBtn.className = 'pip-btn';
    newBtn.textContent = '+ 新規';

    header.appendChild(titleEl);
    header.appendChild(newBtn);
    pipDoc.body.appendChild(header);

    // リスト
    const listEl = pipDoc.createElement('div');
    listEl.className = 'pip-list';
    pipDoc.body.appendChild(listEl);

    // エディタ
    const editorEl = pipDoc.createElement('div');
    editorEl.className = 'pip-editor';
    editorEl.innerHTML = `
        <input class="pip-editor-title" placeholder="タイトル" />
        <textarea class="pip-editor-content" placeholder="メモを入力..."></textarea>
        <div class="pip-editor-footer">
            <button class="pip-back">← 戻る</button>
            <span>自動保存</span>
        </div>
    `;
    pipDoc.body.appendChild(editorEl);

    const editorTitle = editorEl.querySelector('.pip-editor-title');
    const editorContent = editorEl.querySelector('.pip-editor-content');
    const backBtn = editorEl.querySelector('.pip-back');
    let currentEditId = null;
    let saveTimer = null;

    // リスト描画
    function renderList() {
        listEl.innerHTML = '';
        if (memos.length === 0) {
            listEl.innerHTML = '<div class="pip-empty">メモがありません</div>';
            return;
        }
        memos.forEach(m => {
            const item = pipDoc.createElement('div');
            item.className = 'pip-item';
            const title = m.title || '無題';
            const preview = m.content.split('\n')[0] || '';
            item.innerHTML = `
                <div class="pip-item-title">${title}</div>
                <div class="pip-item-preview">${preview}</div>
                <div class="pip-item-date">${fmtDate(m.updatedAt || m.createdAt)}</div>
            `;
            item.addEventListener('click', () => openEditor(m.id));
            listEl.appendChild(item);
        });
    }

    // エディタを開く
    function openEditor(id) {
        const m = memos.find(x => x.id === id);
        if (!m) return;
        currentEditId = id;
        editorTitle.value = m.title;
        editorContent.value = m.content;
        listEl.classList.add('hidden');
        editorEl.classList.add('active');
        editorTitle.focus();
    }

    // エディタを閉じる
    function closeEditor() {
        if (currentEditId && saveTimer) clearTimeout(saveTimer);
        listEl.classList.remove('hidden');
        editorEl.classList.remove('active');
        currentEditId = null;
        renderList();
    }

    // 自動保存
    function pipAutoSave() {
        if (!currentEditId) return;
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
            onUpdate(currentEditId, editorTitle.value, editorContent.value);
            renderList();
        }, 800);
    }

    editorTitle.addEventListener('input', pipAutoSave);
    editorContent.addEventListener('input', pipAutoSave);
    backBtn.addEventListener('click', closeEditor);
    newBtn.addEventListener('click', () => {
        const newId = onCreate();
        openEditor(newId);
    });

    renderList();

    // 外部からmemosを更新するためのメソッド
    return {
        updateMemos(newMemos) {
            memos.length = 0;
            newMemos.forEach(m => memos.push(m));
            if (!currentEditId) renderList();
        }
    };
}

// ========================================
// ドラッグ可能なフローティングパネル（フォールバック）
// ========================================

function FloatingPanel({ memos, onCreateMemo, onUpdateMemo, onDeleteMemo, onClose }) {
    const panelRef = useRef(null);
    const dragRef = useRef({ startX: 0, startY: 0, origX: 0, origY: 0, dragging: false });
    const [pos, setPos] = useState({ x: window.innerWidth - 440, y: 60 });
    const [size, setSize] = useState({ w: 420, h: 520 });
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [searchText, setSearchText] = useState('');
    const saveTimer = useRef(null);

    const editMemo = useMemo(() => memos.find(m => m.id === editId), [memos, editId]);

    // ドラッグ開始
    const onDragStart = useCallback((e) => {
        e.preventDefault();
        dragRef.current = { startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y, dragging: true };
        const onMove = (ev) => {
            if (!dragRef.current.dragging) return;
            setPos({
                x: dragRef.current.origX + (ev.clientX - dragRef.current.startX),
                y: dragRef.current.origY + (ev.clientY - dragRef.current.startY)
            });
        };
        const onUp = () => {
            dragRef.current.dragging = false;
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    }, [pos]);

    // メモを開く
    const openMemo = useCallback((id) => {
        const m = memos.find(x => x.id === id);
        if (m) { setEditId(id); setEditTitle(m.title); setEditContent(m.content); }
    }, [memos]);

    // 自動保存
    const autoSave = useCallback((t, c) => {
        if (!editId) return;
        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => onUpdateMemo(editId, t, c), 800);
    }, [editId, onUpdateMemo]);

    // リストに戻る
    const backToList = useCallback(() => {
        setEditId(null);
    }, []);

    // フィルタリング
    const filtered = useMemo(() => {
        if (!searchText.trim()) return memos;
        const q = searchText.toLowerCase();
        return memos.filter(m => (m.title + m.content).toLowerCase().includes(q));
    }, [memos, searchText]);

    return html`
        <div
            ref=${panelRef}
            className="floating-panel"
            style=${{ left: pos.x + 'px', top: pos.y + 'px', width: size.w + 'px', height: size.h + 'px' }}
        >
            <div className="fp-header" onMouseDown=${onDragStart}>
                <span className="fp-title">メモ帳</span>
                <div className="fp-header-btns">
                    ${!editId ? html`
                        <${Button} type="text" size="small" onClick=${() => { const id = onCreateMemo(); openMemo(id); }} style=${{ color: '#05F380' }}>
                            + 新規
                        <//>
                    ` : null}
                    <${Button} type="text" size="small" onClick=${onClose}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    <//>
                </div>
            </div>
            <div className="fp-body">
                ${editId ? html`
                    <div className="fp-editor">
                        <${Button} type="text" size="small" onClick=${backToList} className="fp-back-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
                            戻る
                        <//>
                        <input
                            className="fp-edit-title"
                            placeholder="タイトル"
                            value=${editTitle}
                            onInput=${(e) => { setEditTitle(e.target.value); autoSave(e.target.value, editContent); }}
                        />
                        <textarea
                            className="fp-edit-content"
                            placeholder="メモを入力..."
                            value=${editContent}
                            onInput=${(e) => { setEditContent(e.target.value); autoSave(editTitle, e.target.value); }}
                        />
                        <div className="fp-editor-status">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#05F380" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                            自動保存
                        </div>
                    <//>
                ` : html`
                    <div className="fp-list">
                        <${Input}
                            placeholder="検索..."
                            size="small"
                            value=${searchText}
                            onInput=${(e) => setSearchText(e.target.value)}
                            allowClear
                        />
                        <div className="fp-memos">
                            ${filtered.length === 0 ? html`
                                <div className="fp-empty">メモがありません</div>
                            ` : filtered.map(m => html`
                                <div key=${m.id} className="fp-memo-item" onClick=${() => openMemo(m.id)}>
                                    <div className="fp-memo-title">${m.title || '無題'}</div>
                                    <div className="fp-memo-preview">${m.content.split('\n')[0] || ''}</div>
                                <//>
                            `)}
                        <//>
                    </div>
                `}
            </div>
        <//>
    `;
}

// ========================================
// メインコンテンツ
// ========================================

function MainContent() {
    const message = antd.message;
    const [memos, setMemos] = useState(loadMemos);
    const [fullScreenId, setFullScreenId] = useState(null);
    const [showFloat, setShowFloat] = useState(false);
    const [searchText, setSearchText] = useState('');
    const pipRef = useRef(null);

    // memos変更時に保存
    useEffect(() => { saveMemos(memos); }, [memos]);

    // PiPのコールバックref用memos
    const memosRef = useRef(memos);
    useEffect(() => { memosRef.current = memos; }, [memos]);

    /** メモ作成 */
    const createMemo = useCallback(() => {
        const m = { id: uid(), title: '', content: '', createdAt: Date.now(), updatedAt: Date.now() };
        setMemos(prev => [m, ...prev]);
        message.success('メモを作成しました');
        return m.id;
    }, [message]);

    /** メモ更新 */
    const updateMemo = useCallback((id, title, content) => {
        setMemos(prev => prev.map(m => m.id === id ? { ...m, title, content, updatedAt: Date.now() } : m));
    }, []);

    /** メモ削除 */
    const deleteMemo = useCallback((id) => {
        setMemos(prev => prev.filter(m => m.id !== id));
        if (fullScreenId === id) setFullScreenId(null);
        message.success('メモを削除しました');
    }, [fullScreenId, message]);

    /** PiPで開く */
    const openPiP = useCallback(async () => {
        // Document Picture-in-Picture APIを試行
        if ('documentPictureInPicture' in window) {
            try {
                const pipWindow = await window.documentPictureInPicture.requestWindow({
                    width: 420,
                    height: 550
                });
                const currentMemos = [...memosRef.current];
                const controller = buildPipWindow(
                    pipWindow.document,
                    currentMemos,
                    (id, title, content) => {
                        updateMemo(id, title, content);
                        if (controller) controller.updateMemos(memosRef.current);
                    },
                    () => {
                        const id = createMemo();
                        return id;
                    },
                    (id) => {
                        deleteMemo(id);
                        if (controller) controller.updateMemos(memosRef.current);
                    },
                    (id) => {}
                );
                pipRef.current = controller;

                // memosが変更されたらPiPにも反映
                const origSetMemos = setMemos;
                // MutationObserverではなく定期的に同期
                const syncInterval = setInterval(() => {
                    if (pipWindow.document.visibilityState !== undefined || true) {
                        try {
                            controller.updateMemos(memosRef.current);
                        } catch(e) {
                            clearInterval(syncInterval);
                        }
                    }
                }, 2000);

                pipWindow.addEventListener('pagehide', () => {
                    clearInterval(syncInterval);
                    pipRef.current = null;
                });

                return;
            } catch (e) {
                console.warn('PiP open failed, using fallback:', e);
            }
        }
        // フォールバック: フローティングパネル
        setShowFloat(true);
    }, [updateMemo, createMemo, deleteMemo]);

    /** フィルタリング */
    const filteredMemos = useMemo(() => {
        if (!searchText.trim()) return memos;
        const q = searchText.toLowerCase();
        return memos.filter(m => (m.title + m.content).toLowerCase().includes(q));
    }, [memos, searchText]);

    // フルスクリーン対象
    const fsMemo = useMemo(() => memos.find(m => m.id === fullScreenId), [memos, fullScreenId]);

    return html`
        <div className="pip-memo-app">
            <!-- ヘッダー -->
            <header className="app-header">
                <div className="app-header-left">
                    <h1 className="app-title">メモ帳</h1>
                    <span className="app-count">${memos.length}件</span>
                </div>
                <div className="app-header-right">
                    <${Input}
                        placeholder="メモを検索..."
                        className="app-search"
                        value=${searchText}
                        onInput=${(e) => setSearchText(e.target.value)}
                        allowClear
                        prefix=${html`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`}
                    />
                    <${Tooltip} title="Picture-in-Pictureで開く">
                        <${Button} type="primary" onClick=${openPiP} icon=${html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><rect x="12" y="9" width="8" height="6" rx="1" fill="currentColor" opacity="0.3"/><line x1="2" y1="21" x2="22" y2="21" opacity="0.3"/></svg>`}>
                            PiP
                        <//>
                    <//>
                    <${Button} type="primary" onClick=${createMemo}>
                        + 新規メモ
                    <//>
                </div>
            </header>

            <!-- メモ一覧 -->
            <main className="memo-grid-container">
                ${filteredMemos.length === 0 ? html`
                    <div className="memo-empty-state">
                        <${Empty}
                            description=${searchText ? '見つかりませんでした' : 'メモを作成しましょう'}
                            image=${Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    </div>
                ` : filteredMemos.map(m => html`
                    <${MemoCard}
                        key=${m.id}
                        memo=${m}
                        onClick=${(id) => setFullScreenId(id)}
                        onDelete=${deleteMemo}
                    />
                `)}
            </main>

            <!-- フルスクリーンエディタ -->
            ${fsMemo ? html`
                <${FullScreenEditor}
                    memo=${fsMemo}
                    onSave=${updateMemo}
                    onDelete=${deleteMemo}
                    onBack=${() => setFullScreenId(null)}
                />
            ` : null}

            <!-- フローティングパネル（PiP非対応時） -->
            ${showFloat ? html`
                <${FloatingPanel}
                    memos=${memos}
                    onCreateMemo=${createMemo}
                    onUpdateMemo=${updateMemo}
                    onDeleteMemo=${deleteMemo}
                    onClose=${() => setShowFloat(false)}
                />
            ` : null}

            <!-- フッター -->
            <footer className="app-footer">
                <a href="https://search3958.github.io/" target="_blank" rel="noopener">About</a>
                <a href="https://search3958.github.io/policies/" target="_blank" rel="noopener">プライバシーポリシー</a>
                <a href="https://search3958.github.io/accounts/lang" target="_blank" rel="noopener">言語設定</a>
                <span className="footer-copy">© 2025 search3958</span>
            </footer>
        </div>
    `;
}

// ========================================
// アプリ初期化
// ========================================

function App() {
    return html`
        <${ConfigProvider} theme=${{
            token: { colorPrimary: '#05F380', borderRadius: 8 }
        }}>
            <${MainContent} />
        <//>
    `;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));