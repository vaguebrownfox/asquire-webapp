import "./App.css";

import StepperNav from "./components/StepperNav";
import AsqAppBar from "./components/AsqAppBar";
import SimpleCard from "./components/SimpleCard";
import FooterLinks from "./components/FooterLinks";
import AboutProject from "./components/steps/AboutProject";
import AddUser from "./components/steps/AddUser";

const components = [
	{
		title: "Welcome! Learn about our project...",
		component: <AboutProject title="firse" />,
	},
	{
		title: "Create User ID!",
		component: <AddUser title="secon" />,
	},
	{
		title: "Record your voice!",
		component: <SimpleCard title="thirr" />,
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
