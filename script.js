/* =========================================================
   SNK PORTFOLIO
   Shah Neil Khan
   FINAL V3.2 SCRIPT
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     BASIC HELPERS
     ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const root = document.documentElement;
  const body = document.body;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =========================================================
     DOM ELEMENTS
     ========================================================= */

  const header = $(".site-header");
  const themeToggle = $("#themeToggle");
  const languageToggle = $("#languageToggle");
  const rainToggle = $("#rainToggle");

  const terminalText =
    $("[data-terminal-text]") ||
    $(".terminal-text");

  const birdsContainer = $(".birds");

  let rainLayer = $(".rain-layer");


  /* =========================================================
     1. THEME SYSTEM
     ========================================================= */

  const THEME_KEY = "snk-theme";

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);

    if (saved === "light" || saved === "dark") {
      return saved;
    }

    return window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches
      ? "light"
      : "dark";
  }

  function updateThemeButton(theme) {
    if (!themeToggle) return;

    const icon =
      themeToggle.querySelector("[data-theme-icon]");

    if (icon) {
      icon.textContent =
        theme === "dark" ? "☼" : "☾";
    }

    themeToggle.setAttribute(
      "aria-label",
      theme === "dark"
        ? "Switch to light mode"
        : "Switch to dark mode"
    );

    themeToggle.setAttribute(
      "title",
      theme === "dark"
        ? "Light mode"
        : "Dark mode"
    );
  }

  function setTheme(theme) {
    const selected =
      theme === "light"
        ? "light"
        : "dark";

    root.setAttribute(
      "data-theme",
      selected
    );

    localStorage.setItem(
      THEME_KEY,
      selected
    );

    updateThemeButton(selected);
  }

  setTheme(getPreferredTheme());

  themeToggle?.addEventListener(
    "click",
    () => {
      const current =
        root.getAttribute("data-theme") ||
        "dark";

      setTheme(
        current === "dark"
          ? "light"
          : "dark"
      );
    }
  );


  /* =========================================================
     2. LANGUAGE SYSTEM
     ========================================================= */

  const LANGUAGE_KEY = "snk-language";

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

      heroKicker:
        "UX • AI • SYSTEMS • DIGITAL EXPERIENCE",

      heroTitle:
        "I BUILD SYSTEMS. I TRAIN MINDS. I CREATE IMPACT.",

      heroDescription:
        "A personal portfolio for work across UX, digital experience, AI-assisted systems, creative direction, and structured thinking.",

      ecosystemKicker:
        "01 / ECOSYSTEM",

      ecosystemTitle:
        "Ideas become platforms.",

      ecosystemDescription:
        "Explore the digital ecosystem around SNK.",

      aiKicker:
        "02 / AI + CONTEXT",

      aiTitle:
        "AI is only as good as the thinking behind it.",

      mindsetKicker:
        "03 / MINDSET",

      mindsetTitle:
        "Engineering mindset.",

      expertiseKicker:
        "04 / EXPERTISE",

      expertiseTitle:
        "What I work on.",

      experienceKicker:
        "05 / EXPERIENCE",

      experienceTitle:
        "Experience shapes the mind.",

      aboutKicker:
        "06 / ABOUT",

      aboutTitle:
        "Build with clarity. Think beyond the interface.",

      brandKicker:
        "07 / BRAND",

      brandTitle:
        "SNK is more than a logo.",

      contactKicker:
        "08 / CONTACT",

      contactTitle:
        "Let's build something meaningful.",

      footerText:
        "Designed and engineered with intention."
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

      heroKicker:
        "UX • AI • SYSTEMS • DIGITAL EXPERIENCE",

      heroTitle:
        "আমি সিস্টেম তৈরি করি। মনকে প্রশিক্ষণ দিই। প্রভাব তৈরি করি।",

      heroDescription:
        "UX, ডিজিটাল এক্সপেরিয়েন্স, AI-assisted systems, creative direction এবং structured thinking নিয়ে আমার কাজের একটি ব্যক্তিগত পোর্টফোলিও।",

      ecosystemKicker:
        "০১ / ইকোসিস্টেম",

      ecosystemTitle:
        "আইডিয়া থেকে প্ল্যাটফর্ম।",

      ecosystemDescription:
        "SNK-এর ডিজিটাল ইকোসিস্টেমের বিভিন্ন অংশ দেখুন।",

      aiKicker:
        "০২ / AI + CONTEXT",

      aiTitle:
        "AI যতটা ভালো, তার পেছনের চিন্তাও ততটাই গুরুত্বপূর্ণ।",

      mindsetKicker:
        "০৩ / MINDSET",

      mindsetTitle:
        "ইঞ্জিনিয়ারিং মাইন্ডসেট।",

      expertiseKicker:
        "০৪ / EXPERTISE",

      expertiseTitle:
        "আমি যেসব বিষয়ে কাজ করি।",

      experienceKicker:
        "০৫ / EXPERIENCE",

      experienceTitle:
        "অভিজ্ঞতা চিন্তাভাবনাকে তৈরি করে।",

      aboutKicker:
        "০৬ / ABOUT",

      aboutTitle:
        "স্বচ্ছতা দিয়ে তৈরি করুন। ইন্টারফেসের বাইরে চিন্তা করুন।",

      brandKicker:
        "০৭ / BRAND",

      brandTitle:
        "SNK শুধু একটি লোগো নয়।",

      contactKicker:
        "০৮ / CONTACT",

      contactTitle:
        "চলুন অর্থবহ কিছু তৈরি করি।",

      footerText:
        "উদ্দেশ্য ও চিন্তার সাথে ডিজাইন এবং ইঞ্জিনিয়ারিং।"
    }
  };

  function translateUsingDataAttributes(language) {
    const dictionary =
      translations[language];

    $$("[data-i18n]").forEach(
      (element) => {
        const key =
          element.dataset.i18n;

        if (
          key &&
          dictionary[key]
        ) {
          element.textContent =
            dictionary[key];
        }
      }
    );
  }

  function translateUsingClasses(language) {
    const dictionary =
      translations[language];

    const map = {
      ".nav-home": "navHome",
      ".nav-ecosystem": "navEcosystem",
      ".nav-ai": "navAI",
      ".nav-expertise": "navExpertise",
      ".nav-experience": "navExperience",
      ".nav-about": "navAbout",
      ".nav-brand": "navBrand",
      ".nav-contact": "navContact",

      ".hero-kicker": "heroKicker",
      ".hero-title": "heroTitle",
      ".hero-description": "heroDescription",

      ".ecosystem-kicker": "ecosystemKicker",
      ".ecosystem-title": "ecosystemTitle",
      ".ecosystem-description":
        "ecosystemDescription",

      ".ai-kicker": "aiKicker",
      ".ai-title": "aiTitle",

      ".mindset-kicker": "mindsetKicker",
      ".mindset-title": "mindsetTitle",

      ".expertise-kicker":
        "expertiseKicker",
      ".expertise-title":
        "expertiseTitle",

      ".experience-kicker":
        "experienceKicker",
      ".experience-title":
        "experienceTitle",

      ".about-kicker": "aboutKicker",
      ".about-title": "aboutTitle",

      ".brand-kicker": "brandKicker",
      ".brand-title": "brandTitle",

      ".contact-kicker":
        "contactKicker",
      ".contact-title":
        "contactTitle",

      ".footer-text": "footerText"
    };

    Object.entries(map).forEach(
      ([selector, key]) => {
        $$(selector).forEach(
          (element) => {
            if (dictionary[key]) {
              element.textContent =
                dictionary[key];
            }
          }
        );
      }
    );
  }

  function setLanguage(language) {
    const selected =
      language === "bn"
        ? "bn"
        : "en";

    root.setAttribute(
      "lang",
      selected
    );

    localStorage.setItem(
      LANGUAGE_KEY,
      selected
    );

    translateUsingDataAttributes(
      selected
    );

    translateUsingClasses(
      selected
    );

    if (languageToggle) {
      languageToggle.textContent =
        selected === "en"
          ? "বাংলা"
          : "EN";

      languageToggle.setAttribute(
        "aria-label",
        selected === "en"
          ? "Switch to Bengali"
          : "Switch to English"
      );

      languageToggle.setAttribute(
        "title",
        selected === "en"
          ? "বাংলা"
          : "English"
      );
    }
  }

  const savedLanguage =
    localStorage.getItem(
      LANGUAGE_KEY
    ) || "en";

  setLanguage(savedLanguage);

  languageToggle?.addEventListener(
    "click",
    () => {
      const current =
        root.getAttribute("lang") ||
        "en";

      setLanguage(
        current === "en"
          ? "bn"
          : "en"
      );
    }
  );


  /* =========================================================
     3. TERMINAL TYPING
     ========================================================= */

  const terminalMessages = [
    "thinking...",
    "designing...",
    "building...",
    "learning...",
    "creating...",
    "solving..."
  ];

  let terminalIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  let terminalTimer = null;

  function terminalLoop() {
    if (
      !terminalText ||
      reducedMotion
    ) {
      return;
    }

    const currentMessage =
      terminalMessages[
        terminalIndex
      ];

    if (!deleting) {
      characterIndex++;

      terminalText.textContent =
        currentMessage.slice(
          0,
          characterIndex
        );

      if (
        characterIndex >=
        currentMessage.length
      ) {
        deleting = true;

        terminalTimer =
          setTimeout(
            terminalLoop,
            1100
          );

        return;
      }

      terminalTimer =
        setTimeout(
          terminalLoop,
          70
        );

      return;
    }

    characterIndex--;

    terminalText.textContent =
      currentMessage.slice(
        0,
        characterIndex
      );

    if (characterIndex <= 0) {
      deleting = false;

      terminalIndex =
        (terminalIndex + 1) %
        terminalMessages.length;

      terminalTimer =
        setTimeout(
          terminalLoop,
          300
        );

      return;
    }

    terminalTimer =
      setTimeout(
        terminalLoop,
        40
      );
  }

  if (terminalText) {
    if (reducedMotion) {
      terminalText.textContent =
        terminalMessages[0];
    } else {
      terminalLoop();
    }
  }


  /* =========================================================
     4. RAIN EFFECT
     ========================================================= */

  const RAIN_KEY = "snk-rain";

  let rainEnabled =
    localStorage.getItem(
      RAIN_KEY
    ) === "true";

  function createRain() {
    removeRain();

    if (
      !rainEnabled ||
      reducedMotion
    ) {
      return;
    }

    rainLayer =
      document.createElement(
        "div"
      );

    rainLayer.className =
      "rain-layer";

    rainLayer.setAttribute(
      "aria-hidden",
      "true"
    );

    const fragment =
      document.createDocumentFragment();

    const count =
      window.innerWidth <= 640
        ? 55
        : 100;

    for (
      let i = 0;
      i < count;
      i++
    ) {
      const drop =
        document.createElement(
          "span"
        );

      drop.className =
        "rain-drop";

      drop.style.left =
        `${Math.random() * 100}%`;

      drop.style.animationDelay =
        `${Math.random() * 2.5}s`;

      drop.style.animationDuration =
        `${0.7 + Math.random() * 0.9}s`;

      drop.style.opacity =
        `${0.15 + Math.random() * 0.4}`;

      fragment.appendChild(drop);
    }

    rainLayer.appendChild(
      fragment
    );

    body.appendChild(
      rainLayer
    );
  }

  function removeRain() {
    if (rainLayer) {
      rainLayer.remove();
      rainLayer = null;
    }
  }

  function setRain(enabled) {
    rainEnabled =
      Boolean(enabled);

    localStorage.setItem(
      RAIN_KEY,
      String(rainEnabled)
    );

    body.classList.toggle(
      "rain-active",
      rainEnabled
    );

    if (rainEnabled) {
      createRain();
    } else {
      removeRain();
    }

    if (rainToggle) {
      rainToggle.setAttribute(
        "aria-pressed",
        String(rainEnabled)
      );

      rainToggle.setAttribute(
        "title",
        rainEnabled
          ? "Turn rain off"
          : "Turn rain on"
      );
    }
  }

  setRain(rainEnabled);

  rainToggle?.addEventListener(
    "click",
    () => {
      setRain(!rainEnabled);
    }
  );


  /* =========================================================
     5. FLYING BIRDS
     ========================================================= */

  function createBirds() {
    if (!birdsContainer) {
      return;
    }

    birdsContainer.innerHTML = "";

    if (reducedMotion) {
      return;
    }

    const count =
      window.innerWidth <= 640
        ? 2
        : 4;

    for (
      let i = 0;
      i < count;
      i++
    ) {
      const bird =
        document.createElement(
          "span"
        );

      bird.className =
        "bird";

      bird.style.top =
        `${12 + Math.random() * 45}%`;

      bird.style.left =
        `${-15 - Math.random() * 15}%`;

      bird.style.animationDelay =
        `${Math.random() * 8}s`;

      bird.style.animationDuration =
        `${12 + Math.random() * 8}s`;

      bird.style.transform =
        `scale(${0.55 + Math.random() * 0.45})`;

      birdsContainer.appendChild(
        bird
      );
    }
  }

  createBirds();


  /* =========================================================
     6. SCROLL REVEAL
     ========================================================= */

  const revealElements =
    $$(".reveal");

  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    revealElements.forEach(
      (element) => {
        element.classList.add(
          "is-visible"
        );
      }
    );
  } else {
    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(
            (entry) => {
              if (
                !entry.isIntersecting
              ) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );
            }
          );
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -45px 0px"
        }
      );

    revealElements.forEach(
      (element) => {
        revealObserver.observe(
          element
        );
      }
    );
  }


  /* =========================================================
     7. HEADER SCROLL EFFECT
     ========================================================= */

  function updateHeader() {
    if (!header) {
      return;
    }

    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 30
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


  /* =========================================================
     8. ACTIVE NAVIGATION
     ========================================================= */

  const navLinks =
    $$(".main-nav a[href^='#']");

  const sections =
    navLinks
      .map((link) => {
        const href =
          link.getAttribute(
            "href"
          );

        if (
          !href ||
          href === "#"
        ) {
          return null;
        }

        return document.querySelector(
          href
        );
      })
      .filter(Boolean);

  if (
    sections.length &&
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
                `#${entry.target.id}`;

              navLinks.forEach(
                (link) => {
                  link.classList.toggle(
                    "active",
                    link.getAttribute(
                      "href"
                    ) === currentId
                  );
                }
              );
            }
          );
        },
        {
          rootMargin:
            "-35% 0px -55% 0px",
          threshold: 0
        }
      );

    sections.forEach(
      (section) => {
        navObserver.observe(
          section
        );
      }
    );
  }


  /* =========================================================
     9. SMOOTH ANCHOR SCROLL
     ========================================================= */

  function headerHeight() {
    return header
      ? header.offsetHeight + 18
      : 18;
  }

  function scrollToTarget(
    target,
    updateUrl = true
  ) {
    if (!target) {
      return;
    }

    if (
      target.id === "home"
    ) {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion
          ? "auto"
          : "smooth"
      });

      if (updateUrl) {
        history.replaceState(
          null,
          "",
          "#home"
        );
      }

      return;
    }

    const targetTop =
      target.getBoundingClientRect()
        .top +
      window.scrollY -
      headerHeight();

    window.scrollTo({
      top: Math.max(
        0,
        targetTop
      ),
      behavior: reducedMotion
        ? "auto"
        : "smooth"
    });

    if (
      updateUrl &&
      target.id
    ) {
      history.replaceState(
        null,
        "",
        `#${target.id}`
      );
    }
  }

  $$('a[href^="#"]').forEach(
    (link) => {
      link.addEventListener(
        "click",
        (event) => {
          const href =
            link.getAttribute(
              "href"
            );

          if (
            !href ||
            href === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(
              href
            );

          if (!target) {
            return;
          }

          event.preventDefault();

          scrollToTarget(
            target
          );
        }
      );
    }
  );


  /* =========================================================
     10. DIRECT HASH HANDLING
     ========================================================= */

  function handleInitialHash() {
    const hash =
      window.location.hash;

    if (!hash) {
      return;
    }

    const target =
      document.querySelector(
        hash
      );

    if (!target) {
      return;
    }

    /*
     * Wait until layout/images
     * have settled.
     */
    setTimeout(
      () => {
        scrollToTarget(
          target,
          false
        );
      },
      100
    );
  }

  handleInitialHash();


  /* =========================================================
     11. CARD HOVER TILT
     ========================================================= */

  const tiltCards =
    $$(
      [
        ".ecosystem-card",
        ".expertise-card",
        ".mindset-card",
        ".social-card",
        ".brand-card"
      ].join(",")
    );

  const finePointer =
    window.matchMedia(
      "(pointer: fine)"
    ).matches;

  if (
    !reducedMotion &&
    finePointer
  ) {
    tiltCards.forEach(
      (card) => {
        card.addEventListener(
          "pointermove",
          (event) => {
            const rect =
              card.getBoundingClientRect();

            const x =
              event.clientX -
              rect.left;

            const y =
              event.clientY -
              rect.top;

            const rotateY =
              ((x / rect.width) -
                0.5) *
              4;

            const rotateX =
              ((y / rect.height) -
                0.5) *
              -4;

            card.style.transform =
              `perspective(900px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)
               translateY(-4px)`;
          }
        );

        card.addEventListener(
          "pointerleave",
          () => {
            card.style.transform =
              "";
          }
        );
      }
    );
  }


  /* =========================================================
     12. EXTERNAL LINK SAFETY
     ========================================================= */

  $$("a[href]").forEach(
    (link) => {
      const href =
        link.getAttribute(
          "href"
        );

      if (!href) {
        return;
      }

      const external =
        /^https?:\/\//i.test(
          href
        ) &&
        !href.includes(
          window.location.hostname
        );

      if (external) {
        link.setAttribute(
          "target",
          "_blank"
        );

        link.setAttribute(
          "rel",
          "noopener noreferrer"
        );
      }
    }
  );


  /* =========================================================
     13. KEYBOARD SHORTCUTS
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {
      const active =
        document.activeElement;

      const typing =
        active &&
        (
          active.tagName ===
            "INPUT" ||
          active.tagName ===
            "TEXTAREA" ||
          active.isContentEditable
        );

      if (typing) {
        return;
      }

      /*
       * T = Toggle theme
       */
      if (
        event.key.toLowerCase() ===
        "t"
      ) {
        const current =
          root.getAttribute(
            "data-theme"
          ) || "dark";

        setTheme(
          current === "dark"
            ? "light"
            : "dark"
        );
      }

      /*
       * R = Toggle rain
       */
      if (
        event.key.toLowerCase() ===
        "r"
      ) {
        setRain(!rainEnabled);
      }
    }
  );


  /* =========================================================
     14. RESIZE
     ========================================================= */

  let resizeTimer = null;

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(
        resizeTimer
      );

      resizeTimer =
        setTimeout(
          () => {
            createBirds();

            if (rainEnabled) {
              createRain();
            }
          },
          250
        );
    },
    {
      passive: true
    }
  );


  /* =========================================================
     15. FOOTER YEAR
     ========================================================= */

  $$(".current-year").forEach(
    (element) => {
      element.textContent =
        new Date()
          .getFullYear();
    }
  );


  /* =========================================================
     16. IMAGE ERROR HANDLING
     ========================================================= */

  $$("img").forEach(
    (image) => {
      image.addEventListener(
        "error",
        () => {
          image.classList.add(
            "image-error"
          );
        },
        {
          once: true
        }
      );
    }
  );


  /* =========================================================
     17. PAGE READY
     ========================================================= */

  requestAnimationFrame(
    () => {
      body.classList.add(
        "page-ready"
      );
    }
  );


  /* =========================================================
     18. CONSOLE BRANDING
     ========================================================= */

  console.log(
    "%cSNK — Shah Neil Khan",
    "font-size:18px;font-weight:700;"
  );

  console.log(
    "%cBuild systems. Train minds. Create impact.",
    "font-size:12px;"
  );

})();
