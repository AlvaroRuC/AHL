function obtenirInfosImage(proprietes) {
    // Cette fonction va extraire et formater toutes les informations nécessaires.
    const anneeInf = proprietes.date_inf ? proprietes.date_inf.split("-")[0] : null;
    const anneeSup = proprietes.date_sup ? proprietes.date_sup.split("-")[0] : null;

    // Format de la plage de dates
    const datesExtremes = (anneeInf && anneeSup) ?
                          (anneeInf === anneeSup ? anneeInf : `${anneeInf}-${anneeSup}`) :
                          (anneeSup ? `Avant ${anneeSup}` : (anneeInf ? `Après ${anneeInf}` : "Date inconnue"));

    // Construction de l'objet d'informations de base
    return {
        chemin: "../donnees/" + proprietes.chemin,
        lieu: proprietes.lieu || 'Lieu inconnu',
        datesExtremes: datesExtremes,
        coteAML: proprietes.cote_aml,
        imageCoteGJS: proprietes.cote_aml, // Même cote pour le GeoJSON
    };
}
function creerFicheImage(proprietes) {
    const infos = obtenirInfosImage(proprietes);  // On récupère les infos de l'image

    // Création du conteneur de la fiche d'image
    const ficheImage = document.createElement('div');
    ficheImage.classList.add('fiche-img');
    ficheImage.setAttribute('image-id', proprietes.id_image);

    // Partie image

    const imageImage = document.createElement('img');
    imageImage.src = infos.chemin;  // Utilisation du chemin obtenu
    imageImage.alt = infos.lieu;  // Utilisation du lieu obtenu
    imageImage.classList.add('photographie')

    // Partie étiquette
    const ficheImageEtiquette = document.createElement("div");
    ficheImageEtiquette.classList.add('fiche-img-etiquette');

    const imageLieu = document.createElement("h4");
    imageLieu.textContent = infos.lieu;

    const imageDatesExtremes = document.createElement("time");
    imageDatesExtremes.textContent = infos.datesExtremes;  // Utilisation des dates formatées

    // Lien pour agrandir l'image
    const imageLien = document.createElement("a");
    imageLien.href = `https://archivesenligne.limoges.fr/4DCGI/Web_DFPict/034/${infos.coteAML}/ILUMP16014`;
    imageLien.target = "_blank";

    const agrandirImage = document.createElement("img");
    agrandirImage.src = "../ressources/icones/agrandir.png";
    agrandirImage.classList.add('image-icone');

    // Construction de la fiche d'image basique
    ficheImage.appendChild(imageImage);
    ficheImage.appendChild(imageLien);
    imageLien.appendChild(agrandirImage);
    ficheImage.appendChild(ficheImageEtiquette);
    ficheImageEtiquette.appendChild(imageLieu);
    ficheImageEtiquette.appendChild(imageDatesExtremes);

    return ficheImage;
}
function creerFicheImageDetaillee(proprietes) {
    const infos = obtenirInfosImage(proprietes);  // Récupère les informations communes

    // On commence par créer la fiche basique
    const ficheImageDetaillee = creerFicheImage(proprietes);  // Utilisation de la fonction de la fiche basique

    // Création de la section détaillée (Cote des Archives)
    const ficheImageEtiquetteDetaillee = document.createElement('div');
    ficheImageEtiquetteDetaillee.classList.add('fiche-img-etiquette');

    const cote = document.createElement("div");
    cote.classList.add("donnees-ligne");

    const coteEtiquette = document.createElement('dt');
    coteEtiquette.textContent = 'Cote AML :';

    const coteContenu = document.createElement('dd');

    const coteLien = document.createElement("a");
    coteLien.href = `https://archivesenligne.limoges.fr/4DCGI/Web_VoirLaNotice/34_01/${infos.imageCoteGJS}/ILUMP830`;
    coteLien.target = "_blank";
    coteLien.textContent = infos.coteAML || "Aucune cote fournie";

    // Construction de la fiche détaillée
    ficheImageDetaillee.appendChild(ficheImageEtiquetteDetaillee);
    ficheImageEtiquetteDetaillee.appendChild(cote);
    cote.appendChild(coteEtiquette);
    cote.appendChild(coteContenu);
    coteContenu.appendChild(coteLien);

    return ficheImageDetaillee;
}
