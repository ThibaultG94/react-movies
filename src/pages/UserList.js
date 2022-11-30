import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

const UserList = () => {
	const [dataFavorite, setDataFavorite] = useState([]);

	const getMovies = () => {
		fetch(
			'https://api.themoviedb.org/3/movie/1579?api_key=71f1c0748cbaa032bf6d4124a879bf21&language=fr-FR'
		)
			.then((res) => res.json())
			.then((data) => setDataFavorite(data));
	};

	useEffect(() => {
		getMovies();
	}, []);

	return (
		<div>
			<Header />
			<div className="user-list-page">
				<h2>
					Coups de coeur <span>💖</span>
				</h2>
			</div>
		</div>
	);
};

export default UserList;
