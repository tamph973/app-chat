import React, { useContext, useMemo, useState } from 'react';
import { AuthContext } from './AuthProvider';
import useFirestore from '../Hooks/useFirestore';

export const AppContext = React.createContext();

export default function AuthProvider({ children }) {
	const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
	const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
	const [selectedRoomId, setSelectedRoomId] = useState('');

	const {
		user: { uid },
	} = useContext(AuthContext);

	const roomCondition = useMemo(() => {
		return {
			fieldName: 'members',
			operator: 'array-contains',
			compareValue: uid,
		};
	}, [uid]);

	const rooms = useFirestore('rooms', roomCondition);

	const selectedRoom = useMemo(
		() => rooms.find((room) => room.id === selectedRoomId) || {},
		[rooms, selectedRoomId],
	);

	const userCondition = useMemo(() => {
		return {
			fieldName: 'uid',
			operator: 'in',
			compareValue: selectedRoom.members,
		};
	}, [selectedRoom.members]);

	const members = useFirestore('users', userCondition);
	console.log({ members });

	return (
		<AppContext.Provider
			value={{
				rooms,
				members,
				selectedRoom,
				isAddRoomVisible,
				setIsAddRoomVisible,
				selectedRoomId,
				setSelectedRoomId,
				isInviteMemberVisible,
				setIsInviteMemberVisible,
			}}>
			{children}
		</AppContext.Provider>
	);
}
