import { takeLatest } from "redux-saga/effects";
import { handleAuthLogin, handleAuthRefreshToken } from "./AuthHandlers";
import { authLogin, authRefreshToken } from "./AuthSlice";

function* authSaga() {
	yield takeLatest(authLogin.type, handleAuthLogin);
	yield takeLatest(authRefreshToken.type, handleAuthRefreshToken);
}

export { authSaga };
