import { useState, useEffect } from 'react';
import axios from 'axios';
import Editable from '../Editable/Editable';
import AddField from '../AddField/AddField';
import Skillset from '../Skillset/Skillset';
import Embed from '../Embed/Embed.js'
import '../ProfilePage/ProfilePage.css';

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
    setProfile({...profile, prop });
    setLoading(true);
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
          <img className="avatar--profile" src={profile.avatar} alt="avatar"></img>
          <div className="profile-name-wrap">
            <h1 className="profile-name">{profile.name}</h1>
        {
          profile.isOwner 
          ? <Editable Tag="h2"
              field="title"
              className="profile-title"
              owner={profile.isOwner}
              content={profile.title}
              appendProfile={appendProfile}
              profileId={profileId} />
          : <h4 className="profile-title">{profile.title}</h4>
        }
          </div>
        </div>
        
      </div>
        {
          profile.music?.map(link => {
            <Embed
            isOwner={profile.isOwner}
            embedLink={link.url}
            player={link.player} />
          })
        }

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
        <div className="profile-skills">
          <Skillset
          profileId={profileId}
          setLoading={setLoading}
          appendProfile={appendProfile}
          skillsetName="instruments"
          profile={profile} />
          <Skillset
          profileId={profileId}
          setLoading={setLoading}
          appendProfile={appendProfile}
          skillsetName="skills"
          profile={profile} />
        </div>
    </div>
  )
}

export default Profile;
