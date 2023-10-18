export default class StepSlider {
  elem = null;

  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.#render();
  }

  #render() {
    const temp = document.createElement('div');
    temp.innerHTML = this.#template();
    this.elem = temp.firstElementChild;

    this.#clicker();
    this.#slider();
  }

  #clicker() {
    this.elem.addEventListener('click', this.#onClick)
  }

  #onClick = (event) => {
    const sliderValue = this.elem.querySelector('.slider__value');
    const currentActive = this.elem.querySelector('.slider__step-active');
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    
    let innerClick = event.clientX - this.elem.offsetLeft;
    const stepWidth = this.elem.clientWidth / (this.steps - 1);
    let stepValue = Math.round(innerClick / stepWidth);

    sliderValue.textContent = stepValue;
    currentActive.classList.remove('slider__step-active');
    for (let span of this.elem.querySelectorAll('span')) { // в #template добавил data-атрибуты для поиска нужного span
      if (span.dataset.step == stepValue) span.classList.add('slider__step-active');
    }
    thumb.style.left = 100 / (this.steps - 1) * stepValue + '%';
    progress.style.width = 100 / (this.steps - 1) * stepValue + '%';

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: Number(this.elem.querySelector('.slider__value').textContent),
      bubbles: true
    })); 
  }

  #slider() {
    const thumb = this.elem.querySelector('.slider__thumb');

    thumb.ondragstart = () => false;
    thumb.addEventListener('pointerdown', this.#onPointerDown);
  }

  #onPointerDown = (event) => {
    const sliderValue = this.elem.querySelector('.slider__value');
    const currentActive = this.elem.querySelector('.slider__step-active');
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    
    let innerClick = event.clientX - this.elem.offsetLeft;
    const stepWidth = this.elem.clientWidth / (this.steps - 1);
    let stepValue = Math.round(innerClick / stepWidth);

    sliderValue.textContent = stepValue;
    currentActive.classList.remove('slider__step-active');
    for (let span of this.elem.querySelectorAll('span')) {
      if (span.dataset.step == stepValue) span.classList.add('slider__step-active');
    }
    thumb.style.left = 100 / (this.steps - 1) * stepValue + '%';
    progress.style.width = 100 / (this.steps - 1) * stepValue + '%';

    document.addEventListener('pointermove', this.#onPointerMove);
    this.elem.addEventListener('pointerup', this.#onPointerUp);
  }
  
  #onPointerMove = (event) => {
    this.elem.classList.add('slider_dragging');

    const sliderValue = this.elem.querySelector('.slider__value');
    const currentActive = this.elem.querySelector('.slider__step-active');
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    let innerClick = event.clientX - this.elem.offsetLeft;
    if (innerClick < 0) innerClick = 0;
    if (innerClick > this.elem.offsetWidth) innerClick = this.elem.offsetWidth;

    let percentClick = innerClick / (this.elem.offsetWidth / 100);
    const stepWidth = this.elem.clientWidth / (this.steps - 1);
    let stepValue = Math.round(innerClick / stepWidth);
    
    sliderValue.textContent = stepValue;
    // ниже проверка потому что ругались тесты
    // без нее все работает, но скорее дело в том, 
    // что реализация с косяком, не влияющим
    // на внешний вид, но тестам выдающая ошибку
    if (currentActive) currentActive.classList.remove('slider__step-active'); 
    for (let span of this.elem.querySelectorAll('span')) {
      if (span.dataset.step == stepValue) span.classList.add('slider__step-active');
    }
    thumb.style.left = percentClick + '%';
    progress.style.width = percentClick + '%';
  }

  #onPointerUp = () => {
    this.elem.classList.remove('slider_dragging');

    document.removeEventListener('pointermove', this.#onPointerMove);

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: Number(this.elem.querySelector('.slider__value').textContent),
      bubbles: true
    }));
  }

  #spanHelper(steps, value) {
    let result = '';

    for (let i = 0; i < steps; i++) {
      if (i === value) {
        result += `<span class="slider__step-active" data-step='${i}'></span>\n`;
      } else if (steps - i === 1) {
        result += `<span data-step='${i}'></span>`;
      } else {
        result += `<span data-step='${i}'></span>\n`;
      };
    }

    return result;
  }

  #template() {
    return `
    <div class="slider">
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: 50%;"></div>
      <div class="slider__steps">
        ${this.#spanHelper(this.steps, this.value)}
      </div>
    </div>
  `;
  }
}
