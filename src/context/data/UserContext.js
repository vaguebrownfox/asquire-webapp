import createDataContext from "../createDataContext";

// Initial State
const userStates = [
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
];

// Reducer
const userReducer = (state, action) => {
	switch (action.type) {
		case "ADD_USER":
			/* 
            action.payload = {
				userName: "short-name",
				userId: "short-name + uuid",
				surveyDone: true / false,
				recordDone: true / false,
            }; 
            */
			var isDup =
				state.filter(
					(user) => user.userName === action.payload.userName
				).length > 0;
			console.log("user state:", state);
			return isDup ? [...state] : [...state, action.payload];

		default:
			return state;
	}
};

// Actions
const addUser = (dispatch) => {
	return (newUser) => {
		// dispatch ADD_USER
		// const newUserX = {
		// 	userName: "kittykat69",
		// 	userId: "kittykat69-32496FFC",
		// 	surveyDone: false,
		// 	recordDone: false,
		// };
		dispatch({ type: "ADD_USER", payload: newUser });
	};
};

// Export
export const { Context, Provider } = createDataContext(
	userReducer,
	{ addUser },
	userStates
);
