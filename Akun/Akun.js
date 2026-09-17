// =========================================
// REXMARKET - AKUN.JS
// TAHAP 1: FIREBASE + UI
// =========================================

import { auth, db } from "./Firebase.js";


// =========================================
// ELEMENT
// =========================================

const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");

const mainBtn = document.getElementById("mainBtn");
const registerBtn = document.getElementById("registerBtn");

const forgotPassword = document.getElementById("forgotPassword");
const changePassword = document.getElementById("changePassword");

const topNotification = document.getElementById("topNotification");
const notifTitle = document.getElementById("notifTitle");
const notifText = document.getElementById("notifText");


// =========================================
// NOTIFICATION
// =========================================

function showNotification(title, message) {

    notifTitle.textContent = title;
    notifText.textContent = message;

    topNotification.classList.add("show");

    setTimeout(() => {

        topNotification.classList.remove("show");

    }, 3000);
}


// =========================================
// PASSWORD EYE
// =========================================

function setEyeIcon() {

    if (passwordInput.type === "password") {

        eyeIcon.innerHTML = `
            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;

    } else {

        eyeIcon.innerHTML = `
            <path d="M3 3l18 18"></path>
            <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"></path>
            <path d="M9.9 5.1A10.8 10.8 0 0 1 12 5c6.5 0 10 7 10 7a18.5 18.5 0 0 1-3.1 3.8"></path>
            <path d="M6.1 6.1C3.5 8 2 12 2 12s3.5 7 10 7c1.4 0 2.7-.3 3.8-.8"></path>
        `;

    }
}


togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

    } else {

        passwordInput.type = "password";

    }

    setEyeIcon();

});


// =========================================
// INITIAL EYE ICON
// =========================================

setEyeIcon();


// =========================================
// FIREBASE TEST
// =========================================

console.log("=================================");
console.log("REXMARKET FIREBASE");
console.log("=================================");

console.log("Firebase App:", auth.app);
console.log("Firebase Auth:", auth);
console.log("Firestore:", db);

console.log("Firebase berhasil dimuat.");


// =========================================
// LOGIN BUTTON TEST
// =========================================

mainBtn.addEventListener("click", () => {

    showNotification(
        "Firebase Terhubung",
        "Sistem akun Rexmarket siap digunakan."
    );

});


// =========================================
// REGISTER BUTTON TEST
// =========================================

registerBtn.addEventListener("click", () => {

    showNotification(
        "Register",
        "Fitur register akan kita buat setelah koneksi Firebase berhasil."
    );

});


// =========================================
// FORGOT PASSWORD
// =========================================

forgotPassword.addEventListener("click", (event) => {

    event.preventDefault();

    showNotification(
        "Reset Password",
        "Fitur reset password akan kita buat nanti."
    );

});


// =========================================
// CHANGE PASSWORD
// =========================================

changePassword.addEventListener("click", (event) => {

    event.preventDefault();

    showNotification(
        "Ganti Password",
        "Fitur ganti password akan kita buat nanti."
    );

});
