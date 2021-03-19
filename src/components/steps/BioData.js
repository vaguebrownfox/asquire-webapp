import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {
	CircularProgress,
	FormHelperText,
	InputAdornment,
	MenuItem,
	TextField,
} from "@material-ui/core";

import { components } from "../../App";
// Context
import { Context as StepContext } from "../../context/data/StepContext";
import { Context as UserContext } from "../../context/data/UserContext";

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.primary.card,
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
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
	helpertxt: {
		textAlign: "center",
		paddingBottom: theme.spacing(2),
	},
}));

const fields = ["name", "age", "gender", "height", "weight"];

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

const r_name = /^([a-zA-Z]+\s?)*\s*$/; ///^[a-z A-Z]{0,30}$/;
const r_digit = /^[\d+]{0,3}$/;
const r_gender = /^(m|f|o)$/;

const BioData = () => {
	const classes = useStyles();
	const {
		state: stepState,
		stepNextAction,
		stepPreviousAction,
		stepSetAction,
	} = React.useContext(StepContext);
	const { state: userState, userUpdateAction } = React.useContext(
		UserContext
	);
	const [bio, setBio] = React.useState({});
	const [error, setError] = React.useState({ field: "", isErr: false });

	React.useEffect(() => {
		if (userState.selectedUser.bioDataDone) {
			if (stepState.previousStep < stepState.activeStep) {
				stepNextAction();
			} else if (stepState.previousStep > stepState.activeStep) {
				stepSetAction(1);
			}
		}
		return () => {
			console.log("Bio data component cleanup");
		};
	}, []);

	const handleNext = async () => {
		if (onNextHelper()) {
			const user = {
				...userState.selectedUser,
				bioDataDone: true,
				bio,
			};
			await userUpdateAction(user);

			stepNextAction();
		}
		console.info("bio data component next :: bio ", bio);
	};

	const handleBack = () => {
		// setActiveStep((prevActiveStep) => prevActiveStep - 1);
		stepPreviousAction();
	};

	// inputs handles
	const handleInputs = (type, event) => {
		let data = event.target.value.trim();

		if (data === "") return setBio({ ...bio, [type]: data });

		switch (type) {
			case fields[0]: // name
				data = r_name.test(event.target.value)
					? event.target.value
					: bio["name"]?.trim() || "";
				break;
			case fields[1]: // age
				data = r_digit.test(data) ? data : bio["age"] || "";
				break;
			case fields[2]: // gender
				// data = data.toUpperCase();
				data = r_gender.test(data) ? data : bio["gender"] || "";
				console.log("handle inputh data", data);
				break;
			case fields[3]: // height
				data = r_digit.test(data) ? data : bio["height"] || "";
				break;
			case fields[4]: // weight
				data = r_digit.test(data) ? data : bio["weight"] || "";
				break;
			default:
				return;
		}
		setBio({ ...bio, [type]: data });
	};

	const onNextHelper = () => {
		let f = true;

		for (let field in fields) {
			if (bio[fields[field]]?.length > 0) {
				setError({ field: "", isErr: false });
				continue;
			} else {
				setError({ field: fields[field], isErr: true });
				f = false;
				break;
			}
		}

		return f;
		// if (f) {
		// 	const { selectedUser } = userState;
		// 	const userUp = {
		// 		...selectedUser,
		// 		biodataDone: true,
		// 		bioData: bioData,
		// 	};
		// 	updateUser(userUp);
		// }
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
								// setBio({ ...bio, name: e.target.value })
								handleInputs(fields[0], e)
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
								// setBio({ ...bio, age: e.target.value })
								handleInputs(fields[1], e)
							}
						/>
						<TextField
							id="bio-input-gender"
							select
							label="Gender"
							color="secondary"
							value={bio.gender || "x"}
							onChange={(e) =>
								// setBio({ ...bio, gender: e.target.value })
								handleInputs(fields[2], e)
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
								// setBio({ ...bio, height: e.target.value })
								handleInputs(fields[3], e)
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
								// setBio({ ...bio, weight: e.target.value })
								handleInputs(fields[4], e)
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
				{error.isErr && (
					<FormHelperText error>
						<div
							className={classes.helpertxt}
						>{`Please fill ${error.field} properly`}</div>
					</FormHelperText>
				)}
				{userState.loading && (
					<div className={classes.progress}>
						<CircularProgress color="secondary" />
					</div>
				)}
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
