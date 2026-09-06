/* =========================================================
   SHAH NEIL KHAN — V3
   PREMIUM INTERACTION ENGINE
========================================================= */

(() => {
  "use strict";

  /* =======================================================
     CONFIG
  ======================================================= */

  const CONFIG = {
    storage: {
      theme: "snk-theme",
      language: "snk-language",
      rain: "snk-rain",
      color: "snk-color"
    },

    colors: [
      "#c98b4d",
      "#e0ad70",
      "#b9783e",
      "#b88f72",
      "#8eaf8e",
      "#9c8fbe",
      "#c98b4d"
    ],

    typingSpeed: 32,

    birdDelayMin: 6000,
    birdDelayMax: 16000
  };


  /* =======================================================
     DOM HELPERS
  ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const root = document.documentElement;
  const body = document.body;


  /* =======================================================
     REDUCED MOTION
  ======================================================= */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =======================================================
     LOCAL STORAGE SAFE
  ======================================================= */

  const storageGet = (key, fallback = null) => {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const storageSet = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  };


  /* =======================================================
     THEME
  ======================================================= */

  const themeButton =
    $("#themeToggle") ||
    $("[data-theme-toggle]") ||
    $('[aria-label*="theme" i]');

  function getInitialTheme() {
    const saved = storageGet(CONFIG.storage.theme);

    if (saved === "dark" || saved === "light") {
      return saved;
    }

    return window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches
      ? "light"
      : "dark";
  }

  function setTheme(theme) {
    const finalTheme =
      theme === "light"
        ? "light"
        : "dark";

    root.dataset.theme = finalTheme;

    storageSet(
      CONFIG.storage.theme,
      finalTheme
    );

    if (themeButton) {
      themeButton.classList.toggle(
        "active",
        finalTheme === "light"
      );

      themeButton.setAttribute(
        "aria-pressed",
        finalTheme === "light"
          ? "true"
          : "false"
      );

      themeButton.textContent =
        finalTheme === "light"
          ? "DARK"
          : "LIGHT";
    }
  }

  setTheme(getInitialTheme());

  if (themeButton) {
    themeButton.addEventListener(
      "click",
      () => {
        setTheme(
          root.dataset.theme === "dark"
            ? "light"
            : "dark"
        );
      }
    );
  }


  /* =======================================================
     AUTO COLOR ENGINE
  ======================================================= */

  let colorIndex = 0;
  let colorTimer = null;

  function hexToRgb(hex) {
    const clean = hex.replace("#", "");

    const value =
      clean.length === 3
        ? clean
            .split("")
            .map(x => x + x)
            .join("")
        : clean;

    const number =
      parseInt(value, 16);

    return {
      r: (number >> 16) & 255,
      g: (number >> 8) & 255,
      b: number & 255
    };
  }

  function rgba(hex, alpha) {
    const { r, g, b } =
      hexToRgb(hex);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function applyAutoColor(color) {
    root.style.setProperty(
      "--snk-auto",
      color
    );

    root.style.setProperty(
      "--snk-auto-soft",
      rgba(color, 0.16)
    );

    root.style.setProperty(
      "--snk-auto-glow",
      rgba(color, 0.10)
    );

    storageSet(
      CONFIG.storage.color,
      color
    );

    document
      .dispatchEvent(
        new CustomEvent(
          "snk:color-change",
          {
            detail: { color }
          }
        )
      );
  }

  function nextColor() {
    colorIndex =
      (colorIndex + 1) %
      CONFIG.colors.length;

    applyAutoColor(
      CONFIG.colors[colorIndex]
    );
  }

  function startAutoColor() {
    const savedColor =
      storageGet(
        CONFIG.storage.color
      );

    if (
      savedColor &&
      CONFIG.colors.includes(savedColor)
    ) {
      colorIndex =
        CONFIG.colors.indexOf(
          savedColor
        );

      applyAutoColor(savedColor);
    } else {
      applyAutoColor(
        CONFIG.colors[0]
      );
    }

    clearInterval(colorTimer);

    colorTimer = setInterval(
      nextColor,
      6500
    );
  }

  startAutoColor();


  /* =======================================================
     HEADER SCROLL
  ======================================================= */

  const header =
    $(".site-header");

  function updateHeader() {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 35
    );
  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    {
      passive: true
    }
  );


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const menuToggle =
    $(".menu-toggle");

  const nav =
    $(".main-nav");

  function closeMenu() {
    if (!nav) return;

    nav.classList.remove(
      "is-open"
    );

    if (menuToggle) {
      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );
    }
  }

  if (menuToggle && nav) {
    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.addEventListener(
      "click",
      () => {
        const open =
          nav.classList.toggle(
            "is-open"
          );

        menuToggle.setAttribute(
          "aria-expanded",
          open
            ? "true"
            : "false"
        );
      }
    );

    $$(".main-nav a").forEach(link => {
      link.addEventListener(
        "click",
        closeMenu
      );
    });

    document.addEventListener(
      "click",
      event => {
        if (
          !nav.contains(event.target) &&
          !menuToggle.contains(
            event.target
          )
        ) {
          closeMenu();
        }
      }
    );
  }


  /* =======================================================
     SMOOTH INTERNAL LINKS
  ======================================================= */

  $$('a[href^="#"]').forEach(
    link => {
      link.addEventListener(
        "click",
        event => {
          const id =
            link.getAttribute(
              "href"
            );

          if (
            !id ||
            id === "#"
          ) {
            return;
          }

          const target =
            $(id);

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior:
              prefersReducedMotion
                ? "auto"
                : "smooth",
            block: "start"
          });

          history.replaceState(
            null,
            "",
            id
          );
        }
      );
    }
  );


  /* =======================================================
     ACTIVE NAV
  ======================================================= */

  const sections =
    $$("section[id]");

  const navLinks =
    $$(".main-nav a[href*='#']");

  if (
    sections.length &&
    navLinks.length
  ) {
    const sectionObserver =
      new IntersectionObserver(
        entries => {
          entries.forEach(
            entry => {
              if (!entry.isIntersecting) {
                return;
              }

              const id =
                entry.target.id;

              navLinks.forEach(
                link => {
                  const href =
                    link.getAttribute(
                      "href"
                    );

                  link.classList.toggle(
                    "active",
                    href.endsWith(
                      `#${id}`
                    )
                  );
                }
              );
            }
          );
        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );

    sections.forEach(
      section =>
        sectionObserver.observe(
          section
        )
    );
  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealItems =
    $$(".reveal");

  if (
    prefersReducedMotion
  ) {
    revealItems.forEach(
      item =>
        item.classList.add(
          "is-visible"
        )
    );
  } else if (
    "IntersectionObserver" in window
  ) {
    const revealObserver =
      new IntersectionObserver(
        entries => {
          entries.forEach(
            entry => {
              if (
                !entry.isIntersecting
              ) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              revealObserver.unobserve(
                entry.target
              );
            }
          );
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -50px 0px"
        }
      );

    revealItems.forEach(
      item =>
        revealObserver.observe(
          item
        )
    );
  } else {
    revealItems.forEach(
      item =>
        item.classList.add(
          "is-visible"
        )
    );
  }


  /* =======================================================
     HERO IMAGE LOAD
  ======================================================= */

  const hero =
    $(".hero");

  const heroImage =
    $(".hero-visual img");

  if (hero) {
    if (
      heroImage &&
      !heroImage.complete
    ) {
      heroImage.addEventListener(
        "load",
        () => {
          hero.classList.add(
            "is-loaded"
          );
        }
      );

      heroImage.addEventListener(
        "error",
        () => {
          hero.classList.add(
            "is-loaded"
          );
        }
      );
    } else {
      requestAnimationFrame(
        () =>
          hero.classList.add(
            "is-loaded"
          )
      );
    }
  }


  /* =======================================================
     LIVE CODING TERMINAL
  ======================================================= */

  const terminal =
    $(".hero-terminal");

  const terminalLines =
    terminal
      ? $$(".terminal-line", terminal)
      : [];

  const codeSequences = [
    [
      "$ snk.engine.start()",
      "→ initializing intelligence...",
      "✓ context ready",
      "✓ memory connected",
      "✓ tools connected",
      "> system.ready()"
    ],

    [
      "$ build({ intelligence: AI })",
      "→ understanding context...",
      "→ retrieving knowledge...",
      "→ validating output...",
      "✓ useful intelligence",
      "> build.complete()"
    ],

    [
      "$ experience.build()",
      "→ software",
      "→ AI",
      "→ UX",
      "→ systems",
      "✓ experience ready"
    ],

    [
      "$ mind.learn({ curiosity: true })",
      "→ observe",
      "→ question",
      "→ understand",
      "→ improve",
      "> growth.loop()"
    ]
  ];

  let terminalSequence = 0;
  let terminalRunning = false;

  async function sleep(ms) {
    return new Promise(
      resolve =>
        setTimeout(
          resolve,
          ms
        )
    );
  }

  async function typeLine(
    element,
    text
  ) {
    if (!element) return;

    if (
      prefersReducedMotion
    ) {
      element.textContent =
        text;

      return;
    }

    element.textContent = "";

    for (
      let i = 0;
      i < text.length;
      i++
    ) {
      element.textContent +=
        text[i];

      await sleep(
        CONFIG.typingSpeed
      );
    }
  }

  async function runTerminal() {
    if (
      !terminal ||
      terminalRunning
    ) {
      return;
    }

    terminalRunning = true;

    while (
      document.body.contains(
        terminal
      )
    ) {
      const sequence =
        codeSequences[
          terminalSequence
        ];

      terminalSequence =
        (terminalSequence + 1) %
        codeSequences.length;

      terminalLines.forEach(
        line => {
          line.textContent = "";
        }
      );

      for (
        let i = 0;
        i < sequence.length &&
        i < terminalLines.length;
        i++
      ) {
        await typeLine(
          terminalLines[i],
          sequence[i]
        );

        await sleep(
          prefersReducedMotion
            ? 150
            : 260
        );
      }

      await sleep(
        prefersReducedMotion
          ? 800
          : 2200
      );
    }

    terminalRunning = false;
  }

  if (terminal) {
    runTerminal();
  }


  /* =======================================================
     RAIN ENGINE
  ======================================================= */

  const rainCanvas =
    $("#rainCanvas");

  const rainButton =
    $("#rainToggle") ||
    $("[data-rain-toggle]");

  let rainEnabled =
    storageGet(
      CONFIG.storage.rain,
      "false"
    ) === "true";

  let rainAnimation = null;

  if (prefersReducedMotion) {
    rainEnabled = false;
  }

  const rain =
    rainCanvas
      ? {
          canvas: rainCanvas,
          ctx:
            rainCanvas.getContext(
              "2d"
            ),
          drops: [],
          width: 0,
          height: 0,
          dpr:
            Math.min(
              window.devicePixelRatio ||
                1,
              2
            )
        }
      : null;

  function resizeRain() {
    if (!rain) return;

    rain.width =
      window.innerWidth;

    rain.height =
      window.innerHeight;

    rain.canvas.width =
      rain.width *
      rain.dpr;

    rain.canvas.height =
      rain.height *
      rain.dpr;

    rain.canvas.style.width =
      `${rain.width}px`;

    rain.canvas.style.height =
      `${rain.height}px`;

    rain.ctx.setTransform(
      rain.dpr,
      0,
      0,
      rain.dpr,
      0,
      0
    );

    const count =
      Math.min(
        240,
        Math.floor(
          rain.width / 5
        )
      );

    rain.drops =
      Array.from(
        {
          length: count
        },
        () => ({
          x:
            Math.random() *
            rain.width,

          y:
            Math.random() *
            rain.height,

          length:
            7 +
            Math.random() * 18,

          speed:
            7 +
            Math.random() * 10,

          opacity:
            .08 +
            Math.random() * .18
        })
      );
  }

  function drawRain() {
    if (
      !rain ||
      !rainEnabled
    ) {
      return;
    }

    const ctx =
      rain.ctx;

    ctx.clearRect(
      0,
      0,
      rain.width,
      rain.height
    );

    ctx.lineWidth = 1;

    rain.drops.forEach(
      drop => {
        ctx.beginPath();

        ctx.strokeStyle =
          `rgba(220,225,220,${drop.opacity})`;

        ctx.moveTo(
          drop.x,
          drop.y
        );

        ctx.lineTo(
          drop.x - 1,
          drop.y +
            drop.length
        );

        ctx.stroke();

        drop.y +=
          drop.speed;

        drop.x -= .35;

        if (
          drop.y >
          rain.height
        ) {
          drop.y =
            -drop.length;

          drop.x =
            Math.random() *
            rain.width;
        }

        if (
          drop.x < -20
        ) {
          drop.x =
            rain.width + 10;
        }
      }
    );

    rainAnimation =
      requestAnimationFrame(
        drawRain
      );
  }

  function stopRain() {
    if (
      rainAnimation
    ) {
      cancelAnimationFrame(
        rainAnimation
      );

      rainAnimation = null;
    }

    if (rain) {
      rain.ctx.clearRect(
        0,
        0,
        rain.width,
        rain.height
      );
    }

    body.classList.remove(
      "rain-active"
    );
  }

  function startRain() {
    if (
      !rain ||
      prefersReducedMotion
    ) {
      return;
    }

    resizeRain();

    body.classList.add(
      "rain-active"
    );

    cancelAnimationFrame(
      rainAnimation
    );

    drawRain();
  }

  function setRain(enabled) {
    rainEnabled =
      Boolean(enabled);

    storageSet(
      CONFIG.storage.rain,
      String(rainEnabled)
    );

    if (
      rainEnabled &&
      !prefersReducedMotion
    ) {
      startRain();
    } else {
      stopRain();
    }

    if (rainButton) {
      rainButton.classList.toggle(
        "active",
        rainEnabled
      );

      rainButton.setAttribute(
        "aria-pressed",
        rainEnabled
          ? "true"
          : "false"
      );

      rainButton.textContent =
        rainEnabled
          ? "RAIN ON"
          : "RAIN";
    }
  }

  if (rain) {
    window.addEventListener(
      "resize",
      () => {
        if (rainEnabled) {
          resizeRain();
        }
      },
      {
        passive: true
      }
    );
  }

  if (rainButton) {
    rainButton.addEventListener(
      "click",
      () => {
        setRain(
          !rainEnabled
        );
      }
    );
  }

  setRain(rainEnabled);


  /* =======================================================
     FLYING BIRD ENGINE
  ======================================================= */

  const birdLayer =
    $(".bird-layer");

  function randomBetween(
    min,
    max
  ) {
    return (
      Math.random() *
        (max - min) +
      min
    );
  }

  function createBird() {
    if (
      !birdLayer ||
      prefersReducedMotion
    ) {
      return;
    }

    const bird =
      document.createElement(
        "div"
      );

    bird.className =
      "bird";

    const top =
      randomBetween(
        8,
        45
      );

    const scale =
      randomBetween(
        .55,
        1.15
      );

    const duration =
      randomBetween(
        12,
        22
      );

    bird.style.top =
      `${top}%`;

    bird.style.animationDuration =
      `${duration}s`;

    bird.style.transform =
      `scale(${scale})`;

    birdLayer.appendChild(
      bird
    );

    setTimeout(
      () => {
        bird.remove();
      },
      (duration + 1) * 1000
    );
  }

  function scheduleBird() {
    if (
      prefersReducedMotion
    ) {
      return;
    }

    const delay =
      randomBetween(
        CONFIG.birdDelayMin,
        CONFIG.birdDelayMax
      );

    setTimeout(
      () => {
        createBird();

        scheduleBird();
      },
      delay
    );
  }

  if (
    birdLayer &&
    !prefersReducedMotion
  ) {
    setTimeout(
      createBird,
      2500
    );

    scheduleBird();
  }


  /* =======================================================
     MAGNETIC BUTTONS
  ======================================================= */

  const magneticButtons =
    $$(".magnetic, .btn");

  if (
    !prefersReducedMotion
  ) {
    magneticButtons.forEach(
      button => {
        button.addEventListener(
          "mousemove",
          event => {
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
              `translate(${x * .10}px, ${y * .10}px)`;
          }
        );

        button.addEventListener(
          "mouseleave",
          () => {
            button.style.transform =
              "";
          }
        );
      }
    );
  }


  /* =======================================================
     CARD TILT
  ======================================================= */

  const tiltCards =
    $$(".snk-brand-card, .ai-card");

  if (
    !prefersReducedMotion
  ) {
    tiltCards.forEach(
      card => {
        card.addEventListener(
          "mousemove",
          event => {
            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left;

            const y =
              event.clientY -
              rect.top;

            const rotateX =
              ((y -
                rect.height / 2) /
                rect.height) *
              -3;

            const rotateY =
              ((x -
                rect.width / 2) /
                rect.width) *
              3;

            card.style.transform =
              `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-7px)`;
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


  /* =======================================================
     HERO PARALLAX
  ======================================================= */

  const heroVisual =
    $(".hero-visual");

  if (
    heroVisual &&
    !prefersReducedMotion
  ) {
    window.addEventListener(
      "mousemove",
      event => {
        const x =
          (event.clientX /
            window.innerWidth -
            .5) *
          2;

        const y =
          (event.clientY /
            window.innerHeight -
            .5) *
          2;

        heroVisual.style.transform =
          `translate3d(${x * -8}px, ${y * -5}px, 0)`;
      },
      {
        passive: true
      }
    );
  }


  /* =======================================================
     EXTERNAL LINKS
  ======================================================= */

  $$(
    'a[href^="http://"], a[href^="https://"]'
  ).forEach(
    link => {
      const href =
        link.getAttribute(
          "href"
        );

      if (
        !href ||
        href.startsWith(
          "javascript:"
        )
      ) {
        return;
      }

      link.target = "_blank";

      link.rel =
        "noopener noreferrer";
    }
  );


  /* =======================================================
     5 BRAND / ECOSYSTEM LINKS
     
     Update these only if your URLs differ.
  ======================================================= */

  const BRAND_LINKS = {
    websitesdeal:
      "https://websitesdeal.com/",

    tabayyun:
      "https://www.tabayyuninstitute.com/",

    snkInstitute:
      "#",

    sarakat:
      "#",

    snkDesign:
      "#"
  };

  function bindBrandLink(
    selector,
    url
  ) {
    if (
      !url ||
      url === "#"
    ) {
      return;
    }

    const elements =
      $$(selector);

    elements.forEach(
      element => {
        element.href = url;

        element.target =
          "_blank";

        element.rel =
          "noopener noreferrer";
      }
    );
  }

  bindBrandLink(
    '[data-brand="websitesdeal"]',
    BRAND_LINKS.websitesdeal
  );

  bindBrandLink(
    '[data-brand="tabayyun"]',
    BRAND_LINKS.tabayyun
  );

  bindBrandLink(
    '[data-brand="snk-institute"]',
    BRAND_LINKS.snkInstitute
  );

  bindBrandLink(
    '[data-brand="sarakat"]',
    BRAND_LINKS.sarakat
  );

  bindBrandLink(
    '[data-brand="snk-design"]',
    BRAND_LINKS.snkDesign
  );


  /* =======================================================
     LANGUAGE ENGINE
  ======================================================= */

  const languageButton =
    $("#languageToggle") ||
    $("[data-language-toggle]");

  const translations = {
    en: {
      home: "Home",
      work: "Work",
      ai: "AI",
      expertise: "Expertise",
      experience: "Experience",
      about: "About",
      brand: "Brand",
      contact: "Contact",

      heroKicker:
        "SOFTWARE / AI / EXPERIENCE",

      heroTitle:
        "I BUILD SYSTEMS. I TRAIN MINDS. I CREATE IMPACT.",

      heroDescription:
        "Software, artificial intelligence, UX and thoughtful digital experiences — connected through one personal ecosystem.",

      selectedWork:
        "SELECTED WORK",

      aiTitle:
        "AI THAT UNDERSTANDS CONTEXT.",

      mindsetTitle:
        "I DON'T JUST BUILD. I THINK FIRST.",

      expertiseTitle:
        "WHAT I BRING TO THE TABLE",

      experienceTitle:
        "WHERE I'VE BUILT & CONTRIBUTED",

      aboutTitle:
        "I BUILD WITH CURIOSITY, ENGINEERING DISCIPLINE, AND PURPOSE.",

      contactTitle:
        "HAVE AN IDEA? LET'S BUILD IT."
    },

    bn: {
      home: "হোম",
      work: "কাজ",
      ai: "এআই",
      expertise: "দক্ষতা",
      experience: "অভিজ্ঞতা",
      about: "আমার সম্পর্কে",
      brand: "ব্র্যান্ড",
      contact: "যোগাযোগ",

      heroKicker:
        "সফটওয়্যার / এআই / এক্সপেরিয়েন্স",

      heroTitle:
        "আমি সিস্টেম তৈরি করি। মনকে প্রশিক্ষণ দিই। প্রভাব তৈরি করি।",

      heroDescription:
        "সফটওয়্যার, কৃত্রিম বুদ্ধিমত্তা, UX এবং চিন্তাশীল ডিজিটাল এক্সপেরিয়েন্স—একটি ব্যক্তিগত ইকোসিস্টেমের মাধ্যমে সংযুক্ত।",

      selectedWork:
        "নির্বাচিত কাজ",

      aiTitle:
        "এআই, যা কনটেক্সট বোঝে।",

      mindsetTitle:
        "আমি শুধু তৈরি করি না। আগে চিন্তা করি।",

      expertiseTitle:
        "আমি যা নিয়ে আসি",

      experienceTitle:
        "যেখানে আমি কাজ করেছি ও অবদান রেখেছি",

      aboutTitle:
        "কৌতূহল, ইঞ্জিনিয়ারিং ডিসিপ্লিন এবং উদ্দেশ্য নিয়ে আমি তৈরি করি।",

      contactTitle:
        "কোনো আইডিয়া আছে? চলুন তৈরি করি।"
    }
  };

  function translateElement(
    element,
    key,
    language
  ) {
    if (
      !element ||
      !translations[language] ||
      !translations[language][key]
    ) {
      return;
    }

    element.textContent =
      translations[language][key];
  }

  function applyLanguage(
    language
  ) {
    const lang =
      language === "bn"
        ? "bn"
        : "en";

    root.dataset.language =
      lang;

    document.documentElement.lang =
      lang === "bn"
        ? "bn"
        : "en";

    storageSet(
      CONFIG.storage.language,
      lang
    );

    if (languageButton) {
      languageButton.classList.toggle(
        "active",
        lang === "bn"
      );

      languageButton.setAttribute(
        "aria-pressed",
        lang === "bn"
          ? "true"
          : "false"
      );

      languageButton.textContent =
        lang === "bn"
          ? "EN"
          : "বাংলা";
    }

    $$("[data-i18n]").forEach(
      element => {
        const key =
          element.dataset.i18n;

        translateElement(
          element,
          key,
          lang
        );
      }
    );
  }

  const savedLanguage =
    storageGet(
      CONFIG.storage.language,
      "en"
    );

  applyLanguage(
    savedLanguage
  );

  if (languageButton) {
    languageButton.addEventListener(
      "click",
      () => {
        applyLanguage(
          root.dataset.language === "en"
            ? "bn"
            : "en"
        );
      }
    );
  }


  /* =======================================================
     KEYBOARD ACCESSIBILITY
  ======================================================= */

  document.addEventListener(
    "keydown",
    event => {
      if (
        event.key === "Escape"
      ) {
        closeMenu();
      }
    }
  );


  /* =======================================================
     IMAGE ERROR HANDLING
  ======================================================= */

  $$("img").forEach(
    image => {
      image.addEventListener(
        "error",
        () => {
          image.classList.add(
            "image-error"
          );
        }
      );
    }
  );


  /* =======================================================
     CONTACT FORM
  ======================================================= */

  const contactForms =
    $$(
      "form[data-contact-form]"
    );

  contactForms.forEach(
    form => {
      form.addEventListener(
        "submit",
        event => {
          const action =
            form.getAttribute(
              "action"
            );

          /*
             If no backend/form endpoint
             exists, prevent fake submission.
          */

          if (
            !action ||
            action === "#" ||
            action === ""
          ) {
            event.preventDefault();

            const button =
              form.querySelector(
                'button[type="submit"]'
              );

            if (button) {
              const original =
                button.textContent;

              button.textContent =
                "ADD CONTACT ENDPOINT →";

              button.disabled = true;

              setTimeout(
                () => {
                  button.textContent =
                    original;

                  button.disabled =
                    false;
                },
                2200
              );
            }
          }
        }
      );
    }
  );


  /* =======================================================
     TABAYYUN EXTERNAL PLATFORM
  ======================================================= */

  $$(
    '[data-tabayyun-link]'
  ).forEach(
    link => {
      link.href =
        "https://www.tabayyuninstitute.com/";

      link.target =
        "_blank";

      link.rel =
        "noopener noreferrer";
    }
  );


  /* =======================================================
     CURRENT YEAR
  ======================================================= */

  $$(
    "[data-current-year]"
  ).forEach(
    element => {
      element.textContent =
        new Date().getFullYear();
    }
  );

  const year =
    $("#year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  /* =======================================================
     CUSTOM EVENT — COLOR CHANGE
  ======================================================= */

  document.addEventListener(
    "snk:color-change",
    event => {
      const color =
        event.detail.color;

      $$(
        "[data-auto-color]"
      ).forEach(
        element => {
          element.style.color =
            color;
        }
      );
    }
  );


  /* =======================================================
     PAGE VISIBILITY
     
     Save CPU when tab is hidden.
  ======================================================= */

  document.addEventListener(
    "visibilitychange",
    () => {
      if (
        document.hidden
      ) {
        if (rainAnimation) {
          cancelAnimationFrame(
            rainAnimation
          );

          rainAnimation = null;
        }
      } else if (
        rainEnabled &&
        !prefersReducedMotion
      ) {
        drawRain();
      }
    }
  );


  /* =======================================================
     RESIZE CLEANUP
  ======================================================= */

  window.addEventListener(
    "resize",
    () => {
      if (
        window.innerWidth > 900
      ) {
        closeMenu();
      }
    },
    {
      passive: true
    }
  );


  /* =======================================================
     DEBUG API
  ======================================================= */

  window.SNK = {
    version: "3.1",
    theme: {
      get:
        () =>
          root.dataset.theme,

      set:
        setTheme
    },

    language: {
      get:
        () =>
          root.dataset.language,

      set:
        applyLanguage
    },

    rain: {
      get:
        () =>
          rainEnabled,

      set:
        setRain
    },

    color: {
      get:
        () =>
          root.style.getPropertyValue(
            "--snk-auto"
          ),

      next:
        nextColor
    }
  };


  /* =======================================================
     READY
  ======================================================= */

  document.body.classList.add(
    "snk-ready"
  );

  document.dispatchEvent(
    new CustomEvent(
      "snk:ready"
    )
  );

})();
