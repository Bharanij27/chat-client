import React, { Fragment, useState } from "react";
import callAPI from "../../common/callAPI";
import Input from "../Input/Input";
import Loading from "../Loading/Loading";
import SignUpFooter from "./SignUpFooter";

const SignUp = ({ title, setIsLogin }) => {
  let formDetails = { email: "", pass: "", phnum: "", uname: "", cpass: "" };
  const [formData, setFormData] = useState(formDetails);
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };
  const createUser = async (e) => {
    e.preventDefault();
    if (formData.pass !== formData.cpass) {
      alert("Password Should be same");
      return;
    }
    else if(formData.pass.length < 4){
      alert('The password should be a minimum of 4 characters in length')
    }
    else if(formData.phnum.length < 10){
      alert('Phone Number should be valid')
    }
    else if(formData.phnum.split('').every(number => number.charCodeAt(0) < 58 && number.charCodeAt(0) < 58)){
      alert('Enter valid phone number')
    }
    try {
      let response = await callAPI("https://capstone-chat-server.herokuapp.com/newUser", {
        ...formData,
      }, 'POST');
      if (response.status === 200) {
        setIsLogin(true);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        alert(response.message)
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <Fragment>
      {isLoading && <Loading/>}
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
