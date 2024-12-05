// Ça sert à marquer les photos quand la souris passe sur le point ou sur l'image

// let idFicheSurvole = null; // Ça correspond aux points et aux images sur le volet

let idPointSurvole = null;  // ID du point survolé sur la carte

function surlignerImage(idImage) {
    const features = map.querySourceFeatures('images', {
        filter: ['==', ['get', 'id_image'], idImage]
    });

    if (features.length > 0) {
        const feature = features[0];
        const mapLibreId = feature.id;

        map.setFeatureState(
            { source: 'images', id: mapLibreId },
            { hover: true }
        );

        map.setLayoutProperty(
            'images-polygones',
            'visibility',
            'visible'
        );

        map.setFilter(
            'images-polygones',
            ['==', ['number', ['get', 'image']], idImage]
        );
    }
}

function enleverSurlignageImage(idImage) {
    const features = map.querySourceFeatures('images', {
        filter: ['==', ['get', 'id_image'], idImage]
    });

    if (features.length > 0) {
        const feature = features[0];
        const mapLibreId = feature.id;

        map.setFeatureState(
            { source: 'images', id: mapLibreId },
            { hover: false }
        );

        map.setLayoutProperty(
            'images-polygones',
            'visibility',
            'none'
        );
    }
}

let lastMove = 0;
const throttleTime = 50;

map.on('mousemove', 'images-points', (e) => {
    const now = Date.now();
    if (now - lastMove < throttleTime) {
        return;
    }
    lastMove = now;

    const imageIdHover = e.features[0].properties.id_image;

    if (e.features.length > 0) {
        if (idPointSurvole !== null && idPointSurvole !== e.features[0].id) {
            map.setFeatureState(
                { source: 'images', id: idPointSurvole },
                { hover: false }
            );
        }

        map.getCanvas().style.cursor = 'pointer';
        idPointSurvole = e.features[0].id;

        surlignerImage(imageIdHover);
    }
});

map.on('mouseleave', 'images-points', () => {
    if (idPointSurvole !== null) {
        map.setFeatureState(
            { source: 'images', id: idPointSurvole },
            { hover: false }
        );

        enleverSurlignageImage(idPointSurvole);
    }

    map.getCanvas().style.cursor = '';
    idPointSurvole = null;
});
