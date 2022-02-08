import { db } from "./config";
import {
	addDoc,
	setDoc,
	updateDoc,
	serverTimestamp,
	collection,
	doc,
	query,
	where,
	getDocs,
} from "firebase/firestore";

export const checkUserExist = async (uid) => {
	var data = await getDocs(
		query(collection(db, "users"), where("uid", "==", uid))
	);
	return data.size > 0;
};

export const addDocument = async (collectionName, data) => {
	const dataNew = { ...data, createAt: serverTimestamp() };
	console.log(dataNew);
	await addDoc(collection(db, collectionName), dataNew);
};
export const setDocument = async (collectionName, id, data) => {
	const dataNew = { ...data, updateAt: serverTimestamp() };
	await setDoc(collection(db, collectionName, id), dataNew);
};

export const updateMember = async (id, members) => {
	await updateDoc(doc(db, "rooms", id), {
		members: members,
	});
};
