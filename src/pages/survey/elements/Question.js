// Modules
import React, { useContext, useState } from "react";

// Styles
import "./Question.css";
import "./InputText.scss";

// Components
import Button from "../../../components/Button";

// Context
import { Context as SurveyContext } from "../../../context/data/SurveyContext";

const Question = ({ qno, question, options, nQnos }) => {
	const { nextQuestion } = useContext(SurveyContext);
	const [inputText, setInputText] = useState("");

	const inputHelper = (event) => {
		let answer = event.target.value;
		nextQuestion(qno, answer, options, nQnos);
	};

	const inputTextHelper = (event) => {
		setInputText(event.target.value);
	};

	const inputTextOk = () => {
		let answer = inputText;
		nextQuestion(qno, answer, options, nQnos);
	};

	const addOption = (option) => {
		return (
			<li key={qno + option}>
				<input
					type="radio"
					id={qno + option}
					name="selector"
					value={option}
					onClick={(event) => inputHelper(event)}
				/>
				<label htmlFor={qno + option}>{option}</label>

				<div className="check"></div>
			</li>
		);
	};

	return (
		<div className="question-container">
			<div className="question-text">
				<i className="fa fa-circle" />
				<p>{question}</p>
			</div>
			{options.length > 0 && (
				<div className="question-options">
					<div className="question-radio">
						<div className="container">
							<form>
								<ul>
									{options &&
										options.map((option) => {
											return addOption(option);
										})}
								</ul>
							</form>
						</div>
					</div>
				</div>
			)}
			{options.length < 1 && (
				<div className="question-answer">
					<div className="form__group field">
						<input
							type="input"
							className="form__field"
							placeholder="text"
							name="name"
							autoComplete="off"
							id={qno}
							onChange={(event) => inputTextHelper(event)}
							required
						/>
						<label htmlFor={qno} className="form__label">
							Answer
						</label>
					</div>
					<div className="question-answer-ok">
						<Button
							buttonStyle="btn--outline"
							onClick={() => inputTextOk()}
						>
							<p id="question-answer-ok-text">OK</p>
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Question;
