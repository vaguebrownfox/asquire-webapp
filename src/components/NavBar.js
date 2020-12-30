// Modules
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Styles
import "./styles/NavBar.css";

// Components
import Button from "./Button";

const NavBar = () => {
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
	useEffect(() => {
		showButton();
	}, []);

	window.addEventListener("resize", showButton);

	const routes = [
		{
			name: "Home",
			route: "/",
		},
		{
			name: "About",
			route: "/about",
		},
		{
			name: "Contact",
			route: "/contact",
		},
	];

	return (
		<>
			<nav className="navbar">
				<div className="navbar-container">
					<Link
						to="/"
						className="navbar-logo"
						onClick={closeMobileMenu}
					>
						{/* <i class="far fa-circle"></i> */}
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
								to="/start"
								className="nav-links-mobile"
								onClick={closeMobileMenu}
							>
								Start
							</Link>
						</li>
					</ul>
					{button && (
						<Link to="/start">
							<Button buttonStyle="btn--outline">Start</Button>
						</Link>
					)}
				</div>
			</nav>
		</>
	);
};

export default NavBar;
