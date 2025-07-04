let isLogin = true;

window.onload = () => {
  const currentUser = localStorage.getItem("loggedInUser");
  if (currentUser) {
    showSecurePage(currentUser);
  }
};

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById("formTitle").textContent = isLogin ? "Login" : "Register";
  document.getElementById("authButton").textContent = isLogin ? "Login" : "Register";
  document.getElementById("nameGroup").style.display = isLogin ? "none" : "block";
  document.getElementById("message").textContent = "";
}

document.getElementById("authForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const name = document.getElementById("name").value.trim();

  if (isLogin) {
    loginUser(email, password);
  } else {
    registerUser(name, email, password);
  }
});

function registerUser(name, email, password) {
  if (!name) {
    showMessage("Name is required for registration", "red");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users") || "[]");
  const existing = users.find((u) => u.email === email);
  if (existing) {
    showMessage("Email already registered!", "red");
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));
  showMessage("Registered successfully! Please login.", "green");
  toggleForm();
}

function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "landing.html"; // ✅ Redirect to landing page
  } else {
    showMessage("Invalid credentials", "red");
  }
}

function showSecurePage(user) {
  document.body.innerHTML = `
    <div class="container">
      <div class="glass form-box">
        <h2>Welcome, ${JSON.parse(user).name} 👋</h2>
        <p>You are now logged in.</p>
        <button onclick="logout()">Logout</button>
      </div>
    </div>
  `;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  location.reload();
}

function showMessage(msg, color) {
  const message = document.getElementById("message");
  message.textContent = msg;
  message.style.color = color;
}
