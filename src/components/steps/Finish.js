import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Button, Collapse, IconButton } from "@material-ui/core";

import GoodMoodIcon from "@material-ui/icons/Mood";
import BadMoodIcon from "@material-ui/icons/MoodBad";
import OKMoodIcon from "@material-ui/icons/SentimentSatisfiedAltRounded";
import PagesIcon from "@material-ui/icons/Pages";

// Context
import { Context as RecordContext } from "../../context/data/RecordContext";
import { Context as VoiceContext } from "../../context/data/VoiceContext";
import { Context as UserContext } from "../../context/data/UserContext";

import useContainerDimensions from "../../hooks/useContainerDimensions";
import Worm from "../pieces/Worm";
import Voice from "../pieces/Voice";
import { lightGreen, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		background: theme.palette.background.default,
	},
	title: {
		display: "flex",
		justifyContent: "center",
		cursor: "none",
		whiteSpace: "pre-wrap",
	},
	note: {
		width: "50%",
		minWidth: theme.spacing(32),
	},
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	feedback: {
		margin: theme.spacing(1),
		fontSize: theme.spacing(6),
	},
	voice: {
		display: "flex",
		justifyContent: "center",
		width: "100%",
	},
	funIcon: {
		height: theme.spacing(8),
		width: theme.spacing(8),
		margin: theme.spacing(1),
		animation: `$spin 4096ms  infinite linear`,
	},
	"@keyframes zoomies": {
		"0%": {
			transform: "scale(1)",
		},
		"50%": {
			transform: "scale(1.1)",
		},
		"100%": {
			transform: "scale(1)",
		},
	},
	"@keyframes spin": {
		from: {
			transform: "rotate(0deg)",
		},
		to: {
			transform: "rotate(360deg)",
		},
	},
}));

export default function Finish() {
	const classes = useStyles();
	const {
		state: recordState,
		recordGetDevicesAction,
		recordStartAction,
		recordStopAction,
		recordResetAction,
	} = React.useContext(RecordContext);

	const { state: voiceState, voiceTransformAction } =
		React.useContext(VoiceContext);

	const { state: userState } = React.useContext(UserContext);

	const vizRef = React.useRef();

	const [anim, setAnim] = React.useState(false);

	const handleAnim = () => {
		setAnim(true);
	};

	React.useEffect(() => {
		return () => {
			console.log("voice cleanup");
			recordResetAction();
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const { width, height } = useContainerDimensions(vizRef, recordState);

	return (
		<Card ref={vizRef} className={classes.root} elevation={8}>
			{recordState.isRecording && (
				<Worm
					{...{
						width,
						height,
						shape: "circle",
						analyserNode: recordState.analyserNode,
					}}
				/>
			)}
			<CardContent className={classes.content}>
				<>
					<div className={classes.title}>
						<Typography
							className={classes.title}
							color="textPrimary"
							variant="h6"
							gutterBottom
						>
							<b>Thank you</b>
						</Typography>
						<Typography
							className={classes.title}
							color="secondary"
							variant="h6"
							gutterBottom
						>
							<b>{` ${userState.selectedUser.userName} `}</b>
						</Typography>
					</div>
					<Typography
						className={classes.title}
						color="textPrimary"
						variant="h6"
						gutterBottom
					>
						<b>for supporting the development of Asquire.</b>
					</Typography>

					<Typography
						className={classes.note}
						color="textPrimary"
						variant="body1"
						gutterBottom
					>
						Your data is saved
						<br /> You may close this application
						<br />
					</Typography>

					<Button
						variant="outlined"
						size="small"
						color="secondary"
						href="/feedback"
						target="_blank"
					>
						Please Give feedback!
					</Button>

					<span>
						<IconButton href="/feedback" target="_blank">
							<BadMoodIcon
								className={classes.feedback}
								fontSize="large"
								style={{ color: red[700] }}
							/>
						</IconButton>
						<IconButton
							color="secondary"
							href="/feedback"
							target="_blank"
						>
							<OKMoodIcon
								className={classes.feedback}
								fontSize="large"
							/>
						</IconButton>
						<IconButton href="/feedback" target="_blank">
							<GoodMoodIcon
								className={classes.feedback}
								fontSize="large"
								style={{ color: lightGreen[700] }}
							/>
						</IconButton>
					</span>
				</>

				<Typography
					className={classes.title}
					color="textSecondary"
					variant="body2"
					gutterBottom
				>
					Here's something fun!
				</Typography>

				{!anim && (
					<IconButton
						className={classes.funIcon}
						color="secondary"
						onClick={handleAnim}
					>
						<PagesIcon className={classes.feedback} />
					</IconButton>
				)}

				<Collapse in={anim}>
					<div className={classes.voice}>
						<Voice
							{...{
								recordState,
								voiceState,
								userState,
								recordGetDevicesAction,
								recordStartAction,
								recordStopAction,
								voiceTransformAction,
							}}
						/>
					</div>
				</Collapse>
			</CardContent>
		</Card>
	);
}
