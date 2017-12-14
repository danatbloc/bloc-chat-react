import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
