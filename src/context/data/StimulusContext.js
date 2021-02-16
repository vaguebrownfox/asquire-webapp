import createDataContext from "../createDataContext";
import { stimulus } from "../../fetchdata/stimulus";
// Initial State
const stimStates = {
	stimulus: {},
	currentStim: 0,
};

// Reducer
const stimReducer = (state, action) => {
	switch (action.type) {
		case "SET_STIMS":
			return {
				...state,
				stimulus: action.payload.stims,
				currentStim:
					action.payload.index %
					Object.keys(action.payload.stims).length,
			};
		case "NEXT_STIM":
			return {
				...state,
				currentStim:
					(state.currentStim + 1) %
					Object.keys(state.stimulus).length,
			};
		default:
			return state;
	}
};

// Actions
const setStims = (dispatch) => {
	return (index) => {
		let stims = stimulus;
		dispatch({ type: "SET_STIMS", payload: { stims, index } });
	};
};

const nextStim = (dispatch) => {
	return () => {
		dispatch({ type: "NEXT_STIM", payload: null });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	stimReducer,
	{ setStims, nextStim },
	stimStates
);
