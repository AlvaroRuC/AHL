document.addEventListener("DOMContentLoaded", () => {
  // Ton code pour manipuler le DOM ici

  const volet = document.getElementById("volet");
  const voletParents = document.getElementsByClassName(
    "maplibregl-ctrl-top-right"
  );
  const voletParent = voletParents[0];

  const controlesBasDroite = document.getElementsByClassName(
    "maplibregl-ctrl-bottom-right"
  );
  const controleBasDroite = controlesBasDroite[0];

  const longeurVolet = "25%";
  const pourcentageLongeurVolet = parseFloat(longeurVolet) / 100;

  const canevasCarte = document.getElementById("map");
  const canevasCarteLongeur = canevasCarte.offsetWidth;

  const padding = {
    right: canevasCarteLongeur * pourcentageLongeurVolet,
  };

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

  basculerVolet()

});

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
