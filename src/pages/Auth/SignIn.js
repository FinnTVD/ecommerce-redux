import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import styles from "./signIn.module.css";
import useNotificationAuth from "../../hooks/useNotificationAuth";
import { portAuth } from "../../utils/global";
import { requestAuthFetchMe, saveToken } from "../../utils/auth";
import { setUser } from "../../store/AuthSlice";
import useResize from "../../hooks/useResize";
import useLanguage from "../../hooks/useLanguage";

import { Button, Checkbox, Form, Input } from "antd";
import { FacebookFilled, GoogleSquareFilled } from "@ant-design/icons";
import { auth, fbProvider, ggProvider } from "../../firebase/firebase-config";
import {
	FacebookAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { useTranslation } from "react-i18next";

const SignIn = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { state } = useLocation();
	const [contextHolder, openNotificationWithIcon] = useNotificationAuth();
	const { user } = useSelector((state) => state.auth);
	const widthScreen = useResize();
	const selectionLanguage = useLanguage();
	const { t } = useTranslation("signin");
	const [src, setSrc] = useState(null);

	const handleSignInFacebook = () => {
		signInWithPopup(auth, fbProvider).then((result) => {
			const user = result.user;
			const credential =
				FacebookAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			setSrc(
				`https://graph.facebook.com/${user.providerData[0].uid}/picture?type=large&access_token=${token}`
			);
		});
	};
	const handleSignInGoogle = () => {
		signInWithPopup(auth, ggProvider).then((result) => {
			const user = result.user;
			console.log(
				"🚀 ~ file: SignIn.js:46 ~ signInWithPopup ~ user:",
				user
			);
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential.accessToken;
			setSrc(user.photoURL);
		});
	};

	const handleLogoutFacebook = () => {
		signOut(auth);
	};

	useEffect(() => {
		if (user && user.id) {
			navigate("/", { state: { status: 200 } });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	if (user) return;

	const onFinish = async (values) => {
		try {
			const res = await axios.post(`${portAuth}/auth/login`, {
				...values,
			});
			if (res.data && res.status === 200) {
				saveToken(res.data.accessToken, res.data.refreshToken);
				const res2 = await requestAuthFetchMe(res.data.accessToken);
				return dispatch(
					setUser({
						user: res2.data,
						accessToken: res.data.accessToken,
					})
				);
			}
		} catch (error) {
			error.response.status === 404 &&
				openNotificationWithIcon(
					"error",
					"Hệ thống đang xảy ra lỗi, vui lòng thử lại!"
				);
			error.response.status === 401 &&
				openNotificationWithIcon(
					"error",
					"Thông tin đăng nhập không chính xác!"
				);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className="relative flex h-screen lg:justify-between">
			{contextHolder}
			{selectionLanguage}
			{widthScreen >= 1024 && (
				<div className="w-1/2 h-screen">
					<img
						src={src ?? "/image/banner-signin.jpg"}
						alt=""
						className="object-cover w-full h-full"
					/>
				</div>
			)}
			<div className="relative flex flex-col items-center justify-between lg:w-1/2 w-full dark:bg-[#0f172a]">
				<h1 className="mt-20 text-3xl font-bold text-blue-600 dark:text-white max-sm:mt-16">
					{t("signin.title")}
				</h1>
				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					className="absolute top-1/4 max-w-[600px] z-50 max-lg:top-[15%]"
					initialValues={{
						email: state?.email || "",
						password: state?.password || "",
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="on"
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: t("signin.messageRequiredEmail"),
							},
						]}
					>
						<Input type="email" autoFocus />
					</Form.Item>
					<Form.Item
						label={t("signin.passwordInput")}
						name="password"
						rules={[
							{
								required: true,
								message: t("signin.messageRequiredPassword"),
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{
							sm: { offset: 8, span: 16 },
						}}
						className="mb-1"
					>
						<Checkbox>{t("signin.saveAccount")}</Checkbox>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							sm: { offset: 8, span: 16 },
						}}
					>
						<Button type="primary" htmlType="submit">
							{t("signin.title")}
						</Button>
						<div className="w-full mt-5">
							<Button
								onClick={handleSignInFacebook}
								className="flex items-center w-full mb-2 dark:text-white"
							>
								<FacebookFilled className="text-blue-500 text-3xl !flex items-center " />
								Facebook
							</Button>
							<Button
								onClick={handleSignInGoogle}
								className="flex items-center w-full dark:text-white"
							>
								<GoogleSquareFilled className="text-blue-500 text-3xl !flex items-center " />
								Google
							</Button>
						</div>
						<p className="mt-3 dark:text-white">
							{t("signin.notHaveAccount")}
							<Link className="text-[#1677ff]" to="/sign-up">
								{" "}
								{t("signin.register")}
							</Link>
						</p>
					</Form.Item>
				</Form>
				<div className="absolute bottom-0 left-0 right-0 z-0 w-full ">
					<svg
						width="100%"
						height="100%"
						id="svg"
						viewBox="0 0 1440 590"
						xmlns="http://www.w3.org/2000/svg"
						className="transition duration-300 ease-in-out delay-150"
					>
						<defs>
							<linearGradient
								id="gradient"
								x1="0%"
								y1="50%"
								x2="100%"
								y2="50%"
							>
								<stop offset="5%" stopColor="#F78DA7"></stop>
								<stop offset="95%" stopColor="#8ED1FC"></stop>
							</linearGradient>
						</defs>
						<path
							d="M 0,600 C 0,600 0,200 0,200 C 85.17703349282297,167.8181818181818 170.35406698564594,135.63636363636365 272,139 C 373.64593301435406,142.36363636363635 491.76076555023917,181.27272727272728 588,195 C 684.2392344497608,208.72727272727272 758.6028708133972,197.27272727272728 848,182 C 937.3971291866028,166.72727272727272 1041.8277511961724,147.63636363636363 1143,150 C 1244.1722488038276,152.36363636363637 1342.0861244019138,176.1818181818182 1440,200 C 1440,200 1440,600 1440,600 Z"
							stroke="none"
							strokeWidth="0"
							fill="url(#gradient)"
							fillOpacity="0.53"
							className={`transition-all duration-300 ease-in-out delay-150 ${styles.path0}`}
						></path>
						<defs>
							<linearGradient
								id="gradient"
								x1="0%"
								y1="50%"
								x2="100%"
								y2="50%"
							>
								<stop offset="5%" stopColor="#F78DA7"></stop>
								<stop offset="95%" stopColor="#8ED1FC"></stop>
							</linearGradient>
						</defs>
						<path
							d="M 0,600 C 0,600 0,400 0,400 C 107.31100478468898,431.06220095693783 214.62200956937795,462.12440191387566 309,469 C 403.37799043062205,475.87559808612434 484.82296650717706,458.56459330143537 579,441 C 673.1770334928229,423.43540669856463 780.086124401914,405.61722488038276 873,384 C 965.913875598086,362.38277511961724 1044.8325358851673,336.96650717703346 1137,339 C 1229.1674641148327,341.03349282296654 1334.5837320574165,370.51674641148327 1440,400 C 1440,400 1440,600 1440,600 Z"
							stroke="none"
							strokeWidth="0"
							fill="url(#gradient)"
							fillOpacity="1"
							className={`transition-all duration-300 ease-in-out delay-150 ${styles.path1}`}
						></path>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
