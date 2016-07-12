import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

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

class ForumModal extends Component {

constructor(props){
	super(props);
	this.state = {
		input:'',
		subject:'',
		open: this.props.open
	}
	this.handleModal = this.handleModal.bind(this);
	this.handleClick = this.handleClick.bind(this);
}
componentWillReceiveProps(newProps){
	this.setState({open: newProps.open})
}
	handleModal(){
		this.setState({modalOpen: !this.state.modalOpen});
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