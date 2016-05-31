import React, { Component } from 'react';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

class ForumItem extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const item = this.props.item;
		const context = this.props.context;
		let date = item.created_at ? item.created_at.toString().substring(0,10) : '';
		let handleClick = function(){};
		if(this.props.handleClick){
			handleClick = this.props.handleClick.bind(context,item);
		}
		return (
			<div>
				<ListItem 
					multiLine={true}
					key={this.props.item.id}
					primaryText={ this.props.item.subject || item.comment } 
					secondaryText={ this.props.item.message || date }
					onTouchTap={() => {handleClick()} }
				/>
				<Divider />
			</div>
		);
	}
}

export default ForumItem;