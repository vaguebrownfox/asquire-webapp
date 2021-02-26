import React from "react";

import "./styles/TextBox.css";

const TextBox = ({ children }) => {
	return (
		<div className="tv-container">
			<div className="tv">{children}</div>
		</div>
	);
};

export default TextBox;
