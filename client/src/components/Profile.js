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
  
  useEffect(()=>{
    getProfile();
  }, []);

  if (isLoading) return(
    <div>Loading...</div>
  )
  return(
    <div>
      <h1>{profile.name}</h1>
      <Editable Tag="p" field="description" content={profile.description} profileId={profileId} />
      <ul>
        <h3>instruments:</h3>
        {profile.instruments?.map((i, index) => {
          <li key={index}>{i}</li>
        })}

      </ul>
    </div>
  )
}


export default Profile;