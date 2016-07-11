import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import * as actions from '../actions';
import DropDownMenu from 'material-ui/DropDownMenu';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import ForumItem from './forumItem';
import CircularProgress from 'material-ui/CircularProgress';

import ForumModal from './forumModal';
import ForumNavbar from './forumNavbar';


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

class Forum extends Component {
	constructor(props){
		super(props);

		this.state = {
			modalOpen:false,
			filter: 'Most Recent',
			posts: '',
			comments: '',
			input: '',
			subject:'',
			commentValue:''
		}
	}
	handleClick(body, subject){
		this.props.newPost({ subject: this.state.subject, message:this.state.input });
		this.setState({});
	}
	handleChange(event, index, value) {
		this.setState({
			filter: value
		})
	}
	handlChangeInput(event,subject){
		if(subject === 'comment'){
			this.setState({commentValue:event.target.value});
		}
		else if(subject === 'subject'){
			this.setState({subject:event.target.value})
		}else{
		this.setState({input:event.target.value})
		}
	}
	componentDidMount(){
		this.props.getPosts();
	}
	handleModal(){
		this.setState({modalOpen: !this.state.modalOpen});
	}
handleCommentSubmit(comment,id){
	this.props.postComment({comment, id});
	var that = this;
	setTimeout(function(){
		that.props.getComments({id});
	},100);

}
	handleForumItemClick(item){
		this.props.getComments({id: item.id});
	}
	renderPosts(){
		return this.props.posts && this.props.posts.map(item => (<ForumItem context={this} item={item} /> ));
	}
	render() {
		if(this.props.waiting){
			return(
				<div>
				 <CircularProgress size={2} />
				</div>
			);
		} else {
			console.log('inside the render of forum');
			return (
				<div style={style.forumWindow}>	
					<ForumNavbar />
					<ForumModal open={this.props.modalOpen}/>		
					{this.renderPosts()}
				</div>
			);
		}
	};
}
			//if the user clicked on post we want the modal to pop up before anything else
			//if the post was clicked show the comments belonging to that post
			//check the length of the comments array, if it is empty dont try to map comments to the page
			// this else statement is in the comment if statment, and maps the comments to the pa

function mapStateToProps(state) {
	return { 
		posts: state.posts.posts,
		waiting: state.response.waiting,
		comments: state.posts.comments,
		post: state.posts.post
	};
}

export default connect(mapStateToProps, actions)(Forum);