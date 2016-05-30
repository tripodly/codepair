import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import AceEditor from 'react-ace';
import brace from 'brace';
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
// Imports Brace Language tools for auto complete
import 'brace/ext/language_tools';

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
		alignItems: 'center',
	},
	optionsMenu: {
		marginTop: -15,
	},
	optionsTitleChildren: {
		float: 'right',
		display: 'inline-block',
		alignItems: 'center',
	},
	optionsTitleChild: {
		display: 'inline-block',
		verticalAlign: 'middle',
		paddingRight: 10,
		marginRight: 10,
	},
	optionsTitle: {
		display: 'inline-block',
		verticalAlign: 'middle',
		textDecoration: 'none',
		color: '#FFF',
		float: 'left',
		fontSize: 14,
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
			if(this.props.sessionID && codeData.room === this.props.sessionID){
				this.setState({ codeData: codeData.value });
			}
		})
		this.socket.on('updateLanguage',languageData => {
			if(this.props.sessionID && languageData.room === this.props.sessionID){
				this.setState({ language: languageData.language });
			}
		})
	}

	componentWillUnmount(){
		this.props.clearPartner({ fromID: this.props.userID, toID: this.props.pairID });
		this.socket.emit('clearPartner',{ fromID: this.props.userID, toID: this.props.pairID });
	}

	onChange(newValue) {
		this.socket.emit('codeChange',{ room: this.props.sessionID, value: newValue });
	}

	renderPartner(){
		if(this.props.pairID && this.props.sessionID) {
			return (
				<div style={style.optionsTitleChildren}>
					<Avatar style={style.optionsTitleChild} src={this.props.partner.profile_url} size={30} /> 
					<div style={style.optionsTitleChild}>{this.props.partner.name}</div>
				</div>
			);
		} else {
			return (
				<div>No partner...</div>
			);
		}
	}

	render() {
		const renderPartner = this.renderPartner.bind(this);
		return (
			<div style={style.codeWindow}>
				<AppBar style={style.optionsBar} showMenuIconButton={false} zDepth={1}
					title={<div style={style.optionsTitle}>{this.renderPartner()}</div>}
					iconElementRight={
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
				    fontSize={16}
				    showGutter={true}
				    enableBasicAutocompletion={true}
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
	return { userID: state.profile.id, pairID: state.partner.id, sessionID: state.profile.sessionID, partner: state.partner };
}


export default connect(mapStateToProps, actions)(CodeShare);
