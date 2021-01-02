// Modules
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Styles
import "./styles/NavBar.css";

// Components
import Button from "./Button";

const NavBar = () => {
	// button style states
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true);

	const handleClick = () => {
		setClick(!click);
	};
	const closeMobileMenu = () => {
		setClick(false);
	};

	const showButton = () => {
		if (window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};
	// initial render
	useEffect(() => {
		showButton();
	}, []);

	window.addEventListener("resize", showButton);

	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<Link
						to="/"
						className="navbar-logo"
						onClick={closeMobileMenu}
					>
						Asquire
					</Link>
					<div className="menu-icon" onClick={handleClick}>
						<i className={click ? "fas fa-times" : "fas fa-bars"} />
					</div>
					<ul className={click ? "nav-menu active" : "nav-menu"}>
						<li className="nav-item">
							<Link
								to="/"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/about"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								About
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/contact"
								className="nav-links"
								onClick={closeMobileMenu}
							>
								Contact
							</Link>
						</li>
						<li className="nav-item">
							<Link
								to="/userid"
								className="nav-links-mobile"
								onClick={closeMobileMenu}
							>
								Start
							</Link>
						</li>
					</ul>
					{button && (
						<Link to="/userid">
							<Button buttonStyle="btn--outline">Start</Button>
						</Link>
					)}
				</div>
			</nav>
		</>
	);
};

export default NavBar;
