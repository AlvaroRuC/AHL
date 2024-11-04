class LayersControl {
    constructor(ctrls, container) {
      // This div will hold all the checkboxes and their labels
      this._container = container
      this._container.classList.add("layers-control-container");
      // Might be cleaner to deep copy these instead
      this._ctrls = ctrls;
      // Direct access to the input elements so I can decide which should be
      // checked when adding the control to the map.
      this._inputs = [];
      // Create the checkboxes and add them to the container
      for (const key of Object.keys(this._ctrls)) {
        let labeled_checkbox = this._createLabeledCheckbox(key);
        this._container.appendChild(labeled_checkbox);
      }
    }

    // Creates one checkbox and its label
    _createLabeledCheckbox(key) {
      let label = document.createElement("label");
      label.classList.add("layer-control");
      let text = document.createTextNode(key);
      let input = document.createElement("input");
      this._inputs.push(input);
      input.type = "checkbox";
      input.id = key;

      input.addEventListener("change", () => {
        const visibility = input.checked ? "visible" : "none";
        // Regroupez les changements de visibilité
        for (const layer of this._ctrls[input.id]) {
          this._map.setLayoutProperty(layer, "visibility", visibility);
        }
      });

      label.appendChild(input);
      label.appendChild(text);
      return label;
    }

    onAdd(map) {
      this._map = map;
      // For every checkbox, find out if all its associated layers are visible.
      // Check the box if so.
      for (const input of this._inputs) {
        // List of all layer ids associated with this checkbox
        let layers = this._ctrls[input.id];
        // Check whether every layer is currently visible
        let is_visible = true;
        for (const layername of layers) {
          is_visible =
            is_visible &&
            this._map.getLayoutProperty(layername, "visibility") !== "none";
        }
        input.checked = is_visible;
      }
      return this._container;
    }

  updateControlState() {
    for (const input of this._inputs) {
      let layers = this._ctrls[input.id];
      let is_visible = true;
      for (const layername of layers) {
        is_visible = is_visible && this._map.getLayoutProperty(layername, "visibility") !== "none";
      }
      input.checked = is_visible;
    }
  }
}

//Couches selectionnées

const layers = {
  "Bâti 3D": ["bati-3d"],//on peut ajouter plusieurs couches
  // "Terrain 3D": [],
  "Boucherie 3D": ["3d-model"]
};

map.on('load', () => {
  const controlDiv = document.getElementById("layersControlDiv");
  const layersControl = new LayersControl(layers, controlDiv);
  controlDiv.appendChild(layersControl.onAdd(map)); // Ajouter les contrôles à la carte
  layersControl.updateControlState(); // Mettre à jour l'état des contrôles
});