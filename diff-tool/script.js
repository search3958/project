/**
 * テキスト差分比較ツール - メインスクリプト
 * React + htm + Ant Design + jsdiff を使用
 */

const html = htm.bind(React.createElement);
const { useState, useEffect, useRef, useCallback, useMemo } = React;
const { Button, Tooltip, Tag, Segmented } = antd;

// ========================================
// 定数・ユーティリティ
// ========================================

/** 大きなテキストの警告閾値（行数） */
const LARGE_TEXT_THRESHOLD = 10000;

/**
 * テキストを行配列に分割
 */
function splitLines(text) {
    if (!text) return [];
    return text.replace(/\r\n/g, '\n').split('\n');
}

/**
 * 統一diffフォーマットを生成
 */
function generateUnifiedDiff(changes) {
    const lines = ['--- original', '+++ modified'];
    for (const change of changes) {
        if (change.type === 'unchanged') {
            lines.push(' ' + (change.value || ''));
        } else if (change.type === 'added') {
            lines.push('+' + (change.value || ''));
        } else if (change.type === 'removed') {
            lines.push('-' + (change.value || ''));
        }
    }
    return lines.join('\n');
}

/**
 * 単語レベルの差分を取得（変更行のハイライト用）
 */
function getWordDiffs(oldStr, newStr) {
    try {
        return Diff.diffWords(oldStr, newStr);
    } catch (e) {
        return null;
    }
}

/**
 * 単語差分をHTMLスパンにレンダリング
 */
function renderWordDiffs(wordDiffs, type) {
    if (!wordDiffs) return null;
    const className = type === 'added' ? 'diff-word-added' : 'diff-word-removed';
    return wordDiffs.map((part, i) => {
        if (part.added || part.removed) {
            return html`<span key=${i} className=${className}>${part.value}</span>`;
        }
        return html`<span key=${i}>${part.value}</span>`;
    });
}

// ========================================
// 断片マッチングアルゴリズム
// ========================================

/** 共通キーワード（変数名から除外） */
const RESERVED_WORDS = new Set([
    'if', 'else', 'for', 'while', 'switch', 'case', 'return', 'try', 'catch',
    'finally', 'new', 'this', 'super', 'class', 'function', 'async', 'await',
    'import', 'export', 'default', 'from', 'true', 'false', 'null', 'undefined',
    'break', 'continue', 'do', 'in', 'of', 'throw', 'typeof', 'instanceof',
    'void', 'delete', 'yield', 'const', 'let', 'var', 'with', 'debugger',
    'int', 'str', 'self', 'print', 'def', 'elif', 'except', 'pass', 'raise',
    'None', 'True', 'False', 'float', 'bool', 'list', 'dict', 'set', 'tuple',
    'public', 'private', 'protected', 'static', 'final', 'abstract', 'extends',
    'implements', 'interface', 'package', 'throws'
]);

/**
 * テキストから構文要素を抽出
 */
function extractSyntaxElements(text) {
    const elements = {
        functions: [],
        classes: [],
        imports: [],
        variables: [],
        signatures: [],
    };

    const lines = splitLines(text);

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        // 関数検出
        const funcMatch = trimmed.match(
            /(?:function\s+(\w+)\s*\(|(\w+)\s*=\s*(?:async\s+)?(?:function|\([^)]*\)\s*=>)|(?:async\s+)?(\w+)\s*\([^)]*\)\s*\{|(\w+)\s*:\s*function\s*\(|def\s+(\w+)\s*\()/
        );
        if (funcMatch) {
            const name = funcMatch[1] || funcMatch[2] || funcMatch[3] || funcMatch[4] || funcMatch[5];
            if (name && !RESERVED_WORDS.has(name) && !elements.functions.includes(name)) {
                elements.functions.push(name);
            }
        }

        // クラス検出
        const classMatch = trimmed.match(/class\s+(\w+)/);
        if (classMatch) {
            const name = classMatch[1];
            if (!RESERVED_WORDS.has(name) && !elements.classes.includes(name)) {
                elements.classes.push(name);
            }
        }

        // インポート検出
        if (/^(?:import|from)\s+/.test(trimmed) || /^#include\s+/.test(trimmed) || /^using\s+/.test(trimmed)) {
            elements.imports.push(trimmed);
        }

        // 変数検出
        const varRegex = /(?:const|let|var|private|public|protected)\s+(\w+)/g;
        let varMatch;
        while ((varMatch = varRegex.exec(trimmed)) !== null) {
            const name = varMatch[1];
            if (!RESERVED_WORDS.has(name) && !elements.variables.includes(name)) {
                elements.variables.push(name);
            }
        }

        // 行シグネチャ
        elements.signatures.push(trimmed.substring(0, 40));
    }

    return elements;
}

/**
 * 簡易類似度計算
 */
function computeSimilarity(a, b) {
    if (!a || !b) return 0;
    const aL = a.toLowerCase();
    const bL = b.toLowerCase();
    let matches = 0;
    const len = Math.max(aL.length, bL.length);
    if (len === 0) return 0;
    for (let i = 0; i < Math.min(aL.length, bL.length); i++) {
        if (aL[i] === bL[i]) matches++;
    }
    return matches / len;
}

/**
 * フラグメントのベストマッチ位置を検索
 * @returns {Object|null} マッチ結果
 */
function findBestMatch(fragment, originalText) {
    const origLines = splitLines(originalText);
    const fragLines = splitLines(fragment);

    if (fragLines.length === 0 || origLines.length === 0) return null;

    const fragElements = extractSyntaxElements(fragment);
    const candidates = [];

    // 1. 関数名で検索（スコア: 10）
    for (const funcName of fragElements.functions) {
        for (let i = 0; i < origLines.length; i++) {
            if (origLines[i].includes(funcName)) {
                candidates.push({ line: i, score: 10, id: funcName, type: 'function' });
            }
        }
    }

    // 2. クラス名で検索（スコア: 10）
    for (const className of fragElements.classes) {
        for (let i = 0; i < origLines.length; i++) {
            if (origLines[i].includes(className)) {
                candidates.push({ line: i, score: 10, id: className, type: 'class' });
            }
        }
    }

    // 3. 一意の変数名で検索（スコア: 5）
    for (const varName of fragElements.variables) {
        const origCount = origLines.filter(l => l.includes(varName)).length;
        const fragCount = fragLines.filter(l => l.includes(varName)).length;
        if (origCount <= 3 && origCount > 0 && fragCount > 0) {
            for (let i = 0; i < origLines.length; i++) {
                if (origLines[i].includes(varName)) {
                    candidates.push({ line: i, score: 5, id: varName, type: 'variable' });
                }
            }
        }
    }

    // 4. 行シグネチャで検索（スコア: 8）
    for (const sig of fragElements.signatures) {
        if (sig.length < 5) continue;
        for (let i = 0; i < origLines.length; i++) {
            if (origLines[i].trim().substring(0, 40) === sig) {
                candidates.push({ line: i, score: 8, id: sig.substring(0, 20), type: 'signature' });
            }
        }
    }

    // 5. フォールバック: 類似度ベース
    if (candidates.length === 0) {
        const searchKey = fragLines.slice(0, Math.min(3, fragLines.length)).join('\n').trim();
        if (searchKey.length > 0) {
            const windowSize = Math.min(2, fragLines.length);
            for (let i = 0; i <= origLines.length - windowSize; i++) {
                const w = origLines.slice(i, i + windowSize).join('\n').trim();
                const sim = computeSimilarity(searchKey.substring(0, 100), w.substring(0, 100));
                if (sim > 0.3) {
                    candidates.push({ line: i, score: sim * 5, id: 'similarity', type: 'fuzzy' });
                }
            }
        }
    }

    if (candidates.length === 0) return null;

    // 候補をクラスタリング
    candidates.sort((a, b) => a.line - b.line);
    const clusters = [];
    let cur = { lines: [candidates[0]], totalScore: candidates[0].score, ids: [candidates[0].id] };

    for (let i = 1; i < candidates.length; i++) {
        const prevLine = cur.lines[cur.lines.length - 1].line;
        if (candidates[i].line - prevLine <= fragLines.length + 5) {
            cur.lines.push(candidates[i]);
            cur.totalScore += candidates[i].score;
            if (!cur.ids.includes(candidates[i].id)) cur.ids.push(candidates[i].id);
        } else {
            clusters.push(cur);
            cur = { lines: [candidates[i]], totalScore: candidates[i].score, ids: [candidates[i].id] };
        }
    }
    clusters.push(cur);

    // 最良クラスタを選択
    clusters.sort((a, b) => b.totalScore - a.totalScore);
    const best = clusters[0];

    const clusterLines = best.lines.map(c => c.line);
    const minLine = Math.min(...clusterLines);
    const maxLine = Math.max(...clusterLines);

    const startLine = Math.max(0, minLine - 2);
    const endLine = Math.min(origLines.length - 1, Math.max(maxLine, minLine + fragLines.length - 1) + 2);

    // 信頼度
    const scoreThreshold = fragLines.length * 3;
    let confidence;
    if (best.totalScore >= scoreThreshold) confidence = 'high';
    else if (best.totalScore >= scoreThreshold * 0.3) confidence = 'medium';
    else confidence = 'low';

    return {
        startLine,
        endLine,
        confidence,
        contextBefore: origLines.slice(Math.max(0, startLine - 3), startLine),
        contextAfter: origLines.slice(endLine + 1, Math.min(origLines.length, endLine + 4)),
        matchedIdentifiers: best.ids.filter(id => id !== 'similarity'),
        score: best.totalScore,
        matchCount: best.lines.length
    };
}

/**
 * 断片を元テキストに適用
 */
function applyFragment(originalText, fragment, matchResult) {
    if (!matchResult) return originalText;
    const origLines = splitLines(originalText);
    const fragLines = splitLines(fragment);
    const before = origLines.slice(0, matchResult.startLine);
    const after = origLines.slice(matchResult.endLine + 1);
    return [...before, ...fragLines, ...after].join('\n');
}

// ========================================
// React コンポーネント
// ========================================

/**
 * ファイルドロップ対応テキストエリア
 */
function DropTextArea({ value, onChange, placeholder, label }) {
    const [dragOver, setDragOver] = useState(false);

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
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = (evt) => onChange(evt.target.result);
            reader.readAsText(files[0]);
        }
    }, [onChange]);

    return html`
        <div className=${'text-area-wrapper' + (dragOver ? ' drag-over' : '')}>
            <div className="text-area-label">
                <span>${label}</span>
                <span className="drop-hint">ファイルをドラッグ＆ドロップ</span>
            </div>
            <textarea
                value=${value}
                onInput=${(e) => onChange(e.target.value)}
                placeholder=${placeholder}
                onDragOver=${handleDragOver}
                onDragLeave=${handleDragLeave}
                onDrop=${handleDrop}
                spellCheck=${false}
            />
        </div>
    `;
}

/**
 * 差分行コンポーネント
 */
function DiffLine({ type, lineNum, content, wordDiffs }) {
    const rowClass = type === 'added' ? 'diff-row-added'
        : type === 'removed' ? 'diff-row-removed'
        : type === 'changed' ? 'diff-row-changed'
        : type === 'placeholder' ? 'diff-row-placeholder'
        : 'diff-row-unchanged';

    const prefix = type === 'added' ? '+' : type === 'removed' ? '-' : type === 'changed' ? '~' : ' ';

    const renderedContent = wordDiffs
        ? renderWordDiffs(wordDiffs, type)
        : prefix + (content || '');

    return html`
        <div className=${'diff-row ' + rowClass}>
            <div className="diff-line-num">${lineNum || ''}</div>
            <div className="diff-line-content">${renderedContent}</div>
        </div>
    `;
}

/**
 * 折りたたみ可能セクション
 */
function CollapsibleSection({ lineCount, children }) {
    const [collapsed, setCollapsed] = useState(false);

    return html`
        <div className="diff-collapsible-section">
            <button
                className="diff-collapsible-toggle"
                onClick=${() => setCollapsed(!collapsed)}
            >
                <span className=${'toggle-arrow' + (collapsed ? '' : ' expanded')}>▶</span>
                <span>${lineCount}行の変更なし${collapsed ? '' : ' (折りたたむ)'}</span>
            </button>
            ${!collapsed && html`<div className="diff-collapsible-content">${children}</div>`}
        </div>
    `;
}

/**
 * 差分行配列を折りたたみ可能なチャンクに分割
 */
function chunkDiffRows(rows) {
    const chunks = [];
    let unchangedBuffer = [];

    for (const row of rows) {
        if (row.type === 'unchanged') {
            unchangedBuffer.push(row);
        } else {
            // 変更行に遭遇 → バッファをフラッシュ
            if (unchangedBuffer.length > 0) {
                if (unchangedBuffer.length > CONTEXT_LINES * 2) {
                    // コンテキスト行 + 折りたたみ
                    const before = unchangedBuffer.slice(0, CONTEXT_LINES);
                    const collapsed = unchangedBuffer.slice(CONTEXT_LINES, unchangedBuffer.length - CONTEXT_LINES);
                    const after = unchangedBuffer.slice(unchangedBuffer.length - CONTEXT_LINES);
                    before.forEach(r => chunks.push({ type: 'line', row: r }));
                    chunks.push({ type: 'collapsed', lines: collapsed });
                    after.forEach(r => chunks.push({ type: 'line', row: r }));
                } else {
                    unchangedBuffer.forEach(r => chunks.push({ type: 'line', row: r }));
                }
                unchangedBuffer = [];
            }
            chunks.push({ type: 'line', row: row });
        }
    }

    // 残りの未変更行
    if (unchangedBuffer.length > 0) {
        if (unchangedBuffer.length > CONTEXT_LINES * 2) {
            const before = unchangedBuffer.slice(0, CONTEXT_LINES);
            const collapsed = unchangedBuffer.slice(CONTEXT_LINES, unchangedBuffer.length - CONTEXT_LINES);
            const after = unchangedBuffer.slice(unchangedBuffer.length - CONTEXT_LINES);
            before.forEach(r => chunks.push({ type: 'line', row: r }));
            chunks.push({ type: 'collapsed', lines: collapsed });
            after.forEach(r => chunks.push({ type: 'line', row: r }));
        } else {
            unchangedBuffer.forEach(r => chunks.push({ type: 'line', row: r }));
        }
    }

    return chunks;
}

/**
 * サイドバイサイド表示
 */
function SideBySideView({ leftRows, rightRows }) {
    const leftChunks = chunkDiffRows(leftRows);
    const rightChunks = chunkDiffRows(rightRows);
    return html`
        <div className="diff-side-by-side">
            <div className="diff-pane diff-pane-left">
                ${leftChunks.map((chunk, i) =>
                    chunk.type === 'collapsed'
                        ? html`<${CollapsibleSection} key=${'LC' + i} lineCount=${chunk.lines.length}>
                            ${chunk.lines.map((r, j) => html`<${DiffLine} key=${j} ...${r} />`)}
                        <//>`
                        : html`<${DiffLine} key=${'LL' + i} ...${chunk.row} />`
                )}
            </div>
            <div className="diff-pane">
                ${rightChunks.map((chunk, i) =>
                    chunk.type === 'collapsed'
                        ? html`<${CollapsibleSection} key=${'RC' + i} lineCount=${chunk.lines.length}>
                            ${chunk.lines.map((r, j) => html`<${DiffLine} key=${j} ...${r} />`)}
                        <//>`
                        : html`<${DiffLine} key=${'RL' + i} ...${chunk.row} />`
                )}
            </div>
        </div>
    `;
}

/**
 * 統一表示
 */
function UnifiedView({ rows }) {
    const chunks = chunkDiffRows(rows);
    return html`
        <div className="diff-unified">
            ${chunks.map((chunk, i) =>
                chunk.type === 'collapsed'
                    ? html`<${CollapsibleSection} key=${'UC' + i} lineCount=${chunk.lines.length}>
                        ${chunk.lines.map((r, j) => html`<${DiffLine} key=${j} ...${r} />`)}
                    <//>`
                    : html`<${DiffLine} key=${'UL' + i} ...${chunk.row} />`
            )}
        </div>
    `;
}

/**
 * 差分表示エリア
 */
function DiffDisplay({ diffResult, viewMode }) {
    if (!diffResult) {
        return html`
            <div className="diff-display-container">
                <div className="diff-empty-state">
                    <div className="empty-icon">⟨⟩</div>
                    <div className="empty-text">比較結果がここに表示されます</div>
                    <div className="empty-subtext">左側に元のテキスト、右側に変更後のテキストを入力して「比較」をクリック</div>
                </div>
            </div>
        `;
    }

    const { leftRows, rightRows, unifiedRows } = diffResult;

    if (viewMode === 'side-by-side') {
        return html`
            <div className="diff-display-container">
                <${SideBySideView} leftRows=${leftRows} rightRows=${rightRows} />
            </div>
        `;
    }

    return html`
        <div className="diff-display-container">
            <${UnifiedView} rows=${unifiedRows} />
        </div>
    `;
}

/**
 * 断片マッチングセクション
 */
function FragmentSection({ originalText, fragment, setFragment, setOriginalText, onApplied }) {
    const [matchResult, setMatchResult] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);

    // 断片変更時に自動マッチング
    useEffect(() => {
        if (fragment && originalText) {
            setAnalyzing(true);
            const timer = setTimeout(() => {
                const result = findBestMatch(fragment, originalText);
                setMatchResult(result);
                setAnalyzing(false);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setMatchResult(null);
        }
    }, [fragment, originalText]);

    // 適用ボタンハンドラ
    const handleApply = useCallback(() => {
        if (!matchResult || !originalText || !fragment) return;
        const newText = applyFragment(originalText, fragment, matchResult);
        setOriginalText(newText);
        setFragment('');
        onApplied();
    }, [matchResult, originalText, fragment, setOriginalText, setFragment, onApplied]);

    const confLabel = matchResult
        ? (matchResult.confidence === 'high' ? '高' : matchResult.confidence === 'medium' ? '中' : '低')
        : '';
    const confColor = matchResult
        ? (matchResult.confidence === 'high' ? 'success' : matchResult.confidence === 'medium' ? 'warning' : 'error')
        : '';
    const confClass = matchResult ? ('confidence-' + matchResult.confidence) : '';
    const fragLines = fragment ? splitLines(fragment) : [];

    return html`
        <div className="fragment-section">
            <h3>📋 コード断片の適用</h3>
            <div className="text-area-wrapper" style=${{ marginBottom: '12px' }}>
                <div className="text-area-label">
                    <span>コード断片</span>
                    <span className="drop-hint">変更部分の断片を貼り付け</span>
                </div>
                <textarea
                    value=${fragment}
                    onInput=${(e) => setFragment(e.target.value)}
                    placeholder="変更したいコード断片を貼り付けます..."
                    spellCheck=${false}
                    style=${{ minHeight: '120px' }}
                />
            </div>

            ${analyzing && html`<${Tag} color="processing">分析中...</${Tag}>`}

            ${matchResult && !analyzing && html`
                <div className="fragment-match-info">
                    <${Tag} color=${confColor}>信頼度: ${confLabel}</${Tag}>
                    <span className=${confClass} style=${{ fontSize: '13px' }}>
                        行 ${matchResult.startLine + 1} 〜 ${matchResult.endLine + 1} にマッチ
                    </span>
                    ${matchResult.matchedIdentifiers.length > 0 && html`
                        <span style=${{ fontSize: '12px', color: '#888' }}>
                            (マッチ: ${matchResult.matchedIdentifiers.slice(0, 3).join(', ')}${matchResult.matchedIdentifiers.length > 3 ? '...' : ''})
                        </span>
                    `}
                </div>

                ${matchResult.contextBefore.length > 0 && html`
                    <div className="fragment-preview">
                        <div className="fragment-pane-title">適用前後のプレビュー</div>
                        <div className="fragment-side-by-side">
                            <div className="fragment-pane">
                                <div className="fragment-pane-title">現在</div>
                                <div style=${{ color: '#999' }}>${matchResult.contextBefore.join('\n')}</div>
                                <div style=${{ color: '#cb2431' }}>... (置換範囲: ${matchResult.endLine - matchResult.startLine + 1}行) ...</div>
                                <div style=${{ color: '#999' }}>${matchResult.contextAfter.join('\n')}</div>
                            </div>
                            <div className="fragment-pane">
                                <div className="fragment-pane-title">適用後</div>
                                <div style=${{ color: '#999' }}>${matchResult.contextBefore.join('\n')}</div>
                                <div style=${{ color: '#22863a' }}>
                                    ${fragLines.slice(0, 5).join('\n')}
                                    ${fragLines.length > 5 ? '\n... (' + fragLines.length + '行)' : ''}
                                </div>
                                <div style=${{ color: '#999' }}>${matchResult.contextAfter.join('\n')}</div>
                            </div>
                        </div>
                    </div>
                `}

                <div style=${{ marginTop: '12px' }}>
                    <${Button}
                        type="primary"
                        onClick=${handleApply}
                        disabled=${matchResult.confidence === 'low'}
                    >
                        適用
                    </${Button}>
                    ${matchResult.confidence === 'low' && html`
                        <span style=${{ marginLeft: '8px', fontSize: '12px', color: '#cb2431' }}>
                            信頼度が低いため適用できません
                        </span>
                    `}
                </div>
            `}

            ${!matchResult && fragment && !analyzing && originalText && html`
                <div className="fragment-match-info">
                    <${Tag} color="error">マッチする箇所が見つかりません</${Tag}>
                    <span style=${{ fontSize: '12px', color: '#888' }}>断片に含まれる関数名やクラス名を元のテキストに見つけられませんでした</span>
                </div>
            `}
        </div>
    `;
}

/**
 * メインコンテンツ
 */
function MainContent() {
    const [originalText, setOriginalText] = useState('');
    const [modifiedText, setModifiedText] = useState('');
    const [fragment, setFragment] = useState('');
    const [viewMode, setViewMode] = useState('side-by-side');
    const [diffResult, setDiffResult] = useState(null);
    const [stats, setStats] = useState({ added: 0, removed: 0, changed: 0 });
    const [rawChanges, setRawChanges] = useState([]);
    const [largeTextWarning, setLargeTextWarning] = useState(false);

    /** テキストサイズチェック */
    const checkTextSize = useCallback((text) => {
        if (splitLines(text).length > LARGE_TEXT_THRESHOLD) {
            setLargeTextWarning(true);
            return true;
        }
        setLargeTextWarning(false);
        return false;
    }, []);

    /** 差分を実行 */
    const runDiff = useCallback(() => {
        if (!originalText && !modifiedText) {
            antd.message.info({ content: 'テキストを入力してください', key: 'diff' });
            return;
        }
        if (checkTextSize(originalText) || checkTextSize(modifiedText)) {
            antd.message.warning({ content: LARGE_TEXT_THRESHOLD + '行を超えています。処理に時間がかかる可能性があります。', key: 'diff' });
        }

        try {
            const changes = Diff.diffLines(originalText, modifiedText);
            let added = 0, removed = 0, changed = 0;
            const processed = [];
            let i = 0;

            while (i < changes.length) {
                const c = changes[i];
                if (c.removed && i + 1 < changes.length && changes[i + 1].added) {
                    // 削除→追加のペアを「変更」として扱う
                    const oLines = splitLines(c.value);
                    const aLines = splitLines(changes[i + 1].value);
                    const pairCount = Math.max(oLines.length, aLines.length);
                    for (let j = 0; j < pairCount; j++) {
                        const oldLine = j < oLines.length ? oLines[j] : null;
                        const newLine = j < aLines.length ? aLines[j] : null;
                        const wd = (oldLine && newLine) ? getWordDiffs(oldLine, newLine) : null;
                        processed.push({ type: 'changed', oldValue: oldLine, newValue: newLine, wdOld: wd, wdNew: wd });
                    }
                    changed += pairCount;
                    i += 2;
                } else if (c.added) {
                    const ls = splitLines(c.value);
                    for (const l of ls) processed.push({ type: 'added', value: l });
                    added += ls.length;
                    i++;
                } else if (c.removed) {
                    const ls = splitLines(c.value);
                    for (const l of ls) processed.push({ type: 'removed', value: l });
                    removed += ls.length;
                    i++;
                } else {
                    const ls = splitLines(c.value);
                    for (const l of ls) processed.push({ type: 'unchanged', value: l });
                    i++;
                }
            }

            setStats({ added, removed, changed });
            setRawChanges(processed);

            // 統一ビュー用行データ
            const unifiedRows = [];
            let oN = 0, mN = 0;
            for (const p of processed) {
                if (p.type === 'unchanged') {
                    oN++; mN++;
                    unifiedRows.push({ type: 'unchanged', lineNum: oN, content: p.value });
                } else if (p.type === 'added') {
                    mN++;
                    unifiedRows.push({ type: 'added', lineNum: mN, content: p.newValue || p.value });
                } else if (p.type === 'removed') {
                    oN++;
                    unifiedRows.push({ type: 'removed', lineNum: oN, content: p.oldValue || p.value });
                } else if (p.type === 'changed') {
                    if (p.oldValue) {
                        oN++;
                        unifiedRows.push({ type: 'removed', lineNum: oN, content: p.oldValue, wordDiffs: p.wdOld });
                    }
                    if (p.newValue) {
                        mN++;
                        unifiedRows.push({ type: 'added', lineNum: mN, content: p.newValue, wordDiffs: p.wdNew });
                    }
                }
            }

            // サイドバイサイド用行データ
            const leftRows = [];
            const rightRows = [];
            oN = 0; mN = 0;
            for (const p of processed) {
                if (p.type === 'unchanged') {
                    oN++; mN++;
                    leftRows.push({ type: 'unchanged', lineNum: oN, content: p.value });
                    rightRows.push({ type: 'unchanged', lineNum: mN, content: p.value });
                } else if (p.type === 'added') {
                    mN++;
                    leftRows.push({ type: 'placeholder', lineNum: '', content: '' });
                    rightRows.push({ type: 'added', lineNum: mN, content: p.newValue || p.value });
                } else if (p.type === 'removed') {
                    oN++;
                    leftRows.push({ type: 'removed', lineNum: oN, content: p.oldValue || p.value });
                    rightRows.push({ type: 'placeholder', lineNum: '', content: '' });
                } else if (p.type === 'changed') {
                    if (p.oldValue) {
                        oN++;
                        leftRows.push({ type: 'removed', lineNum: oN, content: p.oldValue, wordDiffs: p.wdOld });
                    } else {
                        leftRows.push({ type: 'placeholder', lineNum: '', content: '' });
                    }
                    if (p.newValue) {
                        mN++;
                        rightRows.push({ type: 'added', lineNum: mN, content: p.newValue, wordDiffs: p.wdNew });
                    } else {
                        rightRows.push({ type: 'placeholder', lineNum: '', content: '' });
                    }
                }
            }

            setDiffResult({ leftRows, rightRows, unifiedRows });
            antd.message.success({ content: '比較完了', key: 'diff' });
        } catch (err) {
            antd.message.error({ content: '比較エラー: ' + err.message, key: 'diff' });
        }
    }, [originalText, modifiedText, checkTextSize, messageApi]);

    /** 左右スワップ */
    const handleSwap = useCallback(() => {
        const tmp = originalText;
        setOriginalText(modifiedText);
        setModifiedText(tmp);
        setDiffResult(null);
        setStats({ added: 0, removed: 0, changed: 0 });
        setRawChanges([]);
    }, [originalText, modifiedText]);

    /** 全クリア */
    const handleClear = useCallback(() => {
        setOriginalText('');
        setModifiedText('');
        setFragment('');
        setDiffResult(null);
        setStats({ added: 0, removed: 0, changed: 0 });
        setRawChanges([]);
        setLargeTextWarning(false);
        antd.message.info('クリアしました');
    }, [messageApi]);

    /** 差分をクリップボードにコピー */
    const handleCopyDiff = useCallback(() => {
        if (rawChanges.length === 0) {
            antd.message.info('コピーする差分がありません');
            return;
        }
        const diffText = generateUnifiedDiff(rawChanges);
        navigator.clipboard.writeText(diffText).then(() => {
            antd.message.success('差分をクリップボードにコピーしました');
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = diffText;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            antd.message.success('差分をクリップボードにコピーしました');
        });
    }, [rawChanges, messageApi]);

    /** 断片適用後コールバック */
    const handleFragmentApplied = useCallback(() => {
        setDiffResult(null);
        setStats({ added: 0, removed: 0, changed: 0 });
        setRawChanges([]);
        antd.message.success('断片を適用しました');
    }, [messageApi]);

    return html`
        <div className="diff-app">
            ${messageApi}

            <!-- ヘッダー -->
            <header className="diff-header">
                <h1>テキスト差分比較ツール</h1>
                <p>テキストやコードの差分を視覚的に比較。コード断片の適用機能付き。</p>
            </header>

            <!-- 入力セクション -->
            <section className="diff-input-section">
                <div className="input-grid">
                    <${DropTextArea}
                        value=${originalText}
                        onChange=${setOriginalText}
                        placeholder="元のテキストを入力..."
                        label="📄 元のテキスト（Original）"
                    />
                    <${DropTextArea}
                        value=${modifiedText}
                        onChange=${setModifiedText}
                        placeholder="変更後のテキストを入力..."
                        label="📝 変更後のテキスト（Modified）"
                    />
                </div>

                <div className="action-bar">
                    <${Button} type="primary" size="large" onClick=${runDiff}>
                        🔍 比較
                    </${Button}>
                    <${Tooltip} title="左右のテキストを入れ替え">
                        <${Button} onClick=${handleSwap}>⇄ スワップ</${Button}>
                    </${Tooltip}>
                    <${Button} onClick=${handleClear}>🗑️ クリア</${Button}>
                    ${diffResult && html`
                        <${Tooltip} title="統一diffフォーマットでコピー">
                            <${Button} onClick=${handleCopyDiff}>📋 差分をコピー</${Button}>
                        </${Tooltip}>
                    `}
                </div>
            </section>

            ${largeTextWarning && html`
                <div className="large-text-warning">
                    ⚠️ テキストが非常に大きいです（${LARGE_TEXT_THRESHOLD}行以上）。表示パフォーマンスが低下する可能性があります。
                </div>
            `}

            ${diffResult && html`
                <div className="stats-bar">
                    <span style=${{ fontWeight: 600, color: '#333' }}>統計:</span>
                    <div className="stat-item stat-added">
                        <span className="stat-count" style=${{ color: '#22863a' }}>+${stats.added}</span>
                        <span>追加</span>
                    </div>
                    <div className="stat-item stat-removed">
                        <span className="stat-count" style=${{ color: '#cb2431' }}>-${stats.removed}</span>
                        <span>削除</span>
                    </div>
                    <div className="stat-item stat-changed">
                        <span className="stat-count" style=${{ color: '#b08800' }}>~${stats.changed}</span>
                        <span>変更</span>
                    </div>
                </div>
            `}

            ${diffResult && html`
                <div className="view-toggle-bar">
                    <span style=${{ fontSize: '13px', color: '#666', fontWeight: 600 }}>表示モード:</span>
                    <${Segmented}
                        options=${[
                            { label: 'サイドバイサイド', value: 'side-by-side' },
                            { label: '統一', value: 'unified' },
                        ]}
                        value=${viewMode}
                        onChange=${(val) => setViewMode(val)}
                    />
                </div>
            `}

            <${DiffDisplay} diffResult=${diffResult} viewMode=${viewMode} />

            <${FragmentSection}
                originalText=${originalText}
                fragment=${fragment}
                setFragment=${setFragment}
                setOriginalText=${setOriginalText}
                onApplied=${handleFragmentApplied}
            />

            <!-- フッター -->
            <footer className="diff-footer">
                <div className="diff-footer-links">
                    <a href="https://search3958.github.io/" target="_blank" rel="noopener noreferrer">About</a>
                    <a href="https://search3958.github.io/policies/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    <a href="https://search3958.github.io/accounts/lang" target="_blank" rel="noopener noreferrer">Language Settings</a>
                </div>
                <div className="copyright">© 2025 search3958</div>
            </footer>
        </div>
    `;
}

/**
 * アプリケーションルート
 */
function App() {
    return html`
        <${antd.ConfigProvider} theme=${{
            token: { colorPrimary: '#05F380', borderRadius: 8 }
        }}>
            <${MainContent} />
        <//>
    `;
}

// ========================================
// マウント
// ========================================
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));