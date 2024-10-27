import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDAAhW6kGa4oC0YJqyn_BxGJI0EiCqGlf0",
    authDomain: "bantu-health.firebaseapp.com",
    projectId: "bantu-health",
    storageBucket: "bantu-health.appspot.com",
    messagingSenderId: "39135274804",
    appId: "1:39135274804:web:baff9716edac38970aa761",
    measurementId: "G-BLG15L4KE8"
};

// Initialize Firebase first
const app = initializeApp(firebaseConfig);

// Then initialize auth with persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize database
const database = getDatabase(app);

export { database, auth };
