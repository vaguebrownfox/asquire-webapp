import createDataContext from "../createDataContext";

// Initial State
const sampleInitialState = {
	loading: false,
};

// Reducer
const sampleReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

// Actions

const sampleAction = (dispatch) => {
	return () => {
		dispatch({ type: "LOADING", payload: true });

		console.log("sample action log");

		dispatch({ type: "LOADING", payload: true });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	sampleReducer,
	{
		sampleAction,
	},
	sampleInitialState
);
