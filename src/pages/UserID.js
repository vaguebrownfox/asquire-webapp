// Modules
import React from "react";
import { Link } from "react-router-dom";

// Styles

// Components
import Body from "../components/Body";
import AddUser from "../components/AddUser";

const UserID = ({ history }) => {
	return (
		<>
			<Body className="userid">
				<div id="body-bgoverlay">
					<h1 id="userid-title">User ID</h1>
					<AddUser history={history} />
				</div>
			</Body>
		</>
	);
};

export default UserID;
