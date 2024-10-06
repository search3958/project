// ローカルストレージに保存するためのキー
const PASSWORD_KEY = "user-password";

// デフォルトパスワードの設定
let defaultPassword = "1234";

// ローカルストレージからパスワードを読み込む
function loadPassword() {
  const savedPassword = localStorage.getItem(PASSWORD_KEY);
  if (savedPassword) {
    return savedPassword;
  }
  return defaultPassword;
}

// パスワードを保存する関数
function savePassword(newPassword) {
  localStorage.setItem(PASSWORD_KEY, newPassword);
}

// 初期化
let currentPassword = loadPassword();

// ロック画面関連
const lockScreen = document.getElementById('lock-screen');
const mainContent = document.getElementById('main-content');
const authForm = document.getElementById('auth-form');
const lockButton = document.getElementById('lock-button');

// ポップオーバーとWindow関連
const popover = document.getElementById('popover');
const window1 = document.getElementById('window1');
const window2 = document.getElementById('window2');
const window3 = document.getElementById('window3');
const window4 = document.getElementById('window4');
const window5 = document.getElementById('window5');
const window6 = document.getElementById('window6');
const window7 = document.getElementById('window7');
const window8 = document.getElementById('window8');
const window9 = document.getElementById('window9');
const window10 = document.getElementById('window10');
const window11 = document.getElementById('window11');
const window12 = document.getElementById('window12');
const openPopoverButton = document.getElementById('open-popover');
const openWindow1Button = document.getElementById('open-window1');
const openWindow2Button = document.getElementById('open-window2');
const openWindow3Button = document.getElementById('open-window3');
const openWindow4Button = document.getElementById('open-window4');
const openWindow5Button = document.getElementById('open-window5');
const openWindow6Button = document.getElementById('open-window6');
const openWindow7Button = document.getElementById('open-window7');
const openWindow8Button = document.getElementById('open-window8');
const openWindow9Button = document.getElementById('open-window9');
const openWindow10Button = document.getElementById('open-window10');
const openWindow11Button = document.getElementById('open-window11');
const openWindow12Button = document.getElementById('open-window12');

// 初回読み込み時にロック画面を表示
window.addEventListener('load', () => {
  lockScreen.classList.add('show');
});

// 認証フォームの送信処理
authForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const password = document.getElementById('password').value;

  if (password === currentPassword) {
    // 認証成功時のアニメーション
    lockScreen.classList.remove('show');
    setTimeout(() => {
      lockScreen.style.display = 'none';
      mainContent.classList.remove('hidden');
      mainContent.classList.add('fade-in');
      document.getElementById('password').value = ''; // テキストボックスをクリア
    }, 500); // ロック画面が消えるまで待機
  } else {
    
showNotification('システム', 'パスワードが違います。');
    
  }
});

// ロックボタンが押されたときの処理
lockButton.addEventListener('click', function() {
  mainContent.classList.remove('fade-in');
  lockScreen.style.display = 'flex';
  setTimeout(() => {
    lockScreen.classList.add('show');
    mainContent.classList.add('hidden');
  }, 10);
});

// ポップオーバー表示
openPopoverButton.addEventListener('click', () => {
  popover.classList.remove('hidden');
  makeDraggable(popover);
  setTimeout(() => {
    popover.classList.add('show');
  }, 10);
});

// Window1表示
openWindow1Button.addEventListener('click', () => {
  window1.classList.remove('hidden');
  makeDraggable(window1);
  setTimeout(() => {
    window1.classList.add('show');
  }, 10);
});

// Window2表示
openWindow2Button.addEventListener('click', () => {
  window2.classList.remove('hidden');
  makeDraggable(window2);
  setTimeout(() => {
    window2.classList.add('show');
  }, 10);
});

// Window3表示
openWindow3Button.addEventListener('click', () => {
  window3.classList.remove('hidden');
  makeDraggable(window3);
  setTimeout(() => {
    window3.classList.add('show');
  }, 10);
});

// Window4表示
openWindow4Button.addEventListener('click', () => {
  window4.classList.remove('hidden');
  makeDraggable(window4);
  setTimeout(() => {
    window4.classList.add('show');
  }, 10);
});

// Window5表示
openWindow5Button.addEventListener('click', () => {
  window5.classList.remove('hidden');
  makeDraggable(window5);
  setTimeout(() => {
    window5.classList.add('show');
  }, 10);
});

// Window6表示
openWindow6Button.addEventListener('click', () => {
  window6.classList.remove('hidden');
  makeDraggable(window6);
  setTimeout(() => {
    window6.classList.add('show');
  }, 10);
});

// Window7表示
openWindow7Button.addEventListener('click', () => {
  window7.classList.remove('hidden');
  makeDraggable(window7);
  setTimeout(() => {
    window7.classList.add('show');
  }, 10);
});

// Window8表示
openWindow8Button.addEventListener('click', () => {
  window8.classList.remove('hidden');
  makeDraggable(window8);
  setTimeout(() => {
    window8.classList.add('show');
  }, 10);
});

// Window9表示
openWindow9Button.addEventListener('click', () => {
  window9.classList.remove('hidden');
  makeDraggable(window9);
  setTimeout(() => {
    window9.classList.add('show');
  }, 10);
});

// Window10表示
openWindow10Button.addEventListener('click', () => {
  window10.classList.remove('hidden');
  makeDraggable(window10);
  setTimeout(() => {
    window10.classList.add('show');
  }, 10);
});

// Window11表示
openWindow11Button.addEventListener('click', () => {
  window11.classList.remove('hidden');
  makeDraggable(window11);
  setTimeout(() => {
    window11.classList.add('show');
  }, 10);
});

// Window12表示
openWindow12Button.addEventListener('click', () => {
  window12.classList.remove('hidden');
  makeDraggable(window12);
  setTimeout(() => {
    window12.classList.add('show');
  }, 10);
});


// ポップオーバーとウィンドウをドラッグ可能にする関数
function makeDraggable(element) {
  let isDragging = false;
  let offsetX, offsetY;

  // headerクラスを持つ部分だけをドラッグできるようにする
  const header = element.querySelector('.header');
  if (!header) return; // headerが存在しない場合は何もしない

  header.addEventListener('mousedown', (event) => {
    isDragging = true;
    offsetX = event.clientX - element.getBoundingClientRect().left;
    offsetY = event.clientY - element.getBoundingClientRect().top;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  document.addEventListener('mousemove', (event) => {
    if (isDragging) {
      element.style.left = `${event.clientX - offsetX}px`;
      element.style.top = `${event.clientY - offsetY}px`;
    }
  });
}


// ポップオーバーを閉じる処理
document.querySelector('.close-popover').addEventListener('click', () => {
  popover.classList.remove('show'); // アニメーションの開始
  setTimeout(() => {
    popover.classList.add('hidden'); // 完全に隠す
  }, 300); // アニメーションが終わるまで待つ
});

// ウィンドウを閉じる処理
const closeWindowButtons = document.querySelectorAll('.close-window');
closeWindowButtons.forEach(button => {
  button.addEventListener('click', () => {
    const windowElement = button.closest('.window');
    windowElement.classList.remove('show'); // アニメーションの開始
    setTimeout(() => {
      windowElement.classList.add('hidden'); // 完全に隠す
    }, 300); // アニメーションが終わるまで待つ
  });
});

// パスワード変更ボタン
document.getElementById('change-password-button').addEventListener('click', () => {
  const newPassword = document.getElementById('new-password').value;
  savePassword(newPassword);
  
showNotification('システム', 'パスワードは正常に変更されました。');
  document.getElementById('new-password').value = ''; // テキストボックスをクリア
});

const bgColorPicker = document.getElementById('bgColorPicker');
const textColorPicker = document.getElementById('textColorPicker');
const mainColorPicker = document.getElementById('ColorPicker');
const root = document.documentElement;

// 初期化：保存された値があればそれを使用
document.addEventListener('DOMContentLoaded', () => {
  const savedBgColor = localStorage.getItem('appBgColor');
  const savedTextColor = localStorage.getItem('appTextColor');
  const savedMainColor = localStorage.getItem('mainColor');

  if (savedBgColor) {
    root.style.setProperty('--app-bg-color', savedBgColor);
    bgColorPicker.value = savedBgColor; // カラーピッカーの初期値も設定
  }

  if (savedTextColor) {
    root.style.setProperty('--app-text-color', savedTextColor);
    textColorPicker.value = savedTextColor; // カラーピッカーの初期値も設定
  }

  if (savedMainColor) {
    root.style.setProperty('--maincolor', savedMainColor);
    mainColorPicker.value = savedMainColor; // カラーピッカーの初期値も設定
  }
});

// アプリの背景色を変更し、ローカルに保存
bgColorPicker.addEventListener('input', (event) => {
  const bgColor = event.target.value;
  root.style.setProperty('--app-bg-color', `${bgColor}a0`); // 透明度を設定
  localStorage.setItem('appBgColor', `${bgColor}bb`); // ローカルに保存
});

// アプリの文字色を変更し、ローカルに保存
textColorPicker.addEventListener('input', (event) => {
  const textColor = event.target.value;
  root.style.setProperty('--app-text-color', textColor);
  localStorage.setItem('appTextColor', textColor); // ローカルに保存
});

// アクセントカラーを変更し、ローカルに保存
mainColorPicker.addEventListener('input', (event) => {
  const mainColor = event.target.value;
  root.style.setProperty('--maincolor', mainColor);
  localStorage.setItem('mainColor', mainColor); // ローカルに保存
});


        const notification = document.getElementById('notification');
        const notificationTitle = document.getElementById('notificationTitle');
        const notificationContent = document.getElementById('notificationContent');

        // 通知の内容を設定する関数
        function showNotification(title, content) {
            notificationTitle.innerText = title;
            notificationContent.innerText = content;

            notification.classList.remove('hide');
            notification.classList.add('show');

            // クリックしたら通知を消す
            notification.onclick = hideNotification;

            // 5秒後に自動で通知を消す（オプション）
            setTimeout(hideNotification, 5000);
        }

        // 通知を隠す関数
        function hideNotification() {
            notification.classList.remove('show');
            notification.classList.add('hide');
        }

 document.getElementById('sendButton54321').addEventListener('click', function() {
            const webhookUrl = document.getElementById('webhookUrl12345').value; // WebHook URLを取得
            const textInput = document.getElementById('textInput67890').value; // テキストボックスの内容を取得

            // 入力チェック
            if (!webhookUrl || !textInput) {
                            showNotification('Webhook', 'WebhookURLと内容を入力してください。');
                return;
            }

            const data = {
                content: textInput // 送信するデータ
            };

            // Fetch APIを使用してデータを送信
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => {
if (response.ok) {
            showNotification('Webhook', '送信完了')
                    document.getElementById('textInput67890').value = ''; // テキストボックスをクリア
                    document.getElementById('webhookUrl12345').value = ''; // WebHook URLをクリア
                } else {
                  showNotification('Webhook', '送信失敗:' + response.statusText);
                   }
            })
            .catch(error => {
                showNotification('Webhook', 'エラー:' + error.message);
            });
        });



        // カスタム通知を表示するボタンのイベント
        document.getElementById('showCustomNotification').addEventListener('click', () => {
            showNotification('カスタム通知', 'これはカスタムメッセージです！');
        });

        // グローバルに呼び出せるようにする
        window.showNotification = showNotification;
