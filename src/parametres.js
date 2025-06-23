import {
  troisD,
  photographie,
  boucherie,
  agrandir,
  voir,
  modifier,
  criham,
  limoges,
  aml,
} from "../scripts/modules/icones.js";
import {
  alternerVisibilite,
  alternerImagesVolet,
} from "../scripts/modules/actions-carte.js";
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
    onClick: () => alternerVisibilite("boucherie"),
  },
];

const boutonsImages = [
  {
    idBouton: "agrandir",
    iconeSvg: agrandir,
    onClick: () => alternerVisibilite(),
  },
  {
    idBouton: "voir",
    iconeSvg: voir,
    onClick: () => alternerVisibilite(),
  },
  {
    idBouton: "modifier",
    iconeSvg: modifier,
    onClick: () => alternerVisibilite(),
  },
];

const logos = [
  {
    idLogo: "criham",
    iconePng: criham,
    urlLien: "https://www.unilim.fr/recherche/laboratoires/shs/criham/",
    onClick: () => alternerVisibilite(),
  },
  {
    idLogo: "limoges",
    iconePng: limoges,
    urlLien: "https://www.limoges.fr/",

    onClick: () => alternerVisibilite(),
  },
  {
    idLogo: "aml",
    iconePng: aml,
    urlLien: "https://archives.limoges.fr/",
    onClick: () => alternerVisibilite(),
  },
];

export { controlesPersonnalises, boutonsImages, logos };
