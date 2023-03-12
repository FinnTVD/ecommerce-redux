import React from "react";
import { Button, Col, Row, Skeleton } from "antd";
import { Link } from "react-router-dom";
import TableProduct from "./TableProduct";
import Message from "../../../components/Message";
import { productApi } from "./../../../Api/ProductApi/productApi";

const ListProduct = () => {
	const [listProduct, setListProduct] = React.useState([]);
	const [isCheck, setIsCheck] = React.useState(false);
	const [showMessage, setShowMessage] = React.useState({
		show: false,
		type: "",
		content: "",
	});

	React.useEffect(() => {
		getData();
		showMessage.show &&
			setShowMessage({
				show: false,
				type: "",
				content: "",
			});
		console.log("render");
	}, [isCheck]);

	const getData = async () => {
		const res = await productApi.getAll();
		const data = await res.data;
		setListProduct(data.reverse());
	};

	return (
		<div>
			<h1>List Product</h1>
			<Row justify="end">
				<Col span={2}>
					<Link to="add-product">
						<Button type="primary" className="bg-blue-600">
							Add
						</Button>
					</Link>
				</Col>
			</Row>
			{listProduct.length === 0 ? (
				<div>
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			) : (
				<TableProduct
					listProduct={listProduct}
					setIsCheck={setIsCheck}
					isCheck={isCheck}
					setShowMessage={setShowMessage}
				/>
			)}
			<Message config={showMessage} />
		</div>
	);
};

export default ListProduct;
