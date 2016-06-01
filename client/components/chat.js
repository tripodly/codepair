import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Draggable, { DraggableCore } from 'react-draggable';
import * as actions from '../actions'
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import io from 'socket.io-client'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = { messages: [] }
  }

  componentDidMount() {
    this.socket = io('/')
    this.socket.on('message', message => {
      this.setState({ messages: [ message, ...this.state.messages ]})
    })
  }
  
}