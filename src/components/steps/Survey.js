import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {
	FormHelperText,
	IconButton,
	TextField,
	Tooltip,
} from "@material-ui/core";

import SkipPreviousIcon from "@material-ui/icons/ArrowBackRounded";
import SkipNextIcon from "@material-ui/icons/ArrowForwardRounded";

import { components } from "../../App";
// Context
import { Context as StepContext } from "../../context/data/StepContext";
import { Context as UserContext } from "../../context/data/UserContext";
import { Context as SurveyContext } from "../../context/data/SurveyContext";

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
	const { state: userState, userUpdateAction } = React.useContext(
		UserContext
	);

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
		console.info("survey component :: surveystate", surveyState);
		return () => {
			console.log("Survey component cleanup");
		};
	}, []);

	const handleNext = async () => {
		// setActiveStep((prevActiveStep) => prevActiveStep + 1);

		const user = {
			...userState.selectedUser,
			surveyDone: true,
			survey: surveyState.previousQuestions,
		};
		await userUpdateAction(user);
		stepNextAction();
		console.log("survey component :: surveystate", surveyState);
	};

	const handleBack = () => {
		// setActiveStep((prevActiveStep) => prevActiveStep - 1);
		stepPreviousAction();
	};

	return (
		<>
			<Card className={classes.root}>
				<CardContent>
					<Question question={surveyState.currentQuestion} />
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

const questionStyles = makeStyles((theme) => ({
	questionRoot: {
		margin: theme.spacing(0),
	},
	form: {
		display: "flex",
		flexDirection: "column",
		marginLeft: "auto",
	},

	formControl: {
		margin: theme.spacing(1),
	},
	controls: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
	},
	controlIcon: {
		height: 38,
		width: 38,
	},
	helpertxt: {
		textAlign: "center",
		paddingBottom: theme.spacing(2),
	},
	ansinput: {
		alignSelf: "center",
		maxWidth: theme.spacing(32),
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
}));

const Question = ({ question, onSelect }) => {
	const classes = questionStyles();
	const {
		state: surveyState,
		surveyNextQuestionAction,
		surveyPreviousQuestionAction,
	} = React.useContext(SurveyContext);

	const [value, setValue] = React.useState("");
	const [error, setError] = React.useState("");

	const handleRadioChange = (event) => {
		let selectedAnswer = event.target.value;
		setValue(selectedAnswer);
		console.log("survey component question :: select", event.target.value);
	};

	const handleNextQuestion = (e, question) => {
		if (value !== "") {
			const answeredQuestion = {
				...surveyState.currentQuestion,
				answer: value,
			};
			console.log("survey component :: next ques", surveyState);
			surveyNextQuestionAction(answeredQuestion);
			setError("");
		} else {
			setError("Answer required*");
		}
		setValue("");
	};
	const handlePreviousQuestion = (e) => {
		console.info("survey component :: prev ques", surveyState);
		surveyPreviousQuestionAction();
	};

	return (
		<div className={classes.questionRoot}>
			<form
				className={classes.form}
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<FormControl
					component="fieldset"
					className={classes.formControl}
				>
					{!surveyState.surveyDone ? (
						<>
							<FormLabel color="secondary" component="label">
								<Typography color="textPrimary" variant="h6">
									{surveyState.currentQuestion?.question}
								</Typography>
							</FormLabel>
							{surveyState.currentQuestion?.options.length >
								0 && (
								<RadioGroup
									className={classes.ansinput}
									aria-label="quiz"
									name="quiz"
									value={value}
									onChange={handleRadioChange}
								>
									{surveyState.currentQuestion?.options.map(
										(option, i) => (
											<FormControlLabel
												id={
													option +
													surveyState.currentQuestion
														?.qno
												}
												value={option}
												color="primary"
												control={<Radio />}
												label={option}
											/>
										)
									)}
								</RadioGroup>
							)}
							{surveyState.currentQuestion?.options.length ===
								0 && (
								<TextField
									className={classes.ansinput}
									id="survey-question-answer"
									label="Answer"
									placeholder="Enter your answer"
									variant="outlined"
									color="secondary"
									value={value}
									onChange={handleRadioChange}
								/>
							)}
						</>
					) : (
						<Typography variant="h6" component="tbody">
							Done
						</Typography>
					)}
					<FormHelperText error>
						<div className={classes.helpertxt}>{error}</div>
					</FormHelperText>
					{/* <Button
						type="submit"
						variant="outlined"
						color="primary"
						className={classes.button}
					>
						Check Answer
					</Button> */}
					<div className={classes.controls}>
						<IconButton
							aria-label="previous"
							onClick={handlePreviousQuestion}
						>
							<Tooltip title="Previous question">
								<SkipPreviousIcon
									className={classes.controlIcon}
								/>
							</Tooltip>
						</IconButton>
						{!surveyState.surveyDone && (
							<IconButton
								submit
								aria-label="next"
								onClick={handleNextQuestion}
							>
								<Tooltip title="Next question">
									<SkipNextIcon
										className={classes.controlIcon}
									/>
								</Tooltip>
							</IconButton>
						)}
					</div>
				</FormControl>
			</form>
		</div>
	);
};

export default Survey;
