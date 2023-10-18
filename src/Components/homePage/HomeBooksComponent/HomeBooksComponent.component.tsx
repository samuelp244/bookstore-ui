import axiosInstance from '@/api/axiosInstance';
import { BookCard } from '@/Components/BookCards';
import { BookType } from '@/types/books.types';
import { Button, Icon, Spinner } from '@chakra-ui/react';
import React, {
	useEffect,
	useState,
	useRef,
	useCallback,
	useLayoutEffect,
} from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsArrowRight } from 'react-icons/bs';
import { useRouter } from 'next/router';

const HomeBooksComponent = ({ sortBy }: { sortBy: 'ratings' | 'release' }) => {
	const [booksList, setBooksList] = useState<BookType[]>();
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const [scrollDistance, setScrollDistance] = useState(500);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const calculateScrollDistance = useCallback(() => {
		if (scrollContainerRef.current) {
			const screenWidth = window.innerWidth;
			const fraction = 0.5;
			const newScrollDistance = screenWidth * fraction;

			setScrollDistance(newScrollDistance);
		}
	}, []);
	useEffect(() => {
		window.addEventListener('resize', calculateScrollDistance);
		calculateScrollDistance();

		return () => {
			window.removeEventListener('resize', calculateScrollDistance);
		};
	}, [calculateScrollDistance]);

	useEffect(() => {
		setLoading(true);
		axiosInstance
			.get(`/books/list?limit=15&page=1&sortBy=${sortBy}`)
			.then((res) => {
				if (res.status === 200) {
					setBooksList(res.data.books);
					setLoading(false);
				}
			})
			.catch((error) => {
				console.error(error);
				setLoading(false);
			});
	}, [sortBy]);

	const scrollLeft = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft -= scrollDistance;
		}
	};

	const scrollRight = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollLeft += scrollDistance;
		}
	};

	return (
		<div className="p-4 bg-white rounded-2xl">
			{loading ? (
				<div className="h-72 flex justify-center items-center">
					<Spinner size="lg" />
				</div>
			) : (
				<>
					<div className="flex justify-between">
						<p className="text-lg font-bold mb-4 ml-2">
							{sortBy === 'release' ? 'New Releases' : 'Top Rated'}
						</p>
						<Button
							colorScheme={'gray'}
							fontSize="xs"
							size={'sm'}
							rightIcon={<Icon as={BsArrowRight} />}
							onClick={() => {
								router.push('/browse');
							}}
						>
							Explore more
						</Button>
					</div>
					<div className="flex">
						<div className="flex justify-between items-center mx-2">
							<button
								onClick={scrollLeft}
								className="hover:bg-slate-100 px-2 py-6"
							>
								<Icon as={FiChevronLeft} />
							</button>
						</div>

						<div
							className={`flex flex-nowrap overflow-x-auto gap-4 hide-scrollbar`}
							ref={scrollContainerRef}
						>
							{booksList?.map((book, index) => {
								return (
									<div key={book.bookID} className="">
										<BookCard bookData={book} />
									</div>
								);
							})}
						</div>
						<div className="flex justify-between items-center mx-2">
							<button
								onClick={scrollRight}
								className="hover:bg-slate-100 px-2 py-6"
							>
								<Icon as={FiChevronRight} />
							</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export { HomeBooksComponent };
