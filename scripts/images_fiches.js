//Pour la création de fiches descriptives des images

function creerFicheImage(proprietes) {

    //creation d'un containeur pour les fiches
    const ficheImage = document.createElement('div');
    ficheImage.classList.add('fiche-image');
    ficheImage.setAttribute('image-id', proprietes.id_image);

    const ficheImageImage = document.createElement("div");
    ficheImageImage.classList.add('fiche-image-image');
    ficheImage.appendChild(ficheImageImage);

    const imageImage = document.createElement('img');
    imageImage.src = "../donnees/" + proprietes.chemin;
    imageImage.alt = proprietes.lieu || 'Image';
    ficheImageImage.appendChild(imageImage);

    const ficheImageEtiquette = document.createElement("div");
    ficheImageEtiquette.classList.add('fiche-image-etiquette');
    ficheImage.appendChild(ficheImageEtiquette);

    const imageLieu = document.createElement("h3");
    imageLieu.textContent = proprietes.lieu || "Lieu inconnu";
    ficheImageEtiquette.appendChild(imageLieu);

    const imageDatesExtremes = document.createElement("time");
    const anneeInf = proprietes.date_inf ? proprietes.date_inf.split("-")[0] : null;
    const anneeSup = proprietes.date_sup ? proprietes.date_sup.split("-")[0] : null;

    // Agrandir
    const imageCote = proprietes.cote_aml;

    const imageLien = document.createElement("a");
    imageLien.href = `https://archivesenligne.limoges.fr/4DCGI/Web_DFPict/034/${imageCote}/ILUMP16014`;
    imageLien.target = "_blank";

    const agrandirImage = document.createElement("img");
    agrandirImage.src = "../ressources/icones/agrandir.png";
    agrandirImage.classList.add('image-icone');
    imageLien.appendChild(agrandirImage);

    // Ajouter le lien contenant l'image à l'élément parent (ficheImage)
    ficheImageImage.appendChild(imageLien);


    if (anneeInf && anneeSup) {
        imageDatesExtremes.textContent = anneeInf === anneeSup ? anneeInf : `${anneeInf}-${anneeSup}`;
    } else if (anneeSup) {
        imageDatesExtremes.textContent = `Avant ${anneeSup}`;
    } else if (anneeInf) {
        imageDatesExtremes.textContent = `Après ${anneeInf}`;
    } else {
        imageDatesExtremes.textContent = "Date inconnue";
    }

    ficheImageEtiquette.appendChild(imageDatesExtremes);

    return ficheImage;
}

// Pour l'image sélectionnée

function creerFicheImageDetaillee(proprietes) {
    // On prend la fiche basique
    const ficheImageDetaillee = creerFicheImage(proprietes);
    const ficheImageEtiquetteDetaillee = document.createElement('div');
    ficheImageEtiquetteDetaillee.classList.add('fiche-image-etiquette');

    // Cote des Archives municipales

    const cote = document.createElement("div")
    cote.classList.add("donnees-ligne")

    const coteEtiquette = document.createElement('dt');
    coteEtiquette.textContent = 'Cote AML :';

    const coteContenu = document.createElement('dd');

    const imageCoteGJS = proprietes.cote_aml; //Ça recupère la cote du geojson

    const coteLien = document.createElement("a");
    coteLien.href = `https://archivesenligne.limoges.fr/4DCGI/Web_VoirLaNotice/34_01/${imageCoteGJS}/ILUMP830`;
    coteLien.target = "_blank";
    coteLien.textContent = proprietes.cote_aml || "Aucune cote fournie";

    //Ajout des élements

    ficheImageDetaillee.appendChild(ficheImageEtiquetteDetaillee);

    ficheImageEtiquetteDetaillee.appendChild(cote)

    cote.appendChild(coteEtiquette);
    cote.appendChild(coteContenu);

    coteContenu.appendChild(coteLien);

    return ficheImageDetaillee;
}
