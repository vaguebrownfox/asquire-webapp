import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AsqAppBar from "./components/AsqAppBar";
import FooterLinks from "./components/FooterLinks";
import StepperNav from "./components/StepperNav";

import AboutProject from "./components/steps/AboutProject";
import AddUser from "./components/steps/AddUser";
import Survey from "./components/steps/Survey";
import BioData from "./components/steps/BioData";
import Record from "./components/steps/Record";

import About from "./components/static/About";
import Consent from "./components/static/Consent";
import Contact from "./components/static/Contact";
import Feedback from "./components/static/Feedback";

// Context
import { Provider as AppProvider } from "./context/data/AppContext";
import { Provider as StepProvider } from "./context/data/StepContext";
import { Provider as UserProvider } from "./context/data/UserContext";
import { Provider as SurveyProvider } from "./context/data/SurveyContext";
import { Provider as RecordProvider } from "./context/data/RecordContext";

// import { components } from "./components/steps/components";

export const components = [
	{
		title: "Welcome!",
		component: <AboutProject />,
	},
	{
		title: "Select User",
		component: <AddUser />,
	},
	{
		title: "Bio Data",
		component: <BioData />,
	},
	{
		title: "Quick Survey!",
		component: <Survey />,
	},
	{
		title: "Record your voice!",
		component: <Record />,
	},
];

const App = () => {
	return (
		<div className="App">
			<>
				<Router>
					<AsqAppBar title="Asquire" />

					<AppProvider>
						<StepProvider>
							<UserProvider>
								<SurveyProvider>
									<RecordProvider>
										<Switch>
											{/* Home Page */}
											<Route
												path="/"
												exact
												render={(props) => (
													<StepperNav
														{...{
															components,
															...props,
														}}
													/>
												)}
											/>

											{/* Static Pages */}
											<Route
												path="/about"
												exact
												component={About}
											/>
											<Route
												path="/consent"
												exact
												component={Consent}
											/>
											<Route
												path="/contact"
												exact
												component={Contact}
											/>
											<Route
												path="/feedback"
												exact
												component={Feedback}
											/>
										</Switch>
									</RecordProvider>
								</SurveyProvider>
							</UserProvider>
						</StepProvider>
					</AppProvider>

					<FooterLinks />
				</Router>
			</>
		</div>
	);
};

export default App;
