/* ===== COMING SOON BRAND CARDS ===== */

document.addEventListener("DOMContentLoaded", () => {
  const comingSoonCards = document.querySelectorAll(".project-card.soon");

  comingSoonCards.forEach((card) => {
    // Prevent clicks on Coming Soon cards
    card.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
    });

    // Prevent keyboard activation
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
      }
    });

    // Accessibility
    card.setAttribute("aria-disabled", "true");
    card.setAttribute("tabindex", "-1");
  });
});
