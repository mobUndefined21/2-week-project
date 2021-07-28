import {NavLink, Link} from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from 'axios'
import './Footer.css';

const Footer = ({loggedIn, setLoggedIn, onNewMessage}) => {
  const [profile, setProfile] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [newMessages, setNewMessages] = useState(false);


  useEffect(() => {
    onNewMessage['footer'] = () => {
      if(!newMessages)
      setNewMessages(true);
    };
  },[])
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
  <nav className="footer">
    <ul className="nav-links"> 
      <NavLink to='/' exact className="nav-link">
        <li><i className="fas fa-home"></i></li>
      </NavLink>
      <NavLink to='/browsemusicians' className="nav-link">
        <li><i className="fas fa-user-friends"></i></li>
      </NavLink>
      {loggedIn && <Link onClick={e=>{setNewMessages(false)}}to={`/conversations`}>{newMessages ? <i class="fas fa-comment-medical"></i> : <i class="fas far fa-comment-alt"></i>}</Link>}
    </ul>
  </nav>
)
}

export default Footer;