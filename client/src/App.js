import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage'
import LoginPage from './components/LoginPage/LoginPage'
import ProfilePage from './components/ProfilePage/ProfilePage'
import ProfileGalleryPage from './components/ProfileGalleryPage/ProfileGalleryPage';
import Conversations from './components/Conversations/Conversations';
import Chat from './components/Chat/Chat'
import axios from 'axios';
import { useState } from 'react';
import { io } from "socket.io-client";

const socketUrl = `ws://${window.location.hostname}:8081`;
const socket = io(socketUrl);

const authToken = window.localStorage.getItem('authToken');
const existingToken = authToken ? true : false;

const profileId = window.localStorage.getItem('profileId');

const App = () => {
  axios.defaults.headers.common = {authorization: authToken};
  const [loggedIn, setLoggedIn] = useState(existingToken);
  const newMessages = {};
  
  const onNewMessage = {};

  const updateChat = (callback) => {
    socket.on('newMessage', data => {
      callback(data);
      if(profileId === data.profileId) return;
      newMessages[data.conversationId] = true;
      Object.keys(onNewMessage).forEach(key => onNewMessage[key]())
    });
  };
  return (
    <Router>
    <Nav setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
    <div className="App">
      <Switch>
        <Route path="/" exact component={() => <HomePage/>}/>
        <Route path="/login" exact component={() => <LoginPage setLoggedIn={setLoggedIn} loggedIn={loggedIn} />}/>
        <Route path="/browsemusicians" exact component={() => <ProfileGalleryPage loggedIn={loggedIn}/>}/>
        <Route path="/profile/:id" exact component={() => <ProfilePage/>}/>
        <Route path="/conversations/:conversationId" exact component={() => <Conversations socket={socket} updateChat={updateChat} newMessages={newMessages}/>}/>
        <Route path="/conversations" exact component={() => <Conversations socket={socket} updateChat={updateChat} newMessages={newMessages}/>}/>
      </Switch>
    </div>
    <Footer 
    setLoggedIn={setLoggedIn} 
    loggedIn={loggedIn}
    className="footer"
    onNewMessage={onNewMessage}
    />
  </Router> 

);
}
{/* <Route path="/profile/:id" component={Profile} /> */}
{/* <Route path="/allprofiles" exact component={() => <Gallery fetchCocktails={fetchCocktails}/>}/> */}

export default App;
