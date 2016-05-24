import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class Header extends Component {
	renderLinks() {
		if(this.props.authenticated) {
			return (
				<Link style={style.link} to="/signout"><FlatButton style={style.link} label="Sign Out" /></Link>
			);
		} else {
			return [
				<Link style={style.link} to="/signin" key={1}><FlatButton style={style.link} label="Sign In" /></Link>,
				<Link style={style.link} to="/signup" key={2}><FlatButton style={style.link} label="Sign Up" /></Link>
			];
		}
	}

	render() {
		return (
			<AppBar style={style.bar}
				zDepth={1}
				showMenuIconButton={false}
				title={<Link style={style.titleLink} to="/"><span>CodePair</span></Link>}
				iconElementRight={
						<div style={style.links}>
							{this.renderLinks()}
						</div>
					}
				/>
		);
	}
}

function mapStateToProps(state) {
	return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);
