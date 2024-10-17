// Ça sert à marquer les points de photos quand le pointeur passe sur eux.

let hoveredPointId = null;

map.on('mousemove', 'images-points', (e) => {

    const imageIdHover = e.features[0].properties.id;

    if (e.features.length > 0) {
        if (hoveredPointId !== null) {
            map.setFeatureState(
                { source: 'images', id: hoveredPointId },
                { hover: false }
            );
        }
        map.getCanvas().style.cursor = 'pointer';
        hoveredPointId = e.features[0].id;
        map.setFeatureState(
            { source: 'images', id: hoveredPointId },
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
    if (hoveredPointId !== null) {
        map.setFeatureState(
            { source: 'images', id: hoveredPointId },
            { hover: false }
        );
    }
    map.getCanvas().style.cursor = '';
    hoveredPointId = null;
});