/* =========================================================
   SNK PORTFOLIO V2
   Interactive Experience
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     INITIALIZATION
     ======================================================= */

  document.documentElement.classList.add("js-enabled");

  const $ = (selector, scope = document) =>
    scope.querySelector(selector);

  const $$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const isTouch =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

  const isDesktop = () =>
    window.innerWidth > 900 && !isTouch && !reducedMotion;


  /* =======================================================
     HEADER
     ======================================================= */

  const header = $(".site-header");

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 30
    );
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  const nav = $(".main-nav");
  const navToggle = $(".nav-toggle");

  const openNav = () => {
    if (!nav || !navToggle) return;

    nav.classList.add("is-open");

    navToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    document.body.classList.add("nav-open");
  };

  const closeNav = () => {
    if (!nav || !navToggle) return;

    nav.classList.remove("is-open");

    navToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("nav-open");
  };

  const toggleNav = () => {
    if (!nav) return;

    if (nav.classList.contains("is-open")) {
      closeNav();
    } else {
      openNav();
    }
  };

  if (navToggle) {
    navToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    navToggle.setAttribute(
      "aria-label",
      "Toggle navigation"
    );

    navToggle.addEventListener(
      "click",
      toggleNav
    );
  }

  $$(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  document.addEventListener("click", (event) => {
    if (!nav || !navToggle) return;

    if (
      nav.classList.contains("is-open") &&
      !nav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      closeNav();
    }
  });


  /* =======================================================
     RESIZE CLEANUP
     ======================================================= */

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 900) {
        closeNav();
      }
    }, 120);
  });


  /* =======================================================
     SMOOTH INTERNAL LINKS
     ======================================================= */

  $$('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      const headerHeight =
        header?.offsetHeight || 0;

      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        15;

      window.scrollTo({
        top: targetTop,
        behavior: reducedMotion
          ? "auto"
          : "smooth"
      });

      history.replaceState(
        null,
        "",
        href
      );
    });
  });


  /* =======================================================
     ACTIVE NAVIGATION
     ======================================================= */

  const navLinks = $$(".main-nav a");

  const sectionMap = new Map();

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) {
      return;
    }

    const section = document.querySelector(href);

    if (section) {
      sectionMap.set(section, link);
    }
  });

  if ("IntersectionObserver" in window) {
    const navObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
              link.classList.remove("active");
            });

            const activeLink =
              sectionMap.get(entry.target);

            if (activeLink) {
              activeLink.classList.add("active");
            }
          });
        },
        {
          rootMargin:
            "-25% 0px -60% 0px",
          threshold: 0
        }
      );

    sectionMap.forEach((_, section) => {
      navObserver.observe(section);
    });
  }


  /* =======================================================
     REVEAL ON SCROLL
     ======================================================= */

  const revealItems = $$(".reveal");

  if (
    reducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  } else {
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
          rootMargin: "0px 0px -50px"
        }
      );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  }


  /* =======================================================
     STAGGERED ELEMENTS
     ======================================================= */

  $$(".stagger").forEach((group) => {
    const children = Array.from(
      group.children
    );

    children.forEach((child, index) => {
      child.style.setProperty(
        "--i",
        index
      );

      child.classList.add("reveal");
    });
  });

  if (!reducedMotion) {
    const staggerItems =
      $$(".stagger > .reveal");

    if ("IntersectionObserver" in window) {
      const staggerObserver =
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
            threshold: 0.08
          }
        );

      staggerItems.forEach((item) => {
        staggerObserver.observe(item);
      });
    }
  }


  /* =======================================================
     HERO IMAGE / SVG LOAD
     ======================================================= */

  const heroImages = $$(
    ".hero-image, .hero-svg"
  );

  heroImages.forEach((image) => {
    if (
      image.tagName.toLowerCase() === "img"
    ) {
      if (image.complete) {
        image.classList.add(
          "is-loaded"
        );
      } else {
        image.addEventListener(
          "load",
          () => {
            image.classList.add(
              "is-loaded"
            );
          },
          { once: true }
        );

        image.addEventListener(
          "error",
          () => {
            image.classList.add(
              "image-error"
            );
          },
          { once: true }
        );
      }
    } else {
      requestAnimationFrame(() => {
        image.classList.add(
          "is-loaded"
        );
      });
    }
  });


  /* =======================================================
     TERMINAL
     ======================================================= */

  const terminal = $(".terminal");

  if (terminal) {
    const terminalLines =
      $$(".terminal-line", terminal);

    terminalLines.forEach((line) => {
      line.style.opacity = "0";
      line.style.transform =
        "translateY(5px)";
      line.style.transition =
        "opacity .35s ease, transform .35s ease";
    });

    const revealTerminal = () => {
      terminalLines.forEach(
        (line, index) => {
          setTimeout(() => {
            line.style.opacity = "1";
            line.style.transform =
              "translateY(0)";
          }, index * 110);
        }
      );
    };

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      terminalLines.forEach((line) => {
        line.style.opacity = "1";
        line.style.transform =
          "translateY(0)";
      });
    } else {
      const terminalObserver =
        new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;

              revealTerminal();

              observer.unobserve(
                entry.target
              );
            });
          },
          {
            threshold: 0.35
          }
        );

      terminalObserver.observe(
        terminal
      );
    }
  }


  /* =======================================================
     AI EXPANDABLES
     ======================================================= */

  const expandableButtons = $$(
    ".ai-expandable button"
  );

  expandableButtons.forEach((button) => {
    button.setAttribute(
      "aria-expanded",
      "false"
    );

    button.addEventListener(
      "click",
      () => {
        const parent =
          button.closest(
            ".ai-expandable"
          );

        if (!parent) return;

        const isOpen =
          parent.classList.contains(
            "is-open"
          );

        $$(".ai-expandable").forEach(
          (item) => {
            item.classList.remove(
              "is-open"
            );

            const itemButton =
              $("button", item);

            if (itemButton) {
              itemButton.setAttribute(
                "aria-expanded",
                "false"
              );
            }
          }
        );

        if (!isOpen) {
          parent.classList.add(
            "is-open"
          );

          button.setAttribute(
            "aria-expanded",
            "true"
          );
        }
      }
    );
  });


  /* =======================================================
     EXPERTISE ACCORDION
     ======================================================= */

  const expertiseCards =
    $$(".expertise-card");

  expertiseCards.forEach((card) => {
    const toggle =
      $(".expertise-toggle", card);

    if (!toggle) return;

    toggle.setAttribute(
      "aria-expanded",
      "false"
    );

    toggle.addEventListener(
      "click",
      () => {
        const isOpen =
          card.classList.contains(
            "is-open"
          );

        if (window.innerWidth <= 800) {
          expertiseCards.forEach(
            (item) => {
              item.classList.remove(
                "is-open"
              );

              const itemToggle =
                $(".expertise-toggle", item);

              if (itemToggle) {
                itemToggle.setAttribute(
                  "aria-expanded",
                  "false"
                );
              }
            }
          );
        }

        if (!isOpen) {
          card.classList.add(
            "is-open"
          );

          toggle.setAttribute(
            "aria-expanded",
            "true"
          );
        }
      }
    );
  });


  /* =======================================================
     PROJECT CARD TILT
     ======================================================= */

  const projectCards =
    $$(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener(
      "pointermove",
      (event) => {
        if (!isDesktop()) return;

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
          -4;

        const rotateY =
          ((x / rect.width) - 0.5) *
          4;

        card.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          translateY(-5px)
        `;
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
     MAGNETIC BUTTON EFFECT
     ======================================================= */

  const magneticButtons =
    $$(".btn");

  magneticButtons.forEach((button) => {
    button.addEventListener(
      "pointermove",
      (event) => {
        if (!isDesktop()) return;

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

        button.style.transform = `
          translate(
            ${x * 0.08}px,
            ${y * 0.08}px
          )
        `;
      }
    );

    button.addEventListener(
      "pointerleave",
      () => {
        button.style.transform = "";
      }
    );
  });


  /* =======================================================
     HERO PARALLAX
     ======================================================= */

  const heroVisual =
    $(".hero-visual");

  const heroContent =
    $(".hero-content");

  if (
    heroVisual &&
    !reducedMotion &&
    !isTouch
  ) {
    let ticking = false;

    const updateParallax = () => {
      if (!ticking) {
        window.requestAnimationFrame(
          () => {
            const scroll =
              window.scrollY;

            if (scroll < window.innerHeight * 1.2) {
              const visualY =
                scroll * 0.08;

              const contentY =
                scroll * -0.025;

              heroVisual.style.transform =
                `translateY(${visualY}px)`;

              if (heroContent) {
                heroContent.style.transform =
                  `translateY(${contentY}px)`;
              }
            }

            ticking = false;
          }
        );

        ticking = true;
      }
    };

    window.addEventListener(
      "scroll",
      updateParallax,
      { passive: true }
    );
  }


  /* =======================================================
     EXTERNAL LINKS
     ======================================================= */

  $$("a[href]").forEach((link) => {
    const href =
      link.getAttribute("href");

    if (!href) return;

    const isExternal =
      /^https?:\/\//i.test(href);

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


  /* =======================================================
     CONTACT FORM FALLBACK
     ======================================================= */

  const contactForms =
    $$("form");

  contactForms.forEach((form) => {
    const hasRealAction =
      form.getAttribute("action") &&
      form.getAttribute("action") !== "#";

    if (hasRealAction) return;

    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        let status =
          $(".form-status", form);

        if (!status) {
          status =
            document.createElement(
              "div"
            );

          status.className =
            "form-status";

          form.appendChild(status);
        }

        status.textContent =
          "FORM NOT CONNECTED YET — CONTACT METHOD WILL BE CONFIGURED.";

        status.style.color =
          "var(--amber-light)";

        setTimeout(() => {
          status.textContent = "";
        }, 5000);
      }
    );
  });


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  $$("[data-year]").forEach((element) => {
    element.textContent =
      new Date().getFullYear();
  });

  const yearElements = $$(".current-year");

  yearElements.forEach((element) => {
    element.textContent =
      new Date().getFullYear();
  });


  /* =======================================================
     COPY TO CLIPBOARD
     ======================================================= */

  $$("[data-copy]").forEach((button) => {
    button.addEventListener(
      "click",
      async () => {
        const value =
          button.getAttribute(
            "data-copy"
          );

        if (!value) return;

        try {
          await navigator.clipboard.writeText(
            value
          );

          const original =
            button.textContent;

          button.textContent =
            "COPIED ✓";

          setTimeout(() => {
            button.textContent =
              original;
          }, 1800);
        } catch (error) {
          console.warn(
            "Clipboard unavailable:",
            error
          );
        }
      }
    );
  });


  /* =======================================================
     IMAGE ERROR HANDLING
     ======================================================= */

  $$("img").forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        image.classList.add(
          "image-error"
        );
      }
    );
  });


  /* =======================================================
     TABAYYUN / EXTERNAL PLATFORM MICRO INTERACTION
     ======================================================= */

  const externalPlatforms =
    $$(".external-platform");

  externalPlatforms.forEach((platform) => {
    platform.addEventListener(
      "pointermove",
      (event) => {
        if (!isDesktop()) return;

        const rect =
          platform.getBoundingClientRect();

        const x =
          ((event.clientX -
            rect.left) /
            rect.width -
            0.5) *
          2;

        const y =
          ((event.clientY -
            rect.top) /
            rect.height -
            0.5) *
          2;

        platform.style.transform = `
          translate(
            ${x * 2}px,
            ${y * 2}px
          )
        `;
      }
    );

    platform.addEventListener(
      "pointerleave",
      () => {
        platform.style.transform = "";
      }
    );
  });


  /* =======================================================
     KEYBOARD ACCESSIBILITY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key !== "Enter" &&
        event.key !== " "
      ) {
        return;
      }

      const target =
        event.target;

      if (
        target.matches(
          ".expertise-toggle"
        )
      ) {
        event.preventDefault();
        target.click();
      }

      if (
        target.matches(
          ".ai-expandable button"
        )
      ) {
        event.preventDefault();
        target.click();
      }
    }
  );


  /* =======================================================
     DEBUG / GLOBAL HOOKS
     ======================================================= */

  window.SNK = {
    version: "2.0",
    reducedMotion,
    isTouch,
    isDesktop,
    closeNav,
    openNav
  };


  /* =======================================================
     READY
     ======================================================= */

  document.body.classList.add(
    "snk-ready"
  );

})();
