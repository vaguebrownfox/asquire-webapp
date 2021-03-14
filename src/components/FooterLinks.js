import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ContactIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";
import FeedbackIcon from "@material-ui/icons/Feedback";

const useStyles = makeStyles({
	root: {
		position: "fixed",
		bottom: "0",
		width: "100%",
		height: 32 * 3,
	},
});

export default function LabelBottomNavigation() {
	const classes = useStyles();
	const [value, setValue] = React.useState("recents");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<BottomNavigation
			value={value}
			showLabels
			onChange={handleChange}
			className={classes.root}
		>
			<BottomNavigationAction
				label="Contact"
				value="contact"
				icon={<ContactIcon />}
			/>
			<BottomNavigationAction
				label="Home Page"
				value="homepage"
				icon={<HomeIcon />}
			/>
			<BottomNavigationAction
				label="Feedback"
				value="feedback"
				icon={<FeedbackIcon />}
			/>
		</BottomNavigation>
	);
}
