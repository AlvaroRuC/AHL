import { map } from "./carte.js";

function alternerVisibilite(LayerId) {
    const currentVisibility = map.getLayoutProperty(LayerId, "visibility");

    if (currentVisibility === "visible") {
      map.setLayoutProperty(LayerId, "visibility", "none");
    } else {
      map.setLayoutProperty(LayerId, "visibility", "visible");
    }
  }

export { alternerVisibilite };