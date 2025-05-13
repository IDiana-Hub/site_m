// carousel.js

document.addEventListener('DOMContentLoaded', () => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dots = Array.from(document.querySelectorAll('.dot'));
  const btnPrev = document.querySelector('.carousel-btn.prev');
  const btnNext = document.querySelector('.carousel-btn.next');
  let current = 0;
  const total = slides.length;
  let intervalId;

  function updateCarousel(index) {
    slides.forEach(slide => {
      const i = parseInt(slide.dataset.index, 10);
      slide.classList.remove('prev', 'current', 'next');
      if (i === index) slide.classList.add('current');
      else if (i === (index - 1 + total) % total) slide.classList.add('prev');
      else if (i === (index + 1) % total) slide.classList.add('next');
    });
    dots.forEach(dot => {
      dot.classList.toggle('active', parseInt(dot.dataset.index, 10) === index);
    });
    current = index;
  }

  function goNext() {
    updateCarousel((current + 1) % total);
  }

  function goPrev() {
    updateCarousel((current - 1 + total) % total);
  }

  // Стрілки
  btnNext.addEventListener('click', () => {
    goNext();
    resetInterval();
  });
  btnPrev.addEventListener('click', () => {
    goPrev();
    resetInterval();
  });

  // Кліки по точках
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.dataset.index, 10);
      updateCarousel(idx);
      resetInterval();
    });
  });

  // Автопрокрутка
  function resetInterval() {
    clearInterval(intervalId);
    intervalId = setInterval(goNext, 5000);
  }

  // Ініціалізуємо
  updateCarousel(0);
  resetInterval();
});
