// ════════════════════════════════════════════════════════════════
// Données partagées des actualités FSRS
// Utilisé par index.html (carrousel) et views/competition.html (onglet Actualités)
//
// Règle : un article est automatiquement retiré 24h après sa `dateEvent`.
// `dateEvent` doit être au format ISO "YYYY-MM-DD".
// → Pour une annonce d'événement à venir : remplir `dateEvent`
// → Pour une rétrospective / actualité permanente : OMETTRE `dateEvent`
// Les images sont stockées dans img/compte3/ — le champ `imgFile` ne contient
// que le nom de fichier ; chaque page préfixe avec son chemin relatif.
// ════════════════════════════════════════════════════════════════

window.FSRS_ACTUALITES = [
    {
        slug: 'roller-course-2026',
        imgPath: 'img/resultat2/resultat_compet_2026/WhatsApp Image 2026-08-24 at 14.26.41.jpeg',
        categorie: 'Compétition',
        date: '25-26 Juillet 2026',
        auteur: 'FSRS',
        titre: 'Championnat du Sénégal de Roller Course 2026 : Dakar a vibré au rythme de la vitesse',
        excerpt: "Les 25 et 26 juillet 2026, Dakar a accueilli le Championnat National du Sénégal de Roller Course 2026 — Speed 200M, 100M Road, 500M et Marathon 42KM. Retour sur une édition spectaculaire.",
        url: 'evenement-roller-course-2026.html',
        featured: true
    },
    {
        slug: 'resultats-speed-roller-course-2026',
        imgPath: 'img/resultat2/resultat_compet_2026/WhatsApp Image 2026-08-24 at 14.26.42.jpeg',
        categorie: 'Résultats',
        date: '25 Juillet 2026',
        auteur: 'FSRS',
        titre: 'Roller Course 2026 : les champions du Speed 200M, du 100M Road et du 500M',
        excerpt: "Mouhamadou Yoro Borelli, Ibrahima Ba, Bakary Kébé, Samba Fall… retour sur les podiums du Speed 200M, du 100M Road et du 500M lors du Championnat du Sénégal de Roller Course 2026.",
        url: 'evenement-roller-course-2026.html'
    },
    {
        slug: 'marathon-42km-roller-course-2026',
        imgPath: 'img/resultat2/resultat_compet_2026/WhatsApp Image 2026-08-24 at 14.26.42 (1).jpeg',
        categorie: 'Résultats',
        date: '26 Juillet 2026',
        auteur: 'FSRS',
        titre: 'Marathon 42KM : Amadou Sané et Ibrahima Ba sacrés au Roller Course 2026',
        excerpt: "Amadou Sané (Maestro Roller) s'impose en Senior avec un chrono de 1:27:17, tandis qu'Ibrahima Ba domine la catégorie Junior en 1:40:17 lors du Marathon 42KM du Championnat du Sénégal de Roller Course 2026.",
        url: 'evenement-roller-course-2026.html'
    }
];

// Retourne les actualités encore valides (dateEvent + 24h >= maintenant).
// basePath : chemin relatif vers img/compte3/ depuis la page appelante.
// rootBase : chemin relatif vers la racine du site depuis la page appelante
//            ('' pour index.html, '../' pour les pages de views/) — utilisé
//            pour les entrées qui fournissent `imgPath` (chemin complet
//            depuis la racine) plutôt que `imgFile`.
window.FSRS_getActiveActualites = function(basePath, rootBase) {
    const now = Date.now();
    const grace = 24 * 60 * 60 * 1000;
    return window.FSRS_ACTUALITES
        .filter(n => {
            if (!n.dateEvent) return true;
            const evt = new Date(n.dateEvent).getTime();
            return (evt + grace) >= now;
        })
        .map(n => Object.assign({}, n, {
            img: n.imgPath ? (rootBase || '') + n.imgPath : (basePath || '') + n.imgFile
        }));
};
