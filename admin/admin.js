/* =========================================================
   SNK ADMIN SYSTEM
   Authentication Layer — Supabase
========================================================= */

"use strict";

/* =========================================================
   SUPABASE CONFIG
========================================================= */

const SUPABASE_URL =
  "https://pgugexzrbbijfygapixn.supabase.co";

const SUPABASE_ANON_KEY =
  "YOUR_SB_PUBLISHABLE_KEY";


/* =========================================================
   INITIALIZE SUPABASE
========================================================= */

let supabaseClient = null;

try {
  if (
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL" &&
    SUPABASE_ANON_KEY !== "YOUR_SB_PUBLISHABLE_KEY"
  ) {
    supabaseClient = window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
  }
} catch (error) {
  console.error("SNK Admin: Supabase initialization failed.", error);
}


/* =========================================================
   ELEMENTS
========================================================= */

const loginForm =
  document.getElementById("loginForm");

const emailInput =
  document.getElementById("email");

const passwordInput =
  document.getElementById("password");

const loginButton =
  document.getElementById("loginButton");

const loginMessage =
  document.getElementById("loginMessage");

const togglePassword =
  document.getElementById("togglePassword");


/* =========================================================
   MESSAGE
========================================================= */

function showMessage(message, type = "error") {

  if (!loginMessage) return;

  loginMessage.textContent = message;

  loginMessage.className = "login-message";

  if (type === "success") {
    loginMessage.classList.add("success");
  }
}


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

if (togglePassword && passwordInput) {

  togglePassword.addEventListener("click", () => {

    const isPassword =
      passwordInput.type === "password";

    passwordInput.type =
      isPassword ? "text" : "password";

    togglePassword.textContent =
      isPassword ? "HIDE" : "SHOW";

  });

}


/* =========================================================
   LOGIN
========================================================= */

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      const email =
        emailInput.value.trim();

      const password =
        passwordInput.value;


      /* -----------------------------------------
         VALIDATION
      ----------------------------------------- */

      if (!email || !password) {

        showMessage(
          "Please enter your email and password."
        );

        return;
      }


      /* -----------------------------------------
         SUPABASE CHECK
      ----------------------------------------- */

      if (!supabaseClient) {

        showMessage(
          "Supabase is not configured. Add your Publishable key in admin.js."
        );

        console.error(
          "SNK Admin: Supabase client was not initialized."
        );

        return;
      }


      /* -----------------------------------------
         LOADING
      ----------------------------------------- */

      loginButton.classList.add("loading");

      loginButton.innerHTML = `
        <span>AUTHENTICATING...</span>
        <span>•••</span>
      `;

      showMessage("");


      try {

        /* ---------------------------------------
           SUPABASE AUTH
        --------------------------------------- */

        const {
          data,
          error
        } =
          await supabaseClient.auth.signInWithPassword({
            email,
            password
          });


        if (error) {
          throw error;
        }


        /* ---------------------------------------
           SESSION CHECK
        --------------------------------------- */

        if (!data || !data.session) {

          throw new Error(
            "Authentication session was not created."
          );

        }


        /* ---------------------------------------
           SUCCESS
        --------------------------------------- */

        showMessage(
          "Authentication successful. Opening dashboard...",
          "success"
        );

        loginButton.innerHTML = `
          <span>ACCESS GRANTED</span>
          <span>✓</span>
        `;


        /* ---------------------------------------
           DASHBOARD
        --------------------------------------- */

        setTimeout(() => {

          window.location.href =
            "./dashboard.html";

        }, 500);

      }


      catch (error) {

        console.error(
          "SNK Admin Login Error:",
          error
        );

        showMessage(
          getAuthErrorMessage(error)
        );

        loginButton.classList.remove(
          "loading"
        );

        loginButton.innerHTML = `
          <span>ENTER ADMIN</span>
          <span>→</span>
        `;

      }

    }
  );

}


/* =========================================================
   AUTH ERROR HANDLER
========================================================= */

function getAuthErrorMessage(error) {

  if (!error) {
    return "Authentication failed.";
  }

  const message =
    String(error.message || "").toLowerCase();


  if (
    message.includes("invalid login credentials")
  ) {
    return "Invalid email or password.";
  }


  if (
    message.includes("email not confirmed")
  ) {
    return "Please confirm your admin email first.";
  }


  if (
    message.includes("too many requests")
  ) {
    return "Too many login attempts. Please wait and try again.";
  }


  if (
    message.includes("network")
  ) {
    return "Network error. Check your internet connection.";
  }


  if (
    message.includes("failed to fetch")
  ) {
    return "Unable to connect to Supabase. Check your Project URL and Publishable key.";
  }


  return (
    error.message ||
    "Unable to sign in."
  );

}


/* =========================================================
   EXISTING SESSION
========================================================= */

async function checkExistingSession() {

  if (!supabaseClient) {
    return;
  }

  try {

    const {
      data,
      error
    } =
      await supabaseClient.auth.getSession();


    if (error) {
      console.warn(
        "Session check error:",
        error
      );

      return;
    }


    if (
      data &&
      data.session
    ) {

      window.location.href =
        "./dashboard.html";

    }

  }

  catch (error) {

    console.warn(
      "Session check failed:",
      error
    );

  }

}


/* =========================================================
   START
========================================================= */

checkExistingSession();
