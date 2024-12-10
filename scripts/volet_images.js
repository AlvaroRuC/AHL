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

function afficherImagesVolet() {
    map.on('moveend', () => {
        const volet = document.getElementById('volet');
        const imageSelectionnee = document.getElementById('image-selectionnee');
        const fichesImagesVisibles = document.getElementById('images-visibles');


        // Vide la liste des images visibles avant de la remplir à nouveau
        fichesImagesVisibles.innerHTML = '';

        const fichesImagesVisiblesData = map.queryRenderedFeatures({ layers: ['images-points'] });

        // Si aucune image n'est visible, affiche un message
        if (fichesImagesVisiblesData.length === 0) {
            fichesImagesVisibles.textContent = 'Aucune image visible';
            return;
        }

        // Récupère la position actuelle de la carte (centre)
        const centreCarte = map.getCenter();

        // Trier les images par distance à la position actuelle de la carte
        const imagesTriees = fichesImagesVisiblesData.sort((a, b) => {
            const distanceA = getDistance(centreCarte, a.geometry.coordinates);
            const distanceB = getDistance(centreCarte, b.geometry.coordinates);
            return distanceA - distanceB;  // Plus proche au début
        });

        // Crée les fiches pour chaque image triée
        imagesTriees.forEach(imageVisible => {
            const proprietes = imageVisible.properties;

            // Créer la fiche de l'image
            const ficheImage = creerFicheImage(proprietes);

            // Ajoute un événement click pour gérer la sélection de l'image
            ficheImage.addEventListener('click', function () {
                // Vide la section de l'image sélectionnée
                imageSelectionnee.innerHTML = '';

                // Créer et ajouter la fiche de l'image sélectionnée
                const ficheImageSelectionnee = creerFicheImageDetaillee(proprietes);
                imageSelectionnee.appendChild(ficheImageSelectionnee);
                imageSelectionnee.dataset.selectedId = proprietes.id_image;

                // Retirer l'image de la liste non sélectionnée
                ficheImage.remove();
                ficheImage.classList.add('fixe-haut');

                // Scroll vers l'image fixée dans la sélection
                ficheImageSelectionnee.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            // Ajoute la fiche à la liste des images visibles
            fichesImagesVisibles.appendChild(ficheImage);
        });
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

// Écouteur pour gérer le clic sur une fiche d'image
volet.addEventListener('click', function (event) {
    const ficheCliquee = event.target.closest('.fiche-image');
    if (ficheCliquee) {
        const idImage = parseInt(ficheCliquee.getAttribute('image-id'), 10);
        volSurPointImage(idImage);

    }
});
