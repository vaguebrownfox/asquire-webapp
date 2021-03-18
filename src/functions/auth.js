import "firebase/auth";
import { auth } from "./firebase";

export const firebaseSignUp = async (email, password) => {
	email = email + "@asquire.spire";
	password = password + "asquire";
	const userCredential = await auth
		.createUserWithEmailAndPassword(email, password)
		.catch((err) => {
			console.log("fb sign up error :: ", err);
			return "nope";
		});
	return userCredential.user;
};

export const firebaseSignIn = async (email, password) => {
	email = email + "@asquire.spire";
	password = password + "asquire";
	const userCredential = await auth
		.signInWithEmailAndPassword(email, password)
		.catch((err) => {
			console.log("fb sign in error :: ", err);
			return "nope";
		});
	return userCredential.user;
};
