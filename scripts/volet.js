// Pour ouvrir et fermer le volet

const controlesHautDroite = document.getElementsByClassName("maplibregl-ctrl-top-right");
const controleHautDroite = controlesHautDroite[0];
const controlesBasDroite = document.getElementsByClassName("maplibregl-ctrl-bottom-right");
const controleBasDroite = controlesBasDroite[0];

const volet = document.getElementById("volet")

const longeurVolet = "25%"
const pourcentageLongeurVolet = parseFloat(longeurVolet) / 100

const canevasCarte = document.getElementById('map');
const canevasCarteLongeur = canevasCarte.offsetWidth;

const padding = {
    right: canevasCarteLongeur * pourcentageLongeurVolet,
};

function ouvrirVolet() {
    volet.classList.remove("plie");
    volet.style.width = longeurVolet;
    controleHautDroite.style.right = longeurVolet;
    controleHautDroite.style.transition = "right 1s linear";
    controleBasDroite.style.transition = "right 1s linear";
    controleBasDroite.style.right = longeurVolet;

    map.easeTo({
        padding,
        duration: 1000
    });
}

function basculerVolet() {

    if (volet.classList.contains("plie")) {
        ouvrirVolet()
    }
    else {
        volet.classList.add("plie");
        volet.style.width = "0%";
        controleHautDroite.style.right = "0%";
        controleBasDroite.style.right = "0%";

        map.easeTo({
            padding: {
                right: 0
            },
            duration: 1000
        })
    }
}
