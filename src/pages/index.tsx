import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import {
	NewReleasesBookComponent,
	TopRatedBooksComponent,
} from '@/Components/homePage';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<Head>
				<title>Bookstore - Your Online Destination for Books</title>
				<meta
					name="description"
					content="Welcome to Bookstore, your go-to online destination for discovering, buying, and managing your favorite books. Explore a wide range of titles and genres with ease."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className="p-6 h-[95vh]">
					<div className="mb-10">
						<NewReleasesBookComponent />
					</div>
					<div>
						<TopRatedBooksComponent />
					</div>
				</div>
			</main>
		</>
	);
}
