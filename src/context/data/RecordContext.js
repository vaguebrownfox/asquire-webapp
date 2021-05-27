// record context
import createDataContext from "../createDataContext";
import { firebaseStims } from "../../functions/firestore";
import { batch } from "react-redux";

// functions
import {
	getAudioInputDevices,
	getAudioOutputDevices,
	getAudioInputStream,
	audioRecord,
	createAudioBuffer,
	audioBufferToWaveBlob,
} from "../../functions/recorder";
import { firebaseUserAudio } from "../../functions/storage";
import { startVibrate } from "../../functions/vibrate";

// Initial State
const recordInitialState = {
	loading: false,
	audioDevices: { inputDevices: [], outputDevices: [] },
	inputDevice: {},
	outputDevice: {},
	inputStream: null,

	isRecording: false,
	isPlaying: false,
	recDone: false,
	playUrl: "",

	stims: {},
	currentStim: {},
	totalStimCount: 0,
	stimAnim: true,

	seconds: 0,
};

// Reducer
const recordReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "REC_RESET":
			return { ...recordInitialState };
		case "LOAD_STIMS":
			let nostims0 = Object.keys(action.payload.stims).length;
			let csno0 = action.payload.stimCount;

			return {
				...state,
				stims: action.payload.stims,
				totalStimCount: nostims0,
				currentStim: action.payload.stims[csno0 % nostims0],
			};
		case "NEXT_STIM":
			let csno1 = state.currentStim.sno;

			return {
				...state,
				currentStim: state.stims[(csno1 + 1) % state.totalStimCount],
				// stimCount: state.stimCount + 1,
			};
		case "STIM_ANIM":
			return {
				...state,
				stimAnim: action.payload,
			};
		case "GET_DEVICES":
			return {
				...state,
				audioDevices: action.payload,
				inputDevice: action.payload.inputDevices[0],
				outputDevice: action.payload.outputDevices[0],
				inputStream: action.payload.audioInputStream,
				analyserNode: action.payload.analyserNode,
			};
		case "SET_INPUT_DEVICE":
			return {
				...state,
				inputDevice: action.payload,
			};
		case "SET_OUTPUT_DEVICE":
			return {
				...state,
				outputDevice: action.payload,
			};
		case "SET_INPUT_STREAM":
			return {
				...state,
				inputStream: action.payload,
			};
		case "SET_REC_STATE":
			return { ...state, isRecording: action.payload };
		case "SET_PLY_STATE":
			return { ...state, isPlaying: action.payload };
		case "SET_REC_DONE":
			return { ...state, recDone: action.payload };
		case "SET_PLY_URL":
			return { ...state, playUrl: action.payload };
		case "SECONDS":
			let secs = state.seconds;
			switch (action.payload) {
				case "up":
					secs += 1;
					break;
				case "down":
					secs -= 1;
					break;
				case "reset":
					secs = 0;
					break;
				default:
					break;
			}
			return { ...state, seconds: secs };
		default:
			return state;
	}
};

// Actions
const recordLoadAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("record action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordLoadStimsAction = (dispatch) => {
	return async (user) => {
		dispatch({ type: "SET_LOADING", payload: true });

		const stims = await firebaseStims().catch(() => {
			console.log("Failed to load stimuli, refresh page!");
			dispatch({ type: "SET_LOADING", payload: false });
		});

		dispatch({
			type: "LOAD_STIMS",
			payload: { stims, stimCount: user.stimCount },
		});

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordNextStimAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		dispatch({ type: "STIM_ANIM", payload: false });

		setTimeout(() => {
			dispatch({ type: "NEXT_STIM", payload: null });
			dispatch({ type: "SECONDS", payload: "reset" });
			dispatch({ type: "STIM_ANIM", payload: true });
		}, 500);

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordGetDevicesAction = (dispatch) => {
	return async () => {
		dispatch({ type: "SET_LOADING", payload: true });

		const {
			audioDevices: inputDevices,
			audioInputStream,
			analyserNode,
		} = await getAudioInputDevices();
		const outputDevices = await getAudioOutputDevices();

		dispatch({
			type: "GET_DEVICES",
			payload: {
				inputDevices,
				outputDevices,
				audioInputStream,
				analyserNode,
			},
		});

		console.log("record context ::get devices");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordSetInputAction = (dispatch) => {
	return async (device) => {
		dispatch({ type: "SET_LOADING", payload: true });

		const stream = await getAudioInputStream(device);
		dispatch({ type: "SET_INPUT_DEVICE", payload: device });
		dispatch({ type: "SET_INPUT_STREAM", payload: stream });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordSetOutputAction = (dispatch) => {
	return (device) => {
		dispatch({ type: "SET_LOADING", payload: true });

		dispatch({ type: "SET_OUTPUT_DEVICE", payload: device });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

let recorder = null;
let interval = null;

const recordStartAction = (dispatch) => {
	return async (inputStream) => {
		dispatch({ type: "SET_LOADING", payload: true });

		if (!recorder) {
			recorder = await audioRecord(inputStream).catch((e) => {
				console.log("audioRecord error", e);
				return null;
			});
		}
		if (!recorder) {
			return null;
		}
		const isRecStart = await recorder
			.startRecord()
			.then((e) => {
				startVibrate(200);
				return e;
			})
			.catch((e) => {
				console.log("audioRecord start error", e);
				return null;
			});
		console.log("record action log:: start record", isRecStart);

		if (isRecStart) {
			console.log("record action log:: start record");
			batch(() => {
				dispatch({ type: "SET_REC_DONE", payload: false });
				dispatch({ type: "SET_REC_STATE", payload: true });
				dispatch({ type: "SET_PLY_STATE", payload: false });
				dispatch({ type: "SECONDS", payload: "reset" });
			});

			interval = setInterval(() => {
				dispatch({ type: "SECONDS", payload: "up" });
			}, 1000);
		} else {
			dispatch({ type: "SET_REC_STATE", payload: false });
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

let audio = null;

const recordStopAction = (dispatch) => {
	return async () => {
		dispatch({ type: "SET_LOADING", payload: true });

		if (!recorder) {
			console.log("record action log:: recorder not defined");
			return null;
		}

		audio = await recorder
			.stopRecord()
			.then((e) => {
				startVibrate(100);
				return e;
			})
			.catch(() => null);

		if (audio) {
			batch(() => {
				dispatch({ type: "SET_REC_STATE", payload: false });
				dispatch({ type: "SET_REC_DONE", payload: true });
				dispatch({ type: "SET_PLY_URL", payload: audio.audioUrl });
			});

			clearInterval(interval);
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordResetAction = (dispatch) => {
	return async () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("record reset log");
		if (recorder) {
			audio = await recorder.stopRecord().catch(() => null);
			dispatch({ type: "REC_RESET", payload: null });
			clearInterval(interval);
			recorder = null;
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordUploadAction = (dispatch) => {
	return async (user) => {
		dispatch({ type: "SET_LOADING", payload: true });

		if (audio) {
			// Convert to wav format
			const audioBuffer = await createAudioBuffer(audio.audioUrl);
			audio.wavBlob = await audioBufferToWaveBlob(audioBuffer);

			firebaseUserAudio(user, audio);
			dispatch({ type: "SET_REC_DONE", payload: false });
		} else {
			console.error("record action log:: audio not defined");
			throw new Error("Upload error");
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	recordReducer,
	{
		recordLoadAction,
		recordLoadStimsAction,
		recordNextStimAction,

		recordGetDevicesAction,
		recordSetInputAction,
		recordSetOutputAction,

		recordStartAction,
		recordStopAction,

		recordUploadAction,

		recordResetAction,
	},
	recordInitialState
);
