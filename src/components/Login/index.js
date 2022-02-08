import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { app, db } from "../../firebase/config";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { addDocument, checkUserExist } from "../../firebase/service";

const { Title } = Typography;

export default function Login() {
	const FbProvider = new FacebookAuthProvider();
	const auth = getAuth(app);

	const handleNew = async () => {
		var data = {
			displayName: "displayName",
			email: "email",
			photoURL: " user.photoURL",
			uid: "user.uid",
			providerId: "result.providerId",
		};

		await setDoc(doc(db, "cities", "new-city-id"), data);
	};

	const handleFbLogin = async () => {
		signInWithPopup(auth, FbProvider).then(async (result) => {
			// The signed-in user info.
			const user = result.user;
			// console.log(result);
			// console.log(user);
			var data = {
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				uid: user.uid,
				providerId: result.providerId,
			};
			const regex = new RegExp(/\d.*\d/);
			var id = regex.exec(data.photoURL);

			var isExist = await checkUserExist(data.uid);

			if (!isExist) {
				await addDocument("users", data);
			}

			// // This gives you a Facebook Access Token. You can use it to access the Facebook API.
			// const credential =
			// 	FacebookAuthProvider.credentialFromResult(result);
			// const accessToken = credential.accessToken;
		});
	};

	return (
		<div>
			<Row justify="center" style={{ height: 800 }}>
				<Col span={8}>
					<Title style={{ textAlign: "center" }} Level={3}>
						Fun chat
					</Title>
					<Button
						style={{ width: "100%", marginBottom: 5 }}
						onClick={handleNew}
					>
						Đăng nhập bằng Google
					</Button>
					<Button
						style={{ width: "100%", marginBottom: 5 }}
						onClick={handleFbLogin}
					>
						Đăng nhập bằng Facebook
					</Button>
				</Col>
			</Row>
		</div>
	);
}
