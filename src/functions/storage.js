import { stor } from "./firebase";
import { AUDIO_DATA_FOLDER, PROJECT_ID } from "./firebaseConfig";

const storageRef = stor.ref();

export const firebaseUserAudio = (user, audio) => {
	const userAudioRef = storageRef.child(AUDIO_DATA_FOLDER);
	const filename = `webapp-${user.userId}-${user.stimTag}-${user.stimCount}-${PROJECT_ID}.wav`;

	userAudioRef
		.child(filename)
		.put(audio.wavBlob)
		.then((snapshot) => {
			console.log(
				"Uploaded a blob or file!  bytes:",
				snapshot.totalBytes
			);
		});
};
