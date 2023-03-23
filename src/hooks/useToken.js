import Cookies from "js-cookie";

const useToken = () => {
	return !!Cookies.get("token");
};

export default useToken;
