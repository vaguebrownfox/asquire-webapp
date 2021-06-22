import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { firebaseSetActive } from "../../functions/firestore";

// Context
import { Context as StepContext } from "../../context/data/StepContext";
import { Context as UserContext } from "../../context/data/UserContext";
import { Context as RecordContext } from "../../context/data/RecordContext";
import ListIcon from "@material-ui/icons/List";

// Pieces
import RecTitle from "../pieces/RecTitle";
import StimContent from "../pieces/StimContent";
import Timer from "../pieces/Timer";
import RecControl from "../pieces/RecControls";
import Worm from "../pieces/Worm";
// import Wave from "../pieces/Wave";
// import RecDevices from "../pieces/RecDevices";

// Hooks
import useContainerDimensions from "../../hooks/useContainerDimensions";
import { Chip, Collapse, Typography } from "@material-ui/core";
import InstructionModal from "../pieces/Instructions";

export default function Record() {
	const classes = useStyles();

	const {
		state: stepState,
		stepNextAction,
		stepPreviousAction,
	} = React.useContext(StepContext);
	const {
		state: recordState,
		recordLoadStimsAction,
		recordNextStimAction,
		recordGetDevicesAction,
		recordStartAction,
		recordStopAction,
		recordPlayAction,
		recordPlayInstAction,
		recordUploadAction,
		recordResetAction,
	} = React.useContext(RecordContext);

	const { state: userState, userUpdateAction } =
		React.useContext(UserContext);

	const playRef = React.useRef();
	const timeoutRef = React.useRef();
	const vizRef = React.useRef();
	const [plytip, setPlytip] = React.useState("Play");

	const [shape, setShape] = React.useState(false);

	const [modalOpen, setOpen] = React.useState(true);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleShape = () => {
		setShape((preshape) => !preshape);
	};

	React.useEffect(() => {
		recordLoadStimsAction(userState.selectedUser).then((user) => {
			user && userUpdateAction(user);
		});
		recordGetDevicesAction();
		firebaseSetActive(userState.selectedUser, "true");

		const playRefE = playRef.current;
		const stopPlay = () => {
			recordPlayAction(false);
			setPlytip("Play");
		};
		playRefE &&
			playRefE?.addEventListener("play", () => recordPlayAction(true));
		playRefE && playRefE?.addEventListener("pause", stopPlay);

		return () => {
			playRefE &&
				playRefE?.removeEventListener("play", () =>
					recordPlayAction(false)
				);
			playRefE && playRefE?.removeEventListener("pause", stopPlay);

			const finishedStim = { ...recordState.currentStim };
			recordUploadAction({
				...userState.selectedUser,
				stimTag: finishedStim.tag,
			}).catch((e) => console.log("upload failed"));
			recordState.analyserNode?.disconnect();
			recordResetAction();
			firebaseSetActive(userState.selectedUser, "false");
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleNext = () => {
		stepNextAction();
	};

	const handleBack = () => {
		stepPreviousAction();
	};

	const handleRecord = () => {
		clearInterval(timeoutRef.current);
		if (recordState.isRecording) {
			timeoutRef.current = setTimeout(() => {
				recordStopAction();
			}, 250);
		} else {
			recordStartAction(recordState.inputStream);
			timeoutRef.current = setTimeout(() => {
				recordStopAction();
			}, 61000);
		}
	};

	const handlePlay = () => {
		if (recordState.isPlaying) {
			playRef.current.pause();
		} else {
			setPlytip("Pause");
			playRef.current.play();
		}
	};

	// const handleRefresh = () => {
	// 	recordGetDevicesAction();
	// };

	const handleDone = () => {
		const finishedStim = { ...recordState.currentStim };
		const completed = userState.selectedUser?.completed + 1;
		recordUploadAction({
			...userState.selectedUser,
			stimTag: finishedStim.tag,
		}).then(() => {
			const user = {
				...userState.selectedUser,
				stimCount: finishedStim.sno + 1,
				completed: completed,
			};
			userUpdateAction(user);
			recordNextStimAction(completed);
		});
	};

	const { width, height } = useContainerDimensions(vizRef, recordState);

	return (
		<>
			<Card ref={vizRef} className={classes.root} elevation={8}>
				{recordState.isRecording && (
					<Worm
						{...{
							width,
							height,
							shape,
							analyserNode: recordState.analyserNode,
						}}
					/>
				)}
				{/* {recordState.recDone && (
					<Wave
						{...{
							width,
							height,
							audioBuffer: recordState.audioBuffer,
						}}
					/>
				)} */}

				<Chip
					className={classes.instChip}
					avatar={<ListIcon fontSize="large" />}
					aria-label="Show instructions"
					label="Show instructions"
					onClick={handleOpen}
					variant="outlined"
				/>
				<CardContent>
					<RecTitle
						s={handleShape}
						userName={userState.selectedUser?.userName}
					/>

					{/* {userState.selectedUser?.completed <
						recordState.totalStimCount || recordState.loading ? (
						<Typography
							variant="caption"
							component="p"
							gutterBottom
						>
							{`Completed: ${
								userState.selectedUser?.completed || 0
							}/${recordState.totalStimCount}`}
						</Typography>
					) : (
						<Typography
							variant="caption"
							component="p"
							style={{ color: green[900] }}
							gutterBottom
						>
							{`Yay! You have completed all the tasks...`}
						</Typography>
					)} */}

					<div className={classes.cardaction}>
						<StimContent
							stim={recordState.currentStim}
							labels={recordState.stimLabels}
							activeStim={userState.selectedUser?.completed || 0}
							anim={recordState.stimAnim}
							isRecording={recordState.isRecording}
							isPlaying={recordState.isPlayingInst}
							{...{ playRec: recordPlayInstAction, modalOpen }}
						/>

						<Timer seconds={recordState.seconds} />
						{/* <Typography className={classes.inshelp}>
							*Please listen to instructions before recording.
						</Typography> */}
						<RecControl
							isRecording={recordState.isRecording}
							isPlaying={recordState.isPlaying}
							isPlayingInst={recordState.isPlayingInst}
							recDone={recordState.recDone}
							playTip={plytip}
							{...{ handleRecord, handleDone, handlePlay }}
						/>
						<div className={classes.playerDiv}>
							<Collapse
								in={
									recordState.recDone &&
									!recordState.isPlayingInst
								}
							>
								<Typography
									variant="body2"
									color="textPrimary"
									component="p"
									gutterBottom
								>
									<b>Play recorded audio</b>
								</Typography>
							</Collapse>
							<Collapse
								in={
									recordState.recDone &&
									!recordState.isPlayingInst
								}
							>
								<audio
									ref={playRef}
									id="stim-player"
									className={classes.player}
									src={recordState.playUrl}
									controls
								/>
							</Collapse>
						</div>
					</div>
					<>
						<InstructionModal {...{ modalOpen, handleClose }} />
					</>
					{/* <RecDevices {...{ recordState, handleRefresh }} /> */}
				</CardContent>
			</Card>

			<div className={classes.actionsContainer}>
				<div>
					<Button
						disabled={stepState.activeStep === 0}
						onClick={handleBack}
						className={classes.button}
					>
						Back
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleNext}
						className={classes.button}
					>
						Exit
					</Button>
				</div>
			</div>
		</>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		overflow: "hidden",
		background: theme.palette.background.default,
	},
	cardaction: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginTop: theme.spacing(2),
	},
	player: {
		background: theme.palette.background.default,
		transform: "scale(0.8)",
	},
	playerDiv: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: theme.spacing(10),
		paddingBottom: theme.spacing(2),
		paddingTop: theme.spacing(2),
	},
	inshelp: {
		color: theme.palette.secondary.main,
	},
	instChip: {
		position: "absolute",
		bottom: 0,
		right: 0,
		marginBottom: theme.spacing(2),
		marginRight: theme.spacing(2),
	},
}));
