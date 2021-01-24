// Modules
import React, { useContext, useEffect } from "react";

// Styles
import "./Survey.css";

// Components
import Question from "./Question";

// Context
import { Context as SurveyContext } from "../../../context/data/SurveyContext";

const Questions = () => {
	const { state, setQuestions } = useContext(SurveyContext);

	useEffect(setQuestions, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="survey-questions">
			{state.renderQuestions &&
				Object.values(state.renderQuestions)
					.reverse()
					.map((q) => {
						return (
							<Question
								key={q.qno}
								qno={q.qno}
								question={q.question}
								options={q.options}
								nQnos={q.nextQnos}
							/>
						);
					})}
		</div>
	);
};

export default Questions;
