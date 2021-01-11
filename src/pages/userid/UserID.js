// Modules
import React from "react";

// Styles
import "./elements/UserID.css";

// Components
import AddUser from "./elements/AddUser";
import UserList from "./elements/UserList";

// Context

const UserID = ({ history }) => {
	return (
		<div className="useridpage">
			<div className="userid-bgoverlay">
				<h1>User ID</h1>
				<AddUser />
				<UserList history={history} />
			</div>
		</div>
	);
};

export default UserID;
