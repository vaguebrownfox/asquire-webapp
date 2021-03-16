import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
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
	formControl: {
		margin: theme.spacing(3),
	},
	button: {
		margin: theme.spacing(1, 1, 0, 0),
	},
	radio: {
		"&$checked": {
			color: "#4B8DF8",
		},
	},
	checked: {},
}));

const Survey = () => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography
					className={classes.title}
					color="textSecondary"
					gutterBottom
				>
					{"Diagnosis with AI"}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					adjective
				</Typography>
				<Typography variant="body2" component="p">
					The future
				</Typography>
				<ErrorRadios />
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
};

function ErrorRadios() {
	const classes = useStyles();
	const [value, setValue] = React.useState("");
	const [error, setError] = React.useState(false);
	const [helperText, setHelperText] = React.useState("Choose wisely");

	const handleRadioChange = (event) => {
		setValue(event.target.value);
		setHelperText(" ");
		setError(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (value === "best") {
			setHelperText("You got it!");
			setError(false);
		} else if (value === "worst") {
			setHelperText("Sorry, wrong answer!");
			setError(true);
		} else {
			setHelperText("Please select an option.");
			setError(true);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<FormControl
				component="fieldset"
				error={error}
				className={classes.formControl}
			>
				<FormLabel component="legend">
					Pop quiz: Material-UI is...
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
				</RadioGroup>
				<FormHelperText>{helperText}</FormHelperText>
				<Button
					type="submit"
					variant="outlined"
					color="primary"
					className={classes.button}
				>
					Check Answer
				</Button>
			</FormControl>
		</form>
	);
}

export default Survey;
