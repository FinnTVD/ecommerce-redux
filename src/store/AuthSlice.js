import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { portAuth } from "../utils/global";
import axios from "axios";
import { requestAuthFetchMe, saveToken } from "../utils/auth";

const AuthSlice = createSlice({
	name: "auth",
	initialState: {
		user: undefined,
		accessToken: null,
		avatarUser: "",
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken;
		},
		setAvatarUser: (state, action) => {
			state.avatarUser = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(authRefreshToken.fulfilled, (state, action) => {
			state.user = action.payload.user;
			state.accessToken = action.payload.accessToken;
		});
	},
});

export const authRefreshToken = createAsyncThunk(
	"authRefreshToken",
	async (token) => {
		if (!token) return;
		try {
			const res = await axios.post(`${portAuth}/token`, {
				refreshToken: token,
			});
			if (res.data && res.status === 200) {
				saveToken(res.data.accessToken, res.data.refreshToken);
				const res2 = await requestAuthFetchMe(res.data.accessToken);
				return {
					user: res2.data,
					accessToken: res.data.accessToken,
				};
			}
		} catch (error) {
			throw new Error(error);
		}
	}
);

export const { setUser, setAvatarUser } = AuthSlice.actions;

export default AuthSlice.reducer;
