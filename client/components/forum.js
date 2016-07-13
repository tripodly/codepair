import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import CircularProgress from 'material-ui/CircularProgress';
import {browserHistory} from 'react-router';

import ForumModal from './forumModal';
import ForumNavbar from './forumNavbar';
import ForumPostComponent from './forumPostComponent';

class Forum extends Component {
	constructor(props){
		super(props);

		this.state = {
			modalOpen:false
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
		this.setState({modalOpen: true});
	}
handleForumItemClick(item){
		if(item){this.props.getComments({id: item.id, contents: item});
		browserHistory.push('/post');
		}
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
				<div className='forumWindow'>	
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
	};
}

export default connect(mapStateToProps, actions)(Forum);