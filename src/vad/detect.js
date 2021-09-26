const {
	OfflineAudioContext,
	AudioContext,
} = require("standardized-audio-context");
// var toWav = require("audiobuffer-to-wav");

export const detectStims = async (audioUrl, frequency = 555) => {
	const audioBuffer = await createAudioBuffer(audioUrl);

	let ch, len, fs;

	if (audioBuffer) {
		ch = audioBuffer.numberOfChannels;
		len = audioBuffer.length;
		fs = audioBuffer.sampleRate;
	} else {
		return null;
	}

	let ctx = new OfflineAudioContext(ch, len, fs);

	// Source
	let source = ctx.createBufferSource();
	source.buffer = audioBuffer;

	// Filter
	let filterNode = ctx.createBiquadFilter();
	filterNode.type = "bandpass";
	filterNode.frequency.value = frequency;
	filterNode.Q.value = 55;

	source.connect(filterNode);
	filterNode.connect(ctx.destination);

	source.start(0);
	let outputAudioBuffer = await ctx.startRendering();

	// count stims
	let channel = new Float32Array(audioBuffer.getChannelData(0));

	const res = await countStims(channel, outputAudioBuffer.sampleRate);
	console.log("filter res count", res);

	// let wavop = toWav(outputAudioBuffer);
	return res;
};

const createAudioBuffer = async (audioUrl) => {
	const arrayBuffer = await (await fetch(audioUrl)).arrayBuffer();

	if (!arrayBuffer) return null;

	let audioBuffer = null;

	try {
		audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);
	} catch (e) {
		alert(
			`Sorry, your browser doesn't support a crucial feature needed to allow you to record using your device's microphone. You should use Chrome or Firefox if you want the best audio support, and ensure you're using the *latest version* your browser of choice.`
		);
	}

	return audioBuffer;
};

// Call for Worker
const countStims = (channel, fs) =>
	new Promise((resolve, reject) => {
		var countStims = new Worker("./workers/countStimWorker.js");

		countStims.addEventListener("message", (e) => {
			resolve(e.data);
		});

		let options = {};

		countStims.postMessage({ channel, fs });
	});
