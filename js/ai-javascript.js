// Simple dynamic behavior
console.log("Copilot Webpage Loaded");

// Fade-in animation for cards
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".card").forEach((card, index) => {
        card.style.opacity = 0;
        setTimeout(() => {
            card.style.transition = "opacity 0.8s ease";
            card.style.opacity = 1;
        }, 150 * index);
    });
});
