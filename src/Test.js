import { useEffect, useState } from "react";
import useThrottle from "./hooks/useThrottle";

const Test = () => {
	const [value, setValue] = useState("");
	const throttle = useThrottle(value);

	useEffect(() => {
		console.log("change");
	}, [throttle]);
	const handleChange = (e) => {
		setValue(e.target.value);
	};
	return (
		<div>
			<input type="text" value={value} onChange={handleChange} />
		</div>
	);
};

export default Test;
