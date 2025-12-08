// Script pour gérer les interactions de base (ex : menu mobile, animations)
document.addEventListener("DOMContentLoaded", function() {
    // Exemple : Gestion du menu mobile (si nécessaire)
    const menuToggle = document.createElement("button");
    menuToggle.textContent = "☰";
    menuToggle.classList.add("menu-toggle");
    document.querySelector("header .container").prepend(menuToggle);

    menuToggle.addEventListener("click", function() {
        const nav = document.querySelector("header nav ul");
        nav.classList.toggle("active");
    });

    // Animation au défilement
    window.addEventListener("scroll", function() {
        const header = document.querySelector("header");
        if (window.scrollY > 100) {
            header.style.backgroundColor = "#1a5f3f"; // Vert plus foncé
        } else {
            header.style.backgroundColor = "#2E8B57";
        }
    });
});
