/* =========================================================
   SHAHNEIL KHAN — PORTFOLIO
   JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   DOM
   ========================================================= */

const body = document.body;

const navbar = document.querySelector(".navbar");

const menuToggle =
  document.getElementById("menuToggle");

const mobileMenu =
  document.getElementById("mobileMenu");

const mobileLinks =
  document.querySelectorAll(".mobile-menu a");

const cursor =
  document.querySelector(".cursor");

const sections =
  document.querySelectorAll("section[id]");

const navLinks =
  document.querySelectorAll(".nav-links a");


/* =========================================================
   MOBILE MENU
   ========================================================= */

function openMenu() {

  if (!menuToggle || !mobileMenu) return;

  mobileMenu.classList.add("active");

  menuToggle.setAttribute(
    "aria-expanded",
    "true"
  );

  body.classList.add("menu-open");

  /* Animate hamburger */

  const spans =
    menuToggle.querySelectorAll("span");

  if (spans.length === 3) {

    spans[0].style.transform =
      "translateY(6px) rotate(45deg)";

    spans[1].style.opacity = "0";

    spans[2].style.transform =
      "translateY(-6px) rotate(-45deg)";
  }
}


function closeMenu() {

  if (!menuToggle || !mobileMenu) return;

  mobileMenu.classList.remove("active");

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

  body.classList.remove("menu-open");

  /* Reset hamburger */

  const spans =
    menuToggle.querySelectorAll("span");

  if (spans.length === 3) {

    spans[0].style.transform =
      "translateY(0) rotate(0)";

    spans[1].style.opacity = "1";

    spans[2].style.transform =
      "translateY(0) rotate(0)";
  }
}


function toggleMenu() {

  if (!mobileMenu) return;

  if (
    mobileMenu.classList.contains("active")
  ) {

    closeMenu();

  } else {

    openMenu();
  }
}


if (menuToggle) {

  menuToggle.addEventListener(
    "click",
    toggleMenu
  );
}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
   ========================================================= */

mobileLinks.forEach((link) => {

  link.addEventListener(
    "click",
    () => {

      closeMenu();

    }
  );

});


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeMenu();

    }

  }
);


/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
  "click",
  (event) => {

    if (!mobileMenu || !menuToggle) return;

    const clickedInsideMenu =
      mobileMenu.contains(event.target);

    const clickedButton =
      menuToggle.contains(event.target);

    if (
      mobileMenu.classList.contains("active") &&
      !clickedInsideMenu &&
      !clickedButton
    ) {

      closeMenu();

    }

  }
);


/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

if (cursor) {

  let mouseX = 0;
  let mouseY = 0;

  let cursorX = 0;
  let cursorY = 0;


  document.addEventListener(
    "mousemove",
    (event) => {

      mouseX = event.clientX;
      mouseY = event.clientY;

    }
  );


  function animateCursor() {

    cursorX +=
      (mouseX - cursorX) * 0.18;

    cursorY +=
      (mouseY - cursorY) * 0.18;


    cursor.style.left =
      `${cursorX}px`;

    cursor.style.top =
      `${cursorY}px`;


    requestAnimationFrame(
      animateCursor
    );
  }


  animateCursor();


  /* Cursor hover effect */

  const hoverElements =
    document.querySelectorAll(
      "a, button, .skill-card, .project-card, .lab-item"
    );


  hoverElements.forEach(
    (element) => {

      element.addEventListener(
        "mouseenter",
        () => {

          cursor.style.width = "22px";
          cursor.style.height = "22px";

          cursor.style.background =
            "rgba(212,175,55,.15)";

          cursor.style.border =
            "1px solid #d4af37";

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          cursor.style.width = "8px";
          cursor.style.height = "8px";

          cursor.style.background =
            "#d4af37";

          cursor.style.border =
            "none";

        }
      );

    }
  );
}


/* =========================================================
   NAVBAR SCROLL EFFECT
   ========================================================= */

function handleNavbar() {

  if (!navbar) return;

  if (window.scrollY > 40) {

    navbar.style.background =
      "rgba(2,3,10,.88)";

    navbar.style.borderBottomColor =
      "rgba(212,175,55,.12)";

  } else {

    navbar.style.background =
      "rgba(2,3,10,.60)";

    navbar.style.borderBottomColor =
      "rgba(255,255,255,.06)";
  }
}


window.addEventListener(
  "scroll",
  handleNavbar,
  { passive: true }
);

handleNavbar();


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const observerOptions = {

  root: null,

  rootMargin:
    "-25% 0px -60% 0px",

  threshold: 0

};


const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach(
        (entry) => {

          if (!entry.isIntersecting) return;

          const currentId =
            entry.target.getAttribute("id");


          navLinks.forEach(
            (link) => {

              link.classList.remove(
                "active"
              );


              const href =
                link.getAttribute("href");


              if (
                href === `#${currentId}`
              ) {

                link.classList.add(
                  "active"
                );

              }

            }
          );

        }
      );

    },
    observerOptions
  );


sections.forEach(
  (section) => {

    sectionObserver.observe(section);

  }
);


/* =========================================================
   REVEAL ANIMATION
   ========================================================= */

const revealElements =
  document.querySelectorAll(
    ".section-label, .section-title, .about-grid, .skill-card, .project-card, .lab-item, .process-item, .contact h2, .contact p"
  );


revealElements.forEach(
  (element) => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(30px)";

    element.style.transition =
      "opacity .8s ease, transform .8s cubic-bezier(.2,.8,.2,1)";

  }
);


const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach(
        (entry) => {

          if (!entry.isIntersecting) return;


          entry.target.style.opacity =
            "1";

          entry.target.style.transform =
            "translateY(0)";


          observer.unobserve(
            entry.target
          );

        }
      );

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(
  (element) => {

    revealObserver.observe(element);

  }
);


/* =========================================================
   STAGGER CARD ANIMATION
   ========================================================= */

function addStagger(
  selector,
  delay = 100
) {

  const elements =
    document.querySelectorAll(selector);


  elements.forEach(
    (element, index) => {

      element.style.transitionDelay =
        `${index * delay}ms`;

    }
  );
}


addStagger(".skill-card", 100);

addStagger(".project-card", 120);

addStagger(".lab-item", 60);

addStagger(".process-item", 120);


/* =========================================================
   HERO PARALLAX
   ========================================================= */

const heroBackground =
  document.querySelector(
    ".hero-background"
  );


if (
  heroBackground &&
  window.matchMedia(
    "(min-width: 801px)"
  ).matches
) {

  window.addEventListener(
    "scroll",
    () => {

      const scroll =
        window.scrollY;


      if (scroll < window.innerHeight) {

        heroBackground.style.transform =
          `translateY(${scroll * 0.12}px)`;

      }

    },
    { passive: true }
  );

}


/* =========================================================
   HERO MOUSE MOVEMENT
   ========================================================= */

const hero =
  document.querySelector(".hero");

const galaxy =
  document.querySelector(".galaxy-bg");


if (
  hero &&
  galaxy &&
  window.matchMedia(
    "(min-width: 801px)"
  ).matches
) {

  hero.addEventListener(
    "mousemove",
    (event) => {

      const rect =
        hero.getBoundingClientRect();


      const x =
        (event.clientX - rect.left)
        / rect.width
        - 0.5;


      const y =
        (event.clientY - rect.top)
        / rect.height
        - 0.5;


      galaxy.style.transform =
        `translate(${x * 18}px, ${y * 18}px)`;

    }
  );


  hero.addEventListener(
    "mouseleave",
    () => {

      galaxy.style.transform =
        "translate(0,0)";

    }
  );

}


/* =========================================================
   PROJECT CARD TILT
   ========================================================= */

const projectCards =
  document.querySelectorAll(
    ".project-card"
  );


if (
  window.matchMedia(
    "(min-width: 901px)"
  ).matches
) {

  projectCards.forEach(
    (card) => {

      card.addEventListener(
        "mousemove",
        (event) => {

          const rect =
            card.getBoundingClientRect();


          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;


          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;


          const rotateX =
            ((y - centerY) / centerY)
            * -3;


          const rotateY =
            ((x - centerX) / centerX)
            * 3;


          card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "";

        }
      );

    }
  );

}


/* =========================================================
   CURRENT YEAR
   ========================================================= */

const footerYear =
  document.querySelector(
    "footer"
  );


if (footerYear) {

  footerYear.innerHTML =
    footerYear.innerHTML.replace(
      /©\s*2026/,
      `© ${new Date().getFullYear()}`
    );

}


/* =========================================================
   IMAGE LOAD EFFECT
   ========================================================= */

const images =
  document.querySelectorAll(
    "img"
  );


images.forEach(
  (image) => {

    image.addEventListener(
      "load",
      () => {

        image.classList.add(
          "loaded"
        );

      }
    );

  }
);


/* =========================================================
   RESIZE
   ========================================================= */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth > 700
    ) {

      closeMenu();

    }

  }
);


/* =========================================================
   CONSOLE MESSAGE
   ========================================================= */

console.log(
  "%c Shahneil Khan ",
  "background:#d4af37;color:#050505;font-size:18px;font-weight:bold;padding:8px 14px;border-radius:5px;"
);

console.log(
  "Software Engineer • Web Developer • UI/UX Designer"
);
