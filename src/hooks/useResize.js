import { useEffect, useState } from "react";
import useThrottle from "./useThrottle";

const useResize = () => {
	const [widthScreen, setWidthScreen] = useState(window.innerWidth);
	const throttle = useThrottle(widthScreen);
	useEffect(() => {
		const handleResize = () => {
			setWidthScreen(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [throttle]);
	return widthScreen;
};

export default useResize;
