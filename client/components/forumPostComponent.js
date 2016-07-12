import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

 let ForumPostComponent = (props) => {
	return (
		<Paper 
			zDepth={1}
			onTouchTap={() => {props.handleClick(props.content)} }
			className="forumPost"
			>
			<div>
				{props.content.subject}
			</div>
		</Paper>
	)
}
export default ForumPostComponent;
