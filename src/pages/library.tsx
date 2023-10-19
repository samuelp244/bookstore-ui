import { LibraryList } from '@/Components/LibraryPage';
import Head from 'next/head';
import React from 'react';

const libraryPage = () => {
	return (
		<>
			<Head>
				<title>{`Your Library - Bookstore's Bookshelf`}</title>
				<meta
					name="description"
					content="Access your personal library at Bookstore, where you can manage and enjoy the books you've collected. Your curated collection of reads, all in one place."
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<div className="p-6">
					<LibraryList />
				</div>
			</main>
		</>
	);
};

export default libraryPage;
