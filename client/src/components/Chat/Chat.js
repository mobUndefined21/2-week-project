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

const Chat = ({conversationId, newMessages, updateChat}) => {
  const [conversation, setConversation] = useState({});
  const [participants, setParticipants] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const currentProfileId = window.localStorage.getItem('profileId'); 
  const url = `${window.location.protocol}//${window.location.hostname}:8080/api/messages/${conversationId}`;
  const participantsUrl = (participantId) =>`${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${participantId}`;
  const ts = 0;

  newMessages[conversationId] = false;

  useEffect(() => {
    updateChat((data) => {
      if (data.conversationId !== conversationId) return;

      axios.get(url)
      .then(({data}) => {
        setConversation(data);
        window.scroll({
          top: document.querySelector('.messages-container').offsetHeight,
          behavior: 'smooth'
        });
      })
    });

    axios.get(url)
      .then(({data}) => {
        setConversation(data);
      })
    setTimeout(() => {
      window.scroll({
        top: document.querySelector('.messages-container').offsetHeight,
        behavior: 'smooth'
      });
    } ,1000);

  }, []);

  useEffect(() => {
    let profiles = [];
    conversation.participants?.forEach(profileId => {
      axios.get(participantsUrl(profileId))
      .then(({data}) => {
        profiles.push(data);
        console.log(profiles);
        if (profiles.length === 2) {
          setParticipants(profiles);
          setLoading(false)
        }
      });
    }
    );
  }, [conversation.participants]);
  


  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      postMessage({body: e.target.value, profileId: currentProfileId }, conversationId);
      e.target.value = '';
    }
  };

  if(isLoading) return (
    <p className="margin-top__83">Loading...</p>
  )

  return (
    <div className="margin-top-110">
      <div className='messages-container'>
        <ul>
          {conversation.messages.map(({body, profileId, ts}, index) => (
            <Message
              key={index}
              body={body}
              isLocal={currentProfileId===profileId}
              profile={participants.find(({_id}) => _id === profileId)}
              ts={ts}
            />))
          }
        </ul>
      </div>
      <div className="messages-input-container">
        <input 
        type="text"
        onKeyPress={handleKeyPress}
        className="input--field"
        placeholder="..."
        />
      </div>
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
