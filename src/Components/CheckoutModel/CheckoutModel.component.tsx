import axiosInstance from '@/api/axiosInstance';
import { removeBookFromCart, resetCart } from '@/redux/CheckoutCartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
	Button,
	Divider,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RiShoppingBag3Fill, RiDeleteBinLine } from 'react-icons/ri';

const CheckoutModel = ({
	openModel,
	onModalClose,
}: {
	openModel: boolean;
	onModalClose: () => void;
}) => {
	const [localIsOpen, setLocalIsOpen] = useState(openModel);
	const booksCart = useAppSelector((state) => state.checkoutCart.booksCart);
	const totalSum = booksCart.reduce(
		(sum, book) => sum + parseFloat(book.price),
		0
	);
	const dispatch = useAppDispatch();
	const handleDeleteBook = (bookId: string) => {
		dispatch(removeBookFromCart(bookId));
	};
	useEffect(() => {
		setLocalIsOpen(openModel);
	}, [openModel]);
	const router = useRouter();
	const handleCheckout = async () => {
		try {
			const response = await axiosInstance.post('/books/user/add', {
				books: booksCart,
			});
			if (response.status === 201) {
				setLocalIsOpen(false);
				dispatch(resetCart());
				router.push('/library');
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleCloseModal = () => {
		setLocalIsOpen(false);
		onModalClose();
	};
	return (
		<Modal
			blockScrollOnMount={false}
			isOpen={localIsOpen}
			onClose={handleCloseModal}
		>
			<ModalOverlay />
			<ModalContent borderRadius={'2xl'}>
				<ModalHeader> Cart</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<div className="flex justify-end">
						<p>
							Total: <span className="text-[#3182ce]">&#x20B9; {totalSum}</span>
						</p>
					</div>
					<Divider p={1} />
					<div className="mt-3 flex flex-col gap-2 max-h-96 overflow-scroll pb-2">
						{booksCart.map((i) => {
							return (
								<div key={i.bookID} className="flex justify-between">
									<div className="w-2/3">
										<p className="text-base font-bold  truncate">{i.title}</p>
										<p className="text-[#3182ce]">&#x20B9; {i.price}</p>
									</div>
									<Icon
										as={RiDeleteBinLine}
										onClick={() => {
											handleDeleteBook(i.bookID);
										}}
										fontSize="1.2rem"
										cursor={'pointer'}
										className="my-auto mr-3"
									/>
								</div>
							);
						})}
					</div>
				</ModalBody>

				<ModalFooter>
					<Button variant="ghost" mr={3} onClick={onModalClose}>
						Close
					</Button>
					<Button colorScheme="blue" onClick={handleCheckout}>
						Checkout
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export { CheckoutModel };
