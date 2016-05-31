import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Draggable, { DraggableCore } from 'react-draggable';

import Message from './chat/message';
import MessageList from './chat/messageList';


export default class Chat extends Component {
  constructor(props){
    super(props);


  }

  render() {
    return (
      <Draggable defaultPosition={{x: 420, y: 180}}>
          <div className="wrapper">
            <nav id="nav" className="nav">
              <div className="default-nav">
                <div className="main-nav">
                  <div className="toggle"></div>
                  <div className="main-nav-item"><a href="#" className="main-nav-item-link">{this.props.partnerName}</a></div>
                  <div className="options"></div>
                </div>
              </div>
            </nav>
            <div id="inner" className="inner">
              <div id="content" className="content"></div>
            </div>
            <div id="bottom" className="bottom">
              <textarea id="input" className="input"></textarea>
              <div id="send" className="send"></div>
            </div>
          </div>
      </Draggable>
    )
  }
}