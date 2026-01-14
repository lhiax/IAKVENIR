---
description: Vérifier l'état du projet (fichiers, Git, serveurs)
---

# Vérification du Projet

Ce workflow effectue une vérification complète de l'état du projet.

// turbo-all

## Étapes

### 1. Lister les fichiers principaux
```bash
ls -lah *.html *.css *.js 2>/dev/null || ls -lah
```

### 2. Vérifier le statut Git
```bash
git status
```

### 3. Voir les dernières modifications
```bash
git log -n 3 --oneline --decorate
```

### 4. Vérifier les branches
```bash
git branch -a
```

### 5. Vérifier si des serveurs tournent
```bash
lsof -i :8000 -i :3000 -i :8080 2>/dev/null || echo "Aucun serveur détecté sur les ports 8000, 3000, 8080"
```

### 6. Compter les lignes de code
```bash
find . -name "*.js" -o -name "*.html" -o -name "*.css" | grep -v node_modules | xargs wc -l 2>/dev/null | tail -1
```

## Notes

- Toutes les vérifications sont en lecture seule
- Aucune modification n'est effectuée
- Utile pour un diagnostic rapide du projet
