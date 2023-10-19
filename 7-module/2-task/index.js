import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  elem = null;
  
  constructor() {
    this.elem = createElement(this.#template());
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    this.elem.querySelector('.modal__close').addEventListener('click', () => {
      this.elem.remove();
      document.body.classList.remove('is-modal-open');

      document.removeEventListener('keydown', this.#escClose);
    });

    document.addEventListener('keydown', this.#escClose, {once: true});

  }
  
  #escClose(event) {
    if (event.code === 'Escape') {
      document.querySelector('.modal').remove();
      document.body.classList.remove('is-modal-open');
    }
  }

  setTitle(title) {
    this.elem.querySelector('.modal__title').innerHTML = title;
  }

  setBody(node) {
    let body = this.elem.querySelector('.modal__body');
    body.innerHTML = '';
    body.append(node);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');

    document.removeEventListener('keydown', this.#escClose);
  }

  #template() {
    return `
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
          </h3>
        </div>
        <div class="modal__body">
        </div>
      </div>
    </div>
    `;
  }
}
