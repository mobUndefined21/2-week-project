import { useState } from 'react';

const Chat = () => {
const [messages, setMessages] = useState([{}]);

  return (
    <div>
      <ul>
        {messages.map(message => <li>{message.body}</li>)}
      </ul>
      <input type="text" className="chat--box"/>
    </div>
  )
}

export default Chat
