import createDataContext from "../createDataContext";
import { questions } from "../../fetchdata/questions";

// Initial State
const surveyState = {
	allQuestions: {},
	currentQuestion: 0,
	renderQuestions: [],
	answered: {},
	isSurveyDone: false,
};

// Reducer
const questionReducer = (state, action) => {
	switch (action.type) {
		case "SET_QUESTIONS":
			return {
				...state,
				allQuestions: action.payload,
				currentQuestion: 1,
				renderQuestions: [action.payload[1]],
				answered: {},
				isSurveyDone: false,
			};
		case "NEXT_QUESTION":
			console.log("action next", action.payload);
			const { currQno, currAnswer, nQ } = action.payload;
			if (nQ !== -1) {
				let newRenQs = state.renderQuestions.filter(
					(q) => q.qno <= currQno
				);
				return {
					...state,
					currentQuestion: action.payload,
					renderQuestions: [...newRenQs, state.allQuestions[nQ]],
					answered: { ...state.answered, [currQno]: currAnswer },
					isSurveyDone: false,
				};
			} else {
				return {
					...state,
					answered: { ...state.answered, [currQno]: currAnswer },
					isSurveyDone: true,
				};
			}
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
	return (currQno, currAnswer, options, nQnos) => {
		console.log("survey context", currQno, currAnswer);
		let nQ;
		if (nQnos.length === 1 || currAnswer === options[0]) {
			nQ = nQnos[0];
		} else {
			nQ = nQnos[1];
		}

		setTimeout(() => {
			dispatch({
				type: "NEXT_QUESTION",
				payload: { currQno, currAnswer, nQ },
			});
		}, 500);
	};
};

// Export
export const { Context, Provider } = createDataContext(
	questionReducer,
	{ setQuestions, nextQuestion },
	surveyState
);
