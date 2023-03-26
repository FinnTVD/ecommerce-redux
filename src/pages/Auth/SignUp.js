import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useNotificationAuth from "../../hooks/useNotificationAuth";
import { portAuth } from "../../utils/global";

const SignUp = () => {
	const [contextHolder, openNotificationWithIcon] = useNotificationAuth();
	const navigate = useNavigate();
	const onFinish = async (values) => {
		try {
			const res = await axios.post(`${portAuth}/auth/register`, {
				...values,
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
		<div className="flex relative justify-between bg-gradient-to-r from-indigo-600 to-sky-400 w-screen h-screen">
			{contextHolder}
			<div className="flex flex-col items-center justify-center w-[35%] gap-y-10">
				<h1 className="text-white font-bold text-5xl text-center">
					Welcome
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
				<p className="text-center text-white">
					Hãy đăng ký tài khoản để được trải nghiệm các sản phẩm tốt
					nhất của chúng tôi.
				</p>
				<div className="h-[100px]"></div>
			</div>
			<div className="flex items-center  justify-center w-[calc(65%-80px)] bg-white dark:bg-[#0f172a] absolute h-4/5 top-1/2 right-0 -translate-y-1/2 before:content-[''] before:absolute before:bg-white before:dark:bg-[#0f172a] before:w-[80px] before:h-full before:z-50 before:top-0 before:-left-[79px] before:rounded-l-[50%]">
				<Form
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					className="w-[600px]"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="Tên"
						name="name"
						rules={[
							{
								required: true,
								message: "Vui lòng điền vào mục này!",
							},
							{
								min: 6,
								message:
									"Vui lòng nhập đặt tên phải có từ 6 kí tự trở lên!",
							},
						]}
					>
						<Input autoFocus />
					</Form.Item>

					<Form.Item
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Vui lòng điền vào mục này!",
							},
							{
								min: 6,
								message:
									"Vui lòng nhập email phải có từ 6 kí tự trở lên!",
							},
						]}
					>
						<Input type="email" />
					</Form.Item>

					<Form.Item
						label="Mật khẩu"
						name="password"
						rules={[
							{
								required: true,
								message: "Vui lòng điền vào mục này!",
							},
							{
								pattern: new RegExp(
									/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/
								),
								message:
									"Vui lòng đặt mất khẩu phải có ít nhất 1 kí tự hoa, 1 kí tự thường, 1 số và có ít nhất 6 kí tự!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button type="primary" htmlType="submit">
							Đăng ký
						</Button>
						<p className="mt-3 dark:text-white">
							Bạn đã có tài khoản, hãy bấm vào đây để
							<span
								className="text-[#1677ff] cursor-pointer"
								onClick={() => navigate("/sign-in")}
							>
								{" "}
								Đăng nhập
							</span>
						</p>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default SignUp;
