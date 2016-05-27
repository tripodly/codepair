import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import AceEditor from 'react-ace';

import * as actions from '../actions';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/ruby';

import 'brace/theme/ambiance';

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

class CodeShare extends Component {
	constructor(props){
		super(props);

		this.state = {
			language: 'javascript',
			value: 1
		}
	}

	handleChange(event, index, value) {
		this.setState({
			language: value
		})
	}

	// the parameter of onChange is the text currently in the editor
	// will be important for implementation of sockets!
	onChange(newValue) {
		// console.log('values have changed, they are now : ',newValue);
	}

	render() {
		return (
			<div style={style.codeWindow}>
				<AppBar style={style.optionsBar} showMenuIconButton={false} iconElementRight={
					<DropDownMenu style={style.optionsMenu} value={this.state.language} onChange={(event, index, value) => this.handleChange(event, index, value)}>
	          <MenuItem value={'javascript'} primaryText="JavaScript" />
	          <MenuItem value={'java'} primaryText="Java" />
	          <MenuItem value={'python'} primaryText="Python" />
	          <MenuItem value={'ruby'} primaryText="Ruby" />
	        </DropDownMenu>
				}/>			
				<AceEditor
				    mode={this.state.language}
				    theme="ambiance"
				    height='750px'
				    width="100%"
				    enableLiveAutocompletion={true}
				    onChange={(value) => this.onChange(value)}
				    name="UNIQUE_ID_OF_DIV"
				    editorProps={{$blockScrolling: true}}
				  />
			</div>
		);
	}
};

function mapStateToProps(state) {
	return { current: state.cards.current, cardID: state.cards.current.id, initiated: state.cards.initiated, uninitiated: state.cards.uninitiated, userID: state.profile.id };
}


export default connect(mapStateToProps, actions)(CodeShare);
