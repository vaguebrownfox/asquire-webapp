import firebase from "firebase/app";

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

export default firebase;
