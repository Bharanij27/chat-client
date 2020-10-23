import React, { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import callAPI from "../../common/callAPI";
import Input from "../Input/Input";
import LoginFooter from "./LoginFooter";

const Login = ({ title, setIsLoading, setIsLogin }) => {
  let formDetails = { email: "", pass: "" };
  const [formData, setFormData] = useState(formDetails);

  const onInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const [cookies, setCookie] = useCookies(["user"]);

  let history = useHistory();

  useEffect(()=>{
    history.push('/')
  }, []);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      let response = await callAPI("https://capstone-chat-server.herokuapp.com/", {
        ...formData,
      }, 'POST');
      if (response.status === 200) {
        setCookie("user", { token: response.token }, { path: "/" });
        
        history.push("/chat");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <form className="form-signin" onSubmit={(e) => loginUser(e)}>
        <Input
          id="inputEmail"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          name="email"
          setValue={onInputChange}
        />
        <Input
          id="inputPassword"
          type="password"
          placeholder="Password"
          value={formData.pass}
          name="pass"
          setValue={onInputChange}
        />
        <button
          className="btn btn-lg btn-primary btn-block text-uppercase"
          type="submit"
        >
          {title}
        </button>
      </form>
      <hr className="my-4" />
      <LoginFooter setIsLogin={setIsLogin} />
    </Fragment>
  );
};

export default Login;
