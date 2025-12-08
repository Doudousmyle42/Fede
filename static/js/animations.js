// Script professionnel pour animations et interactions
document.addEventListener("DOMContentLoaded", function() {
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.querySelector("header");
    let lastScroll = 0;
    
    window.addEventListener("scroll", function() {
        const currentScroll = window.pageYOffset;
        
        // Ajouter classe scrolled pour effet
        if (currentScroll > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
        
        lastScroll = currentScroll;
    });
    
    // ===== MENU MOBILE =====
    const createMobileMenu = () => {
        const nav = document.querySelector("header nav");
        if (!nav) return;
        
        const menuToggle = document.createElement("button");
        menuToggle.innerHTML = `
            <span style="display: block; width: 25px; height: 3px; background: white; margin: 5px 0; transition: 0.3s;"></span>
            <span style="display: block; width: 25px; height: 3px; background: white; margin: 5px 0; transition: 0.3s;"></span>
            <span style="display: block; width: 25px; height: 3px; background: white; margin: 5px 0; transition: 0.3s;"></span>
        `;
        menuToggle.classList.add("menu-toggle");
        menuToggle.style.cssText = `
            display: none;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 10px;
            z-index: 1001;
        `;
        
        const navContainer = document.querySelector(".nav-container") || document.querySelector("header .container");
        if (navContainer) {
            navContainer.insertBefore(menuToggle, nav);
        }
        
        menuToggle.addEventListener("click", function() {
            const navUl = nav.querySelector("ul");
            navUl.classList.toggle("active");
            
            // Animation hamburger
            const spans = this.querySelectorAll("span");
            if (navUl.classList.contains("active")) {
                spans[0].style.transform = "rotate(45deg) translate(8px, 8px)";
                spans[1].style.opacity = "0";
                spans[2].style.transform = "rotate(-45deg) translate(7px, -7px)";
            } else {
                spans[0].style.transform = "none";
                spans[1].style.opacity = "1";
                spans[2].style.transform = "none";
            }
        });
        
        // Responsive display
        const checkMobile = () => {
            if (window.innerWidth <= 968) {
                menuToggle.style.display = "block";
                const navUl = nav.querySelector("ul");
                if (navUl) {
                    navUl.style.flexDirection = "column";
                    navUl.style.position = "absolute";
                    navUl.style.top = "100%";
                    navUl.style.left = "0";
                    navUl.style.right = "0";
                    navUl.style.backgroundColor = getComputedStyle(header).backgroundColor;
                    navUl.style.padding = "1rem";
                    navUl.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                }
            } else {
                menuToggle.style.display = "none";
                const navUl = nav.querySelector("ul");
                if (navUl) {
                    navUl.classList.remove("active");
                    navUl.style.cssText = "";
                }
            }
        };
        
        window.addEventListener("resize", checkMobile);
        checkMobile();
    };
    
    createMobileMenu();
    
    // ===== INTERSECTION OBSERVER POUR ANIMATIONS AU SCROLL =====
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                
                // Animer le soulignement du titre
                const title = entry.target.querySelector(".section-title");
                if (title) {
                    title.classList.add("visible");
                }
            }
        });
    }, observerOptions);
    
    // Observer toutes les sections
    const sections = document.querySelectorAll(".actualites, .presentation, .disciplines, .actualites-section, .ressources-section, .disciplines-section, .contact-section, .brief-history, .info-section");
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // ===== CHARGEMENT PROGRESSIF DES IMAGES =====
    const images = document.querySelectorAll("img");
    images.forEach(img => {
        if (img.complete) {
            img.classList.add("loaded");
        } else {
            img.addEventListener("load", function() {
                this.classList.add("loaded");
            });
        }
    });
    
    // ===== SMOOTH SCROLL POUR LES ANCRES =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            if (href !== "#" && href !== "") {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
    
    // ===== ANIMATION DES CARTES AU SURVOL =====
    const cards = document.querySelectorAll(".actualite-card, .document-card, .discipline-card, .info-card");
    cards.forEach(card => {
        card.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-10px) scale(1.02)";
        });
        
        card.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0) scale(1)";
        });
    });
    
    // ===== ANIMATION DES INPUTS AU FOCUS =====
    const inputs = document.querySelectorAll("input, textarea");
    inputs.forEach(input => {
        input.addEventListener("focus", function() {
            this.parentElement.style.transform = "translateY(-2px)";
            this.style.borderColor = "#00C853";
        });
        
        input.addEventListener("blur", function() {
            this.parentElement.style.transform = "translateY(0)";
            if (!this.value) {
                this.style.borderColor = "#ddd";
            }
        });
    });
    
    // ===== VALIDATION FORMULAIRE =====
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            
            const button = this.querySelector('button[type="submit"]');
            if (button) {
                const originalText = button.textContent;
                button.textContent = "Envoi en cours...";
                button.disabled = true;
                
                // Simulation d'envoi
                setTimeout(() => {
                    button.textContent = "✓ Message envoyé !";
                    button.style.backgroundColor = "#00C853";
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.style.backgroundColor = "";
                        form.reset();
                    }, 3000);
                }, 1500);
            }
        });
    });
    
    // ===== PARALLAX EFFECT POUR HERO =====
    const hero = document.querySelector(".hero, .hero-disciplines, .hero-ressources, .hero-federation");
    if (hero) {
        window.addEventListener("scroll", function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                const heroContent = hero.querySelector(".hero-content, .banner-content");
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                    heroContent.style.opacity = 1 - (scrolled / 600);
                }
            }
        });
    }
    
    // ===== COMPTEUR ANIMÉ (si présent) =====
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    };
    
    // ===== LAZY LOADING POUR LES IMAGES =====
    const lazyImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add("loaded");
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ===== EFFET CURSOR CUSTOM (optionnel, professionnel) =====
    const createCustomCursor = () => {
        const cursor = document.createElement("div");
        cursor.style.cssText = `
            width: 20px;
            height: 20px;
            border: 2px solid #FFD700;
            border-radius: 50%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.15s ease;
            display: none;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener("mousemove", (e) => {
            cursor.style.display = "block";
            cursor.style.left = e.clientX - 10 + "px";
            cursor.style.top = e.clientY - 10 + "px";
        });
        
        document.querySelectorAll("a, button, .btn, .btn-hero, .btn-lire").forEach(el => {
            el.addEventListener("mouseenter", () => {
                cursor.style.transform = "scale(1.5)";
                cursor.style.backgroundColor = "rgba(255, 215, 0, 0.2)";
            });
            
            el.addEventListener("mouseleave", () => {
                cursor.style.transform = "scale(1)";
                cursor.style.backgroundColor = "transparent";
            });
        });
    };
    
    // Activer le curseur custom uniquement sur desktop
    if (window.innerWidth > 968) {
        // createCustomCursor(); // Décommenter si souhaité
    }
    
    // ===== PRÉCHARGEMENT DES IMAGES =====
    const preloadImages = () => {
        const images = document.querySelectorAll("img");
        images.forEach(img => {
            const src = img.src || img.dataset.src;
            if (src) {
                const preloadImg = new Image();
                preloadImg.src = src;
            }
        });
    };
    
    preloadImages();
    
    // ===== PERFORMANCE: Débounce pour resize =====
    let resizeTimer;
    window.addEventListener("resize", function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Recalculer les éléments si nécessaire
            console.log("Resize completed");
        }, 250);
    });
    
    console.log("✓ Animations FSRS chargées avec succès - Prêt pour présentation gouvernementale");
});