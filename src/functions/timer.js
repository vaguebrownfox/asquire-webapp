export const time = (secs) => {
	var min = Math.floor(secs / 60) || 0;
	var sec = Math.floor(secs % 60) || 0;
	if (sec < 10) {
		return `0${min}:0${sec}`;
	} else {
		return `0${min}:${sec}`;
	}
};
