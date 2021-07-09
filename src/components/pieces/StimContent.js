import React from "react";
import ReactMarkdown from "react-markdown";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import AudioIcon from "@material-ui/icons/VolumeUp";
import VidIcon from "@material-ui/icons/YouTube";
import { grey, red } from "@material-ui/core/colors";

import StimProgress from "./StimProgress";
import Toggle from "./Toggle";

const useStyles = makeStyles((theme) => ({
	tabs: {
		borderRadius: theme.spacing(8),
		marginBottom: theme.spacing(1),
		background: grey[300],
	},
	mediaDiv: {
		position: "relative",
		maxWidth: theme.spacing(64),
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
		marginTop: theme.spacing(1, 0, 0, 0),
		padding: theme.spacing(1, 2),
		border: "2px solid",
		borderRadius: 8,
		borderColor: theme.palette.secondary.main,
	},
	tagbox: {
		position: "absolute",
		top: theme.spacing(4),
		left: theme.spacing(4),
		padding: theme.spacing(1),
		borderWidth: "1px solid",
		borderRadius: theme.spacing(1),
		borderEndEndRadius: 0,
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
	const infoRefVid = React.useRef();

	const [instip, setInstip] = React.useState("Click! Listen to instruction");
	const [value, setValue] = React.useState(false);

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

	const handlePlayVid = (play) => {
		if (!play) {
			infoRefVid.current.pause();
			playRec(false);
		} else {
			infoRefVid.current.play();
			playRec(true);
		}
	};

	const handleChange = (_, newValue) => {
		playRec(false);
		if (newValue) {
			handlePlayVid(true);
		} else {
			handlePlayVid(false);
		}
		setValue(newValue);
	};

	React.useEffect(() => {
		setInstip("Click! Please listen to instruction >>");
		const stopPlay = () => {
			playRec(false);
			setInstip("Play again...");
		};
		const infoRefE = infoRef.current;
		if (infoRefE) {
			infoRefE?.addEventListener("ended", stopPlay);
			infoRefE?.addEventListener("pause", stopPlay);
			infoRefE?.addEventListener("seeking", () => playRec(true));
		}

		const infoRefEVid = infoRefVid.current;
		if (infoRefEVid) {
			infoRefEVid?.addEventListener("ended", stopPlay);
			infoRefEVid?.addEventListener("pause", stopPlay);
			infoRefEVid?.addEventListener("seeking", () => playRec(true));
			infoRefEVid?.addEventListener("playing", () => playRec(true));
		}

		return () => {
			if (infoRefE) {
				infoRefE?.removeEventListener("ended", stopPlay);
				infoRefE?.removeEventListener("pause", stopPlay);
				infoRefE?.removeEventListener("seeking", stopPlay);
			}
			if (infoRefEVid) {
				infoRefEVid?.removeEventListener("ended", stopPlay);
				infoRefEVid?.removeEventListener("pause", stopPlay);
				infoRefEVid?.removeEventListener("seeking", stopPlay);
				infoRefEVid?.removeEventListener("playing", stopPlay);
			}
		};
	}, [stim]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<Grid
				component="label"
				container
				alignItems="center"
				justify="center"
				spacing={1}
			>
				<Grid item>
					<AudioIcon />
				</Grid>
				<Grid item>
					<Toggle
						checked={value}
						onChange={handleChange}
						name="checkedB"
					/>
				</Grid>
				<Grid item>
					<VidIcon />
				</Grid>
			</Grid>

			{!value && (
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
			<Collapse in={value}>
				<VideoInst {...{ infoRefVid }} />
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
						<ReactMarkdown>{stim?.description}</ReactMarkdown>
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

const VideoInst = ({ infoRefVid }) => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.mediaDiv}>
				<video
					ref={infoRefVid}
					width="100%"
					height="240"
					autoPlay
					muted
					src="https://firebasestorage.googleapis.com/v0/b/asquire-mox.appspot.com/o/instructions_video%2Fwalk%20on%20girl%20-%20everybody%20starts%20somewhere.webm?alt=media&token=f82a0833-c982-48c1-b203-f0db889db7df"
					type="video/webm"
					controls
				/>
			</div>
		</>
	);
};

export default StimContent;
