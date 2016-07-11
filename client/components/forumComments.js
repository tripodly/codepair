import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ForumItem from './forumItem';


class ForumComment extends Component {

render(){
	return (
		<div style={style.forumWindow}>
			<div>
				<Paper zDepth={2}>
					<List style={style.customList}>
						<ForumItem style={style.mainPost} item={item} />
						{ this.props.comments.map(item =>
							<ForumItem context={this} item={item} /> 
						)}
					</List>
				</Paper>
			</div>
			<div style={style.comment}>
				<br></br>
				<br></br>
				<TextField 
					style={style.subject}
					placeholder={'Comment'}
					multiLine={true}
					name="POST_COMMENT"
					onChange = {(e)=> this.handlChangeInput(e,'comment')}
				/>
				<RaisedButton 
					label="Comment" 
					primary={true} 
					style={style.commentButton} 
					onClick={()=>this.handleCommentSubmit(this.state.commentValue, this.props.post.id)} 
				/>
			</div>		
		</div>
		)
	}
}