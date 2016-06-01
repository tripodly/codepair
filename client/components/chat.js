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

const style = {
    paper: {
      height: 400,
      width: 400,
      margin: 20,
      backgroundColor: '#f06292'
    },
    list: {
    display: 'block',
    overflow: 'scroll',
    color: 'white'
    
    },
    input:{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      color: 'white'
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
          primaryText={ message.from }
          secondaryText= {message.body}
        />
       <Divider inset={true} />
       </div>
      )
    })

    return (
      <Draggable>
      <Paper style={style.paper}zDepth={3}>
        <List style={style.list}>
          <Subheader>MY DRAGGABLE CHAT</Subheader>
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