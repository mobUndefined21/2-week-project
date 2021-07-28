import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = `${window.location.protocol}//${window.location.hostname}:8080/api/`;

const localProfileId = window.localStorage.getItem('profileId');

const ConversationHeader = ({conversationId, localProfile, newMessage, newMessages}) => {
  const [info, setInfo] = useState({});
  const [profile, setProfile] = useState({});
  const [isLoading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get(`${url}messages/${conversationId}`).then(({data}) => {
      setInfo(data);
    });
  }, []);
  useEffect(() => {
    if (!Object.keys(info).length) return;
    const otherUser = info.participants.find(p => p !== localProfileId);
    console.log(otherUser);
    axios.get(`${url}profiles/${otherUser}`).then(({data}) => {
      setProfile(data);
      setLoading(false);
    });

  }, [info])

  if (isLoading) return <p>...</p>;

  return (
    <div className="conversation-name-container">
      <Link className="conversation-name" to={`/conversations/${conversationId}`}>
        {profile.name} {newMessage && 'New message'}
      </Link>
    </div>
  )
}

export default ConversationHeader;