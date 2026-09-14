const SUPABASE_URL = "https://pgugexzrbbijfygapixn.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_Po8jIdLQYwKvRY1k0VKQCQ_yXZQqc23";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);


// ===============================
// LOGIN ELEMENTS
// ===============================

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");


// ===============================
// SHOW / HIDE PASSWORD
// ===============================

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


// ===============================
// LOGIN
// ===============================

if (loginForm) {

  loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email =
      emailInput.value.trim();

    const password =
      passwordInput.value;


    // Empty fields
    if (!email || !password) {

      showMessage(
        "Please enter your email and password.",
        true
      );

      return;
    }


    // Button loading
    loginButton.disabled = true;

    loginButton.textContent =
      "ENTERING...";

    showMessage("");


    try {

      const { data, error } =
        await supabaseClient.auth.signInWithPassword({

          email: email,

          password: password

        });


      // Supabase error
      if (error) {
        throw error;
      }


      // Session check
      if (!data.session) {

        throw new Error(
          "Login session was not created."
        );

      }


      // Success
      showMessage(
        "Login successful. Opening dashboard..."
      );


      // Go dashboard
      setTimeout(() => {

        window.location.href =
          "./dashboard.html";

      }, 700);


    } catch (error) {

      console.error(
        "SNK Admin Login Error:",
        error
      );


      let message =
        "Login failed. Please check your email and password.";


      const errorMessage =
        error.message?.toLowerCase() || "";


      if (
        errorMessage.includes(
          "invalid login"
        )
      ) {

        message =
          "Invalid email or password.";

      }


      if (
        errorMessage.includes(
          "email not confirmed"
        )
      ) {

        message =
          "Please confirm your email in Supabase first.";

      }


      if (
        errorMessage.includes(
          "failed to fetch"
        )
      ) {

        message =
          "Could not connect to Supabase. Please check your internet connection.";

      }


      showMessage(
        message,
        true
      );


      // Reset button
      loginButton.disabled =
        false;

      loginButton.textContent =
        "ENTER ADMIN";

    }

  });

}


// ===============================
// MESSAGE
// ===============================

function showMessage(
  message,
  isError = false
) {

  if (!loginMessage) {
    return;
  }


  loginMessage.textContent =
    message;


  loginMessage.style.color =
    isError
      ? "#ff6b6b"
      : "#c99a45";

}


// ===============================
// SESSION CHECK
// ===============================

async function checkSession() {

  try {

    const {
      data: {
        session
      }
    } =
      await supabaseClient.auth.getSession();


    return session;

  } catch (error) {

    console.error(
      "Session check error:",
      error
    );

    return null;

  }

}


// ===============================
// ALREADY LOGGED IN
// ===============================

if (loginForm) {

  checkSession().then(
    (session) => {

      if (session) {

        window.location.href =
          "./dashboard.html";

      }

    }
  );

}


// ===============================
// SUPABASE CONNECTION TEST
// ===============================

console.log(
  "SNK Admin: Supabase connected",
  SUPABASE_URL
);
