/* =========================================
AKUN PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Akun page loaded");

    /* =========================================
    SHOW / HIDE PASSWORD
    ========================================= */

    const password = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const eyeIcon = document.getElementById("eyeIcon");

    if(password && togglePassword && eyeIcon){

        eyeIcon.innerHTML = `
            <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;

        togglePassword.addEventListener("click", () => {

            if(password.type === "password"){

                password.type = "text";

                eyeIcon.innerHTML = `
                    <path d="M3 3L21 21"></path>
                    <path d="M10.6 10.6A3 3 0 0013.4 13.4"></path>
                    <path d="M9.9 5.1A11 11 0 0112 5c7 0 11 7 11 7"></path>
                    <path d="M6.7 6.7A18 18 0 001 12s4 7 11 7a11 11 0 005.3-1.4"></path>
                `;

            }else{

                password.type = "password";

                eyeIcon.innerHTML = `
                    <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                `;

            }

        });

    }

});


/* =========================================
LOGIN / REGISTER
========================================= */

let registerMode = false;

const formTitle = document.getElementById("formTitle");
const username = document.getElementById("username");
const password = document.getElementById("password");

const mainBtn = document.getElementById("mainBtn");
const registerBtn = document.getElementById("registerBtn");
const registerText = document.getElementById("registerText");

registerBtn.onclick = () => {

    registerMode = true;

    formTitle.innerText = "Registrasi";

    username.value = "";
    password.value = "";

    username.placeholder = "Buat Username";
    password.placeholder = "Buat Password";

    mainBtn.innerText = "Register";

    registerBtn.style.display = "none";

    registerText.innerText = "Isi data untuk membuat akun";

};

mainBtn.onclick = () => {

    if(registerMode){

        if(username.value === "" || password.value === ""){

            alert("Lengkapi data terlebih dahulu!");

            return;

        }

        alert("✅ Akun berhasil dibuat!");

        registerMode = false;

        formTitle.innerText = "Login";

        username.value = "";
        password.value = "";

        username.placeholder = "Masukkan Username";
        password.placeholder = "Masukkan Password";

        mainBtn.innerText = "Login";

        registerBtn.style.display = "block";

        registerText.innerText = "Belum punya akun?";

    }else{

        alert("Login berhasil!");

    }

};
