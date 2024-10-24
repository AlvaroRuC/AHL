document.getElementById('formulaireImages').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les valeurs du formulaire
    const commentaires = parseFloat(document.getElementById('imageCommentaires').value);

    // Créer un nouveau point GeoJSON avec les valeurs du formulaire
    let currentGeoJSON = map.getSource('geojson-source')._data;

      // Vérifier si un commentaire est présent et modifier la propriété "commentaires"
      if (commentaires) {
        currentGeoJSON.features[0].properties.commentaires = commentaires;
      }

      // Mettre à jour la source de données sur la carte
      map.getSource('images').setData(currentGeoJSON);
    });