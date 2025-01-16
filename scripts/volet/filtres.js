// Fonction pour normaliser les chaînes en ignorant les accents et la casse
function normaliserTexte(texte) {
    return texte.normalize('NFD')        // Sépare les caractères accentués de leur base
        .replace(/[\u0300-\u036f]/g, "") // Retire les accents
        .toLowerCase();          // Convertir en minuscules
}

// Variable globale pour stocker la valeur de la recherche
let rechercheActuelle = '';

// Écouteur d'événement pour le champ de recherche (filtrage en temps réel)
document.getElementById('recherche').addEventListener('input', function () {
    rechercheActuelle = document.getElementById('recherche').value;  // Stocke la valeur du champ de recherche
    afficherImagesVolet(rechercheActuelle);  // Passe la recherche à la fonction de filtrage
});