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

    const backBtn = document.getElementById("backBtn");

    const topNotification = document.getElementById("topNotification");
    const notifTitle = document.getElementById("notifTitle");
    const notifText = document.getElementById("notifText");
    const usernameSuggestion = document.getElementById("usernameSuggestion");
   
    const resetOverlay = document.getElementById("resetOverlay");
    const forgotPassword = document.getElementById("forgotPassword");
    const closeReset = document.getElementById("closeReset");
    const checkUsernameBtn = document.getElementById("checkUsernameBtn");
    const resetUsername = document.getElementById("resetUsername");
    const newPasswordSection = document.getElementById("newPasswordSection");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const confirmResetBtn = document.getElementById("confirmResetBtn");
   
    let registerMode = false;
    let resetMode = "forgot";

    /* =========================================
    SHOW NOTIFICATION
    ========================================= */

    function showNotification(title, text){

        notifTitle.textContent = title;
        notifText.textContent = text;

        topNotification.classList.add("show");

        setTimeout(() => {

            topNotification.classList.remove("show");

        },3000);

    }

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
RESET PASSWORD
========================================= */
    forgotPassword.addEventListener("click",(e)=>{

    e.preventDefault();

    resetMode = "forgot";

    document.querySelector(".reset-box h2").textContent =
    "Lupa Password";

    resetUsername.placeholder = "Masukkan Username";

    checkUsernameBtn.textContent = "Cek Akun";

    resetOverlay.classList.add("show");

    resetUsername.readOnly = false;

    checkUsernameBtn.style.display = "block";

    resetUsername.value = "";

    newPassword.value = "";

    confirmPassword.value = "";

    newPasswordSection.style.display = "none";

});

    changePassword.addEventListener("click",(e)=>{
        
    e.preventDefault();
        resetMode = "change";

    resetOverlay.classList.add("show");

    document.querySelector(".reset-box h2").textContent =
    "Ganti Password";

    resetUsername.placeholder = "Masukkan Password Lama";

    checkUsernameBtn.textContent = "Ganti Password";

    resetUsername.readOnly = false;

    checkUsernameBtn.style.display = "block";

    resetUsername.value = "";

    newPassword.value = "";

    confirmPassword.value = "";

    newPasswordSection.style.display = "none";

});


closeReset.addEventListener("click",()=>{

    resetUsername.readOnly = false;

    checkUsernameBtn.style.display = "block";

    resetUsername.value = "";

    newPassword.value = "";

    confirmPassword.value = "";

    newPasswordSection.style.display = "none";

    resetOverlay.classList.remove("show");



});

checkUsernameBtn.addEventListener("click",()=>{

    if(resetUsername.value.trim() === ""){

        showNotification(
            resetMode === "forgot" ? "Reset Password" : "Ganti Password",
            resetMode === "forgot"
            ? "Masukkan Username terlebih dahulu."
            : "Masukkan Password lama terlebih dahulu."
        );

        return;

    }

    const accounts = JSON.parse(
        localStorage.getItem("rex_accounts")
    ) || [];

    let account;

    if(resetMode === "forgot"){

        account = accounts.find(acc=>

            acc.username.toLowerCase() ===
            resetUsername.value.trim().toLowerCase()

        );

        if(!account){

            showNotification(
                "Reset Password",
                "Username tidak ditemukan."
            );

            return;

        }

    }else{

        account = accounts.find(acc=>

            acc.password === resetUsername.value

        );

        if(!account){

            showNotification(
                "Ganti Password",
                "Password lama salah."
            );

            return;

        }

    }

    resetUsername.readOnly = true;

    checkUsernameBtn.style.display = "none";

    newPasswordSection.style.display = "block";

});
    

    confirmResetBtn.addEventListener("click",()=>{

    if(newPassword.value.trim() === "" ||
       confirmPassword.value.trim() === ""){

        showNotification(
            "Reset Password",
            "Lengkapi Password baru."
        );

        return;

    }

    if(newPassword.value !== confirmPassword.value){

        showNotification(
            "Reset Password",
            "Konfirmasi Password tidak cocok."
        );

        return;

    }

    let accounts = JSON.parse(
        localStorage.getItem("rex_accounts")
    ) || [];

    const index = accounts.findIndex(acc=>

        acc.username.toLowerCase() ===
        resetUsername.value.trim().toLowerCase()

    );

    if(index === -1){

        showNotification(
            "Reset Password",
            "Username tidak ditemukan."
        );

        return;

    }

    accounts[index].password = newPassword.value;

        localStorage.setItem(
    "rex_accounts",
    JSON.stringify(accounts)
);

resetOverlay.classList.remove("show");

showNotification(
    "Berhasil",
    "Password berhasil diubah."
);

// Kembalikan ke kondisi awal
resetUsername.readOnly = false;

checkUsernameBtn.style.display = "block";

resetUsername.value = "";

newPassword.value = "";

confirmPassword.value = "";

newPasswordSection.style.display = "none";

});
    
    

    /* =========================================
USERNAME AUTOCOMPLETE
========================================= */

username.addEventListener("input", () => {

    const keyword = username.value.toLowerCase().trim();

    usernameSuggestion.innerHTML = "";

    if(keyword === ""){

        usernameSuggestion.style.display = "none";

        return;

    }

    const accounts = JSON.parse(
        localStorage.getItem("rex_accounts")
    ) || [];

    const result = accounts.filter(account =>

        account.username
        .toLowerCase()
        .startsWith(keyword)

    );

    if(result.length === 0){

        usernameSuggestion.style.display = "none";

        return;

    }

    result.forEach(account => {

        const item = document.createElement("div");

        item.className = "username-item";

        item.innerHTML = `
    <svg class="user-icon" viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M4 20c1.8-4 14.2-4 16 0"></path>
    </svg>

    <span>${account.username}</span>
`;

        item.onclick = () => {

            username.value = account.username;

            usernameSuggestion.style.display = "none";

        };

        usernameSuggestion.appendChild(item);

    });

    usernameSuggestion.style.display = "block";

});

document.addEventListener("click",(e)=>{

    if(!e.target.closest(".username-box")){

        usernameSuggestion.style.display = "none";

    }

});

    /* =========================================
LOGIN / REGISTER
========================================= */

registerBtn.addEventListener("click", () => {

    if(!registerMode){

        registerMode = true;

        formTitle.textContent = "Registrasi";

        username.value = "";
        password.value = "";

        username.placeholder = "Buat Username";
        password.placeholder = "Buat Password";

        password.type = "password";
        eyeClosed();

        mainBtn.textContent = "Register";

        registerText.textContent = "Sudah punya akun?";

        registerBtn.textContent = "Login";

        if(backBtn){

            backBtn.style.display = "none";

        }

    }else{

        registerMode = false;

        formTitle.textContent = "Login";

        username.value = "";
        password.value = "";

        username.placeholder = "Masukkan Username";
        password.placeholder = "Masukkan Password";

        password.type = "password";
        eyeClosed();

        mainBtn.textContent = "Login";

        registerText.textContent = "Belum punya akun?";

        registerBtn.textContent = "Register";

        if(backBtn){

            backBtn.style.display = "flex";

        }

    }

});

mainBtn.addEventListener("click", () => {

    if(registerMode){

        if(username.value.trim() === "" || password.value.trim() === ""){

            showNotification(
                "Gagal",
                "Lengkapi Username dan Password."
            );

            return;

        }

        let accounts = JSON.parse(
            localStorage.getItem("rex_accounts")
        ) || [];

        const exist = accounts.find(
            account => account.username === username.value.trim()
        );

        if(exist){

            showNotification(
                "Registrasi Gagal",
                "Username sudah digunakan."
            );

            return;

        }

        accounts.push({

            username: username.value.trim(),

            password: password.value

        });

        localStorage.setItem(
            "rex_accounts",
            JSON.stringify(accounts)
        );

        showNotification(
            "Berhasil",
            "Akun berhasil dibuat. Silakan login."
        );

        registerMode = false;

        formTitle.textContent = "Login";

        username.value = "";
        password.value = "";

        username.placeholder = "Masukkan Username";
        password.placeholder = "Masukkan Password";

        password.type = "password";
        eyeClosed();

        mainBtn.textContent = "Login";

        registerText.textContent = "Belum punya akun?";

        registerBtn.textContent = "Register";

        if(backBtn){

            backBtn.style.display = "flex";

        }

    }else{

        if(username.value.trim() === "" || password.value.trim() === ""){

            showNotification(
                "Login Gagal",
                "Masukkan Username dan Password."
            );

            return;

        }

        const accounts = JSON.parse(
            localStorage.getItem("rex_accounts")
        ) || [];

        const account = accounts.find(acc =>

            acc.username === username.value.trim() &&
            acc.password === password.value

        );

        if(account){

            sessionStorage.setItem(
                "loginSuccess",
                "true"
            );

            window.location.href = "../Rexmarket.html";

        }else{

            showNotification(
                "Login Gagal",
                "Username atau Password salah."
            );

        }

    }

});

                          });
