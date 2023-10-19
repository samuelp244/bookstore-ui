import { BrowseList } from '@/Components/BrowsePage';
import Head from 'next/head';
import React from 'react';

const browse = () => {
	return (
		<>
			<Head>
				<title>{`Explore Books - Bookstore's Book Collection`}</title>
				<meta
					name="description"
					content="Dive into a world of literature with Bookstore's extensive collection of books. Find the perfect read from a variety of genres and authors"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className="p-6">
					<BrowseList />
				</div>
			</main>
		</>
	);
};

export default browse;
