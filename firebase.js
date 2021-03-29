import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9g8ApCVLQX9zHxs5g-CtfpJMbHU5sc68",
    authDomain: "whatsapp-clone-v2-81550.firebaseapp.com",
    projectId: "whatsapp-clone-v2-81550",
    storageBucket: "whatsapp-clone-v2-81550.appspot.com",
    messagingSenderId: "1054914804516",
    appId: "1:1054914804516:web:693b1c67bb06d8d59ad1b1",
    measurementId: "G-7SP59YB9FX"
};

// INITIALISED OR NOT
const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// const app = firebase.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, provider};