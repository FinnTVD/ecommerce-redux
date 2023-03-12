import { Carousel } from "antd";
const contentStyle = {
	display: "flex",
	gap: "0 16px",
	height: "180px",
	maxHeight: "180px",
};
const carouselArr = new Array(3).fill(0);
const Slider = () => (
	<Carousel autoplay dots={{ className: "dotsSlider" }}>
		{carouselArr.map((e, index) => (
			<div key={index}>
				<div style={contentStyle}>
					<img
						className="w-1/2 cursor-pointer rounded-xl"
						src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/02/banner/reno8t-720-220-720x220-8.png"
						alt=""
					/>
					<img
						className="w-1/2 cursor-pointer rounded-xl"
						src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/2023/03/banner/s23-720-220-720x220-7.png"
						alt=""
					/>
				</div>
			</div>
		))}
	</Carousel>
);
export default Slider;
