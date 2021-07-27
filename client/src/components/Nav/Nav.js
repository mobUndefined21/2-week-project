import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Logout from '../Logout/Logout';
import axios from 'axios'
import './Nav.css';


function Nav({loggedIn, setLoggedIn}) {
  const [profile, setProfile] = useState({});
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!loggedIn) return setLoading(false);
    const url = `${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${window.localStorage.getItem('profileId')}`;
    axios.get(url)
      .then(({data}) => {
        setProfile(data);
        setLoading(false);
      });
  }, [isLoading]);
  return (
    <div>
      <nav className="nav--inline">
        <Link to='/' exact className="nav-link nav">
          <h3 className="logo"><i className="fas fa-microphone-alt"></i></h3>
          <h2>Strummr</h2>
        </Link>
        {loggedIn && <Link to={`/chat`}><i class="far fa-comment-alt"></i></Link>}
        {isLoading ? <h2>Loading...</h2> :
         loggedIn && 
         <Link to={`/profile/${window.localStorage.getItem('profileId')}`}>
           <img className="avatar--small" src={profile.avatar}></img>
         </Link>}
        {loggedIn ? <Link to='/'><Logout setLoggedIn={setLoggedIn}/></Link> :
          <Link to='/login' className="nav-link btn-login btn-login-text">
              Login
          </Link>
          }

      </nav>
    </div>
  );
}

export default Nav;