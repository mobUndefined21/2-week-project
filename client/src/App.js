import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage'
import LoginPage from './components/LoginPage/LoginPage'
import ProfilePage from './components/ProfilePage/ProfilePage'
import ProfileGalleryPage from './components/ProfileGalleryPage/ProfileGalleryPage'
import axios from 'axios';
import { useState } from 'react';

const authToken = window.localStorage.getItem('authToken');
const existingToken = authToken ? true : false;

const App = () => {
  axios.defaults.headers.common = {authorization: authToken};
  const [loggedIn, setLoggedIn] = useState(existingToken);
  return (
    <Router>
    <Nav setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
    <div className="App">
      <Switch>
        <Route path="/" exact component={() => <HomePage/>}/>
        <Route path="/login" exact component={() => <LoginPage setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}/>
        <Route path="/browsemusicians" exact component={() => <ProfileGalleryPage loggedIn={loggedIn}/>}/>
        <Route path="/profile/:id" exact component={() => <ProfilePage/>}/>
      </Switch>
    </div>
    <Footer className="footer" />
  </Router> 

);
}
{/* <Route path="/profile/:id" component={Profile} /> */}
{/* <Route path="/allprofiles" exact component={() => <Gallery fetchCocktails={fetchCocktails}/>}/> */}

export default App;
