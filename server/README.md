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

| Méthode | Route                    | Corps JSON                  | Rôle                                  |
|---------|--------------------------|------------------------------|---------------------------------------|
| POST    | `/api/email/send-code`   | `{ email }`                 | Génère et envoie un code (valide 10 min) |
| POST    | `/api/email/verify-code` | `{ email, code }`           | Vérifie le code saisi, renvoie un `token` d'e-mail vérifié (valide 30 min) |
| POST    | `/api/licence/next`      | `{ profile, email, token }` | Attribue le numéro de licence suivant, par ordre d'arrivée |
| GET     | `/api/health`            | —                            | État du serveur                       |

## Limites de sécurité

- Code valable **10 minutes**, à usage unique.
- **1 envoi par minute** maximum par adresse.
- **5 tentatives** de saisie maximum avant invalidation du code.
- Codes stockés en mémoire — pour un déploiement multi-instances, remplacer
  `codeStore` par Redis ou une base de données.
- `/api/licence/next` exige un `token` valide obtenu via `/api/email/verify-code` :
  un numéro de licence ne peut donc être délivré qu'à une adresse e-mail
  effectivement vérifiée. Le jeton est à usage unique (consommé dès l'appel)
  et expire après 30 minutes.

## Numérotation des licences

Les numéros sont attribués **dans l'ordre réel d'arrivée des demandes**, via un
compteur continu par profil (jamais réinitialisé) persisté dans
`server/data/licence-counters.json` (créé automatiquement au premier
démarrage) :

- Comité Directeur : `SN-01`, `SN-02`, …
- Staff Technique : `S-SN001`, `S-SN002`, …
- Athlète : `A-SN001`, `A-SN002`, …
