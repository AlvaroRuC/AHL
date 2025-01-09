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

    // Créer et afficher les fiches d'images
    imagesTriees.forEach(imageVisible => {
        const ficheImage = creerFicheImageSiFiltrable(imageVisible, recherche);
        if (ficheImage) {
            ajouterFicheImage(ficheImage, fichesImagesVisibles); // Ajout de l'image
            gererEvenementsFicheImage(ficheImage, imageVisible.properties, imageSelectionnee); // Gestion des événements
        }
    });
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
    ficheImage.addEventListener('click', function() {
        imageSelectionnee.innerHTML = ''; // Vide la section de l'image sélectionnée
        const ficheImageSelectionnee = creerFicheImageDetaillee(proprietes);
        imageSelectionnee.appendChild(ficheImageSelectionnee);
        imageSelectionnee.dataset.selectedId = proprietes.id_image;
        ficheImage.remove(); // Retirer la fiche de la liste non sélectionnée
        ficheImage.classList.add('fixe-haut'); // Fixer l'image sélectionnée
        ficheImageSelectionnee.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Scroll vers l'image
    });

    // Ajouter l'événement hover (mouseenter et mouseleave)
    ficheImage.addEventListener('mouseenter', function() {
        surlignerImage(idImage);
    });

    ficheImage.addEventListener('mouseleave', function() {
        // Restaure l'état d'origine lorsque la souris quitte la fiche
        ficheImage.style.transform = 'scale(1)';
        ficheImage.style.boxShadow = 'none';
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
