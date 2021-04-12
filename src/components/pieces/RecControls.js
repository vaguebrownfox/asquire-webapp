import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Tooltip } from "@material-ui/core";
import RecordStartIcon from "@material-ui/icons/Mic";
import RecordStopIcon from "@material-ui/icons/MicOff";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
	controls: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		maxWidth: theme.spacing(64),
		justifyContent: "space-evenly",
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	controlIcon: {
		height: 38,
		width: 38,

		"&:hover": {
			transform: "scale(1.1)",
			cursor: "crosshair",
		},
	},
}));
const RecControl = ({ handleRecord, handleDone, isRecording, recDone }) => {
	const classes = useStyles();

	return (
		<div className={classes.controls}>
			<IconButton aria-label="previous">
				<Tooltip title="Info">
					<InfoIcon className={classes.controlIcon} />
				</Tooltip>
			</IconButton>
			<IconButton aria-label="play/pause" onClick={handleRecord}>
				<Tooltip title={`${isRecording ? "Stop" : "Start"} recording`}>
					{isRecording ? (
						<RecordStopIcon className={classes.controlIcon} />
					) : (
						<RecordStartIcon className={classes.controlIcon} />
					)}
				</Tooltip>
			</IconButton>
			<IconButton
				aria-label="next"
				onClick={handleDone}
				disabled={!recDone}
			>
				<Tooltip title="Done">
					<DoneIcon className={classes.controlIcon} />
				</Tooltip>
			</IconButton>
		</div>
	);
};

export default RecControl;
