var admin = require("firebase-admin");

var serviceAccount = require("./firebaseServiceConfig.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://asquire-ch3oh.firebaseio.com",
	storageBucket: "asquire-ch3oh.appspot.com",
});

const db = admin.firestore();
const stor = admin.storage();
const bucket = stor.bucket();

const setSurveyQuestions = async () => {
	const questionRef = db.collection("content2").doc("survey");
	const { questions } = require("../fetch/questionsObj");

	if (questions) {
		await questionRef.set(questions);
	}

	console.log("Done uploading questions");
};

const setStims = async () => {
	const stimRef = db.collection("content2").doc("stimuli2");
	const { stimulus } = require("../fetch/stimulus");

	const data = await bucket.getFiles({ prefix: "instructions_audio2/" });

	let files = data[0];
	let stimsUrls = {};

	for (let file of files) {
		let url = await file
			.getSignedUrl({ action: "read", expires: "03-17-2025" })
			.catch((err) => console.log("url error", err));

		let name = file.name.replace(/^.*[\\\/]/, "").slice(0, -4);
		stimsUrls[name] = url[0];
	}

	for (let i in Object.keys(stimulus)) {
		stimulus[i]["audioDescriptionLink"] = stimsUrls[stimulus[i].tag];
	}

	if (stimulus) {
		await stimRef.set(stimulus);
		console.log("Done uploading stims", stimulus);
	} else {
		console.log("Failed uploading stims");
	}
};

// setSurveyQuestions();
setStims();
