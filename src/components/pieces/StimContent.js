import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	media: {
		height: 255,
		width: 255,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		borderRadius: theme.spacing(1),
	},
}));
const StimContent = ({ stim }) => {
	const classes = useStyles();

	return (
		<>
			<Typography variant="h6" color="textPrimary" gutterBottom>
				{stim.description}
			</Typography>

			<CardMedia
				className={classes.media}
				image="https://miro.medium.com/max/1268/1*RTYreJ-PHBj2S33Eif2acA.jpeg"
				title="Stimulus image"
			/>
		</>
	);
};

export default StimContent;
