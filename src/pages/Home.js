// Modules
import React from "react";

// Styles

// Components
import Body from "../components/Body";
import Button from "../components/Button";

const Home = ({ history }) => {
	let today = new Date();
	let curHr = today.getHours();
	let timeGreet = "Good morning! ☕";

	const startButton = () => {
		history.push("/start");
	};

	if (curHr < 18 && curHr >= 12) {
		timeGreet = "Good afternoon! ☀️";
	} else if (curHr >= 18) {
		timeGreet = "Good evening! 🌙";
	}
	return (
		<>
			<Body className="homepage">
				<h1 id="homepage-greet">{timeGreet}</h1>
				<p id="homepage-greetd">Hope you have few minutes to spare!</p>
				<div id="homepage-btn">
					<Button
						className="btns"
						buttonStyle="btn--primary"
						buttonSize="btn--large"
						onClick={startButton}
					>
						<p id="homepage-start">START</p>
					</Button>
				</div>
			</Body>
		</>
	);
};

export default Home;
