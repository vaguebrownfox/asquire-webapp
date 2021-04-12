import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { components } from "../../App";

// Context
import { Context as StepContext } from "../../context/data/StepContext";
import { Context as UserContext } from "../../context/data/UserContext";
import { Context as RecordContext } from "../../context/data/RecordContext";

// Pieces
import RecTitle from "../pieces/RecTitle";
import StimContent from "../pieces/StimContent";
import Timer from "../pieces/Timer";
import RecControl from "../pieces/RecControls";
import RecDevices from "../pieces/RecDevices";
import Worm from "../pieces/Worm";
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
	} = React.useContext(RecordContext);

	const vizRef = React.useRef();
	const { state: userState } = React.useContext(UserContext);

	React.useEffect(() => {
		recordLoadStimsAction();
		recordGetDevicesAction();
		return () => {
			console.log("record component cleanup");
		};
	}, []);

	const handleNext = () => {
		stepNextAction();
	};

	const handleBack = () => {
		stepPreviousAction();
	};

	const handleRecord = () => {
		if (recordState.isRecording) {
			recordStopAction();
		} else {
			recordStartAction(recordState.inputStream);
		}
	};

	const handleRefresh = () => {
		recordGetDevicesAction();
	};

	const handleDone = () => {
		recordUploadAction(userState.selectedUser).then(() => {
			recordNextStimAction();
		});
	};

	const { width, height } = useContainerDimensions(vizRef);

	return (
		<>
			<Card ref={vizRef} className={classes.root}>
				<Worm {...{ width, height }} />
				<CardContent>
					<RecTitle userName={userState.selectedUser?.userName} />

					<div className={classes.cardaction}>
						<StimContent stim={recordState.currentStim} />

						<Timer seconds={recordState.seconds} />

						<RecControl
							isRecording={recordState.isRecording}
							recDone={recordState.recDone}
							{...{ handleRecord, handleDone }}
						/>

						{recordState.recDone && (
							<audio
								id="player"
								className={classes.player}
								src={recordState.playUrl}
								controls
							/>
						)}
					</div>

					<RecDevices {...{ recordState, handleRefresh }} />
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
		overflow: "visible",
		height: theme.spacing(90),
		background: theme.palette.background.default,
	},
	worm: {
		zIndex: -100,
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
	},
}));
