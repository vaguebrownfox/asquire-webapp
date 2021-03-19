import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import {
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
} from "@material-ui/core";

import { components } from "../../App";

// Context
import { Context as StepContext } from "../../context/data/StepContext";
import { Context as UserContext } from "../../context/data/UserContext";

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
	const regxUN = /^[a-z]+(-[a-z]+)*$/;

	React.useEffect(() => {
		userGetAllAction();
		return () => {
			console.log("Add user component cleanup");
		};
	}, []);

	const handleNext = async () => {
		// setActiveStep((prevActiveStep) => prevActiveStep + 1);
		const auth = await userLoginAction(userState.selectedUser);
		console.log("add user next :: ", auth);
		auth && stepNextAction();
	};

	const handleBack = () => {
		// setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
		userName.length > 0 && userAddAction(userName);
		setUserName("");
	};

	const handleUserSelect = (user) => {
		userSelectAction(user);
	};

	return (
		<>
			<Card className={classes.root}>
				<CardContent>
					<Typography className={classes.pos} color="textSecondary">
						Select user
					</Typography>
					<UserList
						users={userState.allUsers}
						error={userState.error}
						onSelect={handleUserSelect}
					/>

					<form
						className={classes.textInput}
						noValidate
						autoComplete="off"
						onSubmit={(e) => {
							e.preventDefault();
							console.log("submit");
							handleAddUser();
						}}
					>
						{userState.loading && (
							<div className={classes.progress}>
								<CircularProgress color="secondary" size={28} />
							</div>
						)}

						<TextField
							id="outlined-basic"
							label="Enter Username"
							placeholder="only characters a-z"
							variant="standard"
							color="secondary"
							value={userName}
							onChange={handleUserName}
						/>
						<Button
							className={classes.submitButton}
							variant="contained"
							color="secondary"
							onClick={handleAddUser}
						>
							Add User
						</Button>
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

const UserList = ({ users, error, onSelect }) => {
	const classes = useStyles();
	const [selectedUser, selectUser] = React.useState({});

	React.useEffect(() => {
		let userSelect = {};
		users.forEach((u) => {
			userSelect[u.userId] = false;
		});
		selectUser(userSelect);
		return () => {
			console.log("user list component cleanup");
		};
	}, [users]);

	const handleChange = (e, user) => {
		selectUser({ [e.target.value]: true });
		onSelect(user);
	};
	return (
		<div className={classes.userList}>
			<FormControl component="fieldset" className={classes.formControl}>
				<FormGroup>
					{users &&
						users.map((user, i) => {
							return (
								<FormControlLabel
									key={i}
									control={
										<Checkbox
											icon={<ProfileIcon />}
											checkedIcon={<ProfileIcon />}
											checked={
												selectedUser[user?.userId] ||
												false
											}
											onChange={(e) =>
												handleChange(e, user)
											}
											name={user?.userName}
											value={user?.userId}
										/>
									}
									label={user.userName}
								/>
							);
						})}
				</FormGroup>
			</FormControl>

			{
				<FormHelperText error>
					<div className={classes.helpertxt}>{error}</div>
				</FormHelperText>
			}

			<Divider />
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.primary.card,
	},

	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	userList: {
		width: "100%",
		maxWidth: 240,
		marginLeft: "auto",
		marginRight: "auto",
	},
	textInput: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		alignContent: "center",
		marginTop: 32,
		"& > *": {
			margin: theme.spacing(1),
			minWidth: "20ch",
		},
	},
	submitButton: {
		maxWidth: 120,
		borderRadius: 18,
	},
	helpertxt: {
		textAlign: "center",
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	actionsContainer: {
		marginTop: theme.spacing(2),
	},
	progress: {},
}));

const AddUser = () => (
	<>
		<AddUserComponent />
	</>
);

export default AddUser;
