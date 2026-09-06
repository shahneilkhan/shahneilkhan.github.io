/* =========================================================
   SHAH NEIL KHAN — V3.1
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     01. ELEMENTS
  ======================================================= */

  const body = document.body;

  const header =
    document.querySelector(".site-header");

  const themeToggle =
    document.querySelector(".theme-toggle");

  const languageToggle =
    document.querySelector(".language-toggle");

  const rainToggle =
    document.querySelector(".rain-toggle");

  const rainContainer =
    document.querySelector(".rain-container");

  const birdsContainer =
    document.querySelector(".birds");

  const typingText =
    document.querySelector(".typing-text");

  const navLinks =
    document.querySelectorAll(".main-nav a");

  const sections =
    document.querySelectorAll("main section[id]");


  /* =======================================================
     02. STORAGE HELPERS
  ======================================================= */

  const storage = {
    get(key, fallback = null) {
      try {
        const value =
          localStorage.getItem(key);

        return value === null
          ? fallback
          : value;
      } catch {
        return fallback;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(
          key,
          value
        );
      } catch {
        // Ignore storage errors
      }
    }
  };


  /* =======================================================
     03. THEME
  ======================================================= */

  const savedTheme =
    storage.get("snk-theme", "dark");

  if (savedTheme === "light") {
    body.classList.add("light");
  }

  function updateThemeButton() {

    if (!themeToggle) return;

    const isLight =
      body.classList.contains("light");

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

    themeToggle.addEventListener(
      "click",
      () => {

        body.classList.toggle("light");

        const theme =
          body.classList.contains("light")
            ? "light"
            : "dark";

        storage.set(
          "snk-theme",
          theme
        );

        updateThemeButton();

      }
    );

  }


  /* =======================================================
     04. LANGUAGE
  ======================================================= */

  const translations = {

    en: {

      nav: [
        "Home",
        "Ecosystem",
        "AI",
        "Expertise",
        "Experience",
        "About",
        "Brand",
        "Contact"
      ],

      heroEyebrow:
        "UX · DIGITAL EXPERIENCE · SYSTEMS · AI",

      heroTitle:
        `I BUILD SYSTEMS.<br>
         I TRAIN MINDS.<br>
         I CREATE <span>IMPACT.</span>`,

      heroDescription:
        "I design digital experiences, build systems, explore AI and create ideas that move people forward.",

      explore:
        "Explore My World",

      connect:
        "Let's Connect",

      ecosystemKicker:
        "MY ECOSYSTEM",

      ecosystemTitle:
        "One mind.<br>Multiple directions.",

      ecosystemDescription:
        "Different platforms, different missions — connected by one vision.",

      aiKicker:
        "AI & THINKING",

      aiTitle:
        "I don't just use AI. I think with it.",

      aiDescription:
        "AI is becoming part of how I explore ideas, solve problems, automate workflows and understand what's possible next.",

      aiLink:
        "Let's build with intelligence ↗",

      expertiseKicker:
        "EXPERTISE",

      expertiseTitle:
        "Where design meets systems.",

      expertiseDescription:
        "A multidisciplinary approach to digital experience, product thinking and execution.",

      experienceKicker:
        "EXPERIENCE",

      experienceTitle:
        "EXPERIENCE<br>SHAPES THE MIND.",

      experienceDescription:
        "Every role teaches something. Every project changes how I think.",

      aboutKicker:
        "ABOUT",

      aboutTitle:
        "Curiosity drives<br>everything.",

      brandKicker:
        "BEYOND PORTFOLIO",

      brandTitle:
        "Ideas need a place<br>to travel.",

      contactKicker:
        "CONTACT",

      contactTitle:
        "Let's make something<br>meaningful.",

      contactDescription:
        "Have an idea, project or opportunity? Let's start a conversation."

    },


    bn: {

      nav: [
        "হোম",
        "ইকোসিস্টেম",
        "AI",
        "দক্ষতা",
        "অভিজ্ঞতা",
        "আমার সম্পর্কে",
        "ব্র্যান্ড",
        "যোগাযোগ"
      ],

      heroEyebrow:
        "UX · DIGITAL EXPERIENCE · SYSTEMS · AI",

      heroTitle:
        `আমি সিস্টেম তৈরি করি।<br>
         আমি চিন্তা গড়ে তুলি।<br>
         আমি <span>প্রভাব তৈরি করি।</span>`,

      heroDescription:
        "আমি ডিজিটাল অভিজ্ঞতা ডিজাইন করি, সিস্টেম তৈরি করি, AI নিয়ে কাজ করি এবং এমন আইডিয়া তৈরি করি যা মানুষকে সামনে এগিয়ে নিয়ে যায়।",

      explore:
        "আমার জগত দেখুন",

      connect:
        "যোগাযোগ করুন",

      ecosystemKicker:
        "আমার ইকোসিস্টেম",

      ecosystemTitle:
        "একটি মন।<br>বহু দিক।",

      ecosystemDescription:
        "বিভিন্ন প্ল্যাটফর্ম, বিভিন্ন উদ্দেশ্য — একটি ভিশনের মাধ্যমে সংযুক্ত।",

      aiKicker:
        "AI ও চিন্তাভাবনা",

      aiTitle:
        "আমি শুধু AI ব্যবহার করি না। AI-এর সাথে চিন্তা করি।",

      aiDescription:
        "আইডিয়া অন্বেষণ, সমস্যা সমাধান, workflow automation এবং ভবিষ্যতের সম্ভাবনা বোঝার ক্ষেত্রে AI আমার চিন্তার অংশ হয়ে উঠছে।",

      aiLink:
        "Intelligence দিয়ে তৈরি করি ↗",

      expertiseKicker:
        "দক্ষতা",

      expertiseTitle:
        "যেখানে design এবং systems একসাথে কাজ করে।",

      expertiseDescription:
        "Digital experience, product thinking এবং execution-এর একটি multidisciplinary approach।",

      experienceKicker:
        "অভিজ্ঞতা",

      experienceTitle:
        "অভিজ্ঞতা<br>চিন্তাকে গড়ে তোলে।",

      experienceDescription:
        "প্রতিটি role কিছু শেখায়। প্রতিটি project চিন্তার ধরন বদলে দেয়।",

      aboutKicker:
        "আমার সম্পর্কে",

      aboutTitle:
        "কৌতূহলই<br>সবকিছুর চালিকা শক্তি।",

      brandKicker:
        "PORTFOLIO-এর বাইরে",

      brandTitle:
        "আইডিয়ারও<br>একটি গন্তব্য দরকার।",

      contactKicker:
        "যোগাযোগ",

      contactTitle:
        "চলুন অর্থবহ কিছু<br>তৈরি করি।",

      contactDescription:
        "কোনো idea, project বা opportunity আছে? চলুন কথা বলি।"

    }

  };


  let currentLanguage =
    storage.get(
      "snk-language",
      "en"
    );

  if (
    currentLanguage !== "en" &&
    currentLanguage !== "bn"
  ) {
    currentLanguage = "en";
  }


  function setHTML(
    selector,
    value
  ) {

    const element =
      document.querySelector(selector);

    if (!element) return;

    element.innerHTML = value;
  }


  function setText(
    selector,
    value
  ) {

    const element =
      document.querySelector(selector);

    if (!element) return;

    element.textContent = value;
  }


  function applyLanguage(language) {

    const t =
      translations[language];

    if (!t) return;


    /* NAV */

    navLinks.forEach(
      (link, index) => {

        if (t.nav[index]) {
          link.textContent =
            t.nav[index];
        }

      }
    );


    /* HERO */

    setText(
      ".hero .eyebrow",
      t.heroEyebrow
    );

    setHTML(
      ".hero h1",
      t.heroTitle
    );

    setText(
      ".hero-description",
      t.heroDescription
    );

    setText(
      ".hero-actions .btn-primary",
      t.explore
    );

    setText(
      ".hero-actions .btn-secondary",
      t.connect
    );


    /* ECOSYSTEM */

    setText(
      ".ecosystem-section .section-kicker",
      t.ecosystemKicker
    );

    setHTML(
      ".ecosystem-section .section-heading h2",
      t.ecosystemTitle
    );

    setText(
      ".ecosystem-section .section-heading p",
      t.ecosystemDescription
    );


    /* AI */

    setText(
      ".ai-section .section-kicker",
      t.aiKicker
    );

    setText(
      ".ai-copy h2",
      t.aiTitle
    );

    setText(
      ".ai-copy > p:not(.section-kicker)",
      t.aiDescription
    );

    setText(
      ".ai-copy .text-link",
      t.aiLink
    );


    /* EXPERTISE */

    setText(
      ".expertise-section .section-kicker",
      t.expertiseKicker
    );

    setText(
      ".expertise-section .section-heading h2",
      t.expertiseTitle
    );

    setText(
      ".expertise-section .section-heading p",
      t.expertiseDescription
    );


    /* EXPERIENCE */

    setText(
      ".experience-heading .section-kicker",
      t.experienceKicker
    );

    setHTML(
      ".experience-heading h2",
      t.experienceTitle
    );

    setText(
      ".experience-heading > p:not(.section-kicker)",
      t.experienceDescription
    );


    /* ABOUT */

    setText(
      ".about-section .section-kicker",
      t.aboutKicker
    );

    setHTML(
      ".about-section .section-heading h2",
      t.aboutTitle
    );


    /* BRAND */

    setText(
      ".brand-section .section-kicker",
      t.brandKicker
    );

    setHTML(
      ".brand-section .section-heading h2",
      t.brandTitle
    );


    /* CONTACT */

    setText(
      ".contact-section .section-kicker",
      t.contactKicker
    );

    setHTML(
      ".contact-heading h2",
      t.contactTitle
    );

    setText(
      ".contact-heading > p:not(.section-kicker)",
      t.contactDescription
    );


    /* BUTTON */

    if (languageToggle) {

      languageToggle.textContent =
        language === "en"
          ? "বাংলা"
          : "EN";

    }


    document.documentElement.lang =
      language === "bn"
        ? "bn"
        : "en";

    storage.set(
      "snk-language",
      language
    );

  }


  applyLanguage(
    currentLanguage
  );


  if (languageToggle) {

    languageToggle.addEventListener(
      "click",
      () => {

        currentLanguage =
          currentLanguage === "en"
            ? "bn"
            : "en";

        applyLanguage(
          currentLanguage
        );

      }
    );

  }


  /* =======================================================
     05. TERMINAL TYPING
  ======================================================= */

  const typingWords = [

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


  function typeTerminal() {

    if (!typingText) return;

    const word =
      typingWords[wordIndex];

    if (!deleting) {

      characterIndex++;

      typingText.textContent =
        word.substring(
          0,
          characterIndex
        );

      if (
        characterIndex >=
        word.length
      ) {

        deleting = true;

        setTimeout(
          typeTerminal,
          1100
        );

        return;
      }

    } else {

      characterIndex--;

      typingText.textContent =
        word.substring(
          0,
          characterIndex
        );

      if (characterIndex <= 0) {

        deleting = false;

        wordIndex =
          (wordIndex + 1) %
          typingWords.length;

      }

    }

    setTimeout(
      typeTerminal,
      deleting ? 45 : 75
    );

  }


  typeTerminal();


  /* =======================================================
     06. RAIN
  ======================================================= */

  let rainActive =
    storage.get(
      "snk-rain",
      "off"
    ) === "on";


  function createRain() {

    if (!rainContainer) return;

    rainContainer.innerHTML = "";

    if (!rainActive) return;


    const amount =
      window.innerWidth < 700
        ? 55
        : 110;


    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const drop =
        document.createElement("span");

      drop.className =
        "rain-drop";

      drop.style.left =
        `${Math.random() * 100}%`;

      drop.style.height =
        `${12 + Math.random() * 22}px`;

      drop.style.opacity =
        `${.12 + Math.random() * .28}`;

      drop.style.animationDuration =
        `${.55 + Math.random() * .65}s`;

      drop.style.animationDelay =
        `${Math.random() * 1.5}s`;

      rainContainer.appendChild(
        drop
      );

    }

  }


  function updateRain() {

    body.classList.toggle(
      "rain-active",
      rainActive
    );

    if (rainToggle) {

      rainToggle.textContent =
        rainActive
          ? "Rain ✓"
          : "Rain";

    }

    storage.set(
      "snk-rain",
      rainActive
        ? "on"
        : "off"
    );

    createRain();

  }


  updateRain();


  if (rainToggle) {

    rainToggle.addEventListener(
      "click",
      () => {

        rainActive =
          !rainActive;

        updateRain();

      }
    );

  }


  /* =======================================================
     07. FLYING BIRDS
  ======================================================= */

  function createBirds() {

    if (!birdsContainer) return;

    birdsContainer.innerHTML = "";


    const amount =
      window.innerWidth < 600
        ? 3
        : 6;


    for (
      let i = 0;
      i < amount;
      i++
    ) {

      const bird =
        document.createElement("span");

      bird.className =
        "bird";

      bird.style.left =
        `${10 + Math.random() * 80}%`;

      bird.style.top =
        `${8 + Math.random() * 42}%`;

      bird.style.animation =
        `birdFly ${
          18 + Math.random() * 18
        }s linear infinite`;

      bird.style.animationDelay =
        `${Math.random() * -20}s`;

      bird.style.transform =
        `scale(${
          .65 + Math.random() * .65
        })`;

      birdsContainer.appendChild(
        bird
      );

    }

  }


  const birdAnimationStyle =
    document.createElement("style");

  birdAnimationStyle.textContent = `

    @keyframes birdFly {

      0% {
        transform:
          translate3d(
            -120px,
            0,
            0
          )
          scale(.7);
      }

      50% {
        transform:
          translate3d(
            35vw,
            -35px,
            0
          )
          scale(1);
      }

      100% {
        transform:
          translate3d(
            100vw,
            20px,
            0
          )
          scale(.65);
      }

    }

  `;

  document.head.appendChild(
    birdAnimationStyle
  );

  createBirds();


  /* =======================================================
     08. SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".section-heading, " +
      ".ecosystem-card, " +
      ".expertise-card, " +
      ".experience-card, " +
      ".about-copy, " +
      ".brand-banner, " +
      ".social-card, " +
      ".ai-copy, " +
      ".ai-visual"
    );


  revealElements.forEach(
    (element) => {

      element.classList.add(
        "reveal"
      );

    }
  );


  if (
    "IntersectionObserver"
    in window
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
                  "visible"
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
            "0px 0px -40px 0px"
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
          "visible"
        );

      }
    );

  }


  /* =======================================================
     09. HEADER SCROLL STATE
  ======================================================= */

  function updateHeader() {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
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


  /* =======================================================
     10. ACTIVE NAV
  ======================================================= */

  if (
    "IntersectionObserver"
    in window
  ) {

    const navObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

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

            }
          );

        },
        {
          rootMargin:
            "-30% 0px -55% 0px"
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


  /* =======================================================
     11. SMOOTH ANCHOR NAVIGATION
  ======================================================= */

  const internalLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  internalLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        (event) => {

          const targetId =
            link
              .getAttribute("href")
              .substring(1);

          if (!targetId) return;

          const target =
            document.getElementById(
              targetId
            );

          if (!target) return;

          event.preventDefault();


          const headerHeight =
            header
              ? header.offsetHeight
              : 0;


          const targetPosition =
            target.getBoundingClientRect()
              .top +
            window.scrollY -
            headerHeight;


          window.scrollTo({
            top:
              Math.max(
                targetPosition,
                0
              ),
            behavior:
              "smooth"
          });


          try {

            history.replaceState(
              null,
              "",
              `#${targetId}`
            );

          } catch {
            // Ignore history errors
          }

        }
      );

    }
  );


  /* =======================================================
     12. HOME HASH FIX
  ======================================================= */

  if (
    window.location.hash === "#home"
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
     13. CARD POINTER EFFECT
  ======================================================= */

  const interactiveCards =
    document.querySelectorAll(
      ".ecosystem-card, " +
      ".expertise-card, " +
      ".social-card, " +
      ".brand-banner"
    );


  interactiveCards.forEach(
    (card) => {

      card.addEventListener(
        "pointermove",
        (event) => {

          if (
            window.innerWidth < 800
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
            ((y / rect.height) -
              .5) * -3;

          const rotateY =
            ((x / rect.width) -
              .5) * 3;


          card.style.transform =
            `
              perspective(900px)
              translateY(-7px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
            `;

        }
      );


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.transform = "";

        }
      );

    }
  );


  /* =======================================================
     14. KEYBOARD SHORTCUT
  ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key.toLowerCase() === "t" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey
      ) {

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

        if (isTyping) return;

        if (themeToggle) {
          themeToggle.click();
        }

      }

    }
  );


  /* =======================================================
     15. RESIZE
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

            createRain();
            createBirds();

          },
          250
        );

    }
  );


  /* =======================================================
     16. CONSOLE BRANDING
  ======================================================= */

  console.log(
    "%c SHAH NEIL KHAN ",
    "background:#d89a55;color:#080808;font-size:18px;font-weight:800;padding:8px 14px;"
  );

  console.log(
    "%cI BUILD SYSTEMS. I TRAIN MINDS. I CREATE IMPACT.",
    "color:#d89a55;font-size:12px;font-weight:600;"
  );


});
