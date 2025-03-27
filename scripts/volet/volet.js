import { map } from "../modules/carte.js";

let volet, voletParent, controleBasDroite, longeurVolet, padding;

document.addEventListener("DOMContentLoaded", () => {

  // Initialisation des constantes
  volet = document.getElementById("volet");
  const voletParents = document.getElementsByClassName("maplibregl-ctrl-top-right");
  voletParent = voletParents[0];

  const controlesBasDroite = document.getElementsByClassName("maplibregl-ctrl-bottom-right");
  controleBasDroite = controlesBasDroite[0];

  longeurVolet = "25%";
  const pourcentageLongeurVolet = parseFloat(longeurVolet) / 100;

  const canevasCarte = document.getElementById("map");
  const canevasCarteLongeur = canevasCarte.offsetWidth;

  padding = {
    right: canevasCarteLongeur * pourcentageLongeurVolet,
  };
});

function ouvrirVolet() {
  volet.classList.remove("plie");
  volet.style.width = longeurVolet;
  voletParent.style.right = longeurVolet;
  voletParent.style.transition = "right 1s linear";
  controleBasDroite.style.transition = "right 1s linear";
  controleBasDroite.style.right = longeurVolet;

  map.easeTo({
    padding,
    duration: 1000,
  });
}

function basculerVolet() {
  if (volet.classList.contains("plie")) {
    ouvrirVolet();
  } else {
    volet.classList.add("plie");
    volet.style.width = "0%";
    voletParent.style.right = "0%";
    controleBasDroite.style.right = "0%";

    map.easeTo({
      padding: {
        right: 0,
      },
      duration: 1000,
    });
  }
}

export { basculerVolet };
