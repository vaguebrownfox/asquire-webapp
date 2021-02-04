// Module
import React from "react";

// Styles
import "./styles/Background.css";

const Background = ({ children }) => {
	return (
		<div className="context">
			<div className="area">
				<ul className="circles">
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
					<li></li>
				</ul>
				{children}
			</div>
		</div>
	);
};

export default Background;
