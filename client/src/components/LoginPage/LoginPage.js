import { useState } from 'react';
import axios from 'axios';
import LoginContainer from '../LoginContainer/LoginContainer';
import Logout from '../Logout/Logout';
import Profile from '../Profile/Profile';
import './LoginPage.css';

const authToken = window.localStorage.getItem('authToken');
const existingToken = authToken ? true : false;

const LoginPage = () => {
  axios.defaults.headers.common = {authorization: authToken};
  const [loggedIn, setLoggedIn] = useState(existingToken);

  return (
    <div className="login-container">
      { loggedIn ? <Logout setLoggedIn={setLoggedIn} /> : <LoginContainer setLoggedIn={setLoggedIn} /> }
      { loggedIn && <Profile profileId="60f9376eb7e34eeb43c6eb1d"/> }
      <h1>Login Page</h1>
    </div>
  )
}

export default LoginPage
