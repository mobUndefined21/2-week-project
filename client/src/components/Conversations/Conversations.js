import { useState } from 'react';
import '../Chat/Chat.css'
import axios from 'axios'
const profileId = window.localStorage.getItem('profileId');

const Conversations = () => {
  const [isLoading, setLoading] = useState(true);
  const [conversations, setConversations]
  if(isLoading) return (
    <p className="margin-top__83">
      Loading...
    </p>
  );


}