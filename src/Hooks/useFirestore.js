import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import {
	collection,
	query,
	orderBy,
	where,
	onSnapshot,
} from 'firebase/firestore';

const useFirestore = (collectionName, condition) => {
	const [documents, setDocuments] = useState([]);

	useEffect(() => {
		let collectionRef = collection(db, collectionName);

		if (condition) {
			const { fieldName, operator, compareValue } = condition;
			if (!compareValue || !compareValue.length) {
				setDocuments([]); // Reset documents if condition is empty
				return;
			}

			collectionRef = query(
				collectionRef,
				orderBy('createAt'),
				where(fieldName, operator, compareValue),
			);
		}

		const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
			const documents = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			setDocuments(documents);
		});

		return () => unsubscribe();
	}, [collectionName, condition]);

	return documents;
};

export default useFirestore;
