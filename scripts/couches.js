// Création un nouveau control Maplibre pour controler le déplacement

const controleCouches = document.createElement("div");
controleCouches.classList = "maplibregl-ctrl maplibregl-ctrl-group";
const controlCouchesParents = document.getElementsByClassName("maplibregl-ctrl-top-right");
const controlCouchesParent = controlCouchesParents[0];
controlCouchesParent.appendChild(controleCouches);

const boutonCouches = document.createElement("button");
boutonCouches.id = "bouton-couches";
boutonCouches.classList.add("controle");

controleCouches.appendChild(boutonCouches);


const icon = document.createElement("img");
icon.src = "../ressources/icones/couches.png";
icon.alt = "Icône couches";
icon.style.height = "80%";
icon.style.margin = "3px";


boutonCouches.appendChild(icon);