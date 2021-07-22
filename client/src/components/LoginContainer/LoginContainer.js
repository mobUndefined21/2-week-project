import { useState, useEffect } from 'react';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

const LoginContainer = ({setLoggedIn}) => {
  const [tab, setTab] = useState('login');
  return (
    <div>
      <nav>
        <button onClick={() => setTab('login')}>
          Login
        </button>
        <button onClick={() => setTab('signup')}>
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