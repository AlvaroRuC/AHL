function volSurPointImage(idImage) {
    console.log('idImage dans volSurPointImage:', idImage);

    if (idImage === undefined || idImage === null) {
        console.error('L\'idImage est invalide');
        return;
    }

    // Réinitialiser l'état hover pour tous les éléments (on les met à false)
    const allFeatures = map.querySourceFeatures('images', { filter: ['has', 'id_image'] });
    allFeatures.forEach(feature => {
        map.setFeatureState(
            { source: 'images', id: feature.id },  // Utilise feature.id ici pour l'état
            { hover: false }
        );
    });

    // Filtrer les entités en fonction de id_image
    const features = map.querySourceFeatures('images', {
        filter: ['==', ['get', 'id_image'], idImage]  // Utilise id_image pour filtrer
    });

    if (features.length > 0) {
        const feature = features[0];  // Sélectionne la première fonctionnalité correspondante
        const mapLibreId = feature.id;  // Récupère l'ID généré par MapLibre pour cette fonctionnalité

        // Faire un vol vers la fonctionnalité
        map.flyTo({
            center: feature.geometry.coordinates,
            bearing: feature.properties.orient,
            speed: 0.3,
            zoom: 18,
            pitch: 70,
            offset: [0, 300],
            essential: true,
        });

        // Mettre à jour l'état de la fonctionnalité (hover = true)
        map.setFeatureState(
            { source: 'images', id: mapLibreId },  // Utilise feature.id ici pour manipuler l'état
            { hover: true }
        );

        // Gérer la visibilité des polygones
        map.setLayoutProperty('images-polygones', 'visibility', 'visible');
        map.setFilter(
            'images-polygones',
            ['==', ['number', ['get', 'image']], idImage]  // Filtre avec id_image pour les polygones
        );
    } else {
        console.error('Aucune fonctionnalité trouvée pour idImage:', idImage);
    }
}

// Déclare la variable idPointSelectionne en dehors du gestionnaire d'événements
let idPointSelectionne = null;

map.on('click', 'images-points', (e) => {
    const feature = e.features[0];
    const imageIdHover = feature.properties.id_image;  // Utiliser id_image ici

    // Réinitialiser l'état hover pour le point précédemment sélectionné
    if (idPointSelectionne !== null && idPointSelectionne !== feature.id) {
        map.setFeatureState(
            { source: 'images', id: idPointSelectionne },
            { hover: false }
        );
    }

    // Mettre à jour le curseur et l'état hover pour le point sélectionné
    map.getCanvas().style.cursor = 'pointer';
    idPointSelectionne = feature.id;  // Sauvegarde l'ID du point sélectionné

    map.setFeatureState(
        { source: 'images', id: idPointSelectionne },
        { hover: true }
    );

    // Appeler la fonction volSurPointImage avec id_image
    volSurPointImage(imageIdHover);  // Passe imageIdHover (id_image) à la fonction

    // Gérer la visibilité du polygone après un certain délai
    const moveendHandler = () => {
        map.setLayoutProperty('images-polygones', 'visibility', 'visible');  // Rendre visible

        setTimeout(() => {
            map.setLayoutProperty('images-polygones', 'visibility', 'none');  // Masquer après 3 secondes
            idPointSelectionne = null;  // Réinitialiser idPointSelectionne
        }, 3000);  // Attendre 3 secondes avant de masquer le polygone

        map.off('moveend', moveendHandler);
    };

    map.on('moveend', moveendHandler);
});
