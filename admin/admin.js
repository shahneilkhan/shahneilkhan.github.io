/* =========================================================
   SNK ADMIN SYSTEM
   Authentication Layer
========================================================= */

"use strict";

/*
|--------------------------------------------------------------------------
| SUPABASE CONFIG
|--------------------------------------------------------------------------
|
| Replace these two values with your Supabase project values.
|
| IMPORTANT:
| Never put your Supabase SERVICE ROLE key here.
|
*/

const SUPABASE_URL =
  "YOUR_SUPABASE_PROJECT_URL";

const SUPABASE_ANON_KEY =
  "YOUR_SUPABASE_ANON_KEY";


/* =========================================================
   INITIALIZE
========================================================= */

let supabaseClient = null;

if (
  SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL" &&
  SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY"
) {
  supabaseClient =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_ANON_KEY
    );
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

function showMessage(
  message,
  type = "error"
) {

  if (!loginMessage) {
    return;
  }

  loginMessage.textContent = message;

  loginMessage.className =
    "login-message";

  if (type === "success") {
    loginMessage.classList.add("success");
  }
}


/* =========================================================
   PASSWORD VISIBILITY
========================================================= */

if (togglePassword) {

  togglePassword.addEventListener(
    "click",
    () => {

      const isPassword =
        passwordInput.type === "password";

      passwordInput.type =
        isPassword
          ? "text"
          : "password";

      togglePassword.textContent =
        isPassword
          ? "HIDE"
          : "SHOW";

    }
  );

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
         BASIC VALIDATION
      ----------------------------------------- */

      if (!email || !password) {

        showMessage(
          "Please enter your email and password."
        );

        return;
      }


      /* -----------------------------------------
         CONFIG CHECK
      ----------------------------------------- */

      if (!supabaseClient) {

        showMessage(
          "Supabase is not configured yet."
        );

        console.warn(
          "SNK Admin: Add SUPABASE_URL and SUPABASE_ANON_KEY in admin.js."
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

        /* -----------------------------------------
           SUPABASE LOGIN
        ----------------------------------------- */

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


        /* -----------------------------------------
           SUCCESS
        ----------------------------------------- */

        if (!data || !data.session) {
          throw new Error(
            "Authentication session was not created."
          );
        }


        showMessage(
          "Authentication successful. Opening dashboard...",
          "success"
        );


        loginButton.innerHTML = `
          <span>ACCESS GRANTED</span>
          <span>✓</span>
        `;


        /* -----------------------------------------
           DASHBOARD
        ----------------------------------------- */

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
    return "Too many attempts. Please wait and try again.";
  }


  if (
    message.includes("network")
  ) {
    return "Network error. Check your connection.";
  }


  return (
    error.message ||
    "Unable to sign in."
  );
}


/* =========================================================
   EXISTING SESSION CHECK
========================================================= */

async function checkExistingSession() {

  if (!supabaseClient) {
    return;
  }

  try {

    const {
      data
    } =
      await supabaseClient.auth.getSession();


    if (
      data &&
      data.session
    ) {

      /*
       * If already logged in,
       * send directly to dashboard.
       */

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


checkExistingSession();


/* =========================================================
   DEVELOPMENT NOTICE
========================================================= */

if (!supabaseClient) {

  console.info(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 SNK ADMIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

 Supabase is not configured.

 Add:

 SUPABASE_URL
 SUPABASE_ANON_KEY

 inside:

 admin/admin.js

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

}
