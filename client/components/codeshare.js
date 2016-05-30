import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import AceEditor from 'react-ace';
import * as actions from '../actions';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

// Imports language libraries to use in Ace Editor
import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/ruby';

// Imports theme to use in Ace Editor
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
			value: 1,
			codeData: ''
		}
	}

	handleChange(event, index, value) {
		this.setState({
			language: value
		});
		this.socket.emit('changeLanguage', { room: this.props.sessionID, language: value });
	}

	componentDidMount(){
		this.socket = io();
		this.socket.emit('joinSession', {room: this.props.sessionID});
		this.socket.on('updateCode',codeData => {
			console.log('codeData is : ',codeData);
			if(this.props.sessionID && codeData.room === this.props.sessionID){
				console.log('msg received in this sessionID');
				this.setState({ codeData: codeData.value });
			}
		})
		this.socket.on('updateLanguage',languageData => {
			console.log('languageData is : ',languageData);
			if(this.props.sessionID && languageData.room === this.props.sessionID){
				console.log('new lang received in this sessionID');
				this.setState({ language: languageData.language });
			}
		})
	}

	// the parameter of onChange is the text currently in the editor
	// will be important for implementation of sockets!
	onChange(newValue) {
		// console.log('values have changed, they are now : ',newValue);
		// use socket.emit('codeChange',newValue) to send new data to io('server')
		// which will then be broadcast to the other user
		// Need to have a way to identify the pair of users sharing the page
		this.socket.emit('codeChange',{ room: this.props.sessionID, value: newValue });
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
				    value={this.state.codeData}
				    onChange={(value) => this.onChange(value)}
				    name="UNIQUE_ID_OF_DIV"
				    editorProps={{$blockScrolling: true}}
				  />
			</div>
		);
	}
};

function mapStateToProps(state) {
	return { userID: state.profile.id, pairID: state.partner.id, sessionID: state.profile.sessionID };
}


export default connect(mapStateToProps, actions)(CodeShare);
