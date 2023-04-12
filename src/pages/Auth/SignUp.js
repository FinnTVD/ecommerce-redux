import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

import useNotificationAuth from "../../hooks/useNotificationAuth";
import { portAuth } from "../../utils/global";
import useResize from "../../hooks/useResize";

import { Button, Form, Input } from "antd";
import useLanguage from "../../hooks/useLanguage";

const SignUp = () => {
	const [contextHolder, openNotificationWithIcon] = useNotificationAuth();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	const widthScreen = useResize();
	const selectionLanguage = useLanguage();
	const { t } = useTranslation("signup");

	useEffect(() => {
		if (user && user.email) {
			navigate("/");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	if (user) return;

	const onFinish = async (values) => {
		try {
			const res = await axios.post(`${portAuth}/auth/register`, {
				...values,
				name: values.name.trim(),
			});
			res.status === 201 &&
				openNotificationWithIcon(
					"success",
					"Đăng ký tài khoản thành công!"
				);
			setTimeout(() => {
				navigate("/sign-in", { state: values });
			}, 1500);
		} catch ({ response }) {
			response.status === 409 &&
				openNotificationWithIcon(
					"error",
					"Email đã tồn tại, vui lòng sử dụng email khác và thử lại!"
				);
			response.status === 404 &&
				openNotificationWithIcon(
					"error",
					"Đăng ký tài khoản thất bại, lỗi hệ thống!"
				);
		}
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<div className="relative flex justify-between w-screen h-screen max-md:flex-col bg-gradient-to-r from-indigo-600 to-sky-400">
			{contextHolder}
			{selectionLanguage}
			<div className="flex flex-col items-center justify-center w-[35%] max-md:w-full max-md:gap-y-5 gap-y-10">
				<h1 className="text-5xl font-bold text-center text-white max-md:text-xl max-md:mt-10">
					{t("signup.welcome")}
				</h1>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					className="w-[60px] h-[60px] -rotate-45 text-white"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
					/>
				</svg>
				<p className="text-center text-white max-md:px-4">
					{t("signup.slogan")}
				</p>
				{widthScreen >= 768 && <div className="h-[100px]"></div>}
			</div>
			<div className="flex flex-col max-md:w-full items-center justify-center w-[calc(65%-80px)] md:bg-white md:dark:bg-[#0f172a] absolute md:h-4/5 top-1/2 right-0 -translate-y-[50%] max-md:-translate-y-[40%] md:before:content-[''] md:before:absolute md:before:bg-white md:before:dark:bg-[#0f172a] md:before:w-[80px] md:before:h-full md:before:z-50 md:before:top-0 md:before:-left-[79px] md:before:rounded-l-[50%]">
				<h1 className="mb-10 text-3xl font-bold text-[#4e4ce6] dark:text-white max-sm:text-2xl max-sm:mt-10 max-sm:mb-0">
					{t("signup.btnRegister")}
				</h1>
				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					className="xl:w-[600px] lg:w-[400px]"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label={t("signup.nameInput")}
						name="name"
						className="max-md:mb-2"
						rules={[
							{
								required: true,
								message: t("signup.messageRequired"),
							},
							{
								min: 2,
								message: t("signup.messageNameInput.min"),
							},
						]}
					>
						<Input autoFocus />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						className="max-md:mb-2"
						rules={[
							{
								required: true,
								message: t("signup.messageRequired"),
							},
							{
								pattern: new RegExp(
									/[^\s@]+@[^\s@]+\.[^\s@]+$/
								),
								message: t(
									"signup.messageEmailInput.regexIsEmail"
								),
							},
						]}
					>
						<Input type="email" />
					</Form.Item>

					<Form.Item
						label={t("signup.passwordInput")}
						name="password"
						rules={[
							{
								required: true,
								message: t("signup.messageRequired"),
							},
							{
								pattern: new RegExp(
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
								),
								message: t(
									"signup.messagePasswordInput.regexCheckPassword"
								),
							},
							{
								pattern: new RegExp(/^[^\W_]+$/),
								message: t(
									"signup.messagePasswordInput.regexNotUseSpecialCharacters"
								),
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							md: { offset: 8, span: 16 },
						}}
					>
						<Button type="primary" htmlType="submit">
							{t("signup.btnRegister")}
						</Button>
						<p className="mt-3 dark:text-white">
							{t("signup.haveAccount")}
							<span
								className="text-[#1677ff] cursor-pointer max-md:font-bold max-md:underline max-md:text-white"
								onClick={() => navigate("/sign-in")}
							>
								{" "}
								{t("signup.login")}
							</span>
						</p>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default SignUp;
