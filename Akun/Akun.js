/* =========================================
AKUN PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Akun page loaded");

});


/* =========================================
BACK BUTTON
========================================= */

// Nanti isi kalau ada tombol kembali


/* =========================================
SHOW OR HIDE PW
========================================= */
<script>
    
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");

togglePassword.onclick = () => {

    if(password.type === "password"){

        password.type = "text";

        eyeIcon.innerHTML = `
            <path d="M2 2l20 20"/>
            <path d="M10.6 10.6A3 3 0 0013.4 13.4"/>
            <path d="M9.88 5.09A10.94 10.94 0 0112 5c7 0 11 7 11 7a18.9 18.9 0 01-4.24 4.93"/>
            <path d="M6.71 6.71A18.2 18.2 0 001 12s4 7 11 7a10.9 10.9 0 005.29-1.38"/>
        `;

    }else{

        password.type = "password";

        eyeIcon.innerHTML = `
            <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z"/>
            <circle cx="12" cy="12" r="3"/>
        `;

    }

};

</script>



/* =========================================
LOGOUT
========================================= */

// Nanti isi sistem logout


/* =========================================
PROFILE
========================================= */

// Nanti isi data profil pengguna


/* =========================================
SETTING
========================================= */

// Nanti isi pengaturan akun
