// ============================================================
//  FSRS — Animations & Interactions JS
//  Refonte Design 2025
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    // ══════════════════════════════════════════════════════
    //  HEADER SCROLL — Glassmorphism + réduction de taille
    // ══════════════════════════════════════════════════════
    const header = document.querySelector("header");
    if (header) {
        const onScroll = () => {
            if (window.pageYOffset > 60) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll(); // init
    }

    // ══════════════════════════════════════════════════════
    //  MENU MOBILE — Hamburger accessible
    // ══════════════════════════════════════════════════════
    const nav = document.querySelector("header nav");
    const navUl = nav ? nav.querySelector("ul") : null;

    // Réutiliser .hamburger si déjà dans le HTML, sinon en créer un
    let hamburger = document.querySelector(".hamburger");

    if (navUl && !hamburger) {
        hamburger = document.createElement("button");
        hamburger.classList.add("hamburger");
        hamburger.setAttribute("aria-label", "Menu principal");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.innerHTML = `
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        `;
        hamburger.style.cssText = "";

        const container = document.querySelector(".nav-container") || document.querySelector("header .container");
        if (container) container.appendChild(hamburger);
    }

    if (hamburger && navUl) {
        const toggleMenu = () => {
            const isOpen = navUl.classList.toggle("active");
            hamburger.classList.toggle("active", isOpen);
            hamburger.setAttribute("aria-expanded", isOpen);
        };

        hamburger.addEventListener("click", toggleMenu);

        // Fermer en cliquant en dehors
        document.addEventListener("click", (e) => {
            if (!header.contains(e.target) && navUl.classList.contains("active")) {
                navUl.classList.remove("active");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            }
        });

        // Afficher/masquer selon la taille
        const checkMobile = () => {
            if (window.innerWidth <= 968) {
                hamburger.style.display = "flex";
            } else {
                hamburger.style.display = "none";
                navUl.classList.remove("active");
                hamburger.classList.remove("active");
                hamburger.setAttribute("aria-expanded", "false");
            }
        };

        window.addEventListener("resize", checkMobile, { passive: true });
        checkMobile();
    }

    // ══════════════════════════════════════════════════════
    //  INTERSECTION OBSERVER — Animations au scroll
    // ══════════════════════════════════════════════════════
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                animObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -80px 0px"
    });

    // Cibler tous les éléments à animer
    document.querySelectorAll(
        ".animate-fade-up, .animate-slide-left, .animate-scale-in, " +
        ".actualite-card, .discipline-card, .club-card, .stat-card, " +
        ".champion-card, .info-card, .partner-card, .map-card, " +
        ".discipline-section-inner, .image-card, .form-container"
    ).forEach((el, i) => {
        // Ajouter classe d'animation si pas déjà présente
        if (!el.classList.contains("animate-fade-up") &&
            !el.classList.contains("animate-slide-left") &&
            !el.classList.contains("animate-scale-in")) {
            el.classList.add("animate-fade-up");
        }

        // Délai en cascade (max 5 items)
        const delayIndex = (i % 5) + 1;
        el.classList.add(`delay-${delayIndex}`);

        animObserver.observe(el);
    });

    // Observer les sections entières
    document.querySelectorAll(
        ".actualites, .presentation, .disciplines, .stats-section, " +
        ".partners-slider, .actualites-section, .disciplines-section, " +
        ".contact-section, .brief-history, .clubs-list, .champions-section, " +
        ".partners-section, .clubs-section, .ressources-section, .info-section"
    ).forEach(section => animObserver.observe(section));

    // ══════════════════════════════════════════════════════
    //  COMPTEUR ANIMÉ — Chiffres clés (.stat-number)
    // ══════════════════════════════════════════════════════
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const raw = el.textContent.replace(/\D/g, "");
                const target = parseInt(raw, 10);
                if (isNaN(target)) return;

                const suffix = el.textContent.replace(/\d/g, "").trim();
                let current = 0;
                const duration = 1800;
                const step = Math.ceil(target / (duration / 16));

                const tick = () => {
                    current = Math.min(current + step, target);
                    el.textContent = current.toLocaleString("fr-FR") + (suffix ? " " + suffix : "");
                    if (current < target) requestAnimationFrame(tick);
                };

                requestAnimationFrame(tick);
                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll(".stat-number, .hero-stat-num").forEach(el => {
        countObserver.observe(el);
    });

    // ══════════════════════════════════════════════════════
    //  SMOOTH SCROLL pour les ancres internes
    // ══════════════════════════════════════════════════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (!href || href === "#") return;
            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const headerH = header ? header.offsetHeight : 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 16;

            window.scrollTo({ top, behavior: "smooth" });

            // Mettre à jour l'URL pour refléter la navigation
            if (history.pushState) {
                history.pushState(null, "", href);
            } else {
                location.hash = href;
            }

            // Effet visuel sur la cible pour rendre la navigation évidente
            target.classList.remove("anchor-flash");
            void target.offsetWidth; // force reflow pour relancer l'animation
            target.classList.add("anchor-flash");

            // Fermer le menu mobile si ouvert
            if (navUl) navUl.classList.remove("active");
            if (hamburger) hamburger.classList.remove("active");
        });
    });

    // ══════════════════════════════════════════════════════
    //  FORMULAIRE — Focus doré + validation visuelle
    // ══════════════════════════════════════════════════════
    document.querySelectorAll(".form-group input, .form-group textarea, .form-group select").forEach(field => {
        // Label flottant effect
        const label = field.closest(".form-group")?.querySelector("label");

        field.addEventListener("focus", () => {
            if (label) label.style.color = "var(--primary, #2E8B57)";
        });

        field.addEventListener("blur", () => {
            if (label) label.style.color = "";
        });
    });

    // Validation et feedback du formulaire
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const isNewsletter = this.classList.contains("newsletter-form");
            const btn = this.querySelector('button[type="submit"], .submit-btn, .btn-newsletter');
            if (!btn) return;

            const originalText = btn.textContent;
            const originalBg = btn.style.background;

            btn.textContent = isNewsletter ? "Envoi en cours…" : "Envoi en cours…";
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = isNewsletter ? "✓ Inscrit !" : "✓ Message envoyé !";
                btn.style.background = "linear-gradient(135deg, #2E8B57, #236b45)";
                btn.style.color = "#fff";

                if (isNewsletter) {
                    const emailInput = this.querySelector('input[type="email"]');
                    if (emailInput) emailInput.value = "";
                } else {
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.background = originalBg;
                        btn.style.color = "";
                        btn.disabled = false;
                        this.reset();
                    }, 3000);
                }
            }, 1200);
        });
    });

    // ══════════════════════════════════════════════════════
    //  FILTRES CLUBS — chips actifs
    // ══════════════════════════════════════════════════════
    document.querySelectorAll(".chip, .filter-tab").forEach(chip => {
        chip.addEventListener("click", function () {
            const siblings = this.closest(".filter-chips, .filter-tabs");
            if (siblings) {
                siblings.querySelectorAll(".chip, .filter-tab").forEach(c => c.classList.remove("active"));
            }
            this.classList.add("active");
        });
    });

    // ══════════════════════════════════════════════════════
    //  PAUSE SLIDER au survol (géré en CSS mais dobby JS)
    // ══════════════════════════════════════════════════════
    const sliderTrack = document.querySelector(".slider-track");
    if (sliderTrack) {
        sliderTrack.addEventListener("mouseenter", () => {
            sliderTrack.style.animationPlayState = "paused";
        });
        sliderTrack.addEventListener("mouseleave", () => {
            sliderTrack.style.animationPlayState = "running";
        });
    }

    // ══════════════════════════════════════════════════════
    //  LAZY LOADING natif sur images hors hero
    // ══════════════════════════════════════════════════════
    document.querySelectorAll("img:not(.hero-disciplines img)").forEach(img => {
        if (!img.hasAttribute("loading")) {
            img.setAttribute("loading", "lazy");
        }
    });

    // Lazy loading data-src
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add("loaded");
                    lazyObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll("img[data-src]").forEach(img => lazyObserver.observe(img));

    // Rendre visibles les images normales (sans data-src)
    document.querySelectorAll("img:not([data-src])").forEach(img => {
        if (img.complete) {
            img.classList.add("loaded");
        } else {
            img.addEventListener("load", () => img.classList.add("loaded"));
            img.addEventListener("error", () => img.classList.add("loaded"));
        }
    });

    // ══════════════════════════════════════════════════════
    //  BOUTON RETOUR EN HAUT
    // ══════════════════════════════════════════════════════
    const backToTop = document.createElement("button");
    backToTop.setAttribute("aria-label", "Retour en haut de page");
    backToTop.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><polyline points="18 15 12 9 6 15"/></svg>`;
    backToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #1a3a2f 0%, #2E8B57 100%);
        color: #FFD700;
        border: 2px solid rgba(255,215,0,0.25);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(12px);
        transition: opacity 0.35s ease, visibility 0.35s ease, transform 0.35s ease, box-shadow 0.3s ease;
        box-shadow: 0 6px 24px rgba(46,139,87,0.35);
        z-index: 9998;
    `;

    document.body.appendChild(backToTop);

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = "1";
            backToTop.style.visibility = "visible";
            backToTop.style.transform = "translateY(0)";
        } else {
            backToTop.style.opacity = "0";
            backToTop.style.visibility = "hidden";
            backToTop.style.transform = "translateY(12px)";
        }
    }, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    backToTop.addEventListener("mouseenter", () => {
        backToTop.style.boxShadow = "0 10px 35px rgba(255,215,0,0.45)";
        backToTop.style.transform = "translateY(-3px)";
    });

    backToTop.addEventListener("mouseleave", () => {
        backToTop.style.boxShadow = "0 6px 24px rgba(46,139,87,0.35)";
        backToTop.style.transform = "translateY(0)";
    });

    // ══════════════════════════════════════════════════════
    //  ACTIVE NAV LINK — surligner la page courante
    // ══════════════════════════════════════════════════════
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("header nav a").forEach(link => {
        const href = link.getAttribute("href") || "";
        if (href.includes(currentPath) || (currentPath === "index.html" && href === "#")) {
            link.classList.add("active");
        }
    });

    console.log("✓ FSRS Design System 2025 chargé");
});
