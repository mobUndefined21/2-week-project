import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Editable from '../Editable/Editable';
import AddField from '../AddField/AddField';
import Skillset from '../Skillset/Skillset';
import Link from 'react-router-dom';
import Embed from '../Embed/Embed.js';
import AddEmbed from '../Embed/AddEmbed.js'
import AddImage from '../AddImage/AddImage'
import '../ProfilePage/ProfilePage.css';
import './Profile.css';

const msgUrl = `${window.location.protocol}//${window.location.hostname}:8080/api/messages/new`;

const localProfileId = window.localStorage.getItem('profileId');

const Profile = ({profileId}) => {

  const url = `${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${profileId}`;
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const getProfile = () => {
    axios.get(url).then(({data}) => {
      setProfile(data);
      setLoading(false);
    });
  }

  const appendProfile = prop => {
    setProfile({ ...profile, prop });
    setLoading(true);
  }

  const history = useHistory();

  const startConversation = () => {
    axios.post(msgUrl, { participants: [profileId, localProfileId] })
      .then(({data}) => {
      history.push(`/conversations/${data.conversationId}`)
    });
  }

  useEffect(() => {setLoading(true)}, [profileId]);

  useEffect(() => {
    if (isLoading)
    getProfile();
  }, [isLoading, getProfile])

  if (isLoading) return(
    <div>...</div>
  )
  if (!profile) {
    return <h2>Profile not found! </h2>
  }

  return(
    <div className="login-container">
      <div>
        <div className="profile-wrap">
          {
            profile.isOwner
            ? <AddImage profile={profile}/>
            : <img className="avatar--profile" 
            src={profile.avatar} 
            alt="avatar"></img>
          }
          
          <div className="profile-name-wrap">
            <div className="profile-title-wrapper">
            <h1 className="profile-name">{profile.name}</h1>
        {
          profile.isOwner 
          ? <Editable Tag="h2"
          field="title"
          classname="profile-title"
          owner={profile.isOwner}
          content={profile.title}
          appendProfile={appendProfile}
          profileId={profileId} />
          : <h4 className="profile-title">{profile.title}</h4>
          
        }
        </div>
        {!profile.isOwner && 
          <span onClick={startConversation} className="chat-btn-container">
            <i className="chat-btn-profile fas far fa-comment-alt"></i>
          </span>}
          </div>
        </div>
      </div>

      {
          profile.isOwner 
          ? <Editable Tag="p" field="description"
              textarea={true}
              owner={profile.isOwner}
              content={profile.description}
              appendProfile={appendProfile}
              profileId={profileId} />
          : <p>{profile.description}</p>
        }

      <div className="embeds">
        <h3 class="skillset-title margin-bottom-5">music</h3>
        {profile.isOwner && <AddEmbed profileId={localProfileId} setLoading={setLoading}/>}
        {
          profile.music?.map((link, key) => (
            <Embed
            key={key}
            isOwner={profile.isOwner}
            embedLink={link.link}
            player={link.type} 
            setLoading={setLoading}/>
          ))
          }
        </div>
        
        <div className="profile-skills-instruments">
          <div className="profile-instruments">
            <Skillset
              profileId={profileId}
              setLoading={setLoading}
              appendProfile={appendProfile}
              skillsetName="instruments"
              profile={profile} 
            />
          </div>
          <div className="profile-skills">
          <Skillset
              profileId={profileId}
              setLoading={setLoading}
              appendProfile={appendProfile}
              skillsetName="skills"
              profile={profile}
          />
          </div>
        </div>

    </div>
  )
}

export default Profile;
