// import "./carte.js";
// import { activerBati3d } from "./actions-carte.js";
import "../composants/ahl-toggle-switch.js";
import { controlesPersonnalises } from "./parametres.js";

// Création de contrôles personnalisés

class ControleCarte {
  constructor(options) {
    this.idControle = options.idControle;
    this.iconeSvg = options.iconeSvg;
    this.onClick = options.onClick; // Fonction de gestion du clic
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
