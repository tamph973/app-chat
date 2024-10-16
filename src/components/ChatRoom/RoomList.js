import React, { useContext } from 'react';
import { Button, Collapse, Typography } from 'antd';
import styled from 'styled-components';
import { PlusSquareOutlined } from '@ant-design/icons';
import { AppContext } from '../../Context/AppProvider';
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
	&&& {
		.ant-collapse-header,
		p {
			color: #fff;
		}

		.ant-collapse-content-box {
			padding: 0 40px;
		}

		.add-room {
			color: #fff;
			padding: 0;
		}
	}
`;

const LinkStyled = styled(Typography.Link)`
	&&& {
		display: block;
		margin-bottom: 4px;
	}
`;

export default function RoomList() {
	const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
		useContext(AppContext);

	console.log({ rooms });

	const handleAddRoom = () => {
		setIsAddRoomVisible(true);
	};

	return (
		<div>
			<Collapse ghost defaultActiveKey={['1']}>
				<PanelStyled header='Danh sách các phòng' key='1'>
					{rooms.map((room) => (
						<LinkStyled
							key={room.id}
							onClick={() => setSelectedRoomId(room.id)}>
							{room.name}
						</LinkStyled>
					))}
					<Button
						type='text'
						icon={<PlusSquareOutlined />}
						className='add-room'
						onClick={() => handleAddRoom()}>
						Thêm phòng
					</Button>
				</PanelStyled>
			</Collapse>
		</div>
	);
}
