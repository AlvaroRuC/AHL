import { troisD, photographie } from "./modules/icones.js";
import { alternerVisibilite } from "./actions-carte.js";

// Définir un objet avec plusieurs contrôles
const controlesPersonnalises = [
    {
      idControle: "photographies",
      iconeSvg: photographie,
      onClick: alternerVisibilite,
    },
    {
      idControle: "trois-d",
      iconeSvg: troisD,
      onClick: () => alternerVisibilite("bati-3d2"),
    },
  ];

  export {controlesPersonnalises}