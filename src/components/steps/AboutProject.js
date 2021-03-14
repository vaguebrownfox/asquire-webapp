import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		background: theme.palette.primary.card,
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
}));

const AboutProject = () => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					{"Diagnosis with AI"}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					adjective
				</Typography>
				<Typography variant="body2" component="p">
					The future
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
};

export default AboutProject;
