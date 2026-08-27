/* =========================================
   SHAHNEIL KHAN PORTFOLIO
   FINAL SCRIPT.JS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTS
  ========================================= */

  const body = document.body;
  const header = document.querySelector(".site-header");

  const menuToggle =
    document.getElementById("menuToggle");

  const navMenu =
    document.querySelector(".nav-menu");

  const themeToggle =
    document.getElementById("themeToggle");

  const langButtons =
    document.querySelectorAll(".lang-btn");

  const navLinks =
    document.querySelectorAll(".nav-link");

  const sections =
    document.querySelectorAll("section[id]");


  /* =========================================
     THEME
  ========================================= */

  function setTheme(theme) {

    body.setAttribute("data-theme", theme);

    localStorage.setItem(
      "tabayyun-theme",
      theme
    );

    if (themeToggle) {

      themeToggle.textContent =
        theme === "dark"
          ? "🌙"
          : "☀️";

      themeToggle.setAttribute(
        "aria-label",
        theme === "dark"
          ? "Switch to light mode"
          : "Switch to dark mode"
      );
    }
  }


  const savedTheme =
    localStorage.getItem("tabayyun-theme");


  if (savedTheme === "dark") {

    setTheme("dark");

  } else {

    setTheme("light");

  }


  if (themeToggle) {

    themeToggle.addEventListener(
      "click",
      () => {

        const currentTheme =
          body.getAttribute("data-theme");

        setTheme(
          currentTheme === "dark"
            ? "light"
            : "dark"
        );

      }
    );

  }


  /* =========================================
     MOBILE MENU
  ========================================= */

  function closeMenu() {

    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("active");

    menuToggle.classList.remove("active");

    body.classList.remove("menu-open");

  }


  if (menuToggle && navMenu) {

    menuToggle.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        navMenu.classList.toggle("active");

        menuToggle.classList.toggle("active");

        body.classList.toggle(
          "menu-open"
        );

      }
    );

  }


  /* Close menu after nav click */

  navLinks.forEach(link => {

    link.addEventListener(
      "click",
      () => {

        closeMenu();

      }
    );

  });


  /* Close menu outside */

  document.addEventListener(
    "click",
    event => {

      if (!navMenu || !menuToggle) return;

      const insideMenu =
        navMenu.contains(event.target);

      const insideButton =
        menuToggle.contains(event.target);

      if (
        !insideMenu &&
        !insideButton
      ) {

        closeMenu();

      }

    }
  );


  /* =========================================
     ESC KEY
  ========================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key === "Escape") {

        closeMenu();

      }

    }
  );


  /* =========================================
     HEADER SCROLL
  ========================================= */

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }


  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =========================================
     ACTIVE NAV
  ========================================= */

  function updateActiveNav() {

    let current =
      "home";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 180;

      const sectionBottom =
        sectionTop +
        section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionBottom
      ) {

        current =
          section.getAttribute("id");

      }

    });


    navLinks.forEach(link => {

      link.classList.remove("active");

      const href =
        link.getAttribute("href");

      if (
        href === `#${current}`
      ) {

        link.classList.add("active");

      }

    });

  }


  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );

  updateActiveNav();


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const id =
            link.getAttribute("href");

          if (
            !id ||
            id === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(id);

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* =========================================
     SCROLL REVEAL
  ========================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  if (
    "IntersectionObserver"
    in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (
              entry.isIntersecting
            ) {

              entry.target.classList.add(
                "show"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
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
     LANGUAGE
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

      heroTag:
        "Software Engineer • Web • UI/UX",

      heroTitle:
        "Building digital experiences that matter.",

      heroDescription:
        "Software Engineer and Web & UI/UX Designer focused on creating modern, responsive and meaningful digital products.",

      viewWorks:
        "View Works",

      contactMe:
        "Contact Me",

      skillsTitle:
        "Skills",

      worksTitle:
        "Selected Works"

    },


    bn: {

      home: "হোম",
      about: "আমার সম্পর্কে",
      contact: "যোগাযোগ",
      download: "ডাউনলোড",
      skills: "দক্ষতা",
      works: "কাজ",
      connect: "কানেক্ট",

      heroTag:
        "সফটওয়্যার ইঞ্জিনিয়ার • ওয়েব • UI/UX",

      heroTitle:
        "গুরুত্বপূর্ণ ডিজিটাল অভিজ্ঞতা তৈরি করি।",

      heroDescription:
        "আমি একজন Software Engineer এবং Web & UI/UX Designer। আধুনিক, responsive এবং user-friendly digital product তৈরি করতে কাজ করি।",

      viewWorks:
        "কাজগুলো দেখুন",

      contactMe:
        "যোগাযোগ করুন",

      skillsTitle:
        "দক্ষতা",

      worksTitle:
        "নির্বাচিত কাজ"

    }

  };


  /* =========================================
     CHANGE LANGUAGE
  ========================================= */

  function changeLanguage(language) {

    const data =
      translations[language];

    if (!data) return;


    /* data-i18n elements */

    document
      .querySelectorAll("[data-i18n]")
      .forEach(element => {

        const key =
          element.getAttribute(
            "data-i18n"
          );

        if (
          Object.prototype.hasOwnProperty
          .call(data, key)
        ) {

          element.textContent =
            data[key];

        }

      });


    /* Language buttons */

    langButtons.forEach(button => {

      const buttonLanguage =
        button.dataset.lang;

      button.classList.toggle(
        "active",
        buttonLanguage === language
      );

    });


    /* HTML language */

    document.documentElement.lang =
      language === "bn"
        ? "bn"
        : "en";


    /* Save */

    localStorage.setItem(
      "tabayyun-language",
      language
    );

  }


  /* =========================================
     LANGUAGE BUTTON CLICK
  ========================================= */

  langButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        let language =
          button.dataset.lang;


        if (!language) {

          language =
            button.textContent
              .trim()
              .toLowerCase() ===
              "বাংলা"
              ? "bn"
              : "en";

        }


        changeLanguage(language);

      }
    );

  });


  /* =========================================
     LOAD LANGUAGE
  ========================================= */

  const savedLanguage =
    localStorage.getItem(
      "tabayyun-language"
    );


  if (
    savedLanguage &&
    translations[savedLanguage]
  ) {

    changeLanguage(
      savedLanguage
    );

  } else {

    changeLanguage("en");

  }


  /* =========================================
     KEYBOARD ACCESS
  ========================================= */

  document.addEventListener(
    "keydown",
    event => {

      /*
        Ctrl/Cmd + J
        = Theme toggle
      */

      if (
        (event.ctrlKey ||
          event.metaKey) &&
        event.key.toLowerCase() === "j"
      ) {

        event.preventDefault();

        if (themeToggle) {
          themeToggle.click();
        }

      }

    }
  );


  /* =========================================
     PROJECT LINK EFFECT
  ========================================= */

  document
    .querySelectorAll(".project-card")
    .forEach(card => {

      card.addEventListener(
        "mouseenter",
        () => {

          card.style.setProperty(
            "--mouse-x",
            "50%"
          );

          card.style.setProperty(
            "--mouse-y",
            "50%"
          );

        }
      );

    });


  /* =========================================
     PARALLAX SKY
  ========================================= */

  const sky =
    document.querySelector(
      ".sky-background"
    );


  if (
    sky &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {

    window.addEventListener(
      "scroll",
      () => {

        const scroll =
          window.scrollY;

        sky.style.transform =
          `translateY(${scroll * 0.04}px)`;

      },
      { passive: true }
    );

  }


  /* =========================================
     RESIZE
  ========================================= */

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > 760
      ) {

        closeMenu();

      }

    }
  );


  /* =========================================
     PAGE READY
  ========================================= */

  document.body.classList.add(
    "page-ready"
  );

});
