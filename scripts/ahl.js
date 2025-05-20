// import "./carte.js";
// import { activerBati3d } from "./actions-carte.js";
import "../composants/ahl-toggle-switch.js";
import { controlesPersonnalises, logos } from "./parametres.js";

// Création de contrôles personnalisés

class ControleCarte {
  constructor(options) {
    this.idControle = options.idControle;
    this.iconeSvg = options.iconeSvg;
    this.onClick = options.onClick;
  }

  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.classList = "maplibregl-ctrl maplibregl-ctrl-group";

    this.bouton = document.createElement("button");

    // Affecte l'ID du bouton
    this.bouton.id = this.idControle;
    this._container.appendChild(this.bouton);

    // Applique le style Flexbox pour centrer l'icône
    this.bouton.style.display = "flex";
    this.bouton.style.justifyContent = "center";
    this.bouton.style.alignItems = "center";
    this.bouton.style.padding = "0";

    this.icone = document.createElement("span");
    this.icone.style.height = "80%";
    this.icone.style.width = "80%";

    this.icone.classList = "maplibregl-ctrl-icon";
    this.icone.innerHTML = this.iconeSvg;

    this.bouton.appendChild(this.icone);

    // Si une fonction de clic est définie, on l'ajoute comme gestionnaire d'événements
    if (this.onClick) {
      this.bouton.addEventListener("click", this.onClick);
    }

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

controlesPersonnalises.forEach((controle) => {
  const boutonControle = new ControleCarte(controle);
  map.addControl(boutonControle, "top-right");
});

class Logo {
  constructor(options) {
    this.idLogo = options.idLogo;
    this.iconePng = options.iconePng;
    this.urlLien = options.urlLien;
    this.onClick = options.onClick;
  }

  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.classList = "maplibregl-ctrl maplibregl-ctrl-group";

    // Créer un lien <a> pour transformer l'image en hyperlien
    this.lien = document.createElement("a");
    this.lien.href = this.urlLien; // L'URL pour le lien
    this.lien.target = "_blank"; // Pour ouvrir le lien dans un nouvel onglet (optionnel)

    // Si une fonction de clic est définie, on l'ajoute comme gestionnaire d'événements
    if (this.onClick) {
      this.lien.addEventListener("click", this.onClick);
    }

    // Applique un style Flexbox pour centrer l'image à l'intérieur du lien
    this._container.classList = "panneau-configuration panneau-logo";

    // Créer l'élément <img> pour l'icône PNG
    this.icone = document.createElement("img");
    this.icone.src = this.iconePng; // URL de l'image PNG
    this.icone.alt = "Logo"; // Texte alternatif pour l'image
    this.icone.style.height = "40px"; // Taille de l'image
    this.icone.style.width = "auto"; // Largeur automatique
    this.icone.style.marginTop = "4px";
    this.icone.classList = "maplibregl-ctrl-icon";

    // Ajouter l'image à l'élément <a>
    this.lien.appendChild(this.icone);

    // Ajouter le lien à _container
    this._container.appendChild(this.lien);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

logos.forEach((controle) => {
  const logos = new Logo(controle);
  map.addControl(logos, "bottom-left");
});
