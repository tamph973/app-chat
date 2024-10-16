import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { Spin } from 'antd';
import { onAuthStateChanged } from 'firebase/auth';
export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				const { displayName, email, uid, photoURL } = user;
				setUser({
					displayName,
					email,
					uid,
					photoURL,
				});
				//console.log('User logged in: ', user); // Log user info when they log in
				navigate('/');
			} else {
				// No user is signed in
				setUser({});
				navigate('/login');
			}

			setIsLoading(false);
		});

		return () => unsubscribe();
	}, [navigate]);

	return (
		<AuthContext.Provider value={{ user }}>
			{isLoading ? (
				<Spin style={{ position: 'fixed', inset: 0 }} />
			) : (
				children
			)}
		</AuthContext.Provider>
	);
}
