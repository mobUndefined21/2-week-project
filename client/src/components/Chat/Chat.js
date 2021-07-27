import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Message from './Message';
import axios from 'axios';
import './Chat.css';

const postMessage = async (msg, conversationId) => {
  const url = `${window.location.protocol}//${window.location.hostname}:8080/api/messages/${conversationId}`;
  const res = await axios.post(url, msg);
  if(res.data.message === 'OK') return true;
  return false;
}

const Chat = () => {
  const { conversationId } = useParams();
  console.log(conversationId);
  const [conversation, setConversation] = useState({});
  const [participants, setParticipants] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const currentProfileId = window.localStorage.getItem('profileId'); 
  const url = `${window.location.protocol}//${window.location.hostname}:8080/api/messages/${conversationId}`;
  const participantsUrl = (participantId) =>`${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${participantId}`;
  
  useEffect(() => {
    axios.get(url)
      .then(({data}) => {
        setConversation(data);
      })
  }, []);

  useEffect(() => {
    let profiles = [];
    conversation.participants?.forEach(profileId => {
      axios.get(participantsUrl(profileId))
      .then(({data}) => {
        console.log(data);
        profiles.push(data);
        // setParticipants([...participants, data]);
        
        if (profiles.length === 2) {
          setLoading(false)
          setParticipants(profiles);
        }
      });
    }
    );
  }, [conversation.participants]);
  
  useEffect(() => {
    console.log(participants);
  }, [participants])
  
  
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      postMessage({body: e.target.value, profileId: currentProfileId }, conversationId);
      e.target.value = '';
    }
  };

  if(isLoading) return (
    <p>Loading...</p>
  )
  return (
    <div>
      <ul>
        {conversation.messages.map(({body, profileId, ts}, index) => (
          <Message
            key={index}
            body={body}
            isLocal={currentProfileId===profileId}
            profile={participants.find(id => id === profileId)}
            ts={ts}
          />))
        }
      </ul>
      <input type="text" onKeyPress={handleKeyPress} className="container--chat"/>
    </div>
  )
}

{/* <div className="container--chat">
  <img className="avatar--tiny"/>
  <p className="message--text">Message 1</p>
  <span className="time right"></span>
</div>
<div className="container--chat darker">
  <img className="avatar--tiny right"/>
  <p className="message--text">Message 2</p>
  <span className="time-right"></span>
</div>
<div className="container--chat">
  <img className="avatar--tiny"/>
  <p className="message--text">Message 3</p>
  <span className="time-left"></span>
</div>
<div className="container--chat darker">
  <img className="avatar--tiny right"/>
  <p className="message--text">Message 4</p>
  <span className="time-right"></span>
</div> */}
export default Chat;
