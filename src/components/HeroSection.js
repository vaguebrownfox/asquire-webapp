import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import "./HeroSection.css";
import Button from "./Button";

const HeroSection = () => {
	let today = new Date();
	let curHr = today.getHours();
	let timeGreet = "Good morning! ☕";

	if (curHr < 18 && curHr >= 12) {
		timeGreet = "Good afternoon! ☀️";
	} else if (curHr >= 18) {
		timeGreet = "Good evening! 🌙";
	}
	return (
		<div className="hero-container">
			<h1>{timeGreet}</h1>
			<p>Hope you have few minutes to spare!</p>
			<Link to="/start">
				<div className="hero-btns">
					<Button
						className="btns"
						buttonStyle="btn-outline"
						buttonSize="btn--large"
					>
						START
					</Button>
				</div>
			</Link>
		</div>
	);
};

export default HeroSection;
