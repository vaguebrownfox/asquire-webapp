import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {
	CardActionArea,
	CardMedia,
	IconButton,
	Tooltip,
} from "@material-ui/core";

import PlayIcon from "@material-ui/icons/PlayArrow";
import RecordStartIcon from "@material-ui/icons/Mic";
import SkipNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.background.default,
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

	cardaction: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	media: {
		height: 255,
		width: 255,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		borderRadius: theme.spacing(1),
	},

	controls: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		justifyContent: "space-evenly",
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	controlIcon: {
		height: 38,
		width: 38,
	},
}));

export default function Record({ title }) {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					{`Recording for username`}
				</Typography>
				<div className={classes.cardaction}>
					<Typography variant="h6" color="textPrimary" gutterBottom>
						{`Take a deep breath and say AAA...`}
					</Typography>

					<CardMedia
						className={classes.media}
						image="https://miro.medium.com/max/1268/1*RTYreJ-PHBj2S33Eif2acA.jpeg"
						title="Contemplative Reptile"
					/>
					<div className={classes.controls}>
						<IconButton aria-label="previous">
							<Tooltip title="Play">
								<PlayIcon className={classes.controlIcon} />
							</Tooltip>
						</IconButton>
						<IconButton aria-label="play/pause">
							<Tooltip title="Start recording">
								<RecordStartIcon
									className={classes.controlIcon}
								/>
							</Tooltip>
						</IconButton>
						<IconButton aria-label="next">
							<Tooltip title="Next">
								<SkipNextIcon className={classes.controlIcon} />
							</Tooltip>
						</IconButton>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
