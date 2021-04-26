import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { components } from "../../App";
import { firebaseSetActive } from "../../functions/firestore";

// Context
import { Context as StepContext } from "../../context/data/StepContext";
import { Context as UserContext } from "../../context/data/UserContext";
import { Context as RecordContext } from "../../context/data/RecordContext";

// Pieces
import RecTitle from "../pieces/RecTitle";
import StimContent from "../pieces/StimContent";
import Timer from "../pieces/Timer";
import RecControl from "../pieces/RecControls";
import Worm from "../pieces/Worm";
// import RecDevices from "../pieces/RecDevices";

// Hooks
import useContainerDimensions from "../../hooks/useContainerDimensions";

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
		recordUploadAction,
		recordResetAction,
	} = React.useContext(RecordContext);

	const timeoutRef = React.useRef();
	const vizRef = React.useRef();
	const { state: userState, userUpdateAction } = React.useContext(
		UserContext
	);

	const [shape, setShape] = React.useState(false);
	const handleShape = () => {
		setShape((preshape) => !preshape);
	};

	React.useEffect(() => {
		recordLoadStimsAction(userState.selectedUser);
		recordGetDevicesAction();
		firebaseSetActive(userState.selectedUser, "true");
		return () => {
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
		if (recordState.isRecording) {
			clearInterval(timeoutRef.current);
			recordStopAction();
		} else {
			recordStartAction(recordState.inputStream);
			timeoutRef.current = setTimeout(() => {
				recordStopAction();
			}, 31000);
		}
	};

	// const handleRefresh = () => {
	// 	recordGetDevicesAction();
	// };

	const handleDone = () => {
		const finishedStim = { ...recordState.currentStim };
		recordUploadAction({
			...userState.selectedUser,
			stimTag: finishedStim.tag,
		}).then(() => {
			const user = {
				...userState.selectedUser,
				stimCount: finishedStim.sno + 1,
			};
			userUpdateAction(user);
			recordNextStimAction();
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
				<CardContent>
					<RecTitle
						s={handleShape}
						userName={userState.selectedUser?.userName}
					/>

					<div className={classes.cardaction}>
						<StimContent stim={recordState.currentStim} />

						<Timer seconds={recordState.seconds} />
						<p className={classes.inshelp}>
							*Please listen to the instructions before recording.
						</p>
						<RecControl
							isRecording={recordState.isRecording}
							recDone={recordState.recDone}
							stim={recordState.currentStim}
							{...{ handleRecord, handleDone }}
						/>

						<div className={classes.playerDiv}>
							{recordState.recDone && (
								<audio
									className={classes.player}
									src={recordState.playUrl}
									controls
								/>
							)}
						</div>
					</div>

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
						{stepState.activeStep === components.length - 1
							? "Finish"
							: "Next"}
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
		alignItems: "flex-end",
		height: theme.spacing(12),
		paddingBottom: theme.spacing(2),
	},
	inshelp: {
		color: theme.palette.secondary.main,
	},
}));
