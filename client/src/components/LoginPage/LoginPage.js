import { useState, useEffect } from 'react';
import axios from 'axios';
import LoginContainer from '../LoginContainer/LoginContainer';
import Logout from '../Logout/Logout';
import Profile from '../Profile/Profile';
import './LoginPage.css';


const LoginPage = ({setLoggedIn, loggedIn}) => {
  // axios.defaults.headers.common = {authorization: authToken};

  // useEffect(() => {
  //   console.log('banana')
  // }, [loggedIn])

  return (
    <div className="login-container">
      { loggedIn ? <Logout setLoggedIn={setLoggedIn} /> : <LoginContainer setLoggedIn={setLoggedIn} /> }
      { loggedIn && <Profile profileId="60f9376eb7e34eeb43c6eb1d"/> }
    </div>
  )
}

export default LoginPage
