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
				image={`https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_images%2Fdefault.jpeg?alt=media&token=027fb68e-9a70-4cbc-86de-b64cd7363a26`}
				title="Stimulus image"
			/>
		</>
	);
};

export default StimContent;
