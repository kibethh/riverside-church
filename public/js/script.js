const slideContent = document.querySelectorAll(
  '.slider__img-container--list__item'
);
const next = document.querySelector('.slider__btn--right');
const prev = document.querySelector('.slider__btn--left');
const autoScroll = true;
let slideInterval;
let interval = 5000;

// Next Button
const nextSlide = () => {
  const current = document.querySelector('.current--img');
  current.classList.remove('current--img');
  if (current.nextElementSibling) {
    current.nextElementSibling.classList.add('current--img');
  } else {
    slideContent[0].classList.add('current--img');
  }
  current.classList.remove('current--img');
};

// Prev Button
const prevSlide = () => {
  const current = document.querySelector('.current--img');
  current.classList.remove('current--img');
  if (current.previousElementSibling) {
    current.previousElementSibling.classList.add('current--img');
  } else {
    slideContent[slideContent.length - 1].classList.add('current--img');
  }
  current.classList.remove('current--img');
};

// Add event listeners
next.addEventListener('click', () => {
  nextSlide();
  if (autoScroll) {
    clearInterval(slideInterval);
    auto();
  }
});

prev.addEventListener('click', () => {
  prevSlide();
  if (autoScroll) {
    clearInterval(slideInterval);
    auto();
  }
});

// Auto scroll
if (autoScroll) {
  function auto() {
    slideInterval = setInterval(nextSlide, interval);
  }
}
auto();
