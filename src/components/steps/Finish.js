import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import RecordStartIcon from "@material-ui/icons/Adjust";
import RecordStopIcon from "@material-ui/icons/Album";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";

// Context
import { Context as RecordContext } from "../../context/data/RecordContext";
import { Context as VoiceContext } from "../../context/data/VoiceContext";

import Timer from "../pieces/Timer";
import useContainerDimensions from "../../hooks/useContainerDimensions";
import Worm from "../pieces/Worm";

const useStyles = makeStyles((theme) => ({
	root: {
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
		width: 0,
		height: 0,
	},
	chipDiv: {
		display: "flex",
		justifyContent: "center",
		flexWrap: "wrap",
		"& > *": {
			marginRight: theme.spacing(4),
			marginLeft: theme.spacing(4),
			marginBottom: theme.spacing(2),
		},
	},
	chip: {
		transform: "scale(1.2)",
	},
	recButton: {
		borderWidth: 4,
		borderColor: theme.palette.secondary.main,
		borderStyle: "dotted",
		margin: theme.spacing(2),
	},
	recButtonAction: {
		borderWidth: 4,
		borderColor: theme.palette.secondary.main,
		borderStyle: "dotted",
		margin: theme.spacing(2),
		animation: `$spin 8000ms  infinite linear`,
	},
	controlIcon: {
		height: theme.spacing(8),
		width: theme.spacing(8),
		margin: theme.spacing(1),
	},
	controlIconAction: {
		height: theme.spacing(8),
		width: theme.spacing(8),
		margin: theme.spacing(1),
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
	"@keyframes spin": {
		from: {
			transform: "rotate(0deg)",
		},
		to: {
			transform: "rotate(360deg)",
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
	const playerRef = React.useRef();

	const [play, setPlay] = React.useState(false);

	const handleRecord = () => {
		if (recordState.isRecording) {
			clearInterval(timeoutRef.current);
			recordStopAction();
		} else {
			recordStartAction(recordState.inputStream);
			timeoutRef.current = setTimeout(() => {
				recordStopAction();
			}, 21 * 1000);
		}
	};

	const handleTransform = async (type) => {
		console.log("transforming");
		if (recordState.playUrl !== "") {
			if (play) {
				playerRef.current.pause();
				setPlay(false);
			} else {
				await voiceTransformAction(recordState.playUrl, type);
				playerRef.current.play();
				playerRef.current.addEventListener("ended", () => {
					setPlay(false);
				});
				setPlay(true);
			}
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

				<IconButton
					aria-label="record"
					className={
						recordState.isRecording
							? classes.recButtonAction
							: classes.recButton
					}
					onClick={handleRecord}
				>
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

				<audio
					ref={playerRef}
					className={classes.player}
					src={voiceState.playUrl}
					controls
				/>

				<div className={classes.chipDiv}>
					{voiceState.txDetes.map((v, i) => (
						<Chip
							key={i}
							className={classes.chip}
							disabled={recordState.isRecording}
							color="secondary"
							label={v.name}
							onClick={() => handleTransform(v.key)}
							onDelete={() => handleTransform(v.key)}
							// avatar={<Avatar>{v.name[0]}</Avatar>}
							deleteIcon={<PlayIcon />}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
