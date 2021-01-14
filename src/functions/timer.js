export const time = (secs) => {
	var min = Math.floor(secs / 60);
	var sec = Math.floor(secs % 60);
	if (sec < 10) {
		return `0${min}:0${sec}`;
	} else {
		return `0${min}:${sec}`;
	}
};
