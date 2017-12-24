import React, { Component } from 'react';

class Message extends Component {

  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      messageChange: this.props.message.content
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  handleMessageChange = (e) => {
    this.setState({messageChange: e.target.value});
  }

  editMessage  = () => {
    this.setState({ isEditing: true });
  }

  submitEditedMessage = (key, index)  => {
    const editedMessage = this.state.messageChange;
    this.messagesRef.child(key).update({"content": editedMessage});
    this.props.updateEditedMessage(editedMessage, index);
    this.setState({ isEditing: false });
  }


  render(){
    return(
      <div className="message">
        <span className={this.state.isEditing ? "hide-button" : "show-button"}><b>{this.props.message.username}</b>: {this.props.message.content}  - {new Date(this.props.message.sentAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        <input className={this.state.isEditing ? "show-button" : "hide-button"} type="text" value={this.state.messageChange} onChange={this.handleMessageChange} ></input>
        <button className={this.state.isEditing ? "hide-button" : "show-button"} onClick={this.editMessage}>Edit Message</button>
        <button className={this.state.isEditing ? "show-button" : "hide-button"} onClick={() => this.submitEditedMessage(this.props.message.key, this.props.index)}>Enter</button>
        <button type="submit" onClick={() => this.props.deleteMessage(this.props.message.key)}>Delete message</button>

      </div>
    )
  }
}

export default Message;
