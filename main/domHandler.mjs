// domHandler.mjs
import { addUser, findUser } from "./auth.mjs";

// Obtener elementos del DOM
const loginForm = document.querySelector("form");
const userInput = document.querySelector("input[type='email']");
const passwordInput = document.querySelector("input[type='password']");
const loginButton = document.querySelector(".login-btn");

// Mensajes de error dinámicos
const showMessage = (message, type = "error") => {
  let existingMessage = document.querySelector(".message-box");
  if (existingMessage) existingMessage.remove(); // Elimina mensajes previos

  const messageBox = document.createElement("p");
  messageBox.classList.add("message-box", type);
  messageBox.textContent = message;

  loginForm.insertBefore(messageBox, loginForm.firstChild); // Inserta el mensaje arriba del formulario

  setTimeout(() => messageBox.remove(), 3000); // Elimina el mensaje después de 3 segundos
};

// Manejo del formulario de login
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userName = userInput.value.trim();
    const password = passwordInput.value.trim();

    if (!userName || !password) {
      showMessage("❌ Completa todos los campos.");
      return;
    }

    if (findUser(userName, password)) {
      showMessage("✅ Inicio de sesión exitoso.", "success");
      setTimeout(() => {
        window.location.href = "dashboard.html"; // Redirigir a una página después del login
      }, 1500);
    } else {
      showMessage("❌ Usuario o contraseña incorrectos.");
    }
  });
}

// Redirigir al registro (Si decides implementarlo)
const signupLink = document.querySelector(".signup-text a");
if (signupLink) {
  signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "register.html"; // Si tienes una página de registro
  });
}
