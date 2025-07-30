import React, { useState } from 'react'
import "../styles/Login.css";


import { account } from '../appwrite/Appwrite';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const signupFunc = async () => {
    // APPWRITE CONFIGURATION
    const signUpProcess = account.create(
      userData.name,
      userData.email,
      userData.password,
      userData.name,
    )
    signUpProcess.then(function (response) {
      alert("SignUp successfully");
      navigate("/login");
    }, function (error) {
      alert(error);
    })
  }


  return (
    <div id="login-main">
      <div id="login-form">
        <h2 id="login-h2">Signup</h2>
        <input type="text" id="login-input" placeholder='Name' onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
        <input type="email" id="login-input" placeholder='Email' onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
        <input type="text" id="login-input" placeholder='Password' onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
        <button onClick={signupFunc} id="login-btn">Signup</button>
      </div>
    </div>
  )
}

export default Signup