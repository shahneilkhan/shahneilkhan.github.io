/* =========================================================
   SNK V2 — INTERACTION SYSTEM
   SOFTWARE / AI / EXPERIENCE
   ========================================================= */

(() => {
  "use strict";

  document.documentElement.classList.add("js-enabled");

  /* -------------------------------------------------------
     HELPERS
     ------------------------------------------------------- */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* -------------------------------------------------------
     HEADER
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     MOBILE NAV
     ------------------------------------------------------- */

  const navToggle = $(".nav-toggle");
  const nav = $(".main-nav");

  const closeNav = () => {
    if (!nav || !navToggle) return;

    nav.classList.remove("is-open");
    header?.classList.remove("nav-open");

    navToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("menu-open");
  };

  const openNav = () => {
    if (!nav || !navToggle) return;

    nav.classList.add("is-open");
    header?.classList.add("nav-open");

    navToggle.setAttribute(
      "aria-expanded",
      "true"
    );

    document.body.classList.add("menu-open");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen =
      nav?.classList.contains("is-open");

    isOpen ? closeNav() : openNav();
  });

  $$(".main-nav a").forEach(link => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("click", event => {
    if (!nav || !navToggle) return;

    const clickedInsideNav =
      nav.contains(event.target);

    const clickedToggle =
      navToggle.contains(event.target);

    if (
      nav.classList.contains("is-open") &&
      !clickedInsideNav &&
      !clickedToggle
    ) {
      closeNav();
    }
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      closeNav();
    }
  });


  /* -------------------------------------------------------
     SMOOTH INTERNAL LINKS
     ------------------------------------------------------- */

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");

      if (
        !href ||
        href === "#" ||
        href.length < 2
      ) {
        return;
      }

      const target = $(href);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion()
          ? "auto"
          : "smooth",
        block: "start"
      });

      history.replaceState(
        null,
        "",
        href
      );
    });
  });


  /* -------------------------------------------------------
     ACTIVE NAV
     ------------------------------------------------------- */

  const sections = $$(
    "main section[id]"
  );

  const navLinks = $$(".main-nav a");

  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {
    const sectionObserver =
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const id = entry.target.id;

            navLinks.forEach(link => {
              const href =
                link.getAttribute("href");

              link.classList.toggle(
                "is-active",
                href === `#${id}`
              );
            });
          });
        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );

    sections.forEach(section =>
      sectionObserver.observe(section)
    );
  }


  /* -------------------------------------------------------
     REVEAL ON SCROLL
     ------------------------------------------------------- */

  const revealItems =
    $$(".reveal");

  if (
    revealItems.length &&
    !prefersReducedMotion() &&
    "IntersectionObserver" in window
  ) {
    const revealObserver =
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add(
              "is-visible"
            );

            revealObserver.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -50px 0px"
        }
      );

    revealItems.forEach(item =>
      revealObserver.observe(item)
    );
  } else {
    revealItems.forEach(item =>
      item.classList.add("is-visible")
    );
  }


  /* -------------------------------------------------------
     STAGGER CHILDREN
     ------------------------------------------------------- */

  $$("[data-stagger]").forEach(group => {
    const children =
      [...group.children];

    children.forEach((child, index) => {
      child.style.transitionDelay =
        `${index * 70}ms`;

      child.classList.add("reveal");
    });
  });


  /* -------------------------------------------------------
     HERO VISUAL LOAD
     ------------------------------------------------------- */

  const heroVisual =
    $(".hero-visual");

  const heroImage =
    $(".hero-visual img, .hero-visual svg");

  if (heroVisual && heroImage) {
    if (
      heroImage.tagName.toLowerCase() === "img"
    ) {
      if (heroImage.complete) {
        heroVisual.classList.add(
          "is-loaded"
        );
      } else {
        heroImage.addEventListener(
          "load",
          () => {
            heroVisual.classList.add(
              "is-loaded"
            );
          }
        );

        heroImage.addEventListener(
          "error",
          () => {
            heroImage.classList.add(
              "image-error"
            );

            heroVisual.classList.add(
              "is-loaded"
            );
          }
        );
      }
    } else {
      requestAnimationFrame(() => {
        heroVisual.classList.add(
          "is-loaded"
        );
      });
    }
  }


  /* -------------------------------------------------------
     TERMINAL LINE REVEAL
     ------------------------------------------------------- */

  const terminalLines =
    $$(".terminal-line");

  if (
    terminalLines.length &&
    !prefersReducedMotion()
  ) {
    terminalLines.forEach(
      (line, index) => {
        line.style.opacity = "0";
        line.style.transform =
          "translateY(4px)";

        line.style.transition =
          "opacity .4s ease, transform .4s ease";

        setTimeout(() => {
          line.style.opacity = "1";
          line.style.transform =
            "translateY(0)";
        }, 250 + index * 120);
      }
    );
  }


  /* -------------------------------------------------------
     AI ACCORDION
     ------------------------------------------------------- */

  const accordionTriggers =
    $$("[data-accordion-trigger]");

  accordionTriggers.forEach(trigger => {
    const bodyId =
      trigger.getAttribute(
        "aria-controls"
      );

    const body =
      bodyId
        ? document.getElementById(bodyId)
        : trigger.nextElementSibling;

    if (!body) return;

    trigger.setAttribute(
      "aria-expanded",
      "false"
    );

    body.style.maxHeight = "0px";
    body.style.opacity = "0";

    trigger.addEventListener(
      "click",
      () => {
        const expanded =
          trigger.getAttribute(
            "aria-expanded"
          ) === "true";

        trigger.setAttribute(
          "aria-expanded",
          String(!expanded)
        );

        if (expanded) {
          body.style.maxHeight = "0px";
          body.style.opacity = "0";
        } else {
          body.style.maxHeight =
            `${body.scrollHeight}px`;

          body.style.opacity = "1";
        }
      }
    );
  });


  /* -------------------------------------------------------
     EXPERTISE ACCORDION
     ------------------------------------------------------- */

  const expertiseItems =
    $$(".expertise-item");

  expertiseItems.forEach(item => {
    const trigger =
      $(".accordion-trigger", item);

    const body =
      $(".accordion-body", item);

    if (!trigger || !body) return;

    trigger.setAttribute(
      "aria-expanded",
      "false"
    );

    if (window.innerWidth <= 760) {
      body.style.maxHeight = "0px";
      body.style.opacity = "0";
    }

    trigger.addEventListener(
      "click",
      () => {
        if (window.innerWidth > 760) {
          return;
        }

        const expanded =
          trigger.getAttribute(
            "aria-expanded"
          ) === "true";

        trigger.setAttribute(
          "aria-expanded",
          String(!expanded)
        );

        if (expanded) {
          body.style.maxHeight = "0px";
          body.style.opacity = "0";
        } else {
          body.style.maxHeight =
            `${body.scrollHeight}px`;

          body.style.opacity = "1";
        }
      }
    );
  });


  /* -------------------------------------------------------
     PROJECT CARD TILT
     ------------------------------------------------------- */

  const projectCards =
    $$(".project-feature, .project-placeholder");

  if (
    !prefersReducedMotion() &&
    window.matchMedia("(pointer:fine)").matches
  ) {
    projectCards.forEach(card => {
      card.addEventListener(
        "pointermove",
        event => {
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
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-3px)`;
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


  /* -------------------------------------------------------
     BUTTON MAGNETIC MICRO INTERACTION
     ------------------------------------------------------- */

  const buttons =
    $$(".btn, .header-cta");

  if (
    !prefersReducedMotion() &&
    window.matchMedia("(pointer:fine)").matches
  ) {
    buttons.forEach(button => {
      button.addEventListener(
        "pointermove",
        event => {
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
            `translate(${x * .08}px,
                       ${y * .08}px)`;
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


  /* -------------------------------------------------------
     HERO PARALLAX
     ------------------------------------------------------- */

  const hero =
    $(".hero");

  const heroVisualLayer =
    $(".hero-visual");

  if (
    hero &&
    heroVisualLayer &&
    !prefersReducedMotion() &&
    window.matchMedia("(pointer:fine)").matches
  ) {
    let ticking = false;

    const updateParallax = () => {
      if (window.scrollY > window.innerHeight) {
        heroVisualLayer.style.transform = "";
        ticking = false;
        return;
      }

      const offset =
        Math.min(window.scrollY * 0.08, 35);

      heroVisualLayer.style.transform =
        `translateY(${offset}px)`;

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(
            updateParallax
          );

          ticking = true;
        }
      },
      { passive: true }
    );
  }


  /* -------------------------------------------------------
     EXTERNAL LINKS
     ------------------------------------------------------- */

  $$("a[href]").forEach(link => {
    const href =
      link.getAttribute("href");

    if (!href) return;

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


  /* -------------------------------------------------------
     CONTACT FORM
     ------------------------------------------------------- */

  const contactForms =
    $$("form[data-contact-form]");

  contactForms.forEach(form => {
    form.addEventListener(
      "submit",
      event => {
        const action =
          form.getAttribute("action");

        /*
         * If no backend/form service has
         * been configured, don't silently
         * pretend the message was sent.
         */

        if (
          !action ||
          action === "#" ||
          action.trim() === ""
        ) {
          event.preventDefault();

          let notice =
            $(".form-notice", form);

          if (!notice) {
            notice =
              document.createElement("div");

            notice.className =
              "form-notice";

            notice.style.marginTop =
              "15px";

            notice.style.padding =
              "12px 14px";

            notice.style.border =
              "1px solid rgba(201,139,77,.25)";

            notice.style.color =
              "#c98b4d";

            notice.style.fontFamily =
              '"DM Mono", monospace';

            notice.style.fontSize =
              ".62rem";

            form.appendChild(notice);
          }

          notice.textContent =
            "FORM NOT CONNECTED YET — PLEASE USE A DIRECT CONTACT METHOD.";

          return;
        }
      }
    );
  });


  /* -------------------------------------------------------
     CURRENT YEAR
     ------------------------------------------------------- */

  $$("[data-current-year]").forEach(
    element => {
      element.textContent =
        new Date().getFullYear();
    }
  );


  /* -------------------------------------------------------
     COPY TO CLIPBOARD
     ------------------------------------------------------- */

  $$("[data-copy]").forEach(button => {
    button.addEventListener(
      "click",
      async () => {
        const value =
          button.getAttribute("data-copy");

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
          }, 1600);

        } catch {
          /* Clipboard unavailable */
        }
      }
    );
  });


  /* -------------------------------------------------------
     IMAGE ERROR HANDLING
     ------------------------------------------------------- */

  $$("img").forEach(image => {
    image.addEventListener(
      "error",
      () => {
        image.classList.add(
          "image-error"
        );
      }
    );
  });


  /* -------------------------------------------------------
     TABAYYUN / EXTERNAL PLATFORM
     ------------------------------------------------------- */

  $$(
    'a[href*="tabayyuninstitute.com"]'
  ).forEach(link => {
    link.addEventListener(
      "pointerenter",
      () => {
        link.style.borderColor =
          "rgba(201,139,77,.55)";
      }
    );

    link.addEventListener(
      "pointerleave",
      () => {
        link.style.borderColor = "";
      }
    );
  });


  /* -------------------------------------------------------
     KEYBOARD ACCESSIBILITY
     ------------------------------------------------------- */

  document.addEventListener(
    "keydown",
    event => {
      if (
        event.key === "Enter" &&
        document.activeElement?.matches(
          "[data-accordion-trigger], .accordion-trigger"
        )
      ) {
        document.activeElement.click();
      }
    }
  );


  /* -------------------------------------------------------
     WINDOW RESIZE
     ------------------------------------------------------- */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {

        /*
         * Reset expertise accordion
         * when moving back to desktop.
         */

        if (window.innerWidth > 760) {
          expertiseItems.forEach(item => {
            const trigger =
              $(".accordion-trigger", item);

            const body =
              $(".accordion-body", item);

            if (!trigger || !body) return;

            trigger.setAttribute(
              "aria-expanded",
              "false"
            );

            body.style.maxHeight = "";
            body.style.opacity = "";
          });
        }

      }, 150);
    }
  );


  /* -------------------------------------------------------
     DEBUG API
     ------------------------------------------------------- */

  window.SNK = {
    version: "2.0",
    reducedMotion:
      prefersReducedMotion(),

    refreshHeader() {
      updateHeader();
    },

    closeMenu() {
      closeNav();
    },

    openMenu() {
      openNav();
    }
  };

})();
