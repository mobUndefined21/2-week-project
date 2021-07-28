import './Chat.css';

const dateFormatter = (unixTime) => {
  const dateObject = new Date(unixTime);
  const dateOptions = { hour: 'numeric', minute: "numeric"};
  return dateObject.toLocaleDateString("sv-SE", dateOptions);
};

const Message = ({body, profile, isLocal, ts}) => {
  return (
    <li className={isLocal ? "message container--chat me" : "message container--chat you"}>
    <div className="flex-align">
      <img className={`avatar--tiny right ${isLocal ? "me" : ""}`} src={`${profile.avatar}`} />
    </div>
      <div className={`profile ${isLocal ? "me" : ""}`}>{isLocal ? 'me' : profile.name}</div>
      <div className={`text ${isLocal ? "me" : ""}`}>{body}</div>
      <div className={`timestamp ${isLocal ? "me" : ""}`}>{dateFormatter(ts).split(' ')[1]}</div>
    </li>
  );
}

export default Message;