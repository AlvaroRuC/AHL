import { troisD, photographie, boucherie } from "./modules/icones.js";
import { alternerVisibilite } from "./modules/actions-carte.js";
import { basculerVolet } from "./composants/volet.js";

// Définir un objet avec plusieurs contrôles
const controlesPersonnalises = [
  {
    idControle: "photographies",
    iconeSvg: photographie,
    onClick: basculerVolet,
  },
  {
    idControle: "trois-d",
    iconeSvg: troisD,
    onClick: () => alternerVisibilite("bati-3d"),
  },
  {
    idControle: "boucherie",
    iconeSvg: boucherie,
    onClick: () => alternerVisibilite("boucherie3d"),
  },
];

export { controlesPersonnalises };
