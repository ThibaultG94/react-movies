import React from 'react';

const Card = ({ movie }) => {
	return (
		<li className="card">
			<img src={movie.backdrop_path} alt={movie.title} />
		</li>
	);
};

export default Card;
