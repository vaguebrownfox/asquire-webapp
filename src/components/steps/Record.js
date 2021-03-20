import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {
	CardMedia,
	CircularProgress,
	IconButton,
	Tooltip,
} from "@material-ui/core";

import PlayIcon from "@material-ui/icons/PlayArrow";
import RecordStartIcon from "@material-ui/icons/Mic";
import RecordStopIcon from "@material-ui/icons/MicOff";
import SkipNextIcon from "@material-ui/icons/NavigateNext";
import SpeakerIcon from "@material-ui/icons/VolumeUpRounded";
import DropArrowIcon from "@material-ui/icons/ArrowDropDown";
import RefreshIcon from "@material-ui/icons/Refresh";
import DownloadIcon from "@material-ui/icons/ArrowDownward";
import DoneIcon from "@material-ui/icons/Done";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { components } from "../../App";

// Context
import { Context as StepContext } from "../../context/data/StepContext";
import { Context as UserContext } from "../../context/data/UserContext";
import { Context as RecordContext } from "../../context/data/RecordContext";

const useStyles = makeStyles((theme) => ({
	root: {
		background: theme.palette.background.default,
	},
	titleDiv: {
		display: "flex",
		justifyContent: "center",
		cursor: "none",
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},

	cardaction: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	media: {
		height: 255,
		width: 255,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		borderRadius: theme.spacing(1),
	},
	controls: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		justifyContent: "space-evenly",
		paddingLeft: theme.spacing(1),
		paddingBottom: theme.spacing(1),
	},
	controlIcon: {
		height: 38,
		width: 38,

		"&:hover": {
			transform: "scale(1.1)",
			cursor: "crosshair",
		},
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	buttonRefresh: {
		textTransform: "none",
		marginBottom: theme.spacing(4),
	},
	actionsContainer: {
		marginTop: theme.spacing(2),
	},
	devices: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "flex-start",
		alignContent: "flex-start",
		padding: theme.spacing(0),
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(1.25)",
		"&:hover": {
			transform: "scale(2)",
		},
	},
	deviceSelect: {
		maxWidth: theme.spacing(16),
	},
	htmlAudioPlayer: {
		display: "flex",
		flexDirection: "column",
	},
	player: {
		background: theme.palette.background.default,
	},
}));

export default function Record({ title }) {
	const classes = useStyles();
	const {
		state: stepState,
		stepNextAction,
		stepPreviousAction,
	} = React.useContext(StepContext);
	const {
		state: recordState,
		recordGetDevicesAction,
		recordStartAction,
		recordStopAction,
		recordUploadAction,
	} = React.useContext(RecordContext);
	const { state: userState } = React.useContext(UserContext);
	const bull = <span className={classes.bullet}>•</span>;

	React.useEffect(() => {
		recordGetDevicesAction();
		//recordSetInputAction(recordState.inputDevice);

		return () => {
			console.log("record component cleanup");
		};
	}, []);

	const handleNext = () => {
		// setActiveStep((prevActiveStep) => prevActiveStep + 1);
		stepNextAction();
	};

	const handleBack = () => {
		// setActiveStep((prevActiveStep) => prevActiveStep - 1);
		stepPreviousAction();
	};

	const handleRecord = () => {
		// recordGetDevicesAction();
		if (recordState.isRecording) {
			recordStopAction();
		} else {
			recordStartAction(recordState.inputStream);
		}
	};

	const handleRefresh = () => {
		recordGetDevicesAction();
	};

	const handleDone = () => {
		recordUploadAction(userState.selectedUser);
	};

	return (
		<>
			<Card className={classes.root}>
				<CardContent>
					<div className={classes.titleDiv}>
						<Typography
							className={classes.title}
							color="textSecondary"
							components="div"
							gutterBottom
						>
							{`Recording for `}
							{bull}
							{bull}
						</Typography>
						<Typography
							className={classes.title}
							color="secondary"
							components="div"
							gutterBottom
						>
							{bull}
							{` ${userState.selectedUser?.userName}`}
						</Typography>
					</div>

					<div className={classes.devices}>
						<div className={classes.deviceSelect}>
							<DeviceList
								type="input"
								devices={recordState.audioDevices.inputDevices}
								iconStart={<RecordStartIcon />}
								iconEnd={<DropArrowIcon />}
							/>
							<Typography
								color="textSecondary"
								variant="body2"
								gutterBottom
								noWrap
							>
								{`${recordState.inputDevice?.label}`}
							</Typography>
						</div>
						{recordState.loading && (
							<div className={classes.progress}>
								<CircularProgress color="secondary" size={28} />
							</div>
						)}

						<div className={classes.deviceSelect}>
							<DeviceList
								type="output"
								devices={recordState.audioDevices.outputDevices}
								iconStart={<SpeakerIcon />}
								iconEnd={<DropArrowIcon />}
							/>
							<Typography
								color="textSecondary"
								variant="body2"
								gutterBottom
								noWrap
							>
								{`${recordState.outputDevice?.label}`}
							</Typography>
						</div>
					</div>
					<IconButton
						className={classes.buttonRefresh}
						aria-label="refresh-devices"
						size="medium"
						onClick={handleRefresh}
					>
						<RefreshIcon />
					</IconButton>
					<div className={classes.cardaction}>
						<Typography
							variant="h6"
							color="textPrimary"
							gutterBottom
						>
							{`Take a deep breath and say AAA...`}
						</Typography>

						<CardMedia
							className={classes.media}
							image="https://miro.medium.com/max/1268/1*RTYreJ-PHBj2S33Eif2acA.jpeg"
							title="Contemplative Reptile"
						/>
						<div className={classes.controls}>
							<IconButton
								aria-label="previous"
								onClick={handleDone}
							>
								<Tooltip title="Done">
									<DoneIcon className={classes.controlIcon} />
								</Tooltip>
							</IconButton>
							<IconButton
								aria-label="play/pause"
								onClick={handleRecord}
							>
								<Tooltip
									title={`${
										recordState.isRecording
											? "Stop"
											: "Start"
									} recording`}
								>
									{recordState.isRecording ? (
										<RecordStopIcon
											className={classes.controlIcon}
										/>
									) : (
										<RecordStartIcon
											className={classes.controlIcon}
										/>
									)}
								</Tooltip>
							</IconButton>
							<IconButton aria-label="next">
								<Tooltip title="Next">
									<SkipNextIcon
										className={classes.controlIcon}
									/>
								</Tooltip>
							</IconButton>
						</div>
						<div className={classes.htmlAudioPlayer}>
							{recordState.recDone && (
								<>
									<audio
										id="player"
										className={classes.player}
										src={recordState.playUrl}
										controls
									/>
									<Button
										className={classes.button}
										aria-controls="download-audio"
										size="small"
										startIcon={<DownloadIcon />}
										href={recordState.playUrl}
										target="_blank"
									>
										Download
									</Button>
								</>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
			<div className={classes.actionsContainer}>
				<div>
					<Button
						disabled={stepState.activeStep === 0}
						onClick={handleBack}
						className={classes.button}
					>
						Back
					</Button>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleNext}
						className={classes.button}
					>
						{stepState.activeStep === components.length - 1
							? "Finish"
							: "Next"}
					</Button>
				</div>
			</div>
		</>
	);
}

const useDeviceListStyle = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
	},
	button: {
		textTransform: "none",
		margin: theme.spacing(1),
	},
}));

const DeviceList = ({ type, devices, iconStart, iconEnd }) => {
	const classes = useDeviceListStyle();
	const {
		state: recordState,
		recordSetInputAction,
		recordSetOutputAction,
	} = React.useContext(RecordContext);

	React.useEffect(() => {
		// recordSetInputAction(recordState.inputDevice);
		return () => {
			console.log("record component dev list cleanup");
		};
	}, []);

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelect = (dev) => {
		console.log("Record component :: device list", dev);
		switch (type) {
			case "input":
				recordSetInputAction(dev);
				break;
			case "output":
				recordSetOutputAction(dev);
				break;
			default:
				break;
		}
		setAnchorEl(null);
	};
	return (
		<div className={classes.root}>
			<Button
				className={classes.button}
				aria-controls="simple-menu"
				aria-haspopup="true"
				variant="outlined"
				onClick={handleClick}
				startIcon={iconStart}
				endIcon={iconEnd}
			></Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				{devices.map((dev, i) => (
					<MenuItem key={i} onClick={() => handleSelect(dev)}>
						{dev.label}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
};
