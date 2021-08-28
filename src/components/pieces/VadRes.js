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

const useStyles = makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	modalContent: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgb(255, 255, 255, 0.9)",
		border: "2px solid",
		borderColor: theme.palette.secondary.main,
		borderRadius: 8,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 2, 3),
		margin: theme.spacing(1),
	},
	button: {
		textTransform: "none",
		marginTop: theme.spacing(4),
		alignSelf: "flex-end",
	},
	divider: {
		marginBottom: theme.spacing(2),
	},
}));

const VadRes = ({ modalOpen, handleClose, vadRes }) => {
	const classes = useStyles();

	return (
		<Modal
			className={classes.modal}
			style={{ overflow: "scroll" }}
			open={modalOpen}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={modalOpen}>
				<div className={classes.modalContent}>
					<EvalRes vadRes={vadRes} />
					<Button
						variant="outlined"
						color="secondary"
						onClick={handleClose}
						className={classes.button}
					>
						Continue...
					</Button>
				</div>
			</Fade>
		</Modal>
	);
};

const EvalRes = ({ vadRes }) => {
	const classes = useStyles();
	return (
		<div>
			<Typography variant="h5" component="h6" gutterBottom align="center">
				Your recording score!
			</Typography>
			<Divider className={classes.divider} />
			<Typography variant="body1" align="center">
				{`Number of phonations detected`}
			</Typography>
			<Typography variant="h5" align="center" gutterBottom>
				<b>{vadRes.count}</b>
			</Typography>

			<Typography variant="body1" align="center">
				{`Average sustain duration`}
			</Typography>
			<Typography variant="h5" align="center" gutterBottom>
				<b>{vadRes.avg}s</b>
			</Typography>

			<Typography variant="body1" align="center">
				{`Score`}
			</Typography>
			<Typography variant="h5" align="center" gutterBottom>
				<b>{`${5}/10`}</b>
			</Typography>
		</div>
	);
};

export default VadRes;
