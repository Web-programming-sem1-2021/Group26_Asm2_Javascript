const slides = Array.from(document.querySelector(".slider")?.children);
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

const thumbnails = document.getElementsByClassName("thumbnail");
const slider = document.getElementById("slider");

const buttonRight = document.getElementById("slide-right");
const buttonLeft = document.getElementById("slide-left");

buttonLeft.addEventListener("click", function () {
  slider.scrollLeft -= 125;
});

buttonRight.addEventListener("click", function () {
  slider.scrollLeft += 125;
});

const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
// alert(maxScrollLeft);
// alert("Left Scroll:" + slider.scrollLeft);

//AUTO PLAY THE SLIDER
function autoPlay() {
  if (slider.scrollLeft > maxScrollLeft - 1) {
    slider.scrollLeft -= maxScrollLeft;
  } else {
    slider.scrollLeft += 1;
  }
}
let play = setInterval(autoPlay, 50);

// PAUSE THE SLIDE ON HOVER
for (var i = 0; i < thumbnails.length; i++) {
  thumbnails[i].addEventListener("mouseover", function () {
    clearInterval(play);
  });

  thumbnails[i].addEventListener("mouseout", function () {
    return (play = setInterval(autoPlay, 50));
  });
}
