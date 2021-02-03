// Modules
import React from "react";
import { Link } from "react-router-dom";

// Styles
import "./elements/Home.css";

// Components
import { greetMsg } from "../../functions/generalFunctions";
import Button from "../../components/Button";

const Home = ({ history }) => {
	const startButton = () => {
		history.push("/userid");
	};
	return (
		<div className="homepage">
			<h1 id="homepage-greet">{greetMsg()}</h1>
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

				<p id="homepage-consent">
					{"*By clicking START, you are agreeing to the "}
					<Link id="homepage-consent-text" to="/conditions">
						terms and conditions
					</Link>{" "}
					(click to view){" "}
				</p>
			</div>
		</div>
	);
};

export default Home;
