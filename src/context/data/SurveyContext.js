import createDataContext from "../createDataContext";
import { questions } from "../../fetchdata/questions";
// Initial State
const surveyState = {
	questions: {},
	currentQuestion: 0,
};

// Reducer
const questionReducer = (state, action) => {
	switch (action.type) {
		case "SET_QUESTIONS":
			return { ...state, questions: action.payload, currentQuestion: 0 };
		case "NEXT_STIM":
			return {
				...state,
				currentQuestion:
					(state.currentQuestion + 1) %
					Object.keys(state.questions).length,
			};
		default:
			return state;
	}
};

// Actions
const setQuestions = (dispatch) => {
	return () => {
		let ques = questions;
		dispatch({ type: "SET_QUESTIONS", payload: ques });
	};
};

const nextQuestion = (dispatch) => {
	return () => {
		dispatch({ type: "NEXT_STIM", payload: null });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	questionReducer,
	{ setQuestions, nextQuestion },
	surveyState
);
