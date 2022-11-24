import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';

const Home = () => {
	const [dataMovies, setDataMovies] = useState([]);

	useEffect(() => {
		fetch(
			'https://api.themoviedb.org/3/search/movie?api_key=71f1c0748cbaa032bf6d4124a879bf21&query=code&language=fr-FR'
		)
			.then((res) => res.json())
			.then((data) => setDataMovies(data.results))
			.catch((error) => console.log('Erreur : ' + error));
	}, []);

	return (
		<div>
			<Header />
			<div className="result">
				{dataMovies.map((movie) => (
					<Card key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	);
};

export default Home;
