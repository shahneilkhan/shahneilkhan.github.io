/* =========================================================
   SNK PERSONAL BRAND — FINAL SCRIPT.JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";


  /* =======================================================
     01. ELEMENTS
  ======================================================= */

  const html = document.documentElement;
  const body = document.body;

  const themeToggle =
    document.querySelector("[data-theme-toggle]");

  const languageToggle =
    document.querySelector("[data-language-toggle]");

  const rainToggle =
    document.querySelector("[data-rain-toggle]");

  const rainContainer =
    document.getElementById("rain");

  const birdsContainer =
    document.getElementById("birds");

  const terminalText =
    document.getElementById("terminalText");


  /* =======================================================
     02. THEME — DARK / LIGHT
  ======================================================= */

  const savedTheme =
    localStorage.getItem("snk-theme");

  if (savedTheme === "light") {
    html.classList.add("light");
  }

  function updateThemeButton() {
    if (!themeToggle) return;

    const isLight =
      html.classList.contains("light");

    themeToggle.textContent =
      isLight ? "☾" : "☼";

    themeToggle.setAttribute(
      "aria-label",
      isLight
        ? "Switch to dark mode"
        : "Switch to light mode"
    );
  }

  updateThemeButton();

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {

      html.classList.toggle("light");

      const isLight =
        html.classList.contains("light");

      localStorage.setItem(
        "snk-theme",
        isLight ? "light" : "dark"
      );

      updateThemeButton();
    });
  }


  /* =======================================================
     03. LANGUAGE — ENGLISH / BANGLA
  ======================================================= */

  const translations = {

    en: {
      navHome: "Home",
      navEcosystem: "Ecosystem",
      navAI: "AI",
      navExpertise: "Expertise",
      navExperience: "Experience",
      navAbout: "About",
      navBrand: "Brand",
      navContact: "Contact",

      heroEyebrow:
        "PERSONAL BRAND · DIGITAL EXPERIENCE · SYSTEMS THINKING",

      heroDescription:
        "UX thinking, digital experiences, AI-assisted systems and a growing ecosystem of ideas, products and brands.",

      explore:
        "Explore Ecosystem",

      experience:
        "My Experience"
    },

    bn: {
      navHome: "হোম",
      navEcosystem: "ইকোসিস্টেম",
      navAI: "এআই",
      navExpertise: "দক্ষতা",
      navExperience: "অভিজ্ঞতা",
      navAbout: "সম্পর্কে",
      navBrand: "ব্র্যান্ড",
      navContact: "যোগাযোগ",

      heroEyebrow:
        "পার্সোনাল ব্র্যান্ড · ডিজিটাল এক্সপেরিয়েন্স · সিস্টেমস থিংকিং",

      heroDescription:
        "UX চিন্তা, ডিজিটাল এক্সপেরিয়েন্স, AI-সহায়ক সিস্টেম এবং বিভিন্ন আইডিয়া, প্রোডাক্ট ও ব্র্যান্ডের একটি ক্রমবর্ধমান ইকোসিস্টেম।",

      explore:
        "ইকোসিস্টেম দেখুন",

      experience:
        "আমার অভিজ্ঞতা"
    }

  };


  let currentLanguage =
    localStorage.getItem("snk-language") || "en";


  function applyLanguage(language) {

    currentLanguage = language;

    localStorage.setItem(
      "snk-language",
      language
    );

    html.setAttribute(
      "lang",
      language === "bn" ? "bn" : "en"
    );


    /*
      Optional translation support.

      Any element with:
      data-i18n="key"

      will automatically receive
      the matching translation.
    */

    document
      .querySelectorAll("[data-i18n]")
      .forEach((element) => {

        const key =
          element.dataset.i18n;

        if (
          translations[language] &&
          translations[language][key]
        ) {
          element.textContent =
            translations[language][key];
        }

      });


    if (languageToggle) {
      languageToggle.textContent =
        language === "en"
          ? "বাংলা"
          : "EN";
    }

  }

  applyLanguage(currentLanguage);


  if (languageToggle) {

    languageToggle.addEventListener(
      "click",
      () => {

        const nextLanguage =
          currentLanguage === "en"
            ? "bn"
            : "en";

        applyLanguage(nextLanguage);

      }
    );

  }


  /* =======================================================
     04. TERMINAL TYPING
  ======================================================= */

  const terminalMessages = [
    "thinking_in_systems()",
    "designing_better_experiences()",
    "building_digital_ecosystems()",
    "learning_with_ai()",
    "creating_meaningful_impact()"
  ];

  let terminalMessageIndex = 0;
  let terminalCharacterIndex = 0;
  let terminalDeleting = false;

  function typeTerminal() {

    if (!terminalText) return;

    const message =
      terminalMessages[
        terminalMessageIndex
      ];

    if (!terminalDeleting) {

      terminalCharacterIndex++;

      terminalText.textContent =
        message.substring(
          0,
          terminalCharacterIndex
        );

      if (
        terminalCharacterIndex >=
        message.length
      ) {

        terminalDeleting = true;

        setTimeout(
          typeTerminal,
          1800
        );

        return;
      }

    } else {

      terminalCharacterIndex--;

      terminalText.textContent =
        message.substring(
          0,
          terminalCharacterIndex
        );

      if (
        terminalCharacterIndex <= 0
      ) {

        terminalDeleting = false;

        terminalMessageIndex =
          (terminalMessageIndex + 1) %
          terminalMessages.length;

      }

    }

    setTimeout(
      typeTerminal,
      terminalDeleting ? 35 : 70
    );
  }

  typeTerminal();


  /* =======================================================
     05. RAIN SYSTEM
  ======================================================= */

  let rainEnabled =
    localStorage.getItem("snk-rain") === "true";


  function random(min, max) {
    return Math.random() *
      (max - min) +
      min;
  }


  function createRain() {

    if (!rainContainer) return;

    rainContainer.innerHTML = "";

    const screenWidth =
      window.innerWidth;

    const dropCount =
      Math.min(
        170,
        Math.max(
          65,
          Math.floor(screenWidth / 8)
        )
      );


    for (
      let i = 0;
      i < dropCount;
      i++
    ) {

      const drop =
        document.createElement("span");

      drop.className =
        "rain-drop";

      drop.style.left =
        `${random(0, 100)}%`;

      drop.style.height =
        `${random(35, 95)}px`;

      drop.style.opacity =
        random(0.12, 0.42);

      drop.style.animationDuration =
        `${random(0.55, 1.25)}s`;

      drop.style.animationDelay =
        `${random(-2, 0)}s`;

      rainContainer.appendChild(drop);
    }

  }


  function updateRain() {

    if (!rainContainer) return;

    rainContainer.classList.toggle(
      "active",
      rainEnabled
    );

    if (rainToggle) {

      rainToggle.textContent =
        rainEnabled
          ? "Rain ✓"
          : "Rain";

      rainToggle.setAttribute(
        "aria-pressed",
        rainEnabled
          ? "true"
          : "false"
      );
    }

  }


  if (rainEnabled) {
    createRain();
  }

  updateRain();


  if (rainToggle) {

    rainToggle.addEventListener(
      "click",
      () => {

        rainEnabled =
          !rainEnabled;

        localStorage.setItem(
          "snk-rain",
          rainEnabled
        );

        if (rainEnabled) {
          createRain();
        }

        updateRain();

      }
    );

  }


  /* =======================================================
     06. FLYING BIRDS
  ======================================================= */

  function createBirds() {

    if (!birdsContainer) return;

    birdsContainer.innerHTML = "";

    const birdCount =
      window.innerWidth < 700
        ? 4
        : 7;


    for (
      let i = 0;
      i < birdCount;
      i++
    ) {

      const bird =
        document.createElement("span");

      bird.className =
        "bird";

      bird.style.top =
        `${random(8, 52)}%`;

      bird.style.left =
        `${random(-15, 75)}%`;

      bird.style.transform =
        `scale(${random(0.55, 1.1)})`;

      bird.style.animationDuration =
        `${random(18, 32)}s`;

      bird.style.animationDelay =
        `${random(-25, 0)}s`;

      birdsContainer.appendChild(bird);
    }

  }

  createBirds();


  /* =======================================================
     07. SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(
      (element) => {
        revealObserver.observe(element);
      }
    );

  } else {

    revealElements.forEach(
      (element) => {
        element.classList.add("visible");
      }
    );

  }


  /* =======================================================
     08. SMOOTH ANCHOR NAVIGATION
  ======================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              targetId
            );

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =======================================================
     09. ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".main-nav a"
    );


  if (
    "IntersectionObserver" in window
  ) {

    const navObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              const currentId =
                entry.target.id;


              navLinks.forEach(
                (link) => {

                  const linkTarget =
                    link.getAttribute(
                      "href"
                    );

                  link.classList.toggle(
                    "active",
                    linkTarget ===
                      `#${currentId}`
                  );

                }
              );

            }
          );

        },
        {
          threshold: 0.25,
          rootMargin:
            "-20% 0px -60% 0px"
        }
      );


    sections.forEach(
      (section) => {
        navObserver.observe(section);
      }
    );

  }


  /* =======================================================
     10. HEADER SCROLL EFFECT
  ======================================================= */

  let lastScrollY =
    window.scrollY;


  function handleHeaderScroll() {

    const header =
      document.querySelector(
        ".site-header"
      );

    if (!header) return;

    const currentScroll =
      window.scrollY;


    if (currentScroll > 30) {

      header.classList.add(
        "scrolled"
      );

    } else {

      header.classList.remove(
        "scrolled"
      );

    }


    lastScrollY =
      currentScroll;

  }


  window.addEventListener(
    "scroll",
    handleHeaderScroll,
    {
      passive: true
    }
  );

  handleHeaderScroll();


  /* =======================================================
     11. RAIN RESIZE
  ======================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(() => {

          if (rainEnabled) {
            createRain();
          }

          createBirds();

        }, 250);

    }
  );


  /* =======================================================
     12. CARD POINTER EFFECT
  ======================================================= */

  const cards =
    document.querySelectorAll(
      ".ecosystem-card, .social-card, .expertise-card"
    );


  cards.forEach((card) => {

    card.addEventListener(
      "pointermove",
      (event) => {

        if (
          window.innerWidth < 760
        ) {
          return;
        }

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left;

        const y =
          event.clientY -
          rect.top;

        const rotateX =
          ((y / rect.height) - 0.5) *
          -3;

        const rotateY =
          ((x / rect.width) - 0.5) *
          3;

        card.style.transform =
          `perspective(800px)
           rotateX(${rotateX}deg)
           rotateY(${rotateY}deg)
           translateY(-5px)`;

      }
    );


    card.addEventListener(
      "pointerleave",
      () => {

        card.style.transform = "";

      }
    );

  });


  /* =======================================================
     13. KEYBOARD ACCESSIBILITY
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      /*
        Press "T" to toggle theme.
        Avoid triggering while typing.
      */

      const activeElement =
        document.activeElement;

      const isTyping =
        activeElement &&
        (
          activeElement.tagName ===
            "INPUT" ||
          activeElement.tagName ===
            "TEXTAREA" ||
          activeElement.isContentEditable
        );


      if (
        event.key.toLowerCase() === "t" &&
        !isTyping &&
        themeToggle
      ) {

        themeToggle.click();

      }

    }
  );


  /* =======================================================
     14. CONSOLE BRAND MESSAGE
  ======================================================= */

  console.log(
    "%c SNK ",
    "background:#e6a35b;color:#080909;font-weight:800;padding:5px 9px;border-radius:5px;"
  );

  console.log(
    "Shah Neil Khan — Personal Brand"
  );

  console.log(
    "Build. Learn. Share."
  );

});
