const map = new maplibregl.Map({
    container: 'map',
    center: [1.25866, 45.83088],
    maxBounds: [[1.123559633, 45.78234858], [1.353149083, 45.935090766]],
    minZoom: 9.5,
    maxZoom: 20,
    maxPitch: 85,
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

    map.addSource("sOrthophotos2023", {
        "type": "raster",
        "tiles": [
            // "https://criham-geoserver.unilim.fr/geoserver/AHL/wms?layers=AHL:1765&FORMAT=image/png&service=WMS&version=1.1.0&request=GetMap&STYLES=&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&width=768&height=678"
            "https://data.geopf.fr/wms-r?LAYERS=ORTHOIMAGERY.ORTHOPHOTOS.ORTHO-EXPRESS.2023&FORMAT=image/jpeg&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&STYLES=&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256"
        ],
        "tileSize": 256,
        "attribution": "Institut national de l'information géographique et forestière"
    });

    map.addSource("sOrthophotos1950", {
        "type": "raster",
        "tiles": [
            'https://data.geopf.fr/wms-r?LAYERS=ORTHOIMAGERY.ORTHOPHOTOS.1950-1965&FORMAT=image/jpeg&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&STYLES=&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256'
        ],
        "tileSize": 256,
        "attribution": "Institut national de l'information géographique et forestière"
    });

    map.addSource("sCarte1843", {
        "type": "raster",
        "tiles": [
            // layer1 Eliminar esta prueba?
            "https://data.geopf.fr/wms-r?LAYERS=SCANEM40_PYR_PNG_FXX_LAMB93&FORMAT=image/jpeg&SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&STYLES=&CRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256"
        ],
        "tileSize": 256,
        "attribution": "Institut national de l'information géographique et forestière"
    });

    map.addSource("Bati2024", {
        "type": "geojson",
        "data": "/donnees/Bati-CRS-84.geojson"
    })

    map.addSource("images", {
        "type": "geojson",
        "data": "/donnees/images_points.geojson",
        "generateId": true
    })

    map.addSource("images_emprise", {
        "type": "geojson",
        "data": "/donnees/images_emprise.geojson",
        "generateId": true
    })

    // var cartePrincipale = ""

    map.addLayer(
        {
            "id": "cartePrincipale",
            "source": "sCarte1843",
            "type": "raster"
        },
    );

    map.addLayer(
        {
            "id": "bati-3d",
            "source": "Bati2024",
            "type": "fill-extrusion",
            "paint": {
                "fill-extrusion-color": "grey",
                "fill-extrusion-height": ["get", "HAUTEUR"],
                "fill-extrusion-opacity": 0.8,
            },
            "layout": {
                "visibility": "none",
            }
        }
    )

    map.addLayer(
        {
            "id": "images-points",
            "source": "images",
            "type": "circle",
            "paint": {
                "circle-color": "white",
                "circle-radius": 6,
                "circle-stroke-width": 2,
                "circle-stroke-color": [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    "#1c90b9",
                    "grey",
                ],
            },
            "layout": { "visibility": "none" }
        },
    );

    map.addLayer(
        {
            "id": "images-polygones",
            "source": "images_emprise",
            "type": "fill",
            "paint": {
                "fill-opacity": 0.3,
                "fill-color": "#1c90b9",
            },
            "layout": { "visibility": "none" }
        },
    )

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
                'source': 'sCarte1843',
                'type': 'raster'
            },
        );

        if (carte2.value == "c1843") {
            setLayerSource(
                'carteSuperposee', 'sCarte1843'
            )
        }
        else if (carte2.value == "c1950") {
            setLayerSource(
                'carteSuperposee', 'sOrthophotos1950'
            )
        }
        else if (carte2.value == "c2023") {
            setLayerSource(
                'carteSuperposee', 'sOrthophotos2023'
            )
        }
    });

    // Carte principale

    var carte1 = document.getElementById('carte-select-1');

    carte1.addEventListener('change', function () {
        if (carte1.value == "c1843") {
            setLayerSource(
                'cartePrincipale', 'sCarte1843'
            )
        }
        else if (carte1.value == "c1950") {
            setLayerSource(
                'cartePrincipale', 'sOrthophotos1950'
            )
        }
        else if (carte1.value == "c2023") {
            setLayerSource(
                'cartePrincipale', 'sOrthophotos2023'
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

map.addControl(new maplibregl.ScaleControl());

// Sidebar:

const imageSidebar = document.getElementById("imageImage")
const lieuSidebar = document.getElementById("imageLieu")
const datesSidebar = document.getElementById("imagesDates")
const imageNotice = document.getElementById("imageNotice")


map.on('click', 'images-points', (e) => {

    var imageChemin = '../ressources/images/' + e.features[0].properties.chemin;
    var imageLieu = e.features[0].properties.lieu;
    var imageCote = e.features[0].properties.cote_aml;

    var date_inf = e.features[0].properties.date_inf;
    var date_sup = e.features[0].properties.date_sup;

    var dateDebut = new Date(date_inf);
    var dateFin = new Date(date_sup);
    

    // Verifie si les dates sont valides
    function isValidDate(date) {
        return !isNaN(date.getTime());
    }

    var imageDates = '';

    if (!isValidDate(dateDebut) && !isValidDate(dateFin)) {
        imageDates = 'Date inconnue';
    } else if (isValidDate(dateDebut) && !isValidDate(dateFin)) {
        imageDates = 'Après ' + dateDebut.getFullYear();
    } else if (!isValidDate(dateDebut) && isValidDate(dateFin)) {
        imageDates = 'Avant ' + dateFin.getFullYear();
    } else if (isValidDate(dateDebut) && isValidDate(dateFin)) {
        imageDates = 'Entre '+ dateDebut.getFullYear() + ' et ' + dateFin.getFullYear();
    }

    var imageCommentaire = e.features[0].properties.comment;


    openSidebar('right');

    if (e.features.length === 0) return;

    var imageNotice = `
    <img class="sidebar-image" src="${imageChemin}">
        <a href="https://archivesenligne.limoges.fr/4DCGI/Web_VoirLaNotice/34_01/${imageCote}/${imageCote}/ILUMP16014" target="_blank"> Voir notice</a>
        <a href="https://archivesenligne.limoges.fr/4DCGI/Web_DFPict/034/${imageCote}/ILUMP16014" target="_blank"> Voir image</a>
        <h4>${imageLieu}</h4>
        <p>${imageDates}</p>
        <p>Archives Municipales de Limoges. Côte: ${imageCote}</p>

        <form id="formulaireImages">
            <label for="commentaires">Commentaires :</label>
            <input type="text" id="imageCommentaires" name="commentaires">
            <button type="submit">Sauvegarder</button>
        </form>

        <p id="dataStatus">Données actuelles: <span id="currentSource">Source initiale</span></p>
    `;

    document.getElementById('imageNotice').innerHTML = imageNotice

}
);
