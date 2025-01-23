import firebase from "firebase/compat/app";
import "firebase/compat/auth";

// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQkEEw35wWDfNjNz6S-Q-9Dh8dMvyoNYU",
    authDomain: "user-analytics-system-448210.firebaseapp.com",
    projectId: "user-analytics-system-448210",
    storageBucket: "user-analytics-system-448210.firebasestorage.app",
    messagingSenderId: "825467496328",
    appId: "1:825467496328:web:3e331e237adb36835dfc3d"
  };
  
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); 