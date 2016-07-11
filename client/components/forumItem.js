import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class ForumItem extends Component {
	render() {
		return (
			<div>
				<ListItem 
					multiLine={true}
					key={this.props.item.id}
					primaryText={ this.props.item.subject} 
					secondaryText={ this.props.item.message }
					onTouchTap={() => {this.props.handleClick(this.props.item)} }
				/>
				<Divider />
			</div>
		);
	}
}

export default ForumItem;