document.addEventListener('DOMContentLoaded', () => {
    // --- 定数とUI要素の定義 ---
    const ZIP_URL = 'https://search3958.github.io/newtab/bgimg/zip/main.zip';
    
    // IndexedDB 定数
    const DB_NAME = 'WallpaperDB';
    const STORE_NAME = 'images';
    const DB_VERSION = 1;

    // UI要素
    const loadingContainer = document.getElementById('loading-container');
    const genreView = document.getElementById('genre-view');
    const galleryView = document.getElementById('gallery-view');
    const genreList = document.getElementById('genre-list');
    const imageGallery = document.getElementById('image-gallery');
    const galleryTitleHeader = document.getElementById('gallery-title-header');
    const backButton = document.getElementById('back-button');
    const appTitle = document.getElementById('app-title');
    const imageActionDialog = document.getElementById('image-action-dialog');
    const dialogImageName = document.getElementById('dialog-image-name');
    const actionList = imageActionDialog.querySelector('div[slot="content"]'); // 複数の md-list を含む div
    const downloadLink = document.getElementById('download-link');
    
    // ★ 完了ダイアログ要素の取得
    const completionDialog = document.getElementById('completion-dialog');
    const completionTitle = document.getElementById('completion-title');
    const completionMessage = document.getElementById('completion-message');

    let allWallpaperData = null;
    let currentViewElement = null;
    let isAnimating = false;
    const TRANSITION_DURATION_MS = 600;

    // 現在選択中の画像のデータ
    let selectedImage = null;


    // --- IndexedDB 関連のヘルパー関数 ---

    function openDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME);
                }
            };

            request.onsuccess = (event) => {
                resolve(event.target.result);
            };

            request.onerror = (event) => {
                console.error("IndexedDB open error:", event.target.errorCode);
                reject('INDEXEDDB_ERROR');
            };
        });
    }

    async function saveToIndexedDB(key, lightBlob, darkBlob = null) {
        let db;
        try {
            db = await openDB();
        } catch (e) {
            console.error('DB接続失敗:', e);
            return;
        }

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            const dataToSave = {};
            if (lightBlob) dataToSave.light = lightBlob;
            if (darkBlob) dataToSave.dark = darkBlob;

            const request = store.put(dataToSave, key);

            request.onsuccess = () => {
                console.log(`IndexedDBに ${key} で保存成功`);
                resolve();
            };

            request.onerror = (event) => {
                console.error(`IndexedDBへの ${key} 保存エラー:`, event.target.error);
                reject(event.target.error);
            };
        });
    }

    async function deleteFromIndexedDB(key) {
        let db;
        try {
            db = await openDB();
        } catch (e) {
            console.error('DB接続失敗:', e);
            return;
        }

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            const request = store.delete(key);

            request.onsuccess = () => {
                console.log(`IndexedDBから ${key} の削除成功`);
                resolve();
            };

            request.onerror = (event) => {
                console.error(`IndexedDBからの ${key} 削除エラー:`, event.target.error);
                reject(event.target.error);
            };
        });
    }

    // --- ユーティリティ関数 ---

    // ★ 完了ダイアログを表示する関数
    function showCompletionDialog(title, message) {
        if (!completionDialog) return;
        completionTitle.textContent = title;
        completionMessage.innerHTML = message; // HTMLを受け入れるようにinnerHTMLを使用
        completionDialog.show();
    }

    function updateProgress(percent, text) {
        const loadingBar = document.getElementById('loading-bar');
        const loadingText = document.getElementById('loading-text');
        const safePercent = Math.min(100, percent);
        loadingBar.style.width = safePercent + '%';
        loadingBar.textContent = `${Math.round(safePercent)}%`;
        loadingText.textContent = text;
    }

    // --- メイン処理関数 ---

    function processZipFile() {
        return new Promise((resolve, reject) => {
            updateProgress(5, '準備中');
            const xhr = new XMLHttpRequest();
            xhr.open('GET', ZIP_URL, true);
            xhr.responseType = 'arraybuffer';
            xhr.onprogress = function(event) {
                if (event.lengthComputable) {
                    let percent = (event.loaded / event.total) * 90;
                    updateProgress(percent, `${(event.loaded/1024/1024).toFixed(2)} MB ダウンロード済み`);
                }
            };
            xhr.onload = function() {
                if (xhr.status === 200) {
                    updateProgress(90, '解凍中');
                    const zipFile = xhr.response;
                    const structuredData = {};
                    const zipBlobMap = new Map(); // fullPath -> Blob Promise

                    JSZip.loadAsync(zipFile).then(function(zip) {
                        const imagePromises = [];

                        // Step 1: 全ファイルを走査し、パスとBlob Promiseをマップに格納
                        zip.forEach(function(relativePath, zipEntry) {
                            if (zipEntry.dir) return;

                            const fileName = relativePath.toLowerCase();
                            const parts = relativePath.split('/');
                            const baseFileName = parts[parts.length - 1];

                            if (
                                (fileName.endsWith('.png') || fileName.endsWith('.webp')) &&
                                !baseFileName.startsWith('.')
                            ) {
                                // .png や .webp ファイルの Blob Promise をマップに格納
                                zipBlobMap.set(relativePath, zipEntry.async('blob'));
                            }
                        });

                        // Step 2: マップを再度走査し、通常画像（ライト）を構造化データに追加
                        zipBlobMap.forEach((blobPromise, relativePath) => {
                            const parts = relativePath.split('/');
                            const baseFileName = parts[parts.length - 1];

                            if (!baseFileName.includes('_dark')) {
                                // 通常画像（ライトバージョン）の処理
                                const genre = parts.length > 1 ? parts[parts.length - 2] : 'その他';

                                if (!structuredData[genre]) { structuredData[genre] = []; }

                                const baseNameWithoutExt = baseFileName.replace(/\.[^/.]+$/, "");
                                const extension = baseFileName.substring(baseFileName.lastIndexOf('.'));
                                const expectedHoverName = `${baseNameWithoutExt}_dark${extension}`;
                                const expectedHoverPath = relativePath.replace(baseFileName, expectedHoverName);

                                const imageObject = {
                                    name: baseFileName,
                                    url: null,
                                    size: 0,
                                    hoverUrl: null, // ダーク画像のURL
                                    lightBlob: null, // ★ ライト画像のBlob
                                    darkBlob: null, // ★ ダーク画像のBlob
                                    relativePath: relativePath // ZIP内での相対パス
                                };
                                structuredData[genre].push(imageObject);

                                // URLとBlobを生成/格納するPromiseを作成
                                const filePromise = blobPromise.then(function(lightBlob) {
                                    imageObject.url = URL.createObjectURL(lightBlob);
                                    imageObject.size = lightBlob.size;
                                    imageObject.lightBlob = lightBlob; // ★ Blobを格納

                                    // 対応するダーク画像があるか確認
                                    const darkBlobPromise = zipBlobMap.get(expectedHoverPath);
                                    if (darkBlobPromise) {
                                        // ダーク画像を見つけたら、その URL と Blob を生成/格納
                                        return darkBlobPromise.then(darkBlob => {
                                            imageObject.hoverUrl = URL.createObjectURL(darkBlob);
                                            imageObject.darkBlob = darkBlob; // ★ Blobを格納
                                        });
                                    }
                                });
                                imagePromises.push(filePromise);
                            }
                        });


                        return Promise.all(imagePromises);
                    }).then(() => {
                        updateProgress(100, '完了');
                        // Blob は JSON.stringify できないため、ここでは structuredData をそのまま返す
                        resolve(structuredData);
                    }).catch(error => {
                        updateProgress(100, 'エラーが発生しました。');
                        console.error('ZIPファイルの処理中にエラー:', error);
                        reject('ZIP_PROCESSING_ERROR');
                    });
                } else {
                    updateProgress(100, `エラーが発生しました: HTTPステータス ${xhr.status}`);
                    console.error('ダウンロード中にHTTPエラー:', xhr.status, xhr.statusText);
                    reject('HTTP_ERROR');
                }
            };
            xhr.onerror = function() {
                updateProgress(100, 'ネットワークエラーが発生しました。');
                console.error('ネットワークエラー');
                reject('NETWORK_ERROR');
            };
            xhr.send();
        });
    }

    async function loadWallpaperData() {
        // ZIPファイル処理が毎回行われるため、キャッシュチェックは簡略化
        try {
            allWallpaperData = await processZipFile();
            // Blobが含まれるため、localStorageには保存しない
            return true;
        } catch (e) {
            console.error('データのロードに失敗しました。', e);
            return false;
        }
    }


    function switchView(nextViewElement, isBackNavigation = false) {
        if (isAnimating || nextViewElement === currentViewElement) return;

        isAnimating = true;
        const prevViewElement = currentViewElement;

        let exitClass, enterClass, postExitClass;

        if (isBackNavigation) {
            enterClass = 'offscreen-left';
            exitClass = 'offscreen-right';
            postExitClass = 'offscreen-right';
        } else {
            enterClass = 'offscreen-right';
            exitClass = 'offscreen-left';
            postExitClass = 'offscreen-left';
        }

        nextViewElement.classList.remove('active', 'offscreen-left', 'offscreen-right');
        nextViewElement.classList.add(enterClass);

        nextViewElement.style.zIndex = 40;
        if (prevViewElement) {
             prevViewElement.style.zIndex = 35;
        }

        nextViewElement.offsetWidth; // 強制的なリフロー

        window.requestAnimationFrame(() => {
            nextViewElement.classList.remove(enterClass);
            nextViewElement.classList.add('active');

            if (prevViewElement) {
                prevViewElement.classList.remove('active');
                prevViewElement.classList.remove('offscreen-left', 'offscreen-right');
                prevViewElement.classList.add(exitClass);
            }

            nextViewElement.addEventListener('transitionend', function handler(event) {
                // 確実に 'left' プロパティのトランジション終了を待つ
                if (event.propertyName !== 'left' && event.propertyName !== 'transform') return;

                nextViewElement.removeEventListener('transitionend', handler);

                isAnimating = false;
                nextViewElement.style.zIndex = 30;

                if (prevViewElement) {
                    prevViewElement.classList.remove(exitClass);
                    prevViewElement.classList.add(postExitClass);
                    prevViewElement.style.zIndex = 10;
                }
            });
        });

        currentViewElement = nextViewElement;
    }

    // ホバーイベントを設定する関数
    function setupHoverEvent(element, originalUrl, hoverUrl) {
        if (!hoverUrl) return;

        element.addEventListener('mouseenter', () => {
            element.style.backgroundImage = `url('${hoverUrl}')`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.backgroundImage = `url('${originalUrl}')`;
        });
    }

    function renderGenreView(isInitialLoad = false, isBack = false) {
        genreList.innerHTML = '';

        if (!allWallpaperData) return;

        const sortedGenres = Object.keys(allWallpaperData).sort();

        sortedGenres.forEach(genre => {
            const images = allWallpaperData[genre];
            if (images.length === 0) return;

            // ライト/ダーク両方揃っている画像をカバーに使う (なければライトのみ)
            const coverImage = images.find(img => img.darkBlob) || images[0];

            const card = document.createElement('div');
            card.className = 'genre-card';
            card.dataset.genre = genre;
            card.innerHTML = `
                <div class="genre-image-container" style="background-image: url('${coverImage.url}')"
                    alt="${genre}のカバー画像"></div>
                <div class="genre-card-content">
                    <h3>${genre} (${images.length})</h3>
                </div><md-ripple></md-ripple>
            `;

            card.addEventListener('click', () => {
                showGalleryView(genre);
            });

            genreList.appendChild(card);
        });

        appTitle.textContent = '壁紙を選択';

        if (isInitialLoad) {
            loadingContainer.classList.add('offscreen-left');
            genreView.classList.remove('offscreen-left');
            genreView.classList.add('offscreen-right');

            setTimeout(() => {
                genreView.classList.remove('offscreen-right');
                genreView.classList.add('active');
                currentViewElement = genreView;
                loadingContainer.style.display = 'none'; // ロード画面を非表示
            }, TRANSITION_DURATION_MS); // トランジションを考慮して少し待つ

        } else {
            switchView(genreView, isBack);
        }
    }

    // --- ダイアログとアクションの実装 ---

    function showImageActionDialog(image) {
        selectedImage = image;

        // ファイル名から拡張子を削除
        const fileNameWithoutExt = image.name.replace(/\.[^/.]+$/, "");
        dialogImageName.textContent = fileNameWithoutExt;

        const isDarkAvailable = !!image.darkBlob;
        const isLightAvailable = !!image.lightBlob;

        // アクションリストの要素を取得
        // closest('md-list-item') を使用して親要素を取得
        const setNewtabItem = document.querySelector('[data-action="setNewtab"]').closest('md-list-item');
        const setLightItem = document.querySelector('[data-action="setLight"]').closest('md-list-item');
        const setDarkItem = document.querySelector('[data-action="setDark"]').closest('md-list-item');
        const copyUrlItem = document.querySelector('[data-action="copyUrl"]').closest('md-list-item');
        const downloadItem = document.querySelector('[data-action="download"]').closest('md-list-item');

        // 基本的な表示設定
        setNewtabItem.style.display = 'flex';
        copyUrlItem.style.display = 'flex';
        downloadItem.style.display = 'flex';

        // ライト/ダーク専用設定
        if (isDarkAvailable) {
            setLightItem.style.display = 'flex';
            setDarkItem.style.display = 'flex';
        } else {
            setLightItem.style.display = 'none';
            setDarkItem.style.display = 'none';
        }

        // ライト画像データがない場合は、設定・ダウンロード系は非表示
        if (!isLightAvailable) {
            setNewtabItem.style.display = 'none';
            setLightItem.style.display = 'none';
            setDarkItem.style.display = 'none';
            downloadItem.style.display = 'none';
        }

        imageActionDialog.show();
    }

    async function handleAction(action) {
        imageActionDialog.close();
        if (!selectedImage) return;

        const { name, url, lightBlob, darkBlob } = selectedImage;
        const fileNameWithoutExt = name.replace(/\.[^/.]+$/, "");

        try {
            let dialogTitle = 'アクション完了';
            let dialogMessage = '処理が完了しました。';

            switch (action) {
                case 'setNewtab':
                    if (!lightBlob) { return; }

                    await saveToIndexedDB('newtab', lightBlob, darkBlob);

                    await deleteFromIndexedDB('light');
                    await deleteFromIndexedDB('dark');

                    const mode = darkBlob ? 'ライト・ダーク両方' : 'ライトのみ';
                    dialogTitle = '設定完了！';
                    dialogMessage = `Newtab用の壁紙を${mode}で設定しました。`;
                    break;
                case 'setLight':
                    if (!lightBlob) { return; }

                    await saveToIndexedDB('light', lightBlob);
                    await deleteFromIndexedDB('newtab');
                    await deleteFromIndexedDB('dark');
                    dialogTitle = '設定完了！';
                    dialogMessage = `Newtab用の壁紙を設定しました。`;
                    break;
                case 'setDark':
                    if (!darkBlob) { return; }

                    await saveToIndexedDB('dark', darkBlob);
                    await deleteFromIndexedDB('newtab');
                    await deleteFromIndexedDB('light');
                    dialogTitle = '設定完了！';
                    dialogMessage = `Newtab用の壁紙を設定しました。`;
                    break;
                case 'copyUrl':
                    await navigator.clipboard.writeText(url);
                    dialogTitle = 'コピー完了';
                    dialogMessage = 'コピーしました。';
                    break;
                case 'download':
                    if(!lightBlob) { return; }

                    const extension = name.substring(name.lastIndexOf('.'));
                    const baseName = name.substring(0, name.lastIndexOf('.'));
                    const fileName = `${baseName}_credit${extension}`;

                    const blobUrl = URL.createObjectURL(lightBlob);
                    downloadLink.href = blobUrl;
                    downloadLink.download = fileName;
                    downloadLink.click();
                    URL.revokeObjectURL(blobUrl);

                    dialogTitle = 'ダウンロード完了';
                    dialogMessage = `ダウンロード完了しました。<br>使用時にはクレジット表示(@Search3958，またはSentaro)をお願いします`;
                    break;
            }

            // ★ 完了ダイアログを表示
            showCompletionDialog(dialogTitle, dialogMessage);

        } catch (e) {
            console.error(`アクション ${action} 実行エラー:`, e);
            alert(`処理中にエラーが発生しました: ${e.message || e}`);
        }
    }


    function showGalleryView(genre) {
        imageGallery.innerHTML = '';

        const images = allWallpaperData[genre];
        galleryTitleHeader.textContent = `${genre}`;

        images.forEach(image => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="gallery-image-wrapper"
                    style="background-image: url('${image.url}')"
                    title="${image.name}"><md-ripple></md-ripple></div>
            `;

            const imageWrapper = div.querySelector('.gallery-image-wrapper');
            // ホバーイベントを設定
            setupHoverEvent(imageWrapper, image.url, image.hoverUrl);

            // クリックイベントにダイアログ表示ロジックを追加
            imageWrapper.addEventListener('click', () => {
                showImageActionDialog(image);
            });

            imageGallery.appendChild(div);
        });
        switchView(galleryView, false);
    }

    // --- イベントリスナーの追加 ---

    // ダイアログのアクションリスナー
    actionList.addEventListener('click', (event) => {
        const listItem = event.target.closest('md-list-item');
        if (listItem) {
            const action = listItem.dataset.action;

            let isExecutable = false;
            if (!selectedImage) {
                console.warn('selectedImageが設定されていません。');
                return;
            }

            if (action === 'copyUrl') {
                isExecutable = !!selectedImage.url;
            }
            else if (action === 'setNewtab' || action === 'setLight' || action === 'download') {
                isExecutable = !!selectedImage.lightBlob;
            }
            else if (action === 'setDark') {
                isExecutable = !!selectedImage.darkBlob;
            }


            if (isExecutable) {
                handleAction(action);
            } else if (listItem.style.display !== 'none') {
                let message = '不明なエラーにより処理できませんでした。';
                if (action === 'setDark') {
                    message = 'この壁紙にはダークテーマ用画像がないため、設定できません。';
                } else if (!selectedImage.lightBlob) {
                    message = '画像データがないため、この操作は実行できません。';
                }
                alert(message);
            }
        }
    });


    // データロード成功後、すぐにビューを切り替える
    loadWallpaperData().then(success => {
        if (success) {
            renderGenreView(true);
        } else {
            // ロード失敗時の処理
            loadingContainer.style.display = 'flex';
            const loadingText = document.getElementById('loading-text');
            const loadingBarContainer = document.getElementById('loading-bar-container');
            loadingText.style.color = 'red';
            loadingText.textContent = 'データのロード中に致命的なエラーが発生しました。';
            if(loadingBarContainer) loadingBarContainer.style.display = 'none';
        }
    });

    backButton.addEventListener('click', () => {
        if (currentViewElement === galleryView) {
            renderGenreView(false, true);
        }
    });

});