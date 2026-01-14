---
description: Synchroniser les modifications avec Git (add, commit, push)
---

# Synchronisation Git

Ce workflow synchronise automatiquement vos modifications avec le dépôt Git.

// turbo-all

## Étapes

### 1. Vérifier le statut actuel
```bash
git status
```

### 2. Ajouter tous les fichiers modifiés
```bash
git add .
```

### 3. Créer un commit
```bash
git commit -m "Mise à jour automatique"
```

### 4. Pousser vers le dépôt distant
```bash
git push origin main
```

### 5. Vérifier que tout est synchronisé
```bash
git status
```

## Notes

- Toutes les commandes sont auto-exécutées grâce à `// turbo-all`
- Le message de commit par défaut est "Mise à jour automatique"
- Assurez-vous d'être sur la bonne branche avant d'exécuter
