import React from 'react';

const Card = ({ movie, dataGenre }) => {
	const addFavorite = () => {
		let storedData = window.localStorage.movies
			? window.localStorage.movies.split(',')
			: [];

		if (!storedData.includes(movie.id.toString())) {
			storedData.push(movie.id);
			window.localStorage.movies = storedData;
		}
	};

	const deleteFavorite = () => {
		let storedData = window.localStorage.movies.split(',');
		let newData = storedData.filter((id) => id != movie.id);
		window.localStorage.movies = newData;
	};

	return (
		<div className="card">
			<img
				src={
					movie.poster_path
						? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
						: './img/poster.jpg'
				}
				alt={`affiche ${movie.title}`}
			/>
			<h2>{movie.title}</h2>
			{movie.release_date ? (
				<h5>
					Sorti le :{' '}
					{movie.release_date.split('-').reverse().join('/')}
				</h5>
			) : null}
			<h4>
				{movie.vote_count ? movie.vote_average.toFixed(1) + `/10` : ''}{' '}
				<span>⭐</span>
			</h4>
			<ul>
				{movie.genre_ids
					? movie.genre_ids.map((ids) => {
							return dataGenre
								.filter((genre) => genre.id === ids)
								.map((genre) => (
									<li key={genre.id * Math.random()}>
										{genre.name}
									</li>
								));
					  })
					: movie.genres.map((genre) => (
							<li key={genre.id}>{genre.name}</li>
					  ))}
			</ul>
			{movie.overview ? <h3>Synopsis</h3> : ''}
			<p>{movie.overview}</p>
			{window.localStorage.movies &&
			window.localStorage.movies.includes(movie.id.toString()) ? (
				<div
					className="btn"
					id={movie.id}
					onClick={() => {
						deleteFavorite();
						window.location.reload();
					}}>
					Supprimer de la liste
				</div>
			) : (
				<div
					className="btn"
					id={movie.id}
					onClick={async (e) => {
						addFavorite(e.target.id);
						window.location.reload();
					}}>
					Ajouter aux coups de coeur
				</div>
			)}
		</div>
	);
};

export default Card;
