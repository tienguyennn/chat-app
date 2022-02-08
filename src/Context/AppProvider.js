import React from "react";
import useSnapshot from "../hook/useSnapshot";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
	const [isAddRoomVisible, setIsAddRoomVisible] = React.useState(false);
	const [selectedRoomId, setSelectedRoomId] = React.useState("");
	const [isInviteMemberVisible, setIsInviteMemberVisible] =
		React.useState(false);
	const data = React.useContext(AuthContext);
	// console.log(data);
	const uid = data.uid;
	const roomsCondition = React.useMemo(() => {
		return {
			fieldName: "members",
			operator: "array-contains",
			compareValue: uid,
		};
	}, [uid]);
	const rooms = useSnapshot("rooms", roomsCondition);
	const selectedRoom = React.useMemo(() => {
		if (rooms.length && selectedRoomId)
			return rooms.find((x) => x.id === selectedRoomId);
		return {};
	}, [rooms, selectedRoomId]);

	const userCondition = React.useMemo(() => {
		return {
			fieldName: "uid",
			operator: "in",
			compareValue: selectedRoom.members,
		};
	}, [selectedRoom.members]);
	const members = useSnapshot("users", userCondition);
	console.log(members);

	const usersNotInRoomCondition = React.useMemo(() => {
		return {
			fieldName: "uid",
			operator: "not-in",
			compareValue: selectedRoom.members,
		};
	}, [selectedRoom?.members]);
	const usersNotInRoom = useSnapshot("users", usersNotInRoomCondition);

	const messagesCondition = React.useMemo(() => {
		return {
			fieldName: "roomId",
			operator: "==",
			compareValue: selectedRoomId,
		};
	}, [selectedRoomId]);
	const messages = useSnapshot("messages", messagesCondition);
	messages.sort((a, b) => a.createAt - b.createAt);
	console.log(messages);
	return (
		<AppContext.Provider
			value={{
				rooms,
				messages,
				usersNotInRoom,
				isAddRoomVisible,
				setIsAddRoomVisible,
				selectedRoomId,
				setSelectedRoomId,
				selectedRoom,
				members,
				isInviteMemberVisible,
				setIsInviteMemberVisible,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
