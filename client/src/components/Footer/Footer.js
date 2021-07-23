import {NavLink} from 'react-router-dom';

const Footer = () => {
return (
  <nav className="footer">
    <ul className="nav-links"> 
      <NavLink to='/' exact className="nav-link">
        <li><i className="fas fa-home"></i></li>
      </NavLink>
      <NavLink to='/browsemusicians' className="nav-link">
        <li><i className="fas fa-user-friends"></i></li>
      </NavLink>
    </ul>
  </nav>
)
}

export default Footer;