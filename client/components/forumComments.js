import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import ForumItem from './forumItem';
import CircularProgress from 'material-ui/CircularProgress';
import ForumCommentBar from './forumCommentBar';
import * as actions from '../actions/index'


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
			<ForumCommentBar id={this.props.currentPost.id} sendComment={this.props.postComment} />
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
export default connect(mapStateToProps, actions)(ForumComment);

