// Modules
import React from "react";

// Styles
import "./styles/InputText.scss";

const TextInput = () => {
	return (
		<>
			<div id="text-input">
				<input class="c-checkbox" type="checkbox" id="checkbox" />
				<div class="c-formContainer">
					<form class="c-form" action="">
						<input
							class="c-form__input"
							placeholder="Username (lowercase only)"
							type="text"
							pattern="[a-z\-]+"
							required
						/>
						<label class="c-form__buttonLabel" for="checkbox">
							<button class="c-form__button" type="button">
								Add
							</button>
						</label>
						<label
							class="c-form__toggle"
							for="checkbox"
							data-title="Add"
						></label>
					</form>
				</div>
			</div>
		</>
	);
};

export default TextInput;
