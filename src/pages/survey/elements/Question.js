// Modules
import React from "react";

// Styles
import "./Question.css";

// Components

const Question = ({ qno, question, options }) => {
	const addOption = (option) => {
		return (
			<li key={qno + option}>
				<input
					type="radio"
					id={qno + option}
					name="selector"
					value={option}
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
			{/* <div className="question-answer">
				<p>text input</p>
			</div> */}
		</div>
	);
};

export default Question;
