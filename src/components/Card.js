import React from 'react';

const Card = ({ movie }) => {
	return (
		<li className="card">
			<img
				src={`https://image.tmdb.org/t/p/original` + movie.poster_path}
				alt={movie.title}
			/>
			<h2>{movie.title}</h2>
			<h5>
				{`Sorti le : ` +
					movie.release_date.split('-').reverse().join('/')}
			</h5>
			<h4>
				{movie.vote_average + `/10`} <span>⭐</span>
			</h4>
		</li>
	);
};

export default Card;
