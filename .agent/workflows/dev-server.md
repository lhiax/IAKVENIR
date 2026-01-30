---
description: Démarrer le serveur de développement local
---

# Serveur de Développement

Ce workflow démarre le serveur Node.js/Express local pour tester le site avec toutes ses fonctionnalités (API, base de données).

// turbo-all

## Étapes

### 1. Vérifier si un serveur tourne déjà
```bash
lsof -i :3000
```

### 2. Démarrer le serveur local
```bash
npm start
```

### 3. Accéder au site
Ouvrir le navigateur à l'adresse : http://localhost:3000

## Notes

- Le serveur tournera sur le port 3000 (défini dans le fichier .env)
- Pour arrêter le serveur : Ctrl+C
- Ce mode permet de tester les fonctionnalités backend (réservations, calculs d'itinéraires, etc.) contrairement à une ouverture directe du fichier index.html.
