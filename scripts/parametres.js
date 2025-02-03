import { troisD, photographie, boucherie } from "./modules/icones.js";
import { alternerVisibilite, alternerImagesVolet } from "./modules/actions-carte.js";
// import { basculerVolet } from "./volet.js";

const controlesPersonnalises = [
  {
    idControle: "photographies",
    iconeSvg: photographie,
    onClick: () => {
      basculerVolet();
      alternerImagesVolet();
    },
  },
  {
    idControle: "trois-d",
    iconeSvg: troisD,
    onClick: () => alternerVisibilite("bati-3d"),
  },
  {
    idControle: "boucherie",
    iconeSvg: boucherie,
    onClick: () => alternerVisibilite("boucherie-3d"),
  },
];

export { controlesPersonnalises };
