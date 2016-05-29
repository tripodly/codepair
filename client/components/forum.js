import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import * as actions from '../actions';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const style = {
	codeWindow: {
		textAlign: 'left',
		width: '100%',
		height: 800,
	},
	optionsBar: {
		width: '100%',
		height: 50,
		backgroundColor: '#FF0A9C',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	optionsMenu: {
		marginTop: -15,
	},
}

class Forum extends Component {
	constructor(props){
		super(props);

		this.state = {
			filter: 'mostRecent',
			psots: [],
			comments: []
		}
	}

	handleChange(event, index, value) {
		this.setState({
			filter: value
		})
	}

	componentDidMount(){

	}
	render() {
		return (
			<div style={style.codeWindow}>
				<AppBar style={style.optionsBar} showMenuIconButton={false} iconElementRight={
					<DropDownMenu style={style.optionsMenu} value={this.state.language} onChange={(event, index, value) => this.handleChange(event, index, value)}>
	          <MenuItem value={'Up-Votes'} primaryText="JavaScript" />
	          <MenuItem value={'Most Recent'} primaryText="Java" />
	          <MenuItem value={'Most Comments'} primaryText="Python" />
	        </DropDownMenu>
				}/>	
				<div>
					{'this is a test'}
				</div>		
			</div>
		);
	}
};

function mapStateToProps(state) {
	return { posts: state.posts, comments: state.comments };
}


export default connect(mapStateToProps, actions)(Forum);
