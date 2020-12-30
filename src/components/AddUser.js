// Modules
import React from "react";

// Styles
import "./styles/AddUser.css";
import "./styles/InputText.scss";

// Components
import Button from "../components/Button";
import TextInput from "../components/TextInput";

const AddUser = ({ history }) => {
	const nextButton = () => {
		history.push("/survey");
	};

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
				<label className="label" for={userid}>
					<div className="indicator"></div>
					<span className="text">{userid}</span>
				</label>
			</div>
		);
	};

	const userids = ["userdummy", "userhalcyon", "vwen", "kittykat69"];
	return (
		<div id="adduser-container">
			<div class="radiogroup">
				<TextInput />
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

export default AddUser;
