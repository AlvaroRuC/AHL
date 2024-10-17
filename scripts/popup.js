// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.

map.on('click', 'images-points', (e) => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const lieu = e.features[0].properties.lieu;
    // const dateInf = e.features[0].properties.cote_aml; 
    const cheminImg = document.getElementById('chemin');
    const imageId = e.features[0].properties.id;

    // Ceci sert à changer la visibilité de la couche des emprises des photographies.

    map.setLayoutProperty(
        'images-polygones',
        'visibility',
        'visible');

    map.setFilter(
        'images-polygones',
        ['==', ['number', ['get', 'image']], imageId]
    )

    // On revient sur les reglages du popup.

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new maplibregl.Popup({
        className: 'popupRedimensionnable'
    })
        .setLngLat(coordinates)
        .setHTML('<img class="popup-img" src="' + e.features[0].properties['chemin'] + '">' +
            '<h4>' + lieu + '</h4>' +
            '<h4>' + date_inf + '-' + date_sup + '</h4>' 
        )
        .addTo(map);
});

// Change the cursor to a pointer when the mouse is over the places layer.

map.on('mouseenter', 'images-points', () => {
    map.getCanvas().style.cursor = 'pointer';
});

// Pour que la souris récupère le symbole normal quand elle part.
map.on('mouseleave', 'images-points', () => {
    map.getCanvas().style.cursor = '';
});

// Pour fermer l'emprise de la photographie quand on ferme le popup
