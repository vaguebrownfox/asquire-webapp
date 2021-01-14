// Modules
import React from "react";

// Styles
import "./Question.css";
import "./InputText.scss";

// Components

const Question = ({ qno, question, options }) => {
	const inputHelper = (event, qno) => {
		console.log("radio button", qno, event.target.value);
	};

	const addOption = (option) => {
		return (
			<li key={qno + option}>
				<input
					type="radio"
					id={qno + option}
					name="selector"
					value={option}
					onChange={(event) => inputHelper(event, qno)}
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
							autoComplete="false"
							id={qno}
							onChange={(event) => inputHelper(event, qno)}
							required
						/>
						<label htmlFor={qno} className="form__label">
							Answer
						</label>
					</div>
				</div>
			)}
		</div>
	);
};

export default Question;
