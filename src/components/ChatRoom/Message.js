import React from 'react';
import { Avatar, Typography } from 'antd';
import styled from 'styled-components';
import { formatRelative } from 'date-fns';

const WrapperStyled = styled.div`
	margin-bottom: 12px;

	.author {
		margin-left: 4px;
		font-weight: bold;
	}

	.date {
		margin-left: 8px;
		font-size: 12px;
		color: #a4a4a4;
	}

	.content {
		margin-left: 32px;
	}
`;

const formatDate = (second) => {
	let formattedDate = '';
	if (second) {
		formattedDate = formatRelative(new Date(second * 1000), new Date());

		formattedDate =
			formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
	}
	return formattedDate;
};

export default function Message({ text, displayName, createAt, photoURL }) {
	return (
		<WrapperStyled>
			<div>
				<div>
					<Avatar size='small' src={photoURL}>
						{photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
					</Avatar>
					<Typography.Text className='author'>
						{displayName}
					</Typography.Text>
					<Typography.Text className='date'>
						{formatDate(createAt?.seconds)}
					</Typography.Text>
				</div>

				<div>
					<Typography.Text className='content'>
						{text}
					</Typography.Text>
				</div>
			</div>
		</WrapperStyled>
	);
}
