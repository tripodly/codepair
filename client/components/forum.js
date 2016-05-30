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

const style = {
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

	},
}


//when user wants to create a new post, make this true
let flag = false;

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
		console.log('handlde click was clicked in the forum conpment');
		this.props.newPost({ subject: this.state.subject, message:this.state.input });
		flag = !flag;
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
		flag = !flag;
		this.setState({});
		console.log('clicked')
	}
handleCommentSubmit(comment,id){
	console.log('this is the id of the post',id);
	console.log('this is the comment in the post',comment);
	this.props.postComment({comment, id});
}
	handleForumItemClick(item){
		console.log('this is the item you : ', item.id);
		//the this reffers to the forumItem not this fourm.js
		this.props.getComments({id: item.id});
	}
	render() {
		console.log('this is the comments in forumsjs', this.props.comments)
		if(this.props.waiting){
			return(
				<div>
				 <CircularProgress size={2} />
				</div>
			);
		} else if(flag){
			//if the user clicked on post we want the modal to pop up before anything else
					return (
						<div style={style.forumWindow}>
							<AppBar style={style.optionsBar} showMenuIconButton={false}
								children={
									<div style={style.optionsElements}>
										<div style={style.optionElement}>
											<FlatButton onClick={()=> this.handleModal()} style={style.button} label="Post" />
										</div>
										<div style={style.optionElement}>
											<DropDownMenu style={style.button} value={this.state.filter} onChange={(event, index, value) => this.handleChange(event, index, value)}>
							          <MenuItem value={'Most Recent'} primaryText="Most Recent" />
							          <MenuItem value={'Up-Votes'} primaryText="Up-Votes" />
							          <MenuItem value={'Most Comments'} primaryText="Most Comments" />
							        </DropDownMenu>
										</div>
									</div>
								}
								/>	
								<div style={style.newPost}>
									<br></br>
									<RaisedButton label="New Post" primary={true} style={style} onClick={()=>this.handleClick(this.state.input, this.state.subject)} />
									<br></br>
									<TextField 
										style={style.subject}
										placeholder={'Subject'}
										multiLine={false}
										name="POST_SUBJECT"
										onChange={(e)=> this.handlChangeInput(e,'subject')}
									/>
									<TextField 
										style={style.textField}
										placeholder={'Body...'}
										multiLine={true}
										rows={10}
									  rowsMax={15}
										name="POST_COMPONENT"
										value={this.state.input}
										onChange={(e)=> this.handlChangeInput(e)}
									/>
								</div>		
						</div>
					);
		} else if(this.props.comments){
			console.log('this is the comments of props', this.props.comments,this.props.post,this.props.posts)
			let item = this.props.post;
			if(this.props.comments.length < 1){
				return (
					<div style={style.forumWindow}>
						<AppBar style={style.optionsBar} showMenuIconButton={false}
							children={
								<div style={style.optionsElements}>
									<div style={style.optionElement}>
										<FlatButton onClick={()=> this.handleModal()} style={style.button} label="Post" />
									</div>
									<div style={style.optionElement}>
										<DropDownMenu style={style.button} value={this.state.filter} onChange={(event, index, value) => this.handleChange(event, index, value)}>
						          <MenuItem value={'Most Recent'} primaryText="Most Recent" />
						          <MenuItem value={'Up-Votes'} primaryText="Up-Votes" />
						          <MenuItem value={'Most Comments'} primaryText="Most Comments" />
						        </DropDownMenu>
									</div>
								</div>
							}
						/>
							<div>
							<Paper zDepth={2}>
								<List>
									<ForumItem style={style.mainPost} item={item} />
									<div>{'Be the first to comment!'}</div>
								</List>
							</Paper>
						</div>
						<div style={style.comment}>
							<br></br>
							<TextField 
								style={style.subject}
								placeholder={'Comment'}
								multiLine={true}
								name="POST_COMMENT"
								onChange={(e)=> this.handlChangeInput(e,'comment')}
							/>
							<RaisedButton label="Comment" primary={true} style={style.commentButton} onClick={()=>this.handleCommentSubmit(this.state.commentValue, this.props.post.id)} />
						</div>
					</div>
				);
				} else {
						return (
							<div style={style.forumWindow}>
								<AppBar style={style.optionsBar} showMenuIconButton={false}
									children={
										<div style={style.optionsElements}>
											<div style={style.optionElement}>
												<FlatButton onClick={()=> this.handleModal()} style={style.button} label="Submit a Post" />
											</div>
											<div style={style.optionElement}>
												<DropDownMenu style={style.button} value={this.state.filter} onChange={(event, index, value) => this.handleChange(event, index, value)}>
								          <MenuItem value={'Most Recent'} primaryText="Most Recent" />
								          <MenuItem value={'Up-Votes'} primaryText="Up-Votes" />
								          <MenuItem value={'Most Comments'} primaryText="Most Comments" />
								        </DropDownMenu>
											</div>
										</div>
									}
								/>
								<div>
									<Paper zDepth={2}>
												<List>
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
										onChange={(e)=> this.handlChangeInput(e,'comment')}
									/>
									<RaisedButton label="Comment" primary={true} style={style.commentButton} onClick={()=>this.handleCommentSubmit(this.state.commentValue, this.props.post.id)} />
								</div>		
							</div>
					);
				}
		}
		else {
			return (
				<div style={style.forumWindow}>
					<AppBar style={style.optionsBar} showMenuIconButton={false}
						children={
							<div style={style.optionsElements}>
								<div style={style.optionElement}>
									<FlatButton onClick={()=> this.handleModal()} style={style.button} label="Post" />
								</div>
								<div style={style.optionElement}>
									<DropDownMenu style={style.button} value={this.state.filter} onChange={(event, index, value) => this.handleChange(event, index, value)}>
					          <MenuItem value={'Most Recent'} primaryText="Most Recent" />
					          <MenuItem value={'Up-Votes'} primaryText="Up-Votes" />
					          <MenuItem value={'Most Comments'} primaryText="Most Comments" />
					        </DropDownMenu>
								</div>
							</div>
						}
					/>
					<div>
						<Paper zDepth={2}>
									<List>
										{ this.props.posts.map(item =>
											<ForumItem context={this} handleClick={this.handleForumItemClick} item={item} /> 
										)}
									</List>
								</Paper>
					</div>		
				</div>
			)
		}
	};
}

function mapStateToProps(state) {
	return { 
		posts: state.posts.posts,
		waiting: state.response.waiting ,
		comments: state.posts.comments,
		post: state.posts.post
	};
}

export default connect(mapStateToProps, actions)(Forum);




