import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
      activeRoom: ""
    }
  }

  setActiveRoom = (room) => {
    this.setState({ activeRoom: room });
  }

  render() {
    return (
      <div className="App">
        <RoomList
            firebase={firebase}
            setActiveRoom={(r) => this.setActiveRoom(r)}
            activeRoom={this.state.activeRoom}
        />
        <MessageList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
        />
        
      </div>
    );
  }
}

export default App;
