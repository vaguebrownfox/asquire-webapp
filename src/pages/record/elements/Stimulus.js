// Modules
import React, { useContext, useEffect } from "react";

// Styles
import "./Stimulus.css";

// Components
import Control from "./Control";

// Context
import { Context as StimContext } from "../../../context/data/StimulusContext";

const Stimulus = ({ stimulus, img }) => {
	const { state, setStims } = useContext(StimContext);

	useEffect(setStims, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="stimulus-container">
			<div className="stimulus-text">
				<p>{state.stimulus[state.currentStim]}</p>
			</div>
			<div className="stimulus-img"></div>
			<div className="stimulus-con">
				<Control />
			</div>
		</div>
	);
};

export default Stimulus;
