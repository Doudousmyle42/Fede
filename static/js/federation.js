document.addEventListener("DOMContentLoaded", function() {
    // Animation pour les éléments décoratifs
    const decorativeElements = document.querySelectorAll(".star, .circle, .play-button");

    decorativeElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transition = "opacity 0.5s ease-in-out";

        setTimeout(() => {
            element.style.opacity = "1";
        }, 500);
    });

    // Animation pour les boutons
    const buttons = document.querySelectorAll(".btn-yellow, .btn-dark");

    buttons.forEach(button => {
        button.addEventListener("mouseover", function() {
            this.style.transform = "translateY(-3px)";
        });

        button.addEventListener("mouseout", function() {
            this.style.transform = "translateY(0)";
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const nodes = document.querySelectorAll(".node");

    nodes.forEach(node => {
        node.addEventListener("mouseover", function() {
            this.style.backgroundColor = "#FFD700"; /* Jaune or */
            this.style.transform = "scale(1.05)";
            this.style.transition = "transform 0.3s ease";
        });

        node.addEventListener("mouseout", function() {
            this.style.backgroundColor = "";
            this.style.transform = "scale(1)";
        });
    });
});
