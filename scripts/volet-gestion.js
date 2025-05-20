const data = {};

document.getElementById("outils-recherche").addEventListener('input', (e) => {
    appliquerFiltreDate();
});

function appliquerFiltreDate() {
    const dateMinFiltre = document.getElementById('range1').value;  // Valeur de la date minimale
    const dateSupFiltre = document.getElementById('range2').value;  // Valeur de la date maximale

    const sliderOne = document.getElementById("slider-1");
    const sliderTwo = document.getElementById("slider-2");

    const texteRecherche = document.getElementById('recherche').value;

    // Logique de filtre en fonction des conditions des sliders
    let filtreDates;

    // Si les deux curseurs sont dans les extremes, on retourne tout.
    if (sliderOne.value === "1838" && sliderTwo.value === "2000") {
        filtreDates = ["all"];
    }
    else {
        filtreDates = [
            "all",
            [
                "any",
                [
                    "all",
                    [">=", "date_inf", dateMinFiltre],
                    ["<=", "date_inf", dateSupFiltre]
                ],
                [
                    "all",
                    [">=", "date_sup", dateMinFiltre],
                    ["<=", "date_sup", dateSupFiltre]
                ]
            ]
        ];
    }

    // Si un texte de recherche est présent, ajouter un filtre textuel (par exemple "nom" ou "description")
    if (texteRecherche !== "") {
        filtreDates.push([
            "all",
            ["==", "lieu", texteRecherche]  // Remplace "lieu" par la propriété que tu veux filtrer
        ]);
    }

    // Appliquer le filtre à la carte
    map.setFilter('images-points', null); // Réinitialiser le filtre précédent
    map.setFilter('images-points', filtreDates);
    console.log("Filtre appliqué:", filtreDates); // Debugging du filtre appliqué
    console.log("filtro", JSON.stringify(filtreDates))

    const currentFilter = map.getFilter('images-points');
    console.log("Filtro que se aplica:", JSON.stringify(currentFilter))
}