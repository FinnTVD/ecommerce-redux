/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { productApi } from "./../../../Api/ProductApi/productApi";
const { Column } = Table;

const TableProduct = ({ listProduct, setIsCheck, isCheck, setShowMessage }) => {
	const navigate = useNavigate();

	const confirm = async (id) => {
		await setShowMessage({
			show: true,
			type: "success",
			content: "Delete success!",
		});
		await productApi.deleteProduct(id);
		await setIsCheck(!isCheck);
	};

	return (
		<>
			<Table dataSource={listProduct} rowKey={(key) => key.id}>
				<Column title="Full Name" dataIndex="fullName" key="fullName" />
				<Column title="Age" dataIndex="age" key="age" />
				<Column title="Address" dataIndex="address" key="address" />
				<Column
					title="Action"
					key="action"
					render={(_, record) => (
						<Space size="middle">
							<Button
								className="bg-yellow-500"
								onClick={() =>
									navigate("/add-product", {
										state: { id: record.id },
									})
								}
							>
								Edit
							</Button>
							<Popconfirm
								title="Delete the product"
								onConfirm={() => confirm(record.id)}
								icon={
									<QuestionCircleOutlined
										style={{
											color: "red",
										}}
									/>
								}
							>
								<Button type="primary" danger>
									Delete
								</Button>
							</Popconfirm>
						</Space>
					)}
				/>
			</Table>
		</>
	);
};

export default TableProduct;
