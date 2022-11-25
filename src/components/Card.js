import React, { useEffect, useState } from 'react';

const Card = ({ movie }) => {
	const [dataGenre, setDataGenre] = useState([]);

	useEffect(() => {
		fetch(
			'https://api.themoviedb.org/3/genre/movie/list?api_key=71f1c0748cbaa032bf6d4124a879bf21&language=fr-FR'
		)
			.then((res) => res.json())
			.then((data) => setDataGenre(data.genres))
			.catch((error) => console.log('Erreur : ' + error));
	}, []);

	return (
		<li className="card">
			<img
				src={
					`https://image.tmdb.org/t/p/original`
						? `https://image.tmdb.org/t/p/original` +
						  movie.poster_path
						: `./img/poster.jpg`
				}
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
			<ul></ul>
			<h3>Synopsis</h3>
			<p>{movie.overview}</p>
			<div className="btn">Ajouter aux coups de coeur</div>
		</li>
	);
};

export default Card;
