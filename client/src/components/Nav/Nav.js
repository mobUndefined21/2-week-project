import React from "react";
import {NavLink} from 'react-router-dom';
import './Nav.css';

function Nav() {
  return (
    <nav className='nav'>
      <NavLink to='/' exact className="nav-link">
      <h3 className="logo"><i class="fas fa-microphone-alt"></i></h3>
      </NavLink>
      <ul className="nav-links"> 
        <NavLink to='/' exact className="nav-link">
          <li><i className="fas fa-home"></i></li>
        </NavLink>
        <NavLink to='/browsemusicians' className="nav-link">
          <li><i className="fas fa-user-friends"></i></li>
        </NavLink>
        <NavLink to='/login' className="nav-link btn-login">
          <li className="btn-login-text">Login</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default Nav;