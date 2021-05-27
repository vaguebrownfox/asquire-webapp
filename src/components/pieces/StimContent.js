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
	stimtypo: {
		padding: theme.spacing(1),
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		borderWidth: 2,
		borderRadius: 8,
		borderColor: theme.palette.secondary.main,
		borderStyle: "solid",
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
			<Typography variant="caption" component="p" gutterBottom>
				Keep your recording device about a hand-span away
			</Typography>
			<Grow in={anim}>
				<Typography
					className={classes.stimtypo}
					variant="h6"
					color="textPrimary"
					gutterBottom
				>
					<b>{stim?.description}</b>
				</Typography>
			</Grow>{" "}
			{!stim?.description && (
				<div className={classes.progress}>
					<CircularProgress color="secondary" size={28} />
				</div>
			)}
		</>
	);
};

export default StimContent;
