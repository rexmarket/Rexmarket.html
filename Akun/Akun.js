// =========================================
// REXMARKET - GOOGLE LOGIN + FIRESTORE
// =========================================

import { auth, db } from "./Firebase.js";

import {
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


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


        // =========================================
        // SIMPAN DATA USER KE FIRESTORE
        // =========================================

        await setDoc(
            doc(db, "users", user.uid),
            {
                username: user.displayName || "User",
                email: user.email || "",
                role: "Member",
                saldo: 0,
                createdAt: serverTimestamp()
            },
            {
                merge: true
            }
        );


        console.log("Data user berhasil disimpan ke Firestore");


        // =========================================
        // NOTIF LOGIN
        // =========================================

        sessionStorage.setItem(
    "rexmarketLoginNotif",
    `Login berhasil 👋 Selamat datang, ${user.displayName || "User"}!`
);

window.location.href = "../Rexmarket.html";

    } catch (error) {

    console.error("Google Login Error:", error);

    alert(
        "TERJADI ERROR:\n\n" +
        error.code +
        "\n\n" +
        error.message
    );

    } finally {

        googleBtn.disabled = false;

        googleBtn.innerHTML = `
            <span class="google-icon">G</span>
            Login dengan Google
        `;

    }

});
