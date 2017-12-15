import React, { Component } from 'react';


class RoomList extends Component {

  constructor(props){
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ""
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
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

  render() {
    return (

      <main>
        {
          this.state.rooms.map( (room,index) =>
            <p key={room.name + index}>{room.name}</p>
          )
        }

        <p>{this.state.newRoomName}</p>

        <form id="new-room" onSubmit={this.addRoom}>
          <input type="text" onChange={this.onChange} value={this.state.newRoomName} placeholder="New Room Name" />
          <button type="submit">Submit</button>
        </form>

      </main>

    );
  }
}

export default RoomList;
