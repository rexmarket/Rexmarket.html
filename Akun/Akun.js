/* =========================================
AKUN PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Akun page loaded");

    /* =========================================
    ELEMENT
    ========================================= */

    const formTitle = document.getElementById("formTitle");
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    const mainBtn = document.getElementById("mainBtn");
    const registerBtn = document.getElementById("registerBtn");
    const registerText = document.getElementById("registerText");

    const togglePassword = document.getElementById("togglePassword");
    const eyeIcon = document.getElementById("eyeIcon");

    let registerMode = false;

    /* =========================================
    SHOW / HIDE PASSWORD
    ========================================= */

    if(password && togglePassword && eyeIcon){

        eyeClosed();

        togglePassword.addEventListener("click", () => {

            if(password.type === "password"){

                password.type = "text";

                eyeOpen();

            }else{

                password.type = "password";

                eyeClosed();

            }

        });

    }

    function eyeClosed(){

        eyeIcon.innerHTML = `
            <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;

    }

    function eyeOpen(){

        eyeIcon.innerHTML = `
            <path d="M3 3L21 21"></path>
            <path d="M10.6 10.6A3 3 0 0013.4 13.4"></path>
            <path d="M9.9 5.1A11 11 0 0112 5c7 0 11 7 11 7"></path>
            <path d="M6.7 6.7A18 18 0 001 12s4 7 11 7a11 11 0 005.3-1.4"></path>
        `;

    }

    /* =========================================
    LOGIN / REGISTER
    ========================================= */

    registerBtn.addEventListener("click", () => {

        registerMode = true;

        formTitle.textContent = "Registrasi";

        username.value = "";
        password.value = "";

        username.placeholder = "Buat Username";
        password.placeholder = "Buat Password";

        password.type = "password";
        eyeClosed();

        mainBtn.textContent = "Register";

        registerBtn.style.display = "none";

        registerText.textContent = "Isi data untuk membuat akun";

    });

    mainBtn.addEventListener("click", () => {

        if(registerMode){

            if(username.value.trim() === "" || password.value.trim() === ""){

                alert("Lengkapi data terlebih dahulu!");

                return;

            }

            alert("✅ Akun berhasil dibuat!");

            registerMode = false;

            formTitle.textContent = "Login";

            username.value = "";
            password.value = "";

            username.placeholder = "Masukkan Username";
            password.placeholder = "Masukkan Password";

            password.type = "password";
            eyeClosed();

            mainBtn.textContent = "Login";

            registerBtn.style.display = "block";

            registerText.textContent = "Belum punya akun?";

        }else{

            alert("Login berhasil!");

        }

    });

});
