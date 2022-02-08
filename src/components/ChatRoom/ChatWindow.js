import { UserAddOutlined } from "@ant-design/icons/lib/icons";
import { Button, Tooltip, Avatar, Form, Input, Alert } from "antd";
import { formatRelative } from "date-fns";
import _ from "lodash";
// import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import styled from "styled-components";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import { addDocument } from "../../firebase/service";
import Message from "./Message";

const WrappedStyled = styled.div`
	height: 100vh;
`;

const HeaderStyled = styled.div`
	display: flex;
	justify-content: space-between;
	height: 56px;
	padding: 0 16px;
	align-item: center;
	border-bottom: 1px solid rgb(230, 230, 230);
	.header {
		&__info {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}

		&__title {
			margin: 0;
			font-wight: bold;
		}

		&__description {
			font-size: 12px;
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
	padding: 11px;
	justify-content: flex-end;
`;

const FormStyled = styled(Form)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2px 2px 2px 0;
	border: 1px solid rgb(230, 230, 230);
	border-radius: 2px;

	.ant-form-item {
		flex: 1;
		margin: 0;
	}
`;

const MessageListStyled = styled.div`
	overflow: auto;
	max-height: 100%;
`;

function formatDate(seconds) {
	let formattedDate = "";
	if (seconds) {
		formattedDate = formatRelative(new Date(seconds * 1000), new Date());
		formattedDate =
			formattedDate?.charAt(0)?.toUpperCase() + formattedDate.slice(1);
	}

	return formattedDate;
}

export default function ChatWindow() {
	const {
		selectedRoomId,
		selectedRoom,
		messages,
		members,
		setIsInviteMemberVisible,
	} = React.useContext(AppContext);

	console.log(messages);
	const { uid, photoURL, displayName } = React.useContext(AuthContext);
	const [inputValue, setInputValue] = React.useState("");

	const messagesEndRef = React.useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	React.useEffect(() => {
		scrollToBottom();
	}, [messages]);

	const [form] = Form.useForm();
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleOnSubmit = async () => {
		form.resetFields(["message"]);

		if (inputValue !== "") {
			await addDocument("messages", {
				uid: uid,
				displayName: displayName,
				photoURL: photoURL,
				roomId: selectedRoomId,
				text: inputValue,
			});
			setInputValue("");
		}
	};

	return (
		<WrappedStyled>
			{!_.isEmpty(selectedRoom) ? (
				<>
					<HeaderStyled>
						<div className="header_info">
							<p className="header__title">{selectedRoom.name}</p>
							<span className="header__description">
								{selectedRoom.description}
							</span>
						</div>
						<ButtonGroupStyled>
							<Button
								icon={<UserAddOutlined />}
								type="text"
								onClick={() => setIsInviteMemberVisible(true)}
							>
								Mời
							</Button>
							<Avatar.Group size={"small"} maxCount={2}>
								{members.map((user) => (
									<Tooltip title={user.displayName}>
										<Avatar src={user.photoURL}>
											{user.photoURL
												? ""
												: user.displayName
														?.charAt(0)
														.toUpperCase()}
										</Avatar>
									</Tooltip>
								))}
							</Avatar.Group>
						</ButtonGroupStyled>
					</HeaderStyled>
					<ContentStyled>
						<MessageListStyled ref={messagesEndRef}>
							{messages.map((message) => (
								<Message
									text={message.text}
									photoURL={message.photoURL}
									displayName={message.displayName}
									createAt={formatDate(
										message?.createAt?.seconds
									)}
								></Message>
							))}
						</MessageListStyled>
						<FormStyled form={form}>
							<Form.Item name="message">
								<Input
									autoFocus
									onChange={handleInputChange}
									onPressEnter={handleOnSubmit}
									bordered={false}
									autoComplete="off"
									placeholder="Nhập tin nhắn"
								/>
							</Form.Item>
							<Button onClick={handleOnSubmit}>Gửi</Button>
						</FormStyled>
					</ContentStyled>
				</>
			) : (
				<Alert message="Hãy chọn 1 phòng" type="info" showIcon />
			)}
		</WrappedStyled>
	);
}
