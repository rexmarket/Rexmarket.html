
/* =========================================
   REXMARKET - GOOGLE LOGIN + FIRESTORE
   + LOGIN NOTIFICATION
========================================= */

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
// LOGIN ERROR MESSAGE
// =========================================

function getLoginErrorMessage(error) {
    switch (error.code) {
        case "auth/popup-closed-by-user":
            return "Jendela login ditutup sebelum selesai.";

        case "auth/popup-blocked":
            return "Popup login diblokir browser.";

        case "auth/cancelled-popup-request":
            return "Proses login dibatalkan.";

        case "auth/network-request-failed":
            return "Koneksi bermasalah. Coba lagi.";

        case "auth/unauthorized-domain":
            return "Domain website belum diizinkan Firebase.";

        default:
            return "Login gagal. Silakan coba lagi.";
    }
}


// =========================================
// GOOGLE LOGIN
// =========================================

if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
        try {
            googleBtn.disabled = true;
            googleBtn.textContent = "Menghubungkan...";

            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Simpan data user tanpa menimpa saldo
            // atau data akun yang sudah tersedia.
            await setDoc(
                doc(db, "users", user.uid),
                {
                    username: user.displayName || "User",
                    email: user.email || "",
                    role: "Member"
                },
                { merge: true }
            );

            // Tandai login berhasil untuk halaman tujuan.
            sessionStorage.setItem(
                "rexmarketLoginNotif",
                JSON.stringify({
                    type: "success",
                    title: "Login berhasil!",
                    message:
                        `Selamat datang, ${user.displayName || "User"}!`,
                    time: Date.now()
                })
            );

            // Pertahankan tujuan navigasi website.
            window.location.href = "../Rexmarket.html";

        } catch (error) {
            console.error("Google Login Error:", error);

            // Simpan pesan gagal agar dapat ditampilkan
            // di halaman login yang sedang terbuka.
            if (window.RexNotify) {
                window.RexNotify.show({
                    type: "error",
                    title: "Login gagal!",
                    message: getLoginErrorMessage(error)
                });
            } else {
                alert(getLoginErrorMessage(error));
            }

        } finally {
            googleBtn.disabled = false;

            googleBtn.innerHTML = `
                <span class="google-icon">G</span>
                Login dengan Google
            `;
        }
    });
    }
