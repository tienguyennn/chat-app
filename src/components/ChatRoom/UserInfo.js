import { Avatar, Button, Typography } from "antd";
import { auth } from "../../firebase/config";
import React from "react";
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthProvider";
import useSnapshot from "../../hook/useSnapshot";

const WrappedStyled = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 12px 16px;
	border-bottom: 1px solid rgp(82, 38, 83);

	.userName {
		color: white;
		margin-left: 5px;
	}
`;

export default function UserInfo() {
	const { displayName, photoURL } = React.useContext(AuthContext);
	console.log(photoURL);
	const handleSignOut = () => {
		auth.signOut();
	};
	// const userCondition = React.useMemo(() => {
	// 	return {
	// 		fieldName: "displayName",
	// 		operator: "==",
	// 		compareValue: "Mountain Grass",
	// 	};
	// }, []);
	// const data = useSnapshot("users", userCondition);
	// console.log(data);

	return (
		<WrappedStyled>
			<div>
				<Avatar src={photoURL}>
					{photoURL ? "" : displayName?.charAt(0).toUpperCase()}
				</Avatar>
				<Typography.Text className="userName">
					{displayName}
				</Typography.Text>
			</div>
			<Button ghost onClick={handleSignOut}>
				Đăng xuất
			</Button>
		</WrappedStyled>
	);
}
