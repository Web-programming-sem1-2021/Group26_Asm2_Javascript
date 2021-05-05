const slides = document.querySelector(".main-slider")?.children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const indicator = document.querySelector(".indicator");
let index = 0;

prev.addEventListener("click", function () {
  prevSlide();
  updateCircleIndicator();
  resetTimer();
});

next.addEventListener("click", function () {
  nextSlide();
  updateCircleIndicator();
  resetTimer();
});

// create circle indicators
function circleIndicator() {
  "use strict";
  for (let i = 0; i < slides.length; i++) {
    const div = document.createElement("div");
    div.innerHTML = i + 1;
    div.setAttribute("onclick", "indicateSlide(this)");
    div.id = i;
    if (i == 0) {
      div.className = "active";
    }
    indicator.appendChild(div);
  }
}
circleIndicator();

function indicateSlide(element) {
  index = element.id;
  changeSlide();
  updateCircleIndicator();
  resetTimer();
}

function updateCircleIndicator() {
  for (let i = 0; i < indicator.children.length; i++) {
    indicator.children[i].classList.remove("active");
  }
  indicator.children[index].classList.add("active");
}

function prevSlide() {
  if (index == 0) {
    index = slides.length - 1;
  } else {
    index--;
  }
  changeSlide();
}

function nextSlide() {
  if (index == slides.length - 1) {
    index = 0;
  } else {
    index++;
  }
  changeSlide();
}

function changeSlide() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  slides[index].classList.add("active");
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoPlayMainSlider, 3000);
}

function autoPlayMainSlider() {
  nextSlide();
  updateCircleIndicator();
}
let timer = setInterval(autoPlayMainSlider, 3000);

//TODO: Ram

let thumbnails = Array.from(document.getElementsByClassName("thumbnail"));
let sliders = Array.from(document.getElementsByClassName("slider"));
console.log(typeof sliders);

let buttonRight = Array.from(document.getElementsByClassName("slide-right"));
let buttonLeft = Array.from(document.getElementsByClassName("slide-left"));

sliders.map((slide) => console.log(`slide`, slide));

buttonLeft.forEach((button) =>
  button.addEventListener(
    "click",
    (e) => e.preventDefault(),
    sliders.forEach((slider) => (slider.scrollLeft -= 125))
  )
);

buttonRight.forEach((button) =>
  button.addEventListener(
    "click",
    (e) => e.preventDefault(),
    sliders.forEach((slider) => (slider.scrollLeft += 125))
  )
);

const maxScrollLeft = sliders[0].scrollWidth - sliders[0].clientWidth;
// alert(maxScrollLeft);
// alert("Left Scroll:" + slider.scrollLeft);

//AUTO PLAY THE SLIDER

function autoPlay() {
  sliders.forEach((slider) =>
    slider.scrollLeft > maxScrollLeft - 1
      ? (slider.scrollLeft -= maxScrollLeft)
      : (slider.scrollLeft += 1)
  );
}
console.log(`autoPlay()`, autoPlay());
let play = setInterval(autoPlay, 50);

// PAUSE THE SLIDE ON HOVER
const stop = () =>
  thumbnails.forEach(
    (thumbnail) => (
      thumbnail.addEventListener("mouseover", () => clearInterval(play)),
      thumbnail.addEventListener(
        "mouseout",
        () => (play = setInterval(autoPlay, 50))
      )
    )
  );

stop();
