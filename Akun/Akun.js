// =========================================
// REXMARKET - FIREBASE TEST
// =========================================

import { auth, db } from "./Firebase.js";


// =========================================
// ELEMENT
// =========================================

const mainBtn = document.getElementById("mainBtn");
const registerBtn = document.getElementById("registerBtn");


// =========================================
// FIREBASE TEST
// =========================================

console.log("REXMARKET FIREBASE BERHASIL TERHUBUNG");


// =========================================
// LOGIN BUTTON
// =========================================

mainBtn.addEventListener("click", () => {

    alert("Firebase berhasil terhubung!");

});


// =========================================
// REGISTER BUTTON
// =========================================

registerBtn.addEventListener("click", () => {

    alert("Register siap dibuat!");

});
