import { message, Popconfirm } from "antd";

const cancel = (e) => {
	console.log(e);
	message.error("Click on No");
};
const PopConfirmDelete = ({ children, onClick }) => {
	const confirm = (e) => {
		console.log(e);
		message.success("Click on Yes");
		onClick();
	};

	return (
		<Popconfirm
			placement="bottom"
			title="Delete the product"
			onConfirm={confirm}
			onCancel={cancel}
			okText="Yes"
			cancelText="No"
		>
			{children}
		</Popconfirm>
	);
};

export default PopConfirmDelete;
