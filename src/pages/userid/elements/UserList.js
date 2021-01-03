// Modules
import React, { useContext } from "react";

// Styles
import "./UserList.css";

// Components
import Button from "../../../components/Button";

// Context
import { Context as UserContext } from "../../../context/data/UserContext";

const UserList = ({ history }) => {
	const { state } = useContext(UserContext);

	const nextButton = () => {
		history.push("/survey");
	};

	const userids = state || ["userdummy", "userhalcyon", "vwen", "kittykat69"]; // dummy user list

	const addUser = (userid) => {
		return (
			<div className="wrapper" key={userid}>
				<input
					className="state"
					type="radio"
					name="users"
					id={userid}
					value={userid}
				/>
				<label className="label" htmlFor={userid}>
					<div className="indicator"></div>
					<span className="text">{userid}</span>
				</label>
			</div>
		);
	};

	return (
		<div className="userlist-container">
			<div className="radiogroup">
				{userids.map((user) => addUser(user.userName))}
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
