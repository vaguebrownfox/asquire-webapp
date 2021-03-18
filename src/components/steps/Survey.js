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
import { IconButton, Tooltip } from "@material-ui/core";

import SkipPreviousIcon from "@material-ui/icons/ArrowBackRounded";
import SkipNextIcon from "@material-ui/icons/ArrowForwardRounded";

import { components } from "../../App";
// Context
import { Context as StepContext } from "../../context/data/StepContext";

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
	} = React.useContext(StepContext);

	const handleNext = () => {
		// setActiveStep((prevActiveStep) => prevActiveStep + 1);
		stepNextAction();
	};

	const handleBack = () => {
		// setActiveStep((prevActiveStep) => prevActiveStep - 1);
		stepPreviousAction();
	};

	return (
		<>
			<Card className={classes.root}>
				<CardContent>
					<Question />
					<div className={classes.controls}>
						<IconButton aria-label="previous">
							<Tooltip title="Previous question">
								<SkipPreviousIcon
									className={classes.controlIcon}
								/>
							</Tooltip>
						</IconButton>
						<IconButton aria-label="next">
							<Tooltip title="Next question">
								<SkipNextIcon className={classes.controlIcon} />
							</Tooltip>
						</IconButton>
					</div>
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
};

const questionStyles = makeStyles((theme) => ({
	questionRoot: {
		margin: theme.spacing(0),
	},

	formControl: {
		margin: theme.spacing(1),
	},
}));

const Question = () => {
	const classes = questionStyles();
	const [value, setValue] = React.useState("");
	const handleRadioChange = (event) => {
		setValue(event.target.value);
	};
	return (
		<div className={classes.questionRoot}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<FormControl
					component="fieldset"
					className={classes.formControl}
				>
					<FormLabel color="secondary" component="label">
						<Typography color="textPrimary" variant="h6">
							Do you have Asthma?
						</Typography>
					</FormLabel>
					<RadioGroup
						aria-label="quiz"
						name="quiz"
						value={value}
						onChange={handleRadioChange}
					>
						<FormControlLabel
							value="best"
							color="primary"
							control={<Radio />}
							label="The best!"
						/>
						<FormControlLabel
							value="worst"
							control={<Radio />}
							label="The worst."
						/>
						<FormControlLabel
							value="best"
							color="primary"
							control={<Radio />}
							label="The best!"
						/>
						<FormControlLabel
							value="worst"
							control={<Radio />}
							label="The worst."
						/>
					</RadioGroup>
					{/* <FormHelperText>{helperText}</FormHelperText> */}
					{/* <Button
						type="submit"
						variant="outlined"
						color="primary"
						className={classes.button}
					>
						Check Answer
					</Button> */}
				</FormControl>
			</form>
		</div>
	);
};

export default Survey;
