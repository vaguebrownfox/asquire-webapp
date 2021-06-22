import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	CardMedia,
	CircularProgress,
	Collapse,
	Grow,
	IconButton,
	Tooltip,
	Typography,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/InfoOutlined";

import { stim_image_url } from "../../functions/firebaseConfig";
import { red } from "@material-ui/core/colors";
import StimProgress from "./StimProgress";

const useStyles = makeStyles((theme) => ({
	mediaDiv: {
		position: "relative",
	},
	helpIconDiv: {
		position: "absolute",
		right: 0,
		bottom: 0,
		borderRadius: "50%",
		borderTopWidth: 2,
		borderLeftWidth: 2,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderColor: theme.palette.secondary.main,
		borderStyle: "solid",
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
					image={stim_image_url}
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
			<>
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

export default StimContent;
