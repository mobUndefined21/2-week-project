import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const axios = require('axios');
const url = `${window.location.protocol}//${window.location.hostname}:8080/api/users/login`;

const Login = ({setLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();
    const body = { email, password };
    axios.post(url, body)
      .then(res => {
        window.localStorage.setItem('authToken', res.data.authToken);
        window.localStorage.setItem('profileId', res.data.profileId);
        axios.defaults.headers.common = {authorization: res.data.authToken};
        setLoggedIn(true);
        history.push(`/profile/${res.data.profileId}`)
      })
      .catch(err => console.log(err.message))
  }
  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="email">
          E-mail
        </label>
        <input
          className="form-input"
          type="text"
          name="email"
          id="email" 
          onChange={e => setEmail(e.target.value)}/>
        <label className="form-label" htmlFor="password">Password</label>
        <input className="form-input" type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
        <input type="submit" value="Log In" className="login-button"/>
      </form>
    </div>
  )
}

export default Login;
