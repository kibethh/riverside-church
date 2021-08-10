// Variables
// First Page
const slidePage = document.querySelector(".register__content--form__page");
const firstNextBtn = document.querySelector(".next-1");

// Second Page
const firstPrevBtn = document.querySelector(".prev-1");
const secondNextBtn = document.querySelector(".next-2");

// Third Page
const secondPrevBtn = document.querySelector(".prev-2");
const thirdNextBtn = document.querySelector(".next-3");

// Forth Page
const thirdPrevBtn = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");

//Progress step
const progressStep = document.querySelectorAll(".register__progress--step");

//Progress Number (The span element)
const progressNumber = document.querySelectorAll(
  ".register__progress--step span"
);

//Progress Tick Mark
const progressTick = document.querySelectorAll(".fa-check");

let max = 4;
let current = 1;

// The next button event listener function

function tick() {
  progressStep[current - 1].classList.add("active");
  progressNumber[current - 1].classList.add("active");
  progressTick[current - 1].classList.add("active");
  current += 1;
}
// The Previous button event listener function

function untick() {
  progressStep[current - 2].classList.remove("active");
  progressNumber[current - 2].classList.remove("active");
  progressTick[current - 2].classList.remove("active");
  current -= 1;
}

// Next Buttons Events
// First Next Button Eventlistener
firstNextBtn.addEventListener("click", () => {
  slidePage.style.marginLeft = "-33%";
  tick();
});

// Second Next Button Eventlistener
secondNextBtn.addEventListener("click", () => {
  slidePage.style.marginLeft = "-100%";
  tick();
});

// Third Next Button Eventlistener
thirdNextBtn.addEventListener("click", () => {
  slidePage.style.marginLeft = "-200%";
  tick();
});

//Submit button event
submitBtn.addEventListener("click", () => {
  tick();
  setTimeout(() => {
    alert("Your form has been successfully submitted!!");
    location.reload();
  }, 1000);
});

// Previous Buttons Events
// First Previous Button Eventlistener
firstPrevBtn.addEventListener("click", () => {
  slidePage.style.marginLeft = "0";
  untick();
});

// Second Previous Button Eventlistener
secondPrevBtn.addEventListener("click", () => {
  slidePage.style.marginLeft = "-33%";
  untick();
});

// Third Previous Button Eventlistener
thirdPrevBtn.addEventListener("click", () => {
  slidePage.style.marginLeft = "-100%";
  untick();
});
