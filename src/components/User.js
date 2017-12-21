import React, { Component } from 'react';


class User extends Component {

  componentDidMount = () => {
    this.props.firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.props.setUser(user.displayName);
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

  render(){
    return(
      <div>
        <p>Signed in as: {this.props.user.displayName}</p>
        <button className={this.props.user.displayName==="guest" ? "show-button" : "hide-button"} onClick={this.signInWithPopup}>Sign In</button>
        <button className={this.props.user.displayName==="guest" ? "hide-button" : "show-button"} onClick={this.signOut}>Sign Out</button>
      </div>
    );
  }
}

export default User;
