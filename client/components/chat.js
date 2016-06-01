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
    color: '#fff'
    
    },
    input:{
      position: 'absolute',
      left: 0,
      bottom: 0,
      margin: 30,
      background: '#80deea'
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
      this.setState({ messages: [ message, ...this.state.messages ]})
    })
  }
  handleSubmit = event => {
    const body = event.target.value
    if (event.keyCode === 13 && body) {
      console.log('yes');
      const message = {
        body,
        from: 'Me'
      }
      this.setState({ messages: [message, ...this.state.messages] })
      this.socket.emit('message', body)
      event.target.value = ''
    }
  }
  render() {
    const messages = this.state.messages.map( (message,index) => {
      return (
        <div>
        <Divider inset={true} />
        <ListItem
          style={{color:'#fff'}}
          rightIcon={<ChatBubble />}
         
          primaryText= {<p><span style={{color:'#eee'}}>{message.from}</span>: {message.body}</p>}
        />
       <Divider inset={true} />
       </div>
      )
    })

    return (
      <Draggable>
      <Paper style={style.paper}zDepth={3}>
        <List style={style.list}>
          <Subheader style={{color:'#fff'}}>MY DRAGGABLE CHAT</Subheader>
          <Divider inset={true} />
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
    userName: state.profile.name
  }
}
export default connect(mapStatetoProps)(Chat)