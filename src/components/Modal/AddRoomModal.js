import { Form, Input, Modal } from "antd";
import React from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/service";

export default function AddRoomModal() {
	const { isAddRoomVisible, setIsAddRoomVisible } =
		React.useContext(AppContext);
	const { uid } = React.useContext(AuthContext);

	const [form] = Form.useForm();
	const handleOk = async () => {
		setIsAddRoomVisible(false);
		// const { name, description } = form.getFieldValue();\\
		var data = { ...form.getFieldValue(), members: [uid] };
		form.resetFields();
		await addDocument("rooms", data);
	};
	const handleCancel = () => {
		form.resetFields();
		setIsAddRoomVisible(false);
	};
	return (
		<div>
			<Modal
				tittle="Tạo phòng"
				visible={isAddRoomVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form layout="vertical" form={form}>
					<Form.Item label="Tên phòng" name="name">
						<Input placeholder="Nhập tên phòng" />
					</Form.Item>
					<Form.Item label="Mô tả" name="description">
						<Input.TextArea placeholder="Nhập mô tả" />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
}
