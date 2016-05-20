import React, { Component } from 'react';

export default class Header extends Component {

	render() {
		return (
			<nav className="navbar navbar-light">
				<span className="navbar-brand">CodePair</span>
				<ul className="nav navbar-nav">
					<li className="nav-item" key={1}>
						Sign In
					</li>
					<li className="nav-item" key={2}>
						Sign Up
					</li>
					<li className="nav-item">
						Sign Out
					</li>
				</ul>
			</nav>
		);
	}
}
