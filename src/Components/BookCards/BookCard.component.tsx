import { BookType } from '@/types/books.types';
import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { Rating } from '../miscellaneous';
import { FiShoppingBag, FiCheck } from 'react-icons/fi';

const BookCard = ({ bookData }: { bookData: BookType }) => {
	const { title, authors, average_rating, ratings_count, price } = bookData;

	const maxTitleLength = 30; // Set your desired max title length
	const maxAuthorLength = 30; // Set your desired max author length

	const truncatedTitle =
		title.length > maxTitleLength
			? title.slice(0, maxTitleLength) + '...'
			: title;
	const truncatedAuthors =
		authors.length > maxAuthorLength
			? authors.slice(0, maxAuthorLength) + '...'
			: authors;

	return (
		<div className="hover:shadow-2xl p-4 border border-[#EAEAEA] bg-[#FFFFFF] rounded-2xl grid justify-between h-64 gap-2 w-[230px] mx-auto">
			<p className="text-base font-bold text-[#333333] overflow-ellipsis">
				{truncatedTitle}
			</p>
			<p className="text-sm font-normal text-[#666666] truncate">
				{truncatedAuthors}
			</p>
			<p className="flex gap-1 my-auto">
				<Rating rating={average_rating} />
				<span className="text-sm font-extralight my-auto text-[#989898]">
					({ratings_count})
				</span>
			</p>
			<p className="text-sm font-bold text-[#000080] my-auto">
				&#x20B9; {price}
			</p>
			<Button leftIcon={<Icon as={FiShoppingBag} />} colorScheme="teal">
				Add to Cart
			</Button>
		</div>
	);
};

export { BookCard };
