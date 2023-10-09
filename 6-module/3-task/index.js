import createElement from '../../assets/lib/create-element.js';

export default class Carousel {

  elem = null;
  

  constructor(slides) {
    this.slides = slides;
    
    this.elem = createElement(this.#template());
    this.#slideMove();
  }



  #slideMove() {

    this.elem.addEventListener('click', (event) => {
      if (!event.target.closest('.carousel__button')) return;

      this.elem.dispatchEvent(new CustomEvent('product-add', {
        detail: event.target.closest('.carousel__slide').dataset.id,
        bubbles: true
      }));
    });

    this.position = 0;
    this.minWidth = 0;

    this.elem.addEventListener('click', (event) => {
      this.carouselInner = document.querySelector('.carousel__inner');
      this.slideWidth = document.querySelector('.carousel__slide').offsetWidth;
      this.maxWidth = this.slideWidth * (this.carouselInner.children.length - 1);

      if (!event.target.closest('.carousel__arrow')) return;

      if (event.target.closest('.carousel__arrow_left')) {
        this.position += this.slideWidth;
        this.carouselInner.style.transform = `translateX(${Math.min(this.position, this.minWidth)}px)`;
        this.#arrowDisplay();
      }

      if (event.target.closest('.carousel__arrow_right')) {
        this.position -= this.slideWidth;
        this.carouselInner.style.transform = `translateX(${(Math.max(this.position, -this.maxWidth))}px)`;
        this.#arrowDisplay();
      }
    });
  }

  #arrowDisplay() {
    this.leftArrow = document.querySelector('.carousel__arrow_left');
    this.rightArrow = document.querySelector('.carousel__arrow_right');

    Math.abs(this.position) === this.maxWidth ? this.rightArrow.style.display = 'none' : this.rightArrow.style.display = '';
    this.position === this.minWidth ? this.leftArrow.style.display = 'none' : this.leftArrow.style.display = '';
  }

  #template() {
    return `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left" style="display: none">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this.slides.map(item => `
        <div class="carousel__slide" data-id="${item.id}">
          <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${item.price.toFixed(2)}<span>
            <div class="carousel__title">${item.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
    `).join('\n')}
      </div>
    </div>
    `;
  }
}
