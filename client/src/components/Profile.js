import { useState, useEffect } from 'react';
import axios from 'axios';
import Editable from './Editable';



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
  }, [isLoading])

  if (isLoading) return(
    <div>Loading...</div>
  )
  return(
    <div>
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
      <div>
        <h3>instruments:</h3>
        {profile.instruments
          ?.map((i, index) => {
            profile.isOwner
            ? <Editable Tag="p" field="instruments" owner={profile.isOwner}
              content={profile.instruments[index].name}
              appendProfile={appendProfile}
              profileId={profileId} />
            : <h4 key={index}>{i.name}</h4>
          })
        }
      </div>
      <div>
        <h3>skills:</h3>
        {profile.skills?.map((i, index) => {
          <li key={index}>{i}</li>
        })}
      </div>
    </div>
  )
}

export default Profile;
