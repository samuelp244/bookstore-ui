import { BookType } from '@/types/books.types';
import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { Rating } from '../miscellaneous';
import { FiShoppingBag, FiCheck } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addBookToCart } from '@/redux/CheckoutCartSlice';
const BookCard = ({ bookData }: { bookData: BookType }) => {
	const { title, authors, average_rating, ratings_count, price } = bookData;

	const maxTitleLength = 30;
	const maxAuthorLength = 30;

	const truncatedTitle =
		title.length > maxTitleLength
			? title.slice(0, maxTitleLength) + '...'
			: title;
	const truncatedAuthors =
		authors.length > maxAuthorLength
			? authors.slice(0, maxAuthorLength) + '...'
			: authors;
	const CheckoutCartSlice = useAppSelector((state) => state.checkoutCart);
	const dispatch = useAppDispatch();
	const handleAddToCart = () => {
		if (CheckoutCartSlice.booksCart.some((o) => o.bookID === bookData.bookID)) {
			toast.warn('Already in the Cart!', {
				position: 'top-right',
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
			});
		} else {
			dispatch(addBookToCart(bookData));
		}
	};
	return (
		<div className="hover:shadow-2xl p-4 border border-[#EAEAEA] bg-[#FFFFFF] rounded-2xl flex flex-col justify-between h-64 gap-2 w-[230px] mx-auto">
			<p className="text-base font-bold text-[#333333] overflow-ellipsis">
				{truncatedTitle}
			</p>
			<p className="text-sm font-normal text-[#666666] truncate">
				{truncatedAuthors}
			</p>
			<div className="flex gap-1 my-auto">
				<Rating rating={average_rating} />
				<p className="text-sm font-extralight my-auto text-[#989898]">
					({ratings_count})
				</p>
			</div>
			<p className="text-sm font-bold text-[#000080] my-auto">
				&#x20B9; {price}
			</p>
			<Button
				leftIcon={
					<Icon
						as={
							CheckoutCartSlice.booksCart.some(
								(o) => o.bookID === bookData.bookID
							)
								? FiCheck
								: FiShoppingBag
						}
					/>
				}
				colorScheme="teal"
				onClick={handleAddToCart}
				className="w-full"
			>
				Add to Cart
			</Button>
			<div>
				<ToastContainer />
			</div>
		</div>
	);
};

export { BookCard };
