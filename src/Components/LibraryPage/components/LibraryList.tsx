import axiosInstance from '@/api/axiosInstance';
import { BookCard } from '@/Components/BookCards';
import { LibraryBookCard } from '@/Components/BookCards/LibraryBookCard.component';
import { BookType } from '@/types/books.types';
import {
	Button,
	Icon,
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs';
import { IoSearchOutline } from 'react-icons/io5';
const LibraryList = () => {
	const [booksList, setBooksList] = useState<BookType[]>();
	const [loading, setLoading] = useState(false);
	const updateUserLibraryData = async () => {
		setLoading(true);
		axiosInstance
			.get(`/books/user/list`)
			.then((res) => {
				if (res.status === 200) {
					setBooksList(res.data.books);
					setLoading(false);
				}
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	};
	useEffect(() => {
		updateUserLibraryData();
	}, []);
	return (
		<div className="p-4 bg-white rounded-2xl min-h-[90vh]">
			{loading ? (
				<div className="min-h-[90vh] flex justify-center items-center">
					<Spinner size="lg" />
				</div>
			) : (
				<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
					{booksList?.map((book, index) => {
						return (
							<div key={index}>
								<LibraryBookCard
									bookData={book}
									updateUserLibraryData={updateUserLibraryData}
								/>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export { LibraryList };
