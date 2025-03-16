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
        imgDiv.style.backgroundImage = `url('${url}')`;
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
        navigator.clipboard.writeText(this.getAttribute('image-url'));
        alert('URLをコピーしました！');
      });
      
      this.querySelector('#download').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = this.getAttribute('image-url');
        link.download = 'image.jpg';
        link.click();
      });

      this.querySelector('#setNewtab').addEventListener('click', () => {
        const imageUrl = this.getAttribute('image-url');
        localStorage.setItem('backgroundImageUrl', imageUrl);
        alert('Newtab用の画像URLが保存されました！');
      });
    }
  }

  customElements.define('img-btns', ImgBtns);