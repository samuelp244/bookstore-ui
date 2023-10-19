import axiosInstance from '@/api/axiosInstance';
import { BookCard } from '@/Components/BookCards';
import { BookType } from '@/types/books.types';
import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { HomeBooksComponent } from './HomeBooksComponent';

const NewReleasesBookComponent = () => {
	return <HomeBooksComponent sortBy="release" />;
};

export { NewReleasesBookComponent };
