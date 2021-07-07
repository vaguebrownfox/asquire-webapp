import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	CardMedia,
	CircularProgress,
	Collapse,
	Grow,
	Hidden,
	IconButton,
	Tooltip,
	Typography,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AudioIcon from "@material-ui/icons/VolumeUp";
import VidIcon from "@material-ui/icons/YouTube";

import { stim_image_url } from "../../functions/firebaseConfig";
import { grey, red } from "@material-ui/core/colors";
import StimProgress from "./StimProgress";

const useStyles = makeStyles((theme) => ({
	tabs: {
		borderRadius: theme.spacing(8),
		marginBottom: theme.spacing(1),
		background: grey[300],
	},
	mediaDiv: {
		position: "relative",
	},
	helpIconDiv: {
		position: "absolute",
		right: 0,
		bottom: 0,
		borderRadius: "50%",
		borderWidth: 0,
		borderTopWidth: 2,
		borderLeftWidth: 2,
		borderStyle: "solid",
		borderColor: theme.palette.secondary.main,
		background: theme.palette.primary.main,
	},
	iconButton: {
		height: theme.spacing(5),
		width: theme.spacing(5),
	},
	helpIcon: {
		fontSize: theme.spacing(4),
	},
	media: {
		height: 200,
		width: 200,
		margin: theme.spacing(2),
		marginTop: theme.spacing(0),
		borderRadius: theme.spacing(1),
	},
	playerShow: {
		transform: "scale(0.8)",
	},
	stimtypo: {
		marginTop: theme.spacing(1),
		padding: theme.spacing(1),
		paddingRight: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		borderWidth: 2,
		borderRadius: 8,
		borderColor: theme.palette.secondary.main,
		borderStyle: "solid",
	},
	tagbox: {
		position: "absolute",
		top: theme.spacing(4),
		left: theme.spacing(4),
		padding: theme.spacing(1),
		borderStyle: "solid",
		borderRadius: theme.spacing(1),
		borderEndEndRadius: 0,
		borderWidth: 1,
		borderColor: red[900],
	},
}));

const StimContent = ({
	stim,
	labels,
	activeStim,
	anim,
	playRec,
	isRecording,
	isPlaying,
	modalOpen,
}) => {
	const classes = useStyles();
	const infoRef = React.useRef();

	const [instip, setInstip] = React.useState("Click! Listen to instruction");
	const [value, setValue] = React.useState("audio");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handlePlay = () => {
		if (isPlaying) {
			infoRef.current.pause();
			playRec(false);
			setInstip("Paused");
		} else {
			setInstip("Click to pause..");
			infoRef.current.play();
			playRec(true);
		}
	};

	React.useEffect(() => {
		setInstip("Click! Please listen to instruction >>");
		const stopPlay = () => {
			playRec(false);
			setInstip("Play again...");
		};
		const infoRefE = infoRef.current;
		infoRefE && infoRefE?.addEventListener("ended", stopPlay);
		infoRefE && infoRefE?.addEventListener("pause", stopPlay);
		infoRefE && infoRefE?.addEventListener("seeking", () => playRec(true));

		return () => {
			infoRefE && infoRefE?.removeEventListener("ended", stopPlay);
			infoRefE && infoRefE?.removeEventListener("pause", stopPlay);
		};
	}, [stim]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<Tabs
				className={classes.tabs}
				value={value}
				onChange={handleChange}
				indicatorColor="secondary"
				textColor="secondary"
				aria-label="instruction mode"
			>
				<Tab icon={<AudioIcon fontSize="small" />} value="audio"></Tab>
				<Tab icon={<VidIcon fontSize="small" />} value="video" />
			</Tabs>

			{value === "audio" && (
				<AudioInst
					{...{
						stim,
						handlePlay,
						instip,
						modalOpen,
						isPlaying,
						isRecording,
						infoRef,
						value,
					}}
				/>
			)}
			<Collapse in={value === "video"}>
				<VideoInst />
			</Collapse>

			{/* <StimList {...{ labels, activeStim }} /> */}
			<StimProgress {...{ labels, activeStim }} />
			<Grow in={anim}>
				{stim?.description ? (
					<Typography
						className={classes.stimtypo}
						variant="h6"
						color="textPrimary"
						gutterBottom
					>
						<b>{stim?.description}</b>
					</Typography>
				) : (
					<div className={classes.progress}>
						<CircularProgress color="secondary" size={28} />
					</div>
				)}
			</Grow>
		</>
	);
};

const AudioInst = ({
	stim,
	handlePlay,
	instip,
	modalOpen,
	isPlaying,
	isRecording,
	infoRef,
	value,
}) => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.mediaDiv}>
				<Typography
					variant="caption"
					color="textSecondary"
					component="p"
					className={classes.tagbox}
				>
					<b>{stim.label}</b>
				</Typography>

				<CardMedia
					className={classes.media}
					image={"/image/tiffy2.png"}
					title="Stimulus image"
				/>
				<div className={classes.helpIconDiv}>
					<IconButton
						aria-label="info"
						className={classes.iconButton}
						onClick={handlePlay}
						color={isPlaying ? "secondary" : "default"}
						disabled={isRecording}
					>
						<Tooltip
							title={instip}
							placement="left-end"
							open={!modalOpen}
							arrow
						>
							<InfoIcon className={classes.helpIcon} />
						</Tooltip>
					</IconButton>
				</div>
			</div>

			<Collapse in={isPlaying}>
				{true && (
					<Typography
						variant="body2"
						color="textPrimary"
						component="p"
					>
						<b>Listen to the instructions</b>
					</Typography>
				)}
			</Collapse>
			<Collapse in={isPlaying}>
				<audio
					ref={infoRef}
					className={classes.playerShow}
					src={stim?.audioDescriptionLink}
					controls
				/>
			</Collapse>
		</>
	);
};

const VideoInst = () => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.mediaDiv}>
				<video
					width="100%"
					height="240"
					autoplay
					muted
					src="https://firebasestorage.googleapis.com/v0/b/asquire-mox.appspot.com/o/instructions_video%2Fwalk%20on%20girl%20-%20everybody%20starts%20somewhere.webm?alt=media&token=f82a0833-c982-48c1-b203-f0db889db7df"
					type="video/webm"
					controls
					loop
				/>
			</div>
		</>
	);
};

export default StimContent;
