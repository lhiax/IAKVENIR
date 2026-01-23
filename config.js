// API Configuration for Artist Recognition
// IMPORTANT: Ne pas commiter ce fichier sur GitHub (ajouter à .gitignore)

const API_CONFIG = {
    // Google Cloud Vision API (pour reconnaissance d'artistes)
    // Créer clé sur: https://console.cloud.google.com/apis/credentials
    googleVision: {
        enabled: false, // Désactivé - utilisation des légendes manuelles
        apiKey: 'AIzaSyBDuGjWRmqWD57lsjp9uziWKuY0MuXTRgs',
        endpoint: 'https://vision.googleapis.com/v1/images:annotate'
    },

    // YouTube Data API v3 (pour recherche de musique)
    // Créer clé sur: https://console.cloud.google.com/apis/credentials
    youtube: {
        apiKey: 'AIzaSyBDuGjWRmqWD57lsjp9uziWKuY0MuXTRgs',
        searchEndpoint: 'https://www.googleapis.com/youtube/v3/search'
    }
};

// Export pour utilisation dans main.js
if (typeof window !== 'undefined') {
    window.API_CONFIG = API_CONFIG;
}
