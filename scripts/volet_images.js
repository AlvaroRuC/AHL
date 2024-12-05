// Cet script nécessite images_hover.js

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
        volet.appendChild(fichesImages);

        imagesVisibles.forEach(imageVisible => {
            const proprietes = imageVisible.properties;

            const ficheImage = document.createElement('div');
            ficheImage.classList.add('fiche-image');
            ficheImage.setAttribute('image-id', proprietes.id_image);

            const imageImage = document.createElement('img');
            imageImage.src = "../donnees/" + proprietes.chemin;
            imageImage.alt = proprietes.lieu || 'Image';
            ficheImage.appendChild(imageImage);

            const ficheImageEtiquette = document.createElement('div');
            ficheImageEtiquette.classList.add('fiche-image-etiquette');
            ficheImage.appendChild(ficheImageEtiquette);

            const imageLieu = document.createElement('h3');
            imageLieu.textContent = proprietes.lieu;
            ficheImageEtiquette.appendChild(imageLieu);

            // Affichage des années
            const imageDatesExtremes = document.createElement('time');

            const anneeInf = proprietes.date_inf ? proprietes.date_inf.split('-')[0] : null;
            const anneeSup = proprietes.date_sup ? proprietes.date_sup.split('-')[0] : null;

            if (anneeInf && anneeSup) {
                imageDatesExtremes.textContent = anneeInf === anneeSup ? anneeInf : `${anneeInf}-${anneeSup}`;
            } else if (anneeSup) {
                imageDatesExtremes.textContent = `Avant ${anneeSup}`;
            } else if (anneeInf) {
                imageDatesExtremes.textContent = `Après ${anneeInf}`;
            } else {
                imageDatesExtremes.textContent = "Date inconnue";
            }

            ficheImageEtiquette.appendChild(imageDatesExtremes);

            // Ajoute la fiche à la liste
            fichesImages.appendChild(ficheImage);
        });

        // Écouteur pour les fiches des images et effets

        volet.addEventListener('mouseover', function (event) {

            const ficheSurvolee = event.target.closest('.fiche-image');

            if (ficheSurvolee) {
                ficheSurvolee.style.opacity = '1';
            }

            const idImage = parseInt(ficheSurvolee.getAttribute('image-id'), 10);

            console.log('mouseover sur:', idImage); // <----------------------<< Eliminar

            surlignerImage(idImage) //fontion déclaré dans "images_hover.js"
        });

        volet.addEventListener('mouseout', function (event) {
            const ficheSurvolee = event.target.closest('.fiche-image');

            if (ficheSurvolee) {
                ficheSurvolee.style.opacity = '0.85';
            }

            const idImage = parseInt(ficheSurvolee.getAttribute('image-id'), 10);

            enleverSurlignageImage(idImage);
        });

    });
}

document.getElementById("bouton-volet").addEventListener("click", function () {
    const volet = document.getElementById('volet');
    if (volet.classList.contains("plie")) {
        map.setLayoutProperty('images-points', 'visibility', 'none');
    } else {
        map.setLayoutProperty('images-points', 'visibility', 'visible');
        afficherImagesVolet();
    }
});