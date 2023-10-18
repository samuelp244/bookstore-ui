import { BookType } from '@/types/books.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CheckoutCartSliceProps {
	booksCart: BookType[];
}

const initialState: CheckoutCartSliceProps = {
	booksCart: [],
};

const CheckoutCartSlice = createSlice({
	name: 'CheckoutCart',
	initialState,
	reducers: {
		addBookToCart(state, action: PayloadAction<BookType>) {
			state.booksCart = [...state.booksCart, action.payload];
		},
		removeBookFromCart(state, action: PayloadAction<string>) {
			state.booksCart = state.booksCart.filter(
				(o) => o.bookID !== action.payload
			);
		},
		resetCart(state) {
			state.booksCart = [];
		},
	},
});

export const { addBookToCart, removeBookFromCart, resetCart } =
	CheckoutCartSlice.actions;

export default CheckoutCartSlice.reducer;
