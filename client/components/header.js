import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import AccountBox from 'material-ui/svg-icons/action/account-box';

const style = {
	link: {
		display: 'inline-block',
		verticalAlign: 'middle',
		paddingRight: 10,
	},
	button: {
		textDecoration: 'none',
		color: 'white',
	},
	icon: {
		width: 42,
		height: 42,
	},
	titleLink: {
		display: 'inline-block',
		verticalAlign: 'middle',
		textDecoration: 'none',
		color: 'white',
		float: 'left',
	},
	bar: {
		verticalAlign: 'middle',
	},
	links: {
		float: 'right',
		display: 'inline-block',
		alignItems: 'center',
	},
	appbar: {
		paddingLeft: 20,
		paddingRight: 20,
		alignItems: 'center',
	},

}

class Header extends Component {
	renderLinks() {
		if(this.props.authenticated) {
			return [
				<div style={style.link}><Link to="/profile" key={1}><IconButton style={style.button} iconStyle={style.icon}><AccountBox color={'white'} /></IconButton></Link></div>,
				<div style={style.link}><Link to="/signout" key={2}><FlatButton style={style.button} label="Sign Out" /></Link></div>
			];
		} else {
			return [
				<div style={style.link}><Link to="/signin" key={3}><FlatButton style={style.button} label="Sign In" /></Link></div>,
				<div style={style.link}><Link to="/signup" key={4}><FlatButton style={style.button} label="Sign Up" /></Link></div>
			];
		}
	}

	render() {
		return (
			<AppBar 
				style={style.appbar}
				zDepth={1}
				showMenuIconButton={false}
				title={<Link style={style.titleLink} to="/"><span className="headerTitle">CodePair</span></Link>}
				children={
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
