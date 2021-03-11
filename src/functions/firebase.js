import firebase from "firebase/app";
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

// const firebaseConfig = {
// 	apiKey: "AIzaSyDfbURyEUAL-c5aaRV1SQq0UjucucRKb7c",
// 	authDomain: "asquire-lilo.firebaseapp.com",
// 	projectId: "asquire-lilo",
// 	storageBucket: "asquire-lilo.appspot.com",
// 	messagingSenderId: "684821713383",
// 	appId: "1:684821713383:web:d9b455411c599a85d0ed42",
// 	measurementId: "G-SR1LGQ115T",
// };

const firebaseConfig = {
	apiKey: "AIzaSyCfKL5TrL4sFwp4p6kQys_yM05_ioijrPg",
	authDomain: "asquire-tyle.firebaseapp.com",
	databaseURL: "https://asquire-tyle.firebaseio.com",
	projectId: "asquire-tyle",
	storageBucket: "asquire-tyle.appspot.com",
	messagingSenderId: "822668260575",
	appId: "1:822668260575:web:e51e4b3d3729c1d974256a",
	measurementId: "G-WH97NEPKRZ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const DATA_FOLDER = "data0x02test";
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
	const userAudioRef = storageRef.child(DATA_FOLDER);

	userAudioRef
		.child(`web-${filename}.mp4`)
		.put(audio.audioBlob)
		.then((snapshot) => {
			console.log("Uploaded a blob or file!");
		});
};
export default firebase;
