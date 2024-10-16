import React, { useContext } from 'react';
import { Form, Modal, Input } from 'antd';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/service';
import { AuthContext } from '../../Context/AuthProvider';

export const AddRoomModal = () => {
	const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
	const {
		user: { uid },
	} = useContext(AuthContext);
	const [form] = Form.useForm();

	const handleOk = () => {
		// add new room to firestore
		addDocument('rooms', {
			...form.getFieldsValue(),
			members: [uid],
		});
		// reset form values
		form.resetFields();

		setIsAddRoomVisible(false);
	};

	const handleCannel = () => {
		setIsAddRoomVisible(false);
	};
	return (
		<div>
			<Modal
				title='Tạo phòng'
				open={isAddRoomVisible}
				onOk={handleOk}
				onCancel={() => handleCannel()}>
				<Form form={form} layout='vertical'>
					<Form.Item label='Tên phòng' name='name'>
						<Input placeholder='Nhập vào tên phòng' />
					</Form.Item>
					<Form.Item label='Mô tả' name='description'>
						<Input.TextArea placeholder='Mô tả' />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};
