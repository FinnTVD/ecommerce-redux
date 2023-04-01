import { notification } from "antd";

const useNotificationAuth = () => {
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, message) => {
		api[type]({
			message,
			duration: 1.2,
			closeIcon: (
				<button
					className={`${
						type === "success" ? "text-green-500" : "text-red-500"
					}`}
				>
					x
				</button>
			),
		});
	};
	return [contextHolder, openNotificationWithIcon];
};
export default useNotificationAuth;
