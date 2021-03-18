import AboutProject from "./AboutProject";
import AddUser from "./AddUser";
import Survey from "./Survey";
import BioData from "./BioData";
import Record from "./Record";

export const components = [
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
