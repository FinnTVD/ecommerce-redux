import useResize from "../../../hooks/useResize";
import { customArray } from "../../../utils/global";

import { Carousel } from "antd";

const SliderProduct = () => {
	const widthScreen = useResize();
	return (
		<Carousel autoplay>
			{customArray(3).map((e, index) => (
				<div key={index}>
					<div className="flex gap-x-4 h-[180px] rounded-xl !overflow-hidden">
						<img
							className={`${
								widthScreen >= 768 ? "w-1/2" : "w-full"
							} cursor-pointer rounded-xl`}
							src={
								widthScreen >= 768
									? "/image/left-slide.jpg"
									: index % 2 === 0
									? "/image/left-slide.jpg"
									: "/image/right-slide.jpg"
							}
							alt=""
						/>
						{widthScreen >= 768 && (
							<img
								className="w-1/2 cursor-pointer rounded-xl"
								src="/image/right-slide.jpg"
								alt=""
							/>
						)}
					</div>
				</div>
			))}
		</Carousel>
	);
};

export default SliderProduct;
