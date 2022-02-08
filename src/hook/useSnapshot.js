import React from "react";
import { db } from "../firebase/config";
import {
	collection,
	onSnapshot,
	query,
	where,
	orderBy,
} from "firebase/firestore";

/*
condition
fieldName,
operator,
compareValue
*/

const useSnapshot = (collectionName, condition) => {
	const [data, setData] = React.useState([]);
	React.useEffect(() => {
		let collectionRef = collection(db, collectionName);
		// collectionRef = query(collectionRef, orderBy("createAt"));
		if (condition) {
			if (!condition.compareValue && !condition.compareValue?.length) {
				return [];
			}
			collectionRef = query(
				collectionRef,
				where(
					condition.fieldName,
					condition.operator,
					condition.compareValue
				)
			);
		}

		const unsubscribed = onSnapshot(collectionRef, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));
			setData(data);
			// console.log(snapshot.docs);
			// console.log(data);
		});
		return unsubscribed;
	}, [collectionName, condition]);

	return data;
};
export default useSnapshot;
