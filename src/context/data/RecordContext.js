// record context
import createDataContext from "../createDataContext";

// functions
import {
	getAudioInputDevices,
	getAudioOutputDevices,
	getAudioInputStream,
	audioRecord,
} from "../../functions/recorder";
import { firebaseUserAudio } from "../../functions/storage";

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
};

// Reducer
const recordReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "GET_DEVICES":
			return {
				...state,
				audioDevices: action.payload,
				inputDevice: action.payload.inputDevices[0],
				outputDevice: action.payload.outputDevices[0],
				inputStream: action.payload.audioInputStream,
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

const recordGetDevicesAction = (dispatch) => {
	return async () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("record action log:: get devices");
		const {
			audioDevices: inputDevices,
			audioInputStream,
		} = await getAudioInputDevices();
		const outputDevices = await getAudioOutputDevices();

		dispatch({
			type: "GET_DEVICES",
			payload: { inputDevices, outputDevices, audioInputStream },
		});

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordSetInputAction = (dispatch) => {
	return async (device) => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("record action log:: set input");
		const stream = await getAudioInputStream(device);
		dispatch({ type: "SET_INPUT_DEVICE", payload: device });
		dispatch({ type: "SET_INPUT_STREAM", payload: stream });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordSetOutputAction = (dispatch) => {
	return (device) => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("record action log :: set output");
		dispatch({ type: "SET_OUTPUT_DEVICE", payload: device });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

let recorder = null;

const recordStartAction = (dispatch) => {
	return async (inputStream) => {
		dispatch({ type: "SET_LOADING", payload: true });

		if (!recorder) {
			recorder = await audioRecord(inputStream).catch(() => null);
		}
		if (!recorder) {
			return null;
		}
		const isRecStart = await recorder.startRecord().catch(() => null);
		console.log("record action log:: start record", isRecStart);

		if (isRecStart) {
			dispatch({ type: "SET_REC_DONE", payload: false });
			dispatch({ type: "SET_REC_STATE", payload: true });
			dispatch({ type: "SET_PLY_STATE", payload: false });
		} else {
			dispatch({ type: "SET_REC_STATE", payload: false });
		}

		console.log("record action log:: start record");

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
		audio = await recorder.stopRecord().catch(() => null);
		console.log("record action log:: stop record", audio);

		if (audio) {
			dispatch({ type: "SET_REC_STATE", payload: false });
			dispatch({ type: "SET_REC_DONE", payload: true });
			dispatch({ type: "SET_PLY_URL", payload: audio.audioUrl });
		}

		console.log("record action log:: start record");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordUploadAction = (dispatch) => {
	return async (user) => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("record action log:: uploading record");

		if (audio) {
			firebaseUserAudio(user, audio);
		} else {
			console.log("record action log:: audio not defined");
		}

		console.log("record action log:: start record");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	recordReducer,
	{
		recordLoadAction,
		recordGetDevicesAction,
		recordSetInputAction,
		recordSetOutputAction,
		recordStartAction,
		recordStopAction,
		recordUploadAction,
	},
	recordInitialState
);
