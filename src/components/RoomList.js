import React, { Component } from 'react';
import Room from './Room';

class RoomList extends Component {

  constructor(props){
    super(props);

    this.state = {
      rooms: [],
      newRoomName: "",
      roomNameChange: ""
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.messagesRef = this.props.firebase.database().ref('messages');
  }


  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat ( room ) });
    });
  }

  addRoom = (e) => {

    e.preventDefault();

    if (!!this.state.newRoomName) {
      const newRoom = this.state.newRoomName

      this.roomsRef.push({
        name: newRoom
      });
    }
    this.setState({ newRoomName: "" });
  }

  onChange = (e) => {
    this.setState({ newRoomName: e.target.value })
  }

  deleteRoom = (key) => {
    this.roomsRef.child(key).remove();
    this.setState({ rooms: this.state.rooms.filter((r) => r.key !== key )});
    this.props.setActiveRoom("", "");
  };

  updateRoomList = (index,roomName, roomKey) => {
    let room = this.state.rooms.slice(index, index+1)[0];
    room.name = roomName;

    if(this.props.activeRoom === roomKey){
      this.props.setActiveRoom(roomKey, roomName)
    }  

    this.setState({ room });
  }


  render() {
    return (

      <main id="room-list">
        <table>
          <tbody>


              {
                this.state.rooms.map( (room,index) =>

                    <Room
                      key={index}
                      room={room}
                      index={index}
                      activeRoom={this.props.activeRoom}
                      setActiveRoom={(r,i)=>this.props.setActiveRoom(r,i)}
                      firebase={this.props.firebase}
                      updateRoomList={(i,n,k)=>this.updateRoomList(i,n,k)}
                      deleteRoom={(k)=>this.deleteRoom(k)}
                    />
                )
              }


          </tbody>
        </table>

        <form id="new-room" onSubmit={this.addRoom}>
          <input type="text" onChange={this.onChange} value={this.state.newRoomName} placeholder="New Room Name" />
          <button type="submit">Submit</button>
        </form>

      </main>

    );
  }
}

export default RoomList;
