/* =========================================================
   SNK PORTFOLIO V2
   Shah Neil Khan
   Software Engineer & AI Engineer
   ========================================================= */

(() => {
  "use strict";

  /* =======================================================
     01. GLOBAL STATE
     ======================================================= */

  const root = document.documentElement;
  const body = document.body;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const isTouchDevice =
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0;

  const state = {
    menuOpen: false,
    ticking: false,
    destroyed: false
  };

  /* =======================================================
     02. HELPERS
     ======================================================= */

  const $ = (selector, scope = document) =>
    scope.querySelector(selector);

  const $$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));

  const on = (element, event, handler, options = {}) => {
    if (!element) return;

    element.addEventListener(event, handler, options);
  };

  const isInternalLink = (link) => {
    if (!link || !link.href) return false;

    try {
      const url = new URL(link.href, window.location.href);

      return (
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname
      );
    } catch {
      return false;
    }
  };

  const isExternalLink = (link) => {
    if (!link || !link.href) return false;

    try {
      const url = new URL(link.href, window.location.href);

      return (
        url.protocol === "http:" ||
        url.protocol === "https:"
      ) && url.origin !== window.location.origin;
    } catch {
      return false;
    }
  };

  /* =======================================================
     03. ENABLE JS STATE
     ======================================================= */

  root.classList.add("js-enabled");

  /* =======================================================
     04. HEADER / NAVIGATION
     ======================================================= */

  const header = $(".site-header");
  const navMenu = $(".nav-menu");
  const navToggle = $(".nav-toggle");
  const navLinks = $$(".nav-link");

  const setMenuState = (open) => {
    if (!navMenu || !navToggle) return;

    state.menuOpen = open;

    navMenu.classList.toggle("open", open);
    navMenu.classList.toggle("active", open);

    navMenu.setAttribute("aria-hidden", String(!open));
    navToggle.setAttribute("aria-expanded", String(open));

    body.classList.toggle("menu-open", open);

    const bars = $$("span", navToggle);

    if (bars.length >= 3) {
      bars[0].style.transform = open
        ? "translateY(5px) rotate(45deg)"
        : "";

      bars[1].style.opacity = open ? "0" : "";

      bars[2].style.transform = open
        ? "translateY(-5px) rotate(-45deg)"
        : "";
    }
  };

  const closeMenu = () => {
    setMenuState(false);
  };

  const toggleMenu = () => {
    setMenuState(!state.menuOpen);
  };

  if (navMenu) {
    navMenu.setAttribute("aria-hidden", "true");
  }

  if (navToggle) {
    navToggle.setAttribute("aria-expanded", "false");

    on(navToggle, "click", (event) => {
      event.preventDefault();
      toggleMenu();
    });
  }

  navLinks.forEach((link) => {
    on(link, "click", () => {
      closeMenu();
    });
  });

  on(document, "keydown", (event) => {
    if (event.key === "Escape" && state.menuOpen) {
      closeMenu();
    }
  });

  on(document, "click", (event) => {
    if (!state.menuOpen || !navMenu || !navToggle) return;

    if (
      !navMenu.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  /* =======================================================
     05. HEADER SCROLL STATE
     ======================================================= */

  const updateHeader = () => {
    if (!header) return;

    const scrolled = window.scrollY > 30;

    header.classList.toggle("scrolled", scrolled);
    header.classList.toggle("is-scrolled", scrolled);
  };

  updateHeader();

  on(window, "scroll", () => {
    if (state.ticking) return;

    state.ticking = true;

    window.requestAnimationFrame(() => {
      updateHeader();
      state.ticking = false;
    });
  }, { passive: true });

  /* =======================================================
     06. SMOOTH INTERNAL SCROLLING
     ======================================================= */

  $$('a[href^="#"]').forEach((link) => {
    on(link, "click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = $(targetId);

      if (!target) return;

      event.preventDefault();

      const headerOffset = header
        ? header.offsetHeight + 12
        : 20;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion.matches
          ? "auto"
          : "smooth"
      });

      history.replaceState(
        null,
        "",
        targetId
      );

      closeMenu();
    });
  });

  /* =======================================================
     07. ACTIVE NAVIGATION
     ======================================================= */

  const sectionTargets = $$(
    "main section[id], section[id]"
  );

  if (
    sectionTargets.length &&
    "IntersectionObserver" in window
  ) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;

          navLinks.forEach((link) => {
            const href = link.getAttribute("href");

            if (!href) return;

            const matches =
              href === `#${id}` ||
              href.endsWith(`#${id}`);

            link.classList.toggle(
              "active",
              matches
            );

            if (matches) {
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
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0
      }
    );

    sectionTargets.forEach((section) => {
      navObserver.observe(section);
    });
  }

  /* =======================================================
     08. REVEAL ON SCROLL
     ======================================================= */

  const revealItems = $$(".reveal");

  if (
    revealItems.length &&
    "IntersectionObserver" in window &&
    !prefersReducedMotion.matches
  ) {
    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -8% 0px",
          threshold: 0.08
        }
      );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }

  /* =======================================================
     09. AUTOMATIC STAGGER
     ======================================================= */

  const staggerGroups = [
    ".projects-grid",
    ".ai-cards",
    ".expertise-grid",
    ".principles-grid",
    ".brand-pillars",
    ".brand-colors"
  ];

  staggerGroups.forEach((selector) => {
    $$(selector).forEach((group) => {
      const children = Array.from(
        group.children
      );

      children.forEach((child, index) => {
        if (!child.classList.contains("reveal")) {
          child.classList.add("reveal");
        }

        child.style.transitionDelay =
          `${Math.min(index * 0.07, 0.35)}s`;
      });
    });
  });

  /* =======================================================
     10. AI EXPANDABLES
     ======================================================= */

  const aiExpandables = $$(".ai-expandable");

  const closeAiItems = (except = null) => {
    aiExpandables.forEach((item) => {
      if (item === except) return;

      item.classList.remove("open");

      const trigger = $(
        ".ai-expandable-trigger",
        item
      );

      if (trigger) {
        trigger.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    });
  };

  aiExpandables.forEach((item) => {
    const trigger = $(
      ".ai-expandable-trigger",
      item
    );

    if (!trigger) return;

    trigger.setAttribute(
      "aria-expanded",
      "false"
    );

    on(trigger, "click", () => {
      const isOpen =
        item.classList.contains("open");

      closeAiItems(item);

      item.classList.toggle(
        "open",
        !isOpen
      );

      trigger.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );
    });
  });

  /* =======================================================
     11. EXPERTISE ACCORDION
     ======================================================= */

  const expertiseCards =
    $$(".expertise-card");

  expertiseCards.forEach((card) => {
    const toggle = $(
      ".expertise-toggle",
      card
    );

    const body = $(
      ".expertise-body",
      card
    );

    if (!toggle) return;

    toggle.setAttribute(
      "aria-expanded",
      "false"
    );

    if (body) {
      body.setAttribute(
        "aria-hidden",
        "true"
      );
    }

    on(toggle, "click", () => {
      const isOpen =
        card.classList.contains("open");

      expertiseCards.forEach((other) => {
        if (other === card) return;

        other.classList.remove("open");

        const otherToggle = $(
          ".expertise-toggle",
          other
        );

        const otherBody = $(
          ".expertise-body",
          other
        );

        if (otherToggle) {
          otherToggle.setAttribute(
            "aria-expanded",
            "false"
          );
        }

        if (otherBody) {
          otherBody.setAttribute(
            "aria-hidden",
            "true"
          );
        }
      });

      card.classList.toggle(
        "open",
        !isOpen
      );

      toggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      if (body) {
        body.setAttribute(
          "aria-hidden",
          String(isOpen)
        );
      }
    });
  });

  /* =======================================================
     12. TERMINAL ANIMATION
     ======================================================= */

  const terminal =
    $(".terminal");

  const terminalLines =
    $$(".terminal-line", terminal || document);

  const terminalProgress =
    $(".terminal-progress");

  const sleep = (ms) =>
    new Promise((resolve) =>
      window.setTimeout(resolve, ms)
    );

  const runTerminal = async () => {
    if (!terminal) return;

    if (prefersReducedMotion.matches) {
      terminalLines.forEach((line) => {
        line.style.opacity = "1";
      });

      if (terminalProgress) {
        terminalProgress.textContent =
          "[██████████████████] 100%";
      }

      return;
    }

    terminalLines.forEach((line) => {
      line.style.opacity = "0";
      line.style.transform =
        "translateY(4px)";
    });

    for (const line of terminalLines) {
      await sleep(120);

      line.style.transition =
        "opacity .35s ease, transform .35s ease";

      line.style.opacity = "1";
      line.style.transform =
        "translateY(0)";
    }

    if (terminalProgress) {
      const progressChars =
        "██████████████████";

      for (let i = 0; i <= progressChars.length; i++) {
        await sleep(35);

        terminalProgress.textContent =
          `[${progressChars.slice(0, i)}${" ".repeat(
            progressChars.length - i
          )}] ${Math.round(
            (i / progressChars.length) * 100
          )}%`;
      }
    }
  };

  if (terminal) {
    if ("IntersectionObserver" in window) {
      const terminalObserver =
        new IntersectionObserver(
          (entries, observer) => {
            if (!entries[0].isIntersecting) {
              return;
            }

            runTerminal();
            observer.disconnect();
          },
          {
            threshold: 0.25
          }
        );

      terminalObserver.observe(terminal);
    } else {
      runTerminal();
    }
  }

  /* =======================================================
     13. PROJECT CARD MICRO INTERACTION
     ======================================================= */

  if (
    !isTouchDevice &&
    !prefersReducedMotion.matches
  ) {
    $$(".project-card, .card").forEach((card) => {
      on(card, "mousemove", (event) => {
        const rect =
          card.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) /
          rect.width;

        const y =
          (event.clientY - rect.top) /
          rect.height;

        const rotateX =
          (0.5 - y) * 3;

        const rotateY =
          (x - 0.5) * 3;

        card.style.transform =
          `translateY(-5px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      on(card, "mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* =======================================================
     14. BUTTON MAGNETIC EFFECT
     ======================================================= */

  if (
    !isTouchDevice &&
    !prefersReducedMotion.matches
  ) {
    $$(".btn").forEach((button) => {
      on(button, "mousemove", (event) => {
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
      });

      on(button, "mouseleave", () => {
        button.style.transform = "";
      });
    });
  }

  /* =======================================================
     15. HERO PARALLAX
     ======================================================= */

  const heroVisual =
    $(".hero-visual");

  if (
    heroVisual &&
    !isTouchDevice &&
    !prefersReducedMotion.matches
  ) {
    let heroFrame = null;

    on(window, "mousemove", (event) => {
      if (heroFrame) return;

      heroFrame =
        window.requestAnimationFrame(() => {
          const x =
            (event.clientX /
              window.innerWidth -
              0.5) *
            2;

          const y =
            (event.clientY /
              window.innerHeight -
              0.5) *
            2;

          heroVisual.style.transform =
            `translate3d(${x * 5}px, ${y * 5}px, 0)`;

          heroFrame = null;
        });
    });

    on(window, "mouseleave", () => {
      heroVisual.style.transform = "";
    });
  }

  /* =======================================================
     16. HERO IMAGE / SVG LOAD
     ======================================================= */

  const heroImages =
    $$(".hero-image, .hero-svg");

  heroImages.forEach((image) => {
    on(image, "load", () => {
      image.classList.add("is-loaded");
    });

    on(image, "error", () => {
      image.classList.add("image-error");
    });
  });

  /* =======================================================
     17. EXTERNAL LINKS
     ======================================================= */

  $$("a").forEach((link) => {
    if (!isExternalLink(link)) return;

    if (
      !link.hasAttribute("target")
    ) {
      link.setAttribute(
        "target",
        "_blank"
      );
    }

    const existingRel =
      link.getAttribute("rel") || "";

    const relParts =
      existingRel
        .split(" ")
        .filter(Boolean);

    if (!relParts.includes("noopener")) {
      relParts.push("noopener");
    }

    if (!relParts.includes("noreferrer")) {
      relParts.push("noreferrer");
    }

    link.setAttribute(
      "rel",
      relParts.join(" ")
    );
  });

  /* =======================================================
     18. CONTACT FORM
     ======================================================= */

  const contactForms =
    $$("form");

  contactForms.forEach((form) => {
    on(form, "submit", (event) => {
      const action =
        form.getAttribute("action");

      /*
       * The portfolio currently has no connected
       * backend/form service.
       *
       * Prevent accidental submission when action
       * is missing or points to "#".
       */

      if (
        !action ||
        action === "#" ||
        action.trim() === ""
      ) {
        event.preventDefault();

        const existingStatus =
          $(".form-status", form);

        if (existingStatus) {
          existingStatus.textContent =
            "FORM NOT CONNECTED YET — PLEASE USE DIRECT CONTACT.";
        }

        form.classList.add(
          "form-not-connected"
        );

        window.setTimeout(() => {
          form.classList.remove(
            "form-not-connected"
          );
        }, 3500);
      }
    });
  });

  /* =======================================================
     19. COPY TO CLIPBOARD
     ======================================================= */

  $$("[data-copy]").forEach((element) => {
    on(element, "click", async () => {
      const value =
        element.getAttribute("data-copy");

      if (!value) return;

      try {
        await navigator.clipboard.writeText(
          value
        );

        const original =
          element.textContent;

        element.textContent =
          "COPIED ✓";

        window.setTimeout(() => {
          element.textContent =
            original;
        }, 1500);
      } catch {
        /*
         * Clipboard access may be blocked
         * by browser security.
         */
      }
    });
  });

  /* =======================================================
     20. CURRENT YEAR
     ======================================================= */

  const year =
    new Date().getFullYear();

  $$("[data-current-year]").forEach(
    (element) => {
      element.textContent =
        String(year);
    }
  );

  /* =======================================================
     21. TABAYYUN EXTERNAL BUTTON
     ======================================================= */

  const tabayyunLinks =
    $$(
      'a[href*="tabayyuninstitute.com"]'
    );

  tabayyunLinks.forEach((link) => {
    link.setAttribute(
      "target",
      "_blank"
    );

    link.setAttribute(
      "rel",
      "noopener noreferrer"
    );
  });

  /* =======================================================
     22. KEYBOARD ACCESSIBILITY
     ======================================================= */

  $$(".project-card").forEach((card) => {
    const links =
      $$("a", card);

    if (!links.length) return;

    card.setAttribute(
      "tabindex",
      "0"
    );

    on(card, "keydown", (event) => {
      if (
        event.key !== "Enter" &&
        event.key !== " "
      ) {
        return;
      }

      if (event.target !== card) {
        return;
      }

      event.preventDefault();

      links[0].click();
    });
  });

  /* =======================================================
     23. RESIZE CLEANUP
     ======================================================= */

  let resizeTimer = null;

  on(window, "resize", () => {
    window.clearTimeout(resizeTimer);

    resizeTimer = window.setTimeout(() => {
      if (
        window.innerWidth > 900 &&
        state.menuOpen
      ) {
        closeMenu();
      }
    }, 120);
  });

  /* =======================================================
     24. PAGE VISIBILITY
     ======================================================= */

  on(document, "visibilitychange", () => {
    if (
      document.visibilityState === "hidden"
    ) {
      return;
    }

    updateHeader();
  });

  /* =======================================================
     25. DEBUG HOOK
     ======================================================= */

  window.SNK = {
    version: "2.0",
    state,
    reducedMotion:
      prefersReducedMotion.matches
  };

})();
