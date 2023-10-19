import axiosInstance from '@/api/axiosInstance';
import { LibraryBookCard } from '@/Components/BookCards/LibraryBookCard.component';
import { BookType } from '@/types/books.types';
import { Icon, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';
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
		<div className="p-4 bg-white rounded-2xl min-h-[87vh]">
			{loading ? (
				<div className="min-h-[90vh] flex justify-center items-center">
					<Spinner size="lg" />
				</div>
			) : (
				<>
					{booksList !== undefined && booksList.length > 0 ? (
						<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
							{booksList?.map((book, index) => (
								<div key={index}>
									<LibraryBookCard
										bookData={book}
										updateUserLibraryData={updateUserLibraryData}
									/>
								</div>
							))}
						</div>
					) : (
						<div className="flex items-center justify-center w-full h-[50vh] text-gray-500">
							<div className="flex flex-col gap-3 items-center">
								<Icon as={FiShoppingBag} fontSize="3rem" />
								<p>Your library is empty.</p>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export { LibraryList };
