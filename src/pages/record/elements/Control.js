// Modules
import React, { useContext } from "react";

// Styles
import "./Control.css";

// Context
import { Context as RecordContext } from "../../../context/data/RecordContext";

const Control = () => {
	const { state, recOn, plyOn } = useContext(RecordContext);

	const recHelper = () => {
		if (!state.isRecording && !state.isPlaying) {
			recOn(true);
		} else {
			recOn(false);
		}
	};

	const plyHelper = () => {
		if (!state.isPlaying && !state.isRecording) {
			plyOn(true);
			console.log("seconds", state.seconds);
			setTimeout(() => {
				plyOn(false);
			}, state.seconds * 1000);
		}
	};
	return (
		<div className="control-container">
			<div className="control-btn control-play">
				<i
					className={state.isPlaying ? "fas fa-pause" : "fas fa-play"}
					onClick={plyHelper}
				></i>
				{/* <i className="fas fa-pause"></i> */}
			</div>
			<div className="control-btn control-record">
				<i
					className={
						state.isRecording
							? "fas fa-microphone-alt-slash"
							: "fas fa-microphone-alt"
					}
					onClick={recHelper}
				></i>
				{/* <i className="fas fa-microphone-alt-slash"></i> */}
			</div>
			<div className="control-btn control-next">
				<i className="fas fa-chevron-circle-right"></i>
			</div>
		</div>
	);
};

export default Control;
