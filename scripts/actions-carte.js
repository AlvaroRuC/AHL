import { map } from "./modules/carte.js";

function alternerVisibilite(LayerId) {
    const currentVisibility = map.getLayoutProperty(LayerId, "visibility");

    if (currentVisibility === "visible") {
      map.setLayoutProperty(LayerId, "visibility", "none");
    } else {
      map.setLayoutProperty(LayerId, "visibility", "visible");
    }
  }

function activerBucherie3d() {

  }

export { alternerVisibilite, activerBucherie3d};
