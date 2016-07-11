import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

 let ForumPostComponent = (props) => {
 	console.log('inside ForumPostComponent',props)
	return (
		<div>
			<Paper 
			style={{width:'100%', height:'200px', margin:'8px'}}
			onTouchTap={() => {props.handleClick(props.content)} }
			>
				<div>
					{props.content.subject}
					<br />
					{props.content.message}
				</div>
			</Paper>
		</div>
	)
}
export default ForumPostComponent;