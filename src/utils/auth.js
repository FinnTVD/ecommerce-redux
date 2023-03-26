import Cookies from "js-cookie";
import { cookie_domain } from "./global";
const accessTokenKey = "ecom_access_token";
const refreshTokenKey = "ecom_refresh_token";
const objCookies = {
	expires: 30,
	domain: cookie_domain,
};

export const saveToken = (access_token, refresh_token) => {
	if (access_token && refresh_token) {
		Cookies.set(accessTokenKey, access_token, { ...objCookies });
		Cookies.set(refreshTokenKey, refresh_token, { ...objCookies });
	} else {
		Cookies.remove(accessTokenKey, { ...objCookies });
		Cookies.remove(refreshTokenKey, { ...objCookies });
	}
};

export const getToken = () => {
	const access_token = Cookies.get(accessTokenKey);
	const refresh_token = Cookies.get(refreshTokenKey);
	return {
		access_token,
		refresh_token,
	};
};
