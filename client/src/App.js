import './App.css';
import LoginContainer from './components/LoginContainer';
import Logout from './components/Logout';
import Profile from './components/Profile';
import axios from 'axios';
import { useState } from 'react';

const authToken = window.localStorage.getItem('authToken');
const existingToken = authToken ? true : false;

const App = () => {
  const [loggedIn, setLoggedIn] = useState(existingToken);
  return (
    <div className="App">
      { loggedIn ? <Logout setLoggedIn={setLoggedIn} /> : <LoginContainer setLoggedIn={setLoggedIn} /> }
      { loggedIn ? <Profile profileId="60f9376eb7e34eeb43c6eb1d"/> : <LoginContainer setLoggedIn={setLoggedIn} /> }
    </div>

  );
}

export default App;
