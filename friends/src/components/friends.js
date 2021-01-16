import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import FriendCard from "./friendCard";

const Friends = props => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState({
    name: "",
    age: "",
    email: ""
  });

  const [isEditing, setIsEditng] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get(`http://localhost:5000/api/friends`)
      .then(res => setFriends(res.data));
  }, []);

  const detailHandler = id => {
    props.history.push(`/friends/${id}`);
  };

  const updateHandler = id => {
    const friendToUpdate = friends.filter(fri => fri.id === id)[0];
    setNewFriend(friendToUpdate);
    setIsEditng(true);
  };

  console.log(newFriend, isEditing);

  const deleteHandler = id => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/friends/${id}`)
      .then(res => setFriends(res.data));
  };

  const changeHandler = e => {
    setNewFriend({ ...newFriend, [e.target.name]: e.target.value });
  };

  const addFriend = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`http://localhost:5000/api/friends`, newFriend)
      .then(res => setFriends(res.data));
    setNewFriend({ name: "", age: "", email: "" });
  };

  const editFriend = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`http://localhost:5000/api/friends/${newFriend.id}`, newFriend)
      .then(res => setFriends(res.data));
    setNewFriend({ name: "", age: "", email: "" });
    setIsEditng(false);
  };

  return (
    <div>
      <form onSubmit={isEditing === false ? addFriend : editFriend}>
        <input
          type="text"
          name="name"
          value={newFriend.name}
          placeholder="name"
          onChange={changeHandler}
        />
        <input
          type="number"
          name="age"
          value={newFriend.age}
          placeholder="age"
          onChange={changeHandler}
        />
        <input
          type="email"
          name="email"
          value={newFriend.email}
          placeholder="email"
          onChange={changeHandler}
        />
        <button>add</button>
      </form>
      {friends.map(fri => (
        <FriendCard
          key={fri.id}
          name={fri.name}
          age={fri.age}
          email={fri.email}
          detailClicked={() => detailHandler(fri.id)}
          deleteClicked={() => deleteHandler(fri.id)}
          updateClicked={() => updateHandler(fri.id)}
        />
      ))}
    </div>
  );
};

export default Friends;