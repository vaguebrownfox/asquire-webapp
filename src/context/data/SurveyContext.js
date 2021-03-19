import createDataContext from "../createDataContext";
import { getQuestions } from "../../fetch/questions";

// Initial State
const surveyInitialState = {
	loading: false,
	allQuestions: null, // [{}]
	currentQuestion: null, // {}
	previousQuestions: null, // [{}]
	nextQuestion: null, // {}
	answeredQuestions: null, // [{}]
	surveyDone: false,
};

// Reducer
const surveyReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "LOAD_QUESTIONS":
			return {
				...state,
				allQuestions: action.payload,
				currentQuestion: action.payload[1],
				previousQuestions: [],
			};
		case "NEXT_QUESTION":
			const { nextQuestionNo, answeredQuestion } = action.payload;
			if (nextQuestionNo !== -1) {
				return {
					...state,
					previousQuestions: [
						...state.previousQuestions,
						answeredQuestion,
					],
					currentQuestion: state.allQuestions[nextQuestionNo],
				};
			} else {
				return {
					...state,
					previousQuestions: [
						...state.previousQuestions,
						answeredQuestion,
					],
					surveyDone: true,
				};
			}
		case "PREVIOUS_QUESTION":
			const pQs = state.previousQuestions.slice();

			if (pQs.length > 0) {
				const pQ = pQs.pop();
				return {
					...state,
					currentQuestion: pQ,
					previousQuestions: pQs,
					surveyDone: false,
				};
			} else {
				return { ...state, surveyDone: false };
			}

		default:
			return state;
	}
};

// Actions

const surveyAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("survey action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const surveyLoadQuestionsAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		const questions = getQuestions();

		dispatch({ type: "LOAD_QUESTIONS", payload: questions });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const surveyNextQuestionAction = (dispatch) => {
	return (answeredQuestion) => {
		dispatch({ type: "SET_LOADING", payload: true });

		let nQ;
		if (
			answeredQuestion.nextQnos.length === 1 ||
			answeredQuestion.answer === answeredQuestion.options[0]
		) {
			nQ = answeredQuestion.nextQnos[0];
		} else {
			nQ = answeredQuestion.nextQnos[1];
		}

		const payload = {
			answeredQuestion,
			nextQuestionNo: nQ,
		};
		console.info("survey action log :: next question payload", payload);
		dispatch({ type: "NEXT_QUESTION", payload });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const surveyPreviousQuestionAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("survey action log :: prev question");
		dispatch({ type: "PREVIOUS_QUESTION", payload: null });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	surveyReducer,
	{
		surveyAction,
		surveyLoadQuestionsAction,
		surveyNextQuestionAction,
		surveyPreviousQuestionAction,
	},
	surveyInitialState
);
