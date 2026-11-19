/* auth.js
   Simulated authentication (no database needed).
   Credentials are hardcoded, login state is kept in sessionStorage,
   and every login attempt is recorded in localStorage for the Login Activity page. */

const VALID_USERNAME = "nazira";
const VALID_PASSWORD = "852369";
const LOG_KEY = "semtrackLoginLog";

// Called when the login form is submitted
function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const errorBox = document.getElementById("loginError");

  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    recordLogin(username, true);
    sessionStorage.setItem("loggedIn", "true");
    sessionStorage.setItem("user", username);
    window.location.href = "dashboard.html";
  } else {
    recordLogin(username, false);
    // Show the error message
    errorBox.classList.remove("d-none");
  }
}

// Put this on every protected page: kicks you back to login if not signed in
function requireLogin() {
  if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
}

// Logout button
function logout() {
  sessionStorage.clear();
  window.location.href = "index.html";
}

// ---------- Login log (shown on the Login Activity page) ----------

// Save one attempt. The password is never saved, only the username and the result.
function recordLogin(username, success) {
  try {
    const log = getLoginLog();
    log.unshift({ time: new Date().toISOString(), username: username || "(empty)", success: success });
    localStorage.setItem(LOG_KEY, JSON.stringify(log.slice(0, 200))); // keep the latest 200
  } catch (error) {
    // If the browser blocks storage, logging is skipped but login still works
  }
}

// Read the saved attempts (newest first)
function getLoginLog() {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

// Delete all saved attempts
function clearLoginLog() {
  try {
    localStorage.removeItem(LOG_KEY);
  } catch (error) {
    // ignore
  }
}
