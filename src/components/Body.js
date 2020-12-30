// Modules
import React from "react";

// Styles
import "../App.css";
import "../components/styles/Button.css";
import "./styles/Body.css";

// Components

const Body = ({ children, className }) => {
	return (
		<div className="body-container">
			<div className={className}>{children}</div>
		</div>
	);
};

export default Body;
