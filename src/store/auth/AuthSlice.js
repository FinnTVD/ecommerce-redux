import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
	name: "auth",
	initialState: {
		user: undefined,
		accessToken: null,
	},
	reducers: {
		authLogin: (state, action) => ({
			...state,
		}),
		authUpdateUser: (state, action) => ({
			...state,
			user: action.payload.user,
			accessToken: action.payload.accessToken,
		}),
		authRefreshToken: (state, action) => ({
			...state,
		}),
	},
});

export const { authLogin, authUpdateUser, authRefreshToken } =
	AuthSlice.actions;

export default AuthSlice.reducer;
