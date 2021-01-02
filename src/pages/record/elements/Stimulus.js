// Modules
import React from "react";

// Styles
import "./Stimulus.css";

// Components
import Control from "./Control";

const Stimulus = ({ stimulus, img }) => {
	return (
		<div className="stimulus-container">
			<div className="stimulus-text">
				<p>You gotta scream aaaaaaa......</p>
			</div>
			<div className="stimulus-img"></div>
			<div className="stimulus-con">
				<Control />
			</div>
		</div>
	);
};

export default Stimulus;
