this.addEventListener("message", (e) => {
	let inputChannel = e.data.channel; // input signal
	let fs = e.data.fs; // sampling frequency

	// Constants
	const ENGWP = 0.7; // Energy window
	const THRP = 0.3; // Threshold point

	const MIN_SEC = 12; // minimum seconds to sustain a phonation
	const MIN_CNT = 4; // minimum times to repeat a phonation
	const SCRDP = 0.7; // weight of duration on score
	const SCRCN = 1 - SCRDP; // weight of count on score

	// Calculate energy
	let N = Math.round(ENGWP * fs);
	let n_frames = Math.floor(inputChannel.length / N);
	let energy = new Float32Array(n_frames);
	let T = new Float32Array(n_frames);
	let max = 0;

	for (let i = 0; i < n_frames; i++) {
		let slice = inputChannel.slice(i * N, (i + 1) * N);
		let sum = slice.reduce((a, b) => a + Math.pow(b, 2));
		let mean = sum / N;
		max = mean > max ? mean : max;
		energy[i] = mean;
		T[i] = (i * N) / fs;
	}

	// Calculate threshold
	let thr = THRP * max;
	let temp = energy.map((e) => (e - thr > 0 ? 1 : -1)); // signed array
	let temp1 = temp.slice(1); // shifted array
	let temp2 = temp1.map((s, i) => temp[i] * s); // signed points

	let tint = temp2.reduce((a, s, i) => (s < 0 ? [...a, T[i]] : a), []);

	// Calculate stim count
	let count = Math.ceil(tint.length / 2);

	// Calculate average stim duration
	let time = (tint.length % 2 ? tint.slice(0, -1) : tint).reduce(
		(a, t, i, p) => (i % 2 ? a : [...a, p[i + 1] - t]),
		[]
	);
	let avg = time.reduce((s, t) => s + t, 0) / time.length;
	avg = isNaN(avg) ? 0 : avg.toFixed(1);

	// Calculate stim score
	let scoreDur = avg > MIN_SEC ? 1 : avg / MIN_SEC;
	let scoreCnt = count > MIN_CNT ? 1 : count / MIN_CNT;

	let score = ((scoreDur * SCRDP + scoreCnt * SCRCN) * 10).toFixed(1);

	postMessage({ count, avg, score });

	this.close();
});
