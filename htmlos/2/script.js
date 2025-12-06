class WindowManager {
            constructor() {
                this.windows = document.querySelectorAll('.window');
                this.buttons = document.querySelectorAll('[data-target]');
                this.zIndex = 100;
                this.RESIZE_THRESHOLD = 60; 
                this.currentResizeHover = null; 
                this.init();
            }

            init() {
                this.buttons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.openWindow(btn.getAttribute('data-target'));
                    });
                });

                this.windows.forEach(win => {
                    this.setupResizeAndMove(win);
                    this.setupCloseButton(win);
                });
                
                document.addEventListener('mousemove', this.handleGlobalMouseMove.bind(this));
                
                // アプリの初期化
                this.initCalculator();
                this.initClock();
                this.initTextEditor();
                this.initTimer();
                this.initStopwatch();
                this.initIframeBrowser();
                this.initAppControl();
            }

            // --- Window Management Methods (修正箇所) ---

            openWindow(id) {
                const win = document.getElementById(id);
                if (win) {
                    // 1. ウィンドウを画面中央に配置
                    const winRect = win.getBoundingClientRect();
                    const screenWidth = window.innerWidth;
                    const screenHeight = window.innerHeight;

                    // 中央位置を計算
                    const centerX = (screenWidth - winRect.width) / 2;
                    const centerY = (screenHeight - winRect.height) / 2;

                    // CSSスタイルを更新
                    win.style.left = `${centerX}px`;
                    win.style.top = `${centerY}px`;

                    // 2. ウィンドウをアクティブにして前面へ
                    win.classList.add('active');
                    this.bringToFront(win);
                    
                    if (id === 'window-10') {
                        this.updateAppControlList(); 
                    }
                }
            }

            closeWindow(win) {
                win.classList.remove('active');
                win.classList.remove('is-resizing');
                win.classList.remove('is-resize-hover');
                this.updateAppControlList(); 
            }

            bringToFront(win) {
                this.zIndex++;
                win.style.zIndex = this.zIndex;
            }

            setupCloseButton(win) {
                const closeBtn = win.querySelector('.close-btn-area');
                closeBtn.addEventListener('mousedown', (e) => {
                    if (!win.classList.contains('is-resizing')) {
                        e.stopPropagation(); 
                        this.closeWindow(win);
                    }
                });
            }

            // --- Resize/Move Logic (前回の修正を維持) ---

            isNearResizeCorner(win, clientX, clientY) {
                const rect = win.getBoundingClientRect();
                const threshold = this.RESIZE_THRESHOLD; 

                const distanceX = clientX - (rect.left + rect.width);
                const isNearRight = distanceX >= -threshold && distanceX <= 5; 

                const distanceY = clientY - (rect.top + rect.height);
                const isNearBottom = distanceY >= -threshold && distanceY <= threshold; 
                
                return isNearRight && isNearBottom;
            }
            
            handleGlobalMouseMove(e) {
                if (document.querySelector('.window.is-resizing') || document.querySelector('.control-bar.dragging')) {
                    return;
                }

                let foundHover = false;

                const activeWindows = Array.from(this.windows).filter(win => win.classList.contains('active'));
                activeWindows.sort((a, b) => (parseInt(b.style.zIndex) || 0) - (parseInt(a.style.zIndex) || 0));

                for (const win of activeWindows) {
                    if (this.isNearResizeCorner(win, e.clientX, e.clientY)) {
                        if (this.currentResizeHover !== win) {
                            if (this.currentResizeHover) {
                                this.currentResizeHover.classList.remove('is-resize-hover');
                            }
                            win.classList.add('is-resize-hover');
                            this.currentResizeHover = win;
                        }
                        document.body.classList.add('global-resize-cursor');
                        foundHover = true;
                        break; 
                    }
                }

                if (!foundHover) {
                    if (this.currentResizeHover) {
                        this.currentResizeHover.classList.remove('is-resize-hover');
                        this.currentResizeHover = null;
                    }
                    document.body.classList.remove('global-resize-cursor');
                }
            }


            setupResizeAndMove(win) {
                const controlBar = win.querySelector('.control-bar');
                
                win.addEventListener('mousemove', (e) => {
                    if (!win.classList.contains('is-resizing') && !win.classList.contains('is-resize-hover') && e.target.closest('.control-bar')) {
                        win.style.cursor = 'grab';
                    } else if (!win.classList.contains('is-resizing') && !win.classList.contains('is-resize-hover')) {
                        win.style.cursor = 'default'; 
                    }
                });

                win.addEventListener('mousedown', (e) => {
                    this.bringToFront(win);
                    win.classList.add('no-transition');

                    const startX = e.clientX;
                    const startY = e.clientY;
                    const rect = win.getBoundingClientRect();
                    
                    const isNearCorner = this.isNearResizeCorner(win, startX, startY);
                    
                    const isResizing = isNearCorner; 
                    
                    const isMoving = e.target.closest('.control-bar') && !isResizing;
                    
                    const isCloseButton = e.target.closest('.close-btn-area');

                    if (!isResizing && !isMoving || isCloseButton) {
                        win.classList.remove('no-transition');
                        return;
                    }

                    if (isResizing) {
                        win.classList.add('is-resizing');
                        const startWidth = rect.width;
                        const startHeight = rect.height;
                        const minWidth = parseInt(win.style.minWidth) || 250;
                        const minHeight = parseInt(win.style.minHeight) || 150;

                        const onMouseMove = (moveEvent) => {
                            const dx = moveEvent.clientX - startX;
                            const dy = moveEvent.clientY - startY;

                            win.style.width = `${Math.max(minWidth, startWidth + dx)}px`;
                            win.style.height = `${Math.max(minHeight, startHeight + dy)}px`;
                        };

                        const onMouseUp = () => {
                            win.classList.remove('is-resizing');
                            win.classList.remove('is-resize-hover');
                            win.classList.remove('no-transition');
                            document.body.classList.remove('global-resize-cursor');
                            document.removeEventListener('mousemove', onMouseMove);
                            document.removeEventListener('mouseup', onMouseUp);
                        };

                        document.addEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', onMouseUp);
                    } 
                    
                    else if (isMoving) {
                        controlBar.classList.add('dragging');
                        const initialLeft = rect.left;
                        const initialTop = rect.top;

                        const onMouseMove = (moveEvent) => {
                            const dx = moveEvent.clientX - startX;
                            const dy = moveEvent.clientY - startY;
                            
                            win.style.left = `${initialLeft + dx}px`;
                            win.style.top = `${initialTop + dy}px`; 
                        };

                        const onMouseUp = () => {
                            controlBar.classList.remove('dragging');
                            win.classList.remove('no-transition');
                            document.removeEventListener('mousemove', onMouseMove);
                            document.removeEventListener('mouseup', onMouseUp);
                        };

                        document.addEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', onMouseUp);
                    }
                });
            }
            
            // --- Application Implementations (変更なし) ---

            initCalculator() {
                const calculator = document.getElementById('window-4');
                if (!calculator) return;

                const display = calculator.querySelector('.calc-display');
                const buttons = calculator.querySelector('.calc-buttons');
                let currentInput = '0';
                let previousInput = null;
                let operator = null;
                let resetDisplay = false;

                const updateDisplay = () => {
                    display.textContent = currentInput;
                };

                const calculate = () => {
                    const prev = parseFloat(previousInput);
                    const current = parseFloat(currentInput);
                    if (isNaN(prev) || isNaN(current) || !operator) return;

                    let result;
                    switch (operator) {
                        case '+': result = prev + current; break;
                        case '-': result = prev - current; break;
                        case '*': result = prev * current; break;
                        case '/': result = prev / current; break;
                        default: return;
                    }
                    currentInput = String(Math.round(result * 10000) / 10000); 
                    previousInput = null;
                    operator = null;
                    resetDisplay = true;
                    updateDisplay();
                };

                buttons.addEventListener('click', (e) => {
                    const target = e.target;
                    if (target.tagName !== 'BUTTON') return;

                    const value = target.textContent;

                    if (target.classList.contains('clear')) {
                        currentInput = '0';
                        previousInput = null;
                        operator = null;
                        resetDisplay = false;
                    } else if (target.classList.contains('equal')) {
                        calculate();
                    } else if (target.classList.contains('operator') && !target.classList.contains('equal')) {
                        if (value === '±') {
                            currentInput = String(parseFloat(currentInput) * -1);
                        } else if (value === '%') {
                            currentInput = String(parseFloat(currentInput) / 100);
                            resetDisplay = true;
                        } else {
                            if (previousInput && operator) {
                                calculate(); 
                            }
                            previousInput = currentInput;
                            operator = value;
                            resetDisplay = true;
                        }
                    } else if (value === '.') {
                        if (!currentInput.includes('.')) {
                            currentInput += '.';
                        }
                    } else { 
                        if (currentInput === '0' || resetDisplay) {
                            currentInput = value;
                            resetDisplay = false;
                        } else {
                            currentInput += value;
                        }
                    }

                    updateDisplay();
                });

                updateDisplay(); 
            }

            initClock() {
                const clockWin = document.getElementById('window-5');
                if (!clockWin) return;
                const clockTime = clockWin.querySelector('.clock-time');

                const updateClock = () => {
                    const now = new Date();
                    const hours = now.getHours().toString().padStart(2, '0');
                    const minutes = now.getMinutes().toString().padStart(2, '0');
                    const seconds = now.getSeconds().toString().padStart(2, '0');
                    
                    clockTime.textContent = `${hours}:${minutes}:${seconds}`;
                };

                updateClock();
                setInterval(updateClock, 1000); 
            }
            
            initTextEditor() {
                const editorWin = document.getElementById('window-6');
                if (!editorWin) return;
                const textarea = editorWin.querySelector('textarea');
                
                const contentDiv = editorWin.querySelector('.window-content');
                if(contentDiv) {
                    const adjustHeight = () => {
                        textarea.style.height = `${contentDiv.offsetHeight - 20}px`; 
                    };
                    adjustHeight();
                    new ResizeObserver(adjustHeight).observe(editorWin);
                }
            }

            initTimer() {
                const timerWin = document.getElementById('window-7');
                if (!timerWin) return;
                
                const input = timerWin.querySelector('input');
                const display = timerWin.querySelector('.timer-display');
                const startBtn = timerWin.querySelector('.timer-start');
                const resetBtn = timerWin.querySelector('.timer-reset');

                let totalSeconds = 10;
                let remainingSeconds = 10;
                let intervalId = null;
                let isRunning = false;

                const formatTime = (seconds) => {
                    const min = Math.floor(seconds / 60).toString().padStart(2, '0');
                    const sec = (seconds % 60).toString().padStart(2, '0');
                    return `${min}:${sec}`;
                };

                const updateDisplay = () => {
                    display.textContent = formatTime(remainingSeconds);
                    if (remainingSeconds === 0) {
                        clearInterval(intervalId);
                        display.textContent = "DONE!";
                        isRunning = false;
                        startBtn.textContent = 'スタート';
                        resetBtn.disabled = false;
                    }
                };

                const startTimer = () => {
                    if (isRunning) return;
                    isRunning = true;
                    startBtn.textContent = '一時停止';
                    resetBtn.disabled = true;

                    intervalId = setInterval(() => {
                        if (remainingSeconds > 0) {
                            remainingSeconds--;
                            updateDisplay();
                        }
                    }, 1000);
                };

                const pauseTimer = () => {
                    if (!isRunning) return;
                    clearInterval(intervalId);
                    isRunning = false;
                    startBtn.textContent = '再開';
                    resetBtn.disabled = false;
                };

                const resetTimer = () => {
                    clearInterval(intervalId);
                    isRunning = false;
                    totalSeconds = parseInt(input.value) * 60 || 10; 
                    remainingSeconds = totalSeconds;
                    startBtn.textContent = 'スタート';
                    resetBtn.disabled = true;
                    updateDisplay();
                };

                input.addEventListener('change', () => {
                    if (!isRunning) {
                        resetTimer();
                    }
                });

                startBtn.addEventListener('click', () => {
                    if (isRunning) {
                        pauseTimer();
                    } else {
                        startTimer();
                    }
                });

                resetBtn.addEventListener('click', resetTimer);

                resetTimer(); 
            }
            
            initStopwatch() {
                const stopwatchWin = document.getElementById('window-8');
                if (!stopwatchWin) return;
                
                const display = stopwatchWin.querySelector('.stopwatch-display');
                const startBtn = stopwatchWin.querySelector('.stopwatch-start');
                const resetBtn = stopwatchWin.querySelector('.stopwatch-reset');

                let startTime = 0;
                let elapsedTime = 0;
                let intervalId = null;
                let isRunning = false;

                const formatTime = (time) => {
                    const centiseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
                    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
                    const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
                    return `${minutes}:${seconds}.${centiseconds}`;
                };

                const updateDisplay = () => {
                    const currentTime = Date.now();
                    elapsedTime = currentTime - startTime;
                    display.textContent = formatTime(elapsedTime);
                };

                const startStopwatch = () => {
                    if (isRunning) return;
                    isRunning = true;
                    startBtn.textContent = '一時停止';
                    resetBtn.disabled = true;
                    
                    startTime = Date.now() - elapsedTime; 

                    intervalId = setInterval(updateDisplay, 10); 
                };

                const pauseStopwatch = () => {
                    if (!isRunning) return;
                    clearInterval(intervalId);
                    isRunning = false;
                    startBtn.textContent = '再開';
                    resetBtn.disabled = false;
                };

                const resetStopwatch = () => {
                    clearInterval(intervalId);
                    isRunning = false;
                    startTime = 0;
                    elapsedTime = 0;
                    startBtn.textContent = 'スタート';
                    resetBtn.disabled = true;
                    display.textContent = '00:00.00';
                };

                startBtn.addEventListener('click', () => {
                    if (isRunning) {
                        pauseStopwatch();
                    } else {
                        startStopwatch();
                    }
                });

                resetBtn.addEventListener('click', resetStopwatch);

                resetStopwatch(); 
            }
            
            initIframeBrowser() {
                const browserWin = document.getElementById('window-9');
                if (!browserWin) return;
                
                const urlInput = browserWin.querySelector('.url-input');
                const goButton = browserWin.querySelector('.go-button');
                const iframeView = browserWin.querySelector('.iframe-view');
                const barTitle = browserWin.querySelector('.bar-title');
                
                const loadUrl = () => {
                    let url = urlInput.value.trim();
                    if (!url) return;
                    
                    if (!/^https?:\/\//i.test(url)) {
                        url = `https://${url}`;
                    }
                    
                    iframeView.src = url;
                    barTitle.textContent = url;
                };
                
                goButton.addEventListener('click', loadUrl);
                urlInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        loadUrl();
                    }
                });
                
                loadUrl(); 
            }

            initAppControl() {
                const appControlWin = document.getElementById('window-10');
                if (!appControlWin) return;
                
                appControlWin.listElement = appControlWin.querySelector('.app-control-list');
                this.updateAppControlList = this.updateAppControlList.bind(this);
            }
            
            updateAppControlList() {
                const appControlWin = document.getElementById('window-10');
                if (!appControlWin || !appControlWin.listElement) return;

                const controllableWindows = Array.from(this.windows).filter(win => win.id !== 'window-10');
                const list = appControlWin.listElement;
                list.innerHTML = ''; 

                controllableWindows.forEach(win => {
                    const isActive = win.classList.contains('active');
                    const appName = win.getAttribute('data-app-name') || win.id;
                    const listItem = document.createElement('li');
                    
                    listItem.classList.toggle('inactive', !isActive);
                    listItem.dataset.targetId = win.id;

                    listItem.innerHTML = `
                        <span class="app-name">${appName}</span>
                        <button class="${isActive ? 'close' : 'open'}" data-action="${isActive ? 'close' : 'open'}">
                            ${isActive ? '閉じる' : '開く'}
                        </button>
                    `;
                    
                    list.appendChild(listItem);
                });

                list.addEventListener('click', (e) => {
                    const button = e.target.closest('button');
                    if (!button) return;
                    
                    const targetId = button.closest('li').dataset.targetId;
                    const targetWin = document.getElementById(targetId);
                    const action = button.dataset.action;

                    if (targetWin) {
                        if (action === 'open') {
                            this.openWindow(targetId);
                        } else if (action === 'close') {
                            this.closeWindow(targetWin);
                        }
                        this.updateAppControlList();
                    }
                });
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            new WindowManager();
        });