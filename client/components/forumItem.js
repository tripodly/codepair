import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class ForumItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
			itemID: '',
			itemSubject: '',
			itemMessage:''
		}
	}
	render() {
		// const match = this.props.match;
		// const context = this.props.context;
		// const handleClick = this.props.handleClick.bind(context,match);
			let item = this.props.item;
			let subject = this.props.subject;

		return (
			<div>
				<ListItem 
					primaryText={match.name} 
					secondaryText={`${this.state.itemSubject}`}
					onTouchTap={() => {this.handleClick()} }
				/>
				<Divider />
			</div>
		);
	}
}

export default ForumItem;