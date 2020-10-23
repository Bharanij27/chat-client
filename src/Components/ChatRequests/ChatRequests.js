import React, { Fragment, useEffect, useState } from "react";
import callAPI from "../../common/callAPI";
import Decide from "../Decide/Decide";
import Friends from "../Friends/Friends";
import Loading from "../Loading/Loading";

const ChatRequests = ({ cookies }) => {
  let [friendReqs, setFriendReqs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true)
      let apiResult = await callAPI(
        "https://capstone-chat-server.herokuapp.com/requests/recieved",
        {
          token: cookies.user.token,
        },
        "POST"
      );
      setFriendReqs(apiResult.requestRecieved);
      setIsLoading(false)
    };
    fetchRequests();
  }, []);

  const decision = async(decisionMade, user)=>{
      setFriendReqs(friendReqs.filter(friend => friend !== user));
      await callAPI(
        "https://capstone-chat-server.herokuapp.com/requests/decision",
        {
          token: cookies.user.token,
          friend : user,
          decision : decisionMade
        },
        "PUT"
      );
  }

  return (
    <Fragment>
      {isLoading && <Loading/>}
    <div className="user-list">
    {friendReqs.length ? 
      friendReqs.map((user, idx) => {
        return (
          <Fragment key={idx}>
            <Friends key={"Friend" + idx} user={user}>
              <Decide user={user} decision={decision}/>
            </Friends>
          </Fragment>
        );
      }) : <div className="text-center m-5" >No Friend Requests</div>}
    </div>
    </Fragment>
  );
};

export default ChatRequests;
