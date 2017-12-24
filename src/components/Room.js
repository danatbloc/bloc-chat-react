import React, { Component } from 'react';


class Room extends Component {

  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      roomNameChange: this.props.room.name
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }


  handleRoomChange = (e) => {
    this.setState({ roomNameChange: e.target.value })
  }

  editRoom = (key) => {
    this.setState({ isEditing: true });
  }

  submitNewRoomName = (roomKey, index) => {
    const newRoomName = this.state.roomNameChange;
    this.roomsRef.child(roomKey).update({ "name": newRoomName });
    this.props.updateRoomList(index, newRoomName, roomKey);
    this.setState({ isEditing: false });
  }


  render(){
    return(
      <tr>
          <td className={this.state.isEditing ? "show-button" : "hide-button"}><input type="text" value={this.state.roomNameChange} onChange={this.handleRoomChange} ></input></td>
          <td className={this.state.isEditing ? "hide-button" : "show-button"} id={this.props.activeRoom === this.props.room.key ? "active-room" : "inactive-room"} onClick={() => this.props.setActiveRoom(this.props.room.key, this.props.room.name)}>{this.props.room.name}</td>
          <td className={this.state.isEditing ? "hide-button" : "show-button"}><button onClick={() => this.editRoom(this.props.room.key)} type="submit">edit Room Name</button></td>
          <td className={this.state.isEditing ? "show-button" : "hide-button"}><button onClick={() => this.submitNewRoomName(this.props.room.key, this.props.index)} type="submit">enter</button></td>

          <td><button onClick={() => this.props.deleteRoom(this.props.room.key)} type="submit">delete room</button></td>
      </tr>
    );
  }
}

export default Room;
