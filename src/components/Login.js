import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    //console.log(formData);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!formData.email || !formData.password) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (res) => {
        //console.log(res);
        navigate("/home");
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  

  return (
    <div className="signup-container">
      <h3>LogIn to your account</h3>
      <form onSubmit={submitHandler}>
        <div className="input">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter email address"
            required
          />
        </div>
        <div className="input">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            placeholder="Enter password"
            required
          />
        </div>
        <b className="error">{errorMsg}</b>
        <input type="submit" value="Submit" className="submitBtn" />
        
      </form>
    </div>
  );
};
export default Login;
