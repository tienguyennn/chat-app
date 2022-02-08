import { Avatar, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const WrapperStyled = styled.div`
	margin-bottom: 10px;

	.author {
		margin-left: 5px;
		font-weight: bold;
	}

	.date {
		margin-left: 10px;
		font-size: 11px;
		color: #a7a7a7;
	}

	.content {
		margin-left: 30px;
	}
`;

export default function Message({ text, displayName, photoURL, createAt }) {
	return (
		<WrapperStyled>
			<div>
				<Avatar scr={photoURL}>
					{photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
				</Avatar>
				<Typography.Text className="author">
					{displayName}
				</Typography.Text>
				<Typography.Text className="date">{createAt}</Typography.Text>
			</div>
			<div>
				<Typography.Text className="content">{text}</Typography.Text>
			</div>
		</WrapperStyled>
	);
}
