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
        slug: 'championnat-national-dakar',
        imgFile: 'WhatsApp Image 2026-05-03 at 16.49.24.jpeg',
        categorie: 'Compétition',
        date: '24 Avril 2026',
        auteur: 'FSRS',
        titre: 'Grande affluence au Championnat National de Dakar',
        excerpt: "La FSRS a organisé avec succès son championnat national annuel devant un public record. Athlètes, clubs et officiels ont fait vivre une édition mémorable marquée par un niveau sportif en nette progression.",
        featured: true
    },
    {
        slug: 'podium-national-roller',
        imgFile: 'WhatsApp Image 2026-05-03 at 16.49.25.jpeg',
        categorie: 'Résultats',
        date: '23 Avril 2026',
        auteur: 'FSRS',
        titre: 'Podium national : les nouveaux visages du roller sénégalais',
        excerpt: "Retour sur les temps forts et les performances marquantes des athlètes qui ont dominé la dernière étape du circuit FSRS."
    },
    {
        slug: 'ouverture-saison-2026',
        imgFile: 'WhatsApp Image 2026-05-03 at 16.49.26.jpeg',
        categorie: 'Compétition',
        date: '15 Mai 2026',
        dateEvent: '2026-05-15',
        auteur: 'FSRS',
        titre: 'Ouverture officielle de la saison compétitive 2026',
        excerpt: "Le coup d'envoi de la saison 2026 sera donné en présence des représentants du ministère des Sports et des clubs affiliés."
    },
    {
        slug: 'selection-nationale-africaine',
        imgFile: 'WhatsApp Image 2026-05-03 at 16.49.27.jpeg',
        categorie: 'International',
        date: '10 Juin 2026',
        dateEvent: '2026-06-10',
        auteur: 'FSRS',
        titre: 'La sélection nationale en préparation pour la compétition africaine',
        excerpt: "Nos athlètes intensifient leur préparation en vue du prochain rendez-vous continental. Un stage de perfectionnement est prévu à Dakar."
    },
    {
        slug: 'stage-encadrement-entraineurs',
        imgFile: 'WhatsApp Image 2026-05-03 at 16.49.28.jpeg',
        categorie: 'Formation',
        date: '25 Mai 2026',
        dateEvent: '2026-05-25',
        auteur: 'FSRS',
        titre: "Stage d'encadrement technique pour les entraîneurs",
        excerpt: "La fédération organise un séminaire de formation destiné aux entraîneurs de clubs afin d'harmoniser les méthodes d'encadrement."
    }
];

// Retourne les actualités encore valides (dateEvent + 24h >= maintenant).
// basePath : chemin relatif vers img/compet2/ depuis la page appelante.
window.FSRS_getActiveActualites = function(basePath) {
    const now = Date.now();
    const grace = 24 * 60 * 60 * 1000;
    return window.FSRS_ACTUALITES
        .filter(n => {
            if (!n.dateEvent) return true;
            const evt = new Date(n.dateEvent).getTime();
            return (evt + grace) >= now;
        })
        .map(n => Object.assign({}, n, {
            img: (basePath || '') + n.imgFile
        }));
};
