this.addEventListener("message", (e) => {
	let inputChannel = e.data.channel;
	let fs = e.data.fs; // sampling frequency

	const engwp = 0.9;
	const thrp = 0.2;

	// Calculate energy
	let N = Math.round(engwp * fs);
	let n_frames = Math.floor(inputChannel.length / N);
	let max = 0;
	let energy = new Float32Array(n_frames);
	let T = new Float32Array(n_frames);

	for (let i = 0; i < n_frames; i++) {
		let slice = inputChannel.slice(i * N, (i + 1) * N);
		// let sum = slice.reduce((a, b) => a + Math.abs(b) * 2);
		let sum = slice.reduce((a, b) => a + Math.pow(Math.abs(b), 2));
		let mean = sum / N;
		max = mean > max ? mean : max;
		energy[i] = mean;
		T[i] = i * N * fs;
	}

	// Calculate threshold
	let thr = thrp * max;
	let temp = energy.map((e) => (e - thr > 0 ? 1 : -1)); // signed array
	let temp1 = temp.slice(1); // shifted array
	let temp2 = temp1.map((s, i) => temp[i] * s); // signed points

	let time = temp2.reduce((a, s, i) => (s < 0 ? [...a, T[i]] : a), []);

	let count = Math.ceil(time.length / 2);

	console.log("count stims worker", count, time);

	postMessage({ count, time });

	this.close();
});
