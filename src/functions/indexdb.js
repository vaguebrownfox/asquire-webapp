import { openDB } from "idb";

const IDB = "asq-db";
const VERSION = 1;

export const USERS_STORE = "users";

export const idb = {
	userIdb: openDB(IDB, VERSION, {
		upgrade(db) {
			db.createObjectStore(USERS_STORE);
			//db.createObjectStore("store2");
		},
	}),
};

export const addUserToIdb = async (user) => {
	const db = await idb.userIdb;
	db.add(USERS_STORE, user, user.userName)
		.then((result) => {
			console.log("success!", result);
		})
		.catch((err) => {
			console.error("error: ", err);
		});
};

export const getUsersFromIdb = async () => {
	const db = await idb.userIdb;
	const users = await db.getAll(USERS_STORE);
	return users;
};

export const updateUserFromIdb = async (user) => {
	const db = await idb.userIdb;
	db.delete(USERS_STORE, user.userName).then(() => addUserToIdb(user));
};
// const demo1 = () => {
// 	openDB("db1", 1, {
// 		upgrade(db) {
// 			db.createObjectStore("store1");
// 			db.createObjectStore("store2");
// 		},
// 	});
// 	openDB("db2", 1, {
// 		upgrade(db) {
// 			db.createObjectStore("store3", { keyPath: "id" });
// 			db.createObjectStore("store4", { autoIncrement: true });
// 		},
// 	});
// };

// const demo2 = async () => {
// 	const db1 = await openDB("db1", 1);
// 	db1.add("store1", "hello world", "message");
// 	db1.add("store1", true, "delivered");
// 	db1.close();
// };

// const demo3 = async () => {
// 	const db1 = await openDB("db1", 1);
// 	db1.add("store1", "hello again!!", "new message")
// 		.then((result) => {
// 			console.log("success!", result);
// 		})
// 		.catch((err) => {
// 			console.error("error: ", err);
// 		});
// 	db1.close();
// };
