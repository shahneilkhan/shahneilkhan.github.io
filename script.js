/* =========================================================
   SNK PORTFOLIO — V3.2
   Interactive Personal Brand System
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     HELPERS
  ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const root = document.documentElement;
  const body = document.body;


  /* =======================================================
     YEAR
  ======================================================= */

  $$("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });


  /* =======================================================
     THEME
  ======================================================= */

  const THEME_KEY = "snk-theme";

  const themeButton =
    $("[data-theme-toggle]") ||
    $("#themeToggle") ||
    $("[aria-label*='theme' i]");

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);

    if (saved === "light" || saved === "dark") {
      return saved;
    }

    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function updateThemeButton(theme) {
    if (!themeButton) return;

    const isLight = theme === "light";

    themeButton.textContent = isLight ? "☾" : "☼";

    themeButton.setAttribute(
      "aria-label",
      isLight
        ? "Switch to dark mode"
        : "Switch to light mode"
    );

    themeButton.setAttribute(
      "title",
      isLight
        ? "Dark mode"
        : "Light mode"
    );
  }

  function setTheme(theme, save = true) {
    root.setAttribute("data-theme", theme);

    if (save) {
      localStorage.setItem(THEME_KEY, theme);
    }

    updateThemeButton(theme);
  }

  setTheme(getPreferredTheme(), false);

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const current =
        root.getAttribute("data-theme") || "dark";

      setTheme(
        current === "dark"
          ? "light"
          : "dark"
      );
    });
  }


  /* =======================================================
     LANGUAGE
  ======================================================= */

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
        "PERSONAL BRAND · DIGITAL EXPERIENCE · SYSTEMS THINKING",

      heroTitle:
        "I BUILD SYSTEMS. I TRAIN MINDS. I CREATE IMPACT.",

      heroDescription:
        "UX thinking, digital experiences, AI-assisted systems and a growing ecosystem of ideas, products and brands.",

      heroPrimary:
        "Explore the Ecosystem",

      heroSecondary:
        "Let's Connect",

      ecosystemKicker:
        "THE SNK ECOSYSTEM",

      ecosystemTitle:
        "One mind. Multiple directions.",

      ecosystemDescription:
        "Different brands. Different missions. One connected way of thinking.",

      websitesDeal:
        "WebsitesDeal",

      websitesDealDesc:
        "Digital solutions and website-focused experiences.",

      tabayyunTV:
        "TabayyunTV",

      tabayyunTVDesc:
        "A destination for meaningful Islamic media and content.",

      snkInstitute:
        "SNK IT Institute",

      snkInstituteDesc:
        "Learning, technology and practical digital skills.",

      sarakat:
        "Sarakat Agency",

      sarakatDesc:
        "Creative direction, digital strategy and agency thinking.",

      snkDesign:
        "SNK Design",

      snkDesignDesc:
        "Design thinking, visual systems and digital creativity.",

      visitSite:
        "Visit Site",

      aiKicker:
        "AI · SYSTEMS · FUTURE",

      aiTitle:
        "I don't just use AI. I design with it.",

      aiDescription:
        "AI becomes powerful when it is connected to human thinking, structured workflows and real-world problems.",

      aiCore:
        "AI",

      aiNode1:
        "Strategy",

      aiNode2:
        "UX Thinking",

      aiNode3:
        "Automation",

      aiNode4:
        "Research",

      aiNode5:
        "Creation",

      expertiseKicker:
        "WHAT I WORK WITH",

      expertiseTitle:
        "Thinking across disciplines.",

      expertise1:
        "UX Strategy",

      expertise1Desc:
        "Turning complex problems into clearer digital experiences.",

      expertise2:
        "Product Thinking",

      expertise2Desc:
        "Connecting user needs, business goals and product direction.",

      expertise3:
        "Interface Design",

      expertise3Desc:
        "Designing interfaces that feel intentional, useful and refined.",

      expertise4:
        "Digital Systems",

      expertise4Desc:
        "Creating repeatable structures for products, content and workflows.",

      expertise5:
        "AI-Assisted Work",

      expertise5Desc:
        "Using AI to accelerate research, ideation and execution.",

      expertise6:
        "Creative Direction",

      expertise6Desc:
        "Building visual language and direction across digital brands.",

      experienceKicker:
        "EXPERIENCE",

      experienceTitle:
        "EXPERIENCE SHAPES THE MIND.",

      experienceRole:
        "UX Lead Digital Expert",

      experienceCompany:
        "Yaqeen Institute",

      experienceLocation:
        "Texas, USA · Remote",

      experienceDate:
        "2026 — PRESENT",

      experienceDescription:
        "Working across digital experience, UX thinking, interface design and product-oriented problem solving.",

      contribution1:
        "Understand",

      contribution1Desc:
        "Find the real problem.",

      contribution2:
        "Structure",

      contribution2Desc:
        "Turn complexity into direction.",

      contribution3:
        "Execute",

      contribution3Desc:
        "Design and build with purpose.",

      contribution4:
        "Improve",

      contribution4Desc:
        "Learn, refine and repeat.",

      philosophyLabel:
        "WORK PHILOSOPHY",

      philosophy:
        "DON'T JUST DO THE WORK. UNDERSTAND IT.",

      aboutKicker:
        "ABOUT",

      aboutTitle:
        "Build. Learn. Share.",

      aboutDescription:
        "I enjoy working at the intersection of design, technology, learning and systems thinking — creating things that are useful today while building knowledge for tomorrow.",

      brandKicker:
        "THE BRAND",

      brandTitle:
        "SNK IS MORE THAN A NAME.",

      brandDescription:
        "It represents a way of thinking: build with intention, learn continuously and create work that leaves something behind.",

      contactKicker:
        "LET'S CONNECT",

      contactTitle:
        "Let's build something meaningful.",

      contactDescription:
        "Have an idea, project or collaboration in mind? Start a conversation.",

      contactButton:
        "Start a Conversation",

      footer:
        "Built with curiosity, systems thinking and intention."
    },


    bn: {
      navHome: "হোম",
      navEcosystem: "ইকোসিস্টেম",
      navAI: "এআই",
      navExpertise: "দক্ষতা",
      navExperience: "অভিজ্ঞতা",
      navAbout: "পরিচিতি",
      navBrand: "ব্র্যান্ড",
      navContact: "যোগাযোগ",

      heroKicker:
        "পার্সোনাল ব্র্যান্ড · ডিজিটাল এক্সপেরিয়েন্স · সিস্টেমস থিংকিং",

      heroTitle:
        "আমি সিস্টেম তৈরি করি। মানুষকে শেখাই। প্রভাব তৈরি করি।",

      heroDescription:
        "UX thinking, digital experience, AI-assisted systems এবং ক্রমবর্ধমান ideas, products ও brands-এর একটি connected ecosystem।",

      heroPrimary:
        "ইকোসিস্টেম দেখুন",

      heroSecondary:
        "যোগাযোগ করুন",

      ecosystemKicker:
        "SNK ইকোসিস্টেম",

      ecosystemTitle:
        "একটি চিন্তা। একাধিক দিক।",

      ecosystemDescription:
        "ভিন্ন ব্র্যান্ড। ভিন্ন উদ্দেশ্য। কিন্তু চিন্তার ভিত্তি এক।",

      websitesDeal:
        "WebsitesDeal",

      websitesDealDesc:
        "ডিজিটাল সলিউশন এবং ওয়েবসাইট-কেন্দ্রিক অভিজ্ঞতা।",

      tabayyunTV:
        "TabayyunTV",

      tabayyunTVDesc:
        "অর্থবহ ইসলামিক মিডিয়া ও কনটেন্টের একটি destination।",

      snkInstitute:
        "SNK IT Institute",

      snkInstituteDesc:
        "লার্নিং, প্রযুক্তি এবং practical digital skills।",

      sarakat:
        "Sarakat Agency",

      sarakatDesc:
        "Creative direction, digital strategy এবং agency thinking।",

      snkDesign:
        "SNK Design",

      snkDesignDesc:
        "Design thinking, visual systems এবং digital creativity।",

      visitSite:
        "সাইট দেখুন",

      aiKicker:
        "এআই · সিস্টেম · ভবিষ্যৎ",

      aiTitle:
        "আমি শুধু AI ব্যবহার করি না। AI দিয়ে design করি।",

      aiDescription:
        "AI সবচেয়ে powerful হয় যখন human thinking, structured workflow এবং real-world problem-এর সাথে যুক্ত হয়।",

      aiCore:
        "AI",

      aiNode1:
        "Strategy",

      aiNode2:
        "UX Thinking",

      aiNode3:
        "Automation",

      aiNode4:
        "Research",

      aiNode5:
        "Creation",

      expertiseKicker:
        "আমি যেগুলো নিয়ে কাজ করি",

      expertiseTitle:
        "বিভিন্ন discipline-এর মধ্যে চিন্তা করি।",

      expertise1:
        "UX Strategy",

      expertise1Desc:
        "জটিল সমস্যাকে সহজ ও পরিষ্কার digital experience-এ রূপ দেওয়া।",

      expertise2:
        "Product Thinking",

      expertise2Desc:
        "User needs, business goals এবং product direction-কে একসাথে দেখা।",

      expertise3:
        "Interface Design",

      expertise3Desc:
        "ব্যবহারযোগ্য, intentional এবং refined interface তৈরি করা।",

      expertise4:
        "Digital Systems",

      expertise4Desc:
        "Products, content এবং workflow-এর জন্য repeatable structure তৈরি করা।",

      expertise5:
        "AI-Assisted Work",

      expertise5Desc:
        "Research, ideation এবং execution দ্রুত করতে AI ব্যবহার করা।",

      expertise6:
        "Creative Direction",

      expertise6Desc:
        "Digital brand-এর visual language ও creative direction তৈরি করা।",

      experienceKicker:
        "অভিজ্ঞতা",

      experienceTitle:
        "EXPERIENCE SHAPES THE MIND.",

      experienceRole:
        "UX Lead Digital Expert",

      experienceCompany:
        "Yaqeen Institute",

      experienceLocation:
        "Texas, USA · Remote",

      experienceDate:
        "২০২৬ — বর্তমান",

      experienceDescription:
        "Digital experience, UX thinking, interface design এবং product-oriented problem solving নিয়ে কাজ করছি।",

      contribution1:
        "Understand",

      contribution1Desc:
        "আসল সমস্যাটি খুঁজে বের করা।",

      contribution2:
        "Structure",

      contribution2Desc:
        "জটিলতাকে direction-এ রূপ দেওয়া।",

      contribution3:
        "Execute",

      contribution3Desc:
        "উদ্দেশ্য নিয়ে design ও build করা।",

      contribution4:
        "Improve",

      contribution4Desc:
        "শেখা, refine করা এবং আবার প্রয়োগ করা।",

      philosophyLabel:
        "কাজের দর্শন",

      philosophy:
        "শুধু কাজটি করবেন না। কাজটিকে বুঝুন।",

      aboutKicker:
        "পরিচিতি",

      aboutTitle:
        "Build. Learn. Share.",

      aboutDescription:
        "Design, technology, learning এবং systems thinking-এর intersection-এ কাজ করতে ভালোবাসি — এমন কিছু তৈরি করতে চাই যা আজ useful এবং আগামীকাল knowledge তৈরি করে।",

      brandKicker:
        "ব্র্যান্ড",

      brandTitle:
        "SNK শুধু একটি নাম নয়।",

      brandDescription:
        "এটি একটি চিন্তার পদ্ধতি: intention নিয়ে build করা, continuously শেখা এবং এমন কাজ তৈরি করা যার impact থেকে যায়।",

      contactKicker:
        "যোগাযোগ",

      contactTitle:
        "চলুন meaningful কিছু তৈরি করি।",

      contactDescription:
        "কোনো idea, project অথবা collaboration আছে? একটি conversation দিয়ে শুরু করি।",

      contactButton:
        "কথা শুরু করুন",

      footer:
        "Curiosity, systems thinking এবং intention দিয়ে তৈরি।"
    }
  };


  /* =======================================================
     LANGUAGE ELEMENT MAPPING
  ======================================================= */

  const selectorMap = {
    navHome: [
      "#homeLink",
      "[data-nav-home]"
    ],

    navEcosystem: [
      "#ecosystemLink",
      "[data-nav-ecosystem]"
    ],

    navAI: [
      "#aiLink",
      "[data-nav-ai]"
    ],

    navExpertise: [
      "#expertiseLink",
      "[data-nav-expertise]"
    ],

    navExperience: [
      "#experienceLink",
      "[data-nav-experience]"
    ],

    navAbout: [
      "#aboutLink",
      "[data-nav-about]"
    ],

    navBrand: [
      "#brandLink",
      "[data-nav-brand]"
    ],

    navContact: [
      "#contactLink",
      "[data-nav-contact]"
    ]
  };


  function setText(selector, value) {
    const elements = $$(selector);

    elements.forEach((el) => {
      el.textContent = value;
    });
  }

  function applyLanguage(lang) {
    const dictionary =
      translations[lang] || translations.en;

    root.setAttribute(
      "lang",
      lang === "bn"
        ? "bn"
        : "en"
    );

    /*
     * Preferred method:
     * Add data-i18n="heroTitle"
     * to any element.
     */

    $$("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;

      if (
        dictionary[key] !== undefined
      ) {
        el.textContent =
          dictionary[key];
      }
    });


    /*
     * Fallback selectors for
     * existing V3 markup.
     */

    const fallbacks = {

      heroKicker:
        ".hero-kicker",

      heroTitle:
        ".hero-title",

      heroDescription:
        ".hero-description",

      heroPrimary:
        ".hero-actions .btn-primary",

      heroSecondary:
        ".hero-actions .btn-secondary",

      ecosystemKicker:
        "#ecosystem .eyebrow",

      ecosystemTitle:
        "#ecosystem .section-title",

      ecosystemDescription:
        "#ecosystem .section-copy",

      aiKicker:
        "#ai .eyebrow",

      aiTitle:
        "#ai h2",

      aiDescription:
        "#ai .ai-copy > p",

      expertiseKicker:
        "#expertise .eyebrow",

      expertiseTitle:
        "#expertise .section-title",

      experienceKicker:
        "#experience .eyebrow",

      experienceTitle:
        "#experience .experience-heading",

      experienceRole:
        "#experience .experience-card h3",

      experienceCompany:
        "#experience .experience-company",

      experienceLocation:
        "#experience .experience-location",

      experienceDate:
        "#experience .experience-date",

      experienceDescription:
        "#experience .experience-card > p",

      philosophyLabel:
        "#experience .experience-philosophy small",

      philosophy:
        "#experience .experience-philosophy h4",

      aboutKicker:
        "#about .eyebrow",

      aboutTitle:
        "#about h2",

      aboutDescription:
        "#about .about-copy > p",

      brandKicker:
        "#brand .eyebrow",

      brandTitle:
        "#brand .brand-banner h3",

      brandDescription:
        "#brand .brand-banner p",

      contactKicker:
        "#contact .eyebrow",

      contactTitle:
        "#contact h2",

      contactDescription:
        "#contact .contact-copy",

      contactButton:
        "#contact .btn"
    };


    Object.entries(fallbacks).forEach(
      ([key, selector]) => {
        if (
          dictionary[key] === undefined
        ) return;

        const elements =
          $$(selector);

        elements.forEach((el) => {
          /*
           * Don't destroy nested spans
           * if the element contains
           * highlighted text.
           */
          if (
            key === "heroTitle" ||
            key === "aiTitle" ||
            key === "experienceTitle" ||
            key === "aboutTitle" ||
            key === "brandTitle" ||
            key === "contactTitle"
          ) {
            if (el.children.length > 0) {
              return;
            }
          }

          el.textContent =
            dictionary[key];
        });
      }
    );


    /*
     * Ecosystem cards
     */

    const ecosystemData = [
      ["websitesDeal", 0],
      ["tabayyunTV", 1],
      ["snkInstitute", 2],
      ["sarakat", 3],
      ["snkDesign", 4]
    ];

    const ecosystemCards =
      $$(".ecosystem-card");

    ecosystemCards.forEach(
      (card, index) => {
        const item =
          ecosystemData.find(
            (entry) =>
              entry[1] === index
          );

        if (!item) return;

        const [key] = item;

        const title =
          $(".ecosystem-card h3", card);

        const description =
          $(".ecosystem-card p", card);

        const link =
          $(".ecosystem-link", card);

        if (title) {
          title.textContent =
            dictionary[key];
        }

        const descKey =
          `${key}Desc`;

        if (
          description &&
          dictionary[descKey]
        ) {
          description.textContent =
            dictionary[descKey];
        }

        if (link) {
          link.textContent =
            dictionary.visitSite;
        }
      }
    );


    /*
     * Expertise cards
     */

    const expertiseCards =
      $$(".expertise-card");

    expertiseCards.forEach(
      (card, index) => {

        const number =
          index + 1;

        const title =
          $(".expertise-card h3", card);

        const description =
          $(".expertise-card p", card);

        const titleKey =
          `expertise${number}`;

        const descKey =
          `expertise${number}Desc`;

        if (
          title &&
          dictionary[titleKey]
        ) {
          title.textContent =
            dictionary[titleKey];
        }

        if (
          description &&
          dictionary[descKey]
        ) {
          description.textContent =
            dictionary[descKey];
        }
      }
    );


    /*
     * Experience contributions
     */

    const contributionCards =
      $$(".experience-contribution");

    contributionCards.forEach(
      (card, index) => {

        const number =
          index + 1;

        const strong =
          $("strong", card);

        const span =
          $("span", card);

        const titleKey =
          `contribution${number}`;

        const descKey =
          `contribution${number}Desc`;

        if (
          strong &&
          dictionary[titleKey]
        ) {
          strong.textContent =
            dictionary[titleKey];
        }

        if (
          span &&
          dictionary[descKey]
        ) {
          span.textContent =
            dictionary[descKey];
        }
      }
    );


    /*
     * AI nodes
     */

    const aiNodes =
      $$(".ai-node");

    aiNodes.forEach(
      (node, index) => {

        const key =
          `aiNode${index + 1}`;

        if (dictionary[key]) {
          node.textContent =
            dictionary[key];
        }
      }
    );


    /*
     * Language button
     */

    const languageButton =
      $("[data-language-toggle]") ||
      $("#languageToggle") ||
      $("[aria-label*='language' i]");

    if (languageButton) {
      languageButton.textContent =
        lang === "bn"
          ? "EN"
          : "বাংলা";

      languageButton.setAttribute(
        "aria-label",
        lang === "bn"
          ? "Switch to English"
          : "বাংলা ভাষায় পরিবর্তন করুন"
      );
    }

    localStorage.setItem(
      LANGUAGE_KEY,
      lang
    );
  }


  const savedLanguage =
    localStorage.getItem(
      LANGUAGE_KEY
    ) || "en";

  applyLanguage(savedLanguage);


  const languageButton =
    $("[data-language-toggle]") ||
    $("#languageToggle") ||
    $("[aria-label*='language' i]");

  if (languageButton) {
    languageButton.addEventListener(
      "click",
      () => {

        const current =
          localStorage.getItem(
            LANGUAGE_KEY
          ) || "en";

        applyLanguage(
          current === "en"
            ? "bn"
            : "en"
        );
      }
    );
  }


  /* =======================================================
     TERMINAL TYPING
  ======================================================= */

  const terminalText =
    $(".terminal-text");

  if (terminalText) {

    const messages = [
      "thinking...",
      "designing...",
      "building...",
      "learning...",
      "creating...",
      "solving..."
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function terminalLoop() {

      const current =
        messages[messageIndex];

      if (!deleting) {

        charIndex++;

        terminalText.textContent =
          current.slice(
            0,
            charIndex
          );

        if (
          charIndex >=
          current.length
        ) {

          deleting = true;

          setTimeout(
            terminalLoop,
            1200
          );

          return;
        }

        setTimeout(
          terminalLoop,
          65
        );

      } else {

        charIndex--;

        terminalText.textContent =
          current.slice(
            0,
            charIndex
          );

        if (
          charIndex <= 0
        ) {

          deleting = false;

          messageIndex =
            (messageIndex + 1) %
            messages.length;

          setTimeout(
            terminalLoop,
            250
          );

          return;
        }

        setTimeout(
          terminalLoop,
          35
        );
      }
    }

    terminalLoop();
  }


  /* =======================================================
     RAIN
  ======================================================= */

  const RAIN_KEY =
    "snk-rain";

  let rainLayer =
    $(".rain-layer");

  if (!rainLayer) {

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

    body.appendChild(
      rainLayer
    );
  }


  function createRain() {

    rainLayer.innerHTML = "";

    const amount =
      window.innerWidth < 600
        ? 55
        : 110;

    const fragment =
      document.createDocumentFragment();

    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const drop =
        document.createElement(
          "span"
        );

      drop.className =
        "raindrop";

      drop.style.left =
        `${Math.random() * 110}%`;

      drop.style.animationDuration =
        `${.45 + Math.random() * .8}s`;

      drop.style.animationDelay =
        `${Math.random() * 1.5}s`;

      drop.style.height =
        `${10 + Math.random() * 18}px`;

      fragment.appendChild(
        drop
      );
    }

    rainLayer.appendChild(
      fragment
    );
  }


  function setRain(enabled) {

    body.classList.toggle(
      "rain-active",
      enabled
    );

    localStorage.setItem(
      RAIN_KEY,
      enabled
        ? "1"
        : "0"
    );

    if (enabled) {
      createRain();
    }
  }


  const rainButton =
    $("[data-rain-toggle]") ||
    $("#rainToggle") ||
    $$("button").find(
      (button) =>
        button.textContent
          .trim()
          .toLowerCase()
          .includes("rain")
    );


  if (rainButton) {

    rainButton.addEventListener(
      "click",
      () => {

        const active =
          body.classList.contains(
            "rain-active"
          );

        setRain(!active);
      }
    );
  }


  const savedRain =
    localStorage.getItem(
      RAIN_KEY
    ) === "1";

  setRain(savedRain);


  /* =======================================================
     FLYING BIRDS
  ======================================================= */

  const birdsContainer =
    $(".birds");

  function createBirds() {

    if (!birdsContainer) return;

    birdsContainer.innerHTML = "";

    const count =
      window.innerWidth < 600
        ? 4
        : 7;

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
        `${8 + Math.random() * 42}%`;

      bird.style.left =
        `${-10 - Math.random() * 20}%`;

      bird.style.animation =
        `birdFly ${
          16 + Math.random() * 12
        }s linear ${
          -Math.random() * 15
        }s infinite`;

      bird.style.transform =
        `scale(${
          .55 + Math.random() * .7
        })`;

      birdsContainer.appendChild(
        bird
      );
    }


    if (
      !$("#snkBirdAnimation")
    ) {

      const style =
        document.createElement(
          "style"
        );

      style.id =
        "snkBirdAnimation";

      style.textContent = `
        @keyframes birdFly {
          0% {
            transform:
              translateX(-12vw)
              translateY(0)
              scale(.7);
          }

          25% {
            transform:
              translateX(28vw)
              translateY(-14px)
              scale(.8);
          }

          50% {
            transform:
              translateX(55vw)
              translateY(8px)
              scale(.9);
          }

          75% {
            transform:
              translateX(82vw)
              translateY(-12px)
              scale(1);
          }

          100% {
            transform:
              translateX(125vw)
              translateY(0)
              scale(1.05);
          }
        }
      `;

      document.head.appendChild(
        style
      );
    }
  }

  createBirds();


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    $$(".reveal");

  if (
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "is-visible"
                );

                observer.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: .12,
          rootMargin:
            "0px 0px -50px 0px"
        }
      );

    revealElements.forEach(
      (element) => {
        revealObserver.observe(
          element
        );
      }
    );

  } else {

    revealElements.forEach(
      (element) => {
        element.classList.add(
          "is-visible"
        );
      }
    );
  }


  /* =======================================================
     HEADER SCROLL
  ======================================================= */

  const header =
    $(".site-header");

  function updateHeader() {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 25
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
     ACTIVE NAV
  ======================================================= */

  const navLinks =
    $$(".main-nav a");

  const sections =
    $$(
      "main section[id], section[id]"
    );

  if (
    navLinks.length &&
    sections.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) return;

              const id =
                entry.target.id;

              navLinks.forEach(
                (link) => {

                  const href =
                    link.getAttribute(
                      "href"
                    );

                  link.classList.toggle(
                    "active",
                    href ===
                      `#${id}`
                  );
                }
              );
            }
          );
        },
        {
          rootMargin:
            "-30% 0px -55% 0px",
          threshold: 0
        }
      );

    sections.forEach(
      (section) => {
        sectionObserver.observe(
          section
        );
      }
    );
  }


  /* =======================================================
     SMOOTH ANCHOR NAVIGATION
  ======================================================= */

  $$(
    'a[href^="#"]'
  ).forEach(
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

          if (!target) return;

          event.preventDefault();

          const headerHeight =
            header
              ? header.offsetHeight
              : 0;

          const targetTop =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            headerHeight -
            15;

          window.scrollTo({
            top:
              Math.max(
                targetTop,
                0
              ),
            behavior:
              "smooth"
          });

          history.replaceState(
            null,
            "",
            href
          );
        }
      );
    }
  );


  /* =======================================================
     HOME HASH FIX
  ======================================================= */

  if (
    window.location.hash ===
    "#home"
  ) {

    setTimeout(
      () => {
        window.scrollTo({
          top: 0,
          behavior: "auto"
        });
      },
      50
    );
  }


  /* =======================================================
     CARD TILT
  ======================================================= */

  const tiltCards =
    $(
      ".ecosystem-card, .expertise-card, .social-card, .brand-banner"
    );

  const supportsHover =
    window.matchMedia &&
    window.matchMedia(
      "(hover: hover)"
    ).matches;


  if (supportsHover) {

    tiltCards.forEach(
      (card) => {

        card.addEventListener(
          "mousemove",
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
                .5) * 5;

            const rotateX =
              ((y / rect.height) -
                .5) * -5;

            card.classList.add(
              "tilt-active"
            );

            card.style.transform =
              `perspective(900px)
               rotateX(${rotateX}deg)
               rotateY(${rotateY}deg)
               translateY(-5px)`;
          }
        );


        card.addEventListener(
          "mouseleave",
          () => {

            card.classList.remove(
              "tilt-active"
            );

            card.style.transform =
              "";
          }
        );
      }
    );
  }


  /* =======================================================
     KEYBOARD SHORTCUTS
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      /*
       * T = Theme
       */

      if (
        event.key.toLowerCase() ===
        "t" &&
        !isTypingTarget(event.target)
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
       * R = Rain
       */

      if (
        event.key.toLowerCase() ===
        "r" &&
        !isTypingTarget(event.target)
      ) {

        const active =
          body.classList.contains(
            "rain-active"
          );

        setRain(!active);
      }
    }
  );


  function isTypingTarget(
    element
  ) {

    if (!element) {
      return false;
    }

    const tag =
      element.tagName
        ? element.tagName.toLowerCase()
        : "";

    return (
      tag === "input" ||
      tag === "textarea" ||
      tag === "select" ||
      element.isContentEditable
    );
  }


  /* =======================================================
     RESIZE
  ======================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );

      resizeTimer =
        setTimeout(
          () => {

            if (
              body.classList.contains(
                "rain-active"
              )
            ) {
              createRain();
            }

            createBirds();

          },
          250
        );
    }
  );


  /* =======================================================
     EXTERNAL LINKS
  ======================================================= */

  $$(
    'a[href^="http"]'
  ).forEach(
    (link) => {

      const url =
        link.getAttribute(
          "href"
        );

      if (!url) return;

      try {

        const linkURL =
          new URL(
            url,
            window.location.href
          );

        if (
          linkURL.hostname !==
          window.location.hostname
        ) {

          link.setAttribute(
            "target",
            "_blank"
          );

          link.setAttribute(
            "rel",
            "noopener noreferrer"
          );
        }

      } catch {
        // Ignore invalid URLs.
      }
    }
  );


  /* =======================================================
     VISIBILITY / PAGE LOAD
  ======================================================= */

  window.addEventListener(
    "load",
    () => {

      body.classList.add(
        "page-loaded"
      );

      /*
       * Trigger initial reveal
       * for elements already visible.
       */

      revealElements.forEach(
        (element) => {

          const rect =
            element.getBoundingClientRect();

          if (
            rect.top <
            window.innerHeight * .9
          ) {

            element.classList.add(
              "is-visible"
            );
          }
        }
      );
    }
  );


  /* =======================================================
     CONSOLE BRANDING
  ======================================================= */

  console.log(
    "%c SNK Portfolio V3.2 ",
    `
      background:#d7a84b;
      color:#080808;
      padding:7px 12px;
      border-radius:5px;
      font-weight:800;
    `
  );

  console.log(
    "Built with curiosity, systems thinking and intention."
  );

})();
