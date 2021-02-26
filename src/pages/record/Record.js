// Modules
import React, { useContext } from "react";

// Styles
import "./elements/Record.css";

// Components
import Stimulus from "./elements/Stimulus";
import Button from "../../components/Button";
import TextBox from "../../components/TextBox";

// Context
import { Provider as RecordProvider } from "../../context/data/RecordContext";
import { Context as UserContext } from "../../context/data/UserContext";
import { Provider as StimulusProvider } from "../../context/data/StimulusContext";

const RecordComponent = ({ history }) => {
	const { state } = useContext(UserContext);
	const doneButton = () => {
		history.push("/done");
	};

	return (
		<div className="record-page">
			<div className="record-bgoverlay">
				<h1>{`Recording for ${state.selectedUser.userName}`}</h1>
				<div className="record-activity">
					<Stimulus />
				</div>
				<Instructions />
				<div className="record-donebtn">
					<Button buttonStyle="btn--primary" onClick={doneButton}>
						<p id="survey-proceedbtntxt">Done</p>
					</Button>
				</div>
			</div>
		</div>
	);
};

const Instructions = () => {
	return (
		<TextBox>
			<div className="instruction-list">
				<ul>
					<li>
						<p className="tv-text">
							Please sit straight on a firm surface like chair or
							floor etc.
						</p>
					</li>
					<li>
						<p className="tv-text">
							Please take a deep breath through your mouth and
							while exhaling(through the mouth), please speak the
							task/word on your screen, like aaa, ooo, sss till
							you exhale completely.
						</p>
					</li>
					<li>
						<p className="tv-text">
							Please place the microphone of your at a distance
							equal to the width of your 4 fingers excluding
							thumb, approximately 5 cm.
						</p>
					</li>
				</ul>
			</div>
		</TextBox>
	);
};

const Record = ({ history }) => (
	<RecordProvider>
		<StimulusProvider>
			<RecordComponent {...{ history }} />
		</StimulusProvider>
	</RecordProvider>
);

export default Record;
