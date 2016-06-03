import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Draggable, { DraggableCore } from 'react-draggable';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField'
import io from 'socket.io-client';
import ChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

const style = {
    paper: {
      height: 500,
      width: 350,
      margin: 20,
      backgroundColor: '#00bcd4'
    },
    list: {
      color: '#fff',
      height: 440,
      overflow: 'scroll',
    },
    subheader: {
      width: 300,
      marginLeft: 25,
      marginRight: 25,
      paddingLeft: 0,
      textAlign: 'center',
    },
    input:{
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 300,
      marginLeft: 25,
      marginRight: 25,
      marginBottom: 10,
      // height: 50,
      background: '#80deea',
    },
    message: {
      paddingBottom: 10,
      paddingTop: 10,
      width: 340,
      wordWrap: 'break-word',
      from: {
        fontWeight: 'bold',
        float: 'left',
      },
      body: {
        float: 'left',
      },
    }
  }

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: [] }
  }

  componentDidMount() {
    this.socket = io();
    this.socket.on('message', message => {
      console.log('message object received in message event is : ',message);
      if(message.body.room !== "" && message.body.room === this.props.sessionID){
        console.log('this message is for my specific sessionID');
      }
      this.setState({ messages: [ {body:message.body.body, from:message.from}, ...this.state.messages ]})
    })
  }
  handleSubmit = event => {
    const body = event.target.value
    console.log('body from handleSubmit is : ',body);
    if (event.keyCode === 13 && body) {
      console.log('yes');
      const message = {
        body: body,
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages] })
      this.socket.emit('message', { body: body, room: this.props.sessionID });
      event.target.value = ''
    }
  }
  render() {
    console.log('messages inside render are : ',this.state.messages);
    const messages = this.state.messages.map( (message,index) => {
      return (
        <div>
          <Divider inset={false} />
          <ListItem
            style={{color:'#fff'}}
            rightIcon={<ChatBubble />}
            primaryText={
              <div style={style.message}>
                <p style={style.message.from}><span>{message.from}</span></p>
                <p style={style.message.body}>: {message.body}</p>
              </div>
            }
          />
         <Divider inset={false} />
       </div>
      );
    })

    return (
      <Draggable>
      <Paper style={style.paper} zDepth={3}>
        <List style={style.list}>
          <Subheader style={style.subheader}>CHAT</Subheader>
          <Divider inset={false} />
          {messages}
        </List>
        <TextField style={style.input} type="text" hintText="Enter message" onKeyUp={this.handleSubmit} />
         
      </Paper>
      </Draggable>
    )
  }
}

function mapStatetoProps(state){
  return {
    userName: state.profile.name, sessionID: state.profile.sessionID
  }
}
export default connect(mapStatetoProps)(Chat)