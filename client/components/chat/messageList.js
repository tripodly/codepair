import React, { PropTypes } from 'react';

export default class MessageListItem extends React.Component {
 
  handleClick(user) {
    this.props.handleClickOnUser(user);
  }
  render() {
    const { message } = this.props;
    return (
      <li>
        <span>
          <b style={{color: '#66c'}}><button  onClick={this.handleClick}>{ message }</button></b>
          <i >{message.time}</i>
        </span>
        <div></div>
      </li>
    );
  }
}
