// Filtre de titre

// Fonction pour normaliser les chaînes en ignorant les accents et la casse
function normaliserTexte(texte) {
    return texte.normalize('NFD')        // Sépare les caractères accentués de leur base
        .replace(/[\u0300-\u036f]/g, "") // Retire les accents
        .toLowerCase();          // Convertir en minuscules
}

// Variable globale pour stocker la valeur de la recherche
// let rechercheActuelle = '';

// // Écouteur d'événement pour le champ de recherche (filtrage en temps réel)
// document.getElementById('recherche').addEventListener('input', function () {
//     rechercheActuelle = document.getElementById('recherche').value;  // Stocke la valeur du champ de recherche
//     gererImagesVolet(rechercheActuelle);  // Passe la recherche à la fonction de filtrage
// });

// Filtre des dates

function filtrerImagesParDate(images) {
    // Récupère les valeurs des sliders
    const dateMinFiltre = new Date(sliderOne.value === "1840" ? "0000-01-01" : sliderOne.value + "-01-01");
    const dateMaxFiltre = new Date(sliderTwo.value + "-12-31");

    return images.filter(imageVisible => {
        const dateInfStr = imageVisible.properties.date_inf; //String yyyy
        const dateSupStr = imageVisible.properties.date_sup;

        const dateInf = new Date(dateInfStr);
        const dateSup = new Date(dateSupStr);

        // Conditions

        if (sliderOne.value === "1838" && sliderTwo.value === "2000") {
            return true;
        }

        return (
            (dateInf >= dateMinFiltre && dateInf <= dateMaxFiltre) ||
            (dateSup >= dateMinFiltre && dateSup <= dateMaxFiltre)
        );
    });
}