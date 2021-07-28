import './Chat.css';

const dateFormatter = (unixTime) => {
  const dateObject = new Date(unixTime);
  const dateOptions = { hour: 'numeric', minute: "numeric"};
  return dateObject.toLocaleDateString("sv-SE", dateOptions);
};

const Message = ({body, profile, isClient, ts}) => {

  return (
    <li className="message container--chat">
    <img className="avatar--tiny right" src="`${profile.avatar}`" />
      <div className="profile">{isClient ? 'me' : profile}</div>
      <div className="text">{body}</div>
      <div className="timestamp">{dateFormatter(ts).split(' ')[1]}</div>
    </li>

    // <div className="container--chat darker">
    //   <img className="avatar--tiny right"/>
    //   <p className="message--text">Message 4</p>
    //   <span className="time-right"></span>
    // </div>
  );
}

export default Message;