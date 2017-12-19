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
      this.setState({ messages: [] });

      this.messagesRef.orderByChild("roomId").equalTo(nextProps.activeRoom).off();
      this.messagesRef.orderByChild("roomId").equalTo(nextProps.activeRoom).on('child_added', this.updateMessages);
  }


  // componentWillReceiveProps = (nextProps) => {
  //   if(this.props.activeRoom !== nextProps.activeRoom){
  //     this.messagesRef.orderByChild("roomId").equalTo(nextProps.activeRoom).on('child_added', snapshot => {
  //       const message = snapshot.val();
  //       message.key = snapshot.key;
  //       if (!this.state.messages.find((m) => m.key === message.key)){
  //         this.setState({ messages: this.state.messages.concat ( message ) });
  //       }
  //     });
  //   }
  // }

  // componentDidMount = () => {
  //   this.messagesRef.on('child_added', snapshot => {
  //     const message = snapshot.val();
  //     message.key = snapshot.key
  //     console.log("message: " + message.key);
  //     this.setState({ messages: this.state.messages.concat ( message ) });
  //     console.log(this.state.messages);
  //   });
  // }

  render() {
    return(

      this.state.messages.map((message, index) =>

        <p key={index}>{message.roomId===this.props.activeRoom ? (`${message.username}: ${message.content}`) : ""}</p>

      )
    );
  }
}

export default MessageList;
