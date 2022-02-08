import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login/index";
import ChatRoom from "./components/ChatRoom/index";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./components/Modal/AddRoomModal";
import InviteMemberModal from "./components/Modal/InviteMemberModal";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<AppProvider>
					<Routes>
						<Route element={<Login />} path="/login" />
						<Route element={<ChatRoom />} path="/" />
					</Routes>
					<AddRoomModal></AddRoomModal>
					<InviteMemberModal />
				</AppProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
