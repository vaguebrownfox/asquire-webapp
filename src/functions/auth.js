import "firebase/auth";
import { auth } from "./firebase";

export const firebaseSignUp = async (email, password) => {
	const format = getCreds(email, password);
	const userCredential = await auth
		.createUserWithEmailAndPassword(format.email, format.password)
		.catch((err) => {
			console.log("fb sign up error :: ", err);
			return null;
		});
	return userCredential?.user || null;
};

export const firebaseSignIn = async (email, password) => {
	const format = getCreds(email, password);
	const userCredential = await auth
		.signInWithEmailAndPassword(format.email, format.password)
		.catch((err) => {
			console.log("fb sign in error :: ", err);
			return null;
		});
	return userCredential?.user || null;
};

// helpers
const getCreds = (email, password) => {
	email = email + "@asquire.spire";
	password = password + "asquire";
	return { email, password };
};
