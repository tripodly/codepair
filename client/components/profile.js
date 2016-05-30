import React, { Component } from 'react';
import { reduxForm } from 'redux-form'; 
import { List, ListItem } from 'material-ui/List';
import { Grid, Row, Col } from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import * as actions from '../actions';
import { Link } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import MatchItem from './matchItem';

const style = {
	grid: {
		height: 800,
	},
	row: {
		height: 800,
	},
	profilePic: {
		width: 250,
		height: 250,
	},
	editButton:{
		margin: 5
	},
	button: {
		margin: 0,
	},
	paper: {
		user: {
			height: '100%',
			width: '100%',
		}
	}
}
let flag = true;
let prompt = 'Edit info:'

class Profile extends Component {
	constructor(props){
		super(props);

		this.state = {
			email: this.props.profileEmail,
			name:this.props.profileName,
			language:this.props.profileLanguage,
			skillLevel:this.props.profileSkillLevel
		}
	}

	handleFormSubmit(formProps) {
		let email = formProps.email ? formProps.email : this.props.profileEmail;
		let name = formProps.name ? formProps.name : this.props.profileName;
		let formPropsWithLangSkill = {...formProps, email: email, name: name, language: this.state.language, skillLevel: this.state.skillLevel };
		this.props.updateUserInfo(formPropsWithLangSkill);
		this.setState({
			email: formPropsWithLangSkill.email,
			name: formPropsWithLangSkill.name,
			language: formPropsWithLangSkill.language,
			skillLevel: formPropsWithLangSkill.skillLevel
		})
	}

	componentWillMount() {
		this.props.getUserInfo();
	}

	componentDidMount() {
		this.socket = io();
		this.props.getCards();
		this.socket.on('joinRoom',(data) => {
			if(this.props.profileID == data.toID || this.props.profileID == data.fromID){
				this.props.joinRoom({ roomID: data.roomID });
			}
		})
	}

	componentDidUpdate() {
		this.socket.emit('join', { id: this.props.profileID, name: this.props.profileName });
		this.socket.emit('getOnlineUsers');
	}

	handleEditInfo() {
		flag = !flag;
		prompt = flag ? ' Edit info:':'Cancel';
		this.setState({
			email: this.props.profileEmail,
			name:this.props.profileName,
			language:this.props.profileLanguage,
			skillLevel:this.props.profileSkillLevel
		});
	}

	handleOnChangeInput(event,field) {
		switch(field) {
	    case 'name':
	        this.setState({name:event.target.value});
	        break;
	    case 'email':
	         this.setState({email:event.target.value});
	        break;
	    case 'language':
	    		 this.setState({language:event.target.value});
	    		 break;
	    case 'skillLevel':
	    			this.setState({skillLevel:event.target.value});
	    			break;
			}
	}

	handleLangChange(event, index, value) {
		this.setState({ language: value });
	}

	handleSkillChange(event, index, value) {
		this.setState({ skillLevel: value });
	}

	handleListItemClick(match) {
		this.socket.emit('partnerWithMatch', { inviter: this.props.fromUser, invitee: match });
	}

	renderEditBox(){
		const { handleSubmit, fields: { email, name, language, skillLevel }} = this.props;
		const cancel = 'cancel';
		return (
			<div>
				<RaisedButton label="Confirm" primary={true} action="submit" disabled={flag} onClick={()=> this.handleEditInfo()} />
				<RaisedButton label={prompt} secondary={true} style={style.editButton} onClick={() => this.handleEditInfo()} />
				<div>
					<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
						<fieldset className="form-group">
							<TextField floatingLabelText="Email:" {...email} value={this.state.email} disabled={flag} onChange={(event)=> this.handleOnChangeInput(event,'email')}
							/>
						</fieldset>
						<fieldset className="form-group">
							<TextField floatingLabelText="Name:" {...name} value={this.state.name} disabled={flag} onChange={(event)=> this.handleOnChangeInput(event,'name')}
							/>
						</fieldset>
						<fieldset className="form-group">
							<SelectField value={this.state.language} floatingLabelText="Language:" disabled={flag} onChange={(event, index, value) => this.handleLangChange(event, index, value)}>
			          <MenuItem value={'JavaScript'} primaryText="JavaScript" />
			          <MenuItem value={'Java'} primaryText="Java" />
			          <MenuItem value={'Python'} primaryText="Python" />
			          <MenuItem value={'Ruby'} primaryText="Ruby" />
			        </SelectField>
						</fieldset>
						<fieldset className="form-group">
							<SelectField value={this.state.skillLevel} floatingLabelText="Skill level:" disabled={flag} onChange={(event, index, value) => this.handleSkillChange(event, index, value)}>
			          <MenuItem value={'Beginner'} primaryText="Beginner" />
			          <MenuItem value={'Mid-Level'} primaryText="Mid-Level" />
			          <MenuItem value={'Experienced'} primaryText="Experienced" />
			          <MenuItem value={'Master'} primaryText="Master" />
			        </SelectField>
						</fieldset>
					</form>
				</div>
			</div>
		);
	}

	render() {
		const cancel = 'cancel';
		const { handleSubmit, fields: { email, name, language, skillLevel }} = this.props;
		if(this.props.waiting){
			return(
				<div>
				 <CircularProgress size={2} />
				</div>
			);
		} else {
			return (
				<Grid style={style.grid}>
					<Row style={style.row}>
						<Col xs={6} md={4} mdOffset={1}>
							<h3>Welcome {this.props.profileName}</h3>
							<div>
									<Avatar size={250} style={style.profilePic} src={this.props.profilePicture} />
									<br/>
										{this.renderEditBox()}
									<br/>
									<Link to="/cards"><RaisedButton label="Match me!" primary={true} style={style.button} /></Link>
							</div>
						</Col>
						<Col xs={6} md={6} mdOffset={1}>
							<div>
								<h3 className="text-xs-center">Matches</h3>
								<Paper zDepth={2}>
									<List>
										{ this.props.matches.map(match =>
											<MatchItem context={this} handleClick={this.handleListItemClick} match={match} /> 
										)}
									</List>
								</Paper>
							</div>
						</Col>
					</Row>
				</Grid>
			);
		}
	}
}

function mapStateToProps(state){
	return { 
		fromUser: state.profile,
		profileID: state.profile.id,
		profileEmail: state.profile.email, 
		profileName: state.profile.name, 
		profileLanguage: state.profile.language, 
		profileSkillLevel: state.profile.skillLevel, 
		profileGithub: state.profile.github_handle, 
		profilePicture: state.profile.profile_url, 
		matches: state.cards.matches,
		waiting: state.response.waiting 
	};
}

export default reduxForm({
	form: 'profile',
	fields: ['email', 'name']
}, mapStateToProps, actions)(Profile);
