// Modules
import React from "react";

// Styles
import "./AddUser.scss";

// Components

const AddUser = () => {
	return (
		<>
			<div id="text-input">
				<input className="c-checkbox" type="checkbox" id="checkbox" />
				<div className="c-formContainer">
					<form className="c-form" action="">
						<input
							className="c-form__input"
							placeholder="Username (lowercase only)"
							type="text"
							pattern="[a-z\-]+"
							required
						/>
						<label
							className="c-form__buttonLabel"
							htmlFor="checkbox"
						>
							<button className="c-form__button" type="button">
								Add
							</button>
						</label>
						<label
							className="c-form__toggle"
							htmlFor="checkbox"
							data-title="Add"
						></label>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddUser;
