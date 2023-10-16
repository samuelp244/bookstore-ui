import { createSlice } from '@reduxjs/toolkit';

interface AuthenticationStateSlice {
	user: {
		username: string;
		email: string;
		role: string;
		userId: string;
	} | null;
	accessToken: string | null;
}

const initialState: AuthenticationStateSlice = {
	user: null,
	accessToken: null,
};

const AuthenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		resetAccessToken(state) {
			state.user = null;
			state.accessToken = null;
		},
		addAccessToken(state, action: any) {
			state.accessToken = action?.payload?.accessToken;
		},
		addUserData(state, action: any) {
			state.user = action?.payload?.userDetails;
		},
	},
});

export const { resetAccessToken, addAccessToken, addUserData } =
	AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
