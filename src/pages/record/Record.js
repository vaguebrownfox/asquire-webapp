// Modules
import React from "react";

// Styles
import "./elements/Record.css";

// Components
import Stimulus from "./elements/Stimulus";
import Button from "../../components/Button";

// Context
import { Provider as RecordProvider } from "../../context/data/RecordContext";

const Record = ({ history }) => {
	const doneButton = () => {
		history.push("/done");
	};

	return (
		<RecordProvider>
			<div className="record-page">
				<div className="record-bgoverlay">
					<h1>Record</h1>
					<div className="record-activity">
						<Stimulus />
					</div>
					<div className="record-donebtn">
						<Button buttonStyle="btn--primary" onClick={doneButton}>
							<p id="survey-proceedbtntxt">Done</p>
						</Button>
					</div>
				</div>
			</div>
		</RecordProvider>
	);
};

export default Record;
