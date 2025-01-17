window.onload = function(){
    slideOne();
    slideTwo();
}

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = document.getElementById("slider-1").max;

function slideOne(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillColor();
}
function slideTwo(){
    if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap){
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillColor();
}
function fillColor(){
    percent1 = (sliderOne.value / sliderMaxValue) * 100;
    percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}

// Fonction pour mettre à jour le champ de texte (input) 1 à partir du slider
function updateInput1() {
    const slider1 = document.getElementById('slider-1');
    const range1 = document.getElementById('range1');
    range1.value = slider1.value;
}

// Fonction pour mettre à jour le champ de texte (input) 2 à partir du slider
function updateInput2() {
    const slider2 = document.getElementById('slider-2');
    const range2 = document.getElementById('range2');
    range2.value = slider2.value;
}

// Fonction pour mettre à jour le slider 1 à partir du champ de texte
function updateSlider1() {
    const range1 = document.getElementById('range1');
    const slider1 = document.getElementById('slider-1');
    slider1.value = range1.value;
}

// Fonction pour mettre à jour le slider 2 à partir du champ de texte
function updateSlider2() {
    const range2 = document.getElementById('range2');
    const slider2 = document.getElementById('slider-2');
    slider2.value = range2.value;
}