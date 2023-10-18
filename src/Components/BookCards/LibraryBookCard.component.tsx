import { BookType } from '@/types/books.types';
import {
	Button,
	Icon,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { Rating } from '../miscellaneous';
import { FiShoppingBag, FiCheck } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addBookToCart } from '@/redux/CheckoutCartSlice';
import { RiShoppingBag3Fill, RiDeleteBinLine } from 'react-icons/ri';
import axiosInstance from '@/api/axiosInstance';

const LibraryBookCard = ({
	bookData,
	updateUserLibraryData,
}: {
	bookData: BookType;
	updateUserLibraryData: () => Promise<void>;
}) => {
	const { title, authors, average_rating, ratings_count, price } = bookData;
	const { isOpen, onOpen, onClose } = useDisclosure();

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

	const handleDelete = async () => {
		try {
			const response = await axiosInstance.delete(
				`/books/user/delete/${bookData.bookID}`
			);
			if (response.status === 200) {
				onClose(); // Close the modal when deletion is successful.
				await updateUserLibraryData();
			}
		} catch (error) {
			console.log(error);
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
				leftIcon={<Icon as={RiDeleteBinLine} />}
				colorScheme="red"
				onClick={onOpen} // Open the confirmation modal
				className="w-full"
			/>
			<ToastContainer />

			{/* Confirmation Modal */}
			<Modal isOpen={isOpen} onClose={onClose} size="sm">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Confirm Deletion</ModalHeader>
					<ModalCloseButton />
					<ModalBody>Are you sure you want to delete this book?</ModalBody>
					<ModalFooter>
						<Button colorScheme="red" onClick={handleDelete}>
							Confirm
						</Button>
						<Button variant="ghost" onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};

export { LibraryBookCard };
