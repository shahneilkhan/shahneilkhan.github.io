/* =========================================================
   SHAH NEIL KHAN — PORTFOLIO
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     1. SMOOTH SCROLL
  ======================================================= */

  const internalLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  internalLinks.forEach((link) => {

    link.addEventListener("click", function (event) {

      const targetId = this.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId.length < 2
      ) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const navbar = document.querySelector(".navbar");

      const navbarHeight = navbar
        ? navbar.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     2. NAVBAR SCROLL EFFECT
  ======================================================= */

  const navbar = document.querySelector(".navbar");

  function updateNavbar() {

    if (!navbar) {
      return;
    }

    if (window.scrollY > 30) {

      navbar.style.background =
        "rgba(6, 6, 6, 0.88)";

      navbar.style.borderBottom =
        "1px solid rgba(255,255,255,0.10)";

      navbar.style.backdropFilter =
        "blur(18px)";

      navbar.style.webkitBackdropFilter =
        "blur(18px)";

    } else {

      navbar.style.background =
        "linear-gradient(to bottom, rgba(5,5,5,0.94), rgba(5,5,5,0.65))";

      navbar.style.borderBottom =
        "1px solid rgba(255,255,255,0.06)";

    }

  }

  updateNavbar();

  window.addEventListener(
    "scroll",
    updateNavbar,
    { passive: true }
  );


  /* =======================================================
     3. ACTIVE NAVIGATION LINK
  ======================================================= */

  const sections = document.querySelectorAll(
    "section[id]"
  );

  const navLinks = document.querySelectorAll(
    '.nav-menu a[href^="#"]'
  );

  function updateActiveNav() {

    if (!sections.length || !navLinks.length) {
      return;
    }

    const scrollPosition =
      window.scrollY +
      (navbar ? navbar.offsetHeight : 70) +
      100;

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop;

      const sectionHeight =
        section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
          sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });

    navLinks.forEach((link) => {

      const href =
        link.getAttribute("href");

      if (
        href === "#" + currentSection
      ) {

        link.style.color =
          "#ffe0a0";

      } else {

        link.style.color =
          "";

      }

    });

  }

  updateActiveNav();

  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );


  /* =======================================================
     4. SCROLL REVEAL ANIMATION
  ======================================================= */

  const revealElements = document.querySelectorAll(
    ".skill-card, " +
    ".project-card, " +
    ".case-block, " +
    ".experience-item, " +
    ".contact-links, " +
    ".section > h2"
  );

  if (
    "IntersectionObserver" in window &&
    revealElements.length
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

    revealElements.forEach((element, index) => {

      element.style.opacity = "0";

      element.style.transform =
        "translateY(22px)";

      element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

      element.style.transitionDelay =
        `${Math.min(index * 0.04, 0.35)}s`;

      revealObserver.observe(
        element
      );

    });

  }


  /* =======================================================
     5. ADD REVEAL CSS BEHAVIOR
  ======================================================= */

  const revealStyle =
    document.createElement("style");

  revealStyle.textContent = `
    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;

  document.head.appendChild(
    revealStyle
  );


  /* =======================================================
     6. SKILL BAR ANIMATION
  ======================================================= */

  const skillFills =
    document.querySelectorAll(
      ".skill-fill"
    );

  if (skillFills.length) {

    skillFills.forEach((fill) => {

      const finalWidth =
        fill.style.width;

      fill.style.width = "0%";

      fill.dataset.width =
        finalWidth;

    });

    if (
      "IntersectionObserver" in window
    ) {

      const skillObserver =
        new IntersectionObserver(
          (entries, observer) => {

            entries.forEach((entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              const fill =
                entry.target;

              const width =
                fill.dataset.width;

              setTimeout(() => {

                fill.style.width =
                  width;

              }, 150);

              observer.unobserve(
                fill
              );

            });

          },
          {
            threshold: 0.5
          }
        );

      skillFills.forEach((fill) => {

        skillObserver.observe(
          fill
        );

      });

    } else {

      skillFills.forEach((fill) => {

        fill.style.width =
          fill.dataset.width;

      });

    }

  }


  /* =======================================================
     7. HERO PARALLAX
  ======================================================= */

  const heroScene =
    document.querySelector(
      ".hero-scene"
    );

  const hero =
    document.querySelector(
      ".hero"
    );

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (
    heroScene &&
    hero &&
    !reducedMotion
  ) {

    let ticking = false;

    function updateHeroParallax() {

      const scrollY =
        window.scrollY;

      const heroHeight =
        hero.offsetHeight;

      if (
        scrollY <= heroHeight
      ) {

        const movement =
          scrollY * 0.12;

        heroScene.style.transform =
          `translateY(${movement}px)`;

      }

      ticking = false;

    }

    window.addEventListener(
      "scroll",
      () => {

        if (!ticking) {

          window.requestAnimationFrame(
            updateHeroParallax
          );

          ticking = true;

        }

      },
      { passive: true }
    );

  }


  /* =======================================================
     8. BUTTON HOVER MICRO INTERACTION
  ======================================================= */

  const buttons =
    document.querySelectorAll(
      ".btn-primary, .btn-secondary, .talk-btn"
    );

  buttons.forEach((button) => {

    button.addEventListener(
      "mouseenter",
      () => {

        if (reducedMotion) {
          return;
        }

        button.style.transition =
          "transform 0.25s ease";

      }
    );

  });


  /* =======================================================
     9. EXTERNAL LINKS
  ======================================================= */

  const externalLinks =
    document.querySelectorAll(
      'a[href^="http://"], a[href^="https://"]'
    );

  externalLinks.forEach((link) => {

    const currentHost =
      window.location.hostname;

    try {

      const url =
        new URL(
          link.href,
          window.location.href
        );

      if (
        url.hostname &&
        url.hostname !== currentHost
      ) {

        link.setAttribute(
          "rel",
          "noopener noreferrer"
        );

      }

    } catch (error) {

      /* Ignore invalid URLs */

    }

  });


  /* =======================================================
     10. CURRENT YEAR
  ======================================================= */

  const footer =
    document.querySelector(
      ".footer"
    );

  if (footer) {

    const year =
      new Date().getFullYear();

    const yearText =
      footer.querySelector(
        "p"
      );

    if (yearText) {

      yearText.textContent =
        yearText.textContent.replace(
          /\b20\d{2}\b/,
          year
        );

    }

  }


  /* =======================================================
     11. TABAYYUN TV HOVER EFFECT
  ======================================================= */

  const tvBanner =
    document.querySelector(
      ".tv-banner"
    );

  if (
    tvBanner &&
    !reducedMotion
  ) {

    tvBanner.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          tvBanner.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        const centerX =
          rect.width / 2;

        const centerY =
          rect.height / 2;

        const rotateX =
          ((y - centerY) /
            centerY) *
          -1.5;

        const rotateY =
          ((x - centerX) /
            centerX) *
          1.5;

        tvBanner.style.transform =
          `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      }
    );

    tvBanner.addEventListener(
      "mouseleave",
      () => {

        tvBanner.style.transform =
          "perspective(1000px) rotateX(0deg) rotateY(0deg)";

        tvBanner.style.transition =
          "transform 0.4s ease";

      }
    );

  }


  /* =======================================================
     12. MOUSE PARALLAX FOR HERO TEXT
  ======================================================= */

  const heroContent =
    document.querySelector(
      ".hero-overlay"
    );

  if (
    heroContent &&
    hero &&
    !reducedMotion &&
    window.innerWidth > 900
  ) {

    hero.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          hero.getBoundingClientRect();

        const x =
          (event.clientX -
            rect.left) /
          rect.width;

        const y =
          (event.clientY -
            rect.top) /
          rect.height;

        const moveX =
          (x - 0.5) * 8;

        const moveY =
          (y - 0.5) * 5;

        heroContent.style.transform =
          `translate(${moveX}px, ${moveY}px)`;

      }
    );

    hero.addEventListener(
      "mouseleave",
      () => {

        heroContent.style.transform =
          "translate(0, 0)";

        heroContent.style.transition =
          "transform 0.4s ease";

      }
    );

  }


  /* =======================================================
     13. ESC KEY — RESET HOVER EFFECTS
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {

        if (heroContent) {

          heroContent.style.transform =
            "translate(0, 0)";

        }

        if (tvBanner) {

          tvBanner.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg)";

        }

      }

    }
  );


  /* =======================================================
     14. IMAGE ERROR HANDLING
  ======================================================= */

  const images =
    document.querySelectorAll(
      "img"
    );

  images.forEach((image) => {

    image.addEventListener(
      "error",
      () => {

        image.style.opacity =
          "0.4";

      }
    );

  });


  /* =======================================================
     15. PAGE LOADED STATE
  ======================================================= */

  document.body.classList.add(
    "page-loaded"
  );


  /* =======================================================
     16. CONSOLE BRANDING
  ======================================================= */

  console.log(
    "%cSHAH NEIL KHAN",
    `
      color: #ffe0a0;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 3px;
    `
  );

  console.log(
    "%cSoftware Engineer • AI / Context Engineer • UI/UX",
    `
      color: #999;
      font-size: 12px;
    `
  );


});
