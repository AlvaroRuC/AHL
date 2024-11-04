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

        // Pour créer un tableau pour stocker les fiches d'images
        const fichesSurvolees = [];

        imagesVisibles.forEach(imageVisible => {
            const proprietes = imageVisible.properties;

            const ficheImage = document.createElement('div');
            ficheImage.classList.add('fiche-image');
            ficheImage.setAttribute('data-id', proprietes.id_image); //Je crois que ça ne sert à rien.

            const imageImage = document.createElement('img');
            imageImage.src = "../donnees/" + proprietes.chemin;
            imageImage.alt = proprietes.lieu || 'Image';
            ficheImage.appendChild(imageImage);

            const imageLieu = document.createElement('h3');
            imageLieu.textContent = proprietes.lieu;
            ficheImage.appendChild(imageLieu);


     // Affichage des années
     const imageDatesExtremes = document.createElement('time');

     const anneeInf = proprietes.date_inf ? proprietes.date_inf.split('-')[0] : null;
     const anneeSup = proprietes.date_sup ? proprietes.date_sup.split('-')[0] : null;

     // Ça change en fonction des dates disponibles
     if (anneeInf && anneeSup) {
         imageDatesExtremes.textContent = `${anneeInf} - ${anneeSup}`;
     } else if (anneeSup) {
         imageDatesExtremes.textContent = `${anneeSup} - Date non disponible`;
     } else if (anneeInf) {
         imageDatesExtremes.textContent = `Date non disponible - ${anneeInf}`;
     } else {
         imageDatesExtremes.textContent = "Date non disponible";
     }

     ficheImage.appendChild(imageDatesExtremes);

     //Afiche tout sur le volet

     fichesImages.appendChild(ficheImage);
 });

        // Ajoute les événements en dehors de la boucle
        fichesSurvolees.forEach(fiche => {
            fiche.addEventListener('mouseover', function () {
                this.style.opacity = '1';

                const idImage = this.getAttribute('data-id'); // Changement ici
                console.log("ID survolé :", idImage);
                map.setPaintProperty('images-points', 'circle-color', [
                    'case',
                    ['==', ['get', 'id_image'], idImage],
                    '#ff0000',
                    '#007cbf'
                ]);
            });

            fiche.addEventListener('mouseout', function () {
                this.style.opacity = '0.85';
                map.setPaintProperty('images-points', 'circle-color', '#007cbf');
            });
        });
    });
}

document.getElementById("bouton-volet").addEventListener("click", function (event) {
    if (volet.classList.contains("plie")) {
        map.setLayoutProperty('images-points', 'visibility', 'none');
    } else {
        map.setLayoutProperty('images-points', 'visibility', 'visible');
        afficherImagesVolet();
    }
});
