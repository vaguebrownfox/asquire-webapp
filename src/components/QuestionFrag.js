// Modules
import React from "react";

// Styles
import "./styles/QuestionFrag.css";

const QuestionFrag = ({ question, options }) => {
	return (
		<div className="questionfrag">
			<div className="question-text">
				<p>question to you?</p>
			</div>
			<p>Radio inputs</p>
			<div className="question-radio">
				<div class="container">
					<ul>
						<li>
							<input type="radio" id="f-option" name="selector" />
							<label for="f-option">Pizza</label>

							<div class="check"></div>
						</li>

						<li>
							<input type="radio" id="s-option" name="selector" />
							<label for="s-option">Bacon</label>

							<div class="check">
								<div class="inside"></div>
							</div>
						</li>

						<li>
							<input type="radio" id="t-option" name="selector" />
							<label for="t-option">Cats</label>

							<div class="check">
								<div class="inside"></div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default QuestionFrag;
