import { controlesPersonnalises, logos } from "../parametres.js";

export class ControlesCarte {
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
    this.bouton.id = this.idControle;
    this.bouton.style.display = "flex";
    this.bouton.style.justifyContent = "center";
    this.bouton.style.alignItems = "center";
    this.bouton.style.padding = "0";

    this.icone = document.createElement("span");
    this.icone.classList = "maplibregl-ctrl-icon";
    this.icone.innerHTML = this.iconeSvg;
    this.icone.style.height = "80%";
    this.icone.style.width = "80%";

    this.bouton.appendChild(this.icone);

    if (this.onClick) {
      this.bouton.addEventListener("click", this.onClick);
    }

    this._container.appendChild(this.bouton);
    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

export function ajouterControles(map) {
  controlesPersonnalises.forEach((controle) => {
    const boutonControle = new ControlesCarte(controle);
    map.addControl(boutonControle, "top-right");
  });
}
