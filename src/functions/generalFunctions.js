export const greetMsg = () => {
    let today = new Date();
	let curHr = today.getHours();
    let timeGreet = "Good morning! ☕";
    if (curHr < 18 && curHr >= 12) {
		timeGreet = "Good afternoon! ☀️";
	} else if (curHr >= 18) {
		timeGreet = "Good evening! 🌙";
    }
    
    return timeGreet;
}