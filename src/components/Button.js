// Modules
import React from "react";

// Styles
import "./styles/Button.css";

// Components

const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--medium", "btn--large"];

const Button = ({ children, type, onClick, buttonStyle, buttonSize }) => {
	const checkButtonStyle = STYLES.includes(buttonStyle)
		? buttonStyle
		: STYLES[0];

	const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

	return (
		<div>
			<button
				className={`btn ${checkButtonStyle} ${checkButtonSize}`}
				onClick={onClick}
				type={type}
			>
				{children}
			</button>
		</div>
	);
};

export default Button;
