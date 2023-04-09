import { Button, Form, Input, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

const PostProduct = () => {
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log(values);
	};
	const onReset = () => {
		form.resetFields();
	};
	const onFill = () => {
		form.setFieldsValue({
			note: "Hello world!",
			gender: "male",
		});
	};
	return (
		<Form
			{...layout}
			form={form}
			name="control-hooks"
			onFinish={onFinish}
			className="max-w-[600px]"
		>
			<Form.Item
				name="name"
				label="Tên sản phẩm"
				rules={[
					{
						required: true,
					},
				]}
			>
				{/* <Input /> */}
				<TextArea rows={4} />
			</Form.Item>
			<Form.Item
				name="price"
				label="Giá"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="avatar"
				label="Link ảnh nền"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Màu sản phẩm"
				name="color"
				rules={[
					{
						required: true,
						message: "Missing first name",
					},
				]}
			>
				<Input placeholder="First Name" />
			</Form.Item>
			<Form.Item
				label="Link ảnh"
				name="image"
				rules={[
					{
						required: true,
						message: "Missing last name",
					},
				]}
			>
				<Input placeholder="Last Name" />
			</Form.Item>
			<Form.List name="option">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, ...restField }) => (
							<div key={key} className="flex">
								<div className="w-[95%]">
									<Form.Item
										{...restField}
										label="Màu sản phẩm"
										name={[name, "color"]}
										rules={[
											{
												required: true,
												message: "Missing first name",
											},
										]}
									>
										<Input placeholder="First Name" />
									</Form.Item>
									<Form.Item
										{...restField}
										label="Link Image"
										name={[name, "image"]}
										rules={[
											{
												required: true,
												message: "Missing last name",
											},
										]}
									>
										<Input placeholder="Last Name" />
									</Form.Item>
								</div>
								<div className="w-[5%] flex justify-center">
									<MinusCircleOutlined
										onClick={() => remove(name)}
										className="mt-6 text-2xl h-fit"
									/>
								</div>
							</div>
						))}
						<Form.Item className="flex justify-end">
							<Button
								icon={<PlusOutlined />}
								type="dashed"
								onClick={() => add()}
							>
								Thêm bản màu mới cho sản phầm
							</Button>
						</Form.Item>
					</>
				)}
			</Form.List>
			<Form.Item
				name="category"
				label="Danh mục"
				rules={[
					{
						required: true,
					},
				]}
			>
				<Select
					placeholder="Vui lòng lựa chọn danh mục cho sản phẩm"
					allowClear
				>
					<Option value="smartphone">Điện thoại</Option>
					<Option value="tablet">Ipad</Option>
					<Option value="laptop">Laptop</Option>
					<Option value="sound">Loa</Option>
					<Option value="watch">Đồng hồ</Option>
				</Select>
			</Form.Item>
			<Form.Item
				name="sale"
				label="Giảm giá (%)"
				rules={[
					{
						required: false,
					},
				]}
			>
				<Input type="number" />
			</Form.Item>
			<Form.Item
				name="status"
				label="Trạng thái"
				rules={[
					{
						required: false,
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="gift"
				label="Quà tặng"
				rules={[
					{
						required: false,
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="guarantee"
				label="Bảo hành"
				rules={[
					{
						required: false,
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item
				name="promote"
				label="Ưu đãi lớn"
				rules={[
					{
						required: false,
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
				<Button htmlType="button" onClick={onReset}>
					Reset
				</Button>
				<Button type="link" htmlType="button" onClick={onFill}>
					Fill form
				</Button>
			</Form.Item>
		</Form>
	);
};
export default PostProduct;
