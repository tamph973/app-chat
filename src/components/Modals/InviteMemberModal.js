import React, { useContext, useMemo, useState } from 'react';
import { Avatar, Form, Modal, Select, Spin } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { debounce } from 'lodash';
import { db } from '../../firebase/config';
import {
	collection,
	where,
	query,
	orderBy,
	limit,
	getDocs,
	doc,
	getDoc,
	updateDoc,
} from 'firebase/firestore';

function DebounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
	const [fetching, setFetching] = useState(false);
	const [options, setOptions] = useState([]);

	const debounceFetcher = useMemo(() => {
		const loadOptions = (value) => {
			setOptions([]);
			setFetching(true);

			fetchOptions(value, props.curMembers).then((newOptions) => {
				setOptions(newOptions);
				setFetching(false);
			});
		};

		return debounce(loadOptions, debounceTimeout);
	}, [debounceTimeout, fetchOptions, props.curMembers]);

	return (
		<Select
			labelInValue
			filterOption={false}
			onSearch={debounceFetcher}
			notFoundContent={fetching ? <Spin size='small' /> : null}
			{...props}>
			{options.map((opt) => (
				<Select.Option
					key={opt.value}
					value={opt.value}
					title={opt.label}>
					<Avatar
						size='small'
						src={opt.photoURL}
						style={{ margin: 4 }}>
						{opt.photoURL ? '' : opt.label?.charAt(0).toUpperCase()}
					</Avatar>
					{`${opt.label}`}
				</Select.Option>
			))}
		</Select>
	);
}

async function fetchUserList(search, curMembers) {
	const collectionRef = collection(db, 'users');
	const q = query(
		collectionRef,
		orderBy('displayName'),
		limit(20),
		where('keywords', 'array-contains', search),
	);

	const querySnapshot = await getDocs(q);
	const users = querySnapshot.docs
		.map((doc) => ({
			label: doc.data().displayName,
			value: doc.data().uid,
			photoURL: doc.data().photoURL,
		}))
		.filter((opt) => !curMembers.includes(opt.value));

	return users;
}

export const InviteMemberModal = () => {
	const {
		isInviteMemberVisible,
		setIsInviteMemberVisible,
		selectedRoomId,
		selectedRoom,
	} = useContext(AppContext);
	const {
		user: { uid },
	} = useContext(AuthContext);

	const [value, setValue] = useState([]); // uid

	const [form] = Form.useForm();

	const handleOk = async () => {
		// reset form values
		form.resetFields();

		const roomRef = doc(db, 'rooms', selectedRoomId);
		const roomDoc = await getDoc(roomRef);
		console.log({ roomDoc });
		await updateDoc(roomRef, {
			members: [
				...selectedRoom.members,
				...value.map((val) => val.value),
			],
		});

		setIsInviteMemberVisible(false);
	};

	const handleCannel = () => {
		setIsInviteMemberVisible(false);
	};

	console.log({ value });
	return (
		<div>
			<Modal
				title='Mời thêm thành viên'
				open={isInviteMemberVisible}
				onOk={handleOk}
				onCancel={() => handleCannel()}>
				<Form form={form} layout='vertical'>
					<DebounceSelect
						mode='multiple'
						label='Tên các thành viên'
						value={value}
						placeholder='Nhập tên thành viên'
						fetchOptions={fetchUserList}
						onChange={(newValue) => setValue(newValue)}
						style={{ width: '100%' }}
						curMembers={selectedRoom.members}
					/>
				</Form>
			</Modal>
		</div>
	);
};
