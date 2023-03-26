import { call, put } from "redux-saga/effects";
import { saveToken } from "../../utils/auth";
import {
	requestAuthFetchMe,
	requestAuthLogin,
	requestAuthRefreshToken,
} from "./AuthRequests";
import { authUpdateUser } from "./AuthSlice";

function* handleAuthLogin({ payload }) {
	try {
		const res = yield call(requestAuthLogin, payload);
		if (res.data && res.status === 200) {
			saveToken(res.data.accessToken, res.data.refreshToken);
			yield call(handleAuthFetchMe, { payload: res.data.accessToken });
		}
	} catch (error) {}
}

function* handleAuthFetchMe({ payload }) {
	try {
		const res = yield call(requestAuthFetchMe, payload);
		if (res.data && res.status === 200) {
			yield put(
				authUpdateUser({
					user: res.data,
					accessToken: payload,
				})
			);
		}
	} catch (error) {}
}

function* handleAuthRefreshToken({ payload }) {
	try {
		const res = yield call(requestAuthRefreshToken, payload);
		if (res.data && res.status === 200) {
			saveToken(res.data.accessToken, res.data.refreshToken);
			yield handleAuthFetchMe({
				payload: res.data.accessToken,
			});
		}
	} catch (error) {}
}

export { handleAuthLogin, handleAuthRefreshToken };
