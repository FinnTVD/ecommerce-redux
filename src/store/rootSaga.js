import { all, fork } from "redux-saga/effects";
import { authSaga } from "./auth/AuthSaga";

export default function* rootSaga() {
	yield all([fork(authSaga)]);
}
