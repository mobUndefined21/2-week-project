import './App.css';
import LoginContainer from './components/LoginContainer';
import Logout from './components/Logout';
import axios from 'axios';
import { useState, useEffect } from 'react';

const authToken = window.localStorage.getItem('authToken');

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {}, [loggedIn, setLoggedIn])
  return (
    <div className="App">
      { loggedIn ? <Logout setLoggedIn={setLoggedIn} /> : <LoginContainer setLoggedIn={setLoggedIn} /> }
    </div>
  );
}

export default App;
