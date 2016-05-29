import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions';
import DropDownMenu from 'material-ui/DropDownMenu';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';

const style = {
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
}
//when user wants to create a new post, make this true
let flag = false;

class Forum extends Component {
	constructor(props){
		super(props);

		this.state = {
			filter: 'Most Recent',
			posts: [],
			comments: [],
			input: ''
		}
	}
	handleClick(){
		console.log('handlde click was clicked in the forum conpment');
	}
	handleChange(event, index, value) {
		this.setState({
			filter: value
		})
	}
	handlChangeInput(event){
		this.setState({input:event.target.value})
		console.log(event.target.value);
	}

	componentDidMount(){

	}
	render() {
		return (
			<div style={style.forumWindow}>
				<AppBar style={style.optionsBar} showMenuIconButton={false} iconElementRight={
					<DropDownMenu style={style.optionsMenu} value={this.state.filter} onChange={(event, index, value) => this.handleChange(event, index, value)}>
	          <MenuItem value={'Most Recent'} primaryText="Most Recent" />
	          <MenuItem value={'Up-Votes'} primaryText="Up-Votes" />
	          <MenuItem value={'Most Comments'} primaryText="Most Comments" />
	        </DropDownMenu>
				}/>	
				<div style={style.newPost}>
					<br></br>
					<RaisedButton label="New Post" primary={true} style={style} onClick={()=>this.handleClick()} />
					<br></br>
					<TextField 
						style={style.subject}
						placeholder={'Subject'}
						multiLine={false}
						name="POST_SUBJECT"
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
	}
};

function mapStateToProps(state) {
	return { posts: state.posts, comments: state.comments };
}

export default connect(mapStateToProps, actions)(Forum);
