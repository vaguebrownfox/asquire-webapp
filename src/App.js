import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/pages/Home";
import UserID from "./components/pages/UserID";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Router>
				<NavBar />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/start" exact component={UserID} />
				</Switch>
				<Footer />
			</Router>
		</>
	);
}

export default App;
