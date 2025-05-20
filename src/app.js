import { ajouterControles, ControlesCarte } from "./carte/controles-carte.js";
import { ajouterLogos, Logos } from "./carte/logos-carte.js";

// import "./carte.js";
// import { activerBati3d } from "./actions-carte.js";
import "../composants/ahl-toggle-switch.js";

// Création de contrôles personnalisés

ajouterControles(map);
ajouterLogos(map)