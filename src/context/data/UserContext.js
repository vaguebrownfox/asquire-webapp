import createDataContext from "../createDataContext";
import {
	addUserToIdb,
	getUsersFromIdb,
	updateUserFromIdb,
} from "../../functions/indexdb";

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
};

// Reducer
const userReducer = (state, action) => {
	switch (action.type) {
		case "RESTORE_USERS":
			return { users: [...action.payload], selectedUser: null };
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
	return (newUser) => {
		dispatch({ type: "ADD_USER", payload: newUser });
	};
};

const selectUser = (dispatch) => {
	return (selectedUser) => {
		dispatch({ type: "SELECT_USER", payload: selectedUser });
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

// Export
export const { Context, Provider } = createDataContext(
	userReducer,
	{ addUser, restoreUsers, selectUser, updateUser },
	userStates
);
