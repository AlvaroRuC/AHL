// Script pour ouvrir les images présentes sur la carte sur le volet latéral.

function afficherImagesVolet() {
    map.on('moveend', () => {
        const volet = document.getElementById('volet');
        volet.innerHTML = '';

        const imagesVisibles = map.queryRenderedFeatures({ layers: ['images-points'] });

        if (imagesVisibles.length === 0) {
            volet.textContent = 'Aucune image visible';
            return;
        }

        const fichesImages = document.createElement('div');
        fichesImages.id = "fiches-images";

        volet.appendChild(fichesImages)

        imagesVisibles.forEach(imageVisible => {
            const proprietes = imageVisible.properties;

            const ficheImage = document.createElement('div');
            ficheImage.classList.add('fiche-image');

            const imgElement = document.createElement('img');
            imgElement.src = "../donnees/" + proprietes.chemin;
            imgElement.alt = proprietes.lieu || 'Image'; // Ça Ajoute un texte alternatif
            ficheImage.appendChild(imgElement);

            const titleElement = document.createElement('h3');
            titleElement.textContent = proprietes.lieu;
            ficheImage.appendChild(titleElement);

            fichesImages.appendChild(ficheImage);

            //Pour surligner les images au survol.

            const fichesSurvolees = document.getElementsByClassName('fiche-image');

            for (let i = 0; i < fichesSurvolees.length; i++) {
                fichesSurvolees[i].addEventListener('mouseover', function () {
                    this.style.opacity = '1';




                });

                fichesSurvolees[i].addEventListener('mouseout', function () {
                    this.style.opacity = '0.85';
                });
            }
        });
    });
}

document.getElementById("bouton-volet").addEventListener("click", function (event) {

    if (volet.classList.contains("plie")) {
        map.setLayoutProperty(
            'images-points',
            'visibility',
            'none');

    }
    else {
        map.setLayoutProperty(
            'images-points',
            'visibility',
            'visible');

        afficherImagesVolet()
    }

});