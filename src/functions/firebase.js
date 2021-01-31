import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const firebaseConfig = {
	apiKey: "AIzaSyDfbURyEUAL-c5aaRV1SQq0UjucucRKb7c",
	authDomain: "asquire-lilo.firebaseapp.com",
	projectId: "asquire-lilo",
	storageBucket: "asquire-lilo.appspot.com",
	messagingSenderId: "684821713383",
	appId: "1:684821713383:web:d9b455411c599a85d0ed42",
	measurementId: "G-SR1LGQ115T",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();

export const firebaseSignUp = async (email, password) => {
	email = email + "@asquire.spire";
	password = password + "asquire";
	const userCredential = await firebase
		.auth()
		.createUserWithEmailAndPassword(email, password);
	return userCredential.user;
};

export const firebaseSignIn = async (email, password) => {
	email = email + "@asquire.spire";
	password = password + "asquire";
	const userCredential = await firebase
		.auth()
		.signInWithEmailAndPassword(email, password);
	return userCredential.user;
};

export const firebaseUserData = async (data) => {
	const userDocRef = db.collection("users").doc(data.userId);

	await userDocRef.set(data).catch((e) => {
		console.log(e);
	});
};

export const firebaseUserAudio = (filename, audio) => {
	const userAudioRef = storageRef.child("data0x01");

	userAudioRef
		.child(`${filename}.wav`)
		.put(audio.audioBlob)
		.then((snapshot) => {
			console.log("Uploaded a blob or file!");
		});
};
export default firebase;
