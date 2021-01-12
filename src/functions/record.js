const initializeMedia = () => {
	if (!("mediaDevices" in navigator)) {
		navigator.mediaDevices = {};
	}

	if (!("getUserMedia" in navigator.mediaDevices)) {
		navigator.mediaDevices.getUserMedia = (constraints) => {
			var getUserMedia =
				navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

			if (!getUserMedia) {
				return Promise.reject(
					new Error("getUserMedia is not implemented")
				);
			}

			return new Promise((resolve, reject) => {
				getUserMedia.call(navigator, constraints, resolve, reject);
			});
		};
	}
};

const recordAudio = () =>
	new Promise(async (resolve, reject) => {
		initializeMedia();

		const stream = await navigator.mediaDevices
			.getUserMedia({
				audio: true,
			})
			.catch((err) => {
				alert("Your browser does not support audio recording!");
			});

		if (stream) {
			const mediaRecorder = new MediaRecorder(stream);
			let audioChunks = [];

			mediaRecorder.addEventListener("dataavailable", (event) => {
				audioChunks.push(event.data);
			});

			const start = () => {
				audioChunks = [];
				mediaRecorder.start();
			};

			const stop = () =>
				new Promise((resolve) => {
					mediaRecorder.addEventListener("stop", () => {
						const audioBlob = new Blob(audioChunks, {
							type: "audio/wav",
						});
						const audioUrl = URL.createObjectURL(audioBlob);
						const audio = new Audio(audioUrl);
						const play = () => {
							audio.play();
						};
						resolve({ audioChunks, audioBlob, audioUrl, play });
					});

					mediaRecorder.stop();
				});
			resolve({ start, stop });
		} else {
			reject(new Error("Audio recording not supported by browser!"));
		}
	}).catch((e) => {
		console.log("your device maybe deaf :/");
	});

export default recordAudio;
