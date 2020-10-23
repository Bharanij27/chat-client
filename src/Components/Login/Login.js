import React, { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Loading from '../Loading/Loading';
import { useHistory } from "react-router-dom";
import callAPI from "../../common/callAPI";
import Input from "../Input/Input";
import LoginFooter from "./LoginFooter";

const Login = ({ title, setIsLogin }) => {
  let formDetails = { email: "", pass: "" };
  const [formData, setFormData] = useState(formDetails);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      let response = await callAPI("http://localhost:3030/", {
        ...formData,
      }, 'POST');
      if (response.status === 200) {
        setCookie("user", { token: response.token }, { path: "/" });
        setIsLoading(false);
        history.push("/chat");
      } else {
        setIsLoading(false);
        alert(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Fragment>
      {isLoading && <Loading/>}
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
