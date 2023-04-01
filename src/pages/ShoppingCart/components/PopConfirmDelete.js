import { message, Popconfirm } from "antd";

const PopConfirmDelete = ({ children, deleteProduct }) => {
	const confirm = () => {
		message.success("Bạn vừa xóa sản phẩm khỏi giỏ hàng.");
		deleteProduct();
	};

	return (
		<Popconfirm
			placement="top"
			title="Xóa sản phẩm khỏi giỏ hàng"
			onConfirm={confirm}
			okText="Xóa"
			cancelText="Trở về"
		>
			{children}
		</Popconfirm>
	);
};

export default PopConfirmDelete;
