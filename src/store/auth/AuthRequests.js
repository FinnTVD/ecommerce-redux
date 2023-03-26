import axios from "axios";
import { portAuth } from "../../utils/global";

export const requestAuthLogin = (data) => {
	return axios.post(`${portAuth}/auth/login`, {
		...data,
	});
};

export const requestAuthFetchMe = (token) => {
	if (!token) return;
	return axios.get(`${portAuth}/me`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});
};

export const requestAuthRefreshToken = (token) => {
	if (!token) return;
	return axios.post(`${portAuth}/token`, { refreshToken: token });
};
