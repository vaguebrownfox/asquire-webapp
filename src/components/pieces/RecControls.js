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
	player: {
		display: "none",
	},
}));
const RecControl = ({
	handleRecord,
	handleDone,
	isRecording,
	recDone,
	stim,
}) => {
	const classes = useStyles();
	const infoRef = React.useRef();

	const [play, setPlay] = React.useState(false);
	const [instip, setInstip] = React.useState("Click! Listen to instruction");

	const handlePlay = () => {
		if (play) {
			infoRef.current.pause();
			setPlay(false);
			setInstip("Paused");
		} else {
			setInstip("Click to pause..");
			infoRef.current.play();
			setPlay(true);
		}
	};

	React.useEffect(() => {
		console.log("effect control");
		setInstip("Click! Listen to instruction");
		const stopPlay = () => {
			setPlay(false);
			setInstip("Play again...");
			console.log("play ended");
		};
		infoRef && infoRef.current?.addEventListener("ended", stopPlay);

		return () => {
			infoRef && infoRef.current?.removeEventListener("ended", stopPlay);
		};
	}, [stim]);

	return (
		<div className={classes.controls}>
			<audio
				ref={infoRef}
				className={classes.player}
				src={stim.audioDescriptionLink}
				controls
			/>
			<IconButton
				aria-label="info"
				onClick={handlePlay}
				disabled={isRecording}
			>
				<Tooltip title={instip} open={true} placement="top">
					<InfoIcon className={classes.controlIcon} />
				</Tooltip>
			</IconButton>
			<IconButton
				aria-label="play/pause"
				onClick={handleRecord}
				disabled={play}
			>
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
				disabled={!recDone || play}
			>
				<Tooltip title="Done">
					<DoneIcon className={classes.controlIcon} />
				</Tooltip>
			</IconButton>
		</div>
	);
};

export default RecControl;
