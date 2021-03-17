import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import ProfileIcon from "@material-ui/icons/AccountCircle";
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
} from "@material-ui/core";

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
}));

const getUsers = () => {
	// code to get local users - idb
	const users = [
		{
			userId: "venw-UUDIC",
			userName: "venw",
		},
		{
			userId: "halcyon-UUDIC",
			userName: "halcyon",
		},
		{
			userId: "userdummy-UUDIC",
			userName: "userdummy",
		},
	];

	return users;
};

const AddUser = () => {
	const classes = useStyles();
	const [users, setUsers] = React.useState([]);
	const [userName, setUserName] = React.useState("");

	React.useEffect(() => {
		setUsers(getUsers());
		return () => {
			console.log("Add user component cleanup");
		};
	}, []);

	const handleUserName = (e) => {
		console.log("add user", e.target.value);

		setUserName(e.target.value.toUpperCase());
	};

	const handleAddUser = (e) => {
		setUsers([
			...users,
			{ userName: userName, userId: userName + "12345" },
		]);
		setUserName("");
		console.log("add user", users);
	};

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography className={classes.pos} color="textSecondary">
					Select user
				</Typography>
				<UserList users={users} />
				<form
					className={classes.textInput}
					noValidate
					autoComplete="off"
					onSubmit={(e) => {
						e.preventDefault();
						console.log("submit");
					}}
				>
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
						submit
					>
						Add User
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

const UserList = ({ users }) => {
	const classes = useStyles();

	const [selectedUser, selectUser] = React.useState(null);

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

	const handleChange = (e) => {
		console.log("selc", e.target.value);
		selectUser({ [e.target.value]: true });
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
												selectedUser[user.userId] ||
												false
											}
											onChange={handleChange}
											name={user.userName}
											value={user.userId}
										/>
									}
									label={user.userName}
								/>
							);
						})}
				</FormGroup>
			</FormControl>
			<Divider />
		</div>
	);
};

export default AddUser;
