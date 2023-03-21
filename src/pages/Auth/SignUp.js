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
			const res = await axios.post(
				`${portAuth}/api/auth/register`,
				values
			);
			res.status === 200 && navigate("/sign-in");
		} catch (error) {
			openNotificationWithIcon(
				"error",
				"Đăng ký tài khoản thất bại, vui lòng thử lại!"
			);
		}
	};
	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};
	return (
		<>
			{contextHolder}
			<Form
				name="basic"
				labelCol={{
					span: 8,
				}}
				wrapperCol={{
					span: 16,
				}}
				style={{
					maxWidth: 600,
					margin: "100px auto 0",
				}}
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="off"
			>
				<Form.Item
					label="UserName"
					name="name"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							message: "Please input your username!",
						},
					]}
				>
					<Input type="email" />
				</Form.Item>

				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
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
						Register
					</Button>
					<Button onClick={() => navigate("/sign-in")}>SignIn</Button>
				</Form.Item>
			</Form>
		</>
	);
};

export default SignUp;
