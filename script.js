/* ============================================================
   SNK V3 — INTERACTION ENGINE
============================================================ */

(() => {

  "use strict";


  /* ==========================================================
     HELPERS
  ========================================================== */

  const $ = (selector, scope = document) =>
    scope.querySelector(selector);

  const $$ = (selector, scope = document) =>
    [...scope.querySelectorAll(selector)];


  const html = document.documentElement;
  const body = document.body;


  /* ==========================================================
     REDUCED MOTION
  ========================================================== */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  /* ==========================================================
     SETTINGS
  ========================================================== */

  const STORAGE = {

    theme: "snk-theme",
    language: "snk-language",
    rain: "snk-rain"

  };


  /* ==========================================================
     THEME
  ========================================================== */

  const themeToggle = $("#themeToggle");
  const themeIcon = $("#themeIcon");


  function applyTheme(theme) {

    const safeTheme =
      theme === "light"
        ? "light"
        : "dark";

    html.dataset.theme = safeTheme;

    localStorage.setItem(
      STORAGE.theme,
      safeTheme
    );

    if (themeIcon) {

      themeIcon.textContent =
        safeTheme === "dark"
          ? "☀"
          : "☾";

    }
  }


  const savedTheme =
    localStorage.getItem(STORAGE.theme)
    || "dark";

  applyTheme(savedTheme);


  themeToggle?.addEventListener(
    "click",
    () => {

      const next =
        html.dataset.theme === "dark"
          ? "light"
          : "dark";

      applyTheme(next);

    }
  );


  /* ==========================================================
     LANGUAGE
  ========================================================== */

  const languageToggle =
    $("#languageToggle");

  const languageLabel =
    $("#languageLabel");


  const translations = {

    en: {

      brandSubtitle:
        "PERSONAL BRAND",

      navHome: "Home",
      navWork: "Work",
      navAI: "AI",
      navExpertise: "Expertise",
      navExperience: "Experience",
      navAbout: "About",
      navBrand: "Brand",
      navContact: "Contact",

      heroLineOne:
        "I BUILD SYSTEMS.",

      heroLineTwo:
        "I TRAIN MINDS.",

      heroLineThree:
        "I CREATE IMPACT.",

      heroDescription:
        "Software engineering, artificial intelligence, product thinking and human-centered experiences — connected through one personal vision.",

      exploreWork:
        "EXPLORE MY WORK →",

      buildTogether:
        "LET'S BUILD →",

      systemOnline:
        "SYSTEM / ONLINE",

      aiConnected:
        "AI CONNECTED",

      contextReady:
        "CONTEXT READY",

      ecosystemTitle:
        "ONE PERSON. MULTIPLE WORLDS.",

      ecosystemDescription:
        "Technology, intelligence and purpose — connected through the Shah Neil Khan personal brand.",

      techTitle:
        "TECHNOLOGY",

      intelligenceTitle:
        "INTELLIGENCE",

      purposeTitle:
        "PURPOSE",

      exploreTechnology:
        "BUILD DIGITAL SYSTEMS →",

      exploreIntelligence:
        "EXPLORE INTELLIGENCE →",

      exploreTabayyun:
        "EXPLORE TABAYYUN →",

      workTitle:
        "SELECTED WORK.",

      workDescription:
        "Real work first. No invented case studies. Projects will grow here as the portfolio evolves.",

      websitesDealDescription:
        "A web experience built as part of my digital work and experimentation.",

      aiTitle:
        "AI THAT UNDERSTANDS CONTEXT.",

      aiDescription:
        "Modern AI isn't only about choosing a powerful model. It's about giving the model the right context, memory, knowledge, tools and constraints.",

      mindsetTitle:
        "I DON'T JUST BUILD. I THINK FIRST.",

      mindsetDescription:
        "Every product starts with a problem. I turn that problem into a system that is useful, scalable, secure and continuously improvable.",

      expertiseTitle:
        "WHAT I BRING TO THE TABLE.",

      experienceTitle:
        "WHERE I'VE BUILT & CONTRIBUTED.",

      aboutTitle:
        "I BUILD WITH CURIOSITY, ENGINEERING DISCIPLINE, AND PURPOSE.",

      contactTitle:
        "HAVE AN IDEA? LET'S BUILD IT.",

      contactDescription:
        "For software, AI, product, UX or engineering conversations."

    },


    bn: {

      brandSubtitle:
        "ব্যক্তিগত ব্র্যান্ড",

      navHome: "হোম",
      navWork: "কাজ",
      navAI: "এআই",
      navExpertise: "দক্ষতা",
      navExperience: "অভিজ্ঞতা",
      navAbout: "পরিচিতি",
      navBrand: "ব্র্যান্ড",
      navContact: "যোগাযোগ",

      heroLineOne:
        "আমি সিস্টেম তৈরি করি।",

      heroLineTwo:
        "আমি মননকে প্রশিক্ষিত করি।",

      heroLineThree:
        "আমি প্রভাব তৈরি করি।",

      heroDescription:
        "সফটওয়্যার ইঞ্জিনিয়ারিং, কৃত্রিম বুদ্ধিমত্তা, প্রোডাক্ট চিন্তা এবং মানবকেন্দ্রিক অভিজ্ঞতা—একটি ব্যক্তিগত দৃষ্টিভঙ্গির মাধ্যমে একত্রিত।",

      exploreWork:
        "আমার কাজ দেখুন →",

      buildTogether:
        "চলুন তৈরি করি →",

      systemOnline:
        "সিস্টেম / অনলাইন",

      aiConnected:
        "এআই সংযুক্ত",

      contextReady:
        "কনটেক্সট প্রস্তুত",

      ecosystemTitle:
        "একজন মানুষ। একাধিক জগৎ।",

      ecosystemDescription:
        "প্রযুক্তি, বুদ্ধিমত্তা ও উদ্দেশ্য—Shah Neil Khan personal brand-এর মাধ্যমে সংযুক্ত।",

      techTitle:
        "প্রযুক্তি",

      intelligenceTitle:
        "বুদ্ধিমত্তা",

      purposeTitle:
        "উদ্দেশ্য",

      exploreTechnology:
        "ডিজিটাল সিস্টেম তৈরি করুন →",

      exploreIntelligence:
        "ইন্টেলিজেন্স দেখুন →",

      exploreTabayyun:
        "তাবাইয়ুন দেখুন →",

      workTitle:
        "নির্বাচিত কাজ।",

      workDescription:
        "প্রথমে বাস্তব কাজ। কোনো বানানো case study নয়। Portfolio যত বাড়বে, এখানে নতুন কাজ যুক্ত হবে।",

      websitesDealDescription:
        "আমার digital work ও experimentation-এর অংশ হিসেবে তৈরি একটি web experience।",

      aiTitle:
        "এআই যা কনটেক্সট বোঝে।",

      aiDescription:
        "আধুনিক AI শুধু শক্তিশালী model বেছে নেওয়ার বিষয় নয়। সঠিক context, memory, knowledge, tools এবং constraints দেওয়াই গুরুত্বপূর্ণ।",

      mindsetTitle:
        "আমি শুধু তৈরি করি না। আগে চিন্তা করি।",

      mindsetDescription:
        "প্রতিটি product একটি problem থেকে শুরু হয়। আমি সেই problem-কে useful, scalable, secure এবং continuously improvable system-এ রূপ দিই।",

      expertiseTitle:
        "আমি কী নিয়ে আসি।",

      experienceTitle:
        "যেখানে আমি তৈরি করেছি ও অবদান রেখেছি।",

      aboutTitle:
        "কৌতূহল, engineering discipline এবং উদ্দেশ্য নিয়ে আমি তৈরি করি।",

      contactTitle:
        "কোনো আইডিয়া আছে? চলুন তৈরি করি।",

      contactDescription:
        "Software, AI, product, UX অথবা engineering নিয়ে কথা বলতে যোগাযোগ করুন।"

    }

  };


  function applyLanguage(language) {

    const lang =
      language === "bn"
        ? "bn"
        : "en";

    html.lang =
      lang === "bn"
        ? "bn"
        : "en";

    body.classList.toggle(
      "lang-bn",
      lang === "bn"
    );

    $$("[data-i18n]").forEach(
      element => {

        const key =
          element.dataset.i18n;

        if (
          translations[lang] &&
          translations[lang][key]
        ) {

          element.textContent =
            translations[lang][key];

        }

      }
    );


    if (languageLabel) {

      languageLabel.textContent =
        lang === "en"
          ? "বাংলা"
          : "EN";

    }


    localStorage.setItem(
      STORAGE.language,
      lang
    );

  }


  const savedLanguage =
    localStorage.getItem(STORAGE.language)
    || "en";

  applyLanguage(savedLanguage);


  languageToggle?.addEventListener(
    "click",
    () => {

      const current =
        html.lang === "bn"
          ? "bn"
          : "en";

      applyLanguage(
        current === "en"
          ? "bn"
          : "en"
      );

    }
  );


  /* ==========================================================
     HEADER SCROLL
  ========================================================== */

  const header =
    $("#siteHeader");


  function updateHeader() {

    header?.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* ==========================================================
     MOBILE NAV
  ========================================================== */

  const menuToggle =
    $("#menuToggle");

  const mainNav =
    $("#mainNav");


  function closeMenu() {

    mainNav?.classList.remove("open");

    menuToggle?.setAttribute(
      "aria-expanded",
      "false"
    );

    body.classList.remove(
      "no-scroll"
    );

  }


  menuToggle?.addEventListener(
    "click",
    () => {

      const open =
        mainNav.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        String(open)
      );

      body.classList.toggle(
        "no-scroll",
        open
      );

    }
  );


  $$(".main-nav a").forEach(
    link => {

      link.addEventListener(
        "click",
        closeMenu
      );

    }
  );


  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {
        closeMenu();
      }

    }
  );


  /* ==========================================================
     SMOOTH INTERNAL LINKS
  ========================================================== */

  $$('a[href^="#"]').forEach(
    link => {

      link.addEventListener(
        "click",
        event => {

          const id =
            link.getAttribute("href");

          if (
            !id ||
            id === "#"
          ) return;

          const target =
            document.querySelector(id);

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior:
              reducedMotion
                ? "auto"
                : "smooth"
          });

        }
      );

    }
  );


  /* ==========================================================
     ACTIVE NAV
  ========================================================== */

  const sections =
    $$("section[id]");

  const navLinks =
    $$(".main-nav a[data-nav]");


  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (!entry.isIntersecting)
                return;

              navLinks.forEach(
                link => {

                  link.classList.toggle(
                    "active",
                    link.getAttribute("href")
                    === `#${entry.target.id}`
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
        observer.observe(section)
    );

  }


  /* ==========================================================
     REVEAL ON SCROLL
  ========================================================== */

  const revealElements =
    $$(".reveal");


  if (
    !reducedMotion &&
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                entry.isIntersecting
              ) {

                entry.target
                  .classList.add(
                    "is-visible"
                  );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: .12
        }
      );


    revealElements.forEach(
      element =>
        revealObserver.observe(element)
    );

  } else {

    revealElements.forEach(
      element =>
        element.classList.add(
          "is-visible"
        )
    );

  }


  /* ==========================================================
     HERO IMAGE
  ========================================================== */

  const heroImage =
    $("#heroImage");


  if (heroImage) {

    if (heroImage.complete) {

      heroImage.classList.add(
        "is-loaded"
      );

    } else {

      heroImage.addEventListener(
        "load",
        () => {

          heroImage.classList.add(
            "is-loaded"
          );

        }
      );

    }

  }


  /* ==========================================================
     LIVE CODING TERMINAL
  ========================================================== */

  const typingText =
    $("#typingText");

  const terminalOutput =
    $("#terminalOutput");


  const codeSequences = [

    {
      command:
        "snk.engine.start()",

      output: [
        "✓ identity loaded",
        "✓ context ready",
        "✓ intelligence connected"
      ]
    },

    {
      command:
        "build({ intelligence: AI })",

      output: [
        "✓ model connected",
        "✓ memory available",
        "✓ tools initialized"
      ]
    },

    {
      command:
        "experience.build()",

      output: [
        "✓ design understood",
        "✓ system structured",
        "✓ experience ready"
      ]
    },

    {
      command:
        "mind.learn({ curiosity: true })",

      output: [
        "✓ curiosity enabled",
        "✓ learning loop active",
        "✓ system evolving"
      ]
    }

  ];


  let sequenceIndex = 0;


  function sleep(ms) {
    return new Promise(
      resolve =>
        setTimeout(resolve, ms)
    );
  }


  async function typeText(text) {

    if (!typingText)
      return;

    typingText.textContent = "";

    for (
      let i = 0;
      i < text.length;
      i++
    ) {

      typingText.textContent +=
        text[i];

      await sleep(
        reducedMotion
          ? 0
          : 45
      );

    }

  }


  async function eraseText(text) {

    if (!typingText)
      return;

    for (
      let i = text.length;
      i > 0;
      i--
    ) {

      typingText.textContent =
        text.slice(0, i - 1);

      await sleep(
        reducedMotion
          ? 0
          : 22
      );

    }

  }


  function renderTerminalOutput(lines) {

    if (!terminalOutput)
      return;

    terminalOutput.innerHTML =
      lines
        .map(
          line =>
            `<div class="success">${line}</div>`
        )
        .join("");

  }


  async function terminalLoop() {

    if (!typingText)
      return;

    while (true) {

      const item =
        codeSequences[
          sequenceIndex
        ];

      await typeText(
        item.command
      );

      renderTerminalOutput(
        item.output
      );

      await sleep(
        reducedMotion
          ? 900
          : 2200
      );

      if (!reducedMotion) {

        await eraseText(
          item.command
        );

        await sleep(300);

      }

      sequenceIndex =
        (sequenceIndex + 1)
        % codeSequences.length;

    }

  }


  terminalLoop();


  /* ==========================================================
     RAIN ENGINE
  ========================================================== */

  const rainCanvas =
    $("#rainCanvas");

  const rainToggle =
    $("#rainToggle");


  const rainContext =
    rainCanvas?.getContext("2d");


  let rainDrops = [];

  let rainAnimation =
    null;


  function resizeRain() {

    if (!rainCanvas)
      return;

    const dpr =
      Math.min(
        window.devicePixelRatio || 1,
        2
      );

    rainCanvas.width =
      window.innerWidth * dpr;

    rainCanvas.height =
      window.innerHeight * dpr;

    rainCanvas.style.width =
      `${window.innerWidth}px`;

    rainCanvas.style.height =
      `${window.innerHeight}px`;

    rainContext?.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

    createRainDrops();

  }


  function createRainDrops() {

    const count =
      Math.floor(
        window.innerWidth / 8
      );

    rainDrops =
      Array.from(
        {
          length: count
        },
        () => ({
          x:
            Math.random()
            * window.innerWidth,

          y:
            Math.random()
            * window.innerHeight,

          length:
            8 +
            Math.random() * 19,

          speed:
            5 +
            Math.random() * 10,

          opacity:
            .10 +
            Math.random() * .25
        })
      );

  }


  function drawRain() {

    if (
      !rainCanvas ||
      !rainContext
    ) return;


    rainContext.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );


    const isLight =
      html.dataset.theme
      === "light";


    rainDrops.forEach(
      drop => {

        rainContext.beginPath();

        rainContext.moveTo(
          drop.x,
          drop.y
        );

        rainContext.lineTo(
          drop.x - 2,
          drop.y + drop.length
        );

        rainContext.strokeStyle =
          isLight
            ? `rgba(65,60,55,${drop.opacity})`
            : `rgba(235,225,212,${drop.opacity})`;

        rainContext.lineWidth =
          .7;

        rainContext.stroke();


        drop.y += drop.speed;

        drop.x -= .6;


        if (
          drop.y >
          window.innerHeight
        ) {

          drop.y =
            -drop.length;

          drop.x =
            Math.random()
            * window.innerWidth;

        }

      }
    );


    rainAnimation =
      requestAnimationFrame(
        drawRain
      );

  }


  function setRain(enabled) {

    if (reducedMotion) {

      enabled = false;

    }


    body.classList.toggle(
      "rain-active",
      enabled
    );


    rainToggle?.setAttribute(
      "aria-pressed",
      String(enabled)
    );


    localStorage.setItem(
      STORAGE.rain,
      String(enabled)
    );


    if (enabled) {

      if (!rainAnimation) {

        resizeRain();

        drawRain();

      }

    } else {

      if (rainAnimation) {

        cancelAnimationFrame(
          rainAnimation
        );

        rainAnimation = null;

      }

      rainContext?.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

    }

  }


  const savedRain =
    localStorage.getItem(
      STORAGE.rain
    ) === "true";


  setRain(savedRain);


  rainToggle?.addEventListener(
    "click",
    () => {

      const active =
        body.classList.contains(
          "rain-active"
        );

      setRain(!active);

    }
  );


  window.addEventListener(
    "resize",
    () => {

      if (
        body.classList.contains(
          "rain-active"
        )
      ) {

        resizeRain();

      }

    }
  );


  /* ==========================================================
     FLYING BIRDS
  ========================================================== */

  const birdLayer =
    $("#birdLayer");


  function createBird() {

    if (
      !birdLayer ||
      reducedMotion
    ) return;


    const bird =
      document.createElement("div");

    bird.className =
      "bird";


    const startY =
      12 +
      Math.random() * 45;

    const duration =
      12 +
      Math.random() * 9;


    bird.style.top =
      `${startY}vh`;

    bird.style.left =
      "-100px";


    birdLayer.appendChild(
      bird
    );


    const startX = -120;

    const endX =
      window.innerWidth + 160;


    const midY =
      startY +
      (Math.random() * 14 - 7);


    const animation =
      bird.animate(
        [
          {
            transform:
              `translate(${startX}px, 0) scale(.7)`,
            opacity: 0
          },

          {
            transform:
              `translate(${window.innerWidth * .28}px, ${midY - startY}vh) scale(.9)`,
            opacity: .7,
            offset: .28
          },

          {
            transform:
              `translate(${window.innerWidth * .58}px, ${startY - midY}vh) scale(1)`,
            opacity: .85,
            offset: .62
          },

          {
            transform:
              `translate(${endX}px, 0) scale(.72)`,
            opacity: 0
          }
        ],
        {
          duration:
            duration * 1000,

          easing:
            "linear",

          fill:
            "forwards"
        }
      );


    animation.finished
      .then(() => {
        bird.remove();
      })
      .catch(() => {
        bird.remove();
      });

  }


  function birdLoop() {

    if (reducedMotion)
      return;

    createBird();

    const next =
      6000 +
      Math.random() * 10000;

    setTimeout(
      birdLoop,
      next
    );

  }


  if (!reducedMotion) {

    setTimeout(
      birdLoop,
      2500
    );

  }


  /* ==========================================================
     MAGNETIC BUTTONS
  ========================================================== */

  if (
    !reducedMotion &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    $$(".magnetic").forEach(
      button => {

        button.addEventListener(
          "mousemove",
          event => {

            const rect =
              button.getBoundingClientRect();

            const x =
              event.clientX
              - rect.left
              - rect.width / 2;

            const y =
              event.clientY
              - rect.top
              - rect.height / 2;

            button.style.transform =
              `translate(${x * .08}px, ${y * .08}px)`;

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


  /* ==========================================================
     HERO PARALLAX
  ========================================================== */

  if (
    !reducedMotion &&
    heroImage &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    window.addEventListener(
      "mousemove",
      event => {

        const x =
          (event.clientX
          / window.innerWidth
          - .5);

        const y =
          (event.clientY
          / window.innerHeight
          - .5);


        heroImage.style.transform =
          `scale(1.02)
           translate(${x * -8}px, ${y * -6}px)`;

      },
      { passive: true }
    );

  }


  /* ==========================================================
     EXTERNAL LINKS
  ========================================================== */

  $$('a[href^="http"]').forEach(
    link => {

      link.setAttribute(
        "target",
        "_blank"
      );

      link.setAttribute(
        "rel",
        "noopener noreferrer"
      );

    }
  );


  /* ==========================================================
     YEAR
  ========================================================== */

  const year =
    $("#currentYear");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* ==========================================================
     KEYBOARD ACCESSIBILITY
  ========================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(
          document.activeElement?.tagName
        )
      ) {

        event.preventDefault();

        $("#languageToggle")?.focus();

      }

    }
  );


  /* ==========================================================
     GLOBAL DEBUG
  ========================================================== */

  window.SNK = {

    version: "3.0",

    theme: () =>
      html.dataset.theme,

    language: () =>
      html.lang,

    rain: () =>
      body.classList.contains(
        "rain-active"
      ),

    setTheme: applyTheme,

    setLanguage: applyLanguage,

    setRain

  };


})();
