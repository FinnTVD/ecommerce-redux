import { Carousel } from "antd";
const contentStyle = {
	display: "flex",
	gap: "0 16px",
	height: "180px",
	maxHeight: "180px",
};
const carouselArr = new Array(3).fill(0);
const SliderProduct = () => (
	<Carousel autoplay dots={{ className: "dotsSlider" }}>
		{carouselArr.map((e, index) => (
			<div key={index}>
				<div style={contentStyle}>
					<img
						className="w-1/2 cursor-pointer rounded-xl"
						src="/image/left-slide.jpg"
						alt=""
					/>
					<img
						className="w-1/2 cursor-pointer rounded-xl"
						src="/image/right-slide.jpg"
						alt=""
					/>
				</div>
			</div>
		))}
	</Carousel>
);
export default SliderProduct;
