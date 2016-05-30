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
		let handleClick = function(){};
		console.log(item)
		if(this.props.handleClick){
			handleClick = this.props.handleClick.bind(context,item);
		}
		return (
			<div>
				<ListItem 
					key={this.props.item.id}
					primaryText={this.props.item.subject|| item.comment} 
					secondaryText={this.props.item.message || item.created_at }
					onTouchTap={() => {handleClick()} }
				/>
				<Divider />
			</div>
		);
	}
}

export default ForumItem;