import React from "react";
import callAPI from "../../common/callAPI";

const AddFriend = ({ requestSent, setReqList, reqList, user, cookies }) => {

  const addUser = async () => {
    let apiResult = await callAPI(
      "https://capstone-chat-server.herokuapp.com/requests/addRequest",
      {
        token: cookies.user.token,
        friend: user.name,
      },
      "PUT"
    );
    if (apiResult.status === 200) setReqList([...reqList, user.name]);
  };

  return (
    <div className="friendreq">
      {user.isFriend ? (
        "Friends"
      ) : requestSent ? (
        <i className="fa fa-arrow-right fa-lg bg-green"></i>
      ) : (
        <i className="fa fa-user-plus fa-lg" onClick={addUser}></i>
      )}
    </div>
  );
};

export default AddFriend;
