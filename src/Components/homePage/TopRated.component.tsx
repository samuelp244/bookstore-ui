import React from 'react';
import { HomeBooksComponent } from './HomeBooksComponent';

const TopRatedBooksComponent = () => {
	return <HomeBooksComponent sortBy="ratings" />;
};

export { TopRatedBooksComponent };
