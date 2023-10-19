import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  elem = null;

  constructor(categories) {
    this.categories = categories;

    this.elem = createElement(this.#template());
    this.#render();
  }

  #render() {
    const menu = this.elem.querySelector('.ribbon__inner');
    const leftArrow = this.elem.querySelector('.ribbon__arrow_left');
    const rightArrow = this.elem.querySelector('.ribbon__arrow_right');

    this.elem.addEventListener('click', function(event) {
      if (!event.target.closest('.ribbon__arrow')) return;

      if (event.target.closest('.ribbon__arrow_right')) {
        menu.scrollBy(350, 0);
      } else if (event.target.closest('.ribbon__arrow_left')) {
        menu.scrollBy(-350, 0);
      };

      menu.addEventListener('scroll', () => {
        let scrollRight = menu.scrollWidth - menu.scrollLeft - menu.clientWidth;
        
        scrollRight < 1 ? rightArrow.classList.remove('ribbon__arrow_visible') : rightArrow.classList.add('ribbon__arrow_visible');
        menu.scrollLeft < 1 ? leftArrow.classList.remove('ribbon__arrow_visible') : leftArrow.classList.add('ribbon__arrow_visible');
      });

    });

    menu.addEventListener('click', function(event) {
      if (event.target.tagName != 'A') return;

      event.preventDefault();

      let previous = menu.querySelector('.ribbon__item_active');
      if (previous) previous.classList.remove('ribbon__item_active');

      event.target.classList.add('ribbon__item_active');
      
      event.target.closest('.ribbon').dispatchEvent(new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id,
        bubbles: true
      }));
    });
  }

  #template() {
    return `
    <div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
        ${this.categories.map(item => `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`).join("\n")}
      </nav>
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>
    `
  }
}
