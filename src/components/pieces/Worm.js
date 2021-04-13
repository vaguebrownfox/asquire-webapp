import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";

import { analyserNode } from "../../functions/recorder";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,

		zindex: -100,

		// display: "flex",
		// flexDirection: "column-reverse",
		// justifyContent: "space-between",

		// borderWidth: 1,
		// borderColor: red[900],
		// borderStyle: "solid",
	},
	visualizer: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,

		width: "100%",
		height: "100%",
		overflow: "visible",

		// borderWidth: 1,
		// borderColor: blue[900],
		// borderStyle: "solid",
	},

	shape: {
		strokeWidth: 0.1,
		opacity: 0.95,
		zIndex: -1,

		// stroke: "black",
	},
}));
const Worm = ({ width, height, shape }) => {
	const classes = useStyles();
	const animRef = React.useRef();

	const [spectrum, setSpectrum] = React.useState({});

	const animate = () => {
		const bufferLength = analyserNode.frequencyBinCount;
		const dataArrayBuffer = new Uint8Array(bufferLength);
		analyserNode.getByteFrequencyData(dataArrayBuffer);

		let dataArray = [...dataArrayBuffer].slice(
			0,
			Math.floor(bufferLength / 3)
		);

		// dataArray = dataArray.map((d) => (d < 255 / 70 ? 0 : d));

		setSpectrum({ bins: dataArray });

		animRef.current = requestAnimationFrame(animate);
	};

	React.useEffect(() => {
		animRef.current = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(animRef.current);
			analyserNode.disconnect();
		};
	}, []);

	return (
		<>
			<div className={classes.root}>
				<svg className={classes.visualizer}>
					{/* <g transform="scale(1,-1)"> */}
					<rect
						className={classes.shape}
						x={0}
						y={0}
						width={4}
						height={4}
						fill={`hsl(${70 * 0}deg, 100%, 50%`}
					/>
					{spectrum.bins &&
						spectrum.bins.map((a, i) => {
							const bw = Math.ceil(width / spectrum.bins.length);
							const x = bw * i;
							const ynorm = a / 255;
							const r = Math.round((ynorm * height) / 8);
							const y = height;
							return (
								<>
									{shape ? (
										<circle
											key={i}
											className={classes.shape}
											cx={x}
											cy={y}
											r={r}
											fill={`hsl(${
												70 * ynorm
											}deg, 70%, 50%`}
										/>
									) : (
										<rect
											key={i}
											className={classes.shape}
											x={x}
											y={height - r}
											width={bw}
											height={r}
											fill={`hsl(${
												70 * ynorm
											}deg, 70%, 50%`}
										/>
									)}
								</>
							);
						})}
					{/* </g> */}
				</svg>
				{/* <p>{`h: ${height}px & w: ${width}px`}</p> */}
			</div>
		</>
	);
};

export default Worm;
