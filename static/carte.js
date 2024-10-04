const map = new maplibregl.Map({
    container: 'map',
    center: [1.25866, 45.83088],
    maxBounds: [[1.123559633, 45.78234858], [1.353149083, 45.935090766]],
    minZoom: 9.5,
    maxZoom: 20,
    zoom: 13,
    style:
        'https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/standard.json',
    // 'https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL',
});

const slider1 = document.getElementById('slider1');
const sliderValue1 = document.getElementById('slider-value-1');

const slider2 = document.getElementById('slider2');
const sliderValue2 = document.getElementById('slider-value-2');

map.on('load', () => {

    //Pour afficher les etiquettes de modernes sur les couches anciennees

    // const layers = map.getStyle().layers;
    // // Find the index of the first symbol layer in the map style
    // let firstSymbolId;
    // for (let i = 0; i < layers.length; i++) {
    //     if (layers[i].type === 'symbol') {
    //         firstSymbolId = layers[i].id;
    //         break;
    //     }
    // }

    map.addSource("orthophotos2023", {
        "type": "raster",
        "tiles": [
            // "https://criham-geoserver.unilim.fr/geoserver/AHL/wms?service=WMS&version=1.1.0&request=GetMap&layers=AHL%3A1765&bbox=138980.49021339905%2C5751617.664022118%2C141650.3105063983%2C5753976.618561288&width=768&height=678&srs=EPSG%3A385"
            "https://data.geopf.fr/wms-r?LAYERS=ORTHOIMAGERY.ORTHOPHOTOS.ORTHO-EXPRESS.2023&FORMAT=image/jpeg&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&STYLES=&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256"
        ],
        "tileSize": 256,
        "attribution": "Institut national de l'information géographique et forestière"
    });

    map.addSource("orthophotos1950", {
        "type": "raster",
        "tiles": [
            'https://data.geopf.fr/wms-r?LAYERS=ORTHOIMAGERY.ORTHOPHOTOS.1950-1965&FORMAT=image/jpeg&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&STYLES=&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
        ],
        "tileSize": 256,
        "attribution": "Institut national de l'information géographique et forestière"
    });

    map.addSource('carte1843', {
        'type': 'raster',
        'tiles': [
            // layer1 Eliminar esta prueba?
            'https://data.geopf.fr/wms-r?LAYERS=SCANEM40_PYR_PNG_FXX_LAMB93&FORMAT=image/jpeg&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&STYLES=&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
        ],
        'tileSize': 256,
        "attribution": "Institut national de l'information géographique et forestière"
    });

    map.addLayer(
        {
            'id': 'cartePrincipale',
            'source': 'carte1843',
            'type': 'raster'
        },
        // firstSymbolId
    );

    // Pour changer les sources des couches:

    // Nouvelle fonction

    function setLayerSource(layerId, source, sourceLayer) {
        const oldLayers = map.getStyle().layers;
        const layerIndex = oldLayers.findIndex(l => l.id === layerId);
        const layerDef = oldLayers[layerIndex];
        const before = oldLayers[layerIndex + 1] && oldLayers[layerIndex + 1].id;
        layerDef.source = source;
        if (sourceLayer) {
            layerDef['source-layer'] = sourceLayer;
        }
        map.removeLayer(layerId);
        map.addLayer(layerDef, before);
    }

    // Carte Superposee

    var carte2 = document.getElementById('carte-select-2');

    console.log("Declaro la variable carte2:", carte2);

    // La variable arroja <select id="carte-select-2" name="carte" autocomplete="off"> y las <options>

    carte2.addEventListener('click', function () {

        //Se le pone un listener a carte2. Si click se activa lo siguiente: 

        // Vérifie que la source existe. Sinon elle est créée

        var mapLayer = map.getLayer('carteSuperposee');
        if (typeof mapLayer !== 'undefined') {
            map.removeLayer('carteSuperposee')
        }

        map.addLayer(
            {
                'id': 'carteSuperposee',
                'source': 'carte1843',
                'type': 'raster'
            },
        );

        console.log("Después listener. carte2.value: ", carte2.value);

        if (carte2.value == "c1843") {
            setLayerSource(
                'carteSuperposee', 'carte1843'
            )
        }
        else if (carte2.value == "c1950") {
            setLayerSource(
                'carteSuperposee', 'orthophotos1950'
            )
        }
        else if (carte2.value == "c2023") {
            setLayerSource(
                'carteSuperposee', 'orthophotos2023'
            )
        }
        console.log("Listener. carte2.id = ", carte2.value);
    });

    // Carte principale

    var carte1 = document.getElementById('carte-select-1');

    carte1.addEventListener('change', function () {
        if (carte1.value == "c1843") {
            setLayerSource(
                'cartePrincipale', 'carte1843'
            )
        }
        else if (carte1.value == "c1950") {
            setLayerSource(
                'cartePrincipale', 'orthophotos1950'
            )
        }
        else if (carte1.value == "c2023") {
            setLayerSource(
                'cartePrincipale', 'orthophotos2023'
            )
        }
    });

    // Pour controler l'opacité:

    //Slider de la carte superposée

    slider1.addEventListener('input', (e) => {
        map.setPaintProperty(
            'carteSuperposee',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        // Value indicator
        sliderValue1.textContent = e.target.value + '%';
    });

    //Slider de la carte principale

    slider2.addEventListener('input', (e) => {
        map.setPaintProperty(
            'cartePrincipale',
            'raster-opacity',
            parseInt(e.target.value, 10) / 100
        );
        // Value indicator
        sliderValue2.textContent = e.target.value + '%';
    });

}
);

map.addControl(new maplibregl.NavigationControl());

map.addControl(new maplibregl.ScaleControl())