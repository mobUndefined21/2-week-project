import { useState, useEffect } from 'react';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import './LoginContainer.css';

const LoginContainer = ({setLoggedIn}) => {
  const [tab, setTab] = useState('login');
  return (
    <div>
      <nav>
        <button className="nav-link-loginContainer btn-login-loginContainer btn-login-text" onClick={() => setTab('login')}>
          Login
        </button>
        <button className="nav-link-loginContainer btn-login-loginContainer btn-login-text" onClick={() => setTab('signup')}>
          Signup
        </button>
      </nav>
      <div>
        {tab === 'login' ? <Login setLoggedIn={setLoggedIn} setTab={setTab}/> : <Signup setTab={setTab}/>}
      </div>
    </div>
  )
}

export default LoginContainer;
