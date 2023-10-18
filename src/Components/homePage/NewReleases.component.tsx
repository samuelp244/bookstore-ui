import axiosInstance from '@/api/axiosInstance';
import { BookCard } from '@/Components/BookCards';
import { BookType } from '@/types/books.types';
import { Button, Icon } from '@chakra-ui/react';
import React, { useEffect, useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { BsArrowRight } from 'react-icons/bs';
import { HomeBooksComponent } from './HomeBooksComponent';

const NewReleasesBookComponent = () => {
	return <HomeBooksComponent sortBy="release" />;
};

export { NewReleasesBookComponent };
