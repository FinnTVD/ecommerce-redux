import { Badge } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useToken from "../../../hooks/useToken";
import { setLengthShoppingCart } from "../../../store/ShoppingCartSlice";
import { urlApi } from "../../../utils/global";

const BadgeCard = ({ children }) => {
	const { isDelete, isAddSuccess, lengthShoppingCart } = useSelector(
		(state) => state.shoppingCart
	);
	const isToken = useToken();
	const dispatch = useDispatch();

	useEffect(() => {
		isToken &&
			axios.get(`${urlApi}/shoppingCart`).then((res) => {
				dispatch(setLengthShoppingCart(res.data.length));
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isDelete, isAddSuccess]);

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
