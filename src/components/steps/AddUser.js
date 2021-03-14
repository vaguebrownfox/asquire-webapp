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
			width: "25ch",
		},
	},
	submitButton: {
		maxWidth: 120,
		borderRadius: 18,
	},
}));

const AddUser = () => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography className={classes.pos} color="textSecondary">
					Select user
				</Typography>
				<UserList />
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
					/>
					<Button
						className={classes.submitButton}
						variant="contained"
						color="primary"
						submit
					>
						Add User
					</Button>
				</form>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
};

const UserList = () => {
	const classes = useStyles();
	return (
		<div className={classes.userList}>
			<List component="nav" aria-label="main mailbox folders">
				<ListItem button>
					<ListItemIcon>
						<ProfileIcon />
					</ListItemIcon>
					<ListItemText primary="userdummy" />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<ProfileIcon />
					</ListItemIcon>
					<ListItemText primary="halcyon" />
				</ListItem>
			</List>
			<Divider />
		</div>
	);
};

export default AddUser;
