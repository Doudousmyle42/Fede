// ════════════════════════════════════════════════════════════════
// Données partagées des résultats de compétition FSRS
// Utilisé par views/competition.html (onglet Résultats) et par les
// pages événement dédiées (ex : views/evenement-roller-course-2026.html).
//
// Les chemins `photo` sont relatifs à views/ (tous les fichiers
// consommateurs de ce tableau vivent dans ce dossier).
//
// `eventKey`  : identifiant partagé entre plusieurs entrées d'un même
//               événement (permet à une page événement de filtrer).
// `eventPage` : nom de fichier (dans views/) de la page dédiée à
//               l'événement, si elle existe — affiche un lien depuis
//               l'onglet Résultats de competition.html.
// ════════════════════════════════════════════════════════════════

window.FSRS_RESULTATS = [
    {
        titre:"Championnat National du Sénégal de Skateboard 2026",
        date:"Mai 2026",
        lieu:"Place des Cultures Urbaines, Dakar",
        categories:[
            {
                nom:"Street — Garçons",
                podiums:[
                    { pos:"1er",  medaille:"🥇", nom:"Thierno Souleyman Diallo", club:"Maestro Roller",   photo:"../img/resultat/Thierno Souleymane Diallo.jpeg" },
                    { pos:"2ème", medaille:"🥈", nom:"Pape Diop Sabaly",         club:"Massif",           photo:"../img/resultat/Pape Diop Sabaly.jpeg" },
                    { pos:"3ème", medaille:"🥉", nom:"Mouhamed Mbengue",         club:"Skate Park PCU",   photo:null },
                ]
            },
            {
                nom:"Street — Filles",
                podiums:[
                    { pos:"1ère", medaille:"🥇", nom:"Khady Kouta Ndiaye", club:"PIJ Rollers",            photo:"../img/resultat/Khady Kouta Ndiaye.jpeg" },
                    { pos:"2ème", medaille:"🥈", nom:"Awa Ngom",           club:"Crazy Raiders de Thiès", photo:null },
                    { pos:"3ème", medaille:"🥉", nom:"Sira Sabaly",        club:"Massif",                 photo:"../img/resultat/Sira Sabaly.jpeg" },
                ]
            },
            {
                nom:"Park — Garçons",
                podiums:[
                    { pos:"1er",  medaille:"🥇", nom:"Souleyman Diallo",   club:"Maestro Roller", photo:"../img/resultat/Thierno Souleymane Diallo.jpeg" },
                    { pos:"2ème", medaille:"🥈", nom:"Pape Diop Sabaly",   club:"Massif",         photo:"../img/resultat/Pape Diop Sabaly.jpeg" },
                    { pos:"3ème", medaille:"🥉", nom:"Latyr Diouf",        club:"PCU",            photo:"../img/resultat/latyr.jpeg" },
                ]
            },
            {
                nom:"Park — Filles",
                podiums:[
                    { pos:"1ère", medaille:"🥇", nom:"Khady Kouta Ndiaye", club:"PIJ Rollers", photo:"../img/resultat/Khady Kouta Ndiaye.jpeg" },
                    { pos:"2ème", medaille:"🥈", nom:"Sira Sabaly",        club:"Massif",      photo:"../img/resultat/Sira Sabaly.jpeg" },
                ]
            },
            {
                nom:"Street — Garçons (5 à 10 ans)",
                podiums:[
                    { pos:"1er",  medaille:"🥇", nom:"Mouhamed Travoré",        club:"Maestro Roller",        photo:"../img/resultat/MOUHAMED Traoré.jpeg" },
                    { pos:"2ème", medaille:"🥈", nom:"Mouhamedou Yoro Borelli", club:"Dak'Street Skateboard", photo:"../img/resultat/yoroborelli.jpeg" },
                    { pos:"3ème", medaille:"🥉", nom:"Mamadou Woury Diallo",    club:"PCU",                   photo:null },
                ]
            },
            {
                nom:"Street — Filles (5 à 10 ans)",
                podiums:[
                    { pos:"1ère", medaille:"🥇", nom:"Denysia Traoré", club:"Sébikhotane", photo:null },
                    { pos:"2ème", medaille:"🥈", nom:"LaLa Traoré",    club:"PCU",         photo:null },
                    { pos:"3ème", medaille:"🥉", nom:"Fatou Samb",     club:"PCU",         photo:null },
                ]
            },
        ]
    },
    {
        titre:"Championnat du Sénégal de Roller Course 2026 — Speed 200M",
        date:"25 Juillet 2026",
        eventKey:"roller-course-2026",
        eventPage:"evenement-roller-course-2026.html",
        categories:[
            {
                nom:"Mini Men",
                podiums:[
                    { pos:"1er",  medaille:"🥇", nom:"Mouhamadou Yoro Borelli", club:"Maestro Roller",  photo:null },
                    { pos:"2ème", medaille:"🥈", nom:"Moustapha Kane Fall",     club:"Crazy Rider",     photo:null },
                    { pos:"3ème", medaille:"🥉", nom:"Mouhamed Traoré",         club:"Skate Parc Pacu", photo:null },
                ]
            },
            {
                nom:"Mini Fille",
                podiums:[
                    { pos:"1ère", medaille:"🥇", nom:"Binta Fall",  club:"Crazy Rider",    photo:null },
                    { pos:"2ème", medaille:"🥈", nom:"Marie Dièye", club:"Maestro Roller", photo:null },
                    { pos:"3ème", medaille:"🥉", nom:"Lala Traoré", club:"Skate Parc PCU", photo:null },
                ]
            },
            {
                nom:"Cadet Fille",
                podiums:[
                    { pos:"1ère", medaille:"🥇", nom:"Denicia Traoré", club:"Sébikhotane Roller", photo:null },
                    { pos:"2ème", medaille:"🥈", nom:"Lala Traoré",    club:"Skate Parc PCU",     photo:null },
                    { pos:"3ème", medaille:"🥉", nom:"Khadija Mbaye",  club:"Maestro Roller",     photo:null },
                ]
            },
            {
                nom:"Cadet Men",
                podiums:[
                    { pos:"1er",  medaille:"🥇", nom:"Mouhamed Seck",      club:"Crazy Rider",    photo:null },
                    { pos:"2ème", medaille:"🥈", nom:"Mamadou Lamine Sow", club:"Kaolack Roller", photo:null },
                    { pos:"3ème", medaille:"🥉", nom:"Badara Diallo",      club:"Kaolack Roller", photo:null },
                ]
            },
            {
                nom:"Senior Men",
                podiums:[
                    { pos:"1er",  medaille:"🥇", nom:"Matar Diagne",    club:"Maestro Roller", photo:null },
                    { pos:"2ème", medaille:"🥈", nom:"Ousseynou Diène", club:"Massif Roller",  photo:null },
                    { pos:"3ème", medaille:"🥉", nom:"Alioune Diop",    club:"Dak'Street",     photo:null },
                ]
            },
        ]
    },
    {
        titre:"Championnat du Sénégal de Roller Course 2026 — 100M Road",
        date:"25 Juillet 2026",
        eventKey:"roller-course-2026",
        eventPage:"evenement-roller-course-2026.html",
        categories:[
            {
                nom:"Junior Men",
                podiums:[
                    { pos:"1er",  medaille:"🥇", nom:"Ibrahima Ba",     club:"Maestro Roller", photo:null },
                    { pos:"2ème", medaille:"🥈", nom:"Arona Sylla",     club:"Hard Rider",     photo:null },
                    { pos:"3ème", medaille:"🥉", nom:"Babacar Mbengue", club:"Crazy Rider",    photo:null },
                ]
            },
            {
                nom:"Senior Men",
                podiums:[
                    { pos:"1er",  medaille:"🥇", nom:"Bakary Kébé",  club:"Génération Skate", photo:null },
                    { pos:"2ème", medaille:"🥈", nom:"Arona Sy",     club:"Maestro Roller",   photo:null },
                    { pos:"3ème", medaille:"🥉", nom:"Alioune Diop", club:"Dak'Street",       photo:null },
                ]
            },
        ]
    },
    {
        titre:"Championnat du Sénégal de Roller Course 2026 — 500M",
        date:"25 Juillet 2026",
        eventKey:"roller-course-2026",
        eventPage:"evenement-roller-course-2026.html",
        categories:[
            {
                nom:"Cadet Fille",
                podiums:[
                    { pos:"1ère", medaille:"🥇", nom:"Lala Traoré",   club:"Skate Parc PCU", photo:null },
                    { pos:"2ème", medaille:"🥈", nom:"Khadija Mbaye", club:"Maestro Roller", photo:null },
                    { pos:"3ème", medaille:"🥉", nom:"Coumba Thiam",  club:"Skate Parc PCU", photo:null },
                ]
            },
            {
                nom:"Cadet Garçon",
                podiums:[
                    { pos:"1er",  medaille:"🥇", nom:"Samba Fall",    club:"Crazy Rider",    photo:null },
                    { pos:"2ème", medaille:"🥈", nom:"Badara Diallo", club:"Kaolack Roller", photo:null },
                    { pos:"3ème", medaille:"🥉", nom:"Assane Thiam",  club:"Kaolack Roller", photo:null },
                ]
            },
        ]
    },
    {
        titre:"Championnat du Sénégal de Roller Course 2026 — Marathon 42KM",
        date:"26 Juillet 2026",
        eventKey:"roller-course-2026",
        eventPage:"evenement-roller-course-2026.html",
        categories:[
            {
                nom:"Senior",
                podiums:[
                    { pos:"1er",  medaille:"🥇", nom:"Amadou Sané",     club:"Maestro Roller", photo:null, temps:"1:27:17" },
                    { pos:"2ème", medaille:"🥈", nom:"Baba Ciré Lo",    club:"Accro Roller",   photo:null, temps:"1:28:00" },
                    { pos:"3ème", medaille:"🥉", nom:"Ousseynou Diène", club:"Massif Roller",  photo:null, temps:"1:52:17" },
                ]
            },
            {
                nom:"Junior",
                podiums:[
                    { pos:"1er",  medaille:"🥇", nom:"Ibrahima Ba",    club:"Maestro Roller", photo:null, temps:"1:40:17" },
                    { pos:"2ème", medaille:"🥈", nom:"Omar Ngom",      club:"Kaolack Roller", photo:null, temps:"1:59:00" },
                    { pos:"3ème", medaille:"🥉", nom:"Moustapha Fall", club:"Maestro Roller", photo:null, temps:"2:02:17" },
                ]
            },
        ]
    },
];
