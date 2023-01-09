import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Card from '../components/Card';

const UserList = () => {
	const [listData, setListData] = useState([]);

	useEffect(() => {
		let moviesId = window.localStorage.movies
			? window.localStorage.movies.split(',')
			: [];

		for (let i = 0; i < moviesId.length; i++) {
			axios
				.get(
					`https://api.themoviedb.org/3/movie/${moviesId[i]}?api_key=71f1c0748cbaa032bf6d4124a879bf21&language=fr-FR`
				)
				.then((res) =>
					setListData((listData) => [...listData, res.data])
				);
		}
	}, []);

	return (
		<div>
			<Header />
			<div className="user-list-page">
				<h2>
					Coups de coeur <span>💖</span>
				</h2>
				<div className="result">
					{listData.length > 0 ? (
						listData.map((movie) => (
							<Card movie={movie} key={movie.id} />
						))
					) : (
						<h2>Aucun coups de coeur pour le moment</h2>
					)}
				</div>
			</div>
		</div>
	);
};

export default UserList;
