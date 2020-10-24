import React, { useEffect } from 'react';
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import CustomToggle from './CustomToggle';
import './HeaderMenu.css';
import io from "socket.io-client";

const HeaderMenu = ({ setCurrentBody }) => {
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);
    let socket = io("https://capstone-chat-server.herokuapp.com/");
    
    useEffect(()=>{
    socket.emit("join", {token: cookies.user.token}, (error) => {
      if (error) alert(error);
    },[]);

  })
  const logout = () => {   
    socket.emit("remove", {token: cookies.user.token}, (error) => {
      if (error) alert(error);
    });
    
    removeCookie("user", null, { path: "/" });
    history.push("/");
  };

    return(
        <Dropdown>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu size="sm">
          <Dropdown.Item onClick={()=> setCurrentBody('Friend')}>Friends</Dropdown.Item>
          <Dropdown.Item onClick={()=> setCurrentBody('MakeRequest')}>New Friend</Dropdown.Item>
          <Dropdown.Item onClick={()=> setCurrentBody('Request')}>Friend Requests</Dropdown.Item>
          <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    //   <button className="btn btn-primary" onClick={logout}>Logout</button>
    )
}

export default HeaderMenu;