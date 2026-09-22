
(() => {
    "use strict";

    const NS = "FictiveRecord";
    const API_BASE = "https://fictive-record.takesen2278.workers.dev";
    const PAGE_SIZE = 20;
    const STORAGE_KEY = "fictive-record-client-id";

    const TYPES = {
    faq: "存在しないFAQ",
    review: "架空の商品レビュー",
    future_wikipedia: "未来のWikipedia",
    odd_record: "どこかおかしい記録"
    };

    const TYPE_ICONS = {
    faq: "https://win98icons.alexmeub.com/icons/png/msg_question-0.png",
    review: "https://win98icons.alexmeub.com/icons/png/outlook_express_tack-0.png",
    future_wikipedia: "https://win98icons.alexmeub.com/icons/png/sched_tasks.png",
    odd_record: "https://win98icons.alexmeub.com/icons/png/search_file_3.png"
    };

    const state = {
    mode: "recommended",
    offset: 0,
    loading: false,
    hasMore: true,
    selectedType: "faq",
    rating: 5,
    pendingType: "",
    clientId: ""
    };

    const $ = (selector, root = document) => {
    const element = root.querySelector(selector);
    if (!element) console.error(`[${NS}] Element not found: ${selector}`);
    return element;
    };

    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

    function log(message, payload) {
    if (payload === undefined) console.log(`[${NS}] ${message}`);
    else console.log(`[${NS}] ${message}`, payload);
    }

    function getClientId() {
    try {
        let id = localStorage.getItem(STORAGE_KEY);
        if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(STORAGE_KEY, id);
        log("Created client id");
        }
        return id;
    } catch (error) {
        console.error(`[${NS}] Failed to access localStorage`, error);
        return crypto.randomUUID();
    }
    }

    function normalizeText(value) {
    return String(value ?? "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    }

    function lineCount(value) {
    const normalized = normalizeText(value);
    return normalized.length ? normalized.split("\n").length : 0;
    }

    function escapeHTML(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function formatRelativeTime(epochMs) {
    const diff = Math.max(0, Date.now() - Number(epochMs));
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    if (diff < minute) return "たった今";
    if (diff < hour) return `${Math.floor(diff / minute)}分前`;
    if (diff < day) return `${Math.floor(diff / hour)}時間前`;
    return `${Math.floor(diff / day)}日前`;
    }

    function showToast(message) {
    const toast = $("#vrToast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
    }

    function setLoading(isLoading) {
    state.loading = isLoading;
    const loadState = $("#vrLoadState");
    const loadMore = $("#vrLoadMore");
    if (loadState) loadState.hidden = !isLoading;
    if (loadMore) loadMore.disabled = isLoading;
    log(isLoading ? "Loading started" : "Loading finished");
    }

    async function apiFetch(path, options = {}) {
    const headers = new Headers(options.headers || {});
    headers.set("Accept", "application/json");
    headers.set("X-VR-Client-ID", state.clientId);
    if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json");

    const response = await fetch(`${API_BASE}${path}`, {
        ...options,
        headers,
        credentials: "omit"
    });

    let payload = null;
    try { payload = await response.json(); } catch (error) {
        console.error(`[${NS}] JSON parse failed`, error);
    }

    if (!response.ok) {
        const message = payload?.error || `HTTP ${response.status}`;
        throw new Error(message);
    }
    return payload;
    }

    async function loadPosts(reset = false) {
    if (state.loading || (!state.hasMore && !reset)) return;
    if (reset) {
        state.offset = 0;
        state.hasMore = true;
        const feed = $("#vrFeed");
        if (feed) feed.innerHTML = "";
    }

    setLoading(true);
    try {
        const query = new URLSearchParams({ mode: state.mode, limit: String(PAGE_SIZE), offset: String(state.offset) });
        const data = await apiFetch(`/api/posts?${query.toString()}`);
        renderPosts(data.posts || [], reset);
        state.offset += (data.posts || []).length;
        state.hasMore = Boolean(data.hasMore);
        const loadMoreWrap = $("#vrLoadMoreWrap");
        if (loadMoreWrap) loadMoreWrap.hidden = !state.hasMore;
        log("Loaded posts", { mode: state.mode, count: data.posts?.length ?? 0 });
    } catch (error) {
        console.error(`[${NS}] Failed to load posts`, error);
        if (reset) renderError("投稿を読み込めませんでした。しばらくしてから再試行してください。");
        showToast(error.message || "読み込みに失敗しました");
    } finally {
        setLoading(false);
    }
    }

    function renderPosts(posts, reset) {
    const feed = $("#vrFeed");
    if (!feed) return;

    if (reset && posts.length === 0) {
        feed.innerHTML = `<div class="vr-empty">まだ記録がありません。あなたが最初の投稿者だなんで，信じられますか？</div>`;
        return;
    }

    if (reset) feed.innerHTML = "";
    const fragment = document.createDocumentFragment();
    posts.forEach(post => fragment.appendChild(createPostCard(post)));
    feed.appendChild(fragment);

    const cards = feed.querySelectorAll(".vr-card");
    cards.forEach(function(card, i) {
        card.style.opacity = "0";
        setTimeout(function() {
            var step = 0;
            var iv = setInterval(function() {
                step++;
                card.style.opacity = (step * 0.333).toString();
                if (step >= 3) clearInterval(iv);
            }, 100);
        }, i * 100);
    });
    }

    function renderError(message) {
    const feed = $("#vrFeed");
    if (feed) feed.innerHTML = `<div class="vr-error">${escapeHTML(message)}</div>`;
    }

    function createPostCard(post) {
    const card = document.createElement("article");
    card.className = "card vr-card";
    card.dataset.postId = post.id;

    const score = Number(post.upvotes || 0) - Number(post.downvotes || 0);
    const userVote = Number(post.user_vote || 0);
    const meta = `${TYPES[post.type] || "記録"} · ${formatRelativeTime(post.created_at)}`;

    let body = "";
    if (post.type === "faq") {
        body = `<div class="vr-faq">
        <div class="vr-faq-line"><span class="vr-faq-label">Q</span><p class="vr-body-text">${escapeHTML(post.faq_question)}</p></div>
        <div class="vr-faq-line"><span class="vr-faq-label">A</span><p class="vr-body-text">${escapeHTML(post.faq_answer)}</p></div>
        </div>`;
    } else if (post.type === "review") {
        const rating = Math.max(1, Math.min(5, Number(post.rating || 0)));
        body = `<div class="vr-meta"><span>評価</span><span class="vr-rating" aria-label="${rating} / 5">${"★".repeat(rating)}${"☆".repeat(5 - rating)}</span></div>
                <p class="vr-body-text vr-review-text">${escapeHTML(post.review_text)}</p>`;
    } else if (post.type === "future_wikipedia") {
        body = `<div class="vr-chip vr-future-date">${escapeHTML(post.future_date)}</div><p class="vr-body-text">${escapeHTML(post.future_event)}</p>`;
    } else {
        body = `<p class="vr-body-text">${escapeHTML(post.odd_event)}</p>`;
    }

    const title = post.type === "review" ? escapeHTML(post.product_name) : "";
    card.innerHTML = ` <div class="card-header"> ${escapeHTML(TYPES[post.type] || "記録")}  <span class="vr-meta">${escapeHTML(meta.split(" · ")[1])}</span> </div> <div class="vr-card-inner"> <aside class="vr-vote-rail" aria-label="投票"> <div class="vr-vote-controls"> <button class="btn vr-vote-button ${userVote === 1 ? "btn-primary is-up" : ""}" data-vote="1" type="button" aria-label="アップボーン" >▲</button> <div class="vr-score">${score}</div> <button class="btn vr-vote-button ${userVote === -1 ? "btn-primary is-down" : ""}" data-vote="-1" type="button" aria-label="ダウントーン" >▼</button> </div> <img class="vr-type-icon" src="${escapeHTML(TYPE_ICONS[post.type] || TYPE_ICONS.odd_record)}" alt="" aria-hidden="true" > </aside> <div class="vr-content">  ${title ? `<h2 class="vr-card-title">${title}</h2>` : ""} ${body} </div> </div>`;

    const voteButtons = $$("[data-vote]", card);
    voteButtons.forEach(button => {
        button.addEventListener("click", () => handleVote(post.id, Number(button.dataset.vote), card));
    });
    return card;
    }

    async function handleVote(postId, direction, card) {
    if (!postId || !card) {
        console.error(`[${NS}] Vote target missing`, { postId, card });
        return;
    }
    const scoreElement = $(".vr-score", card);
    const upButton = $("[data-vote=\"1\"]", card);
    const downButton = $("[data-vote=\"-1\"]", card);
    if (!scoreElement || !upButton || !downButton) return;

    const currentVote = upButton.classList.contains("is-up") ? 1 : (downButton.classList.contains("is-down") ? -1 : 0);
    const nextVote = currentVote === direction ? 0 : direction;
    upButton.disabled = true;
    downButton.disabled = true;

    try {
        const result = await apiFetch(`/api/posts/${encodeURIComponent(postId)}/vote`, {
        method: "POST",
        body: JSON.stringify({ direction: nextVote })
        });
        scoreElement.textContent = String(Number(result.upvotes || 0) - Number(result.downvotes || 0));
        upButton.classList.toggle("is-up", result.user_vote === 1);
        downButton.classList.toggle("is-down", result.user_vote === -1);
        upButton.classList.toggle("btn-primary", result.user_vote === 1);
        downButton.classList.toggle("btn-primary", result.user_vote === -1);
        log("Vote updated", { postId, direction: result.user_vote });
    } catch (error) {
        console.error(`[${NS}] Vote failed`, error);
        showToast(error.message || "投票に失敗しました");
    } finally {
        upButton.disabled = false;
        downButton.disabled = false;
    }
    }

    function selectMode(mode) {
    if (!["recommended", "latest"].includes(mode)) {
        console.error(`[${NS}] Unknown mode: ${mode}`);
        return;
    }

    const recommended = $("#vrTabRecommended");
    const latest = $("#vrTabLatest");
    if (!recommended || !latest) {
        console.error(`[${NS}] View mode controls are missing`);
        return;
    }

    state.mode = mode;
    recommended.disabled = mode === "recommended";
    latest.disabled = mode === "latest";
    recommended.setAttribute("aria-pressed", String(mode === "recommended"));
    latest.setAttribute("aria-pressed", String(mode === "latest"));
    log("Mode changed", mode);
    loadPosts(true);
    }

    function openComposer() {
    const backdrop = $("#vrDialogBackdrop");
    if (!backdrop) return;
    backdrop.classList.add("is-open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    updateFormType();
    const firstField = $(`[data-form-type="${state.selectedType}"] input, [data-form-type="${state.selectedType}"] textarea`);
    if (firstField) {
        firstField.focus();
        log("Composer first field focused");
    } else {
        console.error(`[${NS}] First field not found for type: ${state.selectedType}`);
    }
    log("Composer opened");
    }

    function closeComposer() {
    const backdrop = $("#vrDialogBackdrop");
    if (!backdrop) return;
    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    log("Composer closed");
    }

    function updateFormType() {
    const typeRadios = $('input[name="record_type"]');
    const activePanel = $(`[data-form-type="${state.selectedType}"]`);

    if (!typeRadios) {
        console.error(`[${NS}] Record type radio controls are missing`);
        return;
    }

    if (!activePanel) {
        console.error(`[${NS}] Form panel not found for type: ${state.selectedType}`);
        return;
    }

    $$('input[name="record_type"]').forEach(radio => {
        radio.checked = radio.value === state.selectedType;
    });

    $$(".vr-form-panel").forEach(panel => {
        panel.classList.toggle("is-active", panel === activePanel);
    });

    log("Form type rendered", state.selectedType);
    }

    function renderRatingInput() {
    const ratingInput = $(`#vrRating${state.rating}`);
    if (!ratingInput) {
        console.error(`[${NS}] Rating radio not found for: ${state.rating}`);
        return;
    }

    $$('input[name="rating"]').forEach(input => {
        input.checked = input === ratingInput;
    });

    log("Rating rendered", state.rating);
    }

    function hasFormInput() {
    const form = $("#vrPostForm");
    if (!form) {
        console.error(`[${NS}] Post form is missing while checking input`);
        return false;
    }

    const fields = $$('input[type="text"], textarea', form);
    const hasInput = fields.some(field => normalizeText(field.value).trim().length > 0);
    log("Checked form input", { hasInput });
    return hasInput;
    }

    function clearComposerInput() {
    const form = $("#vrPostForm");
    if (!form) {
        console.error(`[${NS}] Post form is missing while clearing input`);
        return false;
    }

    form.reset();
    state.rating = 5;
    renderRatingInput();
    updateCounters();
    log("Composer input cleared");
    return true;
    }

    function openTypeChangeConfirm(nextType) {
    const backdrop = $("#vrConfirmBackdrop");
    if (!backdrop) {
        console.error(`[${NS}] Type confirmation backdrop is missing`);
        return false;
    }

    state.pendingType = nextType;
    backdrop.classList.add("is-open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    log("Type change confirmation opened", { from: state.selectedType, to: nextType });
    return true;
    }

    function closeTypeChangeConfirm() {
    const backdrop = $("#vrConfirmBackdrop");
    if (!backdrop) {
        console.error(`[${NS}] Type confirmation backdrop is missing`);
        return;
    }

    backdrop.classList.remove("is-open");
    backdrop.setAttribute("aria-hidden", "true");
    state.pendingType = "";

    const composerBackdrop = $("#vrDialogBackdrop");
    document.body.style.overflow = composerBackdrop && composerBackdrop.classList.contains("is-open") ? "hidden" : "";

    log("Type change confirmation closed");
    }

    function applyTypeChange(nextType) {
    if (!TYPES[nextType]) {
        console.error(`[${NS}] Unknown record type`, nextType);
        return;
    }

    if (!clearComposerInput()) {
        return;
    }

    state.selectedType = nextType;
    updateFormType();
    closeTypeChangeConfirm();
    log("Composer type changed", state.selectedType);
    }

    function requestTypeChange(nextType) {
    if (!TYPES[nextType]) {
        console.error(`[${NS}] Unknown record type requested`, nextType);
        return;
    }

    if (nextType === state.selectedType) {
        log("Composer type unchanged", nextType);
        return;
    }

    if (hasFormInput()) {
        const opened = openTypeChangeConfirm(nextType);
        if (!opened) {
        const currentRadio = $(`input[name="record_type"][value="${state.selectedType}"]`);
        if (currentRadio) currentRadio.checked = true;
        }
        return;
    }

    state.selectedType = nextType;
    updateFormType();
    log("Composer type changed without confirmation", state.selectedType);
    }

    function updateCounters() {
    $$('[data-counter-for]').forEach(counter => {
        const target = document.getElementById(counter.dataset.counterFor);
        if (!target) return;
        counter.textContent = String(normalizeText(target.value).length);
    });
    }

    function validateForm() {
    const type = state.selectedType;
    const form = $("#vrPostForm");
    if (!form) {
        console.error(`[${NS}] Post form is missing during validation`);
        return { ok: false, errors: ["投稿フォームを読み込めませんでした。"], data: {} };
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const errors = [];

    if (type === "faq") {
        data.faq_question = normalizeText(data.faq_question).replaceAll("\n", "");
        data.faq_answer = normalizeText(data.faq_answer).replaceAll("\n", "");
        if (!data.faq_question) errors.push("Qを入力してください。");
        if (!data.faq_answer) errors.push("Aを入力してください。");
        if (data.faq_question.length > 100 || data.faq_answer.length > 100) errors.push("QとAはそれぞれ100文字以内です。");
    }
    if (type === "review") {
        data.product_name = normalizeText(data.product_name);
        data.review_text = normalizeText(data.review_text);
        if (!data.product_name) errors.push("商品名を入力してください。");
        if (!data.review_text) errors.push("レビューを入力してください。");
        if (data.product_name.length > 50) errors.push("商品名は50文字以内です。");
        if (data.review_text.length > 200) errors.push("レビューは200文字以内です。");
        if (lineCount(data.review_text) > 3) errors.push("レビューは3行以内です。");
        if (!Number.isInteger(state.rating) || state.rating < 1 || state.rating > 5) errors.push("評価を選択してください。");
    }
    if (type === "future_wikipedia") {
        data.future_date = normalizeText(data.future_date).replaceAll("\n", "");
        data.future_event = normalizeText(data.future_event);
        if (!data.future_date) errors.push("日付を入力してください。");
        if (!data.future_event) errors.push("出来事を入力してください。");
        if (data.future_date.length > 10) errors.push("日付は10文字以内です。");
        if (data.future_event.length > 300) errors.push("出来事は300文字以内です。");
        if (lineCount(data.future_event) > 5) errors.push("出来事は5行以内です。");
    }
    if (type === "odd_record") {
        data.odd_event = normalizeText(data.odd_event);
        if (!data.odd_event) errors.push("出来事を入力してください。");
        if (data.odd_event.length > 300) errors.push("出来事は300文字以内です。");
        if (lineCount(data.odd_event) > 5) errors.push("出来事は5行以内です。");
    }

    return { ok: errors.length === 0, errors, data };
    }

    async function submitPost(event) {
    event.preventDefault();
    if (state.loading) return;

    const validation = validateForm();
    if (!validation.ok) {
        showToast(validation.errors[0]);
        console.error(`[${NS}] Form validation failed`, validation.errors);
        return;
    }

    const button = $("#vrSubmitPost");
    if (!button) return;
    button.disabled = true;
    button.textContent = "投稿中…";

    try {
        const result = await apiFetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
            type: state.selectedType,
            ...validation.data,
            rating: state.rating
        })
        });
        log("Post created", result);
        closeComposer();
        resetForm();
        showToast("投稿しました");
        selectMode(state.mode);
    } catch (error) {
        console.error(`[${NS}] Post creation failed`, error);
        showToast(error.message || "投稿に失敗しました");
    } finally {
        button.disabled = false;
        button.textContent = "投稿する";
    }
    }

    function resetForm() {
    const form = $("#vrPostForm");
    if (!form) {
        console.error(`[${NS}] Post form is missing while resetting`);
        return;
    }

    form.reset();
    state.selectedType = "faq";
    state.rating = 5;
    state.pendingType = "";
    updateFormType();
    renderRatingInput();
    updateCounters();
    log("Composer reset");
    }

    function bindEvents() {
    const brand = $("#vrBrandButton");
    const openComposerButton = $("#vrOpenComposer");
    const closeComposerButton = $("#vrCloseComposer");
    const cancelComposerButton = $("#vrCancelComposer");
    const composerBackdrop = $("#vrDialogBackdrop");
    const recommended = $("#vrTabRecommended");
    const latest = $("#vrTabLatest");
    const loadMore = $("#vrLoadMore");
    const postForm = $("#vrPostForm");
    const confirmBackdrop = $("#vrConfirmBackdrop");
    const confirmButton = $("#vrConfirmTypeChange");
    const cancelConfirmButton = $("#vrCancelTypeConfirm");
    const closeConfirmButton = $("#vrCloseTypeConfirm");

    if (brand) {
        brand.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        log("Brand clicked");
        });
    }

    if (openComposerButton) openComposerButton.addEventListener("click", openComposer);
    if (closeComposerButton) closeComposerButton.addEventListener("click", closeComposer);
    if (cancelComposerButton) cancelComposerButton.addEventListener("click", closeComposer);

    if (composerBackdrop) {
        composerBackdrop.addEventListener("click", event => {
        if (event.target === composerBackdrop) {
            closeComposer();
            log("Composer dismissed by backdrop");
        }
        });
    }

    if (recommended) recommended.addEventListener("click", () => selectMode("recommended"));
    if (latest) latest.addEventListener("click", () => selectMode("latest"));
    if (loadMore) loadMore.addEventListener("click", () => loadPosts(false));
    if (postForm) postForm.addEventListener("submit", submitPost);

    $$('input[name="record_type"]').forEach(radio => {
        radio.addEventListener("change", () => {
        if (!radio.checked) return;
        requestTypeChange(radio.value);
        });
    });

    $$('input[name="rating"]').forEach(radio => {
        radio.addEventListener("change", () => {
        if (!radio.checked) return;
        state.rating = Number(radio.value);
        log("Rating changed", state.rating);
        });
    });

    $$(".vr-input, .vr-textarea").forEach(input => {
        input.addEventListener("input", updateCounters);
    });

    if (confirmButton) {
        confirmButton.addEventListener("click", () => {
        if (!state.pendingType) {
            console.error(`[${NS}] No pending record type during confirmation`);
            closeTypeChangeConfirm();
            return;
        }

        applyTypeChange(state.pendingType);
        });
    }

    if (cancelConfirmButton) {
        cancelConfirmButton.addEventListener("click", () => {
        const currentRadio = $(`input[name="record_type"][value="${state.selectedType}"]`);
        if (currentRadio) currentRadio.checked = true;
        closeTypeChangeConfirm();
        log("Type change cancelled");
        });
    }

    if (closeConfirmButton) {
        closeConfirmButton.addEventListener("click", () => {
        const currentRadio = $(`input[name="record_type"][value="${state.selectedType}"]`);
        if (currentRadio) currentRadio.checked = true;
        closeTypeChangeConfirm();
        log("Type change confirmation closed by close button");
        });
    }

    if (confirmBackdrop) {
        confirmBackdrop.addEventListener("click", event => {
        if (event.target !== confirmBackdrop) return;

        const currentRadio = $(`input[name="record_type"][value="${state.selectedType}"]`);
        if (currentRadio) currentRadio.checked = true;
        closeTypeChangeConfirm();
        log("Type change confirmation dismissed");
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;

        const confirmDialog = $("#vrConfirmBackdrop");
        if (confirmDialog && confirmDialog.classList.contains("is-open")) {
        const currentRadio = $(`input[name="record_type"][value="${state.selectedType}"]`);
        if (currentRadio) currentRadio.checked = true;
        closeTypeChangeConfirm();
        log("Type change confirmation dismissed with Escape");
        return;
        }

        const composerDialog = $("#vrDialogBackdrop");
        if (composerDialog && composerDialog.classList.contains("is-open")) {
        closeComposer();
        }
    });

    log("Events bound");
    }

    function init() {
    state.clientId = getClientId();
    bindEvents();
    renderRatingInput();
    updateCounters();
    loadPosts(true);
    log("Initialized", { mode: state.mode });
    }

    init();
})();