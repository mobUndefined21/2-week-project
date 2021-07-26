import { useState, useEffect } from 'react';
import axios from 'axios';
import Editable from '../Editable/Editable';
import AddField from '../AddField/AddField';
import Skillset from '../Skillset/Skillset';
import Embed from '../Embed/Embed.js'

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

  useEffect(() => {
    if (isLoading)
    getProfile();
  }, [isLoading, getProfile])

  if (isLoading) return(
    <div>Loading...</div>
  )
    console.log(profile);
  if (!profile) {
    return <h2>Profile not found! </h2>
  }
  return(
    <div className="login-container">
      <div>
        <img></img>
      <h1>{profile.name}</h1>
        
      </div>
        {
          profile.isOwner 
          ? <Editable Tag="h4" field="title"
              owner={profile.isOwner}
              content={profile.title}
              appendProfile={appendProfile}
              profileId={profileId} />
          : <h4>{profile.title}</h4>
        }
        <Embed
          isOwner={profile.isOwner}
          embedLink="https://open.spotify.com/track/4QJC99VVdyzQgzBIlmQy93"
          player="spotify" />
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
        <Skillset profileId={profileId} setLoading={setLoading} appendProfile={appendProfile} skillsetName="instruments" profile={profile} />
        <Skillset profileId={profileId} setLoading={setLoading} appendProfile={appendProfile} skillsetName="skills" profile={profile} />
    </div>
  )
}

export default Profile;
