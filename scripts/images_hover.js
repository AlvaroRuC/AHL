// Ça sert à marquer les photos quand la souris passe sur le point ou sur l'image

// let idFicheSurvole = null; // Ça correspond aux points et aux images sur le volet

let idPointSurvole = null;  // ID du point survolé sur la carte

let timeoutId = null;  // Variable pour stocker l'identifiant du timeout

// Fonction utilitaire pour obtenir l'ID MapLibre à partir de id_image
function obtenirIdMLDepuisIdImage(idImage) {
    const features = map.querySourceFeatures('images', {
        filter: ['==', ['get', 'id_image'], idImage]
    });

    return features[0].id;
}

function surlignerImage(idMapLibreImage, idImageSurvolee) {
    // Si un timeout est déjà en cours, on l'annule
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    // On crée un nouveau timeout avec un délai (par exemple 300ms)
    timeoutId = setTimeout(() => {

        map.setFeatureState(
            { source: 'images', id: idMapLibreImage },
            { hover: true }
        );

        map.setLayoutProperty(
            'images-polygones',
            'visibility',
            'visible'
        );

        map.setFilter(
            'images-polygones',
            ['==', ['number', ['get', 'image']], idImageSurvolee]
        );

    }, 100);  // 100ms de délai avant d'exécuter la logique
}

function enleverSurlignageImage(idMapLibreImage) {

    map.setFeatureState(
        { source: 'images', id: idMapLibreImage },
        { hover: false }
    );

    map.setLayoutProperty(
        'images-polygones',
        'visibility',
        'none'
    );

}

map.on('mouseenter', 'images-points', (e) => {

    const imageIdSurvolee = e.features[0].properties.id_image;

    const idMapLibre = obtenirIdMLDepuisIdImage(imageIdSurvolee);

    map.getCanvas().style.cursor = 'pointer';
    idPointSurvole = e.features[0].id;

    surlignerImage(idMapLibre, imageIdSurvolee);
});

map.on('mouseleave', 'images-points', () => {

    enleverSurlignageImage(idPointSurvole)

    map.getCanvas().style.cursor = '';
    idPointSurvole = null;
});
