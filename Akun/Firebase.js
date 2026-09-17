// =========================================
// FIREBASE CONFIGURATION
// =========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


// =========================================
// FIREBASE CONFIG
// =========================================

const firebaseConfig = {

    apiKey: "AIzaSyBJuILOgk3eP6pTXIEtSoJ09yk0VL5ra4Y",

    authDomain: "rexmarket-261c2.firebaseapp.com",

    projectId: "rexmarket-261c2",

    storageBucket: "rexmarket-261c2.firebasestorage.app",

    messagingSenderId: "951626934305",

    appId: "1:951626934305:web:af0513b9daf7b908949b60",

    measurementId: "G-PH09V4MDW5"

};


// =========================================
// INITIALIZE FIREBASE
// =========================================

const app = initializeApp(firebaseConfig);


// =========================================
// FIREBASE AUTHENTICATION
// =========================================

const auth = getAuth(app);


// =========================================
// FIRESTORE DATABASE
// =========================================

const db = getFirestore(app);


// =========================================
// EXPORT
// =========================================

export {
    app,
    auth,
    db
};
