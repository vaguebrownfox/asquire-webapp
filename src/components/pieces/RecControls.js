import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, IconButton, Tooltip, Typography } from "@material-ui/core";

// import RecordStartIcon from "@material-ui/icons/Mic";
import RecordStartIcon from "@material-ui/icons/FiberManualRecordRounded";
import RecordStopIcon from "@material-ui/icons/StopRounded";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import DoneIcon from "@material-ui/icons/ArrowForwardRounded";

const RecControl = ({
	handleRecord,
	handleDone,
	isRecording,
	recDone,
	playRec,
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
		setInstip("Click! Listen to instruction");
		const stopPlay = () => {
			setPlay(false);
			setInstip("Play again...");
		};
		const infoRefE = infoRef.current;
		infoRefE && infoRefE?.addEventListener("ended", stopPlay);
		infoRefE && infoRefE?.addEventListener("pause", stopPlay);
		infoRefE && infoRefE?.addEventListener("seeking", () => setPlay(true));

		return () => {
			infoRefE && infoRefE?.removeEventListener("ended", stopPlay);
			infoRefE && infoRefE?.removeEventListener("pause", stopPlay);
		};
	}, [stim]);

	return (
		<div className={classes.root}>
			<div className={classes.controls}>
				<IconButton
					aria-label="info"
					onClick={handlePlay}
					color={play ? "secondary" : ""}
					disabled={isRecording || playRec}
				>
					<Tooltip
						title={instip}
						arrow
						open={true}
						placement="bottom"
					>
						<InfoIcon className={classes.controlIcon} />
					</Tooltip>
				</IconButton>
				<div className={classes.controlIconRec}>
					<IconButton
						aria-label="record"
						onClick={handleRecord}
						color="secondary"
						disabled={play || playRec}
					>
						<Tooltip
							title={`${
								isRecording
									? "Stop recording"
									: recDone
									? "Redo recording?"
									: "Start recording"
							}`}
							arrow
						>
							{isRecording ? (
								<RecordStopIcon
									classes={{ root: classes.recIcon }}
									fontSize="large"
								/>
							) : recDone ? (
								<RecordStartIcon
									classes={{ root: classes.recIcon }}
									fontSize="large"
								/>
							) : (
								<RecordStartIcon
									classes={{ root: classes.recIcon }}
									fontSize="large"
								/>
							)}
						</Tooltip>
					</IconButton>
					{recDone && (
						<Typography color="secondary" variant="caption">
							Redo recording?
						</Typography>
					)}
				</div>
				<IconButton
					aria-label="next"
					onClick={handleDone}
					disabled={!recDone || play || playRec}
				>
					<Tooltip open={recDone} arrow title="Done? Next task >>">
						<DoneIcon className={classes.controlIcon} />
					</Tooltip>
				</IconButton>
			</div>

			<Collapse in={play}>
				{true && (
					<Typography
						variant="body2"
						color="textPrimary"
						component="p"
					>
						<b>Listen to the instructions</b>
					</Typography>
				)}
			</Collapse>
			<Collapse in={play}>
				<audio
					ref={infoRef}
					className={classes.playerShow}
					src={stim?.audioDescriptionLink}
					controls
				/>
			</Collapse>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
	},
	controls: {
		display: "flex",
		alignItems: "flex-start",
		width: "100%",
		maxWidth: theme.spacing(64),
		justifyContent: "space-evenly",
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	recIcon: {
		background: theme.palette.primary,
		boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		animation: `$glowee 3000ms ${theme.transitions.easing.easeInOut} 400ms infinite`,
		borderRadius: "50%",
	},
	controlIcon: {
		height: 38,
		width: 38,

		"&:hover": {
			transform: "scale(1.1)",
			cursor: "crosshair",
		},
	},
	controlIconOlp: {
		height: 38,
		width: 38,

		"&:hover": {
			transform: "scale(1.1)",
			cursor: "crosshair",
		},
	},
	recbutton: {
		position: "relative",
	},
	controlIconAction: {
		height: 38,
		width: 38,

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
	"@keyframes glowee": {
		"0%": {
			boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		},
		"50%": {
			boxShadow: `0 0 7px 4px ${theme.palette.secondary.main}`,
		},
		"100%": {
			boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		},
	},
	playerShow: {
		// display: "none",
		transform: "scale(0.8)",
	},
	playerHide: {
		display: "none",
	},
	controlIconRec: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));

export default RecControl;
