import React, { useCallback } from 'react';

import { Row, Col, Button, Typography } from 'antd';
import { auth } from '../../firebase/config';
import {
	signInWithPopup,
	FacebookAuthProvider,
	GoogleAuthProvider,
	getAdditionalUserInfo,
} from 'firebase/auth';
import { addDocument, generateKeywords } from '../../firebase/service';
const { Title } = Typography;

export default function Login() {
	const fbProvider = new FacebookAuthProvider();
	const ggProvider = new GoogleAuthProvider();

	const handleLogin = useCallback(async (provider) => {
		try {
			const data = await signInWithPopup(auth, provider);
			const details = getAdditionalUserInfo(data);
			console.log('details :>> ', { data });
			console.log('Signed in successfully!!!');

			if (details?.isNewUser) {
				addDocument('users', {
					displayName: data.user.displayName,
					email: data.user.email,
					photoURL: data.user.photoURL,
					uid: data.user.uid,
					providerId: details.providerId,
					keywords: generateKeywords(data.user.displayName),
				});
			}
		} catch (error) {
			console.error('Error during sign-in:', error);
		}
	}, []);

	return (
		<div>
			<Row justify='center' style={{ height: 800 }}>
				<Col span={8}>
					<Title style={{ textAlign: 'center' }} level={3}>
						HoloTex App-Chat
					</Title>
					<Button
						style={{ width: '100%' }}
						onClick={() => handleLogin(ggProvider)}>
						Đăng nhập bằng Google
					</Button>
					<Button
						style={{ width: '100%', marginTop: 5 }}
						onClick={() => handleLogin(fbProvider)}>
						Đăng nhập bằng Facebook
					</Button>
				</Col>
			</Row>
		</div>
	);
}
