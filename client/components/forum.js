import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import * as actions from '../actions';
import CircularProgress from 'material-ui/CircularProgress';
import {browserHistory} from 'react-router';

import ForumModal from './forumModal';
import ForumNavbar from './forumNavbar';
import ForumPostComponent from './forumPostComponent';


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
		height: 'auto',
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
		}
		this.handleForumItemClick = this.handleForumItemClick.bind(this);
		this.handleModal = this.handleModal.bind(this);
	}
	handleChange(event, index, value) {
		this.setState({
			filter: value
		})
	}
	componentDidMount(){
		this.props.getPosts();
	}
	handleModal(){
		this.setState({modalOpen: !this.state.modalOpen});
	}
handleForumItemClick(item){
		this.props.getComments({id: item.id, contents: item});
		browserHistory.push('/post');
	}
	renderPosts(){
		return this.props.posts && this.props.posts.map(item =>(
			<div>
				<ForumPostComponent handleClick={this.handleForumItemClick} content={item} /> 
			</div>
		));
	}
	render() {
		if(this.props.waiting){
			return(
				<div>
				 <CircularProgress size={2} />
				</div>
			);
		} else {
			return (
				<div style={style.forumWindow}>	
					<ForumNavbar handleModal={this.handleModal} />
					<ForumModal newPost={this.props.newPost} open={this.state.modalOpen}/>		
					{this.renderPosts()}
				</div>
			);
		}
	};
}
			
function mapStateToProps(state) {
	return { 
		posts: state.posts.posts,
		waiting: state.response.waiting,
		comments: state.posts.comments,
	};
}

export default connect(mapStateToProps, actions)(Forum);