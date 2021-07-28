import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const url = `${window.location.protocol}//${window.location.hostname}:8080/api/messages/`;

const ConversationHeader = ({conversationId, localProfile}) => {
  const [info, setInfo] = useState({});
  const [isLoading, setLoading] = useState(true); 

  useEffect(() => {
    axios.get(`${url}${conversationId}`).then(({data}) => {
      setInfo(data);
      setLoading(false);
    });
  }, [])

  if (isLoading) return <p>Loading...</p>;
  console.log(info);
  return (
    <div>
      <Link to={`/conversations/${conversationId}`}>
        {conversationId}
      </Link>
    </div>
  )
}

export default ConversationHeader;