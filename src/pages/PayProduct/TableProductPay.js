import { Image, Table } from "antd";
import { useSelector } from "react-redux";

const TableProductPay = () => {
	const { selectedRowKeys } = useSelector((state) => state.shoppingCart);

	const columns = [
		{
			title: <p>Tên sản phẩm</p>,
			dataIndex: "name",
			render: (text) => <h2>{text}</h2>,
		},
		{
			title: <p className="text-center">Hình ảnh</p>,
			dataIndex: "avatar",
			render: (src) => (
				<Image
					style={{
						width: "80px",
						height: "80px",
						objectFit: "contain",
					}}
					src={src}
					alt=""
				/>
			),
		},
		{
			title: <p className="text-center">Màu sắc</p>,
			key: "option",
			render: ({ option }) => (
				<span className="font-semibold">{option[0].color}</span>
			),
		},
		{
			title: <p className="text-center">Thành Tiền</p>,
			dataIndex: "listPrice",
			render: (listPrice) => (
				<span className="text-[#d70018] font-semibold">
					{listPrice.toLocaleString("vi", {
						style: "currency",
						currency: "VND",
					})}
				</span>
			),
		},
	];

	return (
		<>
			<Table
				rowKey={(obj) => obj.id}
				columns={columns}
				dataSource={selectedRowKeys}
				pagination={false}
			/>
		</>
	);
};
export default TableProductPay;
