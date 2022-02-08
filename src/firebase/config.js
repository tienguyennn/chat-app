import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAQWwKG17jYA4aC27PEQu6riHh8CiNDgdM",
	authDomain: "chat-app-4ad43.firebaseapp.com",
	projectId: "chat-app-4ad43",
	storageBucket: "chat-app-4ad43.appspot.com",
	messagingSenderId: "319334877563",
	appId: "1:319334877563:web:9123c8458ff97a30c215de",
	measurementId: "G-E6R0PBXHMD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

connectAuthEmulator(auth, "http://localhost:9099");
connectFirestoreEmulator(db, "localhost", 8081);

export { app, auth, db };
