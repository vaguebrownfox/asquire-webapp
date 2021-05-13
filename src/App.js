import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

import AsqAppBar from "./components/AsqAppBar";
import FooterLinks from "./components/FooterLinks";
import StepperNav from "./components/StepperNav";

// Context Provider
// import { Provider as AppProvider } from "./context/data/AppContext";
import { Provider as StepProvider } from "./context/data/StepContext";
import { Provider as UserProvider } from "./context/data/UserContext";
import { Provider as SurveyProvider } from "./context/data/SurveyContext";
import { Provider as RecordProvider } from "./context/data/RecordContext";
import { Provider as VoiceProvider } from "./context/data/VoiceContext";

// Steps
const Welcome = React.lazy(() => import("./components/steps/Welcome"));
const AddUser = React.lazy(() => import("./components/steps/AddUser"));
const Survey = React.lazy(() => import("./components/steps/Survey"));
const BioData = React.lazy(() => import("./components/steps/BioData"));
const Record = React.lazy(() => import("./components/steps/Record"));

// Static
const About = React.lazy(() => import("./components/static/About"));
const Consent = React.lazy(() => import("./components/static/Consent"));
const Contact = React.lazy(() => import("./components/static/Contact"));
const Feedback = React.lazy(() => import("./components/static/Feedback"));

export const components = [
	{
		title: "Welcome!",
		component: <Welcome />,
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
					<StepProvider>
						<UserProvider>
							<AsqAppBar title="Asquire" />
							<SurveyProvider>
								<RecordProvider>
									<VoiceProvider>
										<React.Suspense
											fallback={
												<CircularProgress
													color="secondary"
													size={28}
												/>
											}
										>
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
										</React.Suspense>
									</VoiceProvider>
								</RecordProvider>
							</SurveyProvider>
						</UserProvider>
					</StepProvider>

					<FooterLinks />
				</Router>
			</>
		</div>
	);
};

export default App;
