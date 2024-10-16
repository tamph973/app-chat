import './App.css';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import { AddRoomModal } from './components/Modals/AddRoomModal';
import { InviteMemberModal } from './components/Modals/InviteMemberModal';
function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppProvider>
					<Routes>
						<Route element={<ChatRoom />} path='/' />
						<Route element={<Login />} path='/login' />
					</Routes>
					<AddRoomModal />
					<InviteMemberModal />
				</AppProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
