// Modules
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UserID from "./pages/UserID";
import Survey from "./pages/Survey";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Styles
import "./App.css";

function App() {
	return (
		<>
			<Router>
				<NavBar />
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/start" exact component={UserID} />
					<Route path="/survey" exact component={Survey} />
					<Route path="/about" exact component={About} />
					<Route path="/contact" exact component={Contact} />
				</Switch>
				<Footer />
			</Router>
		</>
	);
}

export default App;
