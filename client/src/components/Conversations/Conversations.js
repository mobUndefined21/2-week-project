import { useState } from 'react';
import axios from 'axios'
const profileId = window.localStorage.getItem('profileId');

const Conversations = () => {
  const [isLoading, setLoading] = useState(true);
  const [conversations, setConversations]
  if(isLoading) return (
    <p>
      Loading...
    </p>
  );


}