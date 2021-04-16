import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { IconButton, Tooltip } from "@material-ui/core";
import RecordStartIcon from "@material-ui/icons/Mic";
import RecordStopIcon from "@material-ui/icons/MicOff";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 256,
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
}));

export default function Finish() {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<Card className={classes.root} elevation={8}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					{bull}
					{"Thank you for taking part in out project!"}
				</Typography>

				<IconButton
					aria-label="play/pause"
					onClick={handleRecord}
					disabled={play}
				>
					<Tooltip
						title={`${isRecording ? "Stop" : "Start"} recording`}
					>
						{isRecording ? (
							<RecordStopIcon className={classes.controlIcon} />
						) : (
							<RecordStartIcon className={classes.controlIcon} />
						)}
					</Tooltip>
				</IconButton>
			</CardContent>
		</Card>
	);
}
