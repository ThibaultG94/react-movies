import React, { useState } from 'react';
import Header from '../components/Header';

const UserList = () => {
	const [dataFavorite, setDataFavorite] = useState(
		JSON.parse(localStorage.favorite)
	);

	return (
		<div>
			<Header />
			<div className="user-list-page">
				<h2>
					Coups de coeur <span>💖</span>
				</h2>
				<div className="result">
					{dataFavorite.map((movie) => (
						<li className="card" key={movie.id}>
							<img
								src={
									movie.poster_path
										? `https://image.tmdb.org/t/p/original` +
										  movie.poster_path
										: `./img/poster.jpg`
								}
								alt={movie.title}
							/>
							<h2>{movie.title}</h2>
							<h5>
								{`Sorti le : ` +
									movie.release_date
										.split('-')
										.reverse()
										.join('/')}
							</h5>
							<h4>
								{movie.vote_count
									? Math.round(movie.vote_average * 10) / 10 +
									  `/10`
									: ''}{' '}
								<span>⭐</span>
							</h4>
							<ul>
								{movie.genres.map((genre) => {
									return <li>{genre.name}</li>;
								})}
							</ul>
							<h3>Synopsis</h3>
							<p>{movie.overview}</p>
						</li>
					))}
				</div>
			</div>
		</div>
	);
};

export default UserList;
