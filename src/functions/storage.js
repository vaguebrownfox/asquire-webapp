import { stor } from "./firebase";
const DATA_FOLDER = "data0x0cTest";

const storageRef = stor.ref();

export const firebaseUserAudio = (user, audio) => {
	const userAudioRef = storageRef.child(DATA_FOLDER);
	const filename = `webapp-${user.userId}-recId-asquire.wav`;
	userAudioRef
		.child(filename)
		.put(audio.audioBlob)
		.then((snapshot) => {
			console.log(
				"Uploaded a blob or file!  bytes:",
				snapshot.totalBytes
			);
		});
};
