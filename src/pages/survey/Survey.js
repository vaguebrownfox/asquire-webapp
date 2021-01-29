// Modules
import React, { useContext } from "react";

// Styles
import "./elements/Survey.css";

// Components
import Questions from "./elements/Questions";
import Button from "../../components/Button";
import BioData from "./elements/BioData";

// Context
import { Context as UserContext } from "../../context/data/UserContext";
import { Context as SurveyContext } from "../../context/data/SurveyContext";

const Survey = ({ history }) => {
	const { state: userState, updateUser } = useContext(UserContext);
	const { state: surveyState } = useContext(SurveyContext);

	const proceedButton = () => {
		const { selectedUser } = userState;
		const { answered, renderQuestions } = surveyState;
		const answers = renderQuestions.map((q) => {
			return { [q.qno]: answered[q.qno] };
		});

		const userUp = {
			...selectedUser,
			surveyDone: true,
			answers,
		};
		console.log("survey proceed", userUp, answers);
		updateUser(userUp);

		history.push("/record");
	};

	return (
		<div className="survey-page">
			<div className="survey-bgoverlay">
				{userState.selectedUser.biodataDone && <h1>Survey</h1>}
				{surveyState.isSurveyDone && (
					<div className="survey-nextbtn">
						<Button
							buttonStyle="btn--primary"
							onClick={proceedButton}
						>
							<p id="survey-proceedbtntxt">Proceed</p>
						</Button>
					</div>
				)}
				{userState.selectedUser.biodataDone && <Questions />}
				{!userState.selectedUser.biodataDone && <BioData />}
			</div>
		</div>
	);
};

export default Survey;
