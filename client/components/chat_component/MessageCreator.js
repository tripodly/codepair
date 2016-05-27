import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import uuid from 'node-uuid';

export default class MessageCreator extends Component {

  // static propTypes = {
    
  //   onSave: PropTypes.func.isRequired,
  //   user: PropTypes.object.isRequired,
  //   socket: PropTypes.object.isRequired
  // };
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: '',
      typing: false
    };
  }

  // handleSubmit(event) {
  //   const { user, socket, activeChannel} = this.props;
  //   const text = event.target.value.trim();
  //   if (event.which === 13) {
  //     event.preventDefault();
  //     var newMessage = {
  //       id: `${Date.now()}${uuid.v4()}`,
  //       channelID: this.props.activeChannel,
  //       text: text,
  //       user: user,
  //       time: moment.utc().format('lll')
  //     };
  //     socket.emit('new message', newMessage);
  //     socket.emit('stop typing', { user: user.username, channel: activeChannel });
  //     this.props.onSave(newMessage);
  //     this.setState({ text: '', typing: false });
  //   }
  // }
  // handleChange(event) {
  //   const { socket, user, activeChannel } = this.props;
  //   this.setState({ text: event.target.value });
  //   if (event.target.value.length > 0 && !this.state.typing) {
  //     socket.emit('typing', { user: user.username, channel: activeChannel });
  //     this.setState({ typing: true});
  //   }
  //   if (event.target.value.length === 0 && this.state.typing) {
  //     socket.emit('stop typing', { user: user.username, channel: activeChannel });
  //     this.setState({ typing: false});
  //   }
  // }
  render() {
    return (
      <div>
        <Input
          style={{
            height: '100%',
            fontSize: '2em',
            marginBottom: '1em'
          }}
          type="textarea"
          name="message"
          ref="messageComposer"
          autoFocus="true"
          placeholder="Type here to chat!"
          value={this.state.text}
          onChange={::this.handleChange}
          onKeyDown={::this.handleSubmit}
        />
      </div>
    );
  }
}
