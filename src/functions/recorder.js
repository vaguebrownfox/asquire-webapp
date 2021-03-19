const SAMPLE_RATE = 16000; // Hz
const SAMPLE_SIZE = 16; // bits

export const initializeMedia = () => {
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
	return audioDevices;
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
