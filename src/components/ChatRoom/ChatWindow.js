import { InboxOutlined, UserAddOutlined } from '@ant-design/icons';
import { Avatar, Button, Tooltip, Form, Input, Alert, Upload } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import Message from './Message';
import { AppContext } from '../../Context/AppProvider';
import { addDocument } from '../../firebase/service';
import { AuthContext } from '../../Context/AuthProvider';
import useFirestore from '../../Hooks/useFirestore';

const WrapperStyled = styled.div`
	height: 100vh;
`;
const HeaderStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 56px;
	padding: 0 48px;
	border-bottom: 1px solid rgb(230, 230, 230);

	.header {
		&-info {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		&-title {
			margin: 0;
			font-weight: bold;
			font-size: 16px;
		}

		&-desc {
			margin-top: 4px;
			font-weight: 400;
		}
	}
`;
const ButtonGroupStyled = styled.div`
	display: flex;
	align-items: center;
`;

const ContentStyled = styled.div`
	height: calc(100% - 56px);
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 12px;
`;

const MessageListStyled = styled.div`
	max-height: 100%;
	overflow-y: auto;
`;

const FormStyled = styled(Form)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2px 2px 2px 0;
	border-radius: 2px;
	border: 1px solid rgba(230, 230, 230);

	.ant-form-item {
		flex: 1;
		margin-bottom: 0;
	}
`;
export default function ChatWindow() {
	const { selectedRoom, members, setIsInviteMemberVisible } =
		useContext(AppContext);
	const {
		user: { uid, photoURL, displayName },
	} = useContext(AuthContext);

	const [inputValue, setInputValue] = useState('');
	const [form] = Form.useForm();

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleOnSubmit = () => {
		addDocument('messages', {
			text: inputValue,
			uid,
			displayName,
			photoURL,
			roomId: selectedRoom.id,
		});
		form.resetFields(['message']);
	};
	const messageCondition = useMemo(
		() => ({
			fieldName: 'roomId',
			operator: '==',
			compareValue: selectedRoom.id,
		}),
		[selectedRoom.id],
	);

	const messages = useFirestore('messages', messageCondition);
	console.log({ messages });
	const handleImageUpload = () => {};
	return (
		<WrapperStyled>
			{selectedRoom.id ? (
				<>
					<HeaderStyled>
						<div className='header-info'>
							<p className='header-title'>{selectedRoom.name}</p>
							<span className='header-desc'>
								{selectedRoom.description}
							</span>
						</div>
						<ButtonGroupStyled>
							<Button
								icon={<UserAddOutlined />}
								type='text'
								onClick={() => setIsInviteMemberVisible(true)}>
								Mời
							</Button>
							<Avatar.Group size='small' max={{ count: 3 }}>
								{members.map((member) => (
									<Tooltip
										title={member.displayName}
										key={member.id}>
										<Avatar src={member.photoURL}>
											{member.photoURL
												? ''
												: member.displayName
														?.charAt(0)
														?.toUpperCase()}
										</Avatar>
									</Tooltip>
								))}
							</Avatar.Group>
						</ButtonGroupStyled>
					</HeaderStyled>

					<ContentStyled>
						<MessageListStyled>
							{messages.map((mess) => (
								<Message
									key={mess.id}
									text={mess.text}
									displayName={mess.displayName}
									createAt={mess.createAt}
									photoURL={mess.photoURL}
								/>
							))}
						</MessageListStyled>

						<FormStyled form={form}>
							<Form.Item name='message'>
								<Input
									onChange={handleInputChange}
									onPressEnter={() => handleOnSubmit()}
									placeholder='Nhập vào tin nhắn...'
									variant='borderless'
									autoComplete='off'
								/>
							</Form.Item>

							<Button
								type='primary'
								onClick={() => handleOnSubmit()}>
								Gửi
							</Button>
						</FormStyled>
					</ContentStyled>
				</>
			) : (
				<Alert
					message='Hãy chọn phòng'
					type='info'
					showIcon
					style={{ margin: 4 }}
					closable
				/>
			)}
		</WrapperStyled>
	);
}
