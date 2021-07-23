import { useState, useEffect } from 'react';
import axios from 'axios';
import Editable from '../Editable/Editable';
import AddField from '../AddField/AddField'

const Profile = ({profileId}) => {
  const url = `${window.location.protocol}//${window.location.hostname}:8080/api/profiles/${profileId}`;
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const getProfile = () => {
    axios.get(url).then(({data}) => {
      setLoading(false);
      setProfile(data);
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

  if (!profile) {
    return <h2>Profile not found! </h2>
  }
  return(
    <div className="login-container">
      <h1>{profile.name}</h1>
        {
          profile.isOwner 
          ? <Editable Tag="p" field="description"
              owner={profile.isOwner}
              content={profile.description}
              appendProfile={appendProfile}
              profileId={profileId} />
          : <p>{profile.description}</p>
        }
        {
        profile.instruments?.length > 0 && 
        <div> 
        <h3>instruments:</h3>
        {profile.instruments.map((i, index) => i.name && <h4 key={index}>{i.name}: {i.skill}</h4>)}

      </div>
      }
      {profile.isOwner ? 
        <AddField skillset="instruments"
        appendProfile={appendProfile}
        profileId={profileId} />
        : null }
      <div>
      {
        profile.skills?.length > 0 && <h3>skills:</h3>
      }
      {
          profile.skills?.length > 0 &&
          profile.skills?.map((skill, index) => {
            return skill.name && <h4 key={index}>{skill.name}: {skill.skill}</h4> })
      }
      {profile.isOwner ? 
        <AddField skillset="skills"
        appendProfile={appendProfile}
        profileId={profileId} />
        : null }
      </div>
    </div>
  )
}

export default Profile;
