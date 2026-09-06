/* =========================================================
   SHAH NEIL KHAN — SNK V2
   COMPLETE JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initRevealAnimations();
    initActiveNavigation();
    initButtonInteractions();
    initExternalLinks();
    initCurrentYear();
    initHeroEffects();
    initProjectInteractions();
});


/* =========================================================
   HEADER / NAVBAR
========================================================= */

function initHeader() {
    const header = document.querySelector(".site-header");

    if (!header) return;

    const updateHeader = () => {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );
}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (!menuToggle || !navMenu) return;

    const closeMenu = () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    };

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.addEventListener("click", () => {
        const isOpen =
            navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });

    navMenu
        .querySelectorAll("a")
        .forEach(link => {
            link.addEventListener(
                "click",
                closeMenu
            );
        });

    document.addEventListener(
        "click",
        event => {
            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        }
    );

    window.addEventListener(
        "resize",
        () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        }
    );
}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {
    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    if (!links.length) return;

    links.forEach(link => {
        link.addEventListener(
            "click",
            event => {
                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

                event.preventDefault();

                const header =
                    document.querySelector(
                        ".site-header"
                    );

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight -
                    12;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                history.replaceState(
                    null,
                    "",
                    targetId
                );
            }
        );
    });
}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function initRevealAnimations() {
    const elements =
        document.querySelectorAll(
            ".reveal"
        );

    if (!elements.length) return;

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reduceMotion) {
        elements.forEach(element => {
            element.classList.remove("hidden");
        });

        return;
    }

    elements.forEach(element => {
        element.classList.add("hidden");
    });

    if (!("IntersectionObserver" in window)) {
        elements.forEach(element => {
            element.classList.remove("hidden");
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.remove(
                        "hidden"
                    );

                    observer.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px 0px"
            }
        );

    elements.forEach(element => {
        observer.observe(element);
    });
}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {
    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );

    if (!navLinks.length) return;

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    if (!sections.length) return;

    const linkMap = {};

    navLinks.forEach(link => {
        const href =
            link.getAttribute("href");

        if (
            href &&
            href.startsWith("#")
        ) {
            linkMap[href] = link;
        }
    });

    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id =
                        `#${entry.target.id}`;

                    navLinks.forEach(link => {
                        link.classList.remove(
                            "active"
                        );
                    });

                    if (linkMap[id]) {
                        linkMap[id].classList.add(
                            "active"
                        );
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin:
                    "-25% 0px -60% 0px"
            }
        );

    sections.forEach(section => {
        observer.observe(section);
    });
}


/* =========================================================
   BUTTON INTERACTIONS
========================================================= */

function initButtonInteractions() {
    const buttons =
        document.querySelectorAll(
            ".btn, .project-link"
        );

    if (!buttons.length) return;

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reduceMotion) return;

    buttons.forEach(button => {
        button.addEventListener(
            "mouseenter",
            () => {
                button.style.transform =
                    "translateY(-3px)";
            }
        );

        button.addEventListener(
            "mouseleave",
            () => {
                button.style.transform = "";
            }
        );
    });
}


/* =========================================================
   EXTERNAL LINKS
========================================================= */

function initExternalLinks() {
    const links =
        document.querySelectorAll(
            'a[href^="http"]'
        );

    links.forEach(link => {
        const href =
            link.getAttribute("href");

        if (!href) return;

        try {
            const url =
                new URL(href);

            if (
                url.hostname !==
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
        } catch (error) {
            // Invalid URL — leave unchanged.
        }
    });
}


/* =========================================================
   CURRENT YEAR
========================================================= */

function initCurrentYear() {
    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    if (!yearElements.length) return;

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach(element => {
        element.textContent =
            currentYear;
    });
}


/* =========================================================
   HERO EFFECTS
========================================================= */

function initHeroEffects() {
    const hero =
        document.querySelector(
            ".hero"
        );

    if (!hero) return;

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reduceMotion) return;

    const visual =
        hero.querySelector(
            ".hero-visual"
        );

    if (!visual) return;

    let ticking = false;

    const updateParallax = () => {
        const scrollY =
            window.scrollY;

        if (scrollY > window.innerHeight) {
            ticking = false;
            return;
        }

        const movement =
            scrollY * 0.08;

        visual.style.transform =
            `translate3d(0, ${movement}px, 0)`;

        ticking = false;
    };

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;
            }
        },
        { passive: true }
    );
}


/* =========================================================
   PROJECT INTERACTIONS
========================================================= */

function initProjectInteractions() {
    const cards =
        document.querySelectorAll(
            ".project-card"
        );

    if (!cards.length) return;

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reduceMotion) return;

    cards.forEach(card => {
        const visual =
            card.querySelector(
                ".project-visual"
            );

        if (!visual) return;

        card.addEventListener(
            "mousemove",
            event => {
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
                    -2;

                const rotateY =
                    ((x / rect.width) - 0.5) *
                    2;

                card.style.transform =
                    `perspective(1200px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;
            }
        );

        card.addEventListener(
            "mouseleave",
            () => {
                card.style.transform = "";
            }
        );
    });
}


/* =========================================================
   TERMINAL ANIMATION
========================================================= */

function initTerminal() {
    const terminal =
        document.querySelector(
            "[data-terminal]"
        );

    if (!terminal) return;

    const output =
        terminal.querySelector(
            "[data-terminal-output]"
        );

    if (!output) return;

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    const lines = [
        "✓ identity",
        "✓ context",
        "✓ memory",
        "✓ retrieval",
        "✓ tools",
        "✓ intelligence"
    ];

    if (reduceMotion) {
        output.innerHTML =
            lines.join("<br>");

        return;
    }

    output.innerHTML = "";

    let index = 0;

    const addLine = () => {
        if (index >= lines.length) {
            return;
        }

        const line =
            document.createElement("div");

        line.textContent =
            lines[index];

        output.appendChild(line);

        index++;

        setTimeout(
            addLine,
            280
        );
    };

    setTimeout(
        addLine,
        500
    );
}


/* =========================================================
   MAGNETIC CURSOR EFFECT
========================================================= */

function initMagneticElements() {
    const elements =
        document.querySelectorAll(
            "[data-magnetic]"
        );

    if (!elements.length) return;

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reduceMotion) return;

    elements.forEach(element => {
        element.addEventListener(
            "mousemove",
            event => {
                const rect =
                    element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                element.style.transform =
                    `translate(
                        ${x * 0.08}px,
                        ${y * 0.08}px
                    )`;
            }
        );

        element.addEventListener(
            "mouseleave",
            () => {
                element.style.transform = "";
            }
        );
    });
}


/* =========================================================
   IMAGE LAZY LOADING
========================================================= */

function initLazyImages() {
    const images =
        document.querySelectorAll(
            "img[data-src]"
        );

    if (!images.length) return;

    if (
        !("IntersectionObserver" in window)
    ) {
        images.forEach(image => {
            image.src =
                image.dataset.src;
        });

        return;
    }

    const observer =
        new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    const image =
                        entry.target;

                    image.src =
                        image.dataset.src;

                    image.removeAttribute(
                        "data-src"
                    );

                    observer.unobserve(
                        image
                    );
                });
            },
            {
                rootMargin:
                    "200px 0px"
            }
        );

    images.forEach(image => {
        observer.observe(image);
    });
}


/* =========================================================
   CONTACT FORM
========================================================= */

function initContactForm() {
    const form =
        document.querySelector(
            "[data-contact-form]"
        );

    if (!form) return;

    form.addEventListener(
        "submit",
        event => {
            const action =
                form.getAttribute("action");

            /*
             * If the form has a real backend
             * or Formspree/FormSubmit endpoint,
             * allow normal submission.
             */

            if (
                action &&
                action !== "#" &&
                action.trim() !== ""
            ) {
                return;
            }

            event.preventDefault();

            const button =
                form.querySelector(
                    'button[type="submit"], input[type="submit"]'
                );

            if (!button) return;

            const originalText =
                button.textContent;

            button.textContent =
                "MESSAGE READY ✓";

            button.disabled = true;

            setTimeout(() => {
                button.textContent =
                    originalText;

                button.disabled = false;
            }, 2500);
        }
    );
}


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

function initKeyboardAccessibility() {
    document.addEventListener(
        "keydown",
        event => {
            if (
                event.key !== "Escape"
            ) {
                return;
            }

            const navMenu =
                document.querySelector(
                    ".nav-menu"
                );

            const menuToggle =
                document.querySelector(
                    ".menu-toggle"
                );

            if (!navMenu) return;

            navMenu.classList.remove(
                "open"
            );

            if (menuToggle) {
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.focus();
            }
        }
    );
}


/* =========================================================
   INITIALIZE OPTIONAL FEATURES
========================================================= */

initTerminal();
initMagneticElements();
initLazyImages();
initContactForm();
initKeyboardAccessibility();


/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(
    "%c SHAH NEIL KHAN ",
    "font-weight:800;font-size:18px;"
);

console.log(
    "%c SOFTWARE ENGINEER × AI ENGINEER ",
    "font-weight:700;font-size:11px;"
);

console.log(
    "%c Building software, intelligence & experience.",
    "font-size:11px;"
);
