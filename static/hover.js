// Ça sert à marquer les points de photos quand le pointeur passe sur eux.

let hoveredPointId = null;

map.on('mousemove', 'images-points', (e) => {
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