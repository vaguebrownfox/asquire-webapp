import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Backdrop,
	Button,
	Divider,
	Fade,
	Modal,
	Typography,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import RecordStartIcon from "@material-ui/icons/FiberManualRecordRounded";
import RecordStopIcon from "@material-ui/icons/StopRounded";
import DoneIcon from "@material-ui/icons/ArrowForwardRounded";

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	modalContent: {
		backgroundColor: "rgb(255, 255, 255, 0.9)",
		border: "2px solid",
		borderColor: theme.palette.secondary.main,
		borderRadius: 8,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		width: "70%",
	},
}));

const InstructionModal = ({ modalOpen, handleClose }) => {
	const classes = useStyles();

	const [instcount, setinstcount] = React.useState(0);

	const handleContinue = () => {
		if (instcount < contents.length - 1) {
			setinstcount((p) => p + 1);
		} else {
			handleClose();
		}
	};

	React.useEffect(() => {
		if (modalOpen) {
			setinstcount(0);
		}
	}, [modalOpen]);

	const contents = [
		<NoiseInst {...{ handleContinue }} />,
		<ControlInst {...{ handleContinue }} />,
	];

	return (
		<>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				className={classes.modal}
				style={{ overflow: "scroll" }}
				open={modalOpen}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={modalOpen}>
					<div className={classes.modalContent}>
						{contents[instcount]}
					</div>
				</Fade>
			</Modal>
		</>
	);
};

const useContStyles = makeStyles((theme) => ({
	button: {
		textTransform: "none",
		marginTop: theme.spacing(4),
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(1.25)",
		"&:hover": {
			transform: "scale(2)",
		},
	},
	recIcon: {
		color: theme.palette.secondary.main,
		background: theme.palette.primary,
		boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		animation: `$glowee 3000ms ${theme.transitions.easing.easeInOut} 400ms infinite`,
		borderRadius: "50%",
	},
	divider: {
		marginBottom: theme.spacing(2),
	},
	"@keyframes glowee": {
		"0%": {
			boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		},
		"50%": {
			boxShadow: `0 0 7px 4px ${theme.palette.secondary.main}`,
		},
		"100%": {
			boxShadow: `0 0 7px 3px ${theme.palette.secondary.main}`,
		},
	},
}));
const ControlInst = ({ handleContinue }) => {
	const classes = useContStyles();

	return (
		<>
			<Typography variant="h6" component="h6" gutterBottom>
				Please read the instructions..
			</Typography>
			<div>
				{/* <Typography variant="body2" gutterBottom>
			{1}. Please make sure you are recording in a{" "}
			<b>Noiseless environment</b>
		</Typography>
		<Divider className={classes.divider} /> */}
				<Typography variant="body2" gutterBottom>
					{2}. Click <InfoIcon fontSize="default" /> to listen to{" "}
					<b>Audio Instructions after every task</b>
				</Typography>
				<Divider className={classes.divider} />
				<Typography variant="body2" gutterBottom>
					{3}. Click{"   "}
					<RecordStartIcon
						classes={{ root: classes.recIcon }}
						fontSize="default"
					/>{" "}
					to <b>Start</b> recording your voice
				</Typography>
				<Divider className={classes.divider} />
				<Typography variant="body2" gutterBottom>
					{4}. Click{"   "}
					<RecordStopIcon
						classes={{ root: classes.recIcon }}
						fontSize="default"
					/>{" "}
					to <b>Stop</b> recording your voice
				</Typography>
				<Divider className={classes.divider} />
				<Typography variant="body2" gutterBottom>
					{5}. Click <DoneIcon fontSize="default" /> to for next
					recording Task
				</Typography>
				<Divider className={classes.divider} />
				<Typography variant="body2" gutterBottom>
					{6}. Click <b>EXIT</b> after finishing all the tasks
				</Typography>{" "}
				<Divider className={classes.divider} />
			</div>
			<Button
				variant="outlined"
				color="secondary"
				onClick={handleContinue}
				className={classes.button}
			>
				Understood, continue...
			</Button>
		</>
	);
};

const NoiseInst = ({ handleContinue }) => {
	const classes = useContStyles();
	return (
		<>
			<Typography variant="h5" component="h6" gutterBottom align="center">
				Record in a Noiseless environment!
			</Typography>{" "}
			<Typography variant="body2" align="center" gutterBottom>
				Make sure your surrounding is absolutely silent and disturbance
				free!
			</Typography>
			<Divider className={classes.divider} />
			<Button
				variant="outlined"
				color="secondary"
				onClick={handleContinue}
				className={classes.button}
			>
				Understood, continue...
			</Button>
		</>
	);
};

export default InstructionModal;
