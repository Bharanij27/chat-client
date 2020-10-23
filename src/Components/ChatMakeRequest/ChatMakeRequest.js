import React, { Fragment, useEffect, useState } from "react";
import callAPI from "../../common/callAPI";
import AddFriend from "../AddFriend/AddFriend";
import Friends from "../Friends/Friends";
import "./ChatMakeRequest.css";

const ChatMakeRequest = ({ cookies }) => {
  let [searchedFriend, setSearchedFriend] = useState([]);
  let [reqList, setReqList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      let apiResult = await callAPI(
        "https://capstone-chat-server.herokuapp.com/requests/",
        {
          token: cookies.user.token,
        },
        "POST"
      );
      setReqList(apiResult.requestSent);
    };
    fetchRequests();
  }, [searchedFriend]);

  const fetchUser = async (e) => {
    e.preventDefault();
    let apiResult = await callAPI(
      "https://capstone-chat-server.herokuapp.com/users/search",
      {
        token: cookies.user.token,
        searchString: searchText,
      },
      "POST"
    );
    setSearchedFriend(apiResult.result);
  };

  return (
    <div className="user-list">
      <form onSubmit={(e) => fetchUser(e)}>
        <div className="row m-3">
          <div className="form-group col-md-9 m-0">
            <input
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              placeholder="Search A Friend ex: Bharani"
              required
              className="form-control form-control-underlined"
            />
          </div>
          <div className="form-group col-md-3 m-0">
            <button
              type="submit"
              className="btn btn-primary rounded-pill btn-block shadow-sm"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {searchedFriend.length ? 
      searchedFriend.map((user, idx) => {
        return (
          <Fragment key={idx}>
            <Friends user={user.name}>
              <AddFriend
                user={user}
                cookies = {cookies}
                setReqList={setReqList}
                reqList={reqList}
                requestSent={reqList.includes(user.name)}
              />
            </Friends>
          </Fragment>
        );
      }) : 
      <div className="text-center m-5" >No user found for search name</div>}
    </div>
  );
};

export default ChatMakeRequest;
