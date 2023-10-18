import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OnboardingModalSliceProps {
	modalState: boolean;
}

const initialState: OnboardingModalSliceProps = {
	modalState: false,
};

const OnboardingModalSlice = createSlice({
	name: 'OnboardingModal',
	initialState,
	reducers: {
		setOnboardingModalState(state, action: PayloadAction<boolean>) {
			state.modalState = action.payload;
		},
	},
});

export const { setOnboardingModalState } = OnboardingModalSlice.actions;

export default OnboardingModalSlice.reducer;
