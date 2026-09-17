// =========================================
// REXMARKET - GOOGLE LOGIN
// =========================================

import { auth } from "./Firebase.js";

import {
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// =========================================
// ELEMENT
// =========================================

const googleBtn = document.getElementById("googleBtn");


// =========================================
// GOOGLE PROVIDER
// =========================================

const provider = new GoogleAuthProvider();


// =========================================
// GOOGLE LOGIN
// =========================================

googleBtn.addEventListener("click", async () => {

    try {

        googleBtn.disabled = true;
        googleBtn.textContent = "Menghubungkan...";

        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        console.log("Google Login Berhasil");

        console.log("Nama:", user.displayName);
        console.log("Email:", user.email);
        console.log("UID:", user.uid);

        alert(`Login berhasil!\n\nSelamat datang, ${user.displayName || "User"}!`);

    } catch (error) {

        console.error("Google Login Error:", error);

        alert(
            "Login Google gagal.\n\n" +
            error.code
        );

    } finally {

        googleBtn.disabled = false;

        googleBtn.innerHTML = `
            <span class="google-icon">G</span>
            Login dengan Google
        `;

    }

});
