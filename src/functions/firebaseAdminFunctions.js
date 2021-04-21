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

	// let stims = { ...stimulus };
	const data = await bucket.getFiles({ prefix: "instructions_audio2/" });

	let files = data[0];
	let stimsUrls = {};

	for (let file of files) {
		filename = file.name;
		// console.log(file.name);

		await file
			.getSignedUrl({ action: "read", expires: "03-17-2025" })
			.then((url) => {
				// console.log(url);
				let name = filename.replace(/^.*[\\\/]/, "").slice(0, -4);
				stimsUrls[name] = url[0];
			})
			.catch((err) => {
				console.log("url error", err);
			});
	}

	for (let i in Object.keys(stimulus)) {
		stimulus[i]["audioDescriptionLink"] = stimsUrls[stimulus[i].tag];
	}

	if (stimulus) {
		await stimRef.set(stimulus);
	}
	console.log("Done uploading stims", stimulus);
};

// setSurveyQuestions();
setStims();
