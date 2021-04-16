import { db } from "./firebase";

export const firebaseUserData = async (data) => {
	const userDocRef = db.collection("usersV2").doc(data.userId);

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

export const activeQuery = db
	.collection("active")
	.where("online", "==", "true");

export const firebaseSetActive = async (user, stat) => {
	const docRefActive = db.collection("active").doc(user.userId);
	const data = {
		online: stat,
	};
	await docRefActive.set(data).catch((err) => {
		console.log("fb firestore active set err :: ", err);
		return null;
	});
};
