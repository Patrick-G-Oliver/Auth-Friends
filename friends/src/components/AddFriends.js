import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class AddFriends extends React.Component {
  state = {
    newFriend: {
      name: "",
      age: "",
      email: ""
    }
  };

  handleChanges = e => {
      this.setState({
          newFriend: {
              ...this.state.newFriend,
              [e.target.name]: e.target.value, 
          }
      });
  };

  addFriend = e => {
      e.preventDefault();
      // make a post request to the /friends endpoint on the server 
      axiosWithAuth()
          .post("http://localhost:5000/api/friends", this.state.newFriend)
          .then(res => {
              console.log(this.props.friends)
              console.log(res);
              this.props.setFriends(
                  this.props.friends.concat(this.state.newFriend)
              );
          })
          .catch(err => console.log({ err }));
  };

  render() {
      return (
          <div>
              <form onSubmit={this.addFriend}>
                  <input 
                      type="text"
                      name="name"
                      value={this.state.newFriend.name}
                      onChange={this.handleChanges}
                      placeholder="name"
                  />
                  <input 
                      type="text"
                      name="age"
                      value={this.state.newFriend.age}
                      onChange={this.handleChanges}
                      placeholder="age"
                  />
                  <input 
                      type="text"
                      name="email"
                      value={this.state.newFriend.email}
                      onChange={this.handleChanges}
                      placeholder="email"
                  />
                  <button>Add a new friend!</button>
              </form>
          </div>
      )
  }
};

export default AddFriends;