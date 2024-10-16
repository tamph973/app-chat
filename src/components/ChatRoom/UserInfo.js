import React, { useContext } from 'react';
import { Button, Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { auth } from '../../firebase/config';
import { AuthContext } from '../../Context/AuthProvider';

const WrapperStyled = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom; solid 1px rgba(82, 38,83);

    .username {
        color: #fff;
        margin-left: 4px;
    }
`;

export default function UserInfo() {
	const {
		user: { displayName, photoURL },
	} = useContext(AuthContext);

	return (
		<WrapperStyled>
			<div>
				<Avatar src={photoURL}>
					{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
				</Avatar>
				<Typography.Text className='username'>
					{displayName}
				</Typography.Text>
			</div>
			<Button ghost onClick={() => auth.signOut()}>
				Đăng xuất
			</Button>
		</WrapperStyled>
	);
}
