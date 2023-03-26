import { Badge } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLengthShoppingCart } from "../../../store/ShoppingCartSlice";
import { urlApi } from "../../../utils/global";

const BadgeCard = ({ children }) => {
	const { isDelete, isAddSuccess, lengthShoppingCart } = useSelector(
		(state) => state.shoppingCart
	);
	const { accessToken } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		accessToken &&
			axios.get(`${urlApi}/shoppingCart`).then((res) => {
				dispatch(setLengthShoppingCart(res.data.length));
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDelete, isAddSuccess, accessToken]);

	return (
		<Badge
			style={{
				userSelect: "none",
			}}
			count={lengthShoppingCart > 0 ? lengthShoppingCart : ""}
		>
			{children}
		</Badge>
	);
};
export default BadgeCard;
