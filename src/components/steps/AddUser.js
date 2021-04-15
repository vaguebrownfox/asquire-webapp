import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { components } from "../../App";

// Context
import { Context as StepContext } from "../../context/data/StepContext";
import { Context as UserContext } from "../../context/data/UserContext";

// Pieces
import UserList from "../pieces/UserList";
import TextInput from "../pieces/TextInput";

const AddUserComponent = () => {
	const classes = useStyles();
	const {
		state: userState,
		userGetAllAction,
		userAddAction,
		userSelectAction,
		userLoginAction,
	} = React.useContext(UserContext);
	const {
		state: stepState,
		stepNextAction,
		stepPreviousAction,
	} = React.useContext(StepContext);

	const [userName, setUserName] = React.useState("");
	const [added, setAdded] = React.useState(false);
	const regxUN = /^[a-z]+(-[a-z]+)*$/;

	React.useEffect(() => {
		userGetAllAction();
		return () => {
			console.log("Add user component cleanup");
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleNext = async () => {
		const auth = await userLoginAction(userState.selectedUser);
		console.log("add user next :: ", auth);
		auth && stepNextAction();
	};

	const handleBack = () => {
		stepPreviousAction();
	};

	const handleUserName = (e) => {
		var input = e.target.value.toLowerCase();
		input =
			regxUN.test(input) || input === ""
				? input.length > 16
					? input.slice(0, 16)
					: input
				: userName;

		setUserName(input);
	};

	const handleAddUser = (e) => {
		userName.length > 0 &&
			userAddAction(userName).then((res) => {
				if (!res) {
					setAdded(false);
				}
			});
		setUserName("");
		setAdded(true);
	};

	const handleUserSelect = (user) => {
		userSelectAction(user);
	};

	return (
		<>
			<Card className={classes.root} elevation={8}>
				<CardContent>
					<Typography className={classes.pos} color="textSecondary">
						Select user
					</Typography>

					<UserList
						users={userState.allUsers}
						error={userState.error}
						onSelect={handleUserSelect}
					/>

					<TextInput
						{...{
							added,
							userState,
							userName,
							handleAddUser,
							handleUserName,
						}}
					/>
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
					{userState.allUsers.length > 0 && (
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

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.primary.card,
	},
	pos: {
		marginBottom: 12,
	},
	submitButton: {
		maxWidth: 120,
		borderRadius: 18,
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginTop: theme.spacing(2),
	},
}));

export default AddUserComponent;
