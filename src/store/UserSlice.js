import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
	name: "user",
	initialState: {
		user: {},
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

const { reducer, actions } = UserSlice;

export const { setUser } = actions;

export default reducer;
