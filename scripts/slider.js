window.onload = function() {
    slideOne();
    slideTwo();
};

let sliderOne = document.getElementById("slider-1");
let sliderTwo = document.getElementById("slider-2");
let displayValOne = document.getElementById("range1");
let displayValTwo = document.getElementById("range2");
let minGap = 0;
let sliderTrack = document.querySelector(".slider-track");
let sliderMaxValue = sliderOne.max; // Utilisation de max pour le slider 1

// Fonction pour gérer le changement du slider 1
function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    updateInput1(); // Synchronisation avec l'input text
    fillColor();
}

// Fonction pour gérer le changement du slider 2
function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
        sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    updateInput2(); // Synchronisation avec l'input text
    fillColor();
}

// Fonction pour remplir la couleur de fond de la barre de sliders
function fillColor() {
    let percent1 = (sliderOne.value / sliderMaxValue) * 100;
    let percent2 = (sliderTwo.value / sliderMaxValue) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
}

// Fonction pour mettre à jour l'input 1 à partir du slider 1
function updateInput1() {
    const range1 = document.getElementById('range1');
    range1.value = sliderOne.value;
}

// Fonction pour mettre à jour l'input 2 à partir du slider 2
function updateInput2() {
    const range2 = document.getElementById('range2');
    range2.value = sliderTwo.value;
}

// Fonction pour mettre à jour le slider 1 à partir de l'input text 1
function updateSlider1() {
    const range1 = document.getElementById('range1');
    sliderOne.value = range1.value;
    slideOne(); // Pour mettre à jour l'affichage du slider
}

// Fonction pour mettre à jour le slider 2 à partir de l'input text 2
function updateSlider2() {
    const range2 = document.getElementById('range2');
    sliderTwo.value = range2.value;
    slideTwo(); // Pour mettre à jour l'affichage du slider
}
