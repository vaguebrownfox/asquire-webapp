// record context
import createDataContext from "../createDataContext";

// functions
import {
	getAudioInputDevices,
	getAudioOutputDevices,
	getAudioInputStream,
} from "../../functions/recorder";

// Initial State
const recordInitialState = {
	loading: false,
	audioDevices: { inputDevices: [], outputDevices: [] },
	inputDevice: {},
	outputDevice: {},
	inputStream: null,
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
		const inputDevices = await getAudioInputDevices();
		const outputDevices = await getAudioOutputDevices();

		dispatch({
			type: "GET_DEVICES",
			payload: { inputDevices, outputDevices },
		});

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordSetInputAction = (dispatch) => {
	return async (device) => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("record action log");
		const stream = await getAudioInputStream(device);
		dispatch({ type: "SET_INPUT_DEVICE", payload: device });
		dispatch({ type: "SET_INPUT_STREAM", payload: stream });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const recordSetOutputAction = (dispatch) => {
	return (device) => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("record action log");
		dispatch({ type: "SET_OUTPUT_DEVICE", payload: device });

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
	},
	recordInitialState
);
