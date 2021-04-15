// user context
import createDataContext from "../createDataContext";
import { v4 as uuid } from "uuid";

// functions
import {
	getAllUsersFromIdb,
	addUserToIdb,
	updateUserInIdb,
} from "../../functions/indexdb";
import {
	firebaseSignUp,
	firebaseSignIn,
	// firebaseSignOut,
} from "../../functions/auth";
import { firebaseUserData } from "../../functions/firestore";

// Initial State
const userInitialState = {
	loading: false,
	allUsers: [],
	selectedUser: null,
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
	stimCount: 0,
};

// Reducer
const userReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		case "SET_ALLUSERS":
			return { ...state, allUsers: action.payload, selectedUser: null };
		case "ADD_USER":
			return { ...state, allUsers: [...state.allUsers, action.payload] };
		case "SELECT_USER":
			return { ...state, selectedUser: action.payload };
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

		let res = false;
		let user = {
			...typicalUser,
			userName: userName,
			userId: `${userName}_${uuid().slice(0, 8)}`,
		};

		let uAuth = await firebaseSignUp(user.userId, user.userName); // firebase sign up
		console.log("user action log:: fb sign up", uAuth);
		uAuth && (user = await addUserToIdb(user));

		if (uAuth && user) {
			dispatch({ type: "ADD_USER", payload: user });

			dispatch({ type: "ERROR", payload: "" });
			console.log("user action log:: add user", user);
			res = true;
		} else {
			dispatch({
				type: "ERROR",
				payload: "Error adding user, try again!",
			});

			setTimeout(() => {
				dispatch({ type: "ERROR", payload: "" });
			}, 3000);
			res = false;
		}

		dispatch({ type: "SET_LOADING", payload: false });
		return res;
	};
};

const userSelectAction = (dispatch) => {
	return (user) => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("user action log :: select user");
		dispatch({ type: "SELECT_USER", payload: user });

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const userLoginAction = (dispatch) => {
	return async (user) => {
		dispatch({ type: "SET_LOADING", payload: true });
		let uAuth = null;

		if (user) {
			uAuth = await firebaseSignIn(user.userId, user.userName);
		} else {
			dispatch({
				type: "ERROR",
				payload: "You have to select an user to continue!",
			});
			setTimeout(() => {
				dispatch({ type: "ERROR", payload: "" });
			}, 5000);
		}

		dispatch({ type: "SET_LOADING", payload: false });
		return uAuth;
	};
};

const userUpdateAction = (dispatch) => {
	return async (user) => {
		dispatch({ type: "SET_LOADING", payload: true });

		user = await updateUserInIdb(user);
		user && dispatch({ type: "SELECT_USER", payload: user });

		console.log("user update action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const userUpdateCloud = (dispatch) => {
	return async (user) => {
		dispatch({ type: "SET_LOADING", payload: true });

		const data = await firebaseUserData(user);
		console.log("user action log :: fb firestore", data);

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

// const userLogoutAction = (dispatch) => {
// 	return async () => {
// 		dispatch({ type: "SET_LOADING", payload: true });
// 		let f = false;

// 		firebaseSignIn = await firebaseSignOut();

// 		if (!f) {
// 			dispatch({
// 				type: "ERROR",
// 				payload: "Log out error",
// 			});
// 			setTimeout(() => {
// 				dispatch({ type: "ERROR", payload: "" });
// 			}, 5000);
// 		} else {
// 			dispatch({ type: "SELECT_USER", payload: null });
// 		}

// 		dispatch({ type: "SET_LOADING", payload: false });
// 		return f;
// 	};
// };

// Export
export const { Context, Provider } = createDataContext(
	userReducer,
	{
		userLoadAction,
		userGetAllAction,
		userAddAction,
		userSelectAction,
		userLoginAction,
		userUpdateAction,
		userUpdateCloud,
		// userLogoutAction,
	},
	userInitialState
);
