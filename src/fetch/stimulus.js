const stimulus = {
	0: {
		sno: 0,
		imageLink: "",
		audioDescriptionLink: "",

		description: "Record your breath",
	},
	1: {
		sno: 1,
		imageLink: "",
		audioDescriptionLink: "",

		description: "Record your cough",
	},
	2: {
		sno: 2,
		imageLink: "",
		audioDescriptionLink: "",

		description:
			"Take a deep breath in and say 'Aaa' as in 'Basket'  while breathing out",
	},
	3: {
		sno: 3,
		imageLink: "",
		audioDescriptionLink: "",

		description:
			"Take a deep breath in and say 'Ooo' as in 'Horrible'  while breathing out",
	},
	4: {
		sno: 4,
		imageLink: "",
		audioDescriptionLink: "",

		description:
			"Take a deep breath in and say 'Eee' as in 'peace'  while breathing out",
	},
	5: {
		sno: 5,
		imageLink: "",
		audioDescriptionLink: "",

		description:
			"Take a deep breath in and say 'Sss' as in 'Shakira'  while breathing out",
	},
	6: {
		sno: 6,
		imageLink: "",
		audioDescriptionLink: "",

		description:
			"Take a deep breath in and say 'Uuu' as in 'You'  while breathing out",
	},
	7: {
		sno: 7,
		imageLink: "",
		audioDescriptionLink: "",

		description:
			"Take a deep breath in and say 'Zzz' as in 'Fuzz' while breathing out",
	},
	8: {
		sno: 8,
		imageLink: "",
		audioDescriptionLink: "",

		description:
			"Take a deep breath in and say 'Yee' as in 'Yeah'  while breathing out",
	},
};

const getStimObj = (array) => {
	let obj = {};

	array.forEach((s, i) => {
		obj[i] = { ...s, sno: i };
	});

	return obj;
};

const stimArray = [
	{
		label: "Breathe",
		tag: "breath",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fbreath.WAV?alt=media&token=c607da11-1ead-4cd7-9d64-42a85a356cf2",

		description: "Record your breath (Breathe through your mouth)",
	},
	{
		label: "Cough",
		tag: "cough",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fcough.WAV?alt=media&token=1bfdc549-bc07-42d9-aa2b-b7e016f541f4",

		description: "Record your cough",
	},
	{
		label: "Eee",
		tag: "ee",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fee.WAV?alt=media&token=f81b1d40-bd0d-44a7-a2eb-259a1679dcce",

		description:
			"Take a deep breath in and say 'Eee' as in 'East'  while breathing out",
	},
	{
		label: "Ooo",
		tag: "oo",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Foo.WAV?alt=media&token=08b46138-d744-48ac-87ae-314d6ba89f99",

		description:
			"Take a deep breath in and say 'Ooo' as in 'Go'  while breathing out",
	},
	{
		label: "Sss",
		tag: "ss",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fss.WAV?alt=media&token=2515b11e-ccd4-49a9-a33a-9fa77cebeb2d",

		description:
			"Take a deep breath in and say 'Sss' as in 'Snake'  while breathing out",
	},
	{
		label: "Uuu",
		tag: "uu",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fuu.WAV?alt=media&token=6e09159b-4ba0-4d71-88b5-0031553a1a6d",

		description:
			"Take a deep breath in and say 'Uuu' as in 'You'  while breathing out",
	},
	{
		label: "Yee",
		tag: "yee",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fyee.WAV?alt=media&token=23838e64-171f-4867-b236-108205c18ab8",

		description:
			"Take a deep breath in and say 'Yee' as in 'Yen'  while breathing out",
	},
	{
		label: "Zzz",
		tag: "zz",
		imageLink: "",
		audioDescriptionLink:
			"https://firebasestorage.googleapis.com/v0/b/asquire-ch3oh.appspot.com/o/instructions_audio%2Fzz.WAV?alt=media&token=aa8f5434-8879-4410-ade9-c16825ad12f9",

		description:
			"Take a deep breath in and say 'Zzz' as in 'Fuzz' while breathing out",
	},
];

module.exports = { stimulus: getStimObj(stimArray) };
