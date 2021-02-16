// Modules
import React, { useContext, useEffect } from "react";

// Styles
import "./Stimulus.css";

// Components
import Control from "./Control";

// Context
import { Context as StimContext } from "../../../context/data/StimulusContext";
import { Context as UserContext } from "../../../context/data/UserContext";

const Stimulus = () => {
	const { state, setStims } = useContext(StimContext);
	const { state: userState } = useContext(UserContext);

	useEffect(() => setStims(userState.selectedUser.stimIndex + 1 || 0), []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="stimulus-container">
			<div className="stimulus-text">
				<p className="stimulus-text-p">
					{state.stimulus[state.currentStim]}
				</p>
			</div>
			<div className="stimulus-img"></div>
			<div className="stimulus-con">
				<Control />
			</div>
		</div>
	);
};

export default Stimulus;
