// Modules
import React, { useContext, useState } from "react";

// Styles
import "./BioData.css";
import "./InputText.scss";

// Components
import Button from "../../../components/Button";

// Context
import { Context as UserContext } from "../../../context/data/UserContext";

const BioData = () => {
	const { state: userState, updateUser } = useContext(UserContext);

	const [bioData, setLocalBiodata] = useState({});
	const [error, setError] = useState({ field: "", isErr: false });
	const r_name = /^([a-zA-Z]+\s?)*\s*$/; ///^[a-z A-Z]{0,30}$/;
	const r_digit = /^[\d+]{0,3}$/;
	const r_gender = /^(M|F|O)$/;

	const fields = [
		"name",
		"age (years)",
		"gender: M[ale], F[emale], O[ther]",
		"height (cm)",
		"weight (kg)",
	];

	const biodataInputHelper = (field, event) => {
		let data = event.target.value.trim();

		if (data === "") return setLocalBiodata({ ...bioData, [field]: data });

		switch (field) {
			case fields[0]: // name
				data = r_name.test(event.target.value)
					? event.target.value
					: bioData["name"]?.trim() || "";
				break;
			case fields[1]: // age
				data = r_digit.test(data) ? data : bioData["age"] || "";
				break;
			case fields[2]: // gender
				data = data.toUpperCase();
				data = r_gender.test(data) ? data : bioData["gender"] || "";
				break;
			case fields[3]: // height
				data = r_digit.test(data) ? data : bioData["height"] || "";
				break;
			case fields[4]: // weight
				data = r_digit.test(data) ? data : bioData["weight"] || "";
				break;
			default:
				return;
		}
		setLocalBiodata({ ...bioData, [field]: data });
	};

	const onOkHelper = () => {
		let f = true;
		for (let field in fields) {
			if (bioData[fields[field]]?.length > 0) {
				setError({ field: "", isErr: false });
				continue;
			} else {
				setError({ field: fields[field], isErr: true });
				f = false;
				break;
			}
		}
		if (f) {
			const { selectedUser } = userState;
			const userUp = {
				...selectedUser,
				biodataDone: true,
				bioData: bioData,
			};
			updateUser(userUp);
		}
	};

	return (
		<div>
			<h1>User Info</h1>
			<div className="biodata-container">
				{fields.map((field) => (
					<TextInput
						key={field}
						field={field}
						value={bioData[field]}
						onChangeHelper={biodataInputHelper}
					/>
				))}
				<OK onClickHelper={onOkHelper} />
			</div>
			{error.isErr && (
				<div id="biodata-error">
					Please fill <p id="biodata-error-p"> "{error.field}" </p>{" "}
					properly!
				</div>
			)}
		</div>
	);
};

const TextInput = ({ field, onChangeHelper, value }) => {
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
					value={value || ""}
					onChange={(event) => onChangeHelper(field, event)}
					required
				/>
				<label htmlFor={field} className="form__label">
					<p id="biofield">{field}</p>
				</label>
			</div>
		</div>
	);
};

const OK = ({ onClickHelper }) => {
	return (
		<div className="question-answer-ok">
			<Button buttonStyle="btn--outline" onClick={() => onClickHelper()}>
				<p id="question-answer-ok-text">OK</p>
			</Button>
		</div>
	);
};

export default BioData;
