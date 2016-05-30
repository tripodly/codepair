import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const style = {
	online: {
		borderRadius: '100%',
		border:'2px solid #4BAE4F',
	},
	offline: {
		borderRadius: '100%',
		border:'2px solid #F34235',
	},
}

class MatchItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemID: props.match.id,
			online: false
		}
	}

	componentDidMount(){
		this.socket = io();
		this.socket.on('online',status => {
			if(status.onlineID === this.state.itemID){
				this.setOnline();
			}
		})
		this.socket.on('offline',status => {
			if(status.offlineID === this.state.itemID){
				this.setOffline();
			}
		})
		
		this.socket.on('broadcastOnline', data => {
			if(data.users[this.state.itemID]){
				this.setOnline();
			}
		});
	}

	setOnline(){
		this.setState({
			online: true
		})
	}

	setOffline(){
		this.setState({
			online: false
		})	
	}

	render() {
		const match = this.props.match;
		const context = this.props.context;
		const handleClick = this.props.handleClick.bind(context,match);

		return (
			<div>
				<ListItem 
					key={match.id}
					leftAvatar={<Avatar style={this.state.online ? style.online : style.offline} src={match.profile_url} />} primaryText={match.name} 
					secondaryText={`${match.language} - ${match.skillLevel}`} rightIcon={<ChatBubble />}
					onTouchTap={() => {if(this.state.online)handleClick()} }
				/>
				<Divider />
			</div>
		);
	}
}

export default MatchItem;