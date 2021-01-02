// Modules
import React from "react";

// Styles
import "./UserList.css";

// Components
import Button from "../../../components/Button";

const UserList = ({ history }) => {
	const nextButton = () => {
		history.push("/survey");
	};

	const userids = ["userdummy", "userhalcyon", "vwen", "kittykat69"]; // dummy user list

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
				{userids.map((userid) => addUser(userid))}
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
