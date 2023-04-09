// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyB3ZN1FnQ9UUN-7TpF75PahlfNXkQnCTWY",
	authDomain: "ecommerce-app-44c56.firebaseapp.com",
	projectId: "ecommerce-app-44c56",
	storageBucket: "ecommerce-app-44c56.appspot.com",
	messagingSenderId: "377587587570",
	appId: "1:377587587570:web:b615db0cc9e31f0014b36b",
	measurementId: "G-T4MLG2Q8TY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
