import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvqLF9seKLEFR01rzvA6p_gXu9SmgQDxE",
  authDomain: "angular-f547e.firebaseapp.com",
  projectId: "angular-f547e",
  storageBucket: "angular-f547e.appspot.com",
  messagingSenderId: "963907924597",
  appId: "1:963907924597:web:c53e3244f109b9259d7e3c",
  measurementId: "G-3ECVGF8F32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);