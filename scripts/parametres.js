import { troisD, photographie, boucherie, agrandir, voir, modifier } from "./modules/icones.js";
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

const boutonsImages = [
  {
    idBouton: "agrandir",
    iconeSvg: agrandir,
    onClick: () =>alternerVisibilite(),
  },
  {
    idBouton: "voir",
    iconeSvg: voir,
    onClick: () =>alternerVisibilite(),
  },
  {
    idBouton: "modifier",
    iconeSvg: modifier,
    onClick: () =>alternerVisibilite(),
  },
]

export { controlesPersonnalises, boutonsImages};
