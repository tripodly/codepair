import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class ForumModal extends Component {

constructor(props){
	super(props);
	this.state = {
		input:'',
		subject:'',
		open: this.props.open
		}
		this.handleClick = this.handleClick.bind(this);
	}
	componentWillReceiveProps(newProps){
	this.setState({open: newProps.open})
	}
	handlChangeInput(event,subject){
		if(subject === 'comment'){
			this.setState({commentValue:event.target.value});
		}
		else if(subject === 'subject'){
			if(this.state.subject.length < 95 && event.target.value.length < 95){
				this.setState({subject:event.target.value})
			}
		}else{
		this.setState({input:event.target.value})
		}
	}
	handleClick(body, subject){
		this.props.newPost({ subject: this.state.subject, message:this.state.input });
		this.setState({input:'',subject:'', open:false});
	}
	handleClose() {
		console.log('click event entered handleclose')
    this.setState({open: false});
  };

render(){
			const actions = [
			      <FlatButton
			        label="Cancel"
			        primary={true}
			        onTouchTap={()=>this.handleClose()}
			      />,
			      <FlatButton
			        label="Submit"
			        primary={true}
			        disabled={false}
			        onTouchTap={()=>this.handleClick(this.state.input, this.state.subject)}
			      />,
			    ];
	    return (
	      <div>
	        <Dialog
	          title="New Post"
	          actions={actions}
	          modal={true}
	          open={this.state.open}
	          style={{overflow:'scroll'}}
	        >
	        <div className='newPost'>
	        	<TextField 
						placeholder={'Subject...'}
						multiLine={false}
						name="POST_SUBJECT"
						value={this.state.subject}
						onChange = {(e)=> this.handlChangeInput(e,'subject')}
						fullWidth={true}
					/>
					<TextField 
						placeholder={'Body...'}
						multiLine={true}
						rows={10}
						fullWidth={true}
						name="POST_COMPONENT"
						value={this.state.input}
						onChange={(e)=> this.handlChangeInput(e)}
					/>
					</div>
	        </Dialog>
	      </div>
	    );
		}
}
export default ForumModal;