import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import styles from "./signIn.module.css";
import { portAuth } from "../../utils/global";

import { Button, Checkbox, Form, Input } from "antd";
import useNotificationAuth from "../../hooks/useNotificationAuth";

const SignIn = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [contextHolder, openNotificationWithIcon] = useNotificationAuth();

	const onFinish = async (values) => {
		try {
			const res = await axios.post(`${portAuth}/api/auth/login`, values);
			Cookies.set("token", JSON.stringify(res.data), {
				expires: 1,
				path: "",
				// secure: true,
				// httpOnly: true,
			});
			res.status === 200 && navigate("/");
		} catch (error) {
			openNotificationWithIcon(
				"error",
				"Thông tin tài khoản hoặc mật khẩu không chính xác!"
			);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className="flex justify-between">
			{contextHolder}
			<img
				// src="https://a-static.besthdwallpaper.com/samurai-girl-guerrier-fond-d-ecran-640x1136-18034_163.jpg"
				src="https://images.pixai.art/images/orig/903fc1e6-4edf-44ea-ad92-1e209820acee"
				alt=""
				className="object-cover w-1/2 h-screen"
			/>
			<div className="relative flex flex-col items-center justify-between w-full dark:bg-[#0f172a]">
				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					className="absolute top-1/4 max-w-[600px] z-50"
					initialValues={{
						email: state?.email || "",
						password: state?.password || "",
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập email của bạn!",
							},
						]}
					>
						<Input
							type="email"
							autoFocus
							// defaultValue={`${location.email || ""}`}
						/>
					</Form.Item>
					<Form.Item
						label="Mật khẩu"
						name="password"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập mật khẩu của bạn!",
							},
						]}
					>
						<Input.Password
						// defaultValue={`${location.password || ""}`}
						/>
					</Form.Item>

					<Form.Item
						name="remember"
						valuePropName="checked"
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Checkbox>Nhớ mật khẩu</Checkbox>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary" htmlType="submit">
							Đăng nhập
						</Button>
						<p>
							Nếu bạn chưa có tài khoản hãy bấm vào đây để
							<Link className="text-[#1677ff]" to="/sign-up">
								{" "}
								Đăng ký
							</Link>
						</p>
					</Form.Item>
				</Form>
				<div className="w-full absolute bottom-0 right-0 left-0 z-0">
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
