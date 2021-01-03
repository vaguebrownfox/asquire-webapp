// Modules
import React, { useContext, useState } from "react";
import { v4 as uuid } from "uuid";

// Styles
import "./AddUser.scss";

// Components

// Context
import { Context as UserContext } from "../../../context/data/UserContext";

const AddUser = () => {
	const { addUser } = useContext(UserContext);

	const [userName, setUserName] = useState("");

	const inputHelper = (event) => {
		var input = event.target.value.toLowerCase();
		setUserName(input.length > 8 ? input.slice(0, 8) : input);
		console.log("username: ", userName, uuid());
	};

	const addUserHelper = () => {
		if (userName.length > 0) {
			const newUser = {
				userName: userName,
				userId: userName + "_" + uuid().slice(0, 8),
				surveyDone: false,
				recordDone: false,
			};
			console.log("user: ", newUser);
			addUser(newUser);
		}
	};

	return (
		<>
			<div id="text-input">
				<input className="c-checkbox" type="checkbox" id="checkbox" />
				<div className="c-formContainer">
					<form className="c-form" action="">
						<input
							className="c-form__input"
							placeholder="Username (use a-z)"
							type="text"
							pattern="[a-z\-]+"
							onChange={inputHelper}
							value={userName}
							required
						/>
						<label
							className="c-form__buttonLabel"
							htmlFor="checkbox"
							onClick={addUserHelper}
						>
							<button className="c-form__button" type="button">
								Add
							</button>
						</label>
						<label
							className="c-form__toggle"
							htmlFor="checkbox"
							data-title="Add user"
						></label>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddUser;
