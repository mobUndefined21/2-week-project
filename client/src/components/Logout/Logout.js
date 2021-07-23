import axios from 'axios';
import './Logout.css';
const url = `${window.location.protocol}//${window.location.hostname}:8080/api/users/logout`;

const Logout = ({setLoggedIn}) => {
  const handleClick = () => {
    axios.patch(url).then(res => {
      axios.defaults.headers.common = {
        authorization: ''
      }
      window.localStorage.clear('authToken');
      setLoggedIn(false);
    });
  }
  return (
    <div>
      <button onClick={handleClick} className="btn-login btn-login-text">Sign out</button>
    </div>
  )
};

export default Logout;
