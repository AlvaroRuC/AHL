let idPointSelectionne = null;

map.on('click', 'images-points', (e) => {

    map.flyTo({
        center: e.features[0].geometry.coordinates,
        bearing: (e.features[0].properties.orient),
        speed: 0.3,
        zoom: 18,
        pitch: 70,
        offset: [0, 300],
        essential: true,
    });
    const imageIdHover = e.features[0].properties.id;

    if (e.features.length > 0) {
        if (idPointSelectionne !== null) {
            map.setFeatureState(
                { source: 'images', id: idPointSelectionne },
                { hover: false }
            );
        }
        map.getCanvas().style.cursor = 'pointer';
        idPointSelectionne = e.features[0].id;
        map.setFeatureState(
            { source: 'images', id: idPointSelectionne },
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

    // Pour rendre invisible le polygone après 3sg de la fin de l'animation.
    const moveendHandler = () => {

        map.setLayoutProperty('images-polygones', 'visibility', 'visible');

        setTimeout(() => {
            map.setLayoutProperty('images-polygones', 'visibility', 'none');
            selectedPointId = null;
        }, 3000);

        map.off('moveend', moveendHandler);
    };

    map.on('moveend', moveendHandler);
})
