import "firebase/auth";
import { auth } from "./firebase";

export const firebaseSignUp = async (email, password) => {
	email = email + "@asquire.spire";
	password = password + "asquire";
	const userCredential = await auth.createUserWithEmailAndPassword(
		email,
		password
	);
	return userCredential.user;
};
