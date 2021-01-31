// Modules
import React, { useContext, useState, useEffect } from "react";

// Styles
import "./Control.css";

// Functions
import { time } from "../../../functions/timer";

// Context
import { Context as RecordContext } from "../../../context/data/RecordContext";
import { Context as StimContext } from "../../../context/data/StimulusContext";
import { Context as UserContext } from "../../../context/data/UserContext";

const Control = () => {
	const { state, recOn, plyOn, next } = useContext(RecordContext);
	const { state: stimState, nextStim } = useContext(StimContext);
	const { state: userState } = useContext(UserContext);

	const [timerStyle, setTimerStyle] = useState("timer");
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		let id;
		if (state.isPlaying) {
			id = setInterval(() => {
				setSeconds((seconds) => seconds - 1);
				console.log("seconds stop", seconds);
			}, 1000);
		} else {
			clearInterval(id);
		}
		return () => {
			clearInterval(id);
			recOn(false);
		};
	}, [state.isPlaying, seconds]); // eslint-disable-line react-hooks/exhaustive-deps

	const recHelper = () => {
		if (!state.isRecording && !state.isPlaying) {
			recOn(true);
			setTimerStyle("timer-rec");
		} else if (!state.isPlaying) {
			recOn(false);
			setTimerStyle("timer");
			setSeconds(state.seconds);
		}
	};

	const plyHelper = () => {
		if (!state.isPlaying && !state.isRecording && seconds > 0) {
			plyOn(true);
			setTimerStyle("timer-ply");
			setTimeout(() => {
				plyOn(false);
				setTimerStyle("timer");
				setSeconds(state.seconds);
			}, (state.seconds + 1) * 1000);
		}
	};

	const nextStimHelper = () => {
		if (!state.isPlaying && !state.isRecording && seconds > 0) {
			const id = `${userState.selectedUser.userId}_${stimState.currentStim}`;
			nextStim();
			setSeconds(time(0));
			next(id);
		}
	};

	return (
		<div>
			<p id={timerStyle}>
				{time(state.isRecording ? state.seconds : seconds)}
			</p>
			<div className="control-container">
				<div className="control-btn control-play">
					<i
						className={
							state.isPlaying ? "fas fa-pause" : "fas fa-play"
						}
						onClick={plyHelper}
					></i>
					<p id="descp-btn">Play</p>
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
					<p id="descp-btn">Record</p>
					{/* <i className="fas fa-microphone-alt-slash"></i> */}
				</div>
				<div className="control-btn control-next">
					<i
						className="fas fa-chevron-circle-right"
						onClick={() => nextStimHelper()}
					></i>
					<p id="descp-btn">Next</p>
				</div>
			</div>
		</div>
	);
};

export default Control;
