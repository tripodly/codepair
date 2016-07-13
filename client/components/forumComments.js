import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ForumItem from './forumItem';
import CircularProgress from 'material-ui/CircularProgress';


class ForumComment extends Component {

renderComments(){
	return this.props.comments && this.props.comments.map(item => (
				<ForumItem key={item.created_at} item={item} /> 
			)
		)
	}

render(){
	if(this.props.waiting){
		return(<div>
			<CircularProgress size={2} />
		</div>
		)
	}
	return (
		<div className='forumWindow'>
			<div>
				<div className='clickedPost'>
					{this.props.currentPost.message}
				</div>
				<hr/>
				{this.renderComments()}
			</div>
			<div className='postComment'>
				<TextField 
					style={{width:'50%'}}
					placeholder={'Comment'}
					multiLine={true}
					name="POST_COMMENT"
					onChange = {(e)=> this.handlChangeInput(e,'comment')}
				/>
				<RaisedButton 
					label="Comment" 
					primary={true} 
					onClick={()=>this.handleCommentSubmit(this.state.commentValue, this.props.post.id)} 
				/>
			</div>		
		</div>
		)
	}
}
function mapStateToProps(state){
	return{
		comments:state.currentPost.comments.comments,
		currentPost: state.currentPost.current,
		waiting: state.response.waiting,
	}
}
export default connect(mapStateToProps)(ForumComment);

