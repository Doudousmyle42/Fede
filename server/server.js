/* ============================================================
   FSRS — Service de verification d'e-mail
   Envoie un code a 6 chiffres et le verifie avant que la
   demande de licence ne puisse passer a l'etape suivante.
   ============================================================ */

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const path       = require('path');
const crypto     = require('crypto');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Sert le site statique (le dossier parent de /server) pour que
// la page d'inscription et l'API soient sur la meme origine.
app.use(express.static(path.join(__dirname, '..')));

/* ───────────── Stockage des codes (en memoire) ─────────────
   Map: email -> { code, expiresAt, attempts, lastSentAt }
   En production multi-instances, remplacer par Redis.            */
const codeStore = new Map();

const CODE_TTL_MS        = 10 * 60 * 1000; // validite du code : 10 min
const RESEND_COOLDOWN_MS = 60 * 1000;      // delai mini entre 2 envois
const MAX_ATTEMPTS       = 5;              // essais avant blocage du code

// Purge periodique des codes expires
setInterval(() => {
    const now = Date.now();
    for (const [email, entry] of codeStore) {
        if (entry.expiresAt < now) codeStore.delete(email);
    }
}, 5 * 60 * 1000).unref();

/* ───────────── Transport e-mail (nodemailer) ───────────── */
let transporter = null;

function getTransporter() {
    if (transporter) return transporter;
    if (!process.env.SMTP_HOST) return null; // mode dev : pas de SMTP
    transporter = nodemailer.createTransport({
        host:   process.env.SMTP_HOST,
        port:   Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true', // true pour le port 465
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    return transporter;
}

/* ───────────── Utilitaires ───────────── */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
}

function generateCode() {
    // Code a 6 chiffres, genere de maniere cryptographiquement sure
    return String(crypto.randomInt(0, 1_000_000)).padStart(6, '0');
}

function buildEmailHtml(code) {
    return `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:480px;margin:0 auto;border:1px solid #e2e8e4;border-radius:14px;overflow:hidden">
      <div style="background:linear-gradient(135deg,#1a4d2e,#2E8B57);padding:24px;text-align:center">
        <h1 style="color:#FFD700;margin:0;font-size:18px;letter-spacing:.04em">FÉDÉRATION SÉNÉGALAISE DE ROLLER &amp; SKATEBOARD</h1>
      </div>
      <div style="padding:28px 26px;color:#1f2d26">
        <p style="margin:0 0 14px;font-size:15px">Bonjour,</p>
        <p style="margin:0 0 20px;font-size:15px;line-height:1.6">
          Voici votre code de vérification pour finaliser votre demande de licence FSRS&nbsp;:
        </p>
        <div style="text-align:center;margin:22px 0">
          <span style="display:inline-block;font-size:34px;font-weight:bold;letter-spacing:10px;color:#1a4d2e;background:#E8F4ED;border:2px dashed #2E8B57;border-radius:12px;padding:14px 22px">
            ${code}
          </span>
        </div>
        <p style="margin:0 0 8px;font-size:13px;color:#5b6b62">
          Ce code est valable <strong>10 minutes</strong>. Ne le communiquez à personne.
        </p>
        <p style="margin:0;font-size:13px;color:#5b6b62">
          Si vous n'êtes pas à l'origine de cette demande, ignorez simplement cet e-mail.
        </p>
      </div>
      <div style="background:#0d2b1e;padding:14px;text-align:center;color:rgba(255,255,255,.7);font-size:11px">
        FSRS — Immeuble Georges Lahoud, Zone B, Dakar · +221 33 812 64 24
      </div>
    </div>`;
}

/* ───────────── Routes ───────────── */

// Envoi (ou renvoi) d'un code de verification
app.post('/api/email/send-code', async (req, res) => {
    const email = normalizeEmail(req.body.email);

    if (!EMAIL_RE.test(email)) {
        return res.status(400).json({ ok: false, error: 'Adresse e-mail invalide.' });
    }

    // Anti-spam : un envoi par minute maximum
    const existing = codeStore.get(email);
    if (existing && Date.now() - existing.lastSentAt < RESEND_COOLDOWN_MS) {
        const wait = Math.ceil((RESEND_COOLDOWN_MS - (Date.now() - existing.lastSentAt)) / 1000);
        return res.status(429).json({
            ok: false,
            error: `Merci de patienter ${wait}s avant de demander un nouveau code.`,
            retryAfter: wait
        });
    }

    const code = generateCode();
    codeStore.set(email, {
        code,
        expiresAt:  Date.now() + CODE_TTL_MS,
        attempts:   0,
        lastSentAt: Date.now()
    });

    const tx = getTransporter();

    // Mode developpement : aucun SMTP configure -> code affiche dans la console
    if (!tx) {
        console.log(`\n  [DEV] Code de vérification pour ${email} : ${code}\n`);
        return res.json({
            ok: true,
            devMode: true,
            message: 'SMTP non configuré — le code est affiché dans la console du serveur.'
        });
    }

    try {
        await tx.sendMail({
            from:    process.env.MAIL_FROM || '"FSRS" <secretariat@fsrollerskate.com>',
            to:      email,
            subject: 'Votre code de vérification — Licence FSRS',
            text:    `Votre code de vérification FSRS est : ${code}\nIl est valable 10 minutes.`,
            html:    buildEmailHtml(code)
        });
        res.json({ ok: true });
    } catch (err) {
        console.error('Erreur envoi e-mail :', err.message);
        codeStore.delete(email);
        res.status(502).json({
            ok: false,
            error: "L'e-mail n'a pas pu être envoyé. Vérifiez l'adresse ou réessayez plus tard."
        });
    }
});

// Verification du code saisi
app.post('/api/email/verify-code', (req, res) => {
    const email = normalizeEmail(req.body.email);
    const code  = String(req.body.code || '').trim();

    const entry = codeStore.get(email);
    if (!entry) {
        return res.status(400).json({ ok: false, error: 'Aucun code en attente. Demandez un nouveau code.' });
    }
    if (entry.expiresAt < Date.now()) {
        codeStore.delete(email);
        return res.status(400).json({ ok: false, error: 'Code expiré. Demandez un nouveau code.' });
    }
    if (entry.attempts >= MAX_ATTEMPTS) {
        codeStore.delete(email);
        return res.status(429).json({ ok: false, error: 'Trop de tentatives. Demandez un nouveau code.' });
    }

    entry.attempts++;

    if (entry.code !== code) {
        const left = MAX_ATTEMPTS - entry.attempts;
        return res.status(400).json({
            ok: false,
            error: left > 0
                ? `Code incorrect. ${left} tentative(s) restante(s).`
                : 'Code incorrect. Demandez un nouveau code.'
        });
    }

    // Succes : le code est consomme
    codeStore.delete(email);
    res.json({ ok: true, message: 'Adresse e-mail vérifiée.' });
});

// Verification de l'etat du serveur
app.get('/api/health', (req, res) => {
    res.json({ ok: true, smtp: !!process.env.SMTP_HOST });
});

app.listen(PORT, () => {
    console.log(`✓ Serveur FSRS démarré : http://localhost:${PORT}`);
    console.log(`  Page d'inscription   : http://localhost:${PORT}/views/inscription.html`);
    if (!process.env.SMTP_HOST) {
        console.log('⚠  SMTP non configuré — mode développement : les codes s\'affichent ici.');
    }
});
