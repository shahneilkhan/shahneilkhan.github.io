/* =========================================================
   SHAHNEIL KHAN — PORTFOLIO
   script.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ==============================
     PAGE LOADER
     ============================== */

  const loader = document.createElement("div");

  loader.className = "page-loader";

  loader.innerHTML = `
    <div class="loader-content">
      <div class="loader-logo">
        SK<span>.</span>
      </div>

      <div class="loader-line">
        <span></span>
      </div>

      <div class="loader-text">
        LOADING EXPERIENCE
      </div>
    </div>
  `;

  document.body.prepend(loader);


  window.addEventListener("load", () => {

    setTimeout(() => {
      loader.classList.add("hide");
    }, 1200);

  });


  /* ==============================
     CUSTOM CURSOR
     ============================== */

  const cursor = document.querySelector(".cursor");

  if (
    cursor &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    let mouseX = 0;
    let mouseY = 0;

    let cursorX = 0;
    let cursorY = 0;


    document.addEventListener("mousemove", (event) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

    });


    function moveCursor() {

      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      requestAnimationFrame(moveCursor);
    }

    moveCursor();


    const clickableElements =
      document.querySelectorAll(
        "a, button, .project, .skill-card, .lab-item"
      );


    clickableElements.forEach((element) => {

      element.addEventListener("mouseenter", () => {

        cursor.style.width = "32px";
        cursor.style.height = "32px";

      });


      element.addEventListener("mouseleave", () => {

        cursor.style.width = "12px";
        cursor.style.height = "12px";

      });

    });

  }


  /* ==============================
     SMOOTH SCROLL
     ============================== */

  const links =
    document.querySelectorAll('a[href^="#"]');


  links.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetID =
        link.getAttribute("href");

      if (
        !targetID ||
        targetID === "#"
      ) {
        return;
      }


      const target =
        document.querySelector(targetID);


      if (!target) {
        return;
      }


      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* ==============================
     NAVBAR SCROLL EFFECT
     ============================== */

  const nav =
    document.querySelector("nav");


  if (nav) {

    window.addEventListener("scroll", () => {

      if (window.scrollY > 60) {

        nav.style.background =
          "rgba(8,8,8,0.92)";

        nav.style.boxShadow =
          "0 15px 50px rgba(0,0,0,0.35)";

      } else {

        nav.style.background =
          "rgba(8,8,8,0.68)";

        nav.style.boxShadow =
          "none";

      }

    });

  }


  /* ==============================
     HERO PARALLAX
     ============================== */

  const hero =
    document.querySelector(".hero");


  if (
    hero &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    window.addEventListener("scroll", () => {

      const scroll =
        window.scrollY;


      if (
        scroll <
        window.innerHeight
      ) {

        hero.style.backgroundPosition =
          `center ${50 + scroll * 0.03}%`;

      }

    });

  }


  /* ==============================
     HERO MOUSE EFFECT
     ============================== */

  const heroContent =
    document.querySelector(".hero-content");


  if (
    hero &&
    heroContent &&
    window.matchMedia("(pointer: fine)").matches
  ) {

    hero.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          hero.getBoundingClientRect();


        const x =
          (event.clientX - rect.left) /
          rect.width -
          0.5;


        const y =
          (event.clientY - rect.top) /
          rect.height -
          0.5;


        heroContent.style.transform =
          `translate(${x * 8}px, ${y * 8}px)`;

      }
    );


    hero.addEventListener(
      "mouseleave",
      () => {

        heroContent.style.transform =
          "translate(0, 0)";

      }
    );

  }


  /* ==============================
     SCROLL REVEAL
     ============================== */

  const revealElements =
    document.querySelectorAll(
      ".section-label, " +
      ".section-title, " +
      ".about-text, " +
      ".fact, " +
      ".skill-card, " +
      ".project, " +
      ".lab-item, " +
      ".contact h2, " +
      ".contact p"
    );


  revealElements.forEach((element) => {

    element.classList.add(
      "reveal-ready"
    );

  });


  const observer =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          entry.target.classList.add(
            "revealed"
          );


          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach((element) => {

    observer.observe(element);

  });


  /* ==============================
     MAGNETIC BUTTON
     ============================== */

  const buttons =
    document.querySelectorAll(".btn");


  if (
    window.matchMedia("(pointer: fine)").matches
  ) {

    buttons.forEach((button) => {

      button.addEventListener(
        "mousemove",
        (event) => {

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

        }
      );


      button.addEventListener(
        "mouseleave",
        () => {

          button.style.transform =
            "translate(0, 0)";

        }
      );

    });

  }


  /* ==============================
     PROJECT TILT
     ============================== */

  const projects =
    document.querySelectorAll(".project");


  if (
    window.matchMedia("(pointer: fine)").matches
  ) {

    projects.forEach((project) => {

      project.addEventListener(
        "mousemove",
        (event) => {

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
             scale(0.995)`;

        }
      );


      project.addEventListener(
        "mouseleave",
        () => {

          project.style.transform =
            "perspective(900px) rotateX(0) rotateY(0) scale(1)";

        }
      );

    });

  }


  /* ==============================
     SKILL CARD GLOW
     ============================== */

  const skillCards =
    document.querySelectorAll(
      ".skill-card"
    );


  if (
    window.matchMedia("(pointer: fine)").matches
  ) {

    skillCards.forEach((card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();


          const x =
            ((event.clientX - rect.left) /
              rect.width) *
            100;


          const y =
            ((event.clientY - rect.top) /
              rect.height) *
            100;


          card.style.background =
            `radial-gradient(
              circle at ${x}% ${y}%,
              rgba(212,175,55,0.12),
              rgba(255,255,255,0.025) 40%,
              rgba(255,255,255,0.01)
            )`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.background =
            "linear-gradient(145deg, rgba(255,255,255,0.055), rgba(255,255,255,0.01))";

        }
      );

    });

  }


  /* ==============================
     ACTIVE NAV LINK
     ============================== */

  const sections =
    document.querySelectorAll(
      "section[id]"
    );


  const navLinks =
    document.querySelectorAll(
      ".nav-links a"
    );


  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          const id =
            entry.target.getAttribute(
              "id"
            );


          navLinks.forEach((link) => {

            link.classList.remove(
              "active"
            );


            if (
              link.getAttribute(
                "href"
              ) === `#${id}`
            ) {

              link.classList.add(
                "active"
              );

            }

          });

        });

      },
      {
        threshold: 0.45
      }
    );


  sections.forEach((section) => {

    sectionObserver.observe(
      section
    );

  });


  /* ==============================
     CURRENT YEAR
     ============================== */

  const footer =
    document.querySelector("footer");


  if (footer) {

    footer.innerHTML =
      footer.innerHTML.replace(
        /©\s*\d{4}/,
        `© ${new Date().getFullYear()}`
      );

  }


  /* ==============================
     IMAGE LAZY LOADING
     ============================== */

  document
    .querySelectorAll("img")
    .forEach((image) => {

      if (
        !image.hasAttribute("loading")
      ) {

        image.setAttribute(
          "loading",
          "lazy"
        );

      }

    });


  /* ==============================
     PAGE READY
     ============================== */

  document.body.classList.add(
    "js-ready"
  );

});
