import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";

import { productApi } from "../../../Api/ProductApi/productApi";
import Message from "../../../components/Message";
import MyInput from "./../components/MyInput";

const validationSchema = Yup.object({
	fullName: Yup.string()
		.min(8, "Must be 8 character or than!")
		.required("Full name is a required field!"),
	age: Yup.number()
		.typeError("Age is a required field!")
		.min(18, "Please be over 18 years old!")
		.max(100, "Invalid age!"),
	address: Yup.string()
		.max(256, "Must be 256 character or less!")
		.required("Address is a required field!"),
});

const AddProduct = () => {
	const [showMessage, setShowMessage] = useState({
		show: false,
		type: "",
		content: "",
	});
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (location.state?.id) getData(location.state.id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getData = async (id) => {
		const res = await productApi.getProductId(id);
		const data = res.data;
		await setValueForm(data);
	};

	const setValueForm = (data) => {
		setValue("fullName", data.fullName, { shouldValidate: true });
		setValue("age", data.age, { shouldValidate: true });
		setValue("address", data.address, { shouldValidate: true });
		setFocus("fullName");
	};

	const {
		handleSubmit,
		reset,
		setFocus,
		setValue,
		control,
		formState: { errors, isSubmitting, isValid },
	} = useForm({ resolver: yupResolver(validationSchema), mode: "onChange" });

	const onSubmit = (values) => {
		return new Promise((resolve) => {
			if (location.state?.id) {
				productApi
					.updateProduct(location.state?.id, values)
					.then((res) => {
						res.status === 200 &&
							setShowMessage({
								show: true,
								type: "success",
								content: "Update success!",
							});
						return res;
					})
					.then((res) => {
						setTimeout(() => {
							navigate("/add-product");
							reset();
							setShowMessage({
								show: false,
								type: "",
								content: "",
							});
						}, 1000);
					});
				return;
			} else {
				productApi
					.addProduct(values)
					.then((res) => {
						res.status === 201 &&
							setShowMessage({
								show: true,
								type: "success",
								content: "Add success!",
							});
						return res;
					})
					.then((res) => {
						setTimeout(() => {
							reset();
							setShowMessage({
								show: false,
								type: "",
								content: "",
							});
						}, 1000);
						return res;
					})
					.then((res) => {
						setTimeout(() => {
							navigate("/");
						}, 2000);
					});
			}
		});
	};

	const handleFillDemo = (e) => {
		setValue("fullName", "Trinh Van Duc", { shouldValidate: true });
		setValue("age", Math.ceil(Math.random() * 82 + 18), {
			shouldValidate: true,
		});
		setValue("address", "Hoang Mai, Ha Noi", { shouldValidate: true });
	};

	return (
		<div
			className={
				isValid
					? "mx-auto max-w-[500px] px-[50px] py-[30px] bg-blue-300 rounded-3xl"
					: "mx-auto max-w-[500px] px-[50px] py-[30px] bg-gray-200 rounded-3xl"
			}
		>
			<h1 className="text-[36px] text-center font-bold">
				{location.state?.id ? "Update" : "Add"} Product
			</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				autoComplete="off"
				action=""
			>
				<div className="relative flex flex-col mt-6">
					<MyInput
						label="Full Name*"
						name="fullName"
						id="fullName"
						errors={errors}
						control={control}
						placeholder="Enter your full name..."
						autoFocus
					/>
				</div>
				<div className="relative flex flex-col mt-8 ">
					<MyInput
						label="Age*"
						name="age"
						id="age"
						type="number"
						errors={errors}
						control={control}
						placeholder="Enter your age..."
					/>
				</div>
				<div className="relative flex flex-col mt-8">
					<MyInput
						label="Address*"
						name="address"
						id="address"
						errors={errors}
						control={control}
						placeholder="Enter your address..."
					/>
				</div>
				<button
					className="w-full py-2 mt-20 font-bold text-white bg-blue-500 rounded-lg disabled:bg-gray-400"
					disabled={!isValid}
					type="submit"
				>
					{isSubmitting ? (
						<div className="w-4 h-4 mx-auto border-4 border-white rounded-full border-t-transparent animate-spin"></div>
					) : (
						"Submit"
					)}
				</button>
				<button
					type="button"
					className="px-2 py-1 mt-4 bg-green-500 rounded-lg w-max"
					onClick={handleFillDemo}
				>
					Fill input demo
				</button>
				<button
					type="button"
					className="px-2 py-1 mt-4 ml-4 bg-red-500 rounded-lg w-max"
					onClick={() => reset()}
				>
					Reset
				</button>
				<button
					type="button"
					className="px-2 py-1 mt-4 ml-4 bg-blue-500 rounded-lg w-max"
					onClick={() => navigate("/")}
				>
					Back
				</button>
			</form>
			<Message config={showMessage} />
		</div>
	);
};

export default AddProduct;
