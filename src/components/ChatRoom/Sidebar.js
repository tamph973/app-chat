import React from 'react';
import { Row, Col } from 'antd';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from 'styled-components';

const SideBarStyled = styled.div`
	background: #1d2b53;
	color: #fff;
	height: 100vh;
`;

export default function Sidebar() {
	return (
		<SideBarStyled>
			<div>
				<Row>
					<Col span={24}>
						<UserInfo />
					</Col>
					<Col span={24}>
						<RoomList />
					</Col>
				</Row>
			</div>
		</SideBarStyled>
	);
}
