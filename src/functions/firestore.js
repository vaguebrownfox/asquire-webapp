import { db } from "./firebase";

export const firebaseUserData = async (data) => {
	const userDocRef = db.collection("users").doc(data.userId);

	data = await userDocRef
		.set(data)
		.then(() => data)
		.catch((err) => {
			console.log("fb firestore error :: ", err);
			return null;
		});

	return data;
};

export const firebaseSurvey = async () => {
	const docRefSurvey = db.collection("content2").doc("survey");
	const survey = (await docRefSurvey.get()).data();
	return survey;
};

export const firebaseStims = async () => {
	const docRefSurvey = db.collection("content2").doc("stimuli");
	const stimuli = (await docRefSurvey.get()).data();
	return stimuli;
};
