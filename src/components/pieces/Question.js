import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormHelperText from "@material-ui/core/FormHelperText";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import SkipPreviousIcon from "@material-ui/icons/ArrowBackRounded";
import SkipNextIcon from "@material-ui/icons/ArrowForwardRounded";

// Context
import { Context as SurveyContext } from "../../context/data/SurveyContext";

const Question = () => {
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

	const handleNextQuestion = () => {
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
	const handlePreviousQuestion = () => {
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
							{surveyState.loading && (
								<div className={classes.progress}>
									<CircularProgress
										color="secondary"
										size={28}
									/>
								</div>
							)}
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
												key={i}
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
						<Typography variant="h6" component="div">
							Done!
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
							<button
								submit
								className={classes.nextButton}
								onClick={handleNextQuestion}
							>
								<IconButton aria-label="next">
									<Tooltip title="Next question">
										<SkipNextIcon
											className={classes.controlIcon}
										/>
									</Tooltip>
								</IconButton>
							</button>
						)}
					</div>
				</FormControl>
			</form>
		</div>
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
		alignSelf: "center",
		justifyContent: "space-around",
		width: "100%",
		maxWidth: theme.spacing(64),
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
	nextButton: {
		background: "none",
		color: "inherit",
		border: "none",
		padding: 0,
		font: "inherit",
		cursor: "pointer",
		outline: "inherit",
	},
}));

export default Question;
