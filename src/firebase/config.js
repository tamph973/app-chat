// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBAQaxlNkVtA9PoKZp3AkLppdIoqGdv1Fw',
	authDomain: 'holetex-chat-app.firebaseapp.com',
	projectId: 'holetex-chat-app',
	storageBucket: 'holetex-chat-app.appspot.com',
	messagingSenderId: '1051727930120',
	appId: '1:1051727930120:web:a1b0086b74aae264d8c2bd',
	measurementId: 'G-KS11G4R34R',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

connectAuthEmulator(auth, 'http://127.0.0.1:9099');
if (window.location.hostname === 'localhost') {
	connectFirestoreEmulator(db, '127.0.0.1', 8080);
}
export { auth, db };
