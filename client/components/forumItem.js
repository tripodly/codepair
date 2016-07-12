import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import Paper from 'material-ui/Paper';


class ForumItem extends Component {
	render() {
		return (
			<div>
				<Paper className='forumItem' key={this.props.item.id}>
				<div>{ this.props.item.userID}</div>
				<div>{ this.props.item.comment}</div>
				</Paper>
				<Divider />
			</div>
		);
	}
}

export default ForumItem;