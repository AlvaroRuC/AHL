function alternerVisibilite(LayerId) {
  const currentVisibility = map.getLayoutProperty(LayerId, "visibility");

  if (currentVisibility === "visible") {
    map.setLayoutProperty(LayerId, "visibility", "none");
  } else {
    map.setLayoutProperty(LayerId, "visibility", "visible");
  }
}

// Gestion du bouton pour afficher/masquer le volet

function alternerImagesVolet() {
  const volet = document.getElementById("volet");
  if (volet.classList.contains("plie")) {
    map.setLayoutProperty("images-points", "visibility", "none");
  } else {
    map.setLayoutProperty("images-points", "visibility", "visible");
    gererImagesVolet();
  }
}

export { alternerVisibilite, alternerImagesVolet };