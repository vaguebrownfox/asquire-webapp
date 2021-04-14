import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { components } from "../../App";
// Context
import { Context as StepContext } from "../../context/data/StepContext";
import { Context as UserContext } from "../../context/data/UserContext";
import { Context as SurveyContext } from "../../context/data/SurveyContext";

// Pieces
import Question from "../pieces/Question";

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.primary.card,
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
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	radio: {
		"&$checked": {
			color: "#4B8DF8",
		},
	},
	checked: {},
	controls: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
	},
	controlIcon: {
		height: 38,
		width: 38,
	},
	actionsContainer: {
		marginTop: theme.spacing(2),
	},
}));

const Survey = () => {
	const classes = useStyles();
	const {
		state: stepState,
		stepNextAction,
		stepPreviousAction,
		stepSetAction,
	} = React.useContext(StepContext);
	const { state: surveyState, surveyLoadQuestionsAction } = React.useContext(
		SurveyContext
	);
	const {
		state: userState,
		userUpdateAction,
		userUpdateCloud,
	} = React.useContext(UserContext);

	React.useEffect(() => {
		if (userState.selectedUser.surveyDone) {
			if (stepState.previousStep < stepState.activeStep) {
				stepNextAction();
			} else if (stepState.previousStep > stepState.activeStep) {
				stepSetAction(1);
			}
		} else {
			surveyLoadQuestionsAction();
		}
		return () => {
			console.log("Survey component cleanup");
		};
	}, []);

	const handleNext = async () => {
		const user = {
			...userState.selectedUser,
			surveyDone: true,
			survey: surveyState.previousQuestions,
		};
		await userUpdateAction(user);
		await userUpdateCloud(user);
		stepNextAction();
		console.log("survey component :: user cloud update");
	};

	const handleBack = () => {
		stepPreviousAction();
	};

	return (
		<>
			<Card className={classes.root} elevation={8}>
				<CardContent>
					<Question question={surveyState.currentQuestion} />
					{userState.loading && (
						<div className={classes.progress}>
							<CircularProgress color="secondary" size={28} />
						</div>
					)}
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
					{surveyState.surveyDone && (
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
					)}
				</div>
			</div>
		</>
	);
};

export default Survey;
