import React, {useState, useEffect}  from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProfileGalleryPage.css';

const ProfileGalleryPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const fetchProfiles = async() => {
    const url = `${window.location.protocol}//${window.location.hostname}:8080/api/profiles/`;
    const allProfiles = await axios.get(url);
    console.log(allProfiles.data);
    setProfiles(allProfiles.data);
    setLoading(false);
  }
  useEffect(()=>{
    if (isLoading)
    fetchProfiles();
  },[isLoading]);

  if (isLoading) return(
    <div>...</div>
  )
  return (
    <div className="gallery">
      <h1 className="gallery-title">Browse Musicians</h1>
      {console.log(profiles)}
      {profiles.map(profile => (
        <section key={profile._id}>
          <Link to={`profile/${profile._id}`}>
            <div className="profile-details">
              <section className="avatar"></section>
              <h2>{profile.name}</h2>
              <p>{`${profile.instruments.length ? profile.instruments[0].name + ' player': ''}`}</p>
            </div>
          </Link>
        </section>
      ))}
    </div>
  )
}

export default ProfileGalleryPage;
