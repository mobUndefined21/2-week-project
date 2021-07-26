import { useState } from "react";
import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout';
import './Nav.css';

function Nav({loggedIn,setLoggedIn}) {

  return (
    <div>
      <nav>
        <Link to='/' exact className="nav-link nav">
          <h3 className="logo"><i className="fas fa-microphone-alt"></i></h3>
          <h2>Strummr</h2>
        </Link>
        {loggedIn ? <Link to='/login'><Logout setLoggedIn={setLoggedIn}/></Link> :
        <Link to='/login' className="nav-link btn-login btn-login-text">
            Login
        </Link>}
      </nav>
    </div>
);
}

export default Nav;