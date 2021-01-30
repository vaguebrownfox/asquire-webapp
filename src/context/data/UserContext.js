import createDataContext from "../createDataContext";
import {
	addUserToIdb,
	getUsersFromIdb,
	updateUserFromIdb,
} from "../../functions/indexdb";

import firebase from "../../functions/firebase";
require("firebase/auth");

// Initial State
const userStates = {
	users: [
		{
			userName: "venw",
			userId: "venw-3243ADFE",
			surveyDone: false,
			recordDone: false,
		},
		{
			userName: "halcyon",
			userId: "halcyon-3243ADFE",
			surveyDone: false,
			recordDone: false,
		},
	],
	selectedUser: null,
	authUser: null,
	wait: false,
};

// Reducer
const userReducer = (state, action) => {
	switch (action.type) {
		case "RESTORE_USERS":
			return {
				users: [...action.payload],
				selectedUser: null,
				authUser: null,
				wait: false,
			};
		case "ADD_USER":
			var isDup =
				state.users.filter(
					(user) => user.userName === action.payload.userName
				).length > 0;
			console.log("user state:", state);
			if (!isDup) addUserToIdb(action.payload); // add to indexdb
			var users = isDup
				? [...state.users]
				: [...state.users, action.payload];
			return { ...state, users };
		case "SELECT_USER":
			return { ...state, selectedUser: action.payload };
		case "AUTH_USER":
			return { ...state, authUser: action.payload };
		case "WAIT":
			return { ...state, wait: action.payload };
		default:
			return state;
	}
};

// Actions
const restoreUsers = (dispatch) => {
	return async () => {
		const users = await getUsersFromIdb();
		console.log("user context cunt ", users);
		dispatch({ type: "RESTORE_USERS", payload: users });
	};
};

const addUser = (dispatch) => {
	return async (newUser) => {
		dispatch({ type: "WAIT", payload: true });
		await firebaseSignUp(newUser.userId, newUser.userName).then((user) => {
			user && dispatch({ type: "ADD_USER", payload: newUser });
			console.log("add user", user);
			dispatch({ type: "WAIT", payload: false });
		});
	};
};

const selectUser = (dispatch) => {
	return (selectedUser) => {
		dispatch({ type: "SELECT_USER", payload: selectedUser });
	};
};

const logInUser = (dispatch) => {
	return async (email, password) => {
		dispatch({ type: "WAIT", payload: true });
		await firebaseSignIn(email, password).then((user) => {
			console.log("log in user", user);
			if (user) {
				dispatch({ type: "AUTH_USER", payload: user });
			} else {
				dispatch({ type: "WAIT", payload: false });
			}
		});
	};
};

const updateUser = (dispatch) => {
	return async (user) => {
		updateUserFromIdb(user).then(() => {
			restoreUsers(dispatch);
			dispatch({ type: "SELECT_USER", payload: user });
		});
	};
};

const firebaseSignUp = async (email, password) => {
	email = email + "@asquire.spire";
	password = password + "asquire";
	const userCredential = await firebase
		.auth()
		.createUserWithEmailAndPassword(email, password);
	return userCredential.user;
};

const firebaseSignIn = async (email, password) => {
	email = email + "@asquire.spire";
	password = password + "asquire";
	const userCredential = await firebase
		.auth()
		.signInWithEmailAndPassword(email, password);
	return userCredential.user;
};

// Export
export const { Context, Provider } = createDataContext(
	userReducer,
	{ addUser, restoreUsers, selectUser, updateUser, logInUser },
	userStates
);
