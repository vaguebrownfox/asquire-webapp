import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Avatar, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "90vh",
		background: theme.palette.primary.main,
		padding: theme.spacing(4),
	},
	content: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	title: {
		fontSize: 16,
	},
	pos: {
		marginBottom: 12,
	},
	avatar: {
		width: theme.spacing(32),
		height: theme.spacing(32),
		background: theme.palette.background.default,
		borderWidth: 1,
		borderColor: theme.palette.primary.contrastText,
	},
}));

export default function Contact() {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	const copyToClipboard = (e, text) => {
		navigator.clipboard.writeText(text);
	};

	return (
		<Card className={classes.root}>
			<CardContent className={classes.content}>
				<Typography
					className={classes.title}
					color="textSecondary"
					variant="h6"
					gutterBottom
				>
					Contact us
				</Typography>
				<Avatar
					alt="Spire lab logo"
					variant="circular"
					src="https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/logos%2Fspire_logo_sq.png?alt=media&token=ea586ef3-d9ea-420c-8c1b-db3130855672"
					className={classes.avatar}
				/>
				<Typography
					// className={classes.title}
					color="secondary"
					variant="h6"
					gutterBottom
				>
					SPIRE Lab
				</Typography>
				<Tooltip title="Click to copy email" placement="right">
					<span>
						<Typography
							// className={classes.title}
							color="textPrimary"
							variant="caption"
							gutterBottom
						>
							Email:&nbsp;&nbsp;&nbsp;&nbsp;
						</Typography>
						<Typography
							// className={classes.title}
							color="textPrimary"
							variant="caption"
							gutterBottom
							onClick={(e) =>
								copyToClipboard(e, "spirelab.ee@iisc.ac.in")
							}
						>
							spirelab.ee@iisc.ac.in
						</Typography>
					</span>
				</Tooltip>
				<br />
				<br />
				<span>
					<Typography
						// className={classes.title}
						color="textPrimary"
						variant="caption"
						gutterBottom
					>
						Visit:&nbsp;&nbsp;&nbsp;&nbsp;
					</Typography>
					<a href="https://spire.ee.iisc.ac.in/spire/">
						spire.ee.iisc.ac.in/spire
					</a>
				</span>
			</CardContent>
		</Card>
	);
}
