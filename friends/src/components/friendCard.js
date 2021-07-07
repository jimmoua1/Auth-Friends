import React from "react";

const FriendCard = ({
  name,
  age,
  email,
  detailClicked,
  deleteClicked,
  updateClicked
}) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{age}</p>
      <p>{email}</p>
      <button onClick={detailClicked}>detail</button>
      <button onClick={updateClicked}>update</button>
      <button onClick={deleteClicked}>delete</button>
    </div>
  );
};

export default FriendCard;