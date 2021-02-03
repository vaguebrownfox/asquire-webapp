import React from "react";

import "./TextBox.css";

const TextBox = () => {
	return (
		<div className="tv-container">
			<div className="tv">
				<div className="tv-unit">
					<p className="tv-head">Confidentiality of records</p>
					<p className="tv-text">
						The records of this study will be kept confidential.
						Only the researchers associated with this study will be
						given access to these records.
					</p>
				</div>
				<div className="tv-unit">
					<p className="tv-head">Taking part is voluntary</p>
					<p className="tv-text">
						Taking part in this study is completely voluntary.
						Participants can pause whenever they are tired in the
						long recordings and they are free to leave recording at
						any time for any reason. Even after signing the informed
						consent form, a participant may choose to withdraw from
						recording.
					</p>
				</div>
				<div className="tv-unit">
					<p className="tv-head">Statement of Consent</p>
					<p className="tv-text">
						I have read the above information. I consent to take
						part in the study
					</p>
				</div>
			</div>
		</div>
	);
};

export default TextBox;
