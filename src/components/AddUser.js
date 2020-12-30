import React from "react";

import "./AddUser.css";

import Button from "./Button";

const AddUser = () => {
	const onSubmit = () => {
		console.log("sad");
	};

	return (
		<div className="field">
			<section className="adduser-subscription">
				<div className="input-areas">
					<form onsubmit={onSubmit}>
						<input
							className="adduser-input"
							name="userid"
							type="text"
							placeholder="User ID"
						/>
						<br />
						<input
							className="adduser-usersradio"
							name="currentuser"
							type="radio"
							value="userdummy"
							placeholder="userdummy"
						/>
						<label className="adduser-label">userdummy</label>
						<br />
						<input
							className="adduser-usersradio"
							name="currentuser"
							type="radio"
							value="userdummy"
							placeholder="userdummy"
						/>
						<label className="adduser-label">userdummy</label>
					</form>
					<Button buttonStyle="btn--outline">Add</Button>
				</div>
			</section>
		</div>
	);
};

export default AddUser;
