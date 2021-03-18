import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { InputAdornment, MenuItem, TextField } from "@material-ui/core";

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
	textInput: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		alignContent: "center",
		"& > *": {
			margin: theme.spacing(1),
			minWidth: "20ch",
		},
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginTop: theme.spacing(2),
	},
}));

const genders = [
	{
		value: "m",
		label: "Male",
	},
	{
		value: "f",
		label: "Female",
	},
	{
		value: "o",
		label: "Other",
	},
];

const BioData = () => {
	const classes = useStyles();
	const {
		state: stepState,
		stepNextAction,
		stepPreviousAction,
	} = React.useContext(StepContext);
	const [bio, setBio] = React.useState({});

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
					<form
						className={classes.textInput}
						noValidate
						autoComplete="off"
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<TextField
							id="bio-input-name"
							label="Your name"
							placeholder=""
							variant="standard"
							color="secondary"
							value={bio.name || ""}
							onChange={(e) =>
								setBio({ ...bio, name: e.target.value })
							}
						/>
						<TextField
							id="bio-input-age"
							label="Age"
							placeholder="12 to 99"
							variant="standard"
							color="secondary"
							value={bio.age || ""}
							onChange={(e) =>
								setBio({ ...bio, age: e.target.value })
							}
						/>
						<TextField
							id="bio-input-gender"
							select
							label="Gender"
							color="secondary"
							value={bio.gender || "Select"}
							onChange={(e) =>
								setBio({ ...bio, gender: e.target.value })
							}
							variant="outlined"
							helperText="Select your gender"
						>
							{genders.map((option) => (
								<MenuItem
									key={option.value}
									value={option.value}
								>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							id="bio-input-height"
							label="Height"
							placeholder=" 62 cm  to  272 cm"
							variant="standard"
							color="secondary"
							value={bio.height || ""}
							onChange={(e) =>
								setBio({ ...bio, height: e.target.value })
							}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										cm
									</InputAdornment>
								),
							}}
						/>
						<TextField
							id="bio-input-weight"
							label="Weight"
							placeholder=""
							variant="standard"
							color="secondary"
							value={bio.weight || ""}
							onChange={(e) =>
								setBio({ ...bio, weight: e.target.value })
							}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										kg
									</InputAdornment>
								),
							}}
						/>
					</form>
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

export default BioData;
