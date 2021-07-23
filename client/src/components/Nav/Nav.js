import { useState } from "react";
import {NavLink} from 'react-router-dom';
import Logout from '../Logout/Logout';
import './Nav.css';

function Nav({loggedIn,setLoggedIn}) {

  return (
    <div>
      <nav>
        <NavLink to='/' exact className="nav-link nav">
          <h3 className="logo"><i className="fas fa-microphone-alt"></i></h3>
          <h2>Strummr</h2>
        </NavLink>
        {loggedIn ? <NavLink to='/login'><Logout setLoggedIn={setLoggedIn}/></NavLink> :
        <NavLink to='/login' className="nav-link btn-login btn-login-text">
            Login
        </NavLink>}
      </nav>
    </div>
);
}

export default Nav;