import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
	const [dataMovies, setDataMovies] = useState([]);
	const [dataGenre, setDataGenre] = useState([]);
	const [textInput, setTextInput] = useState('');
	const [sortMovies, setSortMovies] = useState('');
	const [dataFavorite, setDataFavorite] = useState([]);
	let saveId = 0;

	const navigate = useNavigate();

	const searchMovies = async (e) => {
		e.preventDefault();
		document.querySelector('.noresult').innerHTML = ``;
		await fetch(
			'https://api.themoviedb.org/3/search/movie?api_key=71f1c0748cbaa032bf6d4124a879bf21&query=' +
				textInput +
				'&language=fr-FR'
		)
			.then((res) => res.json())
			.then((data) =>
				data.results.length !== 0
					? setDataMovies(data.results)
					: (document.querySelector(
							'.noresult'
					  ).innerHTML = `Aucun résultats`) &&
					  setDataMovies(data.results)
			)
			.catch((error) => console.log('Erreur : ' + error));

		fetch(
			'https://api.themoviedb.org/3/genre/movie/list?api_key=71f1c0748cbaa032bf6d4124a879bf21&language=fr-FR'
		)
			.then((res) => res.json())
			.then((data) => setDataGenre(data.genres))
			.catch((error) => console.log('Erreur : ' + error));

		document.querySelector('input[type="text"]').value = '';
	};

	const sortMovie = async (e) => {
		await setSortMovies(e);
		navigate('/');
	};

	const checkFavorite = (favorite) => {
		console.log(favorite.id, saveId);
		return favorite.id != saveId;
	};

	const setFavorite = async (elementId) => {
		saveId = elementId;
		await fetch(
			'https://api.themoviedb.org/3/movie/' +
				elementId +
				'?api_key=71f1c0748cbaa032bf6d4124a879bf21&language=fr-FR'
		)
			.then((res) => res.json())
			.then((data) => {
				if (dataFavorite.every(checkFavorite)) {
					dataFavorite.push(data);
				}
			});

		localStorage.favorite = JSON.stringify(dataFavorite);
		console.log(dataFavorite);
	};

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
					<div className="btn-sort-container">
						<div
							id="goodToBad"
							onClick={(e) => sortMovie('goodToBad')}>
							Top <span>&#x2192;</span>
						</div>
						<div
							id="badToGood"
							onClick={(e) => sortMovie('badToGood')}>
							Flop <span>&#x2192;</span>
						</div>
					</div>
				</div>
			</div>
			<div className="result">
				{dataMovies
					.sort((a, b) => {
						if (sortMovies == 'goodToBad') {
							return b.vote_average - a.vote_average;
						} else if (sortMovies == 'badToGood') {
							return a.vote_average - b.vote_average;
						} else {
							return;
						}
					})
					.map((movie) => (
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
									? movie.vote_average + `/10`
									: ''}{' '}
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
							<div
								className="btn"
								id={movie.id}
								onClick={async (e) => setFavorite(e.target.id)}>
								Ajouter aux coups de coeur
							</div>
						</li>
					))}
			</div>
			<div className="noresult"></div>
		</div>
	);
};

export default Home;
