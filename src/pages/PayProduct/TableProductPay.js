import { Image, Table } from "antd";

const TableProductPay = ({ selectedRowKeys = [] }) => {
	if (!selectedRowKeys.length) return;
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
					className="!w-20 !h-20 object-contain"
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
