// Modules
import React from "react";
import { Link } from "react-router-dom";

// Styles
import "./styles/Footer.css";
import spire_logo from "./styles/spire_logo.220a5df8.png";
import iisc_logo from "./styles/iisc_logo.5b38dc86.png";

// Components

const Footer = () => {
	return (
		<div className="footer-container">
			<div className="footer-links">
				<div className="footer-link-wrapper">
					<div className="footer-link-items">
						<a
							href="https://spire.ee.iisc.ac.in/"
							target="_blank"
							rel="noreferrer"
						>
							<img
								className="logos"
								src={spire_logo}
								alt="spire_lab"
							/>
						</a>
					</div>
					<div className="footer-link-items">
						<h2>About</h2>
						<Link to="/how">How it works?</Link>
						<Link to="/future">Future Scope</Link>
						<Link to="/conditions">Consent</Link>
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
					<div className="footer-link-items">
						<a
							href="https://www.iisc.ac.in/"
							target="_blank"
							rel="noreferrer"
						>
							<img
								className="logos"
								src={iisc_logo}
								alt="iisc_bangalore"
							/>
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
