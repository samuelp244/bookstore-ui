import { configureStore } from '@reduxjs/toolkit';
import authenticationSliceReducer from './authSlice';
import CheckoutCartSliceReducer from './CheckoutCartSlice';
import OnboardingStateSliceReducer from './OnboardingStateSlice';
export const store = configureStore({
	reducer: {
		authentication: authenticationSliceReducer,
		checkoutCart: CheckoutCartSliceReducer,
		onboardingModal: OnboardingStateSliceReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
