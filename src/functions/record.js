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
				audio: {
					autoGainControl: false, //(2) [true, false]
					channelCount: 1, // {max: 2, min: 1}
					deviceId: "default",
					// groupId: null,
					echoCancellation: false, //(2) [true, false]
					latency: 0.01, //{max: 0.01, min: 0.01}
					noiseSuppression: false, //(2) [true, false]
					sampleRate: 16000, //{max: 48000, min: 48000}
					sampleSize: 16, //{max: 16, min: 16}
				},
				video: false,
			})
			.catch((err) => {
				alert("Your browser does not support audio recording!");
				console.log("record.js", err);
			});

		if (stream) {
			const mediaRecorder = new MediaRecorder(stream);
			let audioChunks = [];

			mediaRecorder.addEventListener("dataavailable", (event) => {
				audioChunks.push(event.data);
			});

			const start = () => {
				audioChunks = [];
				try {
					mediaRecorder.start();
				} catch (error) {
					console.log("start failed rec.js", error);
					mediaRecorder.stop();
				}
			};

			const stop = () =>
				new Promise((resolve) => {
					mediaRecorder.addEventListener("stop", () => {
						const audioBlob = new Blob(audioChunks, {
							type: "audio/wav",
						});
						const audioUrl = URL.createObjectURL(audioBlob);
						const audio = new Audio(audioUrl);
						const play = async () => {
							audio.play();
						};
						const pause = () => {
							audio.pause();
						};
						resolve({
							audioChunks,
							audioBlob,
							audioUrl,
							play,
							pause,
						});
					});

					try {
						mediaRecorder.stop();
					} catch (error) {
						console.log("stop failed rec.js", error);
					}
				});
			resolve({ start, stop });
		} else {
			reject(new Error("Audio recording not supported by browser!"));
		}
	}).catch((e) => {
		console.log("your device maybe deaf :/");
	});

export default recordAudio;
