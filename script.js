document.addEventListener("DOMContentLoaded", function () {

  /* ===== COMING SOON CARDS ===== */
  const comingSoonCards = document.querySelectorAll(".project-card.soon");

  comingSoonCards.forEach(function (card) {
    card.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
    });
  });


  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  /* ===== NAVBAR SCROLL EFFECT ===== */
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

});
