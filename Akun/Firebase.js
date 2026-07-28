// =========================================
// FIREBASE REXMARKET
// =========================================


// Import Firebase App
import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";


// Import Firestore Database
import { 
    getFirestore 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


// Import Authentication (nanti untuk login Google)
import { 
    getAuth 
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


// =========================================
// CONFIG FIREBASE
// =========================================

const firebaseConfig = {

    apiKey: "AIzaSyAmq6hRqtpmQPGGhWYByRW5ZuWC8vPlY6c",

    authDomain: "rexmarket-60a11.firebaseapp.com",

    projectId: "rexmarket-60a11",

    storageBucket: "rexmarket-60a11.firebasestorage.app",

    messagingSenderId: "26447306943",

    appId: "1:26447306943:web:836f2be3cc0a4e5536a60a",

    measurementId: "G-LBMSEDKY25"

};


// =========================================
// CONNECT FIREBASE
// =========================================

const app = initializeApp(firebaseConfig);


// Database untuk menyimpan akun Rexmarket
export const db = getFirestore(app);


// Untuk login Google nanti
export const auth = getAuth(app);
