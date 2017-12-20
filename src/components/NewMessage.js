import React, { Component } from 'react';

class NewMessage extends Component {

  constructor(props){
    super(props);

    this.state = {
      newMessage: ""
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  addMessage = (e) => {
    e.preventDefault();
    if (!this.props.activeRoom){
      alert("select a room first");
    }else{
      if (!!this.state.newMessage) {
        this.messagesRef.push({
          content: this.state.newMessage,
          roomId: this.props.activeRoom,
          username: this.props.user.displayName,
          sentAt: Date.now()
        });
      }
    }
    this.setState({ newMessage: "" });
  }

  onChange = (e) => {
    this.setState({ newMessage: e.target.value })
  }

  render(){
    return(
      <div style={{ position: 'fixed', bottom: '20px', left: '200px' }}>
        <form id="new-message" onSubmit={this.addMessage}>
          <input type="text" onChange={this.onChange} value={this.state.newMessage} placeholder="enter new message" />
          <button type="submit">Enter Message</button>
        </form>
      </div>
    );
  }
}

export default NewMessage;
