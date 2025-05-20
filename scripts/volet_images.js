// import { creerFicheImageDetaillee } from "./modules/actions-volet";
// Refait les fiches quand on filtre les données

const inputs = document.querySelectorAll(
  "#range1, #range2, #slider-1, #slider-2"
);

inputs.forEach((input) => {
  input.addEventListener("change", function () {
    gererImagesVolet();
  });
});

// Fonction principale pour afficher les images dans le volet

function gererImagesVolet(lieuRecherche = "") {
  const fichierImagesVisibles = document.getElementById("fichier-img-visibles");
  fichierImagesVisibles.innerHTML = ""; // Vide le fichier des images visibles

  // Recupère les images sur la carte
  const imagesVisiblesDonnees = map.queryRenderedFeatures({
    layers: ["images-points"],
  });

  // Filtrer et trier les images
  const imagesTriees = trierImagesParDistance(imagesVisiblesDonnees);
  const imagesFiltreesParDate = filtrerImagesParDate(imagesTriees);

  const compteur = document.getElementById("compteur-resultats");

  // Afficher le nombre d'images trouvées (ça marche pas avec le filtre texte)
  let message = "";
  if (imagesFiltreesParDate.length === 0) {
    message = "Aucune image visible";
  } else {
    const count = imagesFiltreesParDate.length;
    message = `${count} image${count > 1 ? "s" : ""} trouvée${
      count > 1 ? "s" : ""
    }`;
  }

  // Mettre à jour le texte du compteur
  compteur.textContent = message;

  // Créer et afficher les fiches d'images
  imagesFiltreesParDate.forEach((imagePreFiltre) => {
    const ficheImage = creerFicheImageSiFiltrable(
      imagePreFiltre,
      lieuRecherche
    );
    if (ficheImage) {
      ajouterFicheImage(ficheImage, fichierImagesVisibles); // Ajout de l'image
      selectionFicheImage(ficheImage, imagePreFiltre.properties);
      survolFicheImage(ficheImage, imagePreFiltre.properties); // Hover des fiches
    }
  });
}

// Fonction pour trier les images par distance au centre de la carte
function trierImagesParDistance(images) {
  const centreCarte = map.getCenter();
  return images.sort((a, b) => {
    const distanceA = getDistance(centreCarte, a.geometry.coordinates);
    const distanceB = getDistance(centreCarte, b.geometry.coordinates);
    return distanceA - distanceB;
  });
}

// Fonction pour créer une fiche d'image si elle passe le filtre de recherche
function creerFicheImageSiFiltrable(imagePreFiltre, lieuRecherche) {
  const proprietes = imagePreFiltre.properties;

  // Filtrer selon la recherche (lieu ou code)
  if (
    normaliserTexte(proprietes.lieu).includes(normaliserTexte(lieuRecherche)) ||
    normaliserTexte(proprietes.cote_aml).includes(
      normaliserTexte(lieuRecherche)
    )
  ) {
    return creerFicheImage(proprietes);
  }
  return null;
}

// Ajouter la fiche d'image dans le volet
function ajouterFicheImage(ficheImage, fichierImagesVisibles) {
  fichierImagesVisibles.appendChild(ficheImage);
  setTimeout(() => {
    ficheImage.classList.add("visible");
  }, 10);
}

let ficheDetailleeActive = false;

function selectionFicheImage(ficheImage, proprietes) {
  ficheImage.addEventListener("click", function () {
    // Empêche l'affichage des images lors de la sélection d'une image
    ficheDetailleeActive = true;

    const outilsRecherche = document.getElementById("outils-recherche");
    outilsRecherche.style.display = "none";

    const fichierImagesVisibles = document.getElementById(
      "fichier-img-visibles"
    );
    fichierImagesVisibles.style.display = "none";
    compteur.style.display = "none";


    // Crée et afficher la fiche détaillée
    const volet = document.getElementById("volet");
    const ficheImageDetaillee = creerFicheImageDetaillee(proprietes);
    volet.appendChild(ficheImageDetaillee);

    // Ajoute un bouton de fermeture et événement associé
    creerBoutonFermeture(outilsRecherche, fichierImagesVisibles);
  });

  function creerBoutonFermeture(outilsRecherche, fichierImagesVisibles) {
    const btnFermer = document.createElement("button");
    btnFermer.id = "bouton-fermeture";
    btnFermer.textContent = "x";

    // Vérifie si un bouton de fermeture existe déjà et supprime-le si nécessaire
    const ficheEntete = document.getElementsByClassName("fiche-entete")[0];
    const ancienBtnFermer = ficheEntete.querySelector("#bouton-fermeture");

    if (ancienBtnFermer) {
      ancienBtnFermer.remove(); // Supprime l'ancien bouton
    }

    ficheEntete.appendChild(btnFermer);

    btnFermer.addEventListener("click", function () {
      ficheDetailleeActive = false;
      // Restaure le contenu des outils de recherche
      outilsRecherche.style.display = "block";
      fichierImagesVisibles.style.display = "block";

      // Vider la fiche image sélectionnée
      document.getElementById("fiche-img-selectionnee").innerHTML = "";
    });
  }
}

function survolFicheImage(ficheImage, proprietes) {
  ficheImage.addEventListener("mouseenter", function () {
    const idMapLibre = obtenirIdMLDepuisIdImage(proprietes.id_image);

    surlignerImage(idMapLibre, proprietes.id_image);
  });

  ficheImage.addEventListener("mouseleave", function () {
    // Obtenir l'ID MapLibre depuis l'ID personnalisé (id_image)
    const idMapLibre = obtenirIdMLDepuisIdImage(proprietes.id_image);

    // Enlever le surlignage en utilisant l'ID MapLibre
    enleverSurlignageImage(idMapLibre);
  });
}

// Fonction pour calculer la distance entre deux points (coordonnées géographiques)
function getDistance(pointA, pointB) {
  const lat1 = pointA.lat;
  const lon1 = pointA.lng;
  const lat2 = pointB[1]; // pointB est un tableau [longitude, latitude]
  const lon2 = pointB[0];

  // Convertir les degrés en radians
  const rad = Math.PI / 180;
  const x1 = lat1 * rad;
  const y1 = lon1 * rad;
  const x2 = lat2 * rad;
  const y2 = lon2 * rad;

  // Formule de la distance (Haversine)
  const R = 6371; // Rayon de la Terre en km
  const dLat = x2 - x1;
  const dLon = y2 - y1;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(x1) * Math.cos(x2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance en kilomètres
}

// Événement sur le déplacement de la carte pour réafficher les images visibles
// S'il n'y a pas d'image sélectionnée.
map.on("moveend", function () {
  if (!ficheDetailleeActive) {
    gererImagesVolet(); // Passe la recherche actuelle sans réinitialiser la valeur
  }
});

// Écouteur pour gérer le clic sur une fiche d'image
volet.addEventListener("click", function (event) {
  const ficheCliquee = event.target.closest("#fiche-img-selectionnee");
  if (ficheCliquee) {
    const idImage = parseInt(ficheCliquee.getAttribute("image-id"), 10);
    volSurPointImage(idImage);
  }
});
