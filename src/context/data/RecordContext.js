import createDataContext from "../createDataContext";

import recordAudio from "../../functions/record";

// Initial State
const recordStates = {
	userName: "venw",
	userId: "venw-3243ADFE",
	isRecording: false,
	isPlaying: false,
	stimIndex: 0,
	seconds: 0,
};

// Reducer
const recordReducer = (state, action) => {
	switch (action.type) {
		case "REC_STATE":
			console.log("rec state:", state);
			return {
				...state,
				isRecording: action.payload,
			};
		case "TIMER":
			return {
				...state,
				seconds: action.payload ? state.seconds + 1 : 0,
			};
		case "PLY_STATE":
			return { ...state, isPlaying: action.payload };

		default:
			return state;
	}
};

let recorder = null;
let interval = null;
let audio = null;
// Actions
const recOn = (dispatch) => {
	return async (isOn) => {
		console.log("recorder\n", recorder, "\naudio\n", audio);

		if (!recorder) {
			recorder = await recordAudio();
		}

		if (!recorder) return;

		if (isOn) {
			// code to start recording
			recorder.start();
			dispatch({ type: "TIMER", payload: false });
			interval = setInterval(() => {
				console.log("recording...");
				dispatch({ type: "TIMER", payload: true });
			}, 1000);
		} else {
			// code to stop n save recording
			audio = await recorder.stop();
			clearInterval(interval);
		}

		dispatch({ type: "REC_STATE", payload: isOn });
	};
};

const plyOn = (dispatch) => {
	return async (isOn) => {
		if (audio) {
			if (isOn) {
				audio.play();
			} else {
				audio.pause();
			}
		}
		dispatch({ type: "PLY_STATE", payload: isOn });
	};
};

const next = (dispatch) => {
	return () => {
		dispatch({ type: "TIMER", payload: false });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	recordReducer,
	{ recOn, plyOn, next },
	recordStates
);
