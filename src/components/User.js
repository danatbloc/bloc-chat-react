import React, { Component } from 'react';
import LoggedInUsers from './LoggedInUsers';

class User extends Component {

  constructor(props){
    super(props);
    this.state = {
      users: [],
      uids: []
    }
    this.usersRef = this.props.firebase.database().ref('users');
  }

  componentDidMount = () => {

    this.usersRef.orderByChild("uid").on('child_added', (snapshot)=> {
      console.log("orderbychild ")
      const user = snapshot.val();
      user.key = snapshot.key;
      if(!this.state.users.includes(user)){
        this.setState({ users: this.state.users.concat( user ) });
        this.setState({ uids: this.state.uids.concat(user.key) });
        console.log(this.state.users);
      }

    });


    this.props.firebase.auth().onAuthStateChanged( user => {
      if(user){
        console.log('hit');
        console.log(user.key);
        this.props.setUser(user.displayName, user.key);
        if(user.uid !== this.state.users[0].uid){
          this.updateLoggedInUser(user)
        }
      }else{
        this.props.setUser("guest");
      }
    });
  }

  signInWithPopup = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut = () => {
    this.props.firebase.auth().signOut();
  }


  updateLoggedInUser = (user) => {
    this.usersRef.push({
      name: user.displayName,
      email: user.email,
      uid: user.uid
    });
  }

  updateLoggedOutUser = (user) => {
    this.usersRef.child(user.key).remove();
    this.setState({ users: this.state.users.filter((u)=>u.key !== user.key) })
    console.log(user);

  }


  render(){
    return(
      <div>
        <span id="signed-in-name">Signed in as: {this.props.user.displayName}</span>
        <button className={this.props.user.displayName==="guest" ? "show-button" : "hide-button"} onClick={this.signInWithPopup}>Sign In</button>
        <button className={this.props.user.displayName==="guest" ? "hide-button" : "show-button"} onClick={this.signOut}>Sign Out</button>
        <p><b>Logged In Users:</b> </p>
        {
          this.state.users.map((u,index)=>
            <LoggedInUsers
                key={u.key}
                firebase={this.props.firebase}
                user={u}
            />
          )
        }
      </div>
    );
  }
}

export default User;
