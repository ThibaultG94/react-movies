import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const Home = () => {
	const [dataMovies, setDataMovies] = useState([]);
	const [dataGenre, setDataGenre] = useState([]);
	const [textInput, setTextInput] = useState('');

	const searchMovies = (e) => {
		e.preventDefault();
		fetch(
			'https://api.themoviedb.org/3/search/movie?api_key=71f1c0748cbaa032bf6d4124a879bf21&query=' +
				textInput +
				'&language=fr-FR'
		)
			.then((res) => res.json())
			.then((data) => setDataMovies(data.results))
			.catch((error) => console.log('Erreur : ' + error));

		fetch(
			'https://api.themoviedb.org/3/genre/movie/list?api_key=71f1c0748cbaa032bf6d4124a879bf21&language=fr-FR'
		)
			.then((res) => res.json())
			.then((data) => setDataGenre(data.genres))
			.catch((error) => console.log('Erreur : ' + error));

		document.querySelector('input[type="text"]').value = '';
	};

	useEffect(() => {
		fetch(
			'https://api.themoviedb.org/3/genre/movie/list?api_key=71f1c0748cbaa032bf6d4124a879bf21&language=fr-FR'
		)
			.then((res) => res.json())
			.then((data) => setDataGenre(data.genres))
			.catch((error) => console.log('Erreur : ' + error));
	}, []);

	return (
		<div>
			<Header />
			<div className="form-component">
				<div className="form-container">
					<form>
						<input
							type="text"
							placeholder="Entrez le titre d'un film"
							onChange={(e) => setTextInput(e.target.value)}
						/>
						<input
							type="submit"
							value="Rechercher"
							onClick={(e) => searchMovies(e)}
						/>
					</form>
				</div>
			</div>
			<div className="result">
				{dataMovies.map((movie) => (
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
							{movie.vote_count ? movie.vote_average + `/10` : ''}{' '}
							<span>⭐</span>
						</h4>
						<ul>
							{movie.genre_ids.map((ids) => {
								return dataGenre
									.filter((genre) => genre.id === ids)
									.map((genre) => (
										<li key={genre.id}>{genre.name}</li>
									));
							})}
						</ul>
						<h3>Synopsis</h3>
						<p>{movie.overview}</p>
						<div className="btn">Ajouter aux coups de coeur</div>
					</li>
				))}
			</div>
		</div>
	);
};

export default Home;
