// app context
import createDataContext from "../createDataContext";

// Initial State
const appInitialState = {
	loading: false,
	selectedUser: null,
};

// Reducer
const appReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "SELECT_USER":
			return { ...state, selectedUser: action.payload };
		default:
			return state;
	}
};

// Actions

const appLoadAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("app action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	appReducer,
	{
		appLoadAction,
	},
	appInitialState
);
