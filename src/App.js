import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import NewMessage from './components/NewMessage';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyANYpXpS_wTvsCA0HoU7oEGM65dRW46hEU",
    authDomain: "bloc-chat-37b95.firebaseapp.com",
    databaseURL: "https://bloc-chat-37b95.firebaseio.com",
    projectId: "bloc-chat-37b95",
    storageBucket: "bloc-chat-37b95.appspot.com",
    messagingSenderId: "786903271541"
  };
  firebase.initializeApp(config);

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      activeRoom: "",
      activeRoomName: "",
      user: {
        displayName: ""
      }
    }
  }

  setActiveRoom = (room, roomName) => {
    this.setState({ activeRoom: room });
    this.setState({ activeRoomName: roomName })
  }

  setUser = (newuser) => {
    var user = {...this.state.user};
    user.displayName = newuser;
    this.setState({ user });
  }

  render() {
    return (
      <div className="App">
        <User
            setUser={(u) => this.setUser(u)}
            firebase={firebase}
            user={this.state.user}
        />
        <RoomList
            firebase={firebase}
            setActiveRoom={(r,n) => this.setActiveRoom(r,n)}
            activeRoom={this.state.activeRoom}
        />
        <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            activeRoomName={this.state.activeRoomName}
        />
        <NewMessage
            activeRoom={this.state.activeRoom}
            user={this.state.user}
            firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
