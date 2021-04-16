import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import RecordStartIcon from "@material-ui/icons/Mic";
import RecordStopIcon from "@material-ui/icons/MicOff";

// Context
import { Context as RecordContext } from "../../context/data/RecordContext";
import { Context as VoiceContext } from "../../context/data/VoiceContext";

import Timer from "../pieces/Timer";
import useContainerDimensions from "../../hooks/useContainerDimensions";
import Worm from "../pieces/Worm";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 256,
		position: "relative",
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
	player: {
		width: "100%",
	},
	controlIcon: {
		height: theme.spacing(8),
		width: theme.spacing(8),
		margin: theme.spacing(2),
	},
	controlIconAction: {
		height: theme.spacing(8),
		width: theme.spacing(8),
		margin: theme.spacing(2),
		animation: `$zoomies 2000ms ${theme.transitions.easing.easeInOut} 200ms infinite`,
	},
	"@keyframes zoomies": {
		"0%": {
			transform: "scale(1)",
		},
		"50%": {
			transform: "scale(1.1)",
		},
		"100%": {
			transform: "scale(1)",
		},
	},
}));

export default function Finish() {
	const classes = useStyles();
	const {
		state: recordState,
		recordGetDevicesAction,
		recordStartAction,
		recordStopAction,
	} = React.useContext(RecordContext);
	const { state: voiceState, voiceTransformAction } = React.useContext(
		VoiceContext
	);

	const timeoutRef = React.useRef();
	const vizRef = React.useRef();

	const handleRecord = () => {
		if (recordState.isRecording) {
			clearInterval(timeoutRef.current);
			recordStopAction();
		} else {
			recordStartAction(recordState.inputStream);
			timeoutRef.current = setTimeout(() => {
				recordStopAction();
			}, 11 * 1000);
		}
	};

	const handleTransform = () => {
		console.log("transforming");
		if (recordState.playUrl !== "") {
			voiceTransformAction(recordState.playUrl);
		}
	};

	React.useEffect(() => {
		recordGetDevicesAction();
		return () => {
			console.log("voice cleanup");
		};
	}, []);

	const { width, height } = useContainerDimensions(vizRef, recordState);

	return (
		<Card ref={vizRef} className={classes.root} elevation={8}>
			{recordState.isRecording && (
				<Worm
					{...{
						width,
						height,
						shape: "circle",
						stream: recordState.inputStream,
					}}
				/>
			)}
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					{
						"Thank you for taking part in out project! Here's something fun!"
					}
				</Typography>

				<IconButton aria-label="record" onClick={handleRecord}>
					<Tooltip
						title={`${
							recordState.isRecording ? "Stop" : "Start"
						} recording`}
					>
						{recordState.isRecording ? (
							<RecordStopIcon
								className={classes.controlIconAction}
							/>
						) : (
							<RecordStartIcon className={classes.controlIcon} />
						)}
					</Tooltip>
				</IconButton>
				<Timer seconds={recordState.seconds} />

				{recordState.recDone && (
					<audio
						className={classes.player}
						src={voiceState.playUrl}
						controls
					/>
				)}

				<Button
					variant="contained"
					color="secondary"
					onClick={handleTransform}
				>
					Transform
				</Button>
			</CardContent>
		</Card>
	);
}
