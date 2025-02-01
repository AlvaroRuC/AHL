import { ControleCarte } from "./controle-carte.js";
import {} from "./actions-carte.js";
import "../composants/ahl-toggle-switch.js";

map.on("load", function () {
    // Création d'une instance de ControleCarte

    console.log(controleCarteParents);
    const bouton1 = new ControleCarte(
      "bouton1",
      "path/to/icone1.png",
      "Description de l'icône 1"
    );
    const bouton2 = new ControleCarte(
      "bouton2",
      "path/to/icone2.png",
      "Description de l'icône 2"
    );

    // Ajouter les boutons au DOM, dans un conteneur de la carte
    const controleCarteParents = document.getElementsByClassName(
      "maplibregl-ctrl-top-right"
    );
    const controleCarteParent = controleCarteParents[0];

    // Ajouter les boutons au conteneur parent
    controleCarteParent.appendChild(bouton1.getControle());
    controleCarteParent.appendChild(bouton2.getControle());

    // Ajouter un écouteur d'événement pour le bouton1
    bouton1.addEventListener("click", () => {
      console.log("Bouton 1 cliqué !");
    });
  });