import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import HomeIcon from "@material-ui/icons/HomeRounded";
import AboutIcon from "@material-ui/icons/InfoRounded";
import ContactIcon from "@material-ui/icons/MailOutlineRounded";
import ConsentIcon from "@material-ui/icons/NotesRounded";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Button, ButtonGroup } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	toolbar: {
		background: theme.palette.secondary.background,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		// display: "none",
		// [theme.breakpoints.up("sm")]: {
		// 	display: "block",
		// },
		color: theme.palette.primary.main,
	},
	inputRoot: {
		color: "inherit",
	},

	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	},
	navbuttonsroot: {
		// display: "flex",
		flexDirection: "column",
		alignItems: "center",
		"& > *": {
			margin: theme.spacing(1),
		},
		display: "none",
		height: "100%",
		[theme.breakpoints.up("sm")]: {
			display: "block",
		},
	},
	navbuttons: {
		color: theme.palette.background.default,
		paddingRight: theme.spacing(4),
		paddingLeft: theme.spacing(4),
	},
	badge: {
		color: theme.palette.background.default,
	},
}));

function AsqAppBar({ title }) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const Messages = () => (
		<IconButton aria-label="show 4 new mails" color="inherit">
			<Badge badgeContent={4} color="inherit">
				<MailIcon />
			</Badge>
		</IconButton>
	);

	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
			<MenuItem onClick={handleMenuClose}>My account</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "right" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{/* <MenuItem className={classes.badge}>
				<Messages />
				<p>Messages</p>
			</MenuItem> */}

			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
			<MenuItem /*onClick={}*/>
				<IconButton
					aria-label="about"
					aria-controls="about"
					aria-haspopup="true"
					color="inherit"
				>
					<AboutIcon />
				</IconButton>
				<p>About</p>
			</MenuItem>
			<MenuItem /*onClick={}*/>
				<IconButton
					aria-label="contact"
					aria-controls="contact"
					aria-haspopup="true"
					color="inherit"
				>
					<ContactIcon />
				</IconButton>
				<p>Contact</p>
			</MenuItem>
			<MenuItem /*onClick={}*/>
				<IconButton
					aria-label="consent text"
					aria-controls="consent"
					aria-haspopup="false"
					color="inherit"
				>
					<ConsentIcon />
				</IconButton>
				<p>Consent</p>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="primary"
						aria-label="open drawer"
						onClick={() => {
							// toggleDrawer(true);
						}}
					>
						<HomeIcon />
					</IconButton>

					<Typography className={classes.title} variant="h5" noWrap>
						{title}
					</Typography>
					<div className={classes.grow} />

					<div className={classes.navbuttonsroot}>
						<ButtonGroup
							variant="text"
							className={classes.navbuttons}
							color="primary"
							aria-label="text primary button group"
						>
							<Button className={classes.navbuttons}>
								About
							</Button>
							<Button className={classes.navbuttons}>
								Consent
							</Button>
						</ButtonGroup>
					</div>

					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						{/* <Messages /> */}
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="primary"
						>
							<AccountCircle />
						</IconButton>
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="primary"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</div>
	);
}

export default AsqAppBar;
