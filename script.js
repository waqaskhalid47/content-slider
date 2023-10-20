"use strict";

// Select all slides and dot container
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".slider-dots");
let maxSlide = slides.length - 1;
let curSlide = 0;
let autoPlayInterval = null;

//show a slide
function showSlide(slideIndex) {
  slides.forEach((slide, index) => {
    if (index === slideIndex) {
      slide.style.display = "flex";
      slide.style.opacity = 1;
    } else {
      slide.style.opacity = 0;
    }
  });
}

//next slide function
function nextSlide() {
  curSlide = (curSlide + 1) % slides.length;
  showSlide(curSlide);
  setActiveDot(curSlide);
}

//previous slide function
function prevSlide() {
  curSlide = (curSlide - 1 + slides.length) % slides.length;
  showSlide(curSlide);
  setActiveDot(curSlide);
}

//navigation dots functionality
dotsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("slider-dot")) {
    const dotIndex = Array.from(dotsContainer.children).indexOf(e.target);
    setActiveDot(dotIndex);
    showSlide(dotIndex);
    currentSlide = dotIndex; // Update the currentSlide variable
  }
});

//set active dot
function setActiveDot(dotIndex) {
  const dots = dotsContainer.querySelectorAll(".slider-dot");
  dots.forEach((dot, index) => {
    dot.classList.remove("active-dot");
    if (index === dotIndex) {
      dot.classList.add("active-dot");
    }
  });
}

//select next and prev btn
const prevArrow = document.querySelector(".btn-prev");
const nextArrow = document.querySelector(".btn-next");

// added next btn functionality (on click)
nextArrow.addEventListener("click", function () {
  nextSlide();
});

// added prev btn functionality (on click)
prevArrow.addEventListener("click", function () {
  prevSlide();
});

//auto play start/stop
function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}
function startAutoPlay() {
  stopAutoPlay();
  const duration =
    parseInt(document.getElementById("autoplay-duration").value) * 1000; // Convert seconds to milliseconds
  autoPlayInterval = setInterval(nextSlide, duration);
}
document
  .getElementById("start-autoplay")
  .addEventListener("click", startAutoPlay);
document
  .getElementById("stop-autoplay")
  .addEventListener("click", stopAutoPlay);

// Stop/stop auto play on mouse enter/leave
document.querySelectorAll(".slide").forEach((slide, index) => {
  slide.addEventListener("mouseleave", () => {
    startAutoPlay();
  });
  slide.addEventListener("mouseenter", () => {
    stopAutoPlay();
  });
});

//initial state (start by default and set dots)
showSlide(curSlide);
startAutoPlay();
dotsContainer.innerHTML = (Object.keys(slides) || [])
  .map(
    (slide, index) =>
      `  <a class="slider-dot ${
        index === 0 ? "active-dot" : ""
      }" data-pos="0"></a>`
  )
  .join("");
