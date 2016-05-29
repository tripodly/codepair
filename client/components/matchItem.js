import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

// export default ({ context, handleClick, match }) => {
// 	const matchUser = match;
// 	handleClick = handleClick.bind(context,matchUser);
// 	return (
// 		<ListItem 
// 			key={match.id}
// 			leftAvatar={<Avatar src={match.profile_url} />} primaryText={match.name} 
// 			secondaryText={`${match.language} - ${match.skillLevel}`} rightIcon={<ChatBubble />}
// 			onTouchTap={() => handleClick()}
// 		/>
// 	);
// }

class MatchItem extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		this.socket = io();
		this.socket.on('online',status => {
			console.log('socket online event received in matchitem');
			console.log('status is : ',status);
		})
		this.socket.on('offline',status => {
			console.log('socket offline event received in matchitem');
			console.log('status is : ',status);
		})
	}

	isOnline(){

	}

	render() {
		const match = this.props.match;
		const context = this.props.context;
		const handleClick = this.props.handleClick.bind(context,match);

		return (
			<ListItem 
				key={match.id}
				leftAvatar={<Avatar src={match.profile_url} />} primaryText={match.name} 
				secondaryText={`${match.language} - ${match.skillLevel}`} rightIcon={<ChatBubble />}
				onTouchTap={() => handleClick()}
			/>
		);
	}
}

export default MatchItem;