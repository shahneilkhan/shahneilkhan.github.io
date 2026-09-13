/* =========================================================
   SNK PORTFOLIO — FINAL SCRIPT
   Compatible with V3.2 index.html + style.css
   ========================================================= */

(() => {
  "use strict";

  /* ---------------------------------------------------------
     Helpers
  --------------------------------------------------------- */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const root = document.documentElement;
  const body = document.body;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =========================================================
     1. THEME
     ========================================================= */

  const themeToggle = $("#themeToggle");
  const savedTheme = localStorage.getItem("snk-theme");

  function applyTheme(theme) {
    const nextTheme = theme === "light" ? "light" : "dark";

    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("snk-theme", nextTheme);

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        nextTheme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      );

      themeToggle.setAttribute(
        "title",
        nextTheme === "dark"
          ? "Light mode"
          : "Dark mode"
      );

      const icon = themeToggle.querySelector("[data-theme-icon]");

      if (icon) {
        icon.textContent = nextTheme === "dark" ? "☼" : "☾";
      }
    }
  }

  applyTheme(
    savedTheme ||
      (window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark")
  );

  themeToggle?.addEventListener("click", () => {
    const current =
      root.getAttribute("data-theme") || "dark";

    applyTheme(current === "dark" ? "light" : "dark");
  });


  /* =========================================================
     2. LANGUAGE TOGGLE
     ========================================================= */

  const languageToggle = $("#languageToggle");
  const savedLanguage =
    localStorage.getItem("snk-language") || "en";

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

      heroKicker: "UX • AI • SYSTEMS • DIGITAL EXPERIENCE",
      heroTitle:
        "I BUILD SYSTEMS. I TRAIN MINDS. I CREATE IMPACT.",
      heroDescription:
        "A personal portfolio for work across UX, digital experience, AI-assisted systems, creative direction, and structured thinking.",

      ecosystemKicker: "01 / ECOSYSTEM",
      ecosystemTitle: "Ideas become platforms.",
      ecosystemDescription:
        "Explore the digital ecosystem around SNK.",

      aiKicker: "02 / AI + CONTEXT",
      aiTitle: "AI is only as good as the thinking behind it.",

      mindsetKicker: "03 / MINDSET",
      mindsetTitle: "Engineering mindset.",

      expertiseKicker: "04 / EXPERTISE",
      expertiseTitle: "What I work on.",

      experienceKicker: "05 / EXPERIENCE",
      experienceTitle: "Experience shapes the mind.",

      aboutKicker: "06 / ABOUT",
      aboutTitle: "Build with clarity. Think beyond the interface.",

      brandKicker: "07 / BRAND",
      brandTitle: "SNK is more than a logo.",

      contactKicker: "08 / CONTACT",
      contactTitle: "Let's build something meaningful.",

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

      ecosystemKicker: "০১ / ইকোসিস্টেম",
      ecosystemTitle: "আইডিয়া থেকে প্ল্যাটফর্ম।",
      ecosystemDescription:
        "SNK-এর ডিজিটাল ইকোসিস্টেমের বিভিন্ন অংশ দেখুন।",

      aiKicker: "০২ / AI + CONTEXT",
      aiTitle:
        "AI যতটা ভালো, তার পেছনের চিন্তাও ততটাই গুরুত্বপূর্ণ।",

      mindsetKicker: "০৩ / MINDSET",
      mindsetTitle: "ইঞ্জিনিয়ারিং মাইন্ডসেট।",

      expertiseKicker: "০৪ / EXPERTISE",
      expertiseTitle: "আমি যেসব বিষয়ে কাজ করি।",

      experienceKicker: "০৫ / EXPERIENCE",
      experienceTitle: "অভিজ্ঞতা চিন্তাভাবনাকে তৈরি করে।",

      aboutKicker: "০৬ / ABOUT",
      aboutTitle:
        "স্বচ্ছতা দিয়ে তৈরি করুন। ইন্টারফেসের বাইরে চিন্তা করুন।",

      brandKicker: "০৭ / BRAND",
      brandTitle: "SNK শুধু একটি লোগো নয়।",

      contactKicker: "০৮ / CONTACT",
      contactTitle:
        "চলুন অর্থবহ কিছু তৈরি করি।",

      footerText:
        "উদ্দেশ্য ও চিন্তার সাথে ডিজাইন এবং ইঞ্জিনিয়ারিং।"
    }
  };

  function translateElement(element, value) {
    if (!element) return;

    element.textContent = value;
  }

  function applyLanguage(language) {
    const lang = language === "bn" ? "bn" : "en";
    const dictionary = translations[lang];

    root.setAttribute("lang", lang);
    localStorage.setItem("snk-language", lang);

    /*
     * Optional data-i18n support.
     *
     * Example:
     * <span data-i18n="navHome"></span>
     */
    $$("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;

      if (dictionary[key]) {
        translateElement(element, dictionary[key]);
      }
    });

    /*
     * Support common existing classes from index.html.
     * Elements only change when they are present.
     */

    const selectorMap = {
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
      ".ecosystem-description": "ecosystemDescription",

      ".ai-kicker": "aiKicker",
      ".ai-title": "aiTitle",

      ".mindset-kicker": "mindsetKicker",
      ".mindset-title": "mindsetTitle",

      ".expertise-kicker": "expertiseKicker",
      ".expertise-title": "expertiseTitle",

      ".experience-kicker": "experienceKicker",
      ".experience-title": "experienceTitle",

      ".about-kicker": "aboutKicker",
      ".about-title": "aboutTitle",

      ".brand-kicker": "brandKicker",
      ".brand-title": "brandTitle",

      ".contact-kicker": "contactKicker",
      ".contact-title": "contactTitle",

      ".footer-text": "footerText"
    };

    Object.entries(selectorMap).forEach(
      ([selector, key]) => {
        const elements = $$(selector);

        elements.forEach((element) => {
          if (dictionary[key]) {
            element.textContent = dictionary[key];
          }
        });
      }
    );

    if (languageToggle) {
      languageToggle.textContent =
        lang === "en" ? "বাংলা" : "EN";

      languageToggle.setAttribute(
        "aria-label",
        lang === "en"
          ? "Switch to Bengali"
          : "Switch to English"
      );
    }
  }

  applyLanguage(savedLanguage);

  languageToggle?.addEventListener("click", () => {
    const current =
      root.getAttribute("lang") || "en";

    applyLanguage(current === "en" ? "bn" : "en");
  });


  /* =========================================================
     3. TERMINAL TYPING EFFECT
     ========================================================= */

  const terminalText = $(
    "[data-terminal-text]"
  );

  const terminalFallback = $(
    ".terminal-text"
  );

  const terminalTarget =
    terminalText || terminalFallback;

  const terminalMessages = [
    "thinking...",
    "designing...",
    "building...",
    "learning...",
    "creating...",
    "solving..."
  ];

  let terminalMessageIndex = 0;
  let terminalCharacterIndex = 0;
  let deleting = false;

  function runTerminalTyping() {
    if (!terminalTarget || prefersReducedMotion) {
      return;
    }

    const message =
      terminalMessages[terminalMessageIndex];

    if (!deleting) {
      terminalCharacterIndex++;

      terminalTarget.textContent =
        message.slice(0, terminalCharacterIndex);

      if (
        terminalCharacterIndex >= message.length
      ) {
        deleting = true;

        setTimeout(
          runTerminalTyping,
          1100
        );

        return;
      }

      setTimeout(
        runTerminalTyping,
        75
      );

      return;
    }

    terminalCharacterIndex--;

    terminalTarget.textContent =
      message.slice(0, terminalCharacterIndex);

    if (terminalCharacterIndex <= 0) {
      deleting = false;

      terminalMessageIndex =
        (terminalMessageIndex + 1) %
        terminalMessages.length;

      setTimeout(
        runTerminalTyping,
        350
      );

      return;
    }

    setTimeout(
      runTerminalTyping,
      45
    );
  }

  if (terminalTarget) {
    if (prefersReducedMotion) {
      terminalTarget.textContent =
        terminalMessages[0];
    } else {
      runTerminalTyping();
    }
  }


  /* =========================================================
     4. RAIN EFFECT
     ========================================================= */

  const rainToggle = $("#rainToggle");
  let rainLayer = $(".rain-layer");
  let rainEnabled =
    localStorage.getItem("snk-rain") === "true";

  function createRainLayer() {
    if (rainLayer) {
      rainLayer.remove();
    }

    rainLayer = document.createElement("div");
    rainLayer.className = "rain-layer";
    rainLayer.setAttribute(
      "aria-hidden",
      "true"
    );

    const fragment =
      document.createDocumentFragment();

    const amount =
      window.innerWidth < 640 ? 55 : 95;

    for (let i = 0; i < amount; i++) {
      const drop =
        document.createElement("span");

      drop.className = "rain-drop";

      drop.style.left =
        `${Math.random() * 100}%`;

      drop.style.animationDelay =
        `${Math.random() * 2.5}s`;

      drop.style.animationDuration =
        `${0.7 + Math.random() * 0.8}s`;

      drop.style.opacity =
        `${0.15 + Math.random() * 0.45}`;

      fragment.appendChild(drop);
    }

    rainLayer.appendChild(fragment);
    body.appendChild(rainLayer);
  }

  function removeRainLayer() {
    if (rainLayer) {
      rainLayer.remove();
      rainLayer = null;
    }
  }

  function applyRain(enabled) {
    rainEnabled = Boolean(enabled);

    localStorage.setItem(
      "snk-rain",
      String(rainEnabled)
    );

    body.classList.toggle(
      "rain-active",
      rainEnabled
    );

    if (rainEnabled && !prefersReducedMotion) {
      createRainLayer();
    } else {
      removeRainLayer();
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

  applyRain(rainEnabled);

  rainToggle?.addEventListener(
    "click",
    () => {
      applyRain(!rainEnabled);
    }
  );


  /* =========================================================
     5. FLYING BIRDS
     ========================================================= */

  const birdsContainer =
    $(".birds");

  function createBirds() {
    if (!birdsContainer) return;

    birdsContainer.innerHTML = "";

    if (prefersReducedMotion) return;

    const birdCount =
      window.innerWidth < 640 ? 2 : 4;

    for (let i = 0; i < birdCount; i++) {
      const bird =
        document.createElement("span");

      bird.className = "bird";

      bird.style.top =
        `${12 + Math.random() * 48}%`;

      bird.style.left =
        `${-10 - Math.random() * 20}%`;

      bird.style.animationDelay =
        `${Math.random() * 8}s`;

      bird.style.animationDuration =
        `${12 + Math.random() * 9}s`;

      bird.style.transform =
        `scale(${0.55 + Math.random() * 0.45})`;

      birdsContainer.appendChild(bird);
    }
  }

  createBirds();


  /* =========================================================
     6. SCROLL REVEAL
     ========================================================= */

  const revealElements =
    $$(".reveal");

  if (
    !prefersReducedMotion &&
    "IntersectionObserver" in window
  ) {
    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

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
          rootMargin:
            "0px 0px -50px 0px"
        }
      );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add(
        "is-visible"
      );
    });
  }


  /* =========================================================
     7. HEADER SCROLL STATE
     ========================================================= */

  const header =
    $(".site-header");

  function updateHeader() {
    if (!header) return;

    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 30
    );
  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =========================================================
     8. ACTIVE NAVIGATION
     ========================================================= */

  const navLinks =
    $$(".main-nav a[href^='#']");

  const sections =
    navLinks
      .map((link) => {
        const id =
          link.getAttribute("href");

        return id
          ? document.querySelector(id)
          : null;
      })
      .filter(Boolean);

  if (
    sections.length &&
    "IntersectionObserver" in window
  ) {
    const sectionObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const id =
              `#${entry.target.id}`;

            navLinks.forEach((link) => {
              link.classList.toggle(
                "active",
                link.getAttribute(
                  "href"
                ) === id
              );
            });
          });
        },
        {
          rootMargin:
            "-35% 0px -55% 0px",
          threshold: 0
        }
      );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


  /* =========================================================
     9. SMOOTH ANCHOR NAVIGATION
     ========================================================= */

  function getHeaderOffset() {
    return header
      ? header.offsetHeight + 18
      : 18;
  }

  function scrollToElement(
    target,
    updateHash = true
  ) {
    if (!target) return;

    if (target.id === "home") {
      window.scrollTo({
        top: 0,
        behavior:
          prefersReducedMotion
            ? "auto"
            : "smooth"
      });

      if (updateHash) {
        history.replaceState(
          null,
          "",
          "#home"
        );
      }

      return;
    }

    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      getHeaderOffset();

    window.scrollTo({
      top: Math.max(0, top),
      behavior:
        prefersReducedMotion
          ? "auto"
          : "smooth"
    });

    if (
      updateHash &&
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
            link.getAttribute("href");

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

          if (!target) return;

          event.preventDefault();

          scrollToElement(target);
        }
      );
    }
  );

  /*
   * Fix direct visits such as:
   * index.html#home
   */
  if (
    window.location.hash === "#home"
  ) {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto"
      });
    }, 50);
  }


  /* =========================================================
     10. SUBTLE CARD TILT
     ========================================================= */

  const tiltCards = $$(
    ".ecosystem-card, .expertise-card, .mindset-card, .social-card, .brand-card"
  );

  if (
    !prefersReducedMotion &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {
    tiltCards.forEach((card) => {
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
            ((x / rect.width) - 0.5) *
            4;

          const rotateX =
            ((y / rect.height) - 0.5) *
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
          card.style.transform = "";
        }
      );
    });
  }


  /* =========================================================
     11. EXTERNAL LINKS
     ========================================================= */

  $$("a[href]").forEach((link) => {
    const href =
      link.getAttribute("href");

    if (!href) return;

    const isExternal =
      /^https?:\/\//i.test(href) &&
      !href.includes(
        window.location.hostname
      );

    if (isExternal) {
      link.setAttribute(
        "target",
        "_blank"
      );

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );
    }
  });


  /* =========================================================
     12. KEYBOARD SHORTCUTS
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {
      /*
       * Don't trigger shortcuts while
       * typing in form fields.
       */

      const active =
        document.activeElement;

      const isTyping =
        active &&
        (
          active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable
        );

      if (isTyping) return;

      /*
       * T = Theme
       */
      if (
        event.key.toLowerCase() === "t"
      ) {
        const current =
          root.getAttribute(
            "data-theme"
          ) || "dark";

        applyTheme(
          current === "dark"
            ? "light"
            : "dark"
        );
      }

      /*
       * R = Rain
       */
      if (
        event.key.toLowerCase() === "r"
      ) {
        applyRain(!rainEnabled);
      }
    }
  );


  /* =========================================================
     13. RESIZE HANDLING
     ========================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        if (rainEnabled) {
          createRainLayer();
        }

        createBirds();
      }, 250);
    },
    { passive: true }
  );


  /* =========================================================
     14. FOOTER YEAR
     ========================================================= */

  $$(".current-year").forEach(
    (element) => {
      element.textContent =
        new Date().getFullYear();
    }
  );


  /* =========================================================
     15. IMAGE FALLBACK
     ========================================================= */

  $$("img").forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        image.classList.add(
          "image-error"
        );
      },
      { once: true }
    );
  });


  /* =========================================================
     16. INITIAL PAGE STATE
     ========================================================= */

  requestAnimationFrame(() => {
    body.classList.add(
      "page-ready"
    );
  });


  /* =========================================================
     17. CONSOLE BRANDING
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
