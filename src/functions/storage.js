import { stor } from "./firebase";
import { AUDIO_DATA_FOLDER, PROJECT_ID } from "./firebaseSetup";

const storageRef = stor.ref();

export const firebaseUserAudio = (user, audio) => {
	const userAudioRef = storageRef.child(AUDIO_DATA_FOLDER).child(user.userId);
	const filename = `webapp-${user.userId}-${user.stimTag}-${user.completed}-${PROJECT_ID}.wav`;

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
