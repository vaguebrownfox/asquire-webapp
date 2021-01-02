// Modules
import React from "react";
import { Link } from "react-router-dom";

// Styles
import "./styles/Footer.css";

// Components

const Footer = () => {
	return (
		<div className="footer-container">
			<div className="footer-links">
				<div className="footer-link-wrapper">
					<div className="footer-link-items">
						<h2>About</h2>
						<Link to="/how">How it works?</Link>
						<Link to="/future">Future Scope</Link>
						<Link to="/consent">Consent</Link>
					</div>
					<div className="footer-link-items">
						<h2>Contact</h2>
						<Link to="/contact">Contact</Link>
						<Link to="/feedback">Feedback</Link>

						<a
							href="https://spire.ee.iisc.ac.in/"
							target="_blank"
							rel="noreferrer"
						>
							SPIRE Lab
						</a>
					</div>
				</div>
			</div>
			<section className="social-media">
				<div className="social-media-wrap">
					<div className="footer-logo">
						<Link to="/" className="social-logo">
							Asquire
						</Link>
					</div>
					<small className="website-rights">Asquire © 2021</small>
				</div>
			</section>
		</div>
	);
};

export default Footer;
