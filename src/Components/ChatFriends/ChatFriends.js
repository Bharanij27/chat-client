import React, { Fragment, useEffect, useState } from 'react';
import callAPI from '../../common/callAPI.js';
import AllFriends from '../AllFriends/AllFriends.js';
import Loading from '../Loading/Loading.js';

const ChatFriends = ({ chatWithUser, cookies }) => {
  let [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
      const fetchRequests = async () => {
        setIsLoading(true)
        let apiResult = await callAPI(
          "https://capstone-chat-server.herokuapp.com/users/friends",
          {
            token: cookies.user.token,
          },
          "POST"
        );
        setUsers(apiResult.friends);
        setIsLoading(false)
      };
      fetchRequests();
    }, [])

  return (
    <Fragment>
      {isLoading && <Loading/>}
    <div className="user-list">
      {users.length ? users.map((user, idx) => {
        return <AllFriends chatWithUser={chatWithUser} key={idx} user = {user}/>;
      }) : <div className="text-center m-5" >No Friends in your contact</div>}
    </div>
    </Fragment>
  );
}

export default ChatFriends;