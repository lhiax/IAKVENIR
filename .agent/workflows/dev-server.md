---
description: Démarrer le serveur de développement local
---

# Serveur de Développement

Ce workflow démarre un serveur HTTP local pour tester le site.

// turbo-all

## Étapes

### 1. Vérifier si un serveur tourne déjà
```bash
lsof -i :8000
```

### 2. Démarrer le serveur Python sur le port 8000
```bash
python3 -m http.server 8000
```

### 3. Accéder au site
Ouvrir le navigateur à l'adresse : http://localhost:8000

## Notes

- Le serveur tournera sur le port 8000
- Pour arrêter le serveur : Ctrl+C
- Les fichiers sont servis depuis le répertoire courant
