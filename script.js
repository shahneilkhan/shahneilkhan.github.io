/* =========================================
   TABAYYUN PORTFOLIO
   script.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================= */

  const body = document.body;
  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".nav-menu");
  const themeToggle = document.getElementById("themeToggle");

  const langButtons = document.querySelectorAll(".lang-btn");
  const navLinks = document.querySelectorAll(".nav-link");

  /* =========================================
     DARK / LIGHT MODE
  ========================================= */

  const savedTheme = localStorage.getItem("tabayyun-theme");

  if (savedTheme === "dark") {
    body.setAttribute("data-theme", "dark");

    if (themeToggle) {
      themeToggle.textContent = "🌙";
    }
  } else {
    body.setAttribute("data-theme", "light");

    if (themeToggle) {
      themeToggle.textContent = "☀️";
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {

      const currentTheme = body.getAttribute("data-theme");

      if (currentTheme === "dark") {

        body.setAttribute("data-theme", "light");
        localStorage.setItem("tabayyun-theme", "light");

        themeToggle.textContent = "☀️";

      } else {

        body.setAttribute("data-theme", "dark");
        localStorage.setItem("tabayyun-theme", "dark");

        themeToggle.textContent = "🌙";
      }
    });
  }

  /* =========================================
     MOBILE MENU
  ========================================= */

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

      menuToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
      body.classList.toggle("menu-open");

    });

    /* Close menu after clicking a link */

    navLinks.forEach(link => {

      link.addEventListener("click", () => {

        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        body.classList.remove("menu-open");

      });

    });

  }

  /* =========================================
     CLOSE MENU OUTSIDE
  ========================================= */

  document.addEventListener("click", (event) => {

    if (!navMenu || !menuToggle) return;

    const clickedInsideMenu =
      navMenu.contains(event.target);

    const clickedButton =
      menuToggle.contains(event.target);

    if (
      !clickedInsideMenu &&
      !clickedButton &&
      navMenu.classList.contains("active")
    ) {

      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      body.classList.remove("menu-open");

    }

  });

  /* =========================================
     HEADER SCROLL EFFECT
  ========================================= */

  function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  window.addEventListener("scroll", handleHeaderScroll);

  handleHeaderScroll();

  /* =========================================
     ACTIVE NAVIGATION
  ========================================= */

  const sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 160;

      const sectionHeight =
        section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {

        currentSection = section.getAttribute("id");

      }

    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      const href =
        link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }

    });

  }

  window.addEventListener("scroll", updateActiveNav);

  updateActiveNav();

  /* =========================================
     SCROLL REVEAL
  ========================================= */

  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add("show");

              observer.unobserve(entry.target);

            }

          });

        },
        {
          threshold: 0.12
        }
      );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("show");
    });

  }

  /* =========================================
     ENGLISH / BANGLA
  ========================================= */

  const translations = {

    en: {

      home: "Home",
      about: "About",
      contact: "Contact",
      download: "Download",
      skills: "Skills",
      works: "Works",
      connect: "Connect",

      heroTag: "Software Engineer • Web • UI/UX",

      heroTitle: "Building digital experiences that matter.",

      heroDescription:
        "Software Engineer and Web & UI/UX Designer focused on creating modern, responsive and meaningful digital products.",

      viewWorks: "View Works",
      contactMe: "Contact Me",

      skillsTitle: "Skills",
      worksTitle: "Selected Works"

    },

    bn: {

      home: "হোম",
      about: "আমার সম্পর্কে",
      contact: "যোগাযোগ",
      download: "ডাউনলোড",
      skills: "দক্ষতা",
      works: "কাজ",
      connect: "কানেক্ট",

      heroTag: "সফটওয়্যার ইঞ্জিনিয়ার • ওয়েব • UI/UX",

      heroTitle: "গুরুত্বপূর্ণ ডিজিটাল অভিজ্ঞতা তৈরি করি।",

      heroDescription:
        "আমি একজন Software Engineer এবং Web & UI/UX Designer। আধুনিক, responsive ও user-friendly digital product তৈরি করতে কাজ করি।",

      viewWorks: "কাজগুলো দেখুন",
      contactMe: "যোগাযোগ করুন",

      skillsTitle: "দক্ষতা",
      worksTitle: "নির্বাচিত কাজ"

    }

  };

  /* =========================================
     LANGUAGE FUNCTION
  ========================================= */

  function changeLanguage(language) {

    const data = translations[language];

    if (!data) return;

    /* Navigation */

    const navigationMap = {
      "#home": data.home,
      "#about": data.about,
      "#contact": data.contact,
      "#download": data.download,
      "#skills": data.skills,
      "#works": data.works,
      "#connect": data.connect
    };

    navLinks.forEach(link => {

      const href =
        link.getAttribute("href");

      if (navigationMap[href]) {
        link.textContent =
          navigationMap[href];
      }

    });

    /* Elements with data-i18n */

    document
      .querySelectorAll("[data-i18n]")
      .forEach(element => {

        const key =
          element.getAttribute("data-i18n");

        if (data[key]) {
          element.textContent = data[key];
        }

      });

    /* Save language */

    localStorage.setItem(
      "tabayyun-language",
      language
    );

    /* Update buttons */

    langButtons.forEach(button => {

      button.classList.remove("active");

      const buttonLanguage =
        button.dataset.lang;

      if (buttonLanguage === language) {
        button.classList.add("active");
      }

    });

    document.documentElement.lang =
      language === "bn" ? "bn" : "en";

  }

  /* =========================================
     LANGUAGE BUTTONS
  ========================================= */

  langButtons.forEach(button => {

    button.addEventListener("click", () => {

      let language =
        button.dataset.lang;

      /*
        যদি HTML button-এ data-lang না থাকে,
        তাহলে text দেখে language detect করবে।
      */

      if (!language) {

        const text =
          button.textContent.trim();

        language =
          text === "বাংলা"
            ? "bn"
            : "en";

      }

      changeLanguage(language);

    });

  });

  /* =========================================
     LOAD SAVED LANGUAGE
  ========================================= */

  const savedLanguage =
    localStorage.getItem("tabayyun-language");

  if (savedLanguage) {

    changeLanguage(savedLanguage);

  }

  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId =
        link.getAttribute("href");

      const target =
        document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

});
