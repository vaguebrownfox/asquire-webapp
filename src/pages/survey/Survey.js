// Modules
import React, { useContext } from "react";

// Styles
import "./elements/Survey.css";

// Components
import Question from "./elements/Question";
import Button from "../../components/Button";

// Context
import { Context as UserContext } from "../../context/data/UserContext";

const Survey = ({ history }) => {
	const { state, updateUser } = useContext(UserContext);

	const questions = [
		{
			qno: 1,
			question: "What are you?",
			options: ["Moose", "Mouse", "Musk"],
		},
		{
			qno: 2,
			question: "Who are you?",
			options: ["Elon", "Musket"],
		},
		{
			qno: 3,
			question: "How are you?",
			options: ["Elongated", "Dogger"],
		},
		{
			qno: 4,
			question: "Are you dead?",
			options: ["Yes", "Yess", "No"],
		},
		{
			qno: 5,
			question: "What is Lorem Ipsum?",
			options: ["Lorem", "Impsum", "Die", "Game"],
		},
	];

	const proceedButton = () => {
		const { selectedUser } = state;
		const userUp = {
			...selectedUser,
			surveyDone: true,
		};
		console.log("survey proceed", userUp);
		updateUser(userUp);

		history.push("/record");
	};

	return (
		<div className="survey-page">
			<div className="survey-bgoverlay">
				<h1>Survey</h1>
				<div className="survey-nextbtn">
					<Button buttonStyle="btn--primary" onClick={proceedButton}>
						<p id="survey-proceedbtntxt">Proceed</p>
					</Button>
				</div>
				<div className="survey-questions">
					{questions &&
						questions.map((q) => {
							return (
								<Question
									key={q.qno}
									qno={q.qno}
									question={q.question}
									options={q.options}
								/>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default Survey;
