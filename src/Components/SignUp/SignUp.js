import React, { Fragment, useState } from "react";
import callAPI from "../../common/callAPI";
import Input from "../Input/Input";
import SignUpFooter from "./SignUpFooter";

const SignUp = ({ title, setIsLoading, setIsLogin }) => {
  let formDetails = { email: "", pass: "", phnum: "", uname: "", cpass: "" };
  const [formData, setFormData] = useState(formDetails);

  const onInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };
  const createUser = async (e) => {
    e.preventDefault();
    if (formData.pass !== formData.cpass) {
      alert("Password Should be same");
      return;
    }
    try {
      let response = await callAPI("https://capstone-chat-server.herokuapp.com/newUser", {
        ...formData,
      }, 'POST');
      if (response.status === 200) {
        console.log(response);
        setIsLogin(true);
      } else {
        alert(response.message)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <form className="form-signin" onSubmit={(e) => createUser(e)}>
        <Input
          id="inputEmail"
          type="email"
          placeholder="Email Address"
          value={formData.email}
          name="email"
          setValue={onInputChange}
        />
        <Input
          id="inputusername"
          type="text"
          placeholder="User name"
          value={formData.uname}
          name="uname"
          setValue={onInputChange}
        />
        <Input
          type="text"
          id="inputphonenum"
          placeholder="Phone Number"
          value={formData.phnum}
          name="phnum"
          setValue={onInputChange}
        />
        <Input
          type="password"
          id="inputPassword"
          placeholder="Password"
          value={formData.pass}
          name="pass"
          setValue={onInputChange}
        />
        <Input
          type="password"
          id="inputCPassword"
          placeholder="Confirm Password"
          value={formData.cpass}
          name="cpass"
          setValue={onInputChange}
        />
        <button
          className="btn btn-md btn-primary btn-block text-uppercase"
          type="submit"
        >
          {title}
        </button>
      </form>
      <hr className="my-4" />
      <SignUpFooter setIsLogin={setIsLogin} />
    </Fragment>
  );
};

export default SignUp;
