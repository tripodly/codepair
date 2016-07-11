import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ForumItem from './forumItem';

const style = {
	customList:{
		height:'600',
		overflow: 'scroll',
	},
	comment:{
		height: 100,
		marginTop: 25,
		marginLeft: 150,
		marginRight: 150,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		display: 'inline-block',
		width: '100%',
	},
	commentButton: {
		marginTop: -100,
	},
	button: {
		textDecoration: 'none',
		color: 'white',
	},
	forumWindow: {
		textAlign: 'left',
		width: '100%',
		height: 800,
	},
	optionsBar: {
		width: '100%',
		height: 50,
		backgroundColor: '#FF0A9C',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	optionElement: {
		display: 'inline-block',
		paddingRight: 10,
		verticalAlign: 'middle',
	},
	optionsElements: {
		float: 'right',
		display: 'inline-block',
		alignItems: 'center',
	},
	optionsMenu: {
		marginTop: -15,
	},
	textField:{
		border:' 3px solid #585858',
		marginTop: 15,
		marginBottom:15,
		width: '50%',
		height: 200,
	},
	subject:{
		width: '50%',
		border:' 3px solid #585858',
	},
	newPost:{
		height: 400,
		marginTop: 25,
		marginLeft: 150,
		marginRight: 150,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor:'#D8D8D8',
	},
	mainPost:{
		border:' 3px solid #585858',
		backgroundColor:'#D8D8D8',
	},
}

class ForumComment extends Component {

renderComments(){
	return this.props.comments && this.props.comments.map(item => (
				<ForumItem item={item} /> 
			)
		)
	}

render(){
	console.log('inside the render in forumComments', this.props.comments, 'this is the currrentn ppost in forumCOmments: ', this.props.current);
	return (
		<div style={style.forumWindow}>
			<div>
				<Paper zDepth={2}>
					<List style={style.customList}>
						{ this.renderComments() }
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
function mapStateTpProps(state){
	return{
		comments:state.currentPost.comments.comments,
		currentPost: state.currentPost.current
	}
}
export default connect(mapStateTpProps)(ForumComment);
