/* =========================================================
   SNK PORTFOLIO V2
   Shah Neil Khan — Software Engineer & AI Engineer
   Main Interaction / UX / Navigation System
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     01. INITIAL STATE
     ======================================================= */

  document.documentElement.classList.add("js-enabled");

  const body = document.body;
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  /* =======================================================
     02. HELPERS
     ======================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const isExternalLink = (link) => {
    try {
      const url = new URL(link.href, window.location.origin);

      return (
        url.origin !== window.location.origin &&
        url.protocol.startsWith("http")
      );
    } catch {
      return false;
    }
  };


  /* =======================================================
     03. HEADER SCROLL STATE
     ======================================================= */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("scrolled");
      header.classList.remove("is-scrolled");
    }
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =======================================================
     04. MOBILE NAVIGATION
     ======================================================= */

  const closeMenu = () => {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.remove("active");
    navMenu.classList.remove("open");
    navMenu.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    navMenu.setAttribute("aria-hidden", "true");

    body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuToggle || !navMenu) return;

    menuToggle.classList.add("active");
    navMenu.classList.add("open");
    navMenu.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");
    navMenu.setAttribute("aria-hidden", "false");

    body.classList.add("menu-open");
  };

  if (menuToggle && navMenu) {
    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    navMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.classList.contains("active");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    $$("a", navMenu).forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      if (!navMenu.classList.contains("open")) {
        return;
      }

      const clickedInsideMenu =
        navMenu.contains(event.target);

      const clickedToggle =
        menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        closeMenu();
      }
    });
  }


  /* =======================================================
     05. SMOOTH SCROLLING
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

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        20;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: prefersReducedMotion
          ? "auto"
          : "smooth",
      });

      history.replaceState(
        null,
        "",
        href
      );
    });
  });


  /* =======================================================
     06. ACTIVE NAVIGATION
     ======================================================= */

  const navLinks = $$(
    '.nav-menu a[href^="#"]'
  );

  const sections = navLinks
    .map((link) => {
      const id = link
        .getAttribute("href")
        ?.replace("#", "");

      return id
        ? document.getElementById(id)
        : null;
    })
    .filter(Boolean);

  if (navLinks.length && sections.length) {
    const sectionObserver =
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const id = entry.target.id;

            navLinks.forEach((link) => {
              const active =
                link.getAttribute("href") ===
                `#${id}`;

              link.classList.toggle(
                "active",
                active
              );

              if (active) {
                link.setAttribute(
                  "aria-current",
                  "page"
                );
              } else {
                link.removeAttribute(
                  "aria-current"
                );
              }
            });
          });
        },
        {
          rootMargin:
            "-25% 0px -65% 0px",
          threshold: 0,
        }
      );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }


  /* =======================================================
     07. REVEAL ON SCROLL
     ======================================================= */

  const revealElements = $$(".reveal");

  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
      element.classList.add("visible");
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

            entry.target.classList.add(
              "visible"
            );

            observer.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.08,
          rootMargin: "0px 0px -50px 0px",
        }
      );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }


  /* =======================================================
     08. STAGGERED REVEAL
     ======================================================= */

  const staggerGroups = [
    ".projects-grid",
    ".ai-grid",
    ".expertise-grid",
    ".process-grid",
    ".about-principles",
    ".brand-pillar-grid",
    ".voice-grid",
    ".color-system",
    ".experience-details",
  ];

  staggerGroups.forEach((selector) => {
    $$(selector).forEach((group) => {
      const children = [...group.children];

      children.forEach((child, index) => {
        if (!child.classList.contains("reveal")) {
          child.classList.add("reveal");
        }

        child.style.transitionDelay =
          `${Math.min(index * 70, 420)}ms`;
      });
    });
  });


  /* =======================================================
     09. AI EXPANDABLE SECTIONS
     ======================================================= */

  const expandableItems =
    $$(".ai-expandable");

  expandableItems.forEach((item) => {
    const toggle =
      $(".ai-toggle", item);

    const details =
      $(".ai-details", item);

    if (!toggle || !details) return;

    toggle.setAttribute(
      "aria-expanded",
      "false"
    );

    details.setAttribute(
      "aria-hidden",
      "true"
    );

    toggle.addEventListener("click", () => {
      const isOpen =
        item.classList.contains("open");

      /* Close all other items */
      expandableItems.forEach((other) => {
        if (other === item) return;

        other.classList.remove("open");

        const otherToggle =
          $(".ai-toggle", other);

        const otherDetails =
          $(".ai-details", other);

        otherToggle?.setAttribute(
          "aria-expanded",
          "false"
        );

        otherDetails?.setAttribute(
          "aria-hidden",
          "true"
        );
      });

      if (isOpen) {
        item.classList.remove("open");

        toggle.setAttribute(
          "aria-expanded",
          "false"
        );

        details.setAttribute(
          "aria-hidden",
          "true"
        );
      } else {
        item.classList.add("open");

        toggle.setAttribute(
          "aria-expanded",
          "true"
        );

        details.setAttribute(
          "aria-hidden",
          "false"
        );
      }
    });
  });


  /* =======================================================
     10. EXPERTISE ACCORDION SUPPORT
     ======================================================= */

  const expertiseCards =
    $$(".expertise-card");

  expertiseCards.forEach((card) => {
    const header =
      $(".expertise-header", card);

    if (!header) return;

    header.setAttribute(
      "role",
      "button"
    );

    header.setAttribute(
      "tabindex",
      "0"
    );

    const toggleCard = () => {
      if (window.innerWidth > 800) return;

      card.classList.toggle("open");
    };

    header.addEventListener(
      "click",
      toggleCard
    );

    header.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
          event.preventDefault();
          toggleCard();
        }
      }
    );
  });


  /* =======================================================
     11. HERO TERMINAL
     ======================================================= */

  const terminal =
    $(".terminal");

  if (terminal) {
    const terminalLines =
      $$(".terminal-line", terminal);

    if (
      !prefersReducedMotion &&
      terminalLines.length
    ) {
      terminalLines.forEach(
        (line, index) => {
          line.style.opacity = "0";
          line.style.transform =
            "translateY(4px)";

          line.style.transition =
            "opacity 0.35s ease, transform 0.35s ease";

          window.setTimeout(() => {
            line.style.opacity = "1";
            line.style.transform =
              "translateY(0)";
          }, 350 + index * 120);
        }
      );
    } else {
      terminalLines.forEach((line) => {
        line.style.opacity = "1";
        line.style.transform =
          "translateY(0)";
      });
    }
  }


  /* =======================================================
     12. TERMINAL PROGRESS BAR
     ======================================================= */

  const progressBars =
    $$(".terminal-progress");

  progressBars.forEach((bar) => {
    const originalText =
      bar.textContent.trim();

    if (!originalText) return;

    if (prefersReducedMotion) {
      return;
    }

    const finalText = originalText;

    bar.textContent = "";

    let index = 0;

    const interval =
      window.setInterval(() => {
        bar.textContent =
          finalText.slice(
            0,
            index
          );

        index += 1;

        if (index > finalText.length) {
          window.clearInterval(interval);
        }
      }, 25);
  });


  /* =======================================================
     13. PROJECT CARD MICRO INTERACTION
     ======================================================= */

  if (!prefersReducedMotion) {
    $$(".project-card").forEach((card) => {
      card.addEventListener(
        "pointermove",
        (event) => {
          if (window.innerWidth < 801) {
            return;
          }

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateX =
            ((y / rect.height) - 0.5) * -2;

          const rotateY =
            ((x / rect.width) - 0.5) * 2;

          card.style.transform =
            `translateY(-5px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
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


  /* =======================================================
     14. BUTTON HOVER MAGNETIC EFFECT
     ======================================================= */

  if (!prefersReducedMotion) {
    $$(".btn").forEach((button) => {
      button.addEventListener(
        "pointermove",
        (event) => {
          if (window.innerWidth < 801) {
            return;
          }

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
            `translate(${x * 0.08}px, ${y * 0.08}px)`;
        }
      );

      button.addEventListener(
        "pointerleave",
        () => {
          button.style.transform = "";
        }
      );
    });
  }


  /* =======================================================
     15. HERO PARALLAX
     ======================================================= */

  const heroVisual =
    $(".hero-visual");

  if (
    heroVisual &&
    !prefersReducedMotion
  ) {
    let ticking = false;

    const updateHeroParallax = () => {
      const rect =
        heroVisual.getBoundingClientRect();

      const viewportHeight =
        window.innerHeight;

      const progress =
        (viewportHeight / 2 -
          (rect.top + rect.height / 2)) /
        viewportHeight;

      const amount =
        Math.max(
          -18,
          Math.min(18, progress * 18)
        );

      heroVisual.style.transform =
        `translateY(${amount}px)`;

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (ticking) return;

        window.requestAnimationFrame(
          updateHeroParallax
        );

        ticking = true;
      },
      { passive: true }
    );
  }


  /* =======================================================
     16. HERO SVG / IMAGE LOAD
     ======================================================= */

  $$(".hero-art img, .hero-scene img, .hero-svg")
    .forEach((visual) => {
      visual.addEventListener(
        "load",
        () => {
          visual.classList.add("loaded");
        }
      );
    });


  /* =======================================================
     17. EXTERNAL LINKS
     ======================================================= */

  $$("a[href]").forEach((link) => {
    if (!isExternalLink(link)) {
      return;
    }

    const target =
      link.getAttribute("target");

    if (!target) {
      link.setAttribute(
        "target",
        "_blank"
      );
    }

    const rel =
      link.getAttribute("rel") || "";

    const relValues =
      new Set(
        rel
          .split(" ")
          .map((value) => value.trim())
          .filter(Boolean)
      );

    relValues.add("noopener");
    relValues.add("noreferrer");

    link.setAttribute(
      "rel",
      [...relValues].join(" ")
    );
  });


  /* =======================================================
     18. CONTACT FORM
     ======================================================= */

  const contactForms =
    $$(".contact-form");

  contactForms.forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        /*
         * GitHub Pages is static.
         * Prevent fake submission unless a real
         * backend/form provider is configured.
         */

        const action =
          form.getAttribute("action");

        const hasRealAction =
          action &&
          action.trim() !== "" &&
          action !== "#";

        if (hasRealAction) {
          return;
        }

        event.preventDefault();

        const submitButton =
          $(".form-submit", form) ||
          $('button[type="submit"]', form) ||
          $('input[type="submit"]', form);

        if (!submitButton) return;

        const originalText =
          submitButton.dataset.originalText ||
          submitButton.textContent ||
          "SEND MESSAGE →";

        submitButton.dataset.originalText =
          originalText;

        submitButton.textContent =
          "FORM NOT CONNECTED YET";

        submitButton.disabled = true;

        window.setTimeout(() => {
          submitButton.textContent =
            originalText;

          submitButton.disabled = false;
        }, 2400);
      }
    );
  });


  /* =======================================================
     19. CURRENT YEAR
     ======================================================= */

  const year =
    new Date().getFullYear();

  $$(".current-year").forEach(
    (element) => {
      element.textContent = year;
    }
  );

  $$("#year").forEach(
    (element) => {
      element.textContent = year;
    }
  );


  /* =======================================================
     20. COPY EMAIL / CONTACT
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

          window.setTimeout(() => {
            button.textContent =
              original;
          }, 1800);
        } catch {
          /* Clipboard unavailable */
        }
      }
    );
  });


  /* =======================================================
     21. IMAGE ERROR FALLBACK
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
     22. TABAYYUN HOVER SUPPORT
     ======================================================= */

  $$(".project-card").forEach((card) => {
    const visual =
      $(".project-visual", card);

    if (!visual) return;

    card.addEventListener(
      "mouseenter",
      () => {
        visual.classList.add(
          "is-hovered"
        );
      }
    );

    card.addEventListener(
      "mouseleave",
      () => {
        visual.classList.remove(
          "is-hovered"
        );
      }
    );
  });


  /* =======================================================
     23. CURSOR GLOW — DESKTOP ONLY
     ======================================================= */

  if (
    !prefersReducedMotion &&
    window.matchMedia(
      "(pointer: fine)"
    ).matches
  ) {
    const glow =
      document.createElement("div");

    glow.className =
      "snk-cursor-glow";

    Object.assign(
      glow.style,
      {
        position: "fixed",
        width: "220px",
        height: "220px",
        left: "0",
        top: "0",
        zIndex: "9999",
        pointerEvents: "none",
        borderRadius: "50%",
        opacity: "0",
        background:
          "radial-gradient(circle, rgba(201,149,91,0.055), transparent 68%)",
        transform:
          "translate(-50%, -50%)",
        transition:
          "opacity 0.25s ease",
        mixBlendMode:
          "screen",
      }
    );

    document.body.appendChild(glow);

    let cursorX = 0;
    let cursorY = 0;
    let glowX = 0;
    let glowY = 0;

    const animateGlow = () => {
      glowX +=
        (cursorX - glowX) * 0.12;

      glowY +=
        (cursorY - glowY) * 0.12;

      glow.style.left =
        `${glowX}px`;

      glow.style.top =
        `${glowY}px`;

      window.requestAnimationFrame(
        animateGlow
      );
    };

    document.addEventListener(
      "pointermove",
      (event) => {
        cursorX = event.clientX;
        cursorY = event.clientY;

        glow.style.opacity = "1";
      }
    );

    document.addEventListener(
      "pointerleave",
      () => {
        glow.style.opacity = "0";
      }
    );

    animateGlow();
  }


  /* =======================================================
     24. KEYBOARD ACCESSIBILITY
     ======================================================= */

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key !== "Tab") return;

      document.body.classList.add(
        "keyboard-navigation"
      );
    }
  );

  document.addEventListener(
    "mousedown",
    () => {
      document.body.classList.remove(
        "keyboard-navigation"
      );
    }
  );


  /* =======================================================
     25. RESIZE CLEANUP
     ======================================================= */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(
        resizeTimer
      );

      resizeTimer =
        window.setTimeout(() => {
          if (
            window.innerWidth > 800
          ) {
            closeMenu();
          }
        }, 150);
    }
  );


  /* =======================================================
     26. PAGE READY
     ======================================================= */

  window.requestAnimationFrame(() => {
    document.body.classList.add(
      "page-ready"
    );
  });


  /* =======================================================
     27. DEBUG / DEVELOPMENT HOOK
     ======================================================= */

  window.SNK = {
    version: "2.0",
    closeMenu,
    openMenu,
    prefersReducedMotion,
  };

})();
