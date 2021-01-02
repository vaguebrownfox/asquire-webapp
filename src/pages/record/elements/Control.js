// Modules
import React from "react";

// Styles
import "./Control.css";

const Control = () => {
	return (
		<div className="control-container">
			<div className="control-btn control-play">
				<i className="fas fa-play"></i>
				{/* <i className="fas fa-pause"></i> */}
			</div>
			<div className="control-btn control-record">
				<i className="fas fa-microphone-alt"></i>
				{/* <i className="fas fa-microphone-alt-slash"></i> */}
			</div>
			<div className="control-btn control-next">
				<i className="fas fa-chevron-circle-right"></i>
			</div>
		</div>
	);
};

export default Control;
