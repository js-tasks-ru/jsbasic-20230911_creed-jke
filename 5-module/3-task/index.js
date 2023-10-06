function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const carouselInner = document.querySelector('.carousel__inner');
  const leftArrow = document.querySelector('.carousel__arrow_left');
  const rightArrow = document.querySelector('.carousel__arrow_right');

  let position = 0;
  const slideWidth = document.querySelector('.carousel__slide').offsetWidth;
  const minWidth = 0;
  const maxWidth = slideWidth * (carouselInner.children.length - 1);
  leftArrow.style.display = 'none';

  // Проверка отображения стрелки
  const checkArrow = function() {
    Math.abs(position) === maxWidth ? rightArrow.style.display = 'none' : rightArrow.style.display = '';
    position === minWidth ? leftArrow.style.display = 'none' : leftArrow.style.display = '';
  }

  carousel.addEventListener('click', function(event) {

    // Проверка на стрелку + вложенный img
    if (!event.target.closest('.carousel__arrow')) return;

    // Прокрутка влево
    if (event.target.closest('.carousel__arrow_left')) {
      position += slideWidth;
      carouselInner.style.transform = `translateX(${Math.min(position, minWidth)}px)`;
      checkArrow();
    }

    // Прокрутка вправо
    if (event.target.closest('.carousel__arrow_right')) {
      position -= slideWidth;
      carouselInner.style.transform = `translateX(${(Math.max(position, -maxWidth))}px)`;
      checkArrow();
    }
  })
}
