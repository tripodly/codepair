import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Draggable, { DraggableCore } from 'react-draggable';
import * as actions from '../actions'; 
import Message from './chat/message';
import MessageList from './chat/messageList';


export default class Chat extends Component {
 
  render() {
    return (
      <Draggable>
          <div className="wrapper">
            <nav id="nav" className="nav">
              <div className="default-nav">
                <div className="main-nav">
                  <div className="toggle"></div>
                  <div className="main-nav-item"><a href="#" className="main-nav-item-link">Andrew</a></div>
                  <div className="options"></div>
                </div>
              </div>
            </nav>
            <div id="inner" className="inner">
              <div id="content" className="content"></div>
            </div>
            <div id="bottom" className="bottom">
              <Message />
              <textarea id="input" className="input"></textarea>
              <div id="send" className="send"></div>
            </div>
          </div>
      </Draggable>
    )
  }
}