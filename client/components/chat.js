import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Draggable, { DraggableCore } from 'react-draggable';
import * as actions from '../actions'
// import Message from './chat/message';
// import MessageList from './chat/messageList';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


class Chat extends Component {
  constructor(props){
    super(props);
    this.state= {
      text: ''
    }

  }
  render() {
    return (
       <List>
        <Subheader>Today</Subheader>
        <ListItem
          
          primaryText="Brunch this weekend?"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Brendan Lim</span> --
              I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/kolage-128.jpg" />}
          primaryText={
            <p>Summer BBQ&nbsp;&nbsp;<span style={{color: lightBlack}}>4</span></p>
          }
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>to me, Scott, Jennifer</span> --
              Wish I could come, but I&apos;m out of town this weekend.
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
        <ListItem
          leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
          primaryText="Oui oui"
          secondaryText={
            <p>
              <span style={{color: darkBlack}}>Grace Ng</span> --
              Do you have Paris recommendations? Have you ever been?
            </p>
          }
          secondaryTextLines={2}
        />
        <Divider inset={true} />
      </List>
    )
  }
}
function mapStateToProps(state){
  return {
    userID: state.profile.id
  }
}

export default connect(mapStateToProps, actions)(Chat);
      // <Draggable defaultPosition={{x: 420, y: 180}}>
      //     <div className="wrapper">
      //       <nav id="nav" className="nav">
      //         <div className="default-nav">
      //           <div className="main-nav">
      //             <div className="toggle"></div>
      //             <div className="main-nav-item"><a href="#" className="main-nav-item-link">{this.props.partnerName}</a></div>
      //             <div className="options"></div>
      //           </div>
      //         </div>
      //       </nav>
      //       <div id="inner" className="inner">
      //         <div id="content" className="content"></div>
      //       </div>
      //       <div id="bottom" className="bottom">
      //         <textarea id="input" className="input"></textarea>
      //         <div id="send" className="send"></div>
      //       </div>
      //     </div>
      // </Draggable>