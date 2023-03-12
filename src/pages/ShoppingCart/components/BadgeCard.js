import { Badge } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLengthShoppingCart } from "../../../store/ShoppingCartSlice";

const BadgeCard = ({ children }) => {
	const { isDelete, isAddSuccess, lengthShoppingCart } = useSelector(
		(state) => state.shoppingCart
	);
	const dispatch = useDispatch();

	useEffect(() => {
		axios
			.get("http://localhost:3000/shoppingCart")
			.then((res) => dispatch(setLengthShoppingCart(res.data.length)));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDelete, isAddSuccess]);

	return (
		<Badge count={lengthShoppingCart > 0 ? lengthShoppingCart : ""}>
			{children}
		</Badge>
	);
};
export default BadgeCard;
