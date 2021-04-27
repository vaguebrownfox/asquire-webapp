import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { Avatar, CardActions, Tooltip } from "@material-ui/core";

import { components } from "../../App";

import {
	chrome_logo_url,
	firefox_logo_url,
} from "../../functions/firebaseConfig";

// Context
import { Context as StepContext } from "../../context/data/StepContext";

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.primary.card,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 16,
	},
	subtitleDiv: {
		marginRight: "auto",
		marginLeft: "auto",
		maxWidth: 600,
	},
	subtitle: {
		fontWeight: "bold",
	},
	consentbutton: {
		textTransform: "none",
		marginTop: theme.spacing(1),
	},
	terms: {
		paddingTop: theme.spacing(2),
	},
	cardactions: {
		flexDirection: "row-reverse",
		paddingRight: theme.spacing(3),
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginTop: theme.spacing(2),
	},
	avatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
		background: theme.palette.background.default,
		// borderWidth: 1,
		// borderColor: theme.palette.primary.contrastText,
	},
	avalink: {
		// borderWidth: 0,
	},
	avagroup: {
		marginRight: theme.spacing(2),
	},
}));

const AboutProject = () => {
	const classes = useStyles();
	const {
		state: stepState,
		stepNextAction,
		stepPreviousAction,
	} = React.useContext(StepContext);

	const handleNext = () => {
		stepNextAction();
	};

	const handleBack = () => {
		stepPreviousAction();
	};

	return (
		<>
			<Card className={classes.root} elevation={8}>
				<CardContent>
					<Typography
						className={classes.title}
						color="textPrimary"
						gutterBottom
					>
						Diagnosis with Machine Learning
					</Typography>
					<div className={classes.subtitleDiv}>
						<Typography
							className={classes.subtitle}
							color="textPrimary"
							variant="subtitle1"
							component="div"
							gutterBottom
						>
							Objective
						</Typography>
						<Typography
							color="secondary"
							variant="body2"
							component="div"
							paragraph
						>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Aenean molestie dignissim erat, nec auctor
							mauris porta sed. Mauris dui ante, pulvinar et
							eleifend ac, sollicitudin ac massa.
						</Typography>
					</div>
					<div className={classes.subtitleDiv}>
						<Typography
							className={classes.subtitle}
							color="textPrimary"
							variant="subtitle1"
							component="div"
							gutterBottom
						>
							Motivation and Background
						</Typography>
						<Typography
							color="secondary"
							variant="body2"
							component="div"
							paragraph
						>
							Quisque tristique ac nulla aliquam tempus. Donec in
							vehicula nisl. Donec quis molestie augue. Ut
							pellentesque accumsan nunc, vitae semper mi pulvinar
							quis. Nunc luctus odio ac purus tempus varius.
						</Typography>
					</div>
					<div className={classes.subtitleDiv}>
						<Typography
							className={classes.subtitle}
							color="textPrimary"
							variant="subtitle1"
							component="div"
							gutterBottom
						>
							Significance of your voice
						</Typography>
						<Typography
							color="secondary"
							variant="body2"
							component="div"
							paragraph
						>
							Donec quis molestie augue. Ut pellentesque accumsan
							nunc, vitae semper mi pulvinar quis. Nunc luctus
							odio ac purus tempus varius. Proin auctor nec diam
							vitae maximus.
						</Typography>
					</div>
					<div className={classes.terms}>
						<Typography
							color="textPrimary"
							variant="body2"
							component="div"
						>
							*By clicking NEXT, you are agreeing to the consent
							form.
						</Typography>
						<Button
							className={classes.consentbutton}
							variant="outlined"
							size="small"
							color="inherit"
							href="/consent"
						>
							Read consent form
						</Button>
					</div>
				</CardContent>
				<CardActions className={classes.cardactions}>
					<AvatarGroup max={4} className={classes.avagroup}>
						<Tooltip title="Chrome">
							<Avatar
								alt="Chrome logo"
								variant="circular"
								src={chrome_logo_url}
								className={classes.avatar}
							/>
						</Tooltip>
						<Tooltip title="Firefox">
							<Avatar
								alt="Firefox logo"
								variant="circular"
								src={firefox_logo_url}
								className={classes.avatar}
								href="https://iisc.ac.in/"
							/>
						</Tooltip>
					</AvatarGroup>
				</CardActions>
			</Card>
			<div className={classes.actionsContainer}>
				<div>
					<Button
						disabled={stepState.activeStep === 0}
						onClick={handleBack}
						className={classes.button}
					>
						Back
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleNext}
						className={classes.button}
					>
						{stepState.activeStep === components.length - 1
							? "Finish"
							: "Next"}
					</Button>
				</div>
			</div>
		</>
	);
};

export default AboutProject;
