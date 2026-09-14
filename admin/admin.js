/* =========================================================
   SNK ADMIN SYSTEM
   FULL SUPABASE AUTHENTICATION
   Shah Neil Khan
========================================================= */

"use strict";


/* =========================================================
   1. SUPABASE CONFIG
========================================================= */

const SUPABASE_URL =
  "https://pgugexzrbbijfygapixn.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "YOUR_SB_PUBLISHABLE_KEY";


/* =========================================================
   2. CREATE SUPABASE CLIENT
========================================================= */

let supabaseClient = null;

try {

  if (
    window.supabase &&
    SUPABASE_URL &&
    SUPABASE_PUBLISHABLE_KEY &&
    SUPABASE_PUBLISHABLE_KEY !== "YOUR_SB_PUBLISHABLE_KEY"
  ) {

    supabaseClient =
      window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
      );

  }

} catch (error) {

  console.error(
    "SNK Admin: Supabase initialization failed.",
    error
  );

}


/* =========================================================
   3. GET HTML ELEMENTS
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
   4. SHOW MESSAGE
========================================================= */

function showMessage(
  message,
  type = "error"
) {

  if (!loginMessage) {
    return;
  }

  loginMessage.textContent =
    message;

  loginMessage.className =
    "login-message";

  if (type === "success") {

    loginMessage.classList.add(
      "success"
    );

  }

}


/* =========================================================
   5. PASSWORD SHOW / HIDE
========================================================= */

if (
  togglePassword &&
  passwordInput
) {

  togglePassword.addEventListener(
    "click",
    function () {

      const passwordVisible =
        passwordInput.type === "text";

      if (passwordVisible) {

        passwordInput.type =
          "password";

        togglePassword.textContent =
          "SHOW";

        togglePassword.setAttribute(
          "aria-label",
          "Show password"
        );

      } else {

        passwordInput.type =
          "text";

        togglePassword.textContent =
          "HIDE";

        togglePassword.setAttribute(
          "aria-label",
          "Hide password"
        );

      }

    }
  );

}


/* =========================================================
   6. LOGIN FORM
========================================================= */

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      /* -----------------------------------------
         CHECK INPUTS
      ----------------------------------------- */

      const email =
        emailInput
          ? emailInput.value.trim()
          : "";

      const password =
        passwordInput
          ? passwordInput.value
          : "";


      if (!email) {

        showMessage(
          "Please enter your admin email."
        );

        if (emailInput) {
          emailInput.focus();
        }

        return;
      }


      if (!password) {

        showMessage(
          "Please enter your admin password."
        );

        if (passwordInput) {
          passwordInput.focus();
        }

        return;
      }


      /* -----------------------------------------
         CHECK SUPABASE
      ----------------------------------------- */

      if (!supabaseClient) {

        showMessage(
          "Supabase is not connected. Please check admin.js configuration."
        );

        console.error(
          "SNK Admin: Supabase client is not configured."
        );

        return;
      }


      /* -----------------------------------------
         BUTTON LOADING
      ----------------------------------------- */

      if (loginButton) {

        loginButton.classList.add(
          "loading"
        );

        loginButton.innerHTML = `
          <span>AUTHENTICATING...</span>
          <span>•••</span>
        `;

      }

      showMessage("");


      try {


        /* ---------------------------------------
           SUPABASE LOGIN
        --------------------------------------- */

        const result =
          await supabaseClient.auth.signInWithPassword({

            email: email,

            password: password

          });


        const data =
          result.data;

        const error =
          result.error;


        /* ---------------------------------------
           LOGIN ERROR
        --------------------------------------- */

        if (error) {

          throw error;

        }


        /* ---------------------------------------
           CHECK SESSION
        --------------------------------------- */

        if (
          !data ||
          !data.session
        ) {

          throw new Error(
            "Login succeeded but no session was created."
          );

        }


        /* ---------------------------------------
           SUCCESS
        --------------------------------------- */

        showMessage(
          "Access granted. Opening admin dashboard...",
          "success"
        );


        if (loginButton) {

          loginButton.innerHTML = `
            <span>ACCESS GRANTED</span>
            <span>✓</span>
          `;

        }


        /* ---------------------------------------
           GO TO DASHBOARD
        --------------------------------------- */

        setTimeout(
          function () {

            window.location.href =
              "./dashboard.html";

          },
          600
        );


      } catch (error) {


        console.error(
          "SNK Admin Login Error:",
          error
        );


        showMessage(
          getAuthErrorMessage(error)
        );


        if (loginButton) {

          loginButton.classList.remove(
            "loading"
          );

          loginButton.innerHTML = `
            <span>ENTER ADMIN</span>
            <span>→</span>
          `;

        }

      }

    }
  );

}


/* =========================================================
   7. AUTH ERROR MESSAGE
========================================================= */

function getAuthErrorMessage(error) {

  if (!error) {

    return "Authentication failed.";

  }


  const message =
    String(
      error.message || ""
    ).toLowerCase();


  /* Invalid login */

  if (
    message.includes(
      "invalid login credentials"
    )
  ) {

    return (
      "Invalid email or password."
    );

  }


  /* Email confirmation */

  if (
    message.includes(
      "email not confirmed"
    )
  ) {

    return (
      "Your admin email is not confirmed yet."
    );

  }


  /* Too many attempts */

  if (
    message.includes(
      "too many requests"
    )
  ) {

    return (
      "Too many login attempts. Please wait a little and try again."
    );

  }


  /* Network */

  if (
    message.includes(
      "network"
    ) ||
    message.includes(
      "failed to fetch"
    )
  ) {

    return (
      "Cannot connect to Supabase. Please check your internet connection."
    );

  }


  /* Bad API key */

  if (
    message.includes(
      "apikey"
    ) ||
    message.includes(
      "api key"
    )
  ) {

    return (
      "Supabase API key is incorrect."
    );

  }


  /* Invalid URL */

  if (
    message.includes(
      "url"
    )
  ) {

    return (
      "Supabase Project URL is incorrect."
    );

  }


  return (
    error.message ||
    "Unable to sign in."
  );

}


/* =========================================================
   8. CHECK EXISTING SESSION
========================================================= */

async function checkExistingSession() {

  if (!supabaseClient) {

    return;

  }


  try {

    const result =
      await supabaseClient.auth.getSession();


    const data =
      result.data;

    const error =
      result.error;


    if (error) {

      console.warn(
        "SNK Admin session check:",
        error
      );

      return;

    }


    if (
      data &&
      data.session
    ) {

      /*
       * User is already logged in.
       * Go directly to dashboard.
       */

      window.location.href =
        "./dashboard.html";

    }

  } catch (error) {

    console.warn(
      "SNK Admin session check failed:",
      error
    );

  }

}


/* =========================================================
   9. START SESSION CHECK
========================================================= */

checkExistingSession();


/* =========================================================
   10. DEVELOPMENT / CONFIG MESSAGE
========================================================= */

if (!supabaseClient) {

  console.warn(
    "SNK ADMIN: Supabase is not configured."
  );

}
