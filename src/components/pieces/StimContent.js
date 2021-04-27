import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia, CircularProgress, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	media: {
		height: 255,
		width: 255,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		borderRadius: theme.spacing(1),
	},
}));

// const imageDef = `https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_images%2Fdefault.jpeg?alt=media&token=027fb68e-9a70-4cbc-86de-b64cd7363a26`;
const imageIns = `https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_images%2Fstim-image.png?alt=media&token=a7cb7276-2fc5-435f-9ce5-e8286c6da4bf`;
const StimContent = ({ stim }) => {
	const classes = useStyles();

	return (
		<>
			{!stim?.description && (
				<div className={classes.progress}>
					<CircularProgress color="secondary" size={28} />
				</div>
			)}
			<Typography variant="h6" color="textPrimary" gutterBottom>
				{stim?.description}
			</Typography>
			<CardMedia
				className={classes.media}
				image={imageIns}
				title="Stimulus image"
			/>
		</>
	);
};

export default StimContent;
