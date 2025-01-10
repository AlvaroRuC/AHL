// Création d'une Map pour stocker la correspondance entre les ID MapLibre et les ID personnalisés
const idMapping = new Map();

// Fonction pour ajouter une correspondance entre ID MapLibre et ID personnalisé
function addIdMapping(mapLibreId, customId) {
    idMapping.set(mapLibreId, customId);
}

// Fonction pour convertir un ID MapLibre en un ID personnalisé
function mapLibreIdToCustomId(mapLibreId) {
    return idMapping.get(mapLibreId) || null; // Retourne l'ID personnalisé ou null si non trouvé
}

// Fonction pour convertir un ID personnalisé en un ID MapLibre
function customIdToMapLibreId(customId) {
    for (let [mapLibreId, id] of idMapping) {
        if (id === customId) {
            return mapLibreId; // Retourne l'ID MapLibre correspondant
        }
    }
    return null; // Retourne null si non trouvé
}

// Fonction pour peupler la Map avec des correspondances entre ID MapLibre et id_image
function populateIdMapping() {
    // On récupère les features de la couche 'images'
    const features = map.querySourceFeatures('images');

    // On parcourt les features et on ajoute les correspondances dans la Map
    features.forEach(feature => {
        const mapLibreId = feature.id; // L'ID généré par MapLibre
        const customId = feature.properties.id_image; // Ton ID personnalisé (id_image)
        addIdMapping(mapLibreId, customId); // Ajouter la correspondance dans la Map
    });
}