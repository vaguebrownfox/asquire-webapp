// Modules
import React from "react";

// Styles

// Components
import Body from "../components/Body";
import QuestionFrag from "../components/QuestionFrag";

const Survey = () => {
	return (
		<div>
			<Body className="survey">
				<div id="body-bgoverlay">
					<h1>Survey</h1>
					<QuestionFrag />
					<QuestionFrag />
					<QuestionFrag />
					<QuestionFrag />
					<QuestionFrag />
					<QuestionFrag />
				</div>
			</Body>
		</div>
	);
};

export default Survey;
