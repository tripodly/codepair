import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import moment from 'moment';
import Avatar from 'material-ui/Avatar'

 let ForumPostComponent = (props) => {
 	console.log(props.content)
	return (
		<div>
		<Paper 
			zDepth={0}
			onTouchTap={() => {props.handleClick(props.content)}}
			className='forumPost'
			>
			<div className='postContent'>
			<Avatar style={{marginRight:'20px'}} src={props.content.profile_url} />
			<div className='UserName'>
				{props.content.name}
			</div>
				<div className='postSubject'>
					{props.content.subject}
				</div>
				<div className='date'>
					{moment(props.content.created_at).fromNow()}
				</div>
			</div>
		</Paper>
		<hr style={{margin:'1px'}}/>
	</div>
	)
}
export default ForumPostComponent;
