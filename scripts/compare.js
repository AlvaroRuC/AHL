// Este es el que no quiero

// var beforeMap = new maplibregl.Map({
//     container: "before",
//     style:
//         "https://data.geopf.fr/annexes/ressources/vectorTiles/styles/PLAN.IGN/standard.json",
//     center: [1.25866, 45.83088],
//     zoom: 15,
// });

var afterMap = new maplibregl.Map({
    container: "after",
    style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
    center: [1.25866, 45.83088],
    zoom: 15,
});

// A selector or reference to HTML element
var container = "#comparison-container";

var map = new maplibregl.Compare(beforeMap, afterMap, container, {
    // Set this to enable comparing two maps by mouse movement:
    // m ousemove: true
});