/* =====================================================
   SHAH NEIL KHAN | TABAYYUN
   SCRIPT.JS
   VERSION 1.0
===================================================== */


/* =====================================================
   1.0 — DOM ELEMENTS
===================================================== */

const body = document.body;

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

const themeToggle = document.querySelector(".theme-toggle");

const langButtons = document.querySelectorAll(".lang-btn");

const downloadMenu = document.querySelector(".download-menu");
const downloadTrigger = document.querySelector(".download-trigger");

const navLinks = document.querySelectorAll(".nav-link");

const chatbot = document.querySelector(".chatbot");
const chatbotButton = document.querySelector(".chatbot-button");
const chatbotClose = document.querySelector(".chatbot-close");

const chatbotForm = document.querySelector(".chatbot-input");
const chatbotInput = document.querySelector(".chatbot-input input");
const chatbotMessages = document.querySelector(".chatbot-messages");

const header = document.querySelector(".site-header");

const revealElements = document.querySelectorAll(".reveal");


/* =====================================================
   2.0 — MOBILE MENU
===================================================== */

if (menuToggle && navMenu) {

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    body.classList.toggle(
      "menu-open",
      navMenu.classList.contains("active")
    );

  });

}


/* =====================================================
   2.1 — CLOSE MOBILE MENU
===================================================== */

navLinks.forEach((link) => {

  link.addEventListener("click", () => {

    navMenu?.classList.remove("active");

    body.classList.remove("menu-open");

  });

});


/* =====================================================
   2.2 — CLOSE MENU OUTSIDE
===================================================== */

document.addEventListener("click", (event) => {

  if (!navMenu || !menuToggle) return;

  const clickedInsideMenu =
    navMenu.contains(event.target);

  const clickedToggle =
    menuToggle.contains(event.target);

  if (
    !clickedInsideMenu &&
    !clickedToggle
  ) {

    navMenu.classList.remove("active");

    body.classList.remove("menu-open");

  }

});


/* =====================================================
   3.0 — DARK / LIGHT MODE
===================================================== */

const savedTheme =
  localStorage.getItem("tabayyun-theme");


if (savedTheme === "light") {

  body.setAttribute(
    "data-theme",
    "light"
  );

} else {

  body.setAttribute(
    "data-theme",
    "dark"
  );

}


/* =====================================================
   3.1 — THEME ICON
===================================================== */

function updateThemeIcon() {

  if (!themeToggle) return;

  const isLight =
    body.getAttribute("data-theme") === "light";

  themeToggle.textContent =
    isLight ? "🌙" : "☀️";

  themeToggle.setAttribute(
    "aria-label",
    isLight
      ? "Switch to dark mode"
      : "Switch to light mode"
  );

}

updateThemeIcon();


/* =====================================================
   3.2 — THEME TOGGLE
===================================================== */

if (themeToggle) {

  themeToggle.addEventListener("click", () => {

    const currentTheme =
      body.getAttribute("data-theme");

    const newTheme =
      currentTheme === "light"
        ? "dark"
        : "light";

    body.setAttribute(
      "data-theme",
      newTheme
    );

    localStorage.setItem(
      "tabayyun-theme",
      newTheme
    );

    updateThemeIcon();

  });

}


/* =====================================================
   4.0 — ENGLISH / BANGLA
===================================================== */

const translations = {

  en: {

    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.education": "Education",
    "nav.works": "Works",
    "nav.contact": "Contact",

    "hero.tag": "Creative Designer & Developer",

    "hero.title":
      "Building digital experiences with purpose.",

    "hero.description":
      "I’m Shah Neil Khan — a designer and developer focused on creating modern, useful and meaningful digital experiences.",

    "hero.work":
      "View My Works",

    "hero.contact":
      "Contact Me",

    "contact.title":
      "Let’s create something meaningful.",

    "contact.button":
      "Start a Conversation"

  },

  bn: {

    "nav.home": "হোম",
    "nav.about": "আমার সম্পর্কে",
    "nav.skills": "দক্ষতা",
    "nav.education": "শিক্ষা",
    "nav.works": "কাজ",
    "nav.contact": "যোগাযোগ",

    "hero.tag":
      "ক্রিয়েটিভ ডিজাইনার ও ডেভেলপার",

    "hero.title":
      "উদ্দেশ্যপূর্ণ ডিজিটাল অভিজ্ঞতা তৈরি করি।",

    "hero.description":
      "আমি শাহ নীল খান — আধুনিক, কার্যকর ও অর্থবহ ডিজিটাল অভিজ্ঞতা তৈরিতে কাজ করি।",

    "hero.work":
      "আমার কাজ দেখুন",

    "hero.contact":
      "যোগাযোগ করুন",

    "contact.title":
      "চলুন অর্থবহ কিছু তৈরি করি।",

    "contact.button":
      "কথা শুরু করুন"

  }

};


/* =====================================================
   4.1 — LANGUAGE STORAGE
===================================================== */

const savedLanguage =
  localStorage.getItem("tabayyun-language") || "en";

setLanguage(savedLanguage);


/* =====================================================
   4.2 — SET LANGUAGE
===================================================== */

function setLanguage(language) {

  const dictionary =
    translations[language];

  if (!dictionary) return;


  document
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {

      const key =
        element.getAttribute("data-i18n");

      if (dictionary[key]) {

        element.textContent =
          dictionary[key];

      }

    });


  langButtons.forEach((button) => {

    button.classList.toggle(
      "active",
      button.dataset.lang === language
    );

  });


  document.documentElement.lang =
    language === "bn"
      ? "bn"
      : "en";

  localStorage.setItem(
    "tabayyun-language",
    language
  );

}


/* =====================================================
   4.3 — LANGUAGE BUTTONS
===================================================== */

langButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const language =
      button.dataset.lang;

    setLanguage(language);

  });

});


/* =====================================================
   5.0 — DOWNLOAD MENU
===================================================== */

if (downloadTrigger && downloadMenu) {

  downloadTrigger.addEventListener(
    "click",
    (event) => {

      event.stopPropagation();

      downloadMenu.classList.toggle(
        "active"
      );

    }
  );

}


/* =====================================================
   5.1 — CLOSE DOWNLOAD MENU
===================================================== */

document.addEventListener("click", () => {

  downloadMenu?.classList.remove(
    "active"
  );

});


/* =====================================================
   6.0 — CHATBOT
===================================================== */

function openChatbot() {

  if (!chatbot) return;

  chatbot.classList.add("active");

  chatbotButton?.setAttribute(
    "aria-expanded",
    "true"
  );

  setTimeout(() => {

    chatbotInput?.focus();

  }, 200);

}


function closeChatbot() {

  if (!chatbot) return;

  chatbot.classList.remove("active");

  chatbotButton?.setAttribute(
    "aria-expanded",
    "false"
  );

}


if (chatbotButton) {

  chatbotButton.addEventListener(
    "click",
    () => {

      if (
        chatbot?.classList.contains("active")
      ) {

        closeChatbot();

      } else {

        openChatbot();

      }

    }
  );

}


if (chatbotClose) {

  chatbotClose.addEventListener(
    "click",
    closeChatbot
  );

}


/* =====================================================
   6.1 — CHATBOT RESPONSES
===================================================== */

function getBotResponse(message) {

  const text =
    message.toLowerCase().trim();


  if (
    text.includes("hello") ||
    text.includes("hi") ||
    text.includes("hey")
  ) {

    return "Hello! 👋 How can I help you?";

  }


  if (
    text.includes("name") ||
    text.includes("who are you")
  ) {

    return "I’m the Tabayyun assistant for Shah Neil Khan.";

  }


  if (
    text.includes("contact") ||
    text.includes("phone") ||
    text.includes("whatsapp")
  ) {

    return "You can contact Shah Neil Khan on WhatsApp at 01705633700.";

  }


  if (
    text.includes("project") ||
    text.includes("work")
  ) {

    return "You can explore the Works section to see the featured projects.";

  }


  if (
    text.includes("skill") ||
    text.includes("skills")
  ) {

    return "The portfolio includes design, UI/UX and development skills.";

  }


  if (
    text.includes("email") ||
    text.includes("mail")
  ) {

    return "Email: thesnkgraphic@email.com";

  }


  if (
    text.includes("thank")
  ) {

    return "You’re welcome! 😊";

  }


  return "Thanks for your message! Please use the Contact section or WhatsApp for direct communication.";

}


/* =====================================================
   6.2 — ADD CHAT MESSAGE
===================================================== */

function addChatMessage(
  message,
  type = "bot"
) {

  if (!chatbotMessages) return;


  const messageElement =
    document.createElement("div");


  messageElement.className =
    type === "user"
      ? "user-message"
      : "bot-message";


  messageElement.textContent =
    message;


  chatbotMessages.appendChild(
    messageElement
  );


  chatbotMessages.scrollTop =
    chatbotMessages.scrollHeight;

}


/* =====================================================
   6.3 — CHATBOT FORM
===================================================== */

if (chatbotForm) {

  chatbotForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const message =
        chatbotInput?.value.trim();


      if (!message) return;


      addChatMessage(
        message,
        "user"
      );


      chatbotInput.value = "";


      setTimeout(() => {

        const response =
          getBotResponse(message);

        addChatMessage(
          response,
          "bot"
        );

      }, 500);

    }
  );

}


/* =====================================================
   6.4 — CHATBOT ENTER KEY
===================================================== */

if (chatbotInput) {

  chatbotInput.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Enter" &&
        !event.shiftKey
      ) {

        event.preventDefault();

        chatbotForm?.requestSubmit();

      }

    }
  );

}


/* =====================================================
   7.0 — WHATSAPP
===================================================== */

const whatsappNumber =
  "8801705633700";


function openWhatsApp() {

  const message =
    encodeURIComponent(
      "Hello Shah Neil Khan, I visited your portfolio and would like to talk with you."
    );


  const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${message}`;


  window.open(
    whatsappURL,
    "_blank",
    "noopener,noreferrer"
  );

}


document
  .querySelectorAll(
    "[data-whatsapp]"
  )
  .forEach((button) => {

    button.addEventListener(
      "click",
      openWhatsApp
    );

  });


/* =====================================================
   8.0 — SCROLL EFFECT
===================================================== */

function handleScroll() {

  if (!header) return;


  if (window.scrollY > 30) {

    header.classList.add(
      "scrolled"
    );

  } else {

    header.classList.remove(
      "scrolled"
    );

  }

}


window.addEventListener(
  "scroll",
  handleScroll,
  { passive: true }
);


handleScroll();


/* =====================================================
   8.1 — ACTIVE NAVIGATION
===================================================== */

const sections =
  document.querySelectorAll(
    "section[id]"
  );


function updateActiveNav() {

  let currentSection = "";


  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop - 150;

    const sectionHeight =
      section.offsetHeight;


    if (
      window.scrollY >= sectionTop &&
      window.scrollY <
        sectionTop + sectionHeight
    ) {

      currentSection =
        section.getAttribute("id");

    }

  });


  navLinks.forEach((link) => {

    const target =
      link.getAttribute("href");


    link.classList.toggle(
      "active",
      target === `#${currentSection}`
    );

  });

}


window.addEventListener(
  "scroll",
  updateActiveNav,
  { passive: true }
);


updateActiveNav();


/* =====================================================
   8.2 — SMOOTH NAVIGATION
===================================================== */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetID =
          link.getAttribute("href");


        if (
          !targetID ||
          targetID === "#"
        ) return;


        const target =
          document.querySelector(
            targetID
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }
    );

  });


/* =====================================================
   9.0 — REVEAL ANIMATION
===================================================== */

if (
  "IntersectionObserver"
  in window
) {

  const observer =
    new IntersectionObserver(
      (entries, observerInstance) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "show"
            );


            observerInstance.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(
    (element) => {

      observer.observe(element);

    }
  );

} else {

  revealElements.forEach(
    (element) => {

      element.classList.add(
        "show"
      );

    }
  );

}


/* =====================================================
   9.1 — KEYBOARD ESC
===================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key !== "Escape") return;


    navMenu?.classList.remove(
      "active"
    );

    downloadMenu?.classList.remove(
      "active"
    );

    closeChatbot();

    body.classList.remove(
      "menu-open"
    );

  }
);


/* =====================================================
   9.2 — YEAR
===================================================== */

document
  .querySelectorAll(
    "[data-year]"
  )
  .forEach((element) => {

    element.textContent =
      new Date().getFullYear();

  });


/* =====================================================
   9.3 — PAGE READY
===================================================== */

document.documentElement.classList.add(
  "js-ready"
);

console.log(
  "Tabayyun Portfolio — Shah Neil Khan"
);

console.log(
  "JavaScript loaded successfully."
);
