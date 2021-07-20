import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Typography, Button } from "@material-ui/core";

export default function MoxRedirect() {
	const classes = useStyles();

	return (
		<Card className={classes.root} elevation={8}>
			<>
				<Typography
					variant="h5"
					component="div"
					align="center"
					gutterBottom
				>
					{getGreet()}
					<br />
					<br />
					Please visit{" "}
					<span className={classes.spn}>
						<b>Asquire</b>
					</span>{" "}
					project Web-app for participating in our research!
				</Typography>
				<Button
					className={classes.button}
					variant="outlined"
					color="secondary"
					href="https://asquire.web.app"
				>
					Go to Web App
				</Button>
				<Typography
					variant="h6"
					component="div"
					align="center"
					gutterBottom
				>
					Thank you!
				</Typography>
			</>
		</Card>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		minHeight: "70vh",
		margin: theme.spacing(2, 2, 8, 2),
	},
	button: {
		margin: theme.spacing(2, 0),
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: theme.spacing(3),
		background: theme.palette.background.default,

		height: "100%",
	},
	steptitle: {
		display: "flex",
		textAlign: "flex-start",
		paddingLeft: theme.spacing(2),
	},
}));

const getGreet = () => {
	var d = new Date();
	var time = d.getHours();

	if (time < 12) {
		return "Good morning!";
	}
	if (time > 12 && time < 17) {
		return "Good afternoon!";
	}
	if (time > 5) {
		return "Good evening!";
	}
};
