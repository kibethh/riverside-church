// Grabbing target elements
const list = document.querySelector('.gallery-carousel__img-container--list');
const imgs = Array.from(list.children);
const nextButton = document.querySelector('.gallery-carousel__btn--right');
const prevButton = document.querySelector('.gallery-carousel__btn--left');
const carouselNav = document.querySelector('.gallery-carousel__nav');
const dots = Array.from(carouselNav.children);

// Getting the width of our images
const imgWidth = imgs[0].getBoundingClientRect().width;

// Arranging the images next to one another
// function setImagePosition(img, index) {
//   img.style.left = imgWidth * index + 'px';
// }
// Arrow function
const setImagePosition = (img, index) => {
  //   console.log(index);
  img.style.left = imgWidth * index + 'px';
};
imgs.forEach(setImagePosition);

// Move to Img
const moveToImg = (list, currentImg, targetImg) => {
  list.style.transform = 'translateX(-' + targetImg.style.left + ')';
  // Removing the current--img class
  currentImg.classList.remove('current--img');
  targetImg.classList.add('current--img');
};
//Update color of the dots on click
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current--img');
  targetDot.classList.add('current--img');
};
// Hide/Show Arrows
const hideShowArrows = (imgs, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('hidden');
    nextButton.classList.remove('hidden');
  } else if (targetIndex === imgs.length - 1) {
    nextButton.classList.add('hidden');
    prevButton.classList.remove('hidden');
  } else {
    nextButton.classList.remove('hidden');
    prevButton.classList.remove('hidden');
  }
};

nextButton.addEventListener('click', (e) => {
  const currentImg = list.querySelector('.current--img');
  const currentDot = carouselNav.querySelector('.current--img');
  const nextImg = currentImg.nextElementSibling;
  const nextDot = currentDot.nextElementSibling;

  const nextIndex = imgs.findIndex((img) => img === nextImg);

  moveToImg(list, currentImg, nextImg);
  updateDots(currentDot, nextDot);
  hideShowArrows(imgs, prevButton, nextButton, nextIndex);
});

prevButton.addEventListener('click', (e) => {
  const currentImg = list.querySelector('.current--img');
  const prevImg = currentImg.previousElementSibling;
  const currentDot = carouselNav.querySelector('.current--img');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = imgs.findIndex((img) => img === prevImg);

  moveToImg(list, currentImg, prevImg);
  updateDots(currentDot, prevDot);
  hideShowArrows(imgs, prevButton, nextButton, prevIndex);
});

// switching images when carouselNav is clicked
carouselNav.addEventListener('click', (e) => {
  // What dot was clicked on
  //   const targetDot = e;
  const targetDot = e.target.closest('button');
  //   Function stops
  if (!targetDot) return;
  const currentImg = list.querySelector('.current--img');
  const currentDot = carouselNav.querySelector('.current--img');
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetImg = imgs[targetIndex];

  moveToImg(list, currentImg, targetImg);
  updateDots(currentDot, targetDot);
  hideShowArrows(imgs, prevButton, nextButton, targetIndex);
});
