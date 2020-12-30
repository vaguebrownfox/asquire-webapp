// Modules
import React from "react";
import { Link } from "react-router-dom";

// Styles
import "./styles/Footer.css";

// Components

const Footer = () => {
	return (
		<div className="footer-container">
			<div class="footer-links">
				<div className="footer-link-wrapper">
					<div class="footer-link-items">
						<h2>About</h2>
						<Link to="/sign-up">How it works?</Link>
						<Link to="/">Future Scope</Link>
						<Link to="/">Consent Letter</Link>
					</div>
					<div class="footer-link-items">
						<h2>Contact</h2>
						<Link to="/">Contact</Link>
						<Link to="/">Feedback</Link>
						<Link to="/">SPIRE Lab</Link>
					</div>
				</div>
			</div>
			<section class="social-media">
				<div class="social-media-wrap">
					<div class="footer-logo">
						<Link to="/" className="social-logo">
							Asquire
							{/* <i class="fab fa-typo3" /> */}
						</Link>
					</div>
					<small class="website-rights">Asquire © 2021</small>
				</div>
			</section>
		</div>
	);
};

export default Footer;
