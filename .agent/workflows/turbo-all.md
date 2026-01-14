---
description: Mode Turbo - Auto-exécution de toutes les commandes courantes
---

# Mode Turbo All

Ce workflow active l'auto-exécution automatique pour toutes les commandes courantes du projet.

// turbo-all

## Commandes de Développement

### 1. Démarrer le serveur local
```bash
python3 -m http.server 8000
```

### 2. Vérifier le statut Git
```bash
git status
```

### 3. Voir les derniers commits
```bash
git log -n 5 --oneline
```

### 4. Voir les modifications non commitées
```bash
git diff
```

### 5. Lister les fichiers du projet
```bash
ls -lah
```

### 6. Vérifier les processus en cours
```bash
ps aux | grep -E "(python|http.server|node)" | grep -v grep
```

### 7. Vérifier les ports utilisés
```bash
lsof -i :8000 -i :3000 -i :8080
```

## Commandes Git (Auto-exécutées)

### 8. Ajouter tous les fichiers modifiés
```bash
git add .
```

### 9. Créer un commit avec message
```bash
git commit -m "Auto-commit via workflow turbo"
```

### 10. Pousser vers le dépôt distant
```bash
git push origin main
```

## Notes

- Toutes ces commandes seront auto-exécutées sans demander de confirmation
- Utilisez ce workflow avec précaution pour les commandes Git
- Pour désactiver l'auto-exécution, retirez l'annotation `// turbo-all`
