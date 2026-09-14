const SUPABASE_URL = "https://pgugexzrbbijfygapixn.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "আপনার sb_publishable_... key এখানে বসান";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginButton = document.getElementById("loginButton");
const loginMessage = document.getElementById("loginMessage");


// Show / Hide password
if (togglePassword && passwordInput) {
  togglePassword.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";

    passwordInput.type = isPassword ? "text" : "password";
    togglePassword.textContent = isPassword ? "HIDE" : "SHOW";
  });
}


// Login
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      showMessage("Please enter your email and password.", true);
      return;
    }

    loginButton.disabled = true;
    loginButton.textContent = "ENTERING...";
    showMessage("");

    try {
      const { data, error } =
        await supabaseClient.auth.signInWithPassword({
          email,
          password
        });

      if (error) {
        throw error;
      }

      if (!data.session) {
        throw new Error("Login session was not created.");
      }

      showMessage("Login successful. Opening dashboard...");

      setTimeout(() => {
        window.location.href = "./dashboard.html";
      }, 700);

    } catch (error) {
      console.error("Login error:", error);

      let message = "Login failed. Please check your email and password.";

      if (error.message?.toLowerCase().includes("invalid login")) {
        message = "Invalid email or password.";
      }

      if (error.message?.toLowerCase().includes("email not confirmed")) {
        message = "Please confirm your email in Supabase first.";
      }

      showMessage(message, true);

      loginButton.disabled = false;
      loginButton.textContent = "ENTER ADMIN";
    }
  });
}


// Message helper
function showMessage(message, isError = false) {
  if (!loginMessage) return;

  loginMessage.textContent = message;

  loginMessage.style.color = isError
    ? "#ff6b6b"
    : "#c99a45";
}


// ===============================
// SESSION CHECK
// ===============================

async function checkSession() {
  try {
    const {
      data: { session }
    } = await supabaseClient.auth.getSession();

    return session;
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
}


// If already logged in, don't stay on login page
if (loginForm) {
  checkSession().then((session) => {
    if (session) {
      window.location.href = "./dashboard.html";
    }
  });
}
