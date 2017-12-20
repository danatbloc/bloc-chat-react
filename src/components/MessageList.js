import React, { Component } from 'react';

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

  render() {
    return(
      <div>
      <p>Room: {this.props.activeRoomName}</p>
      {
        this.state.messages.sort((a,b) => a.sentAt - b.sentAt ).map((message, index) =>
          <p key={index}>{message.roomId===this.props.activeRoom ? (`${message.username}: ${message.content}  - ${new Date(message.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`) : ""}</p>
        )
      }
      </div>
    );
  }
}

export default MessageList;
