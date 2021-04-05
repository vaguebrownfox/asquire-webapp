import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import HomeIcon from "@material-ui/icons/HomeRounded";
import AboutIcon from "@material-ui/icons/InfoRounded";
import ContactIcon from "@material-ui/icons/MailOutlineRounded";
import ConsentIcon from "@material-ui/icons/NotesRounded";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Button, ButtonGroup, Tooltip } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

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
	link: {
		textDecoration: "none",
		"&:visited": {
			color: theme.palette.primary.contrastText,
		},
	},
	avatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
		background: theme.palette.background.default,
		borderWidth: 1,
		borderColor: theme.palette.primary.contrastText,
	},
	avalink: {
		// borderWidth: 0,
	},
	avagroup: {
		marginRight: theme.spacing(2),
	},
}));

function AsqAppBar({ title, history }) {
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

	// const Messages = () => (
	// 	<IconButton aria-label="show 4 new mails" color="inherit">
	// 		<Badge badgeContent={4} color="inherit">
	// 			<MailIcon />
	// 		</Badge>
	// 	</IconButton>
	// );

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
					href="/about"
				>
					<AboutIcon />
				</IconButton>
				<a className={classes.link} href="/about">
					About
				</a>
			</MenuItem>
			<MenuItem /*onClick={}*/>
				<IconButton
					aria-label="contact"
					aria-controls="contact"
					aria-haspopup="true"
					color="inherit"
					href="/contact"
				>
					<ContactIcon />
				</IconButton>
				<a className={classes.link} href="/contact">
					Contact
				</a>
			</MenuItem>
			<MenuItem /*onClick={}*/>
				<IconButton
					aria-label="consent text"
					aria-controls="consent"
					aria-haspopup="false"
					color="inherit"
					href="/consent"
				>
					<ConsentIcon />
				</IconButton>
				<a className={classes.link} href="/consent">
					Consent
				</a>
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
						href="/"
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
							<Button
								className={classes.navbuttons}
								href="/about"
							>
								About
							</Button>
							<Button
								className={classes.navbuttons}
								href="/consent"
							>
								Consent
							</Button>
						</ButtonGroup>
					</div>
					<div className={classes.grow} />
					<AvatarGroup max={4} className={classes.avagroup}>
						<Tooltip title="Spire Lab">
							<Avatar
								alt="Spire lab logo"
								variant="circular"
								src="https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/logos%2Fspire_logo_sq.png?alt=media&token=ea586ef3-d9ea-420c-8c1b-db3130855672"
								className={classes.avatar}
							/>
						</Tooltip>
						<Tooltip title="IISc Bangalore">
							<Avatar
								alt="IISc logo"
								variant="circular"
								src="https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/logos%2Fiisc_logo_sq.png?alt=media&token=2440a351-e45b-4197-9bb3-eb342c0ac39a"
								className={classes.avatar}
								href="https://iisc.ac.in/"
							/>
						</Tooltip>
					</AvatarGroup>
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
