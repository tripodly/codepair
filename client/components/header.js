import React, { Component } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const style = {
	link: {
		textDecoration: 'none',
		color: 'white',
	},
	titleLink: {
		textDecoration: 'none',
		color: 'white',
		float: 'left',
	},
	bar: {
		verticalAlign: 'middle',
	},
	links: {
		paddingTop: 5,
	},
}

export default class Header extends Component {

	render() {
		return (
			<AppBar style={style.bar}
				zDepth={1}
				showMenuIconButton={false}
				title={<Link style={style.titleLink} to={"/"}><span>CodePair</span></Link>}
				iconElementRight={
						<div style={style.links}>
							<Link style={style.link} to={"/signin"}><FlatButton style={style.link} label="Sign In" /></Link>
							<Link style={style.link} to={"/signup"}><FlatButton style={style.link} label="Sign Up" /></Link>
							<Link style={style.link} to={"/"}><FlatButton style={style.link} label="Sign Out" /></Link>
						</div>
					}
				/>
		);
	}
}
