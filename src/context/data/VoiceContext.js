// voice context
import createDataContext from "../createDataContext";

// functions
import { audioRecord } from "../../functions/recorder";

// Initial State
const voiceInitialState = {
	loading: false,
	isRecording: false,
	recordDone: false,
};

// Reducer
const voiceReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

// Actions
const voiceLoadAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("voice action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

let recorder = null;
let interval = null;

const voiceRecordStartAction = (dispatch) => {
	return async (inputStream) => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("voice action log");
		if (!recorder) {
			recorder = await audioRecord(inputStream).catch((e) => {
				console.log("audioRecord error", e);
				return null;
			});
		}
		if (!recorder) {
			return null;
		}
		const isRecStart = await recorder.startRecord().catch((e) => {
			console.log("audioRecord start error", e);
			return null;
		});

		if (isRecStart) {
			console.log("record action log:: start record");
			dispatch({ type: "SET_REC_DONE", payload: false });
			dispatch({ type: "SET_REC_STATE", payload: true });
			dispatch({ type: "SET_PLY_STATE", payload: false });
			dispatch({ type: "SECONDS", payload: "reset" });
			interval = setInterval(() => {
				dispatch({ type: "SECONDS", payload: "up" });
			}, 1000);
		} else {
			dispatch({ type: "SET_REC_STATE", payload: false });
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const voiceRecordStopAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("voice action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	voiceReducer,
	{
		voiceLoadAction,
		voiceRecordStartAction,
		voiceRecordStopAction,
	},
	voiceInitialState
);
