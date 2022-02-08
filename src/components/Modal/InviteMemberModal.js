import { Modal, Select, Avatar } from "antd";
import React from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { updateMember } from "../../firebase/service";

export default function InviteMemberModal() {
	const {
		usersNotInRoom,
		isInviteMemberVisible,
		setIsInviteMemberVisible,
		members,
		selectedRoomId,
		selectedRoom,
	} = React.useContext(AppContext);
	console.log(members);
	// const { uid } = React.useContext(AuthContext);
	console.log("invite rerender");

	const [membersAdd, setMemberAdd] = React.useState([]);

	const handleOk = async () => {
		setIsInviteMemberVisible(false);
		setMemberAdd([]);
		await updateMember(selectedRoomId, [
			...selectedRoom.members,
			...membersAdd,
		]);
	};
	const handleCancel = () => {
		setIsInviteMemberVisible(false);
		setMemberAdd([]);
	};

	function handleChange(value) {
		console.log(value);
		setMemberAdd(value);
	}
	return (
		<div>
			<Modal
				title="Tạo phòng"
				visible={isInviteMemberVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Select
					mode="multiple"
					style={{ width: "100%" }}
					placeholder="Chọn các thành viên"
					// defaultValue={["china"]}
					value={membersAdd}
					onChange={handleChange}
					optionLabelProp="label"
					filterOption={(input, option) =>
						option.props.label
							.toLowerCase()
							.indexOf(input.toLowerCase()) >= 0 ||
						option.props.label
							.toLowerCase()
							.indexOf(input.toLowerCase()) >= 0
					}
				>
					{usersNotInRoom.map((user) => (
						<Select.Option
							value={user.uid}
							label={user.displayName}
							key={user.uid}
						>
							<Avatar>
								{user.photoURL
									? ""
									: user.displayName
											?.charAt(0)
											?.toUpperCase()}
							</Avatar>
							<span style={{ marginLeft: 5 }}>
								{user.displayName}
							</span>
						</Select.Option>
					))}
				</Select>
			</Modal>
		</div>
	);
}
