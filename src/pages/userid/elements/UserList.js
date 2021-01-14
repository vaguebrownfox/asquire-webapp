// Modules
import React, { useContext, useEffect } from "react";

// Styles
import "./UserList.css";

// Components
import Button from "../../../components/Button";

// Context
import { Context as UserContext } from "../../../context/data/UserContext";

const UserList = ({ history }) => {
	const { state, selectUser, restoreUsers } = useContext(UserContext);

	useEffect(restoreUsers, []); // eslint-disable-line react-hooks/exhaustive-deps

	const nextButton = () => {
		if (state.selectedUser) history.push("/survey");
	};

	const selectHelper = (user) => {
		console.log("user list event select: ", user);
		selectUser(user);
	};

	const addUser = (user) => {
		return (
			<div className="wrapper" key={user.userName}>
				<input
					className="state"
					type="radio"
					name="users"
					id={user.userName}
					value={user.userName}
					onClick={() => selectHelper(user)}
				/>
				<label className="label" htmlFor={user.userName}>
					<div className="indicator"></div>
					<span className="text">{user.userName}</span>
				</label>
			</div>
		);
	};

	return (
		<div className="userlist-container">
			<div className="radiogroup">
				{state.users.length > 0 ? (
					state.users.map((user) => addUser(user))
				) : (
					<p id="radiogroup-empty">No users yet!</p>
				)}
				<div id="radiogroup-btn">
					<Button buttonStyle="btn--primary" onClick={nextButton}>
						<p id="homepage-start">Next</p>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default UserList;
