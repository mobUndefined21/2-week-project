import { useState, useEffect } from 'react';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import './LoginContainer.css';

const LoginContainer = ({setLoggedIn}) => {
  const [tab, setTab] = useState('login');
  return (
    <div>
      <button className="nav-link-loginContainer btn-login-loginContainer" onClick={() => setTab('login')}>
        Login
      </button>
      <button className="nav-link-loginContainer btn-login-loginContainer" onClick={() => setTab('signup')}>
        Signup
      </button>
    <div>
        {tab === 'login' ? <Login setLoggedIn={setLoggedIn} setTab={setTab}/> : <Signup setTab={setTab}/>}
      </div>
    </div>
  )
}

export default LoginContainer;
