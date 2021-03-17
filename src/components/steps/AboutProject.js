import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
	pos: {
		marginBottom: 12,
	},
	consentbutton: {
		textTransform: "none",
		marginTop: theme.spacing(1),
	},
	terms: {
		paddingTop: theme.spacing(2),
	},
}));

const AboutProject = () => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
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
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Aenean molestie dignissim erat, nec auctor mauris porta
						sed. Mauris dui ante, pulvinar et eleifend ac,
						sollicitudin ac massa.
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
						nunc, vitae semper mi pulvinar quis. Nunc luctus odio ac
						purus tempus varius. Proin auctor nec diam vitae
						maximus.
					</Typography>
				</div>
				<div className={classes.terms}>
					<Typography
						color="textPrimary"
						variant="body2"
						component="div"
					>
						*By clicking NEXT, you are agreeing to the terms and
						conditions.
					</Typography>
					<Button
						className={classes.consentbutton}
						variant="outlined"
						size="small"
						color="inherit"
					>
						Read Terms and Condition
					</Button>
				</div>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
};

export default AboutProject;
