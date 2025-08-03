class ImgBtns extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
    }

    static get observedAttributes() {
      return ['image-url'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'image-url') {
        this.updateImage(newValue);
      }
    }

    updateImage(url) {
      const imgDiv = this.querySelector('.img');
      if (imgDiv) {
        const basePreviewUrl = 'https://search3958.github.io/newtab/bgimg/small/';
        imgDiv.style.backgroundImage = `url('${basePreviewUrl}${url}')`;
      }
    }

    render() {
      // Shadow DOM を使わず、カスタム要素内に直接 HTML を設定
      this.innerHTML = `
        <div class="imgcontainer">
          <div class="img"></div>
          <div class="btns">
            <button id="copy">コピー<md-ripple></md-ripple></button>
            <button id="download">保存<md-ripple></md-ripple></button>
            <button id="setNewtab">Newtabに設定<md-ripple></md-ripple></button>
          </div>
        </div>
      `;
      // 初期画像の設定
      this.updateImage(this.getAttribute('image-url') || '');
      // 各ボタンのイベント設定
      this.querySelector('#copy').addEventListener('click', () => {
        const baseUrl = 'https://search3958.github.io/newtab/bgimg/';
        const fullUrl = `${baseUrl}${this.getAttribute('image-url')}`;
        navigator.clipboard.writeText(fullUrl);
        alert('URLをコピーしました！');
      });
      
      this.querySelector('#download').addEventListener('click', () => {
        const baseUrl = 'https://search3958.github.io/newtab/bgimg/';
        const fullUrl = `${baseUrl}${this.getAttribute('image-url')}`;
        const link = document.createElement('a');
        link.href = fullUrl;
        link.download = 'image.jpg';
        link.click();
      });

      this.querySelector('#setNewtab').addEventListener('click', () => {
        const baseUrl = 'https://search3958.github.io/newtab/bgimg/';
        const imageUrl = this.getAttribute('image-url');
      
        // URLのクエリパラメータからimage-urlを取得
        const params = new URLSearchParams(window.location.search);
        const urlParamImage = params.get('image-url');
      
        const fullUrl = `${baseUrl}${imageUrl}`;
      
        // URL変数が 'new' ならキーを 'custom_wallpaper' に、それ以外は 'backgroundImageUrl'
        const key = (urlParamImage === 'new') ? 'custom_wallpaper' : 'backgroundImageUrl';
      
        localStorage.setItem(key, fullUrl);
        alert(`NewTabに画像をセットしました！（詳細：${key}）`);
      });
      
      
    }
  }

  customElements.define('img-btns', ImgBtns);