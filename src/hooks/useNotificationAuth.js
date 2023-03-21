import { notification } from "antd";

const useNotificationAuth = () => {
	const [api, contextHolder] = notification.useNotification();
	const openNotificationWithIcon = (type, message) => {
		api[type]({
			message,
		});
	};
	return [contextHolder, openNotificationWithIcon];
};
export default useNotificationAuth;
