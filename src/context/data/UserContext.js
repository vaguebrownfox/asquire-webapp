// user context
import createDataContext from "../createDataContext";
import { v4 as uuid } from "uuid";

// functions
import { getAllUsersFromIdb, addUserToIdb } from "../../functions/indexdb";
import { firebaseSignIn, firebaseSignUp } from "../../functions/auth";

// Initial State
const userInitialState = {
	loading: false,
	allUsers: [],
	error: "",
};

// User Attributes
const typicalUser = {
	userName: "",
	userId: "",
	stepCount: 1,
	bioDataDone: false,
	surveyDone: false,
	recordCount: 0,
	recordingDone: false,
};

// Reducer
const userReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "SET_ALLUSERS":
			return { ...state, allUsers: action.payload };
		case "ADD_USER":
			return { ...state, allUsers: [...state.allUsers, action.payload] };
		case "ERROR":
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

// Actions

const userLoadAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("user action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const userGetAllAction = (dispatch) => {
	return async () => {
		dispatch({ type: "SET_LOADING", payload: true });

		const allUsers = await getAllUsersFromIdb();
		console.log("user action log:: all users", allUsers);
		if (allUsers.length === 0) {
			dispatch({
				type: "ERROR",
				payload: "no users exist, create an user!",
			});
		} else {
			dispatch({ type: "SET_ALLUSERS", payload: allUsers });
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const userAddAction = (dispatch) => {
	return async (userName) => {
		dispatch({ type: "SET_LOADING", payload: true });

		let user = {
			...typicalUser,
			userName: userName,
			userId: `${userName}_${uuid().slice(0, 8)}`,
		};

		let uAuth = await firebaseSignUp(user.userId, user.userName);
		user = await addUserToIdb(user);

		if (uAuth && user !== null) {
			dispatch({ type: "ADD_USER", payload: user });

			dispatch({ type: "ERROR", payload: "" });
			console.log("user action log:: add user", user);
		} else {
			dispatch({
				type: "ERROR",
				payload: "Error adding user, try again!",
			});
			setTimeout(() => {
				dispatch({ type: "ERROR", payload: "" });
			}, 3000);
		}

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	userReducer,
	{
		userLoadAction,
		userGetAllAction,
		userAddAction,
	},
	userInitialState
);
