import React from 'react';
import { AiFillStar as solidStar } from 'react-icons/ai';
import { AiOutlineStar as outlineStar } from 'react-icons/ai';
import { Icon } from '@chakra-ui/react';

interface RatingProps {
	rating: string;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
	const parsedRating = parseFloat(rating);

	const maxStars = 5;

	const filledStars = Math.floor(parsedRating);
	const remainingRating = parsedRating - filledStars;
	let outlinedStars = maxStars - filledStars - (remainingRating > 0.5 ? 1 : 0);

	const stars = [];
	for (let i = 0; i < filledStars; i++) {
		stars.push(<Icon as={solidStar} key={i} color="gold" />);
	}
	if (remainingRating > 0.5) {
		stars.push(<Icon as={solidStar} key={filledStars} color="gold" />);
		outlinedStars--;
	}
	for (let i = 0; i < outlinedStars; i++) {
		stars.push(<Icon as={outlineStar} key={filledStars + i} color="gold" />);
	}

	return (
		<div className="rating">
			{stars.map((star, index) => (
				<span key={index}>{star}</span>
			))}
		</div>
	);
};

export { Rating };
