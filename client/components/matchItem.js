import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

export default ({ context, handleClick, match }) => {
	const matchUser = match;
	handleClick = handleClick.bind(context,matchUser);
	return (
		<ListItem 
			key={match.id}
			leftAvatar={<Avatar src={match.profile_url} />} primaryText={match.name} 
			secondaryText={`${match.language} - ${match.skillLevel}`} rightIcon={<ChatBubble />}
			onTouchTap={() => handleClick()}
		/>
	);
}