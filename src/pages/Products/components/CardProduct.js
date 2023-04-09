import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const CardProduct = ({ item }) => {
	const navigate = useNavigate();
	const { id, name, listPrice, rating, avatar } = item;

	return (
		<Card
			className="cardProduct cursor-pointer"
			onClick={() => navigate(`/product/${id}`)}
			cover={
				<img
					src={avatar}
					className="w-full h-[300px] max-lg:h-[170px] object-contain"
					alt={name}
				/>
			}
			actions={[
				<div className="text-[#d70018] font-bold text-center">
					{listPrice.toLocaleString("vi", {
						style: "currency",
						currency: "VND",
					})}
				</div>,
				<div className="flex items-center justify-center">
					{rating.rate}{" "}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="#f59e0b"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-5 h-5 text-[#f59e0b]"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
						/>
					</svg>
				</div>,
				<div>Reviews: {rating.review}</div>,
			]}
		>
			<h1
				title={name}
				className="text-base font-medium truncate max-sm:text-center "
			>
				{name}
			</h1>
		</Card>
	);
};

export default CardProduct;
