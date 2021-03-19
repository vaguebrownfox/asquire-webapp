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
