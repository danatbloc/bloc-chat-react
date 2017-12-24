import React, { Component } from 'react';

class LoggedInUsers extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      uids: []
    }
    this.usersRef = this.props.firebase.database().ref('users');
  }

  componentDidMount = () => {


  }

  updateLoggedInUser = (user) => {
console.log("uid: " + this.state.uid);
console.log(user);
console.log(this.state.users);

    this.usersRef.push({
      name: user.displayName,
      email: user.email,
      uid: user.uid
    });
  }

  updateLoggedOutUser = (user) => {
    console.log(user);

  }

  userExists = (uid) => {
    this.usersRef.child(uid).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      console.log(exists);
    });
  }




  render(){
    return(
      <div>
        {
          <div>
            <span>{this.props.user.name}</span>
          </div>
        }
      </div>
    );
  }
}

export default LoggedInUsers;
