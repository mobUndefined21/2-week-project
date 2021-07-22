import {useState} from 'react'
const axios = require('axios');
const url = `${window.location.protocol}//${window.location.hostname}:8080/api/users/login`;

const Login = ({setLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const body = { email, password };
    axios.post(url, body)
      .then(res => {
        setPassword('');
        window.localStorage.setItem('authToken', res.data.authToken);
        setLoggedIn(true);
      })
      .catch(err => console.log(err.message))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          E-mail
        </label>
        <input
          type="text"
          name="email"
          id="email" 
          onChange={e => setEmail(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)}/>
        <input type="submit" value="Log In" />
      </form>
    </div>
  )
}

export default Login;
