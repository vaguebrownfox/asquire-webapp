import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	CardMedia,
	CircularProgress,
	Collapse,
	Fade,
	Grow,
	Slide,
	Typography,
	Zoom,
} from "@material-ui/core";

import { stim_image_url } from "../../functions/firebaseConfig";

const useStyles = makeStyles((theme) => ({
	media: {
		height: 200,
		width: 200,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		borderRadius: theme.spacing(1),
	},
}));

const StimContent = ({ stim, anim }) => {
	const classes = useStyles();

	return (
		<>
			<CardMedia
				className={classes.media}
				image={stim_image_url}
				title="Stimulus image"
			/>
			{!stim?.description && (
				<div className={classes.progress}>
					<CircularProgress color="secondary" size={28} />
				</div>
			)}
			<Grow in={anim}>
				<Typography variant="h6" color="textPrimary" gutterBottom>
					<b>{stim?.description}</b>
				</Typography>
			</Grow>
		</>
	);
};

export default StimContent;
