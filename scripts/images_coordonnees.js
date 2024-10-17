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
})