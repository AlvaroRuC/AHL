// Ça sert à marquer les points des photos quand on les selectionne.

// let hoveredPointId = null;

map.on('click', 'images-points', (e) => {

    // openSidebar('right'); // Pour l'instant j'enlève le sidebar

    //On récupère les infos de la couche geojson et on les stocke dans des constantes

    const imgLieu = e.features[0].properties.lieu;
    const imgChemin = e.features[0].properties.chemin;

    // Estas dos lineas funcionan.
    // const imgChemin = document.createElement("img");    
    // imgChemin.src = e.features[0].properties.chemin

    // On selectionne l'endroit pour l'injecter

    const lieuTexte = document.getElementById('lieu');
    const cheminImg = document.getElementById('chemin');
    // cheminImg.appendChild(imgChemin)

    // Check whether features exist
    if (e.features.length === 0) return;

    // On introduit dans les endroits voulus (constantes endroit) les infos vias les constantes (constantes infos)

    lieuTexte.textContent = imgLieu;
    // lieuTexte.appendChild(imgChemin)
    cheminImg.src = imgChemin;
})

