import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav>
			<ul>
				<NavLink
					to="/"
					end
					className={(nav) => (nav.isActive ? 'nav-active' : '')}>
					<li>Accueil</li>
				</NavLink>
				<NavLink
					to="/user-list"
					className={(nav) => (nav.isActive ? 'nav-active' : '')}>
					<li>Coups de coeur</li>
				</NavLink>
			</ul>
		</nav>
	);
};

export default Navigation;
