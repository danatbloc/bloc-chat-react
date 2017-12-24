import React, { Component } from 'react';
import Message from './Message'


class MessageList extends Component {

  constructor(props){
    super(props);
      this.state = {
        messages: []
      }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  updateMessages = (snapshot) => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat ( message ) });
  }

  componentWillReceiveProps = (nextProps) => {
    if(this.props.activeRoom !== nextProps.activeRoom){
      this.setState({ messages: [] });

      this.messagesRef.orderByChild("roomId").equalTo(nextProps.activeRoom).off();
      this.messagesRef.orderByChild("roomId").equalTo(nextProps.activeRoom).on('child_added', this.updateMessages);
    }
  }

  deleteMessage = (key) => {
    this.messagesRef.child(key).remove();
    this.setState({ messages: this.state.messages.filter((m) => m.key !== key )});
  }

  updateEditedMessage = (editedMessage, index) => {
    let message = this.state.messages.slice(index, index+1)[0];
    message.content = editedMessage;
    this.setState({ message });
  }

  render() {
    return(
      <div id="message-list-component">
        <p id="room-header"><b>Room: {this.props.activeRoomName}</b></p>
        {
          this.state.messages.sort((a,b) => a.sentAt - b.sentAt ).map((message, index) =>
            <Message
              key={index}
              message={message}
              index={index}
              activeRoom={this.props.activeRoom}
              deleteMessage={(k)=>this.deleteMessage(k)}
              firebase={this.props.firebase}
              updateEditedMessage={(m,i)=>this.updateEditedMessage(m,i)}
            />
          )
        }
      </div>
    );
  }
}

export default MessageList;
