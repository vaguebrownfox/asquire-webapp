import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		background: theme.palette.primary.card,
		margin: theme.spacing(4),
	},
	bullet: {
		display: "inline-block",
		margin: "0 2px",
		transform: "scale(0.8)",
	},
	key: {
		margin: theme.spacing(1),
	},
	value: {
		fontSize: 22,
	},
	content: {
		display: "flex",
		justifyContent: "space-around",
	},
	span: {
		textDecoration: "none",
		textTransform: "none",
		width: "100%",
	},
}));

export default function Status({ title }) {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<Card className={classes.root}>
			<CardContent className={classes.content}>
				<Grid container spacing={2}>
					<Grid item xl={4} md={4} xs={12}>
						<Button
							className={classes.span}
							variant="outlined"
							color="secondary"
						>
							<Typography
								className={classes.key}
								color="textPrimary"
								variant="h6"
								component="div"
								gutterBottom
							>
								Data received so far:
							</Typography>
							<Button
								className={classes.value}
								color="secondary"
								variant="text"
							>
								{106}
							</Button>
						</Button>
					</Grid>
					<Grid item xl={4} md={4} sm={12}>
						<Button
							className={classes.span}
							variant="outlined"
							color="secondary"
						>
							<Typography
								className={classes.key}
								color="textPrimary"
								variant="h6"
								component="div"
								gutterBottom
							>
								Users recording right now:
							</Typography>
							<Button
								className={classes.value}
								color="secondary"
								variant="text"
							>
								{12}
							</Button>
						</Button>
					</Grid>
					<Grid item xl={4} md={4} xs={12}>
						<Button
							className={classes.span}
							variant="outlined"
							color="secondary"
						>
							<Typography
								className={classes.key}
								color="textPrimary"
								variant="h6"
								component="div"
								gutterBottom
							>
								Data required:
							</Typography>
							<Button
								className={classes.value}
								color="secondary"
								variant="text"
							>
								{1000}
							</Button>
						</Button>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}
