// clubs.js - Script pour la page clubs avec carte interactive et filtres

document.addEventListener('DOMContentLoaded', function() {
    console.log('✓ clubs.js chargé');

    // ===== INITIALISATION DE LA CARTE LEAFLET =====
    try {
        // Coordonnées du centre du Sénégal (Dakar)
        const map = L.map('map').setView([14.6928, -17.4467], 9);

        // Ajouter la couche de tuiles OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 18,
        }).addTo(map);

        // Données des clubs avec leurs coordonnées
        const clubsData = [
            {
                name: 'Afro Dance Roller',
                lat: 14.6937,
                lng: -17.4441,
                city: 'Dakar',
                members: 40,
                type: 'roller',
                phone: '+221 78 736 78 05',
                email: 'afrodanceroller@gmail.com'
            },
            {
                name: 'Maestro Roller',
                lat: 14.7167,
                lng: -17.4677,
                city: 'Dakar',
                members: 300,
                type: 'mixed',
                phone: '+221 77 648 34 35',
                email: 'hawanarfall@gmail.com'
            },
            {
                name: 'Génération Skate',
                lat: 14.6792,
                lng: -17.4346,
                city: 'Dakar',
                members: 50,
                type: 'skate',
                phone: '+221 78 460 14 14',
                email: 'Syllaablaye58@gmail.com'
            },
            {
                name: 'PIJ Rollers',
                lat: 14.7089,
                lng: -17.4692,
                city: 'Dakar',
                members: 102,
                type: 'mixed',
                phone: '+221 77 887 66 99',
                email: 'pijrollers@gmail.com'
            },
            {
                name: "Dak'Street Skateboard",
                lat: 14.6858,
                lng: -17.4536,
                city: 'Dakar',
                members: 32,
                type: 'skate',
                phone: '+221 77 551 61 87',
                email: 'yorosadio@gmail.com'
            },
            {
                name: 'Newstyle Roller',
                lat: 14.7886,
                lng: -16.9317,
                city: 'Thiès',
                members: 46,
                type: 'roller',
                phone: '+221 76 814 09 15',
                email: 'rollernewstyle@gmail.com'
            },
            {
                name: 'Hard Riders',
                lat: 14.3963,
                lng: -16.9619,
                city: 'Mbour',
                members: 50,
                type: 'roller',
                phone: '+221 77 699 71 97',
                email: 'Papy10.loup@gmail.com'
            },
            {
                name: 'Crash Roller',
                lat: 14.3963,
                lng: -16.9719,
                city: 'Mbour',
                members: 50,
                type: 'mixed',
                phone: '+221 77 429 34 72',
                email: 'thiambabel25@gmail.com'
            },
            {
                name: 'Casa Roller',
                lat: 12.5833,
                lng: -16.2667,
                city: 'Ziguinchor',
                members: 50,
                type: 'roller',
                phone: '+221 77 050 50 92',
                email: 'CASAROLLER234@GMAIL.com'
            },
            {
                name: 'King Roller',
                lat: 14.6522,
                lng: -16.2317,
                city: 'Diourbel',
                members: 15,
                type: 'roller',
                phone: '+221 77 686 75 69',
                email: 'Diopbamba139@gmail.com'
            },
            {
                name: 'Tahiti Roller',
                lat: 14.7547,
                lng: -17.3914,
                city: 'Pikine',
                members: 50,
                type: 'mixed',
                phone: '+221 77 260 44 86',
                email: 'moussasy0@gmail.com'
            }
        ];

        // Icônes personnalisées selon le type
        const icons = {
            roller: L.divIcon({
                html: '<div style="background-color: #2E8B57; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
                className: 'custom-marker',
                iconSize: [20, 20]
            }),
            skate: L.divIcon({
                html: '<div style="background-color: #FFD700; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
                className: 'custom-marker',
                iconSize: [20, 20]
            }),
            mixed: L.divIcon({
                html: '<div style="background: linear-gradient(135deg, #FFD700 50%, #2E8B57 50%); width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
                className: 'custom-marker',
                iconSize: [20, 20]
            })
        };

        // Ajouter les marqueurs pour chaque club
        clubsData.forEach(club => {
            const marker = L.marker([club.lat, club.lng], {
                icon: icons[club.type]
            }).addTo(map);

            // Popup avec informations du club
            marker.bindPopup(`
                <div style="font-family: 'Montserrat', sans-serif; min-width: 200px;">
                    <h3 style="margin: 0 0 10px 0; color: #2E8B57; font-size: 16px;">${club.name}</h3>
                    <p style="margin: 5px 0; font-size: 14px;"><strong>📍</strong> ${club.city}</p>
                    <p style="margin: 5px 0; font-size: 14px;"><strong>👥</strong> ${club.members} membres</p>
                    <p style="margin: 5px 0; font-size: 14px;"><strong>📞</strong> ${club.phone}</p>
                    <p style="margin: 5px 0; font-size: 14px; word-break: break-all;"><strong>✉️</strong> ${club.email}</p>
                </div>
            `);
        });

        console.log('✓ Carte initialisée avec', clubsData.length, 'clubs');

        // ===== RECHERCHE SUR LA CARTE =====
        const searchInput = document.getElementById('map-search');
        const searchBtn = document.getElementById('search-btn');

        if (searchBtn && searchInput) {
            searchBtn.addEventListener('click', function() {
                const searchTerm = searchInput.value.toLowerCase().trim();
                if (!searchTerm) return;

                const foundClub = clubsData.find(club => 
                    club.name.toLowerCase().includes(searchTerm) || 
                    club.city.toLowerCase().includes(searchTerm)
                );

                if (foundClub) {
                    map.setView([foundClub.lat, foundClub.lng], 13);
                    // Ouvrir le popup du club trouvé
                    map.eachLayer(layer => {
                        if (layer instanceof L.Marker) {
                            const latLng = layer.getLatLng();
                            if (latLng.lat === foundClub.lat && latLng.lng === foundClub.lng) {
                                layer.openPopup();
                            }
                        }
                    });
                } else {
                    alert('Aucun club trouvé pour : ' + searchTerm);
                }
            });

            // Recherche au clavier (Entrée)
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    searchBtn.click();
                }
            });
        }

    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la carte:', error);
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; font-size: 16px;"><p>⚠️ Impossible de charger la carte. Vérifiez votre connexion internet.</p></div>';
        }
    }

    // ===== FILTRES DES CLUBS =====
    const regionFilter = document.getElementById('region-filter');
    const disciplineFilter = document.getElementById('discipline-filter');
    const clubCards = document.querySelectorAll('.club-card');

    function filterClubs() {
        const selectedRegion = regionFilter ? regionFilter.value.toLowerCase() : '';
        const selectedDiscipline = disciplineFilter ? disciplineFilter.value.toLowerCase() : '';

        let visibleCount = 0;

        clubCards.forEach(card => {
            const cardRegion = card.getAttribute('data-region') || '';
            const cardDiscipline = card.getAttribute('data-discipline') || '';
            
            const matchRegion = !selectedRegion || cardRegion.includes(selectedRegion);
            const matchDiscipline = !selectedDiscipline || cardDiscipline.includes(selectedDiscipline);

            if (matchRegion && matchDiscipline) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        console.log(`Filtres appliqués: ${visibleCount} clubs affichés`);
    }

    if (regionFilter) {
        regionFilter.addEventListener('change', filterClubs);
    }

    if (disciplineFilter) {
        disciplineFilter.addEventListener('change', filterClubs);
    }

    // ===== MENU HAMBURGER MOBILE =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Fermer le menu lors du clic sur un lien
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // ===== ANIMATIONS AU SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes des clubs
    clubCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    console.log('✓ Filtres et animations initialisés');
});