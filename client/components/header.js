import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {

	render() {
		return (
			<nav className="navbar navbar-light">
				<span className="navbar-brand">CodePair</span>
				<ul className="nav navbar-nav">
					<li className="nav-item">
						<Link to={"/signin"}>Sign In</Link>
					</li>
					<li className="nav-item">
						<Link to={"/signup"}>Sign Up</Link>
					</li>
					<li className="nav-item">
						<Link to={"/"}>Sign Out</Link>
					</li>
				</ul>
			</nav>
		);
	}
}
