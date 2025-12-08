document.addEventListener("DOMContentLoaded", function() {
    const actualiteCards = document.querySelectorAll(".actualite-card");

    actualiteCards.forEach(card => {
        card.addEventListener("click", function() {
            window.location.href = "#"; // Remplacez par le lien vers l'article complet
        });
    });
});
