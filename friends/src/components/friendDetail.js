import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const FriendDetail = props => {
  const [friendDetail, setFriendDetail] = useState([]);
  console.log(props);

  useEffect(() => {
    axiosWithAuth()
      .get(`http://localhost:5000/api/friends/${props.match.params.id}`)
      .then(res => setFriendDetail(res.data));
  }, [props.match.params.id]);

  return (
    <div>
      <h3>{friendDetail.name}</h3>
      <p>{friendDetail.age}</p>
      <p>{friendDetail.email}</p>
    </div>
  );
};

export default FriendDetail;