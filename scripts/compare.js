var comparaison = null;
var comparaisonActivee = false;
var afterMap = null;

var bouton = document.getElementById('bouton-comparer').addEventListener('click', function () {

    var coordonneesCenter = map.getCenter();
    var longitude = coordonneesCenter.lng;
    var latitude = coordonneesCenter.lat;
    var zoom = map.getZoom();
    var pitch = map.getPitch();
    var bearing = map.getBearing();


    if (!comparaisonActivee) {
        // Afficher le conteneur de comparaison
        document.getElementById('comparison-container').style.display = 'block';

        // var beforeMap = map;

        // Créer une nouvelle instance de la carte "After"
        afterMap = new maplibregl.Map({
            container: "after",
            style: "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
            center: [longitude, latitude],
            zoom: zoom,
            pitch: pitch,
            bearing: bearing,
        });

        var container = "#comparison-container";

        comparaison = new maplibregl.Compare(afterMap, map, container, {
            // Optionnel : activer le mouvement de la souris pour comparer
            // mousemove: true
        });

        this.textContent = 'Désactiver la comparaison';

    } else {
        // Cacher le conteneur de comparaison
        document.getElementById('comparison-container').style.display = 'none';
        this.textContent = 'Activer la comparaison';

        // Retirer le widget de comparaison
        if (comparaison) {
            comparaison.remove();
            comparaison = null; // Réinitialiser la variable de comparaison
        }

        // Si afterMap existe, le retirer
        if (afterMap) {
            afterMap.remove();  // Retirer l'instance de la carte "After"
            afterMap = null; // Réinitialiser afterMap
        }
    }

    comparaisonActivee = !comparaisonActivee; // Bascule l'état
});
