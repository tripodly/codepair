import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class ForumCommentBar extends Component {

	constructor(props){
		super(props);
		this.state = {
			input:''
		}
		this.handleSend = this.handleSend.bind(this);
	}
	handlChangeInput(e){
		this.setState({input:e.target.value})
	}
	handleSend(){
		console.log('inside handlesend comment bar', this.props.name)
		this.props.sendComment({comment:this.state.input, id:this.props.id, name:this.props.name, profile_picute:this.props.profilePicute});
		this.setState({input:''});
	}
	render(){
		return(
			<div className='postComment'>
				<TextField 
					style={{width:'50%'}}
					placeholder={'Comment'}
					multiLine={true}
					name="POST_COMMENT"
					value={this.state.input}
					onChange = {(e)=> this.handlChangeInput(e)}
				/>
				<div className='content'>
					<RaisedButton 
						label="Comment" 
						primary={true} 
						onClick={this.handleSend}
					/>
				</div>
			</div>
		)
	}
}

export default ForumCommentBar;