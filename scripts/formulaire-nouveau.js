function generateGeoJSON() {
    const comment = document.getElementById('comment').value;
    const date = document.getElementById('date').value;
    const lieu = document.getElementById('lieu').value;
    const coordinatesInput = document.getElementById('coordinates').value;

    // Convertir les coordonnées en tableau de nombres
    const coordinates = coordinatesInput.split(',').map(Number);
    
    const geojson = {
        type: "FeatureCollection",
        features: [{
            type: "Feature",
            properties: {
                comment: comment,
                date: date,
                lieu: lieu
            },
            geometry: {
                type: "Point",
                coordinates: coordinates
            }
        }]
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.geojson';
    a.click();
    URL.revokeObjectURL(url);
}