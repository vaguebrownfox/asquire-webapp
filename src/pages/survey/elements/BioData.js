// Modules
import React, { useContext, useState } from "react";

// Styles
import "./BioData.css";
import "./InputText.scss";

// Components
import Button from "../../../components/Button";

// Context
import { Context as SurveyContext } from "../../../context/data/SurveyContext";

const BioData = () => {
	const [bioData, setBiodata] = useState({});

	const biodataInputHelper = (field, event) => {
		setBiodata({ ...bioData, [field]: event.target.value });
	};

	return (
		<div>
			<h1>Bio Data</h1>
			<div className="biodata-container">
				<TextInput field="name" />
				<TextInput field="age" />
				<TextInput field="height" />
				<TextInput field="weight" />
				<OK />
			</div>
		</div>
	);
};

const TextInput = ({ field }) => {
	return (
		<div className="question-answer">
			<div className="form__group field">
				<input
					type="input"
					className="form__field"
					placeholder="text"
					name="name"
					autoComplete="off"
					id={field}
					// onChange={(event) => inputTextHelper(event)}
					required
				/>
				<label htmlFor={field} className="form__label">
					<p id="#biofield">{field}</p>
				</label>
			</div>
		</div>
	);
};

const OK = ({ onOK }) => {
	return (
		<div className="question-answer-ok">
			<Button
				buttonStyle="btn--outline"
				// onClick={() => inputTextOk()}
			>
				<p id="question-answer-ok-text">OK</p>
			</Button>
		</div>
	);
};

export default BioData;
