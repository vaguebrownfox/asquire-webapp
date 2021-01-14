// Modules
import React, { useContext } from "react";

// Styles
import "./elements/Survey.css";

// Components
import Questions from "./elements/Questions";
import Button from "../../components/Button";

// Context
import { Provider as SurveyProvider } from "../../context/data/SurveyContext";
import { Context as UserContext } from "../../context/data/UserContext";

const Survey = ({ history }) => {
	const { state, updateUser } = useContext(UserContext);

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
		<SurveyProvider>
			<div className="survey-page">
				<div className="survey-bgoverlay">
					<h1>Survey</h1>
					<div className="survey-nextbtn">
						<Button
							buttonStyle="btn--primary"
							onClick={proceedButton}
						>
							<p id="survey-proceedbtntxt">Proceed</p>
						</Button>
					</div>
					<Questions />
				</div>
			</div>
		</SurveyProvider>
	);
};

export default Survey;
