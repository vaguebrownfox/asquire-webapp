const SAMPLE_RATE = 16000; // Hz
const SAMPLE_SIZE = 16; // bits

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

export const getAudioInputDevices = async () => {
	initializeMedia();
	const audioDevices = await navigator.mediaDevices
		.enumerateDevices()
		.then((devices) => {
			console.log("recorder", devices);
			devices = devices.filter((d) => d.kind === "audioinput");
			return devices;
		})
		.catch((err) => {
			console.error("asq::recorder:: get input devices error", err);
			return null;
		});
	const audioInputStream = await getAudioInputStream(audioDevices[0]);
	return { audioDevices, audioInputStream };
};

export const getAudioOutputDevices = async () => {
	const audioDevices = await navigator.mediaDevices
		.enumerateDevices()
		.then((devices) => {
			devices = devices.filter((d) => d.kind === "audiooutput");
			return devices;
		})
		.catch((err) => {
			console.error("asq::recorder:: get input devices error", err);
			return null;
		});
	return audioDevices;
};

export const getAudioInputStream = async (device) => {
	const audioStream = await navigator.mediaDevices
		.getUserMedia({
			audio: {
				autoGainControl: false, //(2) [true, false]
				channelCount: 1, // {max: 2, min: 1}
				deviceId: device.deviceId || "default",
				// groupId: null,
				echoCancellation: false, //(2) [true, false]
				latency: 0.01, //{max: 0.01, min: 0.01}
				noiseSuppression: false, //(2) [true, false]
				sampleRate: SAMPLE_RATE, //{max: 48000, min: 48000}
				sampleSize: SAMPLE_SIZE, //{max: 16, min: 16}
			},
			video: false,
		})
		.then((stream) => {
			return stream;
		})
		.catch((err) => {
			console.error("asq::recorder:: get input devices error", err);
			return null;
		});
	return audioStream;
};

export const audioRecord = (audioStream) => {
	return new Promise((resolveRecord, rejectRecord) => {
		if (!audioStream) {
			rejectRecord("Stream not defined!");
		}

		const options = { mimeType: "audio/webm" };
		const mediaRecorder = new MediaRecorder(audioStream, options);

		let recordedChunks = [];

		mediaRecorder.addEventListener("dataavailable", function (e) {
			if (e.data.size > 0) {
				recordedChunks.push(e.data);
			}
		});

		const startRecord = () => {
			recordedChunks = [];
			return new Promise((resolveStart, rejectStart) => {
				try {
					mediaRecorder.start();
					resolveStart(true);
				} catch (err) {
					console.log("recorder start fail", err);
					try {
						mediaRecorder.stop();
					} catch (error) {
						console.log("stop failed rec.js", error);
						rejectStart(false);
					}
				}
			});
		};

		const stopRecord = () => {
			return new Promise((resolveStop, rejectStop) => {
				try {
					mediaRecorder.stop();
				} catch (error) {
					console.log("stop failed rec.js", error);
					rejectStop(false);
				}

				mediaRecorder.addEventListener("stop", () => {
					const audioBlob = new Blob(recordedChunks, {
						type: "audio/webm",
					});

					const audioUrl = URL.createObjectURL(audioBlob);
					const audio = new Audio(audioUrl);

					const playAudio = () => {
						return new Promise((resolvePlay, rejectPlay) => {
							audio.play().catch((err) => {
								console.log("recorder:: audio play fail", err);
								rejectPlay(false);
							});

							audio.addEventListener("ended", (e) => {
								resolvePlay(true);
							});
						});
					};

					const pauseAudio = () => {
						audio.pause().catch((err) => {
							console.log("recorder:: audio play fail", err);
						});
					};

					resolveStop({
						audioUrl,
						audioBlob,
						playAudio,
						pauseAudio,
					});
				});
			});
		};

		resolveRecord({ startRecord, stopRecord });
	});
};

// // For raw audio samples
//
// const context = new AudioContext();
// console.info(audioStream);

// const source = context.createMediaStreamSource(audioStream);
// const processor = context.createScriptProcessor(1024, 1, 1);

// source.connect(processor);
// processor.connect(context.destination);

// let audioChunks = [];
// processor.onaudioprocess = (e) => {
// 	console.info(e.inputBuffer.getChannelData(0).buffer);
// 	// Raw audio samples
// };

// export const startAudioRecord = (audioStream) => {
// 	let shouldStop = false;
// 	let stopped = false;
// 	const downloadLink = document.getElementById("download");
// 	const stopButton = document.getElementById("stop");

// 	const options = { mimeType: "audio/webm" };
// 	const recordedChunks = [];
// 	const mediaRecorder = new MediaRecorder(audioStream, options);

// 	mediaRecorder.addEventListener("dataavailable", function (e) {
// 		if (e.data.size > 0) {
// 			recordedChunks.push(e.data);
// 		}

// 		if (shouldStop === true && stopped === false) {
// 			mediaRecorder.stop();
// 			stopped = true;
// 		}
// 	});

// 	mediaRecorder.addEventListener("stop", function () {
// 		downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
// 		downloadLink.download = "acetest.wav";+
// 	});

// 	mediaRecorder.start();
// };
