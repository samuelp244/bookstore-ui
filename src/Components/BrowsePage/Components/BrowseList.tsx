import axiosInstance from '@/api/axiosInstance';
import { BookCard } from '@/Components/BookCards';
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
const BrowseList = () => {
	const [booksList, setBooksList] = useState<BookType[]>();
	const [limit, setLimit] = useState('15');
	const [searchQuery, setSearchQuery] = useState<string>();
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		axiosInstance
			.get(`/books/list?limit=${limit}&page=${page}&searchQuery=${searchQuery}`)
			.then((res) => {
				if (res.status === 200) {
					setBooksList(res.data.books);
					setLoading(false);
					window.scrollTo(0, 0);
				}
			})
			.catch((err) => {
				console.error(err);
				setLoading(false);
			});
	}, [limit, page, searchQuery]);
	return (
		<div className="p-4 bg-white rounded-2xl">
			{loading ? (
				<div className="h-[85vh] flex justify-center items-center">
					<Spinner size="lg" />
				</div>
			) : (
				<>
					<div className="flex justify-between px-2">
						<div className="sm:w-1/2">
							<InputGroup>
								<InputLeftElement pointerEvents="none">
									<Icon as={IoSearchOutline} />
								</InputLeftElement>
								<Input
									placeholder="Search"
									value={searchQuery}
									onChange={(e) => {
										setSearchQuery(e.target.value);
									}}
								/>
							</InputGroup>
						</div>

						<div className="flex gap-2 ">
							<p className="my-auto pb-1.5">Limit :</p>
							<div>
								<Select
									value={limit}
									onChange={(e) => {
										setLimit(e.target.value);
									}}
									size="sm"
								>
									<option value="15">15</option>
									<option value="30">30</option>
									<option value="50">50</option>
								</Select>
							</div>
						</div>
					</div>
					<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
						{booksList?.map((book, index) => {
							return (
								<div key={index}>
									<BookCard bookData={book} />
								</div>
							);
						})}
					</div>
					<div className="flex justify-center gap-2 mt-5">
						<div>
							<Button
								leftIcon={<Icon as={BsArrowLeft} />}
								variant={'outline'}
								onClick={() => {
									setPage((c) => c - 1);
								}}
								isDisabled={page === 1}
							>
								Prev
							</Button>
						</div>
						<p className="my-auto text-lg font-bold">{page}</p>
						<div>
							<Button
								rightIcon={<Icon as={BsArrowRight} />}
								variant={'outline'}
								onClick={() => {
									setPage((c) => c + 1);
								}}
							>
								Next
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export { BrowseList };
