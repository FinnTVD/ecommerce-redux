import { message, Popconfirm } from "antd";

const cancel = () => {
	message.error("Click on No");
};
const PopConfirmDelete = ({ children, deleteProduct }) => {
	const confirm = () => {
		message.success("Click on Yes");
		deleteProduct();
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
