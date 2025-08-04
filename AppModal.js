const modalTemplate = document.createElement('template');
modalTemplate.innerHTML = `
  <style>
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
    }

    #modal-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.6);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.5);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.5);
      }
    }

    .modal-content {
      background-color: #fff;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.25);
      position: relative;
      max-width: 500px;
      width: 90%;
      min-width: 300px;
    }

    .fadeIn .modal-content {
      animation: fadeIn 0.3s ease-out forwards;
    }

    .fadeOut .modal-content {
      animation: fadeOut 0.3s ease-in forwards;
    }

    .close-btn {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 1.75rem;
      font-weight: bold;
      color: #666;
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 0.5rem;
      line-height: 1;
    }
    .close-btn:hover {
      color: #000;
    }
  </style>
  <div id="modal-container">
    <div class="modal-content">
      <button class="close-btn">&times;</button>
      <slot></slot>
    </div>
  </div>
`;

class AppModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(modalTemplate.content.cloneNode(true));

    this._modalContainer = this.shadowRoot.getElementById('modal-container');
    this._handleEscKey = this._handleEscKey.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.close-btn').addEventListener('click', () => this.close());

    // Close the modal when the backdrop is clicked.
    this.addEventListener('click', e => {
      // e.composedPath() shows the path the event will take.
      // If the modal content is not in the path, it means the click
      // was on the backdrop.
      if (!e.composedPath().includes(this.shadowRoot.querySelector('.modal-content'))) {
        this.close();
      }
    });
  }

  open() {
    if (!this.parentElement) {
      document.body.appendChild(this);
    }
    
    document.addEventListener('keydown', this._handleEscKey);
    this._modalContainer.classList.remove('fadeOut');
    this._modalContainer.classList.add('fadeIn');
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
  }

  close() {
    this._modalContainer.classList.remove('fadeIn');
    this._modalContainer.classList.add('fadeOut');
    
    this.shadowRoot.querySelector('.modal-content').addEventListener('animationend', () => {
      if (this._modalContainer.classList.contains('fadeOut')) {
        if (this.parentElement) {
          this.parentElement.removeChild(this);
        }
        this._modalContainer.classList.remove('fadeOut'); // Reset for next time
        this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
      }
    }, { once: true });

    document.removeEventListener('keydown', this._handleEscKey);
  }

  _handleEscKey(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

customElements.define('app-modal', AppModal);
