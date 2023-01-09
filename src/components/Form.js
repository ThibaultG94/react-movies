import React, { useEffect, useState } from 'react';
import Card from './Card';

const Form = () => {
	const [dataMovies, setDataMovies] = useState([]);
	const [dataGenre, setDataGenre] = useState([]);
	const [search, setSearch] = useState('code');
	const [sortGoodBad, setSortGoodBad] = useState(null);

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/search/movie?api_key=71f1c0748cbaa032bf6d4124a879bf21&query=${search}&language=fr-FR`
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
	}, [search]);

	useEffect(() => {
		fetch(
			'https://api.themoviedb.org/3/genre/movie/list?api_key=71f1c0748cbaa032bf6d4124a879bf21&language=fr-FR'
		)
			.then((res) => res.json())
			.then((data) => setDataGenre(data.genres))
			.catch((error) => console.log('Erreur : ' + error));
	}, []);

	const searchMovies = async (e) => {
		e.preventDefault();
		document.querySelector('.noresult').innerHTML = ``;
		await fetch(
			'https://api.themoviedb.org/3/search/movie?api_key=71f1c0748cbaa032bf6d4124a879bf21&query=' +
				search +
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

		document.querySelector('input[type="text"]').value = '';
	};

	return (
		<div>
			<div className="form-component">
				<div className="form-container">
					<form>
						<input
							type="text"
							placeholder="Entrez le titre d'un film"
							id="search-input"
							onChange={(e) => setSearch(e.target.value)}
						/>
						<input
							type="submit"
							value="Rechercher"
							onClick={(e) => searchMovies(e)}
						/>
					</form>
					<div className="btn-sort-container">
						<div
							className="btn-sort"
							id="goodToBad"
							onClick={() => setSortGoodBad('goodToBad')}>
							Top <span>&#x2192;</span>
						</div>
						<div
							className="btn-sort"
							id="badToGood"
							onClick={() => setSortGoodBad('badToGood')}>
							Flop <span>&#x2192;</span>
						</div>
					</div>
				</div>
			</div>
			<div className="result">
				{dataMovies
					.slice(0, 12)
					.sort((a, b) => {
						if (sortGoodBad === 'goodToBad') {
							return b.vote_average - a.vote_average;
						} else if (sortGoodBad === 'badToGood') {
							return a.vote_average - b.vote_average;
						} else {
							return;
						}
					})
					.map((movie) => (
						<Card
							movie={movie}
							dataGenre={dataGenre}
							key={movie.id}
						/>
					))}
			</div>
			<div className="noresult"></div>
		</div>
	);
};

export default Form;
