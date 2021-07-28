import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Chat/Chat.css';
import Chat from '../Chat/Chat';
import ConversationHeader from './ConversationHeader';
import axios from 'axios';
import { io } from "socket.io-client";

const profileId = window.localStorage.getItem('profileId');
const socketUrl = `ws://${window.location.hostname}:8081`;
const socket = io(socketUrl);
const url = `${window.location.protocol}//${window.location.hostname}:8080/api/messages/profile/${profileId}`;

const Conversations = () => {
  const [isLoading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const { conversationId } = useParams();
  const updateChat = (callback) => {
    console.log('updateChat run');
    socket.on('newMessage', data => {
      callback(data);
    });
  };

  useEffect(() => {
    socket.emit('handshake', {profileId})
    axios.get(url).then(({data}) => {
      setConversations(data.ids);
      setLoading(false);
    });
  }, []);

  if (conversationId?.length) return <Chat 
    updateChat={updateChat} conversationId={conversationId}/>;

  if(isLoading) return (
    <p className="margin-top__83">
      ...
    </p>
  );
    console.log(conversations);
  return (
    <div className="conversations">
    {
    conversations.map((conversation, key) => <ConversationHeader 
    key={key} 
    conversationId={conversation} 
    localProfile={profileId} />)
    }
    </div>
  )

}

export default Conversations; 