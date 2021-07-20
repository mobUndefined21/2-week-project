import { useState } from 'react';
const axios = require('axios');
const url = `${window.location.protocol}//${window.location.hostname}:8080/api/users/newUser`;

const Signup = ({setTab}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    const body = {
      firstName,
      lastName,
      email,
      password,
    }
    axios.post(url, body).then(res => {
      if(res.status !== 201) return;
      setFirstName('');
      setLastName('');
      setPassword('');
      setEmail('');
      setTab('login');
    });
  }
  
  return (
    <div>
        <form
          onSubmit={ handleSubmit }>
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          name="first-name"
          id="firstName"
          value={ firstName }
          onChange={ e => setFirstName(e.target.value) } 
        />
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          name="last-name"
          id="lastName"
          value={ lastName }
          onChange={ e => setLastName(e.target.value) } 
        />
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          name="email"
          id="email"
          value={ email }
          onChange={ e => setEmail(e.target.value) }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={ password }
          onChange={ e => setPassword(e.target.value) }
        />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  )
}

export default Signup;
