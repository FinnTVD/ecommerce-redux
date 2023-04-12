import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
	FacebookAuthProvider,
	getAuth,
	GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyB3ZN1FnQ9UUN-7TpF75PahlfNXkQnCTWY",
	authDomain: "ecommerce-app-44c56.firebaseapp.com",
	projectId: "ecommerce-app-44c56",
	storageBucket: "ecommerce-app-44c56.appspot.com",
	messagingSenderId: "377587587570",
	appId: "1:377587587570:web:b615db0cc9e31f0014b36b",
	measurementId: "G-T4MLG2Q8TY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

export { auth, storage, fbProvider, ggProvider };
