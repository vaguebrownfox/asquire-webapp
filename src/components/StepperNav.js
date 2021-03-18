import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Finish from "./steps/Finish";

// Context
import { Context as StepContext } from "../context/data/StepContext";

export default function VerticalLinearStepper({ components }) {
	const classes = useStyles();
	// const [activeStep, setActiveStep] = React.useState(0);
	const {
		state: stepState,
		stepNextAction,
		stepPreviousAction,
		stepSetAction,
	} = React.useContext(StepContext);

	React.useEffect(() => {
		// stepSetAction(1);
		return () => {
			console.log("step nav effect clean up");
		};
	});

	const handleNext = () => {
		// setActiveStep((prevActiveStep) => prevActiveStep + 1);
		stepNextAction();
	};

	const handleBack = () => {
		// setActiveStep((prevActiveStep) => prevActiveStep - 1);
		stepPreviousAction();
	};

	const handleReset = () => {
		// setActiveStep(0);
		stepSetAction(0);
	};

	return (
		<div className={classes.root}>
			<Stepper
				className={classes.stepper}
				activeStep={stepState.activeStep}
				orientation="vertical"
			>
				{components.map((item, index) => (
					<Step key={index} color="primary">
						<StepLabel>
							<Typography
								className={classes.steptitle}
								variant="body1"
								component="div"
							>
								{item.title}
							</Typography>
						</StepLabel>
						<StepContent>
							<>{item.component}</>
							{/* <div className={classes.actionsContainer}>
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
										{stepState.activeStep ===
										components.length - 1
											? "Finish"
											: "Next"}
									</Button>
								</div>
							</div> */}
						</StepContent>
					</Step>
				))}
			</Stepper>
			{stepState.activeStep === components.length && (
				<Paper square elevation={0} className={classes.resetContainer}>
					<Finish />
					<Typography>
						All steps completed - you&apos;re finished
					</Typography>
					<Button onClick={handleReset} className={classes.button}>
						Reset
					</Button>
				</Paper>
			)}
		</div>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",
		minHeight: "80vh",
		marginBottom: 32 * 3,
	},
	stepper: {
		background: theme.palette.background.default,
		iconColor: theme.palette.secondary.main,
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	resetContainer: {
		padding: theme.spacing(3),
		background: theme.palette.background.default,

		height: "100%",
	},
	steptitle: {
		display: "flex",
		textAlign: "flex-start",
		paddingLeft: theme.spacing(2),
	},
}));
