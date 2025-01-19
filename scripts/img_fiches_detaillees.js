function creerFicheImageDetaillee(proprietes) {
    const infos = obtenirInfosImage(proprietes);  // Récupère les informations communes

    // Supprimer la fiche existante, si elle existe
    const ficheDetailleeExistante = document.getElementById("fiche-img-selectionnee");
    if (ficheDetailleeExistante) {
        ficheDetailleeExistante.remove();  // Supprime l'ancienne fiche
    }

    // Création du conteneur principal de la fiche d'image détaillée
    const ficheDetaillee = document.createElement('div');
    ficheDetaillee.classList.add("fiche-img", "selectionnee");
    ficheDetaillee.setAttribute("image-id", proprietes.id_image);
    ficheDetaillee.id = "fiche-img-selectionnee";

    // Création d'un entête
    const Entete = document.createElement("div")
    Entete.classList.add("fiche-entete");
    ficheDetaillee.appendChild(Entete)

    // Titre
    const lieu = document.createElement('h3');
    lieu.textContent = infos.lieu;

    Entete.appendChild(lieu);

    // 1e ligne

    const corps = document.createElement('div');
    corps.classList.add('fiche-corps');
    ficheDetaillee.appendChild(corps);

    // Date

    const date = document.createElement('p');
    date.classList.add('donnees-fiche');

    date.textContent = infos.datesExtremes;

    corps.appendChild(date);

    // Boite de l'image
    const imageBoite = document.createElement("div");
    imageBoite.id = "image-boite";
    ficheDetaillee.appendChild(imageBoite);

    // Partie image
    const image = creerImage(infos); // Crée l'image
    imageBoite.appendChild(image);

    // Boutons

    const outils = document.createElement("div");
    outils.id = "boite-outils";
    ficheDetaillee.appendChild(outils)

    const boutonAgrandir = document.createElement("button");
    const boutonModifier = document.createElement("button");
    const boutonMontrer = document.createElement("button");

    boutonAgrandir.id = "bouton-agrandir";
    boutonModifier.id = "bouton-modifier";
    boutonMontrer.id = "bouton-montrer";

    boutonAgrandir.textContent = "Agrandir";
    boutonModifier.textContent = "Modifier";
    boutonMontrer.textContent = "Montrer";

    boutonAgrandir.classList.add("bouton")
    boutonModifier.classList.add("bouton")
    boutonMontrer.classList.add("bouton")

    outils.append(boutonAgrandir, boutonModifier, boutonMontrer);

    // Partie pour la cote-lien

    const cote = document.createElement('div');
    cote.classList.add('fiche-cote');
    imageBoite.appendChild(cote);

    cote.classList.add("donnees-ligne");

    const coteEtiquette = document.createElement('dt');
    coteEtiquette.textContent = 'Cote :';

    const coteContenu = document.createElement('dd');
    const coteLien = document.createElement("a");
    coteLien.href = `https://archivesenligne.limoges.fr/4DCGI/Web_VoirLaNotice/34_01/${infos.imageCoteGJS}/ILUMP830`;
    coteLien.target = "_blank";
    coteLien.textContent = infos.coteAML || "Aucune cote fournie";

    // Ajout de la cote avec le lien
    coteContenu.appendChild(coteLien);
    cote.appendChild(coteEtiquette);
    cote.appendChild(coteContenu);

    return ficheDetaillee;
}