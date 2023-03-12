import { memo } from "react";
import { message } from "antd";
const Message = ({ config }) => {
	const [messageApi, contextHolder] = message.useMessage();
	const key = "updatable";
	const openMessage = () => {
		messageApi.open({
			key,
			type: "loading",
			content: "Loading...",
		});
		setTimeout(() => {
			messageApi.open({
				key,
				type: config.type,
				content: config.content,
				duration: 2,
			});
		}, 1000);
	};
	return (
		<>
			{contextHolder}
			{config.show ? openMessage() : ""}
		</>
	);
};
export default memo(Message);
