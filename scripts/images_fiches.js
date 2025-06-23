// Cette fonction extrait et formate toutes les informations de la fiche
function obtenirInfosImage(proprietes) {

    // Pour les dates
    const anneeInf = proprietes.date_inf ? proprietes.date_inf.split("-")[0] : null;
    const anneeSup = proprietes.date_sup ? proprietes.date_sup.split("-")[0] : null;

    // Format de la plage de dates
    const datesExtremes = (anneeInf && anneeSup) ?
        (anneeInf === anneeSup ? anneeInf : `${anneeInf}-${anneeSup}`) :
        (anneeSup ? `Avant ${anneeSup}` : (anneeInf ? `Après ${anneeInf}` : "Date inconnue"));

    // Construction de l'objet d'informations de base
    return {
        chemin: "./donnees/" + proprietes.chemin,
        lieu: proprietes.lieu || 'Lieu inconnu',
        datesExtremes: datesExtremes,
        coteAML: proprietes.cote_aml,
        imageCoteGJS: proprietes.cote_aml, // Même cote pour le GeoJSON
    };
}

// Fonction pour créer l'image
function creerImage(infos) {
    const image = document.createElement('img');
    image.src = infos.chemin;
    image.alt = infos.lieu;
    image.classList.add('photographie');
    image.loading = "lazy";
    return image;
}

// Fonction pour créer l'étiquette
function creerEtiquette(infos) {
    const etiquette = document.createElement('div');
    etiquette.classList.add('fiche-img-etiquette');

    const lieu = document.createElement("h4");
    lieu.textContent = infos.lieu;

    const datesExtremes = document.createElement("time");
    datesExtremes.textContent = infos.datesExtremes;

    etiquette.appendChild(lieu);
    etiquette.appendChild(datesExtremes);
    return etiquette;
}

// Fonction pour créer le lien d'agrandissement
function creerLienAgrandissement(infos) {
    const lien = document.createElement("a");
    lien.href = `https://archivesenligne.limoges.fr/4DCGI/Web_DFPict/034/${infos.coteAML}/ILUMP16014`;
    lien.target = "_blank";
    lien.classList.add('image-bouton');

    const iconeAgrandir = document.createElement("img");
    iconeAgrandir.src = "./ressources/icones/agrandir.png";
    iconeAgrandir.classList.add('image-icone');

    lien.appendChild(iconeAgrandir);
    return lien;
}

function creerFicheImage(proprietes, ordre = ['image', 'etiquette', 'lien']) {
    const infos = obtenirInfosImage(proprietes);  // On récupère les infos de l'image

    // Création du conteneur de la fiche d'image
    const ficheImage = document.createElement('div');
    ficheImage.classList.add('fiche');
    ficheImage.setAttribute('image-id', proprietes.id_image);

    // Créer les éléments de la fiche en fonction de l'ordre spécifié
    ordre.forEach(partie => {
        switch (partie) {
            case 'image':
                ficheImage.appendChild(creerImage(infos)); // Ajouter l'image
                break;
            case 'etiquette':
                ficheImage.appendChild(creerEtiquette(infos)); // Ajouter l'étiquette
                break;
            case 'lien':
                ficheImage.appendChild(creerLienAgrandissement(infos)); // Ajouter le lien d'agrandissement
                break;
            default:
                console.warn(`Partie inconnue : ${partie}`);
        }
    });

    return ficheImage;
}