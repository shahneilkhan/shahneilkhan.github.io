/* =========================================================
   SHAHNEIL KHAN — PORTFOLIO
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const body = document.body;
  const cursor = document.querySelector(".cursor");
  const hero = document.querySelector(".hero");
  const nav = document.querySelector("nav");

  /* =======================================================
     PAGE LOADER
     ======================================================= */

  const loader = document.createElement("div");

  loader.className = "page-loader";

  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-logo">SK<span>.</span></div>
      <div class="loader-line">
        <span></span>
      </div>
      <div class="loader-text">LOADING EXPERIENCE</div>
    </div>
  `;

  body.prepend(loader);

  const loaderStyle = document.createElement("style");

  loaderStyle.textContent = `
    .page-loader {
      position: fixed;
      inset: 0;
      z-index: 999999;
      background: #080808;
      display: grid;
      place-items: center;
      transition:
        opacity .7s ease,
        visibility .7s ease;
    }

    .page-loader.hide {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .loader-content {
      width: min(320px, 80%);
      text-align: center;
    }

    .loader-logo {
      color: #f5f3ed;
      font-size: 42px;
      font-weight: 800;
      letter-spacing: -3px;
      margin-bottom: 25px;
    }

    .loader-logo span {
      color: #d4af37;
    }

    .loader-line {
      width: 100%;
      height: 1px;
      background: rgba(255,255,255,.12);
      overflow: hidden;
    }

    .loader-line span {
      display: block;
      width: 0;
      height: 100%;
      background: #d4af37;
      animation: loaderProgress 1.5s ease forwards;
    }

    .loader-text {
      margin-top: 12px;
      color: #666;
      font-size: 9px;
      letter-spacing: 3px;
    }

    @keyframes loaderProgress {
      to {
        width: 100%;
      }
    }
  `;

  document.head.appendChild(loaderStyle);

  window.addEventListener("load", () => {
    setTimeout(() => {
      loader.classList.add("hide");
    }, 1600);
  });


  /* =======================================================
     CUSTOM CURSOR
     ======================================================= */

  if (cursor && window.matchMedia("(pointer: fine)").matches) {

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    function animateCursor() {

      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const interactiveElements = document.querySelectorAll(
      "a, button, .project, .skill-card, .lab-item"
    );

    interactiveElements.forEach((element) => {

      element.addEventListener("mouseenter", () => {
        cursor.style.width = "35px";
        cursor.style.height = "35px";
      });

      element.addEventListener("mouseleave", () => {
        cursor.style.width = "12px";
        cursor.style.height = "12px";
      });

    });
  }


  /* =======================================================
     SMOOTH ANCHOR SCROLL
     ======================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     NAVBAR SCROLL EFFECT
     ======================================================= */

  if (nav) {

    let lastScroll = 0;

    window.addEventListener("scroll", () => {

      const currentScroll = window.scrollY;

      if (currentScroll > 80) {

        nav.style.background = "rgba(8,8,8,.88)";
        nav.style.boxShadow =
          "0 15px 45px rgba(0,0,0,.3)";

      } else {

        nav.style.background = "rgba(8,8,8,.68)";
        nav.style.boxShadow = "none";
      }

      /* Small hide/show interaction */

      if (currentScroll > lastScroll && currentScroll > 250) {
        nav.style.transform =
          "translate(-50%, -140%)";
      } else {
        nav.style.transform =
          "translate(-50%, 0)";
      }

      lastScroll = currentScroll;

    });

  }


  /* =======================================================
     HERO PARALLAX
     ======================================================= */

  if (
    hero &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {

    window.addEventListener("scroll", () => {

      const scroll = window.scrollY;

      if (scroll < window.innerHeight) {

        const position = 50 + scroll * 0.035;

        hero.style.backgroundPosition =
          `center ${position}%`;

      }

    });

  }


  /* =======================================================
     HERO MOUSE MOVEMENT
     ======================================================= */

  if (
    hero &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    const heroContent =
      hero.querySelector(".hero-content");

    hero.addEventListener("mousemove", (event) => {

      const rect = hero.getBoundingClientRect();

      const x =
        (event.clientX - rect.left) /
        rect.width - 0.5;

      const y =
        (event.clientY - rect.top) /
        rect.height - 0.5;

      if (heroContent) {

        heroContent.style.transform =
          `translate(${x * 8}px, ${y * 8}px)`;
      }

    });

    hero.addEventListener("mouseleave", () => {

      if (heroContent) {

        heroContent.style.transform =
          "translate(0, 0)";
      }

    });

  }


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements = document.querySelectorAll(
    ".section-label, .section-title, .about-text, .fact, .skill-card, .project, .lab-item, .contact h2, .contact p"
  );

  const revealStyle = document.createElement("style");

  revealStyle.textContent = `
    .reveal-ready {
      opacity: 0;
      transform: translateY(35px);
      transition:
        opacity .8s ease,
        transform .8s cubic-bezier(.2,.8,.2,1);
    }

    .reveal-ready.revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  document.head.appendChild(revealStyle);

  revealElements.forEach((element) => {
    element.classList.add("reveal-ready");
  });

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          entry.target.classList.add("revealed");

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12
      }
    );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  /* =======================================================
     STAGGER ANIMATIONS
     ======================================================= */

  document.querySelectorAll(
    ".skills-grid, .projects, .lab-grid, .facts"
  ).forEach((container) => {

    const children =
      container.children;

    Array.from(children).forEach(
      (child, index) => {

        child.style.transitionDelay =
          `${index * 80}ms`;

      }
    );

  });


  /* =======================================================
     MAGNETIC BUTTONS
     ======================================================= */

  if (window.matchMedia("(pointer: fine)").matches) {

    document.querySelectorAll(".btn").forEach((button) => {

      button.addEventListener("mousemove", (event) => {

        const rect =
          button.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        button.style.transform =
          `translate(${x * 0.12}px, ${y * 0.12}px)`;

      });

      button.addEventListener("mouseleave", () => {

        button.style.transform =
          "translate(0, 0)";

      });

    });

  }


  /* =======================================================
     PROJECT TILT EFFECT
     ======================================================= */

  if (window.matchMedia("(pointer: fine)").matches) {

    document.querySelectorAll(".project").forEach((project) => {

      project.addEventListener("mousemove", (event) => {

        const rect =
          project.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width;

        const y =
          (event.clientY - rect.top) /
          rect.height;

        const rotateX =
          (0.5 - y) * 4;

        const rotateY =
          (x - 0.5) * 4;

        project.style.transform =
          `perspective(900px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           scale(.995)`;

      });

      project.addEventListener("mouseleave", () => {

        project.style.transform =
          "perspective(900px)
           rotateX(0)
           rotateY(0)
           scale(1)";

      });

    });

  }


  /* =======================================================
     SKILL CARD GLOW
     ======================================================= */

  if (window.matchMedia("(pointer: fine)").matches) {

    document.querySelectorAll(".skill-card").forEach((card) => {

      card.addEventListener("mousemove", (event) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          ((event.clientX - rect.left) /
            rect.width) * 100;

        const y =
          ((event.clientY - rect.top) /
            rect.height) * 100;

        card.style.background = `
          radial-gradient(
            circle at ${x}% ${y}%,
            rgba(212,175,55,.12),
            rgba(255,255,255,.025) 40%,
            rgba(255,255,255,.01)
          )
        `;

      });

      card.addEventListener("mouseleave", () => {

        card.style.background =
          "linear-gradient(145deg, rgba(255,255,255,.06), rgba(255,255,255,.012))";

      });

    });

  }


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll(
      ".nav-links a"
    );

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const id =
            entry.target.getAttribute("id");

          navLinks.forEach((link) => {

            link.classList.remove("active");

            if (
              link.getAttribute("href") ===
              `#${id}`
            ) {

              link.classList.add("active");
            }

          });

        });

      },
      {
        threshold: 0.45
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  /* =======================================================
     ACTIVE NAV CSS
     ======================================================= */

  const activeNavStyle =
    document.createElement("style");

  activeNavStyle.textContent = `
    .nav-links a.active {
      color: #d4af37;
    }

    .nav-links a.active::after {
      width: 100%;
    }
  `;

  document.head.appendChild(activeNavStyle);


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const footer =
    document.querySelector("footer");

  if (footer) {

    const year =
      new Date().getFullYear();

    footer.innerHTML =
      footer.innerHTML.replace(
        /©\\s*\\d{4}/,
        `© ${year}`
      );

  }


  /* =======================================================
     IMAGE LAZY LOADING
     ======================================================= */

  document
    .querySelectorAll("img")
    .forEach((image) => {

      if (!image.hasAttribute("loading")) {
        image.setAttribute(
          "loading",
          "lazy"
        );
      }

    });


  /* =======================================================
     KEYBOARD ACCESSIBILITY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (event.key === "Escape") {

        document.activeElement?.blur();

      }

    }
  );


  /* =======================================================
     PAGE READY
     ======================================================= */

  body.classList.add("js-ready");

});
