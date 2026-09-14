/* =========================================================
   SNK PORTFOLIO — FINAL V3.2
   Shah Neil Khan
   ========================================================= */

(() => {
  "use strict";


  /* =======================================================
     HELPERS
     ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));

  const storage = {
    get(key, fallback = null) {
      try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : value;
      } catch {
        return fallback;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, value);
      } catch {
        // Storage may be unavailable.
      }
    }
  };


  /* =======================================================
     DOM READY
     ======================================================= */

  document.addEventListener("DOMContentLoaded", () => {

    initTheme();
    initLanguage();
    initRain();
    initTerminal();
    initBirds();
    initReveal();
    initHeader();
    initNavigation();
    initMobileMenu();
    initCardEffects();
    initExternalLinks();
    initFooterYear();

  });


  /* =======================================================
     THEME
     ======================================================= */

  function initTheme() {

    const html = document.documentElement;
    const themeButton = $("#themeToggle");

    const savedTheme =
      storage.get("snk-theme", "dark");

    const preferredTheme =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";

    const initialTheme =
      savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : preferredTheme;

    setTheme(initialTheme, false);


    if (themeButton) {

      themeButton.addEventListener("click", () => {

        const current =
          html.getAttribute("data-theme") || "dark";

        const next =
          current === "dark"
            ? "light"
            : "dark";

        setTheme(next, true);

      });

    }


    /* Keyboard shortcut: T */
    document.addEventListener("keydown", event => {

      if (
        event.key.toLowerCase() === "t" &&
        !isTypingTarget(event.target)
      ) {

        const current =
          html.getAttribute("data-theme") || "dark";

        setTheme(
          current === "dark" ? "light" : "dark",
          true
        );

      }

    });

  }


  function setTheme(theme, save = true) {

    const html = document.documentElement;
    const themeButton = $("#themeToggle");

    html.setAttribute(
      "data-theme",
      theme
    );

    if (save) {
      storage.set("snk-theme", theme);
    }

    if (themeButton) {

      themeButton.setAttribute(
        "aria-label",
        theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      );

      themeButton.setAttribute(
        "title",
        theme === "dark"
          ? "Light mode"
          : "Dark mode"
      );

    }

  }


  /* =======================================================
     LANGUAGE
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

      rain: "Rain",

      heroEyebrow:
        "UX · SYSTEMS · AI · DIGITAL EXPERIENCE",

      heroTitle:
        "I BUILD SYSTEMS.<br>I TRAIN MINDS.<br>I CREATE <span>IMPACT.</span>",

      heroDescription:
        "I design digital experiences, build intelligent systems, and turn complex ideas into meaningful products.",

      explore:
        "Explore the Work",

      connect:
        "Let's Connect",

      terminalInit:
        "thinking...",

      scroll:
        "SCROLL",

      kicker01:
        "01 — ECOSYSTEM",

      ecosystemTitle:
        "BUILT AS A SYSTEM.<br>NOT JUST A PORTFOLIO.",

      ecosystemDescription:
        "Explore the digital ecosystem around SNK. Each destination has its own purpose, audience and identity.",

      websitesLabel:
        "DIGITAL BUSINESS",

      websitesDescription:
        "Digital solutions and web-focused services.",

      tabayyunLabel:
        "INSTITUTE",

      tabayyunDescription:
        "A separate destination for the Tabayyun ecosystem.",

      snkitLabel:
        "EDUCATION",

      snkitDescription:
        "An evolving learning and technology initiative.",

      sarakatLabel:
        "AGENCY",

      sarakatDescription:
        "A creative and digital agency destination.",

      snkdesignLabel:
        "DESIGN",

      snkdesignDescription:
        "Design direction, visual systems and creative work.",

      kicker02:
        "02 — AI / CONTEXT ENGINEERING",

      aiTitle:
        "INTELLIGENCE NEEDS<br><span>CONTEXT.</span>",

      aiDescription:
        "I approach AI as a system-design problem: context, structure, reasoning, interaction and outcomes.",

      aiPoint1:
        "Context before output.",

      aiPoint2:
        "Systems before shortcuts.",

      aiPoint3:
        "Human outcomes before hype.",

      kicker03:
        "03 — ENGINEERING MINDSET",

      systemUnderstand:
        "Understand",

      systemUnderstandText:
        "Find the real problem before touching the interface.",

      systemStructure:
        "Structure",

      systemStructureText:
        "Turn complexity into clear systems, flows and decisions.",

      systemExecute:
        "Execute",

      systemExecuteText:
        "Move from strategy to useful, buildable digital experiences.",

      systemImprove:
        "Improve",

      systemImproveText:
        "Learn from real usage and continuously refine the system.",

      expertiseTitle:
        "WHERE DESIGN MEETS<br><span>SYSTEMS THINKING.</span>",

      expertiseDescription:
        "A multidisciplinary approach connecting UX, digital products, AI and creative direction.",

      exp1Title:
        "UX Strategy",

      exp1Text:
        "Research, flows, information architecture and experience strategy.",

      exp2Title:
        "Digital Experience",

      exp2Text:
        "Designing cohesive experiences across digital touchpoints.",

      exp3Title:
        "AI-Assisted Systems",

      exp3Text:
        "Context-aware workflows and human-centered AI experiences.",

      exp4Title:
        "Design Systems",

      exp4Text:
        "Scalable components, patterns and visual consistency.",

      exp5Title:
        "Creative Direction",

      exp5Text:
        "Brand thinking, visual language and creative execution.",

      exp6Title:
        "Systems Thinking",

      exp6Text:
        "Connecting people, processes, technology and outcomes.",

      kicker04:
        "05 — EXPERIENCE",

      experienceTitle:
        "EXPERIENCE SHAPES<br><span>THE MIND.</span>",

      experienceIntro:
        "A growing body of work across UX, digital experience, systems and creative technology.",

      experienceLocation:
        "REMOTE · TEXAS, USA",

      experienceDescription:
        "Leading digital experience thinking with a focus on clarity, usability, systems and meaningful outcomes.",

      philosophy:
        "PHILOSOPHY",

      kicker05:
        "06 — ABOUT",

      aboutTitle:
        "DESIGNER.<br>THINKER.<br><span>BUILDER.</span>",

      aboutLead:
        "I work at the intersection of design, technology and systems thinking.",

      aboutText1:
        "My approach starts with understanding people, problems and context before moving toward interfaces.",

      aboutText2:
        "The goal is not simply to make something look good. The goal is to make the whole system make sense.",

      aboutSignature:
        "— Shah Neil Khan",

      brandEyebrow:
        "THE SNK BRAND",

      brandTitle:
        "ONE MIND.<br>MULTIPLE DIRECTIONS.",

      brandDescription:
        "Explore the wider SNK ecosystem and the ideas being built around it.",

      kicker06:
        "07 — CONTACT",

      contactTitle:
        "LET'S BUILD<br><span>SOMETHING MEANINGFUL.</span>",

      contactDescription:
        "Have an idea, a problem or a system worth building? Let's start a conversation."

    },


    bn: {

      navHome: "হোম",
      navEcosystem: "ইকোসিস্টেম",
      navAI: "এআই",
      navExpertise: "দক্ষতা",
      navExperience: "অভিজ্ঞতা",
      navAbout: "আমার সম্পর্কে",
      navBrand: "ব্র্যান্ড",
      navContact: "যোগাযোগ",

      rain: "বৃষ্টি",

      heroEyebrow:
        "UX · SYSTEMS · AI · DIGITAL EXPERIENCE",

      heroTitle:
        "আমি সিস্টেম তৈরি করি।<br>আমি চিন্তাকে প্রশিক্ষণ দিই।<br>আমি তৈরি করি <span>ইমপ্যাক্ট।</span>",

      heroDescription:
        "আমি ডিজিটাল এক্সপেরিয়েন্স ডিজাইন করি, ইন্টেলিজেন্ট সিস্টেম তৈরি করি এবং জটিল ধারণাকে অর্থবহ প্রোডাক্টে রূপ দিই।",

      explore:
        "কাজগুলো দেখুন",

      connect:
        "যোগাযোগ করুন",

      terminalInit:
        "ভাবছি...",

      scroll:
        "স্ক্রল",

      kicker01:
        "০১ — ইকোসিস্টেম",

      ecosystemTitle:
        "একটি সিস্টেম হিসেবে তৈরি।<br>শুধু একটি পোর্টফোলিও নয়।",

      ecosystemDescription:
        "SNK-এর ডিজিটাল ইকোসিস্টেম দেখুন। প্রতিটি গন্তব্যের নিজস্ব উদ্দেশ্য, দর্শক ও পরিচয় রয়েছে।",

      websitesLabel:
        "ডিজিটাল বিজনেস",

      websitesDescription:
        "ডিজিটাল সলিউশন ও ওয়েব-কেন্দ্রিক সার্ভিস।",

      tabayyunLabel:
        "ইনস্টিটিউট",

      tabayyunDescription:
        "Tabayyun ইকোসিস্টেমের জন্য আলাদা একটি গন্তব্য।",

      snkitLabel:
        "এডুকেশন",

      snkitDescription:
        "একটি বিকাশমান লার্নিং ও টেকনোলজি উদ্যোগ।",

      sarakatLabel:
        "এজেন্সি",

      sarakatDescription:
        "ক্রিয়েটিভ ও ডিজিটাল এজেন্সি গন্তব্য।",

      snkdesignLabel:
        "ডিজাইন",

      snkdesignDescription:
        "ডিজাইন ডিরেকশন, ভিজ্যুয়াল সিস্টেম ও ক্রিয়েটিভ কাজ।",

      kicker02:
        "০২ — AI / CONTEXT ENGINEERING",

      aiTitle:
        "ইন্টেলিজেন্সের প্রয়োজন<br><span>কনটেক্সট।</span>",

      aiDescription:
        "আমি AI-কে একটি সিস্টেম-ডিজাইন সমস্যা হিসেবে দেখি—কনটেক্সট, স্ট্রাকচার, রিজনিং, ইন্টারঅ্যাকশন এবং ফলাফল।",

      aiPoint1:
        "Output-এর আগে Context।",

      aiPoint2:
        "Shortcut-এর আগে System।",

      aiPoint3:
        "Hype-এর আগে Human Outcome।",

      kicker03:
        "০৩ — ENGINEERING MINDSET",

      systemUnderstand:
        "বোঝা",

      systemUnderstandText:
        "ইন্টারফেসে যাওয়ার আগে আসল সমস্যাটি খুঁজে বের করা।",

      systemStructure:
        "গঠন",

      systemStructureText:
        "জটিলতাকে পরিষ্কার সিস্টেম, ফ্লো ও সিদ্ধান্তে রূপ দেওয়া।",

      systemExecute:
        "বাস্তবায়ন",

      systemExecuteText:
        "স্ট্র্যাটেজি থেকে ব্যবহারযোগ্য ও buildable digital experience তৈরি করা।",

      systemImprove:
        "উন্নতি",

      systemImproveText:
        "বাস্তব ব্যবহার থেকে শেখা এবং সিস্টেমকে ক্রমাগত উন্নত করা।",

      expertiseTitle:
        "যেখানে ডিজাইনের সাথে<br><span>সিস্টেম থিংকিং মিলিত হয়।</span>",

      expertiseDescription:
        "UX, digital product, AI এবং creative direction-কে একসাথে যুক্ত করা একটি multidisciplinary approach।",

      exp1Title:
        "UX Strategy",

      exp1Text:
        "Research, user flow, information architecture এবং experience strategy।",

      exp2Title:
        "Digital Experience",

      exp2Text:
        "বিভিন্ন digital touchpoint-এর জন্য cohesive experience তৈরি।",

      exp3Title:
        "AI-Assisted Systems",

      exp3Text:
        "Context-aware workflow এবং human-centered AI experience।",

      exp4Title:
        "Design Systems",

      exp4Text:
        "Scalable component, pattern এবং visual consistency।",

      exp5Title:
        "Creative Direction",

      exp5Text:
        "Brand thinking, visual language এবং creative execution।",

      exp6Title:
        "Systems Thinking",

      exp6Text:
        "মানুষ, process, technology এবং outcome-কে একসাথে দেখা।",

      kicker04:
        "০৫ — EXPERIENCE",

      experienceTitle:
        "অভিজ্ঞতা তৈরি করে<br><span>চিন্তার ধরন।</span>",

      experienceIntro:
        "UX, digital experience, systems এবং creative technology নিয়ে ক্রমবর্ধমান কাজের অভিজ্ঞতা।",

      experienceLocation:
        "রিমোট · TEXAS, USA",

      experienceDescription:
        "Clarity, usability, systems এবং meaningful outcome-কে কেন্দ্র করে digital experience thinking পরিচালনা করা।",

      philosophy:
        "দর্শন",

      kicker05:
        "০৬ — ABOUT",

      aboutTitle:
        "DESIGNER.<br>THINKER.<br><span>BUILDER.</span>",

      aboutLead:
        "আমি design, technology এবং systems thinking-এর intersection-এ কাজ করি।",

      aboutText1:
        "আমার approach শুরু হয় মানুষ, সমস্যা এবং context বোঝার মাধ্যমে—interface নিয়ে কাজ শুরু করার আগে।",

      aboutText2:
        "লক্ষ্য শুধু সুন্দর কিছু তৈরি করা নয়। লক্ষ্য হলো পুরো system-টাকে meaningful করে তোলা।",

      aboutSignature:
        "— Shah Neil Khan",

      brandEyebrow:
        "THE SNK BRAND",

      brandTitle:
        "একটি মন।<br>একাধিক দিক।",

      brandDescription:
        "SNK-এর বৃহত্তর ecosystem এবং তার চারপাশে তৈরি হওয়া ধারণাগুলো দেখুন।",

      kicker06:
        "০৭ — CONTACT",

      contactTitle:
        "চলুন তৈরি করি<br><span>অর্থবহ কিছু।</span>",

      contactDescription:
        "কোনো idea, problem বা build করার মতো system আছে? চলুন কথা বলা শুরু করি।"

    }

  };


  function initLanguage() {

    const languageButton =
      $("#languageToggle");

    const savedLanguage =
      storage.get("snk-language", "en");

    const initialLanguage =
      savedLanguage === "bn"
        ? "bn"
        : "en";

    applyLanguage(initialLanguage, false);


    if (languageButton) {

      languageButton.addEventListener(
        "click",
        () => {

          const current =
            storage.get(
              "snk-language",
              "en"
            );

          const next =
            current === "en"
              ? "bn"
              : "en";

          applyLanguage(next, true);

        }
      );

    }

  }


  function applyLanguage(language, save = true) {

    const dictionary =
      translations[language] || translations.en;

    $$("[data-i18n]").forEach(element => {

      const key =
        element.getAttribute("data-i18n");

      if (
        Object.prototype.hasOwnProperty.call(
          dictionary,
          key
        )
      ) {

        element.innerHTML =
          dictionary[key];

      }

    });


    document.documentElement.lang =
      language === "bn"
        ? "bn"
        : "en";


    const languageButton =
      $("#languageToggle");

    if (languageButton) {

      const label =
        language === "en"
          ? "বাংলা"
          : "EN";

      languageButton.innerHTML =
        `<span>${label}</span>`;

      languageButton.setAttribute(
        "title",
        language === "en"
          ? "বাংলা"
          : "English"
      );

      languageButton.setAttribute(
        "aria-label",
        language === "en"
          ? "Switch to Bengali"
          : "Switch to English"
      );

    }


    if (save) {
      storage.set(
        "snk-language",
        language
      );
    }

  }


  /* =======================================================
     RAIN
     ======================================================= */

  function initRain() {

    const layer =
      $("#rainLayer");

    const button =
      $("#rainToggle");

    if (!layer) {
      return;
    }


    createRain(layer);


    const saved =
      storage.get(
        "snk-rain",
        "off"
      );

    if (saved === "on") {
      enableRain(false);
    }


    if (button) {

      button.addEventListener(
        "click",
        () => {

          const active =
            document.body.classList.contains(
              "rain-active"
            );

          if (active) {
            disableRain(true);
          } else {
            enableRain(true);
          }

        }
      );

    }


    /* Keyboard shortcut: R */

    document.addEventListener(
      "keydown",
      event => {

        if (
          event.key.toLowerCase() === "r" &&
          !isTypingTarget(event.target)
        ) {

          const active =
            document.body.classList.contains(
              "rain-active"
            );

          active
            ? disableRain(true)
            : enableRain(true);

        }

      }
    );

  }


  function createRain(layer) {

    layer.innerHTML = "";

    const amount =
      window.innerWidth < 640
        ? 65
        : 120;

    const fragment =
      document.createDocumentFragment();


    for (let i = 0; i < amount; i++) {

      const drop =
        document.createElement("span");

      drop.className =
        "rain-drop";

      drop.style.left =
        `${Math.random() * 110}%`;

      drop.style.animationDuration =
        `${0.7 + Math.random() * 1.2}s`;

      drop.style.animationDelay =
        `${Math.random() * 2}s`;

      drop.style.height =
        `${14 + Math.random() * 28}px`;

      drop.style.opacity =
        `${0.08 + Math.random() * 0.28}`;

      fragment.appendChild(drop);

    }


    layer.appendChild(fragment);

  }


  function enableRain(save = true) {

    document.body.classList.add(
      "rain-active"
    );

    const button =
      $("#rainToggle");

    if (button) {

      button.setAttribute(
        "aria-pressed",
        "true"
      );

      button.setAttribute(
        "title",
        "Turn rain off"
      );

    }

    if (save) {
      storage.set(
        "snk-rain",
        "on"
      );
    }

  }


  function disableRain(save = true) {

    document.body.classList.remove(
      "rain-active"
    );

    const button =
      $("#rainToggle");

    if (button) {

      button.setAttribute(
        "aria-pressed",
        "false"
      );

      button.setAttribute(
        "title",
        "Turn rain on"
      );

    }

    if (save) {
      storage.set(
        "snk-rain",
        "off"
      );
    }

  }


  /* =======================================================
     TERMINAL TYPING
     ======================================================= */

  function initTerminal() {

    const terminal =
      $("#terminalTyping");

    if (!terminal) {
      return;
    }


    const words = [
      "thinking...",
      "designing...",
      "building...",
      "learning...",
      "creating...",
      "solving..."
    ];


    let wordIndex = 0;
    let characterIndex = 0;

    let deleting = false;


    function tick() {

      const currentWord =
        words[wordIndex];


      if (!deleting) {

        characterIndex++;

        terminal.textContent =
          currentWord.slice(
            0,
            characterIndex
          );


        if (
          characterIndex >=
          currentWord.length
        ) {

          deleting = true;

          setTimeout(
            tick,
            1300
          );

          return;
        }


        setTimeout(
          tick,
          75
        );

      } else {

        characterIndex--;

        terminal.textContent =
          currentWord.slice(
            0,
            characterIndex
          );


        if (characterIndex <= 0) {

          deleting = false;

          wordIndex =
            (wordIndex + 1) %
            words.length;

          setTimeout(
            tick,
            350
          );

          return;
        }


        setTimeout(
          tick,
          42
        );

      }

    }


    terminal.textContent = "";

    tick();

  }


  /* =======================================================
     BIRDS
     ======================================================= */

  function initBirds() {

    const birds =
      $("#birds");

    if (!birds) {
      return;
    }


    birds.innerHTML = "";


    const amount =
      window.innerWidth < 640
        ? 2
        : 3;


    for (let i = 0; i < amount; i++) {

      const bird =
        document.createElement("span");

      bird.className =
        "bird";

      birds.appendChild(bird);

    }

  }


  /* =======================================================
     REVEAL
     IMPORTANT:
     CSS uses .reveal.in
     ======================================================= */

  function initReveal() {

    const elements =
      $$(".reveal");


    if (!elements.length) {
      return;
    }


    if (
      window.matchMedia &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {

      elements.forEach(
        element => {
          element.classList.add("in");
        }
      );

      return;
    }


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "in"
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
            "0px 0px -50px 0px"
        }
      );


    elements.forEach(
      element => {
        observer.observe(element);
      }
    );

  }


  /* =======================================================
     HEADER SCROLL
     ======================================================= */

  function initHeader() {

    const header =
      $("#siteHeader");

    if (!header) {
      return;
    }


    const update =
      () => {

        if (window.scrollY > 30) {

          header.classList.add(
            "scrolled"
          );

        } else {

          header.classList.remove(
            "scrolled"
          );

        }

      };


    update();


    window.addEventListener(
      "scroll",
      update,
      {
        passive: true
      }
    );

  }


  /* =======================================================
     NAVIGATION
     ======================================================= */

  function initNavigation() {

    const navLinks =
      $$(".main-nav a");

    if (!navLinks.length) {
      return;
    }


    const sections =
      $$("main section[id]");


    /* -------------------------------------------------------
       Smooth anchors
       ------------------------------------------------------- */

    navLinks.forEach(link => {

      const href =
        link.getAttribute("href");

      if (
        !href ||
        !href.startsWith("#") ||
        href === "#"
      ) {
        return;
      }


      link.addEventListener(
        "click",
        event => {

          const target =
            document.querySelector(href);

          if (!target) {
            return;
          }


          event.preventDefault();

          closeMobileMenu();

          scrollToSection(
            target
          );

        }
      );

    });


    /* -------------------------------------------------------
       Active section
       ------------------------------------------------------- */

    if (
      "IntersectionObserver" in window &&
      sections.length
    ) {

      const observer =
        new IntersectionObserver(
          entries => {

            const visible =
              entries
                .filter(
                  entry =>
                    entry.isIntersecting
                )
                .sort(
                  (a, b) =>
                    b.intersectionRatio -
                    a.intersectionRatio
                );


            if (!visible.length) {
              return;
            }


            const id =
              visible[0].target.id;


            navLinks.forEach(link => {

              const href =
                link.getAttribute("href");


              link.classList.toggle(
                "active",
                href === `#${id}`
              );

            });

          },
          {
            threshold: [0.15, 0.3, 0.5],
            rootMargin:
              "-15% 0px -60% 0px"
          }
        );


      sections.forEach(
        section =>
          observer.observe(section)
      );

    }


    /* -------------------------------------------------------
       Hash on initial page load
       ------------------------------------------------------- */

    if (window.location.hash) {

      const hash =
        window.location.hash;

      const target =
        document.querySelector(hash);

      if (target) {

        setTimeout(
          () => {
            scrollToSection(
              target,
              false
            );
          },
          100
        );

      }

    }

  }


  function scrollToSection(
    target,
    updateHash = true
  ) {

    const header =
      $("#siteHeader");

    const offset =
      header
        ? header.offsetHeight + 15
        : 15;


    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      offset;


    window.scrollTo({
      top,
      behavior: "smooth"
    });


    if (updateHash) {

      history.replaceState(
        null,
        "",
        `#${target.id}`
      );

    }

  }


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  function initMobileMenu() {

    const button =
      $("#mobileMenuBtn");

    const nav =
      $("#mainNav");

    if (!button || !nav) {
      return;
    }


    button.addEventListener(
      "click",
      () => {

        const open =
          nav.classList.toggle(
            "is-open"
          );

        button.classList.toggle(
          "is-open",
          open
        );

        button.setAttribute(
          "aria-expanded",
          String(open)
        );

        document.body.classList.toggle(
          "menu-open",
          open
        );

      }
    );


    document.addEventListener(
      "keydown",
      event => {

        if (event.key === "Escape") {

          closeMobileMenu();

        }

      }
    );


    document.addEventListener(
      "click",
      event => {

        if (!nav.classList.contains("is-open")) {
          return;
        }


        if (
          nav.contains(event.target) ||
          button.contains(event.target)
        ) {
          return;
        }


        closeMobileMenu();

      }
    );

  }


  function closeMobileMenu() {

    const nav =
      $("#mainNav");

    const button =
      $("#mobileMenuBtn");


    if (nav) {

      nav.classList.remove(
        "is-open"
      );

    }


    if (button) {

      button.classList.remove(
        "is-open"
      );

      button.setAttribute(
        "aria-expanded",
        "false"
      );

    }


    document.body.classList.remove(
      "menu-open"
    );

  }


  /* =======================================================
     CARD HOVER / TILT
     ======================================================= */

  function initCardEffects() {

    if (
      window.matchMedia &&
      window.matchMedia(
        "(pointer: coarse)"
      ).matches
    ) {
      return;
    }


    const cards =
      $$(
        ".ecosystem-card, .expertise-card, .mindset-card"
      );


    cards.forEach(card => {

      card.addEventListener(
        "pointermove",
        event => {

          const rect =
            card.getBoundingClientRect();


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
            -2.5;

          const rotateY =
            ((x - centerX) /
              centerX) *
            2.5;


          card.style.transform =
            `perspective(900px) ` +
            `rotateX(${rotateX}deg) ` +
            `rotateY(${rotateY}deg) ` +
            `translateY(-5px)`;

        }
      );


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.transform =
            "";

        }
      );

    });

  }


  /* =======================================================
     EXTERNAL LINKS
     ======================================================= */

  function initExternalLinks() {

    $$("a[href]").forEach(link => {

      const href =
        link.getAttribute("href");


      if (!href) {
        return;
      }


      if (
        href.startsWith("http://") ||
        href.startsWith("https://")
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

    });

  }


  /* =======================================================
     FOOTER YEAR
     ======================================================= */

  function initFooterYear() {

    const year =
      $("#footerYear");

    if (year) {

      year.textContent =
        new Date().getFullYear();

    }

  }


  /* =======================================================
     RESIZE
     ======================================================= */

  let resizeTimer = null;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(
          () => {

            const rain =
              $("#rainLayer");

            if (
              rain &&
              document.body.classList.contains(
                "rain-active"
              )
            ) {

              createRain(rain);

            }


            initBirds();


            if (
              window.innerWidth > 900
            ) {

              closeMobileMenu();

            }

          },
          180
        );

    }
  );


  /* =======================================================
     UTILITY
     ======================================================= */

  function isTypingTarget(element) {

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
     CONSOLE BRANDING
     ======================================================= */

  console.log(
    "%cSNK — Shah Neil Khan",
    "font-size:18px;font-weight:700;"
  );

  console.log(
    "%cFinal V3.2 system initialized.",
    "font-size:12px;"
  );

})();
