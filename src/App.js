import "./App.css";

import StepperNav from "./components/StepperNav";
import AsqAppBar from "./components/AsqAppBar";
import SimpleCard from "./components/SimpleCard";
import FooterLinks from "./components/FooterLinks";
import AboutProject from "./components/steps/AboutProject";
import AddUser from "./components/steps/AddUser";
import Survey from "./components/steps/Survey";
import BioData from "./components/steps/BioData";
import Record from "./components/steps/Record";

const components = [
	{
		title: "Welcome!",
		component: <AboutProject title="firse" />,
	},
	{
		title: "Create User ID!",
		component: <AddUser />,
	},
	{
		title: "Bio Data",
		component: <BioData />,
	},
	{
		title: "Quick Survey!",
		component: <Survey title="secon" />,
	},
	{
		title: "Record your voice!",
		component: <Record />,
	},
];

const App = () => {
	return (
		<div className="App">
			<AsqAppBar title="Asquire" />
			<StepperNav {...{ components }} />
			<FooterLinks />
		</div>
	);
};

export default App;
