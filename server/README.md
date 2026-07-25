# Service de vérification d'e-mail — FSRS

Petit serveur Node/Express qui envoie un code à 6 chiffres par e-mail et le
vérifie avant que la demande de licence (`views/inscription.html`) ne puisse
passer à l'étape de récapitulatif.

## Installation

```bash
cd server
npm install
```

## Configuration

```bash
cp .env.example .env
```

Renseignez ensuite vos identifiants SMTP dans `.env`.
Si `SMTP_HOST` reste vide, le serveur démarre en **mode développement** : les
codes ne sont pas envoyés par e-mail mais affichés directement dans la console.

## Démarrage

```bash
npm start        # ou : npm run dev  (redémarrage auto)
```

Le site est alors servi sur <http://localhost:3000> et la page d'inscription
sur <http://localhost:3000/views/inscription.html>.

## Endpoints

| Méthode | Route                    | Corps JSON              | Rôle                                  |
|---------|--------------------------|-------------------------|---------------------------------------|
| POST    | `/api/email/send-code`   | `{ email }`             | Génère et envoie un code (valide 10 min) |
| POST    | `/api/email/verify-code` | `{ email, code }`       | Vérifie le code saisi                 |
| GET     | `/api/health`            | —                       | État du serveur                       |

## Limites de sécurité

- Code valable **10 minutes**, à usage unique.
- **1 envoi par minute** maximum par adresse.
- **5 tentatives** de saisie maximum avant invalidation du code.
- Codes stockés en mémoire — pour un déploiement multi-instances, remplacer
  `codeStore` par Redis ou une base de données.
