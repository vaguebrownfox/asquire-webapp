// Modules
import React from "react";

// Styles
import "./elements/UserID.css";

// Components
import AddUser from "./elements/AddUser";
import UserList from "./elements/UserList";
import TextBox from "../../components/TextBox";

// Context

const UserID = ({ history }) => {
	return (
		<div className="useridpage">
			<div className="userid-bgoverlay">
				<h1>User ID</h1>
				<AddUser history={history} />
				<UserList history={history} />
				<Instructions />
			</div>
		</div>
	);
};

const Instructions = () => {
	return (
		<TextBox>
			<ul className="instruction-list">
				<li>
					<p className="tv-text">
						Create a new profile for yourself!
					</p>
				</li>
				<li>
					<p className="tv-text">Name is used to identify ...</p>
				</li>
				<li>
					<p className="tv-text">Help to add instruction ...</p>
				</li>
			</ul>
		</TextBox>
	);
};

export default UserID;
