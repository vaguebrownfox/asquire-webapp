// Modules
import React, { useContext, useEffect } from "react";

// Styles
import "./UserList.css";

// Components
import Button from "../../../components/Button";
import Wait from "./Wait";

// Context
import { Context as UserContext } from "../../../context/data/UserContext";

const UserList = ({ history }) => {
	const { state, selectUser, restoreUsers, logInUser } = useContext(
		UserContext
	);

	useEffect(restoreUsers, []); // eslint-disable-line react-hooks/exhaustive-deps

	const nextButton = async () => {
		if (state.selectedUser) {
			const { userId: email, userName: password } = state.selectedUser;
			await logInUser(email, password)
				.then(() => {
					history.push("/survey");
				})
				.catch((e) => {
					console.log("user list next error", e);
					alert(
						"It appears there might be a network or other issue!"
					);
				});
		}
	};

	const selectHelper = (user) => {
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
			<div className="userList-wait">{state.wait && <Wait />}</div>
			<div className="radiogroup">
				{state.users.length > 0 ? (
					state.users.map((user) => addUser(user))
				) : (
					<p id="radiogroup-empty">No users yet!</p>
				)}
				{!state.wait && (
					<div id="radiogroup-btn">
						<Button buttonStyle="btn--primary" onClick={nextButton}>
							<p id="homepage-start">Next</p>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserList;
