import { useController } from "react-hook-form";
const MyInput = ({ control, label, errors, ...props }) => {
	const { field } = useController({
		control,
		name: props.name,
		defaultValue: "",
	});

	return (
		<>
			<label
				className="text-xl font-bold select-none"
				htmlFor={props.id || props.name}
			>
				{label}
			</label>
			<input
				className="px-3 py-1 focus:outline-blue-500 caret-red-600"
				type="text"
				{...field}
				{...props}
			/>
			{errors[props.name]?.message && (
				<div className="absolute text-red-500 -bottom-6">
					{errors[props.name].message}
				</div>
			)}
		</>
	);
};

export default MyInput;
