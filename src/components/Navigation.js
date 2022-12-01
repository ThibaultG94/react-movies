import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav>
			<ul>
				<li>
					<NavLink
						to="/"
						end
						className={(nav) => (nav.isActive ? 'nav-active' : '')}>
						Accueil
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/user-list"
						className={(nav) => (nav.isActive ? 'nav-active' : '')}>
						Coups de coeur
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
