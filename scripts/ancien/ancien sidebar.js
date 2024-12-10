//Non utilisé

// Sidebar:

const imageSidebar = document.getElementById("imageImage")
const lieuSidebar = document.getElementById("imageLieu")
const datesSidebar = document.getElementById("imagesDates")
const imageNotice = document.getElementById("imageNotice")

map.on('click', 'images-points', (e) => {

    var imageChemin = '../ressources/images/' + e.features[0].properties.chemin;
    var imageLieu = e.features[0].properties.lieu;
    var imageCote = e.features[0].properties.cote_aml;

    var date_inf = e.features[0].properties.date_inf;
    var date_sup = e.features[0].properties.date_sup;

    var dateDebut = new Date(date_inf);
    var dateFin = new Date(date_sup);


    // Verifie si les dates sont valides

    function isValidDate(date) {
        return !isNaN(date.getTime());
    }

    var imageDates = '';

    if (!isValidDate(dateDebut) && !isValidDate(dateFin)) {
        imageDates = 'Date inconnue';
    } else if (isValidDate(dateDebut) && !isValidDate(dateFin)) {
        imageDates = 'Après ' + dateDebut.getFullYear();
    } else if (!isValidDate(dateDebut) && isValidDate(dateFin)) {
        imageDates = 'Avant ' + dateFin.getFullYear();
    } else if (isValidDate(dateDebut) && isValidDate(dateFin)) {
        imageDates = 'Entre ' + dateDebut.getFullYear() + ' et ' + dateFin.getFullYear();
    }

    var imageCommentaire = e.features[0].properties.comment;

    openSidebar('right');

    if (e.features.length === 0) return;

    var imageNotice = `
    <img class="sidebar-image" src="${imageChemin}">
        <a href="https://archivesenligne.limoges.fr/4DCGI/Web_VoirLaNotice/34_01/${imageCote}/${imageCote}/ILUMP16014" target="_blank"> Voir notice</a>
        <a href="https://archivesenligne.limoges.fr/4DCGI/Web_DFPict/034/${imageCote}/ILUMP16014" target="_blank"> Voir image</a>
        <h4>${imageLieu}</h4>
        <p>${imageDates}</p>
        <p>Archives Municipales de Limoges. Côte: ${imageCote}</p>

        <form id="formulaireImages">
            <label for="commentaires">Commentaires :</label>
            <input type="text" id="imageCommentaires" name="commentaires">
            <button type="submit">Sauvegarder</button>
        </form>

        <p id="dataStatus">Données actuelles: <span id="currentSource">Source initiale</span></p>
    `;

    document.getElementById('imageNotice').innerHTML = imageNotice

}
);



