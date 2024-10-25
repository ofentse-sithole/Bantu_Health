import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // Import Authentication

const firebaseConfig = {
    apiKey: "AIzaSyDAAhW6kGa4oC0YJqyn_BxGJI0EiCqGlf0",
    authDomain: "bantu-health.firebaseapp.com",
    projectId: "bantu-health",
    storageBucket: "bantu-health.appspot.com",
    messagingSenderId: "39135274804",
    appId: "1:39135274804:web:baff9716edac38970aa761",
    measurementId: "G-BLG15L4KE8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // Initialize Authentication

export { database, auth };