import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AsqAppBar from "./components/AsqAppBar";
import FooterLinks from "./components/FooterLinks";

import MoxRedirect from "./components/MoxRedirect";

// Static
const About = React.lazy(() => import("./components/static/About"));
const Consent = React.lazy(() => import("./components/static/Consent"));
const Contact = React.lazy(() => import("./components/static/Contact"));
const Feedback = React.lazy(() => import("./components/static/Feedback"));

const App = () => {
	return (
		<div className="App">
			<>
				<Router>
					<AsqAppBar title="Asquire" />
					<Switch>
						{/* Home Page */}
						<Route path="/" exact component={MoxRedirect} />
						{/* Static Pages */}
						<Route path="/about" exact component={About} />
						<Route path="/consent" exact component={Consent} />
						<Route path="/contact" exact component={Contact} />
						<Route path="/feedback" exact component={Feedback} />
					</Switch>

					<FooterLinks />
				</Router>
			</>
		</div>
	);
};

export default App;
