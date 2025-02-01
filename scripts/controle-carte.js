class ControleCarte {
  constructor(idControle, iconeSrc, iconeAlt) {
    // Création des éléments
    this.controleCarte = document.createElement("div");
    this.controleCarte.classList = "maplibregl-ctrl maplibregl-ctrl-group";

    this.boutonControle = document.createElement("button");
    this.boutonControle.id = idControle;
    this.boutonControle.classList.add("controle");

    this.icone = document.createElement("img");
    this.icone.src = iconeSrc;
    this.icone.alt = iconeAlt;
    this.icone.style.height = "80%";
    this.icone.style.margin = "3px";

    // Ajouter l'icône au bouton
    this.boutonControle.appendChild(this.icone);

    // Ajouter le bouton au contrôle
    this.controleCarte.appendChild(this.boutonControle);
  }

  // Getter pour récupérer le controleCarte
  getControle() {
    return this.controleCarte;
  }

  // Autres méthodes pour manipuler le bouton
  addEventListener(eventType, callback) {
    this.boutonControle.addEventListener(eventType, callback);
  }

  setIcon(newIconSrc) {
    this.icone.src = newIconSrc;
  }

  toggleState(isActive) {
    this.boutonControle.disabled = !isActive;
  }
}

export { ControleCarte };
