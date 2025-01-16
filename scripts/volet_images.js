// Gestion du bouton pour afficher/masquer le volet

document.getElementById("bouton-volet").addEventListener("click", function () {
    const volet = document.getElementById('volet');
    if (volet.classList.contains("plie")) {
        map.setLayoutProperty('images-points', 'visibility', 'none');
    } else {
        map.setLayoutProperty('images-points', 'visibility', 'visible');
        afficherImagesVolet();
    }
});

function filtrerImagesParDate(images) {
    const dateMin = new Date(sliderOne.value + "-01-01");  // Date minimale en fonction du slider 1 (ex: "1860-01-01")
    const dateMax = new Date(sliderTwo.value + "-12-31");  // Date maximale en fonction du slider 2 (ex: "2000-12-31")

    console.log("Date Min:", dateMin, "Date Max:", dateMax);  // Affichage des dates pour déboguer

    return images.filter(imageVisible => {
        const dateInfStr = imageVisible.properties.date_inf; // date de début
        const dateSupStr = imageVisible.properties.date_sup; // date de fin

        // Si les dates sont manquantes, on ignore cette image
        if (!dateInfStr || !dateSupStr) {
            console.log(`Dates manquantes pour l'image ${imageVisible.properties.id_image}`);
            return false;  // On ignore cette image si une des dates est manquante
        }

        const dateInf = new Date(dateInfStr); // Date de début de l'image
        const dateSup = new Date(dateSupStr); // Date de fin de l'image

        console.log("Date Inf:", dateInf, "Date Sup:", dateSup); // Log des dates pour débogage

        // Vérifie si l'image est dans la plage des dates spécifiées
        return (dateSup >= dateMin && dateInf <= dateMax);
    });
}

// Fonction principale pour afficher les images dans le volet

function afficherImagesVolet(recherche = '') {
    const volet = document.getElementById('volet');
    const imageSelectionnee = document.getElementById('image-selectionnee');
    const fichesImagesVisibles = document.getElementById('images-visibles');
    fichesImagesVisibles.innerHTML = ''; // Vide la liste des images visibles

    const fichesImagesVisiblesData = map.queryRenderedFeatures({ layers: ['images-points'] });

    if (fichesImagesVisiblesData.length === 0) {
        fichesImagesVisibles.textContent = 'Aucune image visible';
        return;
    }

    // Filtrer et trier les images
    const imagesTriees = trierImagesParDistance(fichesImagesVisiblesData);

    // Appliquer le filtrage à l'extérieur de la fonction afficherImagesVolet
    const imagesFiltrees = filtrerImagesParDate(imagesTriees);

    // Créer et afficher les fiches d'images
    imagesFiltrees.forEach(imageVisible => {
        const ficheImage = creerFicheImageSiFiltrable(imageVisible, recherche);
        if (ficheImage) {
            ajouterFicheImage(ficheImage, fichesImagesVisibles); // Ajout de l'image
            gererEvenementsFicheImage(ficheImage, imageVisible.properties, imageSelectionnee); // Gestion des événements
        }
    });

    let template = document.getElementById("my-paragraph");
    let templateContent = template.content;
    fichesImagesVisibles.appendChild(templateContent.cloneNode(true)); // Ajout du contenu du template dans fichesImagesVisibles
}

// Fonction pour trier les images par distance au centre de la carte
function trierImagesParDistance(images) {
    const centreCarte = map.getCenter();
    return images.sort((a, b) => {
        const distanceA = getDistance(centreCarte, a.geometry.coordinates);
        const distanceB = getDistance(centreCarte, b.geometry.coordinates);
        return distanceA - distanceB;
    });
}

// Fonction pour créer une fiche d'image si elle passe le filtre de recherche
function creerFicheImageSiFiltrable(imageVisible, recherche) {
    const proprietes = imageVisible.properties;

    // Filtrer selon la recherche (lieu ou code)
    if (normaliserTexte(proprietes.lieu).includes(normaliserTexte(recherche)) ||
        normaliserTexte(proprietes.cote_aml).includes(normaliserTexte(recherche))) {
        return creerFicheImage(proprietes);
    }

    return null;
}

function ajouterFicheImage(ficheImage, fichesImagesVisibles) {
    // Ajouter la fiche d'image dans le volet
    fichesImagesVisibles.appendChild(ficheImage);
    setTimeout(() => {
        ficheImage.classList.add('visible'); // Transition d'apparition de la fiche
    }, 10);
}

function gererEvenementsFicheImage(ficheImage, proprietes, imageSelectionnee) {
    // Ajouter un événement de clic pour la sélection de l'image
    ficheImage.addEventListener('click', function () {
        imageSelectionnee.innerHTML = ''; // Vide la section de l'image sélectionnée
        const ficheImageSelectionnee = creerFicheImageDetaillee(proprietes);
        imageSelectionnee.appendChild(ficheImageSelectionnee);
        imageSelectionnee.dataset.selectedId = proprietes.id_image;
        ficheImage.remove(); // Retirer la fiche de la liste non sélectionnée
        ficheImage.classList.add('fixe-haut'); // Fixer l'image sélectionnée
        ficheImageSelectionnee.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll vers l'image
    });

    // Ajouter l'événement hover (mouseenter et mouseleave)
    ficheImage.addEventListener('mouseenter', function () {

        const idMapLibre = obtenirIdMLDepuisIdImage(proprietes.id_image);

        surlignerImage(idMapLibre, proprietes.id_image);
    });

    ficheImage.addEventListener('mouseleave', function () {
        // Obtenir l'ID MapLibre depuis l'ID personnalisé (id_image)
        const idMapLibre = obtenirIdMLDepuisIdImage(proprietes.id_image);

        // Enlever le surlignage en utilisant l'ID MapLibre
        enleverSurlignageImage(idMapLibre);
    });
}

// Fonction pour calculer la distance entre deux points (coordonnées géographiques)
function getDistance(pointA, pointB) {
    const lat1 = pointA.lat;
    const lon1 = pointA.lng;
    const lat2 = pointB[1];  // pointB est un tableau [longitude, latitude]
    const lon2 = pointB[0];

    // Convertir les degrés en radians
    const rad = Math.PI / 180;
    const x1 = lat1 * rad;
    const y1 = lon1 * rad;
    const x2 = lat2 * rad;
    const y2 = lon2 * rad;

    // Formule de la distance (Haversine)
    const R = 6371;  // Rayon de la Terre en km
    const dLat = x2 - x1;
    const dLon = y2 - y1;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(x1) * Math.cos(x2) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance en kilomètres
}

// Événement sur le déplacement de la carte pour réafficher les images visibles
map.on('moveend', function () {
    afficherImagesVolet(rechercheActuelle);  // Passe la recherche actuelle sans réinitialiser la valeur
});

// Écouteur pour gérer le clic sur une fiche d'image
volet.addEventListener('click', function (event) {
    const ficheCliquee = event.target.closest('.fiche-image');
    if (ficheCliquee) {
        const idImage = parseInt(ficheCliquee.getAttribute('image-id'), 10);
        volSurPointImage(idImage);

    }
});
