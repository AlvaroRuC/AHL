import { controlesPersonnalises, logos } from "../parametres.js";

export class Logos {
  constructor(options) {
    this.idLogo = options.idLogo;
    this.iconePng = options.iconePng;
    this.urlLien = options.urlLien;
    this.onClick = options.onClick;
  }

  onAdd(map) {
    this._map = map;
    this._container = document.createElement("div");
    this._container.classList = "panneau-configuration panneau-logo";

    this.lien = document.createElement("a");
    this.lien.href = this.urlLien;
    this.lien.target = "_blank";

    if (this.onClick) {
      this.lien.addEventListener("click", this.onClick);
    }

    this.icone = document.createElement("img");
    this.icone.src = this.iconePng;
    this.icone.alt = "Logo";
    this.icone.classList = "maplibregl-ctrl-icon";
    this.icone.style.height = "40px";
    this.icone.style.width = "auto";
    this.icone.style.marginTop = "4px";

    this.lien.appendChild(this.icone);
    this._container.appendChild(this.lien);

    return this._container;
  }

  onRemove() {
    this._container.parentNode.removeChild(this._container);
    this._map = undefined;
  }
}

export function ajouterLogos(map) {
  logos.forEach((logo) => {
    const logoCtrl = new Logos(logo);
    map.addControl(logoCtrl, "bottom-left");
  });
}
