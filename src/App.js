// Modules
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Styles
import "./App.css";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./functions/protectedRoute";

// Pages
import Home from "./pages/home/Home";
import UserID from "./pages/userid/UserID";
import Survey from "./pages/survey/Survey";
import Record from "./pages/record/Record";
import Thank from "./pages/record/elements/Thank";
import Error404 from "./pages/home/elements/Error404";

// Context
import { Provider as UserProvider } from "./context/data/UserContext";

const App = () => {
	return (
		<>
			<Router>
				<NavBar />
				<UserProvider>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/userid" exact component={UserID} />
						<ProtectedRoute
							path="/survey"
							exact
							component={Survey}
						/>
						<ProtectedRoute
							path="/record"
							exact
							component={Record}
						/>
						<ProtectedRoute path="/done" exact component={Thank} />
						<Route path="*" component={Error404} />
					</Switch>
				</UserProvider>
				<Footer />
			</Router>
		</>
	);
};

export default App;

//                 • What does the fox say ? •
//  /¯      ∆__∆    ˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘˘
//  \_______\··/
//  /¬ ¬  ¬  \/
//  \¬_„_„„_¬„/
//  / |    | |
// /  /    / |
// ˘  ˘   ˘  ˘
//  J_Fox
