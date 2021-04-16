// voice context
import createDataContext from "../createDataContext";

// Initial State
const voiceInitialState = {
	loading: false,
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

// Export
export const { Context, Provider } = createDataContext(
	voiceReducer,
	{
		voiceLoadAction,
	},
	voiceInitialState
);
