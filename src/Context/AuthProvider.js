import { Spin } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
	const navigate = useNavigate();
	const [user, setUser] = React.useState({});
	const [isLoading, setIsLoading] = React.useState(true);
	// console.log("reload");
	React.useEffect(() => {
		const unsubscribed = auth.onAuthStateChanged((user) => {
			// console.log("change");
			setIsLoading(false);
			if (user) {
				const { displayName, email, uid, photoURL } = user;
				setUser({ displayName, email, uid, photoURL });
				navigate("/");
			} else navigate("/login");
		});

		return () => {
			unsubscribed();
		};
	}, [navigate]);

	return (
		<AuthContext.Provider value={user}>
			{isLoading ? <Spin /> : children}
			{/* {children} */}
		</AuthContext.Provider>
	);
}
