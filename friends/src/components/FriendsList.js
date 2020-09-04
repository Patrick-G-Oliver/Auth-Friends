import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import AddFriends from "./AddFriends";

function FriendsList() {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/friends")
      .then(res => 
        setFriends(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {friends.length === 0 ? (
        <h1>Loading Friends...</h1>
      ) : (
        <div>
          <h1>Friends List</h1>
          <div>
              <AddFriends friends={friends} setFriends={setFriends}/>
          </div>
          <div>
          {friends.map(friend => {
            return (<div>{friend.name}</div>)})}
          </div>
        </div>
      )}
    </>
  );
}

export default FriendsList;