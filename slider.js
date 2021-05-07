const slides = Array.from(document.querySelector(".main-slider")?.children);
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
const circleIndicator = () => {
  "use strict";
  slides.forEach((slide, index) => {
    const div = document.createElement("div");
    div.innerHTML = index + 1;
    div.setAttribute("onclick", "indicateSlide(this)");
    div.id = index;
    index == 0 ? (div.className = "active") : {};
    indicator.appendChild(div);
  });
};
circleIndicator();

const indicateSlide = (element) => {
  index = element.id;
  changeSlide();
  updateCircleIndicator();
  resetTimer();
};

const updateCircleIndicator = () => {
  Array.from(indicator.children).forEach((child) =>
    child.classList.remove("active")
  );
  indicator.children[index].classList.add("active");
};

const prevSlide = () => {
  index == 0 ? (index = slides.length - 1) : index--;
  changeSlide();
};

const nextSlide = () => {
  index == slides.length - 1 ? (index = 0) : index++;
  changeSlide();
};

const changeSlide = () => {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
};

const resetTimer = () => {
  clearInterval(timer);
  timer = setInterval(autoPlayMainSlider, 3000);
};

const autoPlayMainSlider = () => {
  nextSlide();
  updateCircleIndicator();
};
let timer = setInterval(autoPlayMainSlider, 3000);

//TODO: Ram

const thumbnails = Array.from(document.getElementsByClassName("thumbnail"));
const sliders = Array.from(document.getElementsByClassName("slider"));
const buttonRight1 = document.getElementById("slide-right-1");
const buttonLeft1 = document.getElementById("slide-left-1");
const buttonRight2 = document.getElementById("slide-right-1");
const buttonLeft2 = document.getElementById("slide-left-1");

buttonLeft1.addEventListener("click", () => (sliders[0].scrollLeft -= 125));

buttonRight1.addEventListener("click", () => (sliders[0].scrollLeft += 125));

buttonLeft2.addEventListener("click", () => (sliders[1].scrollLeft -= 125));

buttonRight2.addEventListener("click", () => (sliders[1].scrollLeft += 125));

const maxScrollLeft = sliders[0].scrollWidth - sliders[0].clientWidth;
// alert(maxScrollLeft);
// alert("Left Scroll:" + slider.scrollLeft);

//AUTO PLAY THE SLIDER
const autoPlay = () => {
  sliders.forEach((slider, index) =>
    slider.scrollLeft > maxScrollLeft - 1
      ? (slider.scrollLeft -= maxScrollLeft)
      : (slider.scrollLeft += 1)
  );
};
let play = setInterval(autoPlay, 40);

// PAUSE THE SLIDE ON HOVER
const stop = () =>
  thumbnails.forEach(
    (thumbnail) => (
      thumbnail.addEventListener("mouseover", () => clearInterval(play)),
      thumbnail.addEventListener(
        "mouseout",
        () => (play = setInterval(autoPlay, 40))
      )
    )
  );

stop();
