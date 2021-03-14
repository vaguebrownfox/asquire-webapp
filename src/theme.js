import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
	palette: {
		primary: {
			// main: "#BF0404",
			main: "#BF4904",
			background: `linear-gradient(45deg, #BF4904,  #BF0404)`,
			background_rev: `linear-gradient(45deg, #BF0404 ,  #BF4904)`,
			card: "#faebd7",
		},
		secondary: {
			// main: "#faebd7",
			main: "#faebd7",
		},
		white: {
			antiquewhite: "#faebd7",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: "#	F0F8FF",
		},
	},
});

export default theme;
