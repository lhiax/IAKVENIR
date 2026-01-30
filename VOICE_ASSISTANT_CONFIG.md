# 🎙️ Guide de Configuration - Assistant Vocal

## Obtenir les Clés API Gratuites

### 1. Grok API (xAI) - $25 + $150/mois gratuit
1. Visitez [console.x.ai](https://console.x.ai)
2. Créez un compte
3. Obtenez $25 de crédits gratuits
4. Optionnel : Activez le partage de données pour $150/mois supplémentaires
5. Copiez votre clé API (commence par `xai-`)

### 2. Groq API - 14,400 requêtes/jour gratuit
1. Visitez [console.groq.com](https://console.groq.com)
2. Créez un compte gratuit
3. Allez dans "API Keys"
4. Créez une nouvelle clé
5. Copiez votre clé API (commence par `gsk_`)

### 3. Google Gemini API - 1,000 requêtes/jour gratuit
1. Visitez [aistudio.google.com](https://aistudio.google.com)
2. Connectez-vous avec votre compte Google
3. Cliquez sur "Get API Key"
4. Créez une nouvelle clé
5. Copiez votre clé API (commence par `AIza`)

### 4. Hugging Face API - Gratuit
1. Visitez [huggingface.co](https://huggingface.co)
2. Créez un compte
3. Allez dans Settings → Access Tokens
4. Créez un nouveau token
5. Copiez votre token (commence par `hf_`)

## Configuration sur le Site

1. **Ouvrez le site** dans votre navigateur
2. **Cliquez sur l'icône d'engrenage** (⚙️) en bas à droite
3. **Collez vos clés API** dans les champs correspondants
4. Les clés sont sauvegardées localement dans votre navigateur

## Utilisation

### Activer l'Assistant
- Cliquez sur le **bouton micro** (🎤) en bas à droite
- Ou dites : **"Hey KITT"** ou **"Salut KITT"**

### Commandes Vocales
- Parlez naturellement après avoir activé l'assistant
- L'assistant comprend le français, l'anglais et l'allemand
- Il s'adapte automatiquement à votre langue

### Changer la Langue
1. Ouvrez les paramètres (⚙️)
2. Sélectionnez votre langue : 🇫🇷 Français / 🇬🇧 English / 🇩🇪 Deutsch

### Changer la Personnalité
1. Ouvrez les paramètres (⚙️)
2. Choisissez entre :
   - **KITT** : Voix masculine avec humour
   - **Féminine** : Voix féminine sophistiquée

## Fonctionnalités

✅ **Reconnaissance vocale** (Web Speech API)
✅ **Synthèse vocale** multilingue
✅ **4 fournisseurs IA** avec basculement automatique
✅ **Détection d'inactivité** (suggestions proactives après 2 min)
✅ **Adaptation contextuelle** (heure, ambiance musicale, activité)
✅ **2 personnalités** (KITT / Féminine)
✅ **3 langues** (FR/EN/DE)

## Dépannage

### L'assistant ne répond pas
- Vérifiez qu'au moins une clé API est configurée
- Vérifiez votre connexion internet
- Autorisez l'accès au microphone dans votre navigateur

### Le micro ne fonctionne pas
- Vérifiez les permissions du navigateur
- Utilisez Chrome, Edge ou Safari (meilleure compatibilité)
- Vérifiez que votre micro est activé

### Pas de voix
- Vérifiez le volume de votre système
- Certaines voix dépendent de votre système d'exploitation
- Essayez de changer de langue pour tester d'autres voix

## Limites Gratuites

| Fournisseur | Limite Quotidienne |
|-------------|-------------------|
| Grok | Basé sur crédits ($25 + $150/mois) |
| Groq | 14,400 requêtes/jour |
| Gemini | 1,000 requêtes/jour |
| Hugging Face | ~1,000 requêtes/jour |

Le système bascule automatiquement vers le prochain fournisseur si une limite est atteinte.
