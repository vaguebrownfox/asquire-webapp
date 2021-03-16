import createDataContext from "../createDataContext";

// Initial State
const surveyInitialState = {
	loading: false,
};

// Reducer
const surveyReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "LOAD_QUESTIONS":
			return { ...state, questions: action.payload };
		default:
			return state;
	}
};

// Actions

const surveyAction = (dispatch) => {
	return () => {
		dispatch({ type: "LOADING", payload: true });

		console.log("survey action log");

		dispatch({ type: "LOADING", payload: true });
	};
};

const surveyLoadQuestions = (dispatch) => {
	return () => {
		dispatch({ type: "LOADING", payload: true });

		fetch("..");

		dispatch({ type: "LOADING", payload: true });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	surveyReducer,
	{
		surveyAction,
	},
	surveyInitialState
);
