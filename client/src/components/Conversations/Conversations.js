import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../Chat/Chat.css';
import Chat from '../Chat/Chat';
import ConversationHeader from './ConversationHeader';
import axios from 'axios';
import { io } from "socket.io-client";

const profileId = window.localStorage.getItem('profileId');
const socketUrl = `ws://${window.location.hostname}:8081`;
const _socket = io(socketUrl);
const url = `${window.location.protocol}//${window.location.hostname}:8080/api/messages/profile/${profileId}`;

const Conversations = ({socket, updateChat, newMessages}) => {
  const [isLoading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const { conversationId } = useParams();

  useEffect(() => {
    socket.emit('handshake', {profileId})
    axios.get(url).then(({data}) => {
      setConversations(data.ids);
      setLoading(false);
    });
  }, []);

  const hasNewMessage = (conversationId) => {
    console.log(newMessages, conversationId);
    const key = Object.keys(newMessages).find(i => i === conversationId);
    if (key) return newMessages[key];
    return false;
  };

  if (conversationId?.length) return <Chat 
    updateChat={updateChat} newMessages={newMessages} conversationId={conversationId}/>;

  if(isLoading) return (
    <p className="margin-top__83">
      ...
    </p>
  );

  console.log(newMessages);
  return (
    <div className="conversations">
      <h2 className="conversations-title">Conversations</h2>
    {
    conversations.map((conversation, key) => <ConversationHeader 
    key={key} 
    conversationId={conversation} 
    localProfile={profileId}
    newMessages={newMessages} 
    newMessage={hasNewMessage(conversation)}/>)
    }
    </div>
  )

}

export default Conversations; 