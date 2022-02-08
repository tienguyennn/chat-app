import React from "react";
import { Button, Collapse, Typography } from "antd";
import styled from "styled-components";
import { PlusSquareOutlined } from "@ant-design/icons/lib/icons";
import { AppContext } from "../../Context/AppProvider";
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
	&&& {
		.ant-collapse-header,
		p {
			color: white;
		}

		.ant-collapse-content-box {
			padding: 0 40px;
		}
		.add-room {
			color: white;
			padding: 0;
		}
	}
`;

const LinkStyled = styled(Typography.Link)`
	display: block;
	margin-bottom: 5px;
	color: white;
	&.ant-typography {
		font-weight: bold;
		color: #46e5fa;
	}
`;

export default function RoomList() {
	const { rooms, setIsAddRoomVisible, setSelectedRoomId } =
		React.useContext(AppContext);
	// console.log(rooms);
	const handleAddRoom = () => {
		setIsAddRoomVisible(true);
	};
	return (
		<Collapse defaultActiveKey={["1"]} ghost>
			<PanelStyled header="Danh sách các phòng" key="1">
				{rooms.map((room) => (
					<LinkStyled
						key={room.id}
						onClick={() => setSelectedRoomId(room.id)}
					>
						{room.name}
					</LinkStyled>
				))}
				<Button
					className="add-room"
					icon={<PlusSquareOutlined />}
					type="text"
					onClick={handleAddRoom}
				>
					Thêm phòng
				</Button>
			</PanelStyled>
		</Collapse>
	);
}
