import React, { useEffect, useState } from 'react';
import callAPI from '../../common/callAPI.js';
import AllFriends from '../AllFriends/AllFriends.js';

const ChatFriends = ({ chatWithUser, cookies }) => {
    let [users, setUsers] = useState([]);

    useEffect(()=>{
      const fetchRequests = async () => {
        let apiResult = await callAPI(
          "https://capstone-chat-server.herokuapp.com/users/friends",
          {
            token: cookies.user.token,
          },
          "POST"
        );
        setUsers(apiResult.friends);
      };
      fetchRequests();
    }, [])

  return (
    <div className="user-list">
      {users.length ? users.map((user, idx) => {
        return <AllFriends chatWithUser={chatWithUser} key={idx} user = {user}/>;
      }) : <div className="text-center m-5" >No Friends in your contact</div>}
    </div>
  );
}

export default ChatFriends;