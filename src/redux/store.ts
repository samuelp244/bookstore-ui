import { configureStore } from '@reduxjs/toolkit';
import authenticationSliceReducer from './authSlice';

export const store = configureStore({
	reducer: {
		authentication: authenticationSliceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
