// Ça sert à marquer les points de photos quand le pointeur passe sur eux.

let idPointSurvole = null;

//Pour optimiser le rendement
let lastMove = 0;
const throttleTime = 50;

map.on('mousemove', 'images-points', (e) => {

    const now = Date.now();
    if (now - lastMove < throttleTime) {
        return; // Ignore si le temps écoulé depuis le dernier appel est trop court
    }
    lastMove = now;

    const imageIdHover = e.features[0].properties.id_image;

    if (e.features.length > 0) {
        if (idPointSurvole !== null) {
            map.setFeatureState(
                { source: 'images', id: idPointSurvole },
                { hover: false }
            );
        }
        map.getCanvas().style.cursor = 'pointer';
        idPointSurvole = e.features[0].id;
        map.setFeatureState(
            { source: 'images', id: idPointSurvole },
            { hover: true }
        );

        // Pour marquer les emprises des photographies

        map.setLayoutProperty(
            'images-polygones',
            'visibility',
            'visible');

        map.setFilter(
            'images-polygones',
            ['==', ['number', ['get', 'image']], imageIdHover]
        )
    }
});

map.on('mouseleave', 'images-points', () => {
    if (idPointSurvole !== null && idPointSelectionne === null) {
        map.setFeatureState(
            { source: 'images', id: idPointSurvole },
            { hover: false }
        );
        map.setLayoutProperty(
            'images-polygones',
            'visibility',
            'none');
    }
    map.getCanvas().style.cursor = '';
    idPointSurvole = null;
});