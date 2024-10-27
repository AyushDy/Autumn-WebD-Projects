
const carousel = document.querySelector('.carousel')
const slides = document.querySelectorAll('.slide')
const prev = document.querySelector('#prev')
const next = document.querySelector('#next')
const paginationChangers = document.querySelector('.pagination-changers')
const carouselProgress = document.querySelector('.carousel-progress');


let interval = null;
let intervalTiming = 5000;
let syncTiming = 5000;
let progress = 0;
let progressInterval = null;

let currentSlideIndex = 0;

function setSlides() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currentSlideIndex) * 100}%)`
    });
}

function previousSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    setSlides();
}

function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    setSlides();
}

function attachEventListeners() {
    prev.addEventListener('click', previousSlide);
    next.addEventListener('click', nextSlide);
    window.addEventListener("keydown", (event) => {
        if (event.key === 'ArrowLeft') previousSlide();
        if (event.key === 'ArrowRight') nextSlide();
    })
    paginationChangers.addEventListener('mouseover', ()=>{
        clearInterval(interval);
        clearInterval(progressInterval);
    })
    paginationChangers.addEventListener('mouseout',()=>{
        interval = setInterval(nextSlide, intervalTiming);
        startProgress();
    })
}

function startProgress(){
    progress = 0;
    progressInterval = setInterval(()=>{
        progress += 50;
        carouselProgress.style.width = `${(progress/intervalTiming) * 100}%`;
        if(progress> intervalTiming) resetProgress();
    },50)
}

function resetProgress(){
    console.log(progress);
    progress=0;
    clearInterval(progressInterval);
    carouselProgress.style.width = '0%'
    startProgress();
}

function startApp() {
    setSlides();
    attachEventListeners();
    interval = setInterval(nextSlide, intervalTiming);
    startProgress();
}

startApp();
