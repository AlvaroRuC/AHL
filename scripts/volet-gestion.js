const data = {};

document.getElementById("outils-recherche").addEventListener('input', (e) => {
    appliquerFiltreDate();
});

function appliquerFiltreDate() {
    const dateMin = document.getElementById('range1').value;  // Valeur de la date minimale
    const dateSup = document.getElementById('range2').value;  // Valeur de la date maximale

    const sliderOne = document.getElementById("slider-1");
    const sliderTwo = document.getElementById("slider-2");

    // Logique de filtre en fonction des conditions des sliders
    let filtreDates;

    // Si les deux curseurs ont les valeurs exactes, on retourne tout
    if (sliderOne.value === "1838" && sliderTwo.value === "2000") {
        filtreDates = ["all"];
    }
    // Si sliderOne vaut "1838", on vérifie si dateSup est dans l'intervalle
    else if (sliderOne.value === "1838") {
        filtreDates = [
            "all",
            [">=", "date_inf", dateMin],
            ["<=", "date_sup", dateSup],
        ];
    }
    // Si sliderTwo vaut "2000", on vérifie si dateMin est dans l'intervalle
    else if (sliderTwo.value === "2000") {
        filtreDates = [
            "all",
            [">=", "date_inf", dateMin],
            ["<=", "date_sup", dateSup],
        ];
    } else {
        // Par défaut, on applique le filtre avec les deux dates
        filtreDates = [
            "all",
            [">=", "date_inf", dateMin],
            ["<=", "date_sup", dateSup]
        ];
    }

    // Appliquer le filtre à la carte
    map.setFilter('images-points', filtreDates);
    console.log("Filtre appliqué:", filtreDates); // Debugging du filtre appliqué
}